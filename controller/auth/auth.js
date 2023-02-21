const authService = require('../../service/auth/index')

module.exports = {
  signup: (req, res) => {
    authService.signup(req.body).then((message) => {
      res.send(message)
    })
  },
  login: (req, res) => {
    const email = req.body.emailAddress
    const pwd = req.body.password
    console.log(email);
    authService
      .signup(email, pwd)
      .then((credentials) => {
        res.json({ credentials})
      })
      .catch((e) =>{ 
      res.send(e)
      console.log(e)}
      )
  },
  test: (req, res) => {
   // authService.test();
    res.send('its working')
  },
}
