import React, { useState, useEffect } from 'react';

interface Props {
    propName: string;
    propValue: string;
    handleChange: (value: string) => void;
    onLeave: () => void;
}

export const InputElement = ({ propName, propValue, handleChange, onLeave }: Props) => {
    const [value, setValue] = useState(propValue);

    useEffect(() => {
        setValue(propValue);
    }, [propValue]);

    const handleBlur = () => {
        handleChange(value);
        onLeave();
    };

    const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className='input-container'>
            <input
                className='input'
                type='text'
                value={value}
                onChange={handleChangeInternal}
                onBlur={handleBlur}
            />
            <label className="label">{propName}</label>
            <div className='underline'></div>
        </div>
    );
};
