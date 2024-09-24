import React, {ReactNode, useState, useEffect} from 'react';
import styles from "./style.module.css";
import Main from "../../organisms/Main/Main"
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import Spiner from "../../atoms/Spiner/Spiner";
import {ValidateUser} from "../../../utils/ValidateUser/ValidateUser";

type PageTemplateProps = {
  children: ReactNode;
  requiresLogin?: boolean; 
};

const PageTemplate = ({ children, requiresLogin = false }: PageTemplateProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    if (requiresLogin) {
      const isLoggedIn = await ValidateUser();
      setIsUserLoggedIn(isLoggedIn);
    } else {
      setIsUserLoggedIn(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkUser();
  },[requiresLogin]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Spiner />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.main}>
        <Main>{children}</Main>
      </div>
      <Footer copyrightTitle="Smart Fox © All rights reserved" />
    </div>
  );
};

export default PageTemplate