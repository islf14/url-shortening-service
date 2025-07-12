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
  static async getAll() {
    const { client, db } = await connect()
    const data = await db.find().toArray()
    console.log(data)
    client.close()
    return { data }
  }

  static async create({ url, name }: { url: string; name: string }) {
    const { client, db } = await connect()
    const newShorten = {
      url,
      shortCode: name,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try {
      const { insertedId } = await db.insertOne(newShorten)
      client.close()
      return insertedId
    } catch (e) {
      client.close()
      throw new Error('error creating data')
    }
  }

  static async view({ short }: { short: string }) {
    console.log(short)
    const { client, db } = await connect()
    const data = await db.findOne({ shortCode: short })
    client.close()
    return data
    // return data
  }

  static update() {}

  static delete() {}
}
