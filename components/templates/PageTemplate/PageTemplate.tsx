import React, { ReactNode, useState, useEffect } from 'react';
import styles from "./style.module.css";
import Main from "../../organisms/Main/Main";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import Spiner from "../../atoms/Spiner/Spiner";
import { ValidateUser } from "../../../utils/ValidateUser/ValidateUser";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type PageTemplateProps = {
  children: ReactNode;
  requiresLogin?: boolean;
};

const PageTemplate = ({ children, requiresLogin = false }: PageTemplateProps) => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    setIsLoading(true); 
    const isLoggedIn = await ValidateUser();
    setIsUserLoggedIn(isLoggedIn); 
    setIsLoading(false); 
  };
  const handleSignOut = () => {
    Cookies.remove(process.env.JWT_KEY as string);
    setIsUserLoggedIn(false); 
    router.push("/"); 
  };
  useEffect(() => {
    checkUser();
  }, [requiresLogin]);

  useEffect(() => {
    checkUser(); 
  }, [router.asPath]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Spiner />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header isLoggedIn={isUserLoggedIn} onSignOut={handleSignOut} />
      <div className={styles.main}>
        <Main>{children}</Main>
      </div>
      <Footer copyrightTitle="Smart Fox © All rights reserved" />
    </div>
  );
};

export default PageTemplate;
