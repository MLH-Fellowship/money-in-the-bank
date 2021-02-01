import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var fbConfig = {
    apiKey: "AIzaSyDcvV7xmafCtgG-xjLdSXLdVqkhu0ou8YU",
    authDomain: "budget-49baf.firebaseapp.com",
    databaseURL: "https://budget-49baf-default-rtdb.firebaseio.com",
    projectId: "budget-49baf",
    storageBucket: "budget-49baf.appspot.com",
    messagingSenderId: "355786661483",
    appId: "1:355786661483:web:1df225bd86ed8b9572db2e",
    measurementId: "G-YL8CTN3PHT"
  };
  // Initialize Firebase
  firebase.initializeApp(fbConfig);

export default firebase;