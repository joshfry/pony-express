import readBody from './read-body'

const jsonBodyParser = async (req, res, next) => {
  const body = await readBody(req)
  req.body = JSON.parse(body)
  next()
}

export default jsonBodyParser
