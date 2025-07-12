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

  public create(req: Request, res: Response) {
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
    const name = ShortName({ url: newUrl.host })
    console.log(name)

    return res.status(200).json(req.body.url)
  }

  public view(_req: Request, _res: Response) {}

  public update(_req: Request, _res: Response) {}

  public delete(_req: Request, _res: Response) {}
}
