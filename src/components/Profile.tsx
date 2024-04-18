import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';

interface Props {
  profileText: string | undefined;
  onUpdateProfile: (profileText: string) => void;
}

export const Profile = ({ profileText, onUpdateProfile }: Props) => {
  const [text, setText] = useState<string>(profileText || '');
  const [wordCount, setWordCount] = useState<number>(0);
  const [focused, setFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const areaText = e.target.value;
    setText(areaText);
  };

  useEffect(() => {
    if(profileText)
    setText(profileText);
  },[profileText])

  const handleFocus = () => {
   setFocused(true);    
    if (textareaRef.current) {
      const { value } = textareaRef.current;
      textareaRef.current.focus();
      setTimeout(() => {
        textareaRef.current!.setSelectionRange(value.length, value.length);
      }, 0);
    }
  };

  useEffect(() => {
    const initialWordCount = text.length > 0 ? text.trim().split(' ').length : 0;
    setWordCount(initialWordCount);
  }, [text]);

  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const areaText = e.target.value;
    setFocused(false);
    onUpdateProfile(areaText);
  };

  return (
    <form>
      <div className="form-header">
        <h1>Profile</h1>
      </div>
      <textarea
        ref={textareaRef}
        className={`${focused ? 'row-trans-focused' : 'row-trans'}${
          wordCount > 100 ? 'warning-msg-red' : ''
        }`}
        name="profile"
        placeholder="Write 3-5 sentences about professional self"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        spellCheck={false}
        wrap={'soft'}
      />
      <div className={`warning-msg ${wordCount > 100 ? 'warning-msg-red' : ''}`}>
        Word count: {wordCount} / 100
        {wordCount > 100 && ". Your profile text should not be longer than 100 words."}
      </div>
    </form>
  );
};
