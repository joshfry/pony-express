class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

const notFoundHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    // respond to client
    res.status(404)
    res.send('404: File Not Found')
    // extinguish the error
    next()
  }
  // let someone else deal with the error
  next(err)
}

module.exports = { NotFoundError, notFoundHandler }
