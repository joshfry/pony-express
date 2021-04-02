import express from 'express'

export type Route = (req: express.Request, res: express.Response) => void
