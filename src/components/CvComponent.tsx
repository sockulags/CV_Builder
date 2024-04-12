import React, { useContext, useState } from 'react';
import {ContactInfo} from "./ContactInfo"
import { LinksComponent } from './LinksComponent';
// import Profile from './Profile';
// import Summary from './Summary';
// import WorkExperience from './WorkExperience';
// import Education from './Education';
import { ContactProps, LinkProps, IWorkExperience, ISkills} from '../interface';
import { CvContext } from '../context/CVContext';
import { WorkExperienceComponent } from './WorkExperience';
import { Profile } from './Profile';
import { Skills } from './Skills';


export const CvComponent = () => {

const userData = useContext(CvContext);
  // Define state variables
  const [contactInfo, setContactInfo] = useState<ContactProps | undefined>(userData.contactInfo);
  const [links, setLinks] = useState<LinkProps | undefined>(userData.links);
  const [profile, setProfile] = useState('');
//   const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState<ISkills[] | undefined>(userData.skills);
  const [workExperience, setWorkExperience] = useState<IWorkExperience[] | undefined>([]);
  const [education, setEducation] = useState<IWorkExperience[] | undefined>([]);

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

  const updateSkills = (newSkills: ISkills[]) => {
    setSkills(newSkills);
    console.log(skills)
  }

  // Function to update work experience
  const updateWorkExperience = (newWorkExperience:IWorkExperience[]) => {
    setWorkExperience(newWorkExperience);
    console.log(workExperience)
  };

  // Function to update education
  const updateEducation = (newEducation:IWorkExperience[]) => {
    setEducation(newEducation);
  };

  return (
    <div className="cvcomponent-container">
      <ContactInfo contactInfo={contactInfo} onUpdateContactInfo={updateContactInfo} />
      <Profile profileText={profile} onUpdateProfile={updateProfile} />
       <LinksComponent links={links} onUpdateLinks={updateLinks} />
       <WorkExperienceComponent experience={workExperience} onUpdateWorkExperience={updateWorkExperience} isEducation={false} />
       <WorkExperienceComponent experience={workExperience} onUpdateWorkExperience={updateEducation} isEducation={true}/>
    <Skills skills={skills} onUpdateSkills={updateSkills}/>
      {/*
      <Summary summary={summary} onUpdateSummary={updateSummary} />*/}
    </div>
  );
}

export default CvComponent;
