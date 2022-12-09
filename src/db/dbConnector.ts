import { connect } from 'mongoose'

async function dbConnection(): Promise<unknown> {
  return await connect('mongodb://127.0.0.1:27017')
    .then(() => {
      console.log('db connected')
    })
    .catch((error: unknown) => {
      console.log(error)
    })
}

export default dbConnection
