import cors from 'cors'
import type { StaticOrigin } from '../types'
import { appOrigin, port } from '../constants'

const ACCEPTED_ORIGINS = [`http://localhost:${port}`, appOrigin]

export const corsMiddleware = (whitelist: string[] = ACCEPTED_ORIGINS) => {
  return cors({
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, origin?: StaticOrigin) => void
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
}
