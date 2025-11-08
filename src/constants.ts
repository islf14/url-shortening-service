export const port = process.env.PORT ?? 3000

export const jwtSecret = process.env.JWT_SECRET ?? 'hi'

export const saltOrRounds = Number(process.env.SALT) ?? 10

export const nameCookie = 'access_shortener'

export const secureStatus = process.env.NODE_ENV === 'production'
