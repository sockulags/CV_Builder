import "./App.css";
import { Auth } from "./components/auth";
import { auth, db } from "./config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { CvComponent } from "./components/CvComponent";
import { CvDataProvider } from "./context/CVContext";

export function App() {
  // Contact Info

  // Links

  // Profile - type: string 

  // Summary - type: string

  // Work Experience

  // Education


  const getUserInfo = async () => {
    try {   
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const contactInfo = docSnap.data().contactInfo;
          console.log("User's contactInfo:", contactInfo);
        } else {
          console.log("User document does not exist");
        }
      } else {
        console.log("User not signed in");
      }
    } catch (error) {
      console.error("Error fetching user contact info:", error);
    }
  };

  return (
    <div className="App">
      <Auth />
      <CvDataProvider>
        <CvComponent/>
      </CvDataProvider>
 


      <button onClick={getUserInfo}>Get User Contact Info</button>
    </div>
  );
}
