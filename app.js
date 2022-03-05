if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const passport = require('./config/passport')
const passportJwtSocketIo = require('passport-jwt.socketio')
const helpers = require('./_helpers')
const { apis } = require('./routes')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

app.use((req, res, next) => {
  res.locals.user = helpers.getUser(req)
  next()
})
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api', apis)

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const webSocket = require('./config/websocket')
const onConnction = socket => {
  webSocket(io, socket)
}

io.on('connection', onConnction)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
