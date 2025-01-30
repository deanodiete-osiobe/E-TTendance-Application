// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRVUVWEryj95PIExnuZBPhWOGes7nzvQw",
  authDomain: "e-ttendance-fyp-application.firebaseapp.com",
  projectId: "e-ttendance-fyp-application",
  storageBucket: "e-ttendance-fyp-application.appspot.com",
  messagingSenderId: "885589951102",
  appId: "1:885589951102:web:359653ca9f5575d6b48e2f",
  measurementId: "G-ZVEWR69QH8"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // const auth = getAuth(firebase.initializeApp(firebaseConfig));
}

export {firebase};