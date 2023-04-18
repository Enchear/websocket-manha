const express = require("express")
const { Socket } = require("socket.io")
const app = express()

app.use(express.static("public"))

const http = require("http").createServer(app)
const socketServer = require("socket.io")(http)

const PORT = 3500
http.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))

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
