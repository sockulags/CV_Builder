import React, { useState } from "react";
import { LinkProps } from "../interface";

interface Props {
  links: LinkProps | undefined;
  onUpdateLinks: (links: LinkProps) => void;
}

export const LinksComponent = ({ links, onUpdateLinks }: Props) => {
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
          className="input"
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

  return (
    <div className="linkscomponent-container">
      <form>
        <h1>Links</h1>
        {renderInputContainer("Github", "github", links?.github)}
        {renderInputContainer("LinkedIn","linkedIn", links?.linkedIn)}
        {renderInputContainer("Portfolio","portfolio", links?.portfolio)}
      </form>
    </div>
  );
};
