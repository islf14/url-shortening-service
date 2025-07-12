import { Request, Response } from 'express'
import { UrlModel } from '../models/url.model'
import { ShortName } from './utils'

export class Urlcontroller {
  public async getAll(_req: Request, res: Response) {
    try {
      const data = await UrlModel.getAll()
      return res.status(200).json(data)
    } catch (e: unknown) {
      if (e instanceof Error) console.log(e.message)
      return res.status(400).json({ error: 'Error getting all' })
    }
  }

  public async create(req: Request, res: Response) {
    if (!req.body || !req.body.url) {
      return res.status(400).json({ error: 'Must enter a url' })
    }
    let newUrl
    try {
      newUrl = new URL(req.body.url)
    } catch (e) {
      return res.status(400).json({ error: 'Enter a valid url' })
    }
    // verify name
    let shortName
    try {
      shortName = await ShortName({ url: newUrl.host })
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error getting name: ' + message })
      return res.status(500).json({ error: 'Error getting shorted name' })
    }
    // create in db
    try {
      const insertedId = await UrlModel.create({
        url: newUrl.href,
        name: shortName
      })
      const data = {
        shortName,
        insertedId
      }
      console.log(data)
      return res.status(200).json(data)
    } catch (e) {
      return res.status(400).json('Error saving url')
    }
  }

  public async view(req: Request, res: Response) {
    const { short } = req.params
    if (short.length !== 6) {
      return res.status(400).json({ error: 'pathname must be six characters' })
    }
    try {
      const data = await UrlModel.view({ short })
      return res.status(200).json(data)
    } catch (e) {
      return res.status(400).json({ error: 'Error in view' })
    }
  }

  public update(_req: Request, _res: Response) {}

  public delete(_req: Request, _res: Response) {}
}
