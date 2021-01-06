var WebSocketServer = new require("ws")

// подключённые клиенты
var clients = {}

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081,
})
console.log("open")
webSocketServer.on("connection", function (ws) {
  var id = Math.random()
  clients[id] = ws
  console.log("новое соединение " + id)

  ws.on("message", function (message) {
    console.log("получено сообщение " + id + ":" + message)

    for (var key in clients) {
      console.log(parseFloat(key))
      if (parseFloat(key) === parseFloat(id)) {
        console.log(1)
      } else {
        clients[key].send(message)
      }
    }
  })

  ws.on("close", function () {
    console.log("соединение закрыто " + id)
    delete clients[id]
  })
})
