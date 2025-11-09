import { MongoClient } from 'mongodb'
import { uri } from '../constants'

export function connection() {
  return new MongoClient(uri)
}
