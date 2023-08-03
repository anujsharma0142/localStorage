import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCBUtsao62VX3Ol-68DXlOVji9Sf-azo-Q",
    authDomain: "superapp-8829c.firebaseapp.com",
    projectId: "superapp-8829c",
    storageBucket: "superapp-8829c.appspot.com",
    messagingSenderId: "915887871735",
    appId: "1:915887871735:web:3185b375f440e5eb4225f2",
    measurementId: "G-4ZGB4L82HJ"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
