const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const { Server } = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on('send-message', (data, room) => {
    if (room === '') {
      socket.broadcast.emit('receive-message', data)
    } else {
      socket.to(room).emit('receive-message', data)
    }
  })

  socket.on('join-room', (room) => {
    socket.join(room)
  })
})

server.listen(config.PORT || 3001, () => {
  console.log('Server is running')
})