import firebase from 'firebase/compat/app'
import "firebase/compat/database"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCTl9cTIkK80BqyR0EvhJYwr9fgzCb6vmk",
  authDomain: "sparta-myhoneytip-f9c4e.firebaseapp.com",
  projectId: "sparta-myhoneytip-f9c4e",
  storageBucket: "sparta-myhoneytip-f9c4e.appspot.com",
  messagingSenderId: "563052322765",
  appId: "1:563052322765:web:05f059e060c2885176ee84",
  measurementId: "G-FE2JEDEXTX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()