module.exports = {
  create : (model,data) => {
    return new Promise((resolve, reject) => { 
        console.log('create')
       model.add(data)
       resolve('data saved')
    })
  },
  delete : () => {},

  update : () => {},

  get : (model) => {
    return new Promise((resolve, reject) => {
      var response = model.get();
      resolve(response)
    })
  },
}
