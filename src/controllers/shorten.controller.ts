import { Request, Response } from 'express'
import { UrlModel } from '../models/url.model'
import { ShortenModel } from '../models/shorten.model'

export class ShortenController {
  public async stats(req: Request, res: Response) {
    // verify pathname
    const { short } = req.params
    if (short.length !== 6) {
      return res.status(400).json({ error: 'pathname must be six characters' })
    }
    // search in db
    let viewUrl
    try {
      viewUrl = await UrlModel.view({ shortCode: short })
      if (!viewUrl) return res.status(404).json({ message: 'not found' })
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error viewing url: ' + message })
      return res.status(500).json({ error: 'Error in view' })
    }
    // search visit counter
    let statUrl
    try {
      statUrl = await ShortenModel.stats({ shortCode: short })
    } catch (e: unknown) {
      return res.status(404).json({ message: 'not found' })
    }
    // verify accessCount
    let accessCount
    if (statUrl) {
      accessCount = statUrl.accessCount
    } else {
      accessCount = 0
    }
    const data = {
      ...viewUrl,
      accessCount
    }
    console.log(statUrl)
    return res.status(200).json(data)
  }
}
