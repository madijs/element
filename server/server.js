const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const socket = require("socket.io")
const io = socket(server)

const rooms = {}

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id)
    } else {
      rooms[roomID] = [socket.id]
    }
    const otherUser = rooms[roomID].find((id) => id !== socket.id)
    if (otherUser) {
      socket.emit("other user", otherUser)
      socket.to(otherUser).emit("user joined", socket.id)
    }
  })

  socket.on("offer", (playload) => {
    io.to(playload.target).emit("offer", playload)
  })

  socket.on("answer", (playload) => {
    io.to(playload.target).emit("answer", playload)
  })

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate)
  })
})

server.listen(9000, () => console.log("server is running on port 8000"))
