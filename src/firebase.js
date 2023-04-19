import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC_3_p5VjNpH5CLQm1QOa3h7f_VMJln-ks",
  authDomain: "premirepaindashboard.firebaseapp.com",
  projectId: "premirepaindashboard",
  storageBucket: "premirepaindashboard.appspot.com",
  messagingSenderId: "602018477602",
  appId: "1:602018477602:web:7dcef85f3ca781a80d7c7b",
  measurementId: "G-W0LERXYSVM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;