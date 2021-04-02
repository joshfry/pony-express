const readBody = req =>
  new Promise(resolve => {
    // in Node, chunks are `Buffer` objects (Node's binary datatype)
    // and can be stringify'd for debugging
    let chunks = []

    // the `req` object is a stream object that represents the request body
    // listen for 'data', then 'end' so it knows when the request is done

    // get data stream and collect each "chunk" (each line of the body)
    req.on('data', chunk => {
      chunks.push(chunk)
    })

    // resolve the Promise once the entire request body has been received
    req.on('end', () => {
      resolve(Buffer.concat(chunks))
    })
  })

export default readBody
