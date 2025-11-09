import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { rate } from '../middlewares/rate.middleware'

export const authRoute = Router()
const authController = new AuthController()
const rateParams = {
  times: 3,
  minutes: 2
}
authRoute.post('/register', rate(rateParams), authController.register)
authRoute.post('/login', rate(rateParams), authController.login)
