import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ContactProps, Education, LinkProps, IWorkExperience, ISkills } from '../interface';

interface CvData {
  contactInfo?: ContactProps;
  links?: LinkProps;
  workExperience?: IWorkExperience[];
  education?: Education[];
  skills: ISkills[];
}

export const CvContext = createContext({} as CvData);


interface CvProviderProps {
    children: ReactNode;
  }
  
export const CvDataProvider = ({ children }:CvProviderProps) => {
  const [userData, setUserData] = useState<CvData>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data() as CvData;
            setUserData(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <CvContext.Provider value={userData}>
      {children}
    </CvContext.Provider>
  );
};
