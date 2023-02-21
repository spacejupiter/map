const websocket = require('websocket').server;
const uId = require('uniqid');
const EventEmitter2 = require('eventemitter2');
const admin = require('../auth');

class communication {
  constructor(server) {
    this.clients = {}
    this.httpServer = server
    this.emitter = new EventEmitter2({})
  }

  allowconnection(origin) {}

  register(connection) {
    return new Promise((resolve, reject) => {
      var connection_id = uId()
      this.clients[connection_id] = connection
      resolve(connection_id)
    })
  }

  sendToClient(_id, message) {
    var clientConnection = this.clients[_id]
    clientConnection.send(JSON.stringify({ message: message }))
  }

  broadCast(message) {
    if (!(this.clients === {})) {
      Object.values(this.clients).map((connection) => {
        connection.send(JSON.stringify(message))
      })
    }
  }
  start() {
    this.emitter.on('start', (data) => {
        var startInterval
      var type = JSON.parse(data.message.utf8Data).data.type
      var payload = JSON.parse(data.message.utf8Data).data.payload
      console.log(payload)
      if (type === 'controls') {
        if (payload === 'on') {
          var i = 0

          startInterval = setInterval(() => {
            if (i == data.location.length - 1) {
              i = 0
            }
            this.broadCast({
              type: 'geo-location',
              payload: data.location[i++],
            })
          }, 1500)
        }
        if(payload === 'off'){
            
            clearInterval(startInterval);
            console.log('cleared')
            
        }
      }
    })
  }

  listen(glocation) {
    const socket = new websocket({
      httpServer: this.httpServer,
    })

    return new Promise((resolve, reject) => {
      socket.on('request', (request) => {
        //will handle logic for origin
        if (true) {
          var connection = request.accept('echo-protocol', request.origin)
          console.log('-----')

          this.register(connection).then((connection_id) => {
            connection.send(
              JSON.stringify({
                type: 'authorization',
                _id: connection_id,
              }),
            )
          })

          console.log(Object.keys(this.clients))

          console.log('new connection ' + new Date().getTime())

          connection.on('message', (message) => {
            //console.log(JSON.parse(message.utf8Data));

            var messageType = JSON.parse(message.utf8Data).data.type
            this.emitter.emit('start', {
              message: message,
              location: glocation,
            })

            var clientMessage = JSON.parse(message.utf8Data)
            //this.sendToClient(clientMessage._id)

            if (messageType && messageType == 'geo-location') {
              console.log('sent')
            }

            console.log(clientMessage._id)
          })
        }
      })
    })
  }
}
module.exports = communication
