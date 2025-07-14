import { Code } from '../types'
import { connection } from './connection'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('shortening')
    return { client: client, db: database.collection('stat') }
  } catch (e: unknown) {
    let message
    if (e instanceof Error) message = e.message
    throw new Error('Error connecting: ' + message)
  }
}

export class ShortenModel {
  static async stats({ shortCode }: Code) {
    const { client, db } = await connect()
    const data = await db.findOne({ shortCode })
    client.close()
    return data
  }

  static async create({ shortCode }: Code) {
    const { client, db } = await connect()
    const data = {
      shortCode,
      accessCount: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const { insertedId } = await db.insertOne(data)
    client.close()
    return insertedId
  }

  static async update({ shortCode }: Code) {
    const { client, db } = await connect()
    const { modifiedCount } = await db.updateOne(
      { shortCode },
      { $set: { updatedAt: new Date() }, $inc: { accessCount: 1 } }
    )
    client.close()
    return modifiedCount
  }

  static async delete({ shortCode }: Code) {
    const { client, db } = await connect()
    const { deletedCount } = await db.deleteOne({ shortCode })
    client.close()
    return deletedCount
  }
}
