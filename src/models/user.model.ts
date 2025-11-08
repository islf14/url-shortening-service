import { HashAuth } from '../types'
import { connection } from './connection'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('shortening')
    return { client: client, db: database.collection('user') }
  } catch (e: unknown) {
    let message
    if (e instanceof Error) message = e.message
    throw new Error('Error connecting: ' + message)
  }
}

export class UserModel {
  //

  static async findByEmail({ email }: { email: string }) {
    const { client, db } = await connect()
    try {
      const data = await db.findOne({ email })
      return data
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      throw new Error('error finding: ' + m)
    } finally {
      client.close()
    }
  }

  //

  static async create({ name, email, hashedPassword }: HashAuth) {
    const { client, db } = await connect()
    const newUser = {
      name,
      email,
      password: hashedPassword,
      type: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try {
      const { insertedId } = await db.insertOne(newUser)
      return insertedId
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      throw new Error('error creating: ' + m)
    } finally {
      client.close()
    }
  }

  //
}
