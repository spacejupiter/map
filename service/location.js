const { googleKey } = require('../config/config');
const { Client } = require('@googlemaps/google-maps-services-js');
const models = require('../database/models/location');
const db = require('../database/lib/helpers');

module.exports = {
  getDirection: (source, destination, mode) => {
    return new Promise((resolve, reject) => {
      var test = [{ name: 'anslem' }, { name: 'anslem' }, { age: 6 }]
      const client = new Client({})

      client
        .directions({
          params: {
            origin: { lat: 51.498016, lng: -0.118011 },
            destination: { lat: 51.503162, lng: -0.086852 },
            key: googleKey,
          },
          timeout: 1000, 
        })
        .then((response) => {
          var routes = []
          var data = response.data.routes[0].legs[0].steps
          routes = data.map((path) => {
            return { start: path.start_location, end: path.end_location }
          })

          models.locationModel().then((lmodel) => {
            db.get(lmodel).then((message) => {
              if (!message) {
                db.create(lmodel, {
                  origin: source,
                  destination,
                  route: routes,
                })
              } else {
              }
            })
          })
        })
        .catch((e) => {
          console.log(e)
        })
    })
  },
}
