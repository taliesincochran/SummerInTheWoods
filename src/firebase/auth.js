// import { auth } from './firebase';
// import firebase from 'firebase/app';
// // Sign Up
// export const doCreateUserWithEmailAndPassword = (email, password) =>
//  auth.createUserWithEmailAndPassword(email, password);

// // Sign In
// export const doSignInWithEmailAndPassword = (email, password) =>
//     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//       .then(function() {
//         return firebase.auth().signInWithEmailAndPassword(email, password);
//       })
//       .catch(function(error) {
//         // Handle Errors here.
//         console.log(error.code, error.message);
//       });


// // Sign out
// export const doSignOut = () =>
//  auth.signOut();

// // Password Reset
// export const doPasswordReset = (email) =>
//  auth.sendPasswordResetEmail(email);

// // Password Change
// export const doPasswordUpdate = (password) =>
//  auth.currentUser.updatePassword(password);