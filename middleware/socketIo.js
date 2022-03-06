module.exports = middleware => (socket, next) => {
  socket.request.headers.authorization = socket.handshake.auth.authorization
  return middleware(socket.request, {}, next)
}
