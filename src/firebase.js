import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs8_jpjK3e0JfMfFdNczedPkaMc2uyE1U",
  authDomain: "actividad1-4ab2e.firebaseapp.com",
  projectId: "actividad1-4ab2e",
  storageBucket: "actividad1-4ab2e.firebasestorage.app",
  messagingSenderId: "44179762290",
  appId: "1:44179762290:web:48ab039db493d4ccb6e6eb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
