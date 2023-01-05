// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDE6ygpB6A4BW9i-YPX1eqLqRAS32JXOzM",
  authDomain: "clone-e03a3.firebaseapp.com",
  projectId: "clone-e03a3",
  storageBucket: "clone-e03a3.appspot.com",
  messagingSenderId: "1026810237519",
  appId: "1:1026810237519:web:821c915c5c5e943487103a",
  measurementId: "G-BNDK0D9TX7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
