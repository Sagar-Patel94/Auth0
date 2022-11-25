// import firebase from "firebase/app";

// let _messagesDb = null;

// class Firebase {
//   constructor() {
//     firebase.initializeApp({
//       apiKey: 'AIzaSyDK0AzE8gkZrSu8VLviQ_21kzTpkyQuT2s',
//       authDomain: 'fireauth02-30164.firebaseapp.com',
//       projectId: 'fireauth02-30164',
//     });

//     // initialize Firestore through Firebase
//     _messagesDb = firebase.firestore();

//     // disable deprecated features
//     _messagesDb.settings({
//       timestampsInSnapshots: true
//     });
//   }

//   async addMessage(message) {
//     const createdAt = new Date();
//     const author = firebase.auth().currentUser.displayName;
//     return await _messagesDb.collection('messages').add({
//       author,
//       createdAt,
//       message,
//     });
//   }

//   getCurrentUser() {
//     return firebase.auth().currentUser;
//   }

//   async updateProfile(profile) {
//     if (!firebase.auth().currentUser) return;
//     await firebase.auth().currentUser.updateProfile({
//       displayName: profile.name,
//       photoURL: profile.picture,
//     });
//   }

//   async signOut() {
//     await firebase.auth().signOut();
//   }

//   setAuthStateListener(listener) {
//     firebase.auth().onAuthStateChanged(listener);
//   }

//   setMessagesListener(listener) {
//     _messagesDb.collection('messages').orderBy('createdAt', 'desc').limit(10).onSnapshot(listener);
//   }

//   async setToken(token) {
//     await firebase.auth().signInWithCustomToken(token);
//   }
// }

// const firebaseClient = new Firebase();