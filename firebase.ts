import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  updateProfile, 
  signInWithEmailAndPassword, 
  setPersistence,
  browserSessionPersistence,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore,
  collection, 
  query,
  where,
  doc,
  addDoc, 
  getDocs, 
  setDoc,
  deleteDoc,
  DocumentData,
  Timestamp,
  onSnapshot
} from "firebase/firestore";


const firebaseConfig = {
  apiKey : import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const authService = getAuth();
const updateProfileService = updateProfile;
const signInWithEmailAndPasswordService = signInWithEmailAndPassword;
const db = getFirestore(app);

export {
  app,
  getAuth,
  authService,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfileService,
  signInWithEmailAndPasswordService,
  setPersistence,
  browserSessionPersistence,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail
}

export {
  db,
  doc,
  collection,
  query,
  where,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  Timestamp,
  onSnapshot
}

export type {
  DocumentData
}
