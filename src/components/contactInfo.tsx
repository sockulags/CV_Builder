import React, { useEffect, useState } from 'react';
import { ContactProps } from '../interface';

interface Props {
    contactInfo: ContactProps | undefined;
    onUpdateContactInfo: (contactInfo: ContactProps) => void;
}

export const ContactInfo = ({ contactInfo, onUpdateContactInfo }: Props) => {
   const [editMode, setEditMode] = useState<boolean>(false);
  const renderInputContainer = (
        name: string,
        keyName: keyof ContactProps,
        value: string | undefined
    ) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        };

        return (
            <div className="input-container">
                <input
                      className={`input ${value ? 'has-text' : ''}`}
                    type="text"
                    name={keyName}
                    value={value || ""}
                    onChange={handleInputChange}
                    onBlur={() => onUpdateContactInfo(formData)}
                />
                <label className="label">{name}</label>
                <div className="underline" />
            </div>
        );
    };

    const [formData, setFormData] = useState<ContactProps>(() => ({
        firstName: contactInfo ? contactInfo.firstName : '',
        lastName: contactInfo ? contactInfo.lastName : '',
        email: contactInfo ? contactInfo.email : '',
        phoneNumber: contactInfo ? contactInfo.phoneNumber : '',
        location: contactInfo ? contactInfo.location : '',
    }));

    useEffect(() => {
        if (contactInfo) {
            setFormData(contactInfo);
        }
    }, [contactInfo]);

    const renderContactInfo = () => {
      return (
        <div className="info-container">
          <div className="row">
           <div>Name:</div>{formData.firstName} {formData.lastName}
          </div>
          <div className="row">
            <div>Email:</div>
             {formData.email}
          </div>
          <div className="row">
            <div>Phone number:</div> {formData.phoneNumber} 
          </div>
          <div className="row">
           <div>Location:</div> {formData.location} 
          </div>
        </div>
      )
    }

    const handleButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setEditMode(prev => !prev)
    }

    return (
      <div className='contactinfo-container'>
          <form>
              <h1>Contact Information <button onClick={handleButtonClick}>{editMode ? "Save Changes" : "Edit"}</button></h1>
              {editMode ? (
                  <>
                      {renderInputContainer("First Name", "firstName", formData.firstName)}
                      {renderInputContainer("Last Name", "lastName", formData.lastName)}
                      {renderInputContainer("Email", "email", formData.email)}
                      {renderInputContainer("Phone number", "phoneNumber", formData.phoneNumber)}
                      {renderInputContainer("Location", "location", formData.location)}
                  </>
              ) : (
                  renderContactInfo()
              )}
          </form>
      </div>
  );
  
};
