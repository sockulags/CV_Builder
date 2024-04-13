import React, { useState } from 'react';
// import './contactInfo.css';
import { ContactProps } from '../interface';
import { InputElement } from './Elements/InputElement';

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
            <InputElement propName={'First Name'} propValue={contactInfo?.firstName ?? ""} handleChange={setFirstName}/>
            <InputElement propName={'Last Name'} propValue={contactInfo?.lastName ?? ""} handleChange={setLastName}/>
            <InputElement propName={'Email'} propValue={contactInfo?.email ?? ""} handleChange={setEmail}/>
            <InputElement propName={'Phone number'} propValue={contactInfo?.phoneNumber ?? ""} handleChange={setPhoneNumber}/>
            <InputElement propName={'Location'} propValue={contactInfo?.location ?? ""} handleChange={setLocation}/>
        </form>
      </div>
    );
  };
  
