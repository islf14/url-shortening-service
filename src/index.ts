import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { authRoute } from './routes/auth.route'
import { urlRoute } from './routes/url.route'
import { goRoute } from './routes/go.route'
import { corsMiddleware } from './middlewares/cors.middleware'
import { ecors } from './middlewares/errorCors.middleware'
import { port } from './constants'
import { csp } from './middlewares/csp.middleware'

const app = express()
app.use(corsMiddleware())
app.use(ecors())
app.use(csp())
app.use(json())
app.use(cookieParser())
app.use(express.static('./client'))
app.use('/shorten', urlRoute)
app.use('/', goRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`)
})
