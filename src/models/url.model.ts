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
  static async getAll() {
    const { client, db } = await connect()
    const data = db.find().toArray()
    console.log(data)
    client.close()
    return { data: '... all data should be here' }
  }

  static create() {}

  static view() {}

  static update() {}

  static delete() {}
}
