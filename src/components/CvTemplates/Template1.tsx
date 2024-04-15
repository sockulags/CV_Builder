import React, { useContext, useEffect, useState } from "react";
import "./Template1.css";
import { CvContext } from "../../context/CVContext";
import {
  ContactProps,
  ISkills,
  IWorkExperience,
  LinkProps,
} from "../../interface";

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
            <strong>Phone </strong>
            {value}
          </p>
        );
      case "email":
        return (
          <p key={s} style={{ margin: "0", marginRight: "15px" }}>
            <strong>Email </strong>
            {value}
          </p>
        );
      case "location":
        return (
          <p key={s} style={{ margin: "0", marginRight: "15px" }}>
            <strong>Location </strong>
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
           
          </div>
          <div className="links-container">
              <strong>Links</strong>
              {links?.linkedIn && (
                <a href={links?.linkedIn} target="_blank">
                  <img
                    src="https://i.stack.imgur.com/gVE0j.png"
                    alt="Linkedin"
                    style={{ marginRight: "10px" }}
                  />
                  LinkedIn
                </a>
              )}
              {links?.github && (
                <a href={links?.github} target="_blank">
                  <img src="https://i.stack.imgur.com/tskMh.png" alt="GitHub" />
                  Github
                </a>
              )}
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
            <p>
              <strong>{ed.title}</strong>,{" "}
              <span style={{ fontWeight: "500" }}>{ed.company}</span>,{" "}
              <em>{ed.location}</em>,{" "}
              <span style={{ fontSize: "13px", opacity: "0.9" }}>{" "}
                {ed.startMonth.substring(0, 3)} {ed.startYear} -{" "}
                {ed.endMonth ? ed.endMonth.substring(0, 3) : "Ongoing"}{" "}
                {ed.endYear ? ed.endYear : ""}
              </span>
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

  return (
    <div className="template1-container">
      <div className="original-template">
        {renderContactSection()}
        {renderProfileSection()}
        {renderSkillSection()}
        {renderExperiences(true)}
        {renderExperiences(false)}

        

        <h3 className="section-header">Projects and Assignments</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>
              The Code Cave
            </p>
            <p style={{ margin: "0" }}>
              Developed a personal knowledge repository and blog utilizing
              ASP.NET Core, Entity Framework Core, and Azure Web Services for a
              scalable solution.
            </p>
            <p style={{ margin: "0" }}>
              <strong>Technologies used:</strong> ASP.NET Core, C#, JavaScript,
              HTML & CSS, Entity Framework Core, Identity, TinyMCE, Azure Web
              Services
            </p>
          </div>
          <div>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>
              Klossus Kolossus,{" "}
              <span style={{ fontSize: "14px", fontWeight: "400" }}>
                Academic Work Academy
              </span>
            </p>
            <p style={{ margin: "0" }}>
              Final project of the course. We developed a tetris game in Unity
              using an agile approach. My contributions to the project is most
              of the game logic, and everything including the co-op mode.
            </p>
            <p style={{ margin: "0" }}>
              <strong>Technologies used: </strong>C#, Unity, SCRUM
            </p>
          </div>
          <div>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>
              Thesis Project,{" "}
              <span style={{ fontSize: "14px", fontWeight: "400" }}>
                Örebro University
              </span>
            </p>
            <p style={{ margin: "0" }}>
              <strong>Title</strong>: Streamlining Work Order Processes with
              Lean{" "}
            </p>
            <p style={{ margin: "0" }}>
              Conducted an in-depth analysis of existing work methods for a
              company specializing in maintenance and service for a food
              manufacturer. The project involved a comprehensive review of the
              workflow, culminating in the development of an overarching action
              plan to optimize processes and improve efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
