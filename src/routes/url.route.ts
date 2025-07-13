import { Router } from 'express'
import { Urlcontroller } from '../controllers/url.controller'
import { ShortenController } from '../controllers/shorten.controller'

export const urlRoute = Router()
const urlController = new Urlcontroller()
const shortenController = new ShortenController()

urlRoute.get('/', urlController.getAll)
urlRoute.post('/', urlController.create)
urlRoute.get('/:short', urlController.view)
urlRoute.put('/:short', urlController.update)
urlRoute.delete('/:short', urlController.delete)
urlRoute.get('/:short/stats', shortenController.stats)
