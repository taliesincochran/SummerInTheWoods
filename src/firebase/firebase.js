import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

const prodConfig = {
  apiKey: "AIzaSyDvzDG6RSdBNFP2jaPLc-ezJfIqnkpJAZk",
  authDomain: "jlernercamp.firebaseapp.com",
  databaseURL: "https://jlernercamp.firebaseio.com",
  projectId: "jlernercamp",
  storageBucket: "jlernercamp.appspot.com",
  messagingSenderId: "231699552517",
};

const devConfig = {
  apiKey: "AIzaSyDvzDG6RSdBNFP2jaPLc-ezJfIqnkpJAZk",
  authDomain: "jlernercamp.firebaseapp.com",
  databaseURL: "https://jlernercamp.firebaseio.com",
  projectId: "jlernercamp",
  storageBucket: "jlernercamp.appspot.com",
  messagingSenderId: "231699552517",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
