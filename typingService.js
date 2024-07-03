import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
 
const user = firebase.auth().currentUser;
const typingRef = firebase.database().ref('typing');
 
const getUserTypingRef = () => typingRef.child(user.uid);
 
export { getUserTypingRef };