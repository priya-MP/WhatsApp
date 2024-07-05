import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdbxIiwG2heQrJLb81se6Wb-py5xXg1f4',
  authDomain: 'whatsapp-1426.firebaseapp.com',
  databaseURL: 'https://whatsapp-1426-default-rtdb.firebaseio.com',
  projectId: 'whatsapp-1426',
  storageBucket: '',
  messagingSenderId: '327704011010',
  appId: "1:327704011010:android:207875f30d23b96a87e21b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };