// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFvemJM3vUmapLMJDn7VCUy3KKoOWUzRM",
  authDomain: "chatter-auth-1f26a.firebaseapp.com",
  projectId: "chatter-auth-1f26a",
  storageBucket: "chatter-auth-1f26a.appspot.com",
  messagingSenderId: "705501300565",
  appId: "1:705501300565:web:2323b5d821ae2fa7a311dc",
  measurementId: "G-6RPJX3233M"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const authentication = getAuth();
export const database = getFirestore();
//export const database = getFirestore();