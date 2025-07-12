import { Router } from 'express'
import { Urlcontroller } from '../controllers/url.controller'

export const urlRoute = Router()
const urlController = new Urlcontroller()

urlRoute.get('/', urlController.getAll)
urlRoute.post('/', urlController.create)
urlRoute.get('/:short', urlController.view)
urlRoute.put('/:short', urlController.update)
urlRoute.delete('/:short', urlController.delete)
