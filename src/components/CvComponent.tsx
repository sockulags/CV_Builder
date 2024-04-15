import React, { useContext, useEffect, useState } from "react";
import { ContactInfo } from "./ContactInfo";
import { LinksComponent } from "./LinksComponent";
import {
  ContactProps,
  LinkProps,
  IWorkExperience,
  ISkills,
} from "../interface";
import { CvContext } from "../context/CVContext";
import { WorkExperienceComponent } from "./WorkExperience";
import { Profile } from "./Profile";
import { Skills } from "./Skills";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const CvComponent = () => {
  const userData = useContext(CvContext);
  
  const [contactInfo, setContactInfo] = useState<ContactProps | undefined>(
    userData.contactInfo
  );
  const [links, setLinks] = useState<LinkProps | undefined>(userData.links);
  const [profile, setProfile] = useState<string | undefined>(userData.profile);
  //   const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState<ISkills[] | undefined>(userData.skills);
  const [workExperience, setWorkExperience] = useState<
    IWorkExperience[] | undefined
  >(userData.workExperience);
  const [education, setEducation] = useState<IWorkExperience[] | undefined>(
    userData.education
  );

   useEffect(() => {
    const { contactInfo, links, profile, workExperience, education, skills } = userData;
    setContactInfo(contactInfo);
    setLinks(links);
    setProfile(profile);
    setWorkExperience(workExperience);
    setEducation(education);
    setSkills(skills);  
  }, [userData]);

  const updateContactInfo = (newContactInfo: ContactProps) => {
    console.log(newContactInfo);
    setContactInfo(newContactInfo);
  };
  const updateLinks = (newLinks: LinkProps) => {
    setLinks(newLinks);
    console.log(newLinks);
  };

   const updateProfile = (newProfile: string) => {
    setProfile(newProfile);
    console.log(profile);
  };

  const updateSkills = (newSkills: ISkills[]) => {
    setSkills(newSkills);
    console.log(skills);
  };
  
  const updateWorkExperience = (
    newWorkExperience: IWorkExperience[],
    isEducation: boolean
  ) => {
    if (!isEducation) setWorkExperience(newWorkExperience);
    console.log(workExperience);
  };

  const updateEducation = (
    newEducation: IWorkExperience[],
    isEducation: boolean
  ) => {
    if (isEducation) setEducation(newEducation);
  };

  const updateCV = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "cvData", user.uid);
        await setDoc(userDocRef, {
          contactInfo,
          links,
          profile,
          workExperience,
          education,
          skills,
        });
        console.log("CV data updated successfully!");
      }
    } catch (error) {
      console.error("Error updating CV data:", error);
    }
  };

  return (
    <div className="cvcomponent-container">
      <ContactInfo
        contactInfo={contactInfo}
        onUpdateContactInfo={updateContactInfo}
      />
      <Profile profileText={profile} onUpdateProfile={updateProfile} />
      <LinksComponent links={links} onUpdateLinks={updateLinks} />
      <WorkExperienceComponent
        experience={workExperience}
        onUpdateWorkExperience={updateWorkExperience}
        isEducation={false}
      />
      <WorkExperienceComponent
        experience={education}
        onUpdateWorkExperience={updateEducation}
        isEducation={true}
      />
      <Skills skills={skills} onUpdateSkills={updateSkills} />
      {/*
      <Summary summary={summary} onUpdateSummary={updateSummary} />*/}
      <button onClick={updateCV}> SAVE Changes</button>
    </div>
  );
};

export default CvComponent;
