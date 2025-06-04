import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Importa o Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBdEUXWD6ieqJ4EnElUW78x5_FlbXy0CuE",
  authDomain: "healthtrack.firebaseapp.com",
  projectId: "healthtrack",
  storageBucket: "healthtrack.appspot.com",
  messagingSenderId: "656487711987",
  appId: "1:656487711987:web:0e9dbc7f5301743d8ce386"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Referência para o Realtime Database
const database = firebase.database();

export { database };