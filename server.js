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
const { connectSocket } = require('./services/socket')
const { connectToMongoDb } = require('./services/database')

//handle middlewares
app.use('/storage', express.static(__dirname + '/storage'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
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
  chatsRouter,
  authRouter,
  postsRouter,
  usersRouter,
  messagesRouter,
  stickersRouter,
  coursesRouter
} = require('./routes')

app.get('/', (req, res) => {
  res.status(200).json('welcome')
})
app.use('/auth', authRouter)
app.use('/stickers', stickersRouter)
app.use('/users', usersRouter)
app.use('/courses', coursesRouter)
// app.use('/chats', chatsRouter)
// app.use('/posts', postsRouter)
// app.use('/messages', messagesRouter)

//handle errors
const {
  errorHandler,
  notFoundErrorHandler,
} = require('./middlewares/error_handler')
app.use(notFoundErrorHandler)
app.use(errorHandler)
