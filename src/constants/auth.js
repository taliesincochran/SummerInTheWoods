
// // Sign Up
// export const doCreateUserWithEmailAndPassword = (auth, email, password) =>
//  auth.createUserWithEmailAndPassword(email, password);

// // Sign In
// export const doSignInWithEmailAndPassword = (firebase, email, password) =>
//     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//       .then(function() {
//         return firebase.auth().signInWithEmailAndPassword(firebase, email, password);
//       })
//       .catch(function(error) {
//         console.log(error)
//       });


// // Sign out
// export const doSignOut = auth =>
//  auth.signOut();

// // Password Reset
// export const doPasswordReset = (auth, email) =>
//  auth.sendPasswordResetEmail(email);

// // Password Change
// export const doPasswordUpdate = (auth, password) =>
//  auth.currentUser.updatePassword(password);