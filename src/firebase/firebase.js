import firebase from '@firebase/app';
import '@firebase/database';

const prodConfig = {
  apiKey: process.env.GATSBY_DB_KEY,
  authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DB_URL,
  projectId: process.env.GATSBY_DB_PROJECT_ID,
  storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.GATSBY_DB_KEY,
  authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DB_URL,
  projectId: process.env.GATSBY_DB_PROJECT_ID,
  storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();

export {
  db
};
