import { Code, Pagination, Shorten } from '../types'
import { connection } from './connection'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('shortening')
    return { client: client, db: database.collection('url') }
  } catch (e: unknown) {
    let message
    if (e instanceof Error) message = e.message
    throw new Error('Error connecting: ' + message)
  }
}

export class UrlModel {
  //
  static async countAll() {
    const { client, db } = await connect()
    const count = await db.countDocuments()
    client.close()
    return count
  }

  static async getAll({ pageNumber, nPerPage }: Pagination) {
    const { client, db } = await connect()
    const data = await db
      .find()
      .sort({ createAt: 1 })
      .skip(pageNumber > 1 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .toArray()
    client.close()
    return data
  }

  static async create({ shortCode, url }: Shorten) {
    const { client, db } = await connect()
    const newShorten = {
      url,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try {
      const { insertedId } = await db.insertOne(newShorten)
      client.close()
      return insertedId
    } catch (e: unknown) {
      client.close()
      throw new Error('Error creating.')
    }
  }

  static async view({ shortCode }: Code) {
    // console.log(short)
    const { client, db } = await connect()
    const data = await db.findOne({ shortCode })
    client.close()
    return data
  }

  static async update({ shortCode, url }: Shorten) {
    const { client, db } = await connect()
    const updateUrl = {
      url,
      updatedAt: new Date()
    }
    try {
      const { modifiedCount } = await db.updateOne(
        { shortCode },
        { $set: updateUrl }
      )
      client.close()
      return modifiedCount
    } catch (e: unknown) {
      client.close()
      throw new Error('Error updating.')
    }
  }

  static async delete({ shortCode }: Code) {
    const { client, db } = await connect()
    try {
      const { deletedCount } = await db.deleteOne({ shortCode })
      client.close()
      return deletedCount
    } catch (e: unknown) {
      client.close()
      throw new Error('Error deleting.')
    }
  }
}
