import { registerRootComponent } from 'expo';
import App from './App';

import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/firestore';

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

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
