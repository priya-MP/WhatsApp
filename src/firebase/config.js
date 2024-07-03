import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdbxIiwG2heQrJLb81se6Wb-py5xXg1f4",
    authDomain: "whatsapp-1426.firebaseapp.com",
    projectId: "whatsapp-1426",
    storageBucket: "whatsapp-1426.appspot.com",
    messagingSenderId: "327704011010",
    appId: "1:327704011010:android:207875f30d23b96a87e21b",
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };