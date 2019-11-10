import firebase from "firebase";

const firebaseApp = firebase.initializeApp({  apiKey: "AIzaSyBP-D5Kl5mgYEhEIJ4Y9BfRwtlJH6eQj3I",
  authDomain: "cxo-gababo.firebaseapp.com",
  databaseURL: "https://cxo-gababo.firebaseio.com",
  projectId: "cxo-gababo",
  storageBucket: "cxo-gababo.appspot.com",
  messagingSenderId: "995195095992",
  appId: "1:995195095992:web:43ae32f45eebadfe299d4d"
});

const db = firebaseApp.firestore();

export default db ;
//
// import * as firebase from "firebase/app";
// import
//
// const firebaseConfig = {
//
//   }
//
//
//     firebase.initializeApp(firebaseConfig);
//
//     let db = firebase.firestore()
//     export default db;
//
// const admin = require('firebase-admin');
// const functions = require('firebase-functions');
//
// admin.initializeApp(functions.config().firebase);
//
// let db = admin.firestore()
