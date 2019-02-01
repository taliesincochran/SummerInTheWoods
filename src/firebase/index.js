const config = {
  apiKey: process.env.GATSBY_DB_KEY,
  authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DB_URL,
  projectId: process.env.GATSBY_DB_PROJECT_ID,
  storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID
}

let firebaseCache

export const getUiConfig = firebase => ({
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
})

const getFirebase = firebase => {
  if (firebaseCache) {
    return firebaseCache
  }

  firebase.initializeApp(config)
  firebaseCache = firebase
  return firebase
}

export default getFirebase
