import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyChwJ7cUr81BnKvNDuBFSNJyV1K7vtIZ1w",
    authDomain: "react-crud-f0323.firebaseapp.com",
    projectId: "react-crud-f0323",
    storageBucket: "react-crud-f0323.appspot.com",
    messagingSenderId: "687070923495",
    appId: "1:687070923495:web:655f95757ff5ff5ab5f042"
};

const fireDb = firebase.initializeApp(firebaseConfig).database();
export default fireDb;