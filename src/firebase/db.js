import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
//consider using email instead of id for setting the user id
  db.ref(`users/${email}`).set({
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

export const applicationSubmit = (obj, resolve, reject) => 
  db.ref('applications/').child(obj.key).set(obj);
  // if (Error){
  //               console.log("Application: ", obj);
  //               console.log("Error: ", Error);
  //               reject(Error("Submission failed!"));
  //           }
  // else {
  //     resolve("Application submitted!");                
  // }


export const getApplications = ()=> {
  db.ref('applications/').once('value')
}



