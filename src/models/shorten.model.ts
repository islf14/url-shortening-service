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
  static async stats({ shortCode }: { shortCode: string }) {
    const { client, db } = await connect()
    const data = await db.findOne({ shortCode })
    client.close()
    return data
  }
}
