import { Request, Response } from 'express'
import { Auth, Login, Payload } from '../types'
import { validateLogin, validateRegister } from './auth.validator'
import { UserModel } from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret, nameCookie, saltOrRounds, secureStatus } from '../constants'

export class AuthController {
  //

  async register(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    let values: Auth
    try {
      values = validateRegister(req.body) as Auth
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ error: JSON.parse(m || '{}') })
      return
    }

    const { name, email, password } = values

    try {
      const userExists = await UserModel.findByEmail({ email })
      if (userExists) {
        res.status(400).json({ message: 'Email already in use' })
        return
      }
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error registering:', m)
      res.status(500).json({ message: 'Error verifying user' })
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    try {
      await UserModel.create({ name, email, hashedPassword })
      res.status(201).json({ message: 'successful registration' })
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error registering:', m)
      res.status(500).json({ message: 'Error registering user' })
    }
    return
  }

  //

  async login(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    let values: Login
    try {
      values = validateLogin(req.body) as Login
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ error: JSON.parse(m || '{}') })
      return
    }

    try {
      // find user in db
      const user = await UserModel.findByEmail({ email: values.email })
      if (!user) {
        res.status(400).json({ message: 'Invalid email or password' })
        return
      }

      // validate password
      const valid = await bcrypt.compare(values.password, user.password)
      if (!valid) {
        res.status(400).json({ message: 'Invalid email or password' })
        return
      }

      // verify is admin
      if (user.type !== 'admin') {
        res.status(400).json({ message: 'You are not admin' })
        return
      }

      const payload: Payload = { email: user.email, type: user.type }

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
      const data = { message: 'ok' }

      res
        .status(200)
        .cookie(nameCookie, token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: 'strict',
          secure: secureStatus
        })
        .json(data)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Login Error:', m)
      res.status(500).json({ message: 'Login error' })
    }
    return
  }

  //
}
