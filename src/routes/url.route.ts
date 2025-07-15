import { Router } from 'express'
import { Urlcontroller } from '../controllers/url.controller'
import { VisitController } from '../controllers/visit.controller'

export const urlRoute = Router()
const urlController = new Urlcontroller()
const visitController = new VisitController()

urlRoute.get('/', urlController.getAll)
urlRoute.post('/', urlController.create)
urlRoute.get('/:short', urlController.view)
urlRoute.put('/:short', urlController.update)
urlRoute.delete('/:short', urlController.delete)
//
urlRoute.get('/:short/stats', visitController.stats)
