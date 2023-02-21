const http = require('http');
const sockets = require('./ws');
httpServer = http.createServer();
const db = require('../../database/lib/helpers');
const models = require('../../database/models/location');


module.exports = {
  server: () => {
    httpServer.listen(7075, () => {
      return new Promise((resolve, reject) => {
        console.log('websocket server is listening on port 7075');
        var location = [];

        const websocket = new sockets(httpServer);

        models.locationModel().then((lmodel) => {
          db.get(lmodel).then((message) => {
            message = message.docs.map((doc) => doc.data().route)

             message[0].map((paths)=>{
                location.push(paths.start);
                location.push(paths.end)
            });

            //console.log(location);
           
            websocket.listen(location);
            websocket.start();
          })
        })

        resolve(websocket)
      })
    })
  },
}
