// import * as firebase from './firebase'
import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var config = {
    apiKey: [],
    authDomain: [],
    databaseURL: [],
    projectId: [],
    storageBucket: [],
    messagingSenderId: []
  }

  if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp(config)
  }

  const auth = firebaseApp.auth()
  const db = firebaseApp.database()
  const storage = firebaseApp.storage()

  export {
      auth,
      db,
      storage
  }