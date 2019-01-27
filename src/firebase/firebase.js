import * as firebase from 'firebase';

const config = {
  apiKey: process.env.GATSBY_DB_KEY,
  authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DB_URL,
  projectId: process.env.GATSBY_DB_PROJECT_ID,
  storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
console.log(firebase);
console.log('db', db)
export {
  db,
};
