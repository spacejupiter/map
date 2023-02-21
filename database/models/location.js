const db = require('../lib')

module.exports = {
  locationModel: () => {
    return new Promise((resolve, reject) => {
      db.initiallize().then((model) => {
        const locationModel = model.collection('location')
        resolve(locationModel)
      })
    })
  },
}
