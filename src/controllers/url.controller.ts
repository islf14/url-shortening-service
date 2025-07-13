import { Request, Response } from 'express'
import { UrlModel } from '../models/url.model'
import { shortName } from './utils'

export class Urlcontroller {
  public async getAll(_req: Request, res: Response) {
    try {
      const data = await UrlModel.getAll()
      return res.status(200).json(data)
    } catch (e: unknown) {
      if (e instanceof Error) console.log({ error: e.message })
      return res.status(400).json({ error: 'Error getting all' })
    }
  }

  public async create(req: Request, res: Response) {
    // verify json with url
    if (!req.body || !req.body.url) {
      return res.status(400).json({ error: 'Must enter a url' })
    }
    //verify valid new url
    let newUrl
    try {
      newUrl = new URL(req.body.url)
    } catch (e) {
      return res.status(400).json({ error: 'Enter a valid url' })
    }
    // verify new available name
    let shortCode
    try {
      shortCode = await shortName({ url: newUrl.host })
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error searching available name: ' + message })
      return res.status(500).json({ error: 'Error getting shorted name' })
    }
    // create in db
    try {
      const insertedId = await UrlModel.create({
        url: newUrl.href,
        shortCode
      })
      const result = {
        shortCode,
        insertedId
      }
      // console.log(result)
      return res.status(201).json(result)
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error saving url: ' + message })
      return res.status(400).json('Error saving url')
    }
  }

  public async view(req: Request, res: Response) {
    // verify pathname
    const { short } = req.params
    if (short.length !== 6) {
      return res.status(400).json({ error: 'pathname must be six characters' })
    }
    // search in db
    try {
      const data = await UrlModel.view({ shortCode: short })
      if (data) return res.status(200).json(data)
      else return res.status(404).json({ message: 'not found' })
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error viewing url: ' + message })
      return res.status(500).json({ error: 'Error in view' })
    }
  }

  public async update(req: Request, res: Response) {
    // verify pathname
    const { short } = req.params
    if (short.length !== 6) {
      return res.status(400).json({ error: 'pathname must be six characters' })
    }
    // verify json with url
    if (!req.body || !req.body.url) {
      return res.status(400).json({ error: 'Must enter a url' })
    }
    //verify valid new url
    let newUrl
    try {
      newUrl = new URL(req.body.url)
    } catch (e) {
      return res.status(400).json({ error: 'Enter a valid url' })
    }
    // update
    const data = {
      shortCode: short,
      url: newUrl.href
    }
    try {
      const modifiedCount = await UrlModel.update(data)
      if (modifiedCount) return res.status(200).json(data)
      else return res.status(404).json({ error: 'Not found' })
    } catch (e: unknown) {
      let message
      if (e instanceof Error) message = e.message
      console.log({ error: 'Error updating url: ' + message })
      return res.status(500).json({ error: 'Error in update' })
    }
  }

  public async delete(req: Request, res: Response) {
    // verify pathname
    const { short } = req.params
    if (short.length !== 6) {
      return res.status(400).json({ error: 'pathname must be six characters' })
    }
    try {
      const deletedCount = await UrlModel.delete({ shortCode: short })
      if (deletedCount) return res.status(204).json('deleted')
      else return res.status(404).json({ error: 'Not found' })
    } catch (e: unknown) {
      return res.status(500).json({ error: 'Error deleting' })
    }
  }
}
