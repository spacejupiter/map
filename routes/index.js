const auth = require('../controller/auth/auth');

module.exports = function(router){

  router.post('/signup',(req,res) =>{
    auth.signup(req,res);
  });

  router.post('/login',(req,res)=>{
    auth.login(req,res);
  });

  router.get('/test',(req,res)=>{
    res.send({user:'anslem'})
  })
}
