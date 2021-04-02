import crypto from 'crypto'

const generateId = () => crypto.randomBytes(8).toString('hex')

export default generateId
