import express, { json } from 'express'
import 'dotenv/config'
import { urlRoute } from './routes/url.route'

const app = express()
const port = process.env.PORT ?? 3000
app.use(json())

app.get('/', (_req, res) => {
  res.json('welcome to URL Shortening Service')
})

app.use('/api/short', urlRoute)

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`)
})
