import path from 'path'
import express from 'express'
import compress from 'compression'
import serveStatic from 'serve-static'
import logger from './lib/logger'
import { notFoundHandler } from './lib/not-found'

import usersRouter from './routes/users'
import emailsRouter from './routes/emails'

const app = express()

app.use(logger)
app.use(compress())
app.use(serveStatic(path.join(__dirname, '../public')))
app.use('/users', usersRouter)
app.use('/emails', emailsRouter)
app.use(notFoundHandler)

export default app
