import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ContactInfo } from "../interface";
import InputContainer from "./InputContainer";

export const ContactInfoComponent = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phoneNumber: "",
    location: "",
    links: {
      github: "",
      linkedIn: "",
      portfolio: ""
    }
  });

  const [, setRerender] = useState<boolean>(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);  

  const fetchContactInfo = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userContactInfo = docSnap.data().contactInfo;
          setContactInfo(userContactInfo);
          // Trigger re-render after updating contactInfo
          setRerender(prev => !prev);
        }
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prevContactInfo => ({
      ...prevContactInfo,
      [name]: value
    }));
  };

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prevContactInfo => ({
      ...prevContactInfo,
      links: {
        ...prevContactInfo.links,
        [name]: value
      }
    }));
  };

  const saveContactInfo = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { contactInfo }, { merge: true });
      }
    } catch (error) {
      console.error("Error saving contact info:", error);
    }
    fetchContactInfo();
  };

  return (
    <div>
      <h2>Contact Information</h2>
      {Object.entries(contactInfo).map(([key, value]) => {
        if (key === "links") {        
          return Object.entries(value).map(([linkKey, linkValue]) => (
            <InputContainer
              key={linkKey}
              label={linkKey.charAt(0).toUpperCase() + linkKey.slice(1) + ":"}
              name={linkKey} 
              value={linkValue}
              onChange={handleLinksChange}
            />
          ));
        } else { 
          return (
            <InputContainer
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1) + ":"}
              name={key}
              value={value}
              onChange={handleInputChange}
            />
          );
        }
      })}
      <button onClick={saveContactInfo}>Save</button>
    </div>
  );
};
