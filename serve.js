const express = require("express")
const { Socket } = require("socket.io")
const app = express()

app.use(express.static("public"))

const http = require("http").createServer(app)
const socketServer = require("socket.io")(http)

const PORT = process.env.PORT || 3500
http.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))
websocket-manha
socketServer.on("connect", (socket) => {
    console.log("Usuario conectado: " + socket.id);

    socket.on("message", texto => {
      console.log("msg recebida: " + texto)
      socketServer.emit("message", texto)
    })

    socket.on("status", (texto) => socket.broadcast.emit("status", socket.login +" " +texto))
    socket.on("login", (login) => socket.login = login) 

})

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

function recebeConexaoUsuario(socket) {
  socket.on('login', (nickname) => registraLoginUsuario(socket, nickname))
  socket.on('disconnect', () => console.log('Cliente desconectado: ' + socket.nickname))
  socket.on('chat msg', (msg) => encaminhaMsgsUsuarios(socket, msg))
  socket.on('status', (msg) => encaminhaMsgStatus(socket, msg))
}

function encaminhaMsgStatus(socket, msg) {
  console.log(msg)
  socket.broadcast.emit('status', msg)
}

function encaminhaMsgsUsuarios(socket, msg) {
  serverSocket.emit('chat msg', `${socket.nickname} diz: ${msg}`)
}

function registraLoginUsuario(socket, nickname) {
  socket.nickname = nickname
  const msg = nickname + ' conectou'
  console.log(msg)
  serverSocket.emit('chat msg', msg)
}

serverSocket.on('connect', recebeConexaoUsuario)