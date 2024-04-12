import React, { useState } from 'react';
// import './contactInfo.css';
import { ContactProps } from '../interface';

interface Props {
    contactInfo: ContactProps | undefined;
    onUpdateContactInfo: (contactInfo: ContactProps) => void;
}

export const ContactInfo = ({ contactInfo, onUpdateContactInfo }: Props) => {
    const [firstName, setFirstName] = useState(contactInfo ? contactInfo.firstName : '');
    const [lastName, setLastName] = useState(contactInfo ? contactInfo.lastName : '');
    const [email, setEmail] = useState(contactInfo ? contactInfo.email : '');
    const [phoneNumber, setPhoneNumber] = useState(contactInfo ? contactInfo.phoneNumber : '');
    const [location, setLocation] = useState(contactInfo ? contactInfo.location : '');
  
    const handleBlur = () => {
      const newContactInfo = {
        firstName,
        lastName,
        email,
        phoneNumber,
        location
      };
  
      onUpdateContactInfo(newContactInfo);
    };
  
    return (
      <div className='contactinfo-container'>
        <form>
        <h1>Contact Information</h1>
          <div className='input-container'>
            <input
            className='input'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleBlur}
            />
            <label className="label">First Name:</label>
            <div className='underline'></div>
          </div>
          <div className='input-container'>
            <input
            className="input"
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={handleBlur}
            />
            <label className="label">Last Name:</label>
            <div className='underline'></div>
          </div>
          <div className='input-container'>
            <input
            className="input"
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
            />
            <label className="label">Email:</label>
            <div className='underline'></div>
          </div>
          <div className='input-container'>
            <input
            className="input"
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={handleBlur}
            />
            <label className="label">Phone Number:</label>
            <div className='underline'></div>
          </div>
          <div className='input-container'>
            <input
            className="input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onBlur={handleBlur}
            />
            <label className="label">Location:</label>
            <div className='underline'></div>
          </div>   
        </form>
      </div>
    );
  };
  
