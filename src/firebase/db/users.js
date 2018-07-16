import { db } from '../firebase';

// User API

const users = db.ref('users')

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  })

export const onceGetUsers = () =>
  db.ref('users').once('value')

export const updateUsername = (id, username) =>
  db.ref(`users/${id}`).update({
    '/username': username
  })

// Jobs 

export const doCreateJob = (id, title, company) =>
  users.child(id).child('applications').push().set({
    position: title,
    company: company
  })

export const onceGetUserJobs = (id) =>
  db.ref(`users/${id}/applications`).once('value')

export const removeOneJob = (id, application) =>
  db.ref(`users/${id}/applications/${application}`).remove()