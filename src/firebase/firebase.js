import firebase from '@firebase/app';
import '@firebase/database';
import { prodConfig, devConfig } from '../constants/variables';



const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;
console.log(process.env);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();

export {
  db
};
