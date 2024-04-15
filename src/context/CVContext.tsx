import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ContactProps, LinkProps, IWorkExperience, ISkills } from '../interface';

export interface CvData {
  contactInfo?: ContactProps;
  links?: LinkProps;
  profile?: string;
  workExperience?: IWorkExperience[];
  education?: IWorkExperience[];
  skills?: ISkills[];
}

export const CvContext = createContext({} as CvData);


interface CvProviderProps {
    children: ReactNode;
  }
  
  
export const CvDataProvider = ({ children }:CvProviderProps) => {
  const [userData, setUserData] = useState<CvData>({});

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const userDoc = doc(db, "cvData", user.uid);
        const docSnap = await getDoc(userDoc);
        console.log(docSnap.exists())
        console.log(user)
        if (docSnap.exists()) {
          const uData = docSnap.data() as CvData;
          console.log(uData)
          setUserData(uData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } 
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  useEffect(() => {
       const bla = userData;
       console.log(bla);
       setUserData(bla)
  }, [userData])



  return (
    <CvContext.Provider value={userData}>
     {children}
    </CvContext.Provider>
  );
};
