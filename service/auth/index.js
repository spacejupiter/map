
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword} = require('firebase/auth');


module.exports = {
  
  signup: (email,password) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email,password)
        .then((userCredential) => {
          console.log('user saved')
          const user = userCredential.user
          resolve(user);

          // ...
        })
        .catch((error) => {
            console.log(error);
            reject(error)
          const errorCode = error.code
          const errorMessage = error.message
          // ..
        })
    })
  },

  login: (email, password) => {
    return new Promise((resolve, reject) => {
      
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const accessToken = jwt.sign(
            { username: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '40s' },
          )
          const refreshToken = jwt.sign(
            { username: user.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d' },
          )
          const user = userCredential.user
          // ...
          resolve({
            user: user,
            access_secret: accessToken,
            refresh_secret: refreshToken,
          })
        })
        .catch((error) => {
            console.log(error);
          const errorCode = error.code
          const errorMessage = error.message
          reject(error.message)
        })
    })
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        })
    })
  },
}
