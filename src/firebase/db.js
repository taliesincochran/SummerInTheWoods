import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users'/$).once('value');

export const getOneUser = uid => 
	db.ref(`users/${uid}`).once('value')

export const getText = () => 
	db.ref('text').once('value')

export const getAdmin = () => 
	db.ref('adminlist/').once('value')

// Other db APIs ...
export const getWeeks = () =>
	db.ref('campTimes/year').once('value')

export const applicationSubmit = (obj) => {
  db.ref('applications/').set(obj);
}



