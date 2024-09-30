import React from 'react';
import styles from './style.module.css';

type InputProps={
  type: string;
  name: string;
  value: string| number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
  placeholder: string;
};

const Input = ({ type, name, value, onChange, placeholder}:InputProps) => {
  return (
    <input
      className={`${styles.main} ${type==="textarea" && styles.textarea}` }
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;