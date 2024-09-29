import React from 'react';
import styles from "./style.module.css";
import logo from "../../../assets/logo.svg";
import Button from "../../atoms/Button/Button";
import Link from "next/link";
import MeniuBtn from '../../../assets/menu-btn.svg';

type HeaderProps = {
  isLoggedIn: boolean;
  onSignOut: () => void; 
  toggleNavBar: () => void; 
};

const Header = ({ isLoggedIn, onSignOut, toggleNavBar }: HeaderProps) => {

  return (
    <header className={styles.main}>
      <div className={styles.mobileBtn}> 
        <button onClick={toggleNavBar}><img src={MeniuBtn.src}/></button>
      </div>
      <div className={styles.logo}>
        <img src={logo.src} alt="smart_fox_logo" />
        <h1>Smart Fox</h1>
      </div>
      <div className={styles.auth_bar}>
        {isLoggedIn ? (
          <Button 
            title="Sign Out"
            isLoading={false}
            onClick={onSignOut} 
          />
        ) : (
          <>
            <Link href="/login">
              <Button 
                title="Login"
                isLoading={false}
                onClick={() => {}}
              />
            </Link>
            <Link href="/login">
              <Button 
                title="Sign Up"
                isLoading={false}
                onClick={() => {}}
                className="hiddenBtn"
              />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
