import React, { useState } from 'react';
import { IWorkExperience } from '../interface';
import {months, startYears, endYears} from "../data/info";

interface Props {
  experience: IWorkExperience[] | undefined;
  onUpdateWorkExperience: (experience: IWorkExperience[], isEducation:boolean) => void;
  isEducation: boolean;
}

export const WorkExperienceComponent = ({ experience, onUpdateWorkExperience, isEducation }: Props) => {
  const [formData, setFormData] = useState<IWorkExperience>({
    title: '',
    company: '',
    location: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    workDescription: '',
    bulletDescription: [''],
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData)
  };

   const addBulletDescription = () => {
    setFormData(prevState => ({
      ...prevState,
      bulletDescription: [...prevState.bulletDescription!, ''],
    }));
  };

  const handleBulletDescriptionChange = (index: number, value: string) => {
    setFormData(prevState => {
      const bulletDescription = [...prevState.bulletDescription!];
      bulletDescription[index] = value;
      return { ...prevState, bulletDescription };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!editMode) {
      setEditMode(prev=> !prev);
      return;
    }
    setEditMode(prev=> !prev);
    if (editIndex !== null) {
      const updatedExperience = [...(experience || [])];
      updatedExperience[editIndex] = formData;
      onUpdateWorkExperience(updatedExperience, isEducation);
      setEditIndex(null);
    } else {
      onUpdateWorkExperience([...(experience || []), formData], isEducation);
    }
    setFormData({
      title: '',
      company: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      workDescription: '',
      bulletDescription: [''],
    });
  };
  const renderTextInput = (name: keyof IWorkExperience, label: string) => (
    <div className="input-container" key={name}>
      <input
        className="input"
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
      />
      <label className="label">{label}</label>
      <div className="underline"></div>
    </div>
  );

  const renderSelectInput = (name: keyof IWorkExperience, label: string, options: string[]) => (
    <div className="input-container" key={name}>
      <select       
        name={name}
        value={formData[name]}
        onChange={handleChange}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <label className="label">{label}</label>
      <div className="underline"></div>
    </div>
  );
  const handleEdit = (index: number) => {
    const expToEdit = experience && experience[index];
    if (expToEdit) {
      setFormData(expToEdit);
      setEditIndex(index);
      setEditMode(prev=>!prev);
    }
  };

  const renderExperienceForm = () => {
    return (
      <>
      {renderTextInput('title', 'Title')}
      {renderTextInput('company', isEducation ? "School":'Company')}
      {renderTextInput('location', 'Location')}
      {renderSelectInput('startMonth', 'Start Month', months)}
      {renderSelectInput('startYear', 'Start Year', startYears)}
      {renderSelectInput('endMonth', 'End Month', months)}
      {renderSelectInput('endYear', 'End Year', endYears)}       
      <label className="label">Description</label>
          <textarea
            className="input"
            name="workDescription"
            value={formData.workDescription}
            onChange={handleChange}
            rows={4}            
          />   

          {formData.bulletDescription!.map((bullet, index) => (
            <div className="input-container" key={index}>
              <input
                className="input"
                type="text"
                name={`bulletDescription-${index}`}
                value={bullet}
                onChange={(e) => handleBulletDescriptionChange(index, e.target.value)}
              />
              <label className="label">Bullet points</label>
            </div>
          ))}
          <button type="button" onClick={addBulletDescription}>Add Bullet Point</button>
          </>
    );
  }

  return (
    <div className='workexperience-container'>
    <form onSubmit={handleSubmit}>
      <h1>{isEducation ? "Education" : "Work Experience"}
      </h1>
      {experience && experience.map((exp, index) => (
        <div className="editable-entry" key={index}>
          <h1>{exp.title}</h1>
          <i>{exp.company}</i>
          <span>{exp.startMonth} - {exp.startYear}</span>
          <button type="button" onClick={() => handleEdit(index)}>Edit</button>
        </div>
      ))}
      {editMode && renderExperienceForm()}
      <button type="submit">{editMode ? "Save Changes" : (isEducation ? "Add Education" : "Add Experience")}</button>
    </form>
  </div>
  );
}

