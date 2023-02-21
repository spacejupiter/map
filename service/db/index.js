const { initiallize} = require('../../database');
const helpers = require('../../database/lib/helpers');

module.exports = {
  _createData : (data)=>{
    console.log('[DB SERVICE]')
    initiallize().then(db=>{
        helpers.create(db,data).then(message=> resolve(message));
    })
  }
}