import React, { useEffect, useState } from 'react';
import { ContactProps } from '../interface';

interface Props {
    contactInfo: ContactProps | undefined;
    onUpdateContactInfo: (contactInfo: ContactProps) => void;
}

export const ContactInfo = ({ contactInfo, onUpdateContactInfo }: Props) => {
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


    return (
        <div className='contactinfo-container'>
            <form>
                <h1>Contact Information</h1>
                {renderInputContainer("First Name", "firstName", formData.firstName)}
                {renderInputContainer("Last Name", "lastName", formData.lastName)}
                {renderInputContainer("Email", "email", formData.email)}
                {renderInputContainer("Phone number", "phoneNumber", formData.phoneNumber)}
                {renderInputContainer("Location", "location", formData.location)}
            </form>
        </div>
    );
};
