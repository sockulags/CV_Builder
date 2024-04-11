import React, { useContext, useState } from 'react';
import {ContactInfo} from "./ContactInfo"
import { LinksComponent } from './LinksComponent';
// import Profile from './Profile';
// import Summary from './Summary';
// import WorkExperience from './WorkExperience';
// import Education from './Education';
import { ContactProps, LinkProps} from '../interface';
import { CvContext } from '../context/CVContext';


export const CvComponent = () => {

const userData = useContext(CvContext);
  // Define state variables
  const [contactInfo, setContactInfo] = useState<ContactProps | undefined>(userData.contactInfo);
  const [links, setLinks] = useState<LinkProps | undefined>(userData.links);
//   const [profile, setProfile] = useState('');
//   const [summary, setSummary] = useState('');
//   const [workExperience, setWorkExperience] = useState([]);
//   const [education, setEducation] = useState([]);

  // Function to update contact info
  const updateContactInfo = (newContactInfo:ContactProps) => {
    console.log(newContactInfo);
    setContactInfo(newContactInfo);
  };

  // Function to update links
  const updateLinks = (newLinks:LinkProps) => {
    setLinks(newLinks);
  };

//   // Function to update profile
//   const updateProfile = (newProfile) => {
//     setProfile(newProfile);
//   };

//   // Function to update summary
//   const updateSummary = (newSummary) => {
//     setSummary(newSummary);
//   };

//   // Function to update work experience
//   const updateWorkExperience = (newWorkExperience) => {
//     setWorkExperience(newWorkExperience);
//   };

//   // Function to update education
//   const updateEducation = (newEducation) => {
//     setEducation(newEducation);
//   };

  return (
    <div className="cvcomponent-container">
      <ContactInfo contactInfo={contactInfo} onUpdateContactInfo={updateContactInfo} />
       <LinksComponent links={links} onUpdateLinks={updateLinks} />
      {/*<Profile profile={profile} onUpdateProfile={updateProfile} />
      <Summary summary={summary} onUpdateSummary={updateSummary} />
      <WorkExperience workExperience={workExperience} onUpdateWorkExperience={updateWorkExperience} />
      <Education education={education} onUpdateEducation={updateEducation} /> */}
    </div>
  );
}

export default CvComponent;
