import { Request, Response } from 'express'
import { UrlModel } from '../models/url.model'
import { Code } from '../types'
import { VisitModel } from '../models/visit.model'

export class VisitController {
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
      const statUrl = await VisitModel.stats({ shortCode: short })
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

  static async registerVisit({ shortCode }: Code) {
    // update visit
    try {
      const modifiedCount = await VisitModel.update({ shortCode })
      if (modifiedCount) return modifiedCount
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error updating visit: ' + message })
      return -1
    }
    // init visit
    try {
      await VisitModel.create({ shortCode })
      return 1
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error creating visit: ' + message })
      return -1
    }
  }
}
