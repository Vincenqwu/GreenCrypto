import { initializeApp } from "firebase/app";
import React from "react";

import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "@env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDv-c-FVGSrkK6TF5grws75vCNQKmfpT-4",
//   authDomain: "green-crypto-app.firebaseapp.com",
//   projectId: "green-crypto-app",
//   storageBucket: "green-crypto-app.appspot.com",
//   messagingSenderId: "324045532006",
//   appId: "1:324045532006:web:2930fb5235695b259036a7",
// };

// Initialize Firebase
const myApp = initializeApp(firebaseConfig);
console.log(apiKey);
export const firestore = getFirestore(myApp);
export const storage = getStorage(myApp);
export const auth = initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
