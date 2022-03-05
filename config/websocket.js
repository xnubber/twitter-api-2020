
module.exports = (io, socket) => {
  const chatMessage = msg => {
    io.emit('chat message', msg)
  }

  socket.on('chat message', chatMessage)
}
