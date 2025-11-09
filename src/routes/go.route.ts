import { Router } from 'express'
import { VisitController } from '../controllers/visit.controller'

// "/"
export const goRoute = Router()
const visitController = new VisitController()

goRoute.get('/', (_req, res) => {
  console.log(process.cwd() + '/client/create.html')
  res.sendFile(process.cwd() + '/client/create.html')
})

goRoute.get('/:short', visitController.visit)
