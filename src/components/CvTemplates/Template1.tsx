import React, { useContext, useEffect, useState } from "react";
import "./Template1.css";
import { CvContext } from "../../context/CVContext";
import {
  ContactProps,
  ISkills,
  IWorkExperience,
  LinkProps,
} from "../../interface";
import githubLogo from "../../assets/github-logo.svg";
import linkedInLogo from "../../assets/linkedin-logo.svg";

export function Template1() {
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


  const [scale, setScale] = useState(1);


  useEffect(() => {
    const { contactInfo, links, profile, workExperience, education, skills } =
      userData;
    setContactInfo(contactInfo);
    setLinks(links);
    setProfile(profile);
    setWorkExperience(workExperience);
    setEducation(education);
    setSkills(skills);
  }, [userData]);

  const getNameFromKey = (s: string, value: string) => {
    switch (s) {
      case "phoneNumber":
        return (
          <p key={s} style={{ margin: "0", marginRight: "15px" }}>
            <strong>Phone </strong><br/>
            {value}
          </p>
        );
      case "email":
        return (
          <p key={s} style={{ margin: "0", marginRight: "15px" }}>
            <strong>Email </strong><br/>
            {value}
          </p>
        );
      case "location":
        return (
          <p key={s} style={{ margin: "0", marginRight: "15px" }}>
            <strong>Location </strong><br/>
            {value}
          </p>
        );
    }
  };

  const renderContactSection = () => {
    return (
      <div className="profile-section">
        <div className="profile-content">
          <h3>
            {contactInfo?.firstName} {contactInfo?.lastName}
          </h3>
          <p className="profile-title">Full Stack Developer</p>
          <div className="contact-container">
            {contactInfo &&
              Object.entries(contactInfo).map(([key, value]) =>
                getNameFromKey(key, value)
              )}
                  <div className="links-container">  
                  <strong>Links</strong>  
                  {links?.github && (             
                <a href={links?.github} target="_blank">
                      Github
                  <img src={githubLogo} alt="GitHub"
                     />
                
                </a>               
              )}     
              {links?.linkedIn && (               
                <a href={links?.linkedIn} target="_blank">
                      LinkedIn
                  <img
                    src={linkedInLogo}
                    alt="Linkedin"
                    className="linkedin-logo"                   
                  />                
                </a>          
              )}            
              
               {/* {links?.github && (             
                <a href={links?.github} target="_blank">
                    Portfolio
                  <img src={githubLogo} alt="GitHub"
                     />
                  
                </a>               
              )} */}
          </div>
      
              
            </div>
        </div>
      </div>
    );
  };

  const renderProfileSection = () => {
    return (
      <>
        <h3 className="section-header">Profile</h3>
        <p>{profile}</p>
      </>
    );
  };

  const renderSkillSection = () => {
    return (
      <>
        <h3 className="section-header">Technical Skills</h3>
        <div className="skills-container">
          {skills &&
            skills.map((skillCategory, index) => (
              <div className="skills-row">
                <h4 key={index}>{skillCategory.name}</h4>
                {skillCategory.skills.map((skill, skillIndex) => (
                  <p key={skillIndex}>✓ {skill}</p>
                ))}
              </div>
            ))}
        </div>
      </>
    );
  };

  const renderExperiences = (isEducation: boolean) => {
    const obj = isEducation ? education : workExperience;
        return (
      <>
        <h3 className="section-header">{isEducation ? "Education" : "Work Experience"}</h3>
        <div className="education-section"></div>
        {obj?.map((ed, index) => (
          <div key={index}>
            <p className="p-title">
                <div>
              <strong>{ed.title}</strong>,{" "}
              <span style={{ fontWeight: "500" }}>{ed.company}</span>,{" "}
              <em>{ed.location}</em>
              </div>
              <div>
              <span style={{ fontSize: "13px" }}>{" "}
                {ed.startMonth.substring(0, 3)} {ed.startYear} -{" "}
                {ed.endMonth ? ed.endMonth.substring(0, 3) : "Ongoing"}{" "}
                {ed.endYear ? ed.endYear : ""}
              </span>
              </div>
            </p>
            {ed.workDescription && <p>{ed.workDescription}</p>}
            {ed.bulletDescription && ed.bulletDescription.length > 1 && (
              <ul>
                {ed.bulletDescription.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </>
    );
  };
  const scaleUp = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  // Function to handle scaling down
  const scaleDown = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1)); 
  };


  return (
    <div>
      <div className="scale-control">
        <button onClick={scaleDown}>-</button>
        <input type="text" value={`${(scale * 100).toFixed(0)}%`} readOnly />
        <button onClick={scaleUp}>+</button>
      </div>
    <div className="template1-container" style={{ transform: `scale(${scale})` }}>
       
      <div className="original-template" >
        {renderContactSection()}
        {renderProfileSection()}
        {renderSkillSection()}
        {renderExperiences(true)}
        {renderExperiences(false)}

        


      </div>
    </div>
    </div>
  );
}
