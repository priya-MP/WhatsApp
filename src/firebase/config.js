import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdKdjwf-xj05wwlS1XQhIgWxeFdhkMjb0',
  authDomain: 'whatsapp-pro-1426.firebaseapp.com',
  databaseURL: 'https://whatsapp-pro-1426-default-rtdb.firebaseio.com',
  projectId: 'whatsapp-pro-1426',
  storageBucket: '',
  messagingSenderId: '1086255590455',
  appId: "1:1086255590455:android:b38831b7d1575800b823b2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };