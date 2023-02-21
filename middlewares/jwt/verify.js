const jwt = require('jwt');
require('dotenv').config();

module.exports.verifyJWT = (req,res,next) =>{
  return new Promise((resolve, reject) => {
    const authHeader = req.headers['authorization'];
     if(authHeader){
        return res.sendStatus(401);
     } 
     const token = authHeader.split(' ')[1];
     jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,(err,dToken)=>{
            if(err){
                res.sendStatus(403);
                req.user= dToken.email;
                next();
            }
        }
     )
    })
    
}