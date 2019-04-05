// User API

// export const doCreateUser = (db, id, username, email) =>
  //consider using email instead of id for setting the user id
//   db.ref(`users/${id}`).set({
//     username: username,
//     email: email,
//     admin: false
//   });
// export const onceGetUsers = db =>
//   db.ref('users').once('value');

// export const getOneUser = (db, uid) =>
//   db.ref(`users/${uid}`).once('value');

// export const getText = db =>
//   db.ref('text').once('value');

// export const getAdmin = db =>
//   db.ref('adminlist/').once('value')

// Other db APIs ...

// export const getWeeks = () =>db.ref('campTimes/year').once('value')

// export const applicationSubmit = (db, obj, key) => db.ref('applications').child(key).set(obj)

// export const getApplications = db => db.ref('applications').once('value')

// export const changeTarget = (db, target, value) => db.ref(target).set(value)

// export const changeTargetChild = (db, target, child, value) => db.ref(target).child(child).set(value)

// export const getValue = (db, target) => db.ref(target).once('value').then(snapshot => snapshot.val())

// export const getChildValue = (db, target, child) => db.ref(target).child(child).once('value').then(snapshot => snapshot.val())
// export const getRef = (db, target) => db.ref(target)

// export const changeAvailable = (paymentMethod, year, weekArray) => {
//   weekArray.forEach(week=> {
//     let weekRef = db.ref(`campTimes/year/${year}/${week}`);
//     let available = weekRef.child('available').once('value').then(snapshot=>snapshot.val());
//     let pending = weekRef.child('pending').once('value').then(snapshot => snapshot.val());
//     let error = '';
//     if(paymentMethod === "mail" && available > 0 && ((available - pending) > 0)) {
//       weekRef.child('pending').set(pending + 1);
//     } else if (paymentMethod === "paypal" && available > 0) {
//       week.Ref.child('available').set(available - 1);
//     } else {
//       error = "An error has occured, one of the weeks you are applying for is already filled.";
//     }
//     return error;
//   });
// };




