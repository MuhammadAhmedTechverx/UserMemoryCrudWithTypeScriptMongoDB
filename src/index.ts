import express, { Express, Request, Response } from 'express'
import router from './routes/routes'
import dotenv from 'dotenv'
import dbConnection from './db/dbConnector'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'

import { urlencoded } from 'body-parser'
import memoryRoutes from './routes/memoryRoutes'

dotenv.config()

const app: Express = express()
app.use(express.json())
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(helmet())

const port = Number(process.env.PORT)

app.set('views', path.join(__dirname, 'views'))

dbConnection()
  .then(() => console.log('loaded'))
  .catch((error) => console.log(error))

app.use('/user', router)
app.use('/memory', memoryRoutes)

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`)
})
