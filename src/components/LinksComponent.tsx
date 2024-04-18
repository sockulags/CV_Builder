import React, { useState } from "react";
import { LinkProps } from "../interface";
import { EditButton } from "./Elements/EditButton";

interface Props {
  links: LinkProps | undefined;
  onUpdateLinks: (links: LinkProps) => void;
}

export const LinksComponent = ({ links, onUpdateLinks }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const renderInputContainer = (
    name: string,
    keyName: keyof LinkProps,
    value: string | undefined
  ) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onUpdateLinks({ ...links, [name]: value });
    };

    return (
      <div className="input-container">
        <input
        className={`input ${value ? 'has-text' : ''}`}
         
          type="text"
          name={keyName}
          value={value || ""}
          onChange={handleInputChange}
        />
        <label className="label">{name}</label>
        <div className="underline" />
      </div>
    );
  };

  const renderLinks = () => {
    return (
      <div className="info-container">
        <div className="row">
          <div>Github:</div><div>{links?.github}</div>
        </div>
        <div className="row">
          <div>LinkedIn:</div><div>{links?.linkedIn}</div>
        </div>
        <div className="row">
          <div>Portfolio:</div><div>{links?.portfolio}</div>
        </div>
      </div>
    )
  }

  const handleButtonClick = () => { 
    setEditMode(prev=>!prev);
  }

  return (
    <div className="linkscomponent-container">
      <form>
        <div className="form-header">
        <h1>Links</h1>
{!editMode && <EditButton onButtonClick={handleButtonClick} editMode={editMode}/>}
        </div>
        {
          editMode ? <>
            {renderInputContainer("Github", "github", links?.github)}
        {renderInputContainer("LinkedIn","linkedIn", links?.linkedIn)}
        {renderInputContainer("Portfolio","portfolio", links?.portfolio)}
        <EditButton onButtonClick={handleButtonClick} editMode={editMode}/>
          </>
          :
          renderLinks()
        }
        
      
      </form>
    </div>
  );
};
