import React, { useState } from 'react';
import { LinkProps } from '../interface';

interface Props {
  links: LinkProps | undefined;
  onUpdateLinks: (links: LinkProps) => void;
}

export const LinksComponent = ({ links, onUpdateLinks }: Props) => {
  const [githubChecked, setGithubChecked] = useState(!!links?.github);
  const [linkedInChecked, setLinkedInChecked] = useState(!!links?.linkedIn);
  const [portfolioChecked, setPortfolioChecked] = useState(!!links?.portfolio);

  const renderInputContainer = (name: keyof LinkProps, checked: boolean, value: string | undefined) => {
    const handleCheckboxChange = () => {
      switch (name) {
        case 'github':
          setGithubChecked(!githubChecked);
          break;
        case 'linkedIn':
          setLinkedInChecked(!linkedInChecked);
          break;
        case 'portfolio':
          setPortfolioChecked(!portfolioChecked);
          break;
        default:
          break;
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onUpdateLinks({ ...links, [name]: value });
    };

    return (
      <div className="input-container">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <label>{name}</label>
        <input
          type="url"
          name={name}
          value={value || ''}
          onChange={handleInputChange}
          disabled={!checked}
        />
        <div className="underline" />
      </div>
    );
  };

  return (
    <div className='linkscomponent-container'>
      <form>
        <h1>Links</h1>
        {renderInputContainer('github', githubChecked, links?.github)}
        {renderInputContainer('linkedIn', linkedInChecked, links?.linkedIn)}
        {renderInputContainer('portfolio', portfolioChecked, links?.portfolio)}
      </form>
    </div>
  );
}
