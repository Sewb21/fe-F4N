import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';

const Firebase = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export default Firebase;
