import { Request, Response, Router } from 'express'
import { VisitController } from '../controllers/visit.controller'
import { join } from 'node:path'

// "/"
export const goRoute = Router()
const visitController = new VisitController()

goRoute.get('/', (_req: Request, res: Response) => {
  res.sendFile(join(process.cwd(), 'client/create.html'))
})

goRoute.get('/:short', visitController.visit)
