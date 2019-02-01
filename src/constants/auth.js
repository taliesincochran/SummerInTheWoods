// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password, auth) =>
 auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password, auth, firebase) =>
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.code, error.message);
      });


// Sign out
export const doSignOut = (auth) =>
 auth.signOut();

// Password Reset
export const doPasswordReset = (email, auth) =>
 auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password, auth) =>
 auth.currentUser.updatePassword(password);