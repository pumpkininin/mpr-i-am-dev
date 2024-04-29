// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVgS8ZPNMgQ-qfwzBj8Fssmf3X5ZHLYkg",
    authDomain: "i-am-dev-project.firebaseapp.com",
    projectId: "i-am-dev-project",
    storageBucket: "i-am-dev-project.appspot.com",
    messagingSenderId: "608954435608",
    appId: "1:608954435608:web:b8b83e48512c1d93a39b6d",
    measurementId: "G-31JQ7G6SBT"
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


