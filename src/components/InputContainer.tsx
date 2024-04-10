import React, { useEffect } from "react";


interface InputContainerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  const checkIfInputHasText = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      e.target.classList.add("has-text");
    } else {
      e.target.classList.remove("has-text");
    }
  };
  useEffect(() => {
    const inputElement = document.querySelector(`input[name="${name}"]`);
    if (inputElement) {
      checkIfInputHasText({ target: inputElement } as React.FocusEvent<HTMLInputElement>);
    }
  }, [name]); 

  return (
    <div className="input-container">
      <input
        className="input"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={checkIfInputHasText}
        onBlur={checkIfInputHasText}
      />
      <label className="label">{label}</label>
      <div className="underline"></div>
    </div>
  );
};

export default InputContainer;
