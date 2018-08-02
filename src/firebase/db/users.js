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
export const doCreateJob = (id, title, company, date) =>
  users.child(id).child('applications').push().set({
    position: title,
    company: company,
    date: date
  })

export const onceGetUserJobs = (id) =>
  db.ref(`users/${id}/applications`).once('value')

export const removeOneJob = (id, application) =>
  db.ref(`users/${id}/applications/${application}`).remove()

export const editOneJob = (id, application, title, company) =>
  db.ref(`users/${id}/applications/${application}`).update({
    position: title,
    company: company
  })

export const addResume = (id, application, filePath) =>
  db.ref(`users/${id}/applications/${application}`).update({
    resume: filePath
  })

export const deleteResume = (id, application) => 
  db.ref(`users/${id}/applications/${application}/resume`).remove()