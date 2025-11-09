import { Router } from 'express'
import { VisitController } from '../controllers/visit.controller'
import { join } from 'node:path'

// "/"
export const goRoute = Router()
const visitController = new VisitController()

goRoute.get('/', (_req, res) => {
  console.log(process.cwd() + '/client/create.html')
  res.sendFile(process.cwd() + '/client/create.html')
})

goRoute.get('/w', (_req, res) => {
  const path = join(__dirname, '../..', 'client/create.html')
  res.status(200).json({ path })
})

goRoute.get('/:short', visitController.visit)
