import React, { useState } from 'react';

interface Props {
  profileText: string | undefined;
  onUpdateProfile: (profileText: string) => void;
}

export const Profile = ({ profileText, onUpdateProfile }: Props) => {
  const [text, setText] = useState<string>(profileText || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    onUpdateProfile(text);
  };

  return (  
      <form>
        <h1>Profile</h1>
        <textarea
          name="profile"
          rows={4}
          placeholder='Write 3-5 sentences about professional self'
          value={text} 
          onChange={handleChange} 
          onBlur={handleBlur}
        />
      </form>  
  );
}
