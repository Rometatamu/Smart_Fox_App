import React from 'react';
import styles from "./style.module.css";
import Spiner from "../Spiner/Spiner";

type ButtonProps={
    title: string;
    onClick: ()=> void;
    isLoading?: boolean;
    type ?: string;
    style ?: React.CSSProperties;

}

const Button = ({title, onClick, isLoading, type}:ButtonProps) => {
  return (
    <button className={`${styles.main} ${type==="DANGER" && styles.danger} ${type==="CALL" && styles.call}`}
        onClick={onClick}>
       {isLoading ? <Spiner/> :<>{title}</>}</button>

  )
}
export default Button
