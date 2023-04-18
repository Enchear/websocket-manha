const express = require("express")
const app = express()

const http = require("http").createServer(app)

const PORT = 3000
app.listen(PORT, () => console.log('Servidor iniciado na porta ${PORT}'))