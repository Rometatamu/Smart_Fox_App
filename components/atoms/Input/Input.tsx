import React from 'react';
import styles from './style.module.css';

type InputProps={
    type: string;
    name: string;
    value: string| number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    placeholder: string;
    style ?: React.CSSProperties;
}

const Input = ({ type, name, value, onChange, placeholder, style }:InputProps) => {
  return (
    <input
      className={styles.main}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default Input;