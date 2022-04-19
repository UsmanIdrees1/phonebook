import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCcT7bvQgMQ8X6sB-eiUrKoD_owMAf_kys",
    authDomain: "phone-book-farhan-project2.firebaseapp.com",
    projectId: "phone-book-farhan-project2",
    storageBucket: "phone-book-farhan-project2.appspot.com",
    messagingSenderId: "945427076078",
    appId: "1:945427076078:web:4cf54462604de60d3c74ff"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();