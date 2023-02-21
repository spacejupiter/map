const {firebaseConfig} = require('../../config/config');
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore')


const firebaseApp = firebase.initializeApp(firebaseConfig)

module.exports = {
    initiallize : () =>{
      return new Promise((resolve, reject) => {
      const db = firebaseApp.firestore();
      console.log('[FIREBASE INITIALLIZED]');
    
      resolve(db);
      })

    },
    getApp : () =>{
        return firebaseApp;
    }
}
  
  
  
  
  