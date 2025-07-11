import { Router } from 'express'
import { Urlcontroller } from '../controllers/url.controller'

export const urlRoute = Router()
const urlController = new Urlcontroller()

urlRoute.get('/', urlController.getAll)
urlRoute.post('/', urlController.create)
urlRoute.get('/:id', urlController.view)
urlRoute.put('/:id', urlController.update)
urlRoute.delete('/:id', urlController.delete)
