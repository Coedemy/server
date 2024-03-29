const mongoose = require('mongoose')
require('dotenv').config()

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env
// const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.upzro.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`

// const uri = `mongodb://mongo:27017/codemy`
const uri = 'mongodb://mongo:27017/codemy'

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const connectToMongoDb = async () => {
  console.log('Connecting...................................')
  const connection = await mongoose.connect(uri, mongooseOptions)
  console.log('Connected to Database')
  return connection
}

const disconnectFromMongDb = async () => {
  return mongoose.disconnect()
}

module.exports = {
  connectToMongoDb,
  disconnectFromMongDb
}
