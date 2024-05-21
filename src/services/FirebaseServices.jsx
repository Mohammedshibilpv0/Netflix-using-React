/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF2MjPXnIh11sFLcBB9zLfbt-CFXfrzR0",
  authDomain: "fir-1e452.firebaseapp.com",
  projectId: "fir-1e452",
  storageBucket: "fir-1e452.appspot.com",
  messagingSenderId: "863830188049",
  appId: "1:863830188049:web:61048ce8211d010d0951b0",
  measurementId: "G-YV5CEKNLWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app)
export const db=getFirestore(app)