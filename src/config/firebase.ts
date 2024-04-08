import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtHaDhubmJprcqKDjS9p5LnxspXIYFOqM",
  authDomain: "cvbuilder-bd640.firebaseapp.com",
  projectId: "cvbuilder-bd640",
  storageBucket: "cvbuilder-bd640.appspot.com",
  messagingSenderId: "1044068599738",
  appId: "1:1044068599738:web:b5a6a0f85a38c87e25ff83",
  measurementId: "G-NXD4QD6VRJ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();