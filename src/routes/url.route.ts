import { Router } from 'express'
import { Urlcontroller } from '../controllers/url.controller'
import { VisitController } from '../controllers/visit.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

// "/shorten"
export const urlRoute = Router()
const urlController = new Urlcontroller()
const visitController = new VisitController()

urlRoute.get('/', authMiddleware, urlController.getAll)
urlRoute.post('/', urlController.create)
urlRoute.get('/:short', authMiddleware, urlController.view)
urlRoute.put('/:short', authMiddleware, urlController.update)
urlRoute.delete('/:short', authMiddleware, urlController.delete)
//
urlRoute.get('/:short/stats', authMiddleware, visitController.stats)
