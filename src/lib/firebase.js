import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// here i want to import the seed file
//import { seedDatabase } from "../seed";


const config={
    apiKey: "AIzaSyDMewDXDBZe8aYe8vzHSzIS-NcYAIGpFS0",
    authDomain: "social-pfrm.firebaseapp.com",
    projectId: "social-pfrm",
    storageBucket: "social-pfrm.appspot.com",
    messagingSenderId: "658180293370",
    appId: "1:658180293370:web:d17cefce0f656694f17f43",
    measurementId: "G-SFCNGDJ4C3"
};

const firebase1 = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;
// here is where i want to call seed file only once
//seedDatabase(firebase1);

export {firebase1, FieldValue};