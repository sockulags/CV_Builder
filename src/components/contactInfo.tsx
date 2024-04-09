import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ContactInfo } from "../interface";

export const ContactInfoComponent = () => {
  const [updatedContactInfo, setUpdatedContactInfo] = useState<ContactInfo>({
    email: "",
    phoneNumber: "",
    location: "",
    links: {
      github: "",
      linkedIn: "",
      porfolio: ""
    }
  });

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
          setUpdatedContactInfo(userContactInfo);
        }
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedContactInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value
    }));
  };

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedContactInfo((prevContactInfo) => ({
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
        await setDoc(userDoc, { contactInfo: updatedContactInfo }, { merge: true });
      }
    } catch (error) {
      console.error("Error saving contact info:", error);
    }
  };

  return (
    <div>
      <h2>Contact Information</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={updatedContactInfo.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={updatedContactInfo.phoneNumber || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={updatedContactInfo.location || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Github:</label>
        <input
          type="text"
          name="github"
          value={updatedContactInfo.links?.github || ""}
          onChange={handleLinksChange}
        />
      </div>
      <div>
        <label>LinkedIn:</label>
        <input
          type="text"
          name="linkedIn"
          value={updatedContactInfo.links?.linkedIn || ""}
          onChange={handleLinksChange}
        />
      </div>
      <div>
        <label>Portfolio:</label>
        <input
          type="text"
          name="porfolio"
          value={updatedContactInfo.links?.porfolio || ""}
          onChange={handleLinksChange}
        />
      </div>
      <button onClick={saveContactInfo}>Save</button>
    </div>
  );
};
