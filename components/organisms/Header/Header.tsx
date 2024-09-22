import React from 'react'
import styles from "./style.module.css";
import logo from "../../../assets/logo.svg";
import Button from "../../atoms/Button/Button"
import Link from "next/link";


const Header = () => {
  return (
    <header className={styles.main}>
        <div className={styles.logo}>
            <img src={logo.src} alt="smart_fox_logo"></img>
            <h1>Smart Fox</h1>
        </div>
        <div className={styles.auth_bar}>
          <Link href="/login">
           <Button 
           title="Sign Up"
           isLoading={false}
           onClick={() => {}}
           />
           <Button 
           title="Login"
           isLoading={false}
           onClick={() => {}}
           />
          </Link>
        </div>
    </header>
  )
}

export default Header