//import libraries
const express = require('express')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const { requireAuth } = require('./middlewares/require_auth')

//init server
const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)
const { connectSocket } = require('./helpers/socket')
const { connectToMongoDb } = require('./helpers/database')

//handle middlewares
app.use('/storage', express.static(__dirname + '/storage'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const initServer = async () => {
  await connectToMongoDb()

  await connectSocket(server)
  server.listen(PORT, () => {
    console.log(`Listen at port ${PORT}`)
  })
}
initServer()

//use routers
const {
  authRoutes, courseRoutes, lectureRoutes, orderRoutes, quizRoutes, reviewRoutes, userRoutes, videoRoutes
} = require('./routes')

app.get('/', (req, res) => {
  res.status(200).json('welcome')
})
app.use('/auth', authRoutes)
app.use('/courses', courseRoutes)
app.use('/lectures', lectureRoutes)
app.use('/orders', orderRoutes)
app.use('/quizes', quizRoutes)
app.use('/reviewes', reviewRoutes)
app.use('/users', userRoutes)
app.use('/videos', videoRoutes)

//handle errors
const {
  errorHandler,
  notFoundErrorHandler,
} = require('./middlewares/error_handler')
app.use(notFoundErrorHandler)
app.use(errorHandler)
