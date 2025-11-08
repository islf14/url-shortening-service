import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { jwtSecret, nameCookie } from '../constants'
import { Payload } from '../types'

// Extend Express Request type to include 'session'
declare module 'express-serve-static-core' {
  interface Request {
    session?: {
      user?: any
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token
  // token from cookie
  if (req.cookies && req.cookies[nameCookie]) {
    token = req.cookies[nameCookie]
  }
  //
  if (token) {
    req.session = { user: null }
    try {
      const user = jwt.verify(token, jwtSecret)
      req.session.user = user as Payload
      return next()
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Auth middleware error:', m)
    }
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
