import React, { useState } from 'react';
import { IWorkExperience } from '../interface';

interface Props {
  experience: IWorkExperience[] | undefined;
  onUpdateWorkExperience: (experience: IWorkExperience[]) => void;
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

   const [useBulletDescription, setUseBulletDescription] = useState<boolean>(false);

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
    onUpdateWorkExperience([...(experience || []), formData]);
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

  // Function to render text input field
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

  // Function to render select input field
  const renderSelectInput = (name: keyof IWorkExperience, label: string, options: string[]) => (
    <div className="input-container" key={name}>
      <select
        className="input"
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

  // Function to render checkbox input field
  const renderCheckboxInput = () => (
    <div className="input-container" key={"useBulletDescription"}>
      <input
        className="input"
        type="checkbox"
        name={"useBulletDescription"}
        checked={useBulletDescription}
        onChange={() => setUseBulletDescription(prev => !prev)}
      />
      <label className="label">{useBulletDescription ? "Paragraph" : "Bullet points"}</label>
      <div className="underline"></div>
    </div>
  );

  return (
    <div className='workexperience-container'>
      <form onSubmit={handleSubmit}>
        <h1>{isEducation ? "Education" : "Work Experience"}</h1>
        {renderTextInput('title', 'Title')}
        {renderTextInput('company', isEducation ? "School":'Company')}
        {renderTextInput('location', 'Location')}
        {renderSelectInput('startMonth', 'Start Month', ['January', 'February', 'March', /*...*/])}
        {renderSelectInput('endMonth', 'End Month', ['January', 'February', 'March', /*...*/])}
        {renderSelectInput('startYear', 'Start Year', ['2022', '2021', '2020', /*...*/])}
        {renderSelectInput('endYear', 'End Year', ['2022', '2021', '2020', /*...*/])}
        {renderCheckboxInput()}
        {!useBulletDescription && (
          <div className="input-container">
            <textarea
              className="input"
              name="workDescription"
              value={formData.workDescription}
              onChange={handleChange}
            />
            <label className="label">Description</label>
            <div className="underline"></div>
          </div>
        ) }
        {useBulletDescription && (
          <>
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
                <div className="underline"></div>
              </div>
            ))}
            <button type="button" onClick={addBulletDescription}>Add Bullet Point</button>
          </>
        )}
        <button type="submit">Add {isEducation ? "Education": "Experience"}</button>
      </form>
    </div>
  );
}

