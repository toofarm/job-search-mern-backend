// import * as firebase from './firebase';
import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var config = {
    apiKey: [REPLACE WITH API KEY],
    authDomain: [REPLACE WITH AUTH DOMAIN],
    databaseURL: [REPLACE WITH DB URL],
    projectId: [REPLACE WITH PROJ ID],
    storageBucket: [REPLACE WITH STORAGE BUCKET],
    messagingSenderId: [REPLACE WITH ID]
  }

  if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp(config)
  }

  const auth = firebaseApp.auth()
  const db = firebaseApp.database()

  export {
      auth,
      db
  }