// import firebase from '@firebase/app';
// import '@firebase/database';
// import '@firebase/auth';

// class Firebase {
//   constructor(app) {
//     app.initializeApp(config);

//     /* Helper */
//     this.serverValue = app.database.ServerValue;
//     this.emailAuthProvider = app.auth.EmailAuthProvider;
//     /* Firebase APIs */
//     this.auth = app.auth();
//     this.db = app.database();
// }
// const prodConfig = {
//   apiKey: process.env.GATSBY_DB_KEY,
//   authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
//   databaseURL: process.env.GATSBY_DB_URL,
//   projectId: process.env.GATSBY_DB_PROJECT_ID,
//   storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
//   messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
// };

// const devConfig = {
//   apiKey: process.env.GATSBY_DB_KEY,
//   authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
//   databaseURL: process.env.GATSBY_DB_URL,
//   projectId: process.env.GATSBY_DB_PROJECT_ID,
//   storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
//   messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === 'production'
//   ? prodConfig
//   : devConfig;

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// const db = firebase.database();
// const auth = firebase.auth();

// export {
//   db,
//   auth
// };
class Firebase {
  constructor(app) {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  doCreateUser = (id, username, email) =>
    //consider using email instead of id for setting the user id
    this.db.ref(`users/${id}`).set({
      username: username,
      email: email,
      admin: false
    });
  onceGetUsers = () =>
    this.db.ref('users').once('value');

  getOneUser = (uid) =>
    this.db.ref(`users/${uid}`).once('value');

  getText = () =>
    this.db.ref('text').once('value');

  getAdmin = () =>
    this.db.ref('adminlist/').once('value')

  // Other db APIs ...

  // getWeeks = () =>db.ref('campTimes/year').once('value')

  applicationSubmit = (obj, key) => this.db.ref('applications').child(key).set(obj)

  getApplications = () => this.db.ref('applications').once('value')

  changeTarget = (target, value) => this.db.ref(target).set(value)

  changeTargetChild = (target, child, value) => this.db.ref(target).child(child).set(value)

  getValue = (target) => this.db.ref(target).once('value').then(snapshot => snapshot.val())

  getChildValue = (target, child) => this.db.ref(target).child(child).once('value').then(snapshot => snapshot.val())
  getRef = (target) => this.db.ref(target)
}

let firebase;

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database);
  }

  return firebase;
}

export default getFirebase;