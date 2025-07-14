import { Request, Response } from 'express'
import { UrlModel } from '../models/url.model'
import { ShortenModel } from '../models/shorten.model'

export class ShortenController {
  //
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
      return res.status(500).json({ error: 'Error viewing url' })
    }
    // search visit counter
    let accessCount
    try {
      const statUrl = await ShortenModel.stats({ shortCode: short })
      if (statUrl) accessCount = statUrl.accessCount
      else accessCount = 0
    } catch (e: unknown) {
      return res.status(500).json({ error: 'Error in stats' })
    }
    return res.status(200).json({
      ...viewUrl,
      accessCount
    })
  }

  public async visit(req: Request, res: Response) {
    // verify pathname
    const { short } = req.params
    if (short.length !== 6) {
      return res.status(400).json({ error: 'pathname must be six characters' })
    }
    // verify if exist
    try {
      const viewUrl = await UrlModel.view({ shortCode: short })
      if (!viewUrl) return res.status(404).json({ message: 'not found' })
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error finding url: ' + message })
      return res.status(500).json({ error: 'Error finding url' })
    }
    // update visit
    try {
      const modifiedCount = await ShortenModel.update({ shortCode: short })
      if (modifiedCount) return res.status(200).json({ message: 'visit' })
    } catch (e: unknown) {
      return res.status(500).json({ error: 'Error updating visits' })
    }
    // init visit
    try {
      const insertedId = await ShortenModel.create({ shortCode: short })
      console.log('init visit: ', insertedId)
      return res.status(200).json({ message: 'init visit' })
    } catch (e: unknown) {
      return res.status(500).json({ error: 'Error creating visits' })
    }
  }
}
