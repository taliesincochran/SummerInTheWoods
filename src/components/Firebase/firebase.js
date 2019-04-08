const config = {
  apiKey: process.env.GATSBY_DB_KEY,
  authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DB_URL,
  projectId: process.env.GATSBY_DB_PROJECT_ID,
  storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor(app) {
    app.initializeApp(config);

    /* Helper */
    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.extendObject = this.extendObject.bind(this);

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    this.data = {};
  }
  // variables for context

  // *** Helper functions ***
  extendObject = (obj, src) => {
    Object.keys(src).forEach((key) => { this.data[key] = src[key]; });
    return obj;
  };
  updateData = (newData) => {
    this.extendObject(this.data, newData);
  };
  // Generic Database Functions

  changeTarget = (target, value) => this.db.ref(target).set(value);

  changeTargetChild = (target, child, value) => this.db.ref(target).child(child).set(value);

  getValue = (target) => this.db.ref(target).once('value').then(snapshot => snapshot.val());

  getChildValue = (target, child) => this.db.ref(target).child(child).once('value').then(snapshot => snapshot.val());

  getRef = (target) => this.db.ref(target);

  // *** Calendar API ***
  getData = () => {
    return this.data;
  }
  getCalendar = () => {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const year = parseInt(dateObject.getFullYear());
    const month = dateObject.getMonth();
    let getViews = (year) => {
      //  months = ["June", "July", "August"];
      const juneDate = new Date(year, 5, 1);
      const julyDate = new Date(year, 6, 1);
      const augustDate = new Date(year, 7, 1);
      const views = [{month:"June", date: juneDate, i: 0}, {month: "July", date: julyDate, i:1}, {month:"August", date: augustDate, i: 2}]
      // let views = [];
      // months.forEach(month => {
      //   let date = dates[i];
      //   views.push({ month, date, i })
      // });
      return views;
    }
    return (this.getValue('/campTimes/year/').then(rawCampTimes => {
      console.log('rawCampTimes',rawCampTimes)
      // get current date, month, year
      let rawYearsArray = Object.keys(rawCampTimes);
      if (rawYearsArray.length > 0) {
        // get the timezone of the applicant for security purposes
        let localTimezoneOffset = dateObject.getTimezoneOffset()
        // data from firebase to be processed into the year or years to be displayed
        // let rawYearsArray = Object.keys(rawCampTimes['year']);
        rawYearsArray.sort((a, b) => a - b);
        let yearIndex = 0;
        let chosenYear = year;
        //if the date is already past the last week start date, don't display current year
        if (month > 7 && date > 8) {
          yearIndex = rawYearsArray.indexOf((year + 1).toString());
          chosenYear = year + 1;
        } else {
          yearIndex = rawYearsArray.indexOf(year.toString())
        }
        //Get rid of any data that is outdated
        let yearsArray = rawYearsArray.slice(yearIndex)
        //Make an array of relavent camptimes
        let campTimes = yearsArray.map(thisYear => {
          let campTime = rawCampTimes[thisYear];
          return campTime;
        });
        const views = getViews(parseInt(chosenYear));
        const views2 = getViews((parseInt(chosenYear) + 1));
        const weekArray = Object.values(rawCampTimes[chosenYear]);
        const data = ({
          campTimes,
          rawCampTimes,
          date,
          month,
          year,
          localTimezoneOffset,
          yearsArray,
          chosenYear,
          views,
          views2,
          weekArray
        });
        this.data = data;
        return data;
      }
    }))
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
  doCreateUser = (id, username, email) =>
    //consider using email instead of id for setting the user id
    this.db.ref(`users/${id}`).set({
      username: username,
      email: email,
      admin: false
    });

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

  getAdmin = db =>
    db.ref('adminlist/').once('value');

  // *** Message API ***
  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  // *** Application API ***
  applicationSubmit = (obj, key) => this.db.ref('applications');

  getApplications = () => this.db.ref('applications').once('value');

}

let firebase;

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database);
  }
  return firebase;
}

export default getFirebase;
