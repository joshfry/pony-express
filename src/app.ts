import express from 'express'
import compress from 'compression'
import logger from './lib/logger'
import { notFoundHandler } from './lib/not-found'

import usersRouter from './routes/users'
import emailsRouter from './routes/emails'

const app = express()

app.use(logger)
app.use(compress())
app.use('/users', usersRouter)
app.use('/emails', emailsRouter)
app.use(notFoundHandler)

export default app
