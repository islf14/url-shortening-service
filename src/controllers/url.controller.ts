import { Request, Response } from 'express'
import { UrlModel } from '../models/url.model'

export class Urlcontroller {
  public async getAll(_req: Request, res: Response) {
    try {
      const data = await UrlModel.getAll()
      res.status(200).json(data)
    } catch (e: unknown) {
      if (e instanceof Error) console.log(e.message)
      res.status(400).json({ error: 'Error getting all' })
    }
  }

  public create(_req: Request, _res: Response) {}

  public view(_req: Request, _res: Response) {}

  public update(_req: Request, _res: Response) {}

  public delete(_req: Request, _res: Response) {}
}
