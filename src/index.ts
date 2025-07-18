import express, { json } from 'express'
import 'dotenv/config'
import { urlRoute } from './routes/url.route'
import { goRoute } from './routes/go.route'

const app = express()
const port = process.env.PORT ?? 3000
app.use(json())
app.use(express.static('client'))
app.use('/shorten', urlRoute)
app.use('/', goRoute)

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`)
})
