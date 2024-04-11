import React, { useContext, useState } from 'react';
import {ContactInfo} from "./ContactInfo"
import { LinksComponent } from './LinksComponent';
// import Profile from './Profile';
// import Summary from './Summary';
// import WorkExperience from './WorkExperience';
// import Education from './Education';
import { ContactProps, LinkProps, IWorkExperience} from '../interface';
import { CvContext } from '../context/CVContext';
import { WorkExperienceComponent } from './WorkExperience';
import { Profile } from './Profile';


export const CvComponent = () => {

const userData = useContext(CvContext);
  // Define state variables
  const [contactInfo, setContactInfo] = useState<ContactProps | undefined>(userData.contactInfo);
  const [links, setLinks] = useState<LinkProps | undefined>(userData.links);
  const [profile, setProfile] = useState('');
//   const [summary, setSummary] = useState('');
  const [workExperience, setWorkExperience] = useState<IWorkExperience[] | undefined>([]);
//   const [education, setEducation] = useState([]);

  // Function to update contact info
  const updateContactInfo = (newContactInfo:ContactProps) => {
    console.log(newContactInfo);
    setContactInfo(newContactInfo);
  };

  // Function to update links
  const updateLinks = (newLinks:LinkProps) => {
    setLinks(newLinks);
    console.log(newLinks);
  };

//   // Function to update profile
  const updateProfile = (newProfile:string) => {
    setProfile(newProfile);
    console.log(profile);
  };

//   // Function to update summary
//   const updateSummary = (newSummary) => {
//     setSummary(newSummary);
//   };

  // Function to update work experience
  const updateWorkExperience = (newWorkExperience:IWorkExperience[]) => {
    setWorkExperience(newWorkExperience);
    console.log(workExperience)
  };

//   // Function to update education
//   const updateEducation = (newEducation) => {
//     setEducation(newEducation);
//   };

  return (
    <div className="cvcomponent-container">
      <ContactInfo contactInfo={contactInfo} onUpdateContactInfo={updateContactInfo} />
      <Profile profileText={profile} onUpdateProfile={updateProfile} />
       <LinksComponent links={links} onUpdateLinks={updateLinks} />
       <WorkExperienceComponent experience={workExperience} onUpdateWorkExperience={updateWorkExperience} isEducation={false} />
       <WorkExperienceComponent experience={workExperience} onUpdateWorkExperience={updateWorkExperience} isEducation={true}/>

      {/*
      <Summary summary={summary} onUpdateSummary={updateSummary} />*/}
    </div>
  );
}

export default CvComponent;
