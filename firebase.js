// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };