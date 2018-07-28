import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
//consider using email instead of id for setting the user id
  db.ref(`users/${id}`).set({
    username: username,
    email: email,
    admin: false
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


export const applicationSubmit = (obj) => 
  db.ref('applications/').child(obj.key).set(obj);

export const getApplications = ()=> {
  db.ref('applications/').once('value')

}



