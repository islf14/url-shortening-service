export const port = process.env.PORT ?? 3000

export const jwtSecret = process.env.JWT_SECRET ?? 'hi'

export const saltOrRounds = Number(process.env.SALT) ?? 10

export const nameCookie = 'access_shortener'

export const secureStatus = process.env.NODE_ENV === 'production'

const DEFAULT_CONNECTION =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8'
export const uri = process.env.MONGODB_URI ?? DEFAULT_CONNECTION
