import React, {ReactNode, useState, useEffect} from 'react';
import styles from "./style.module.css";
import Main from "../../organisms/Main/Main"
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Spiner from "../../atoms/Spiner/Spiner";
import { UserValidation } from "../../apiCalls/user";

type PageTemplateProps = {
    children: ReactNode;
};

const PageTemplate = ({ children}:PageTemplateProps) => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const validateUser = async () => {
    const token = Cookies.get(process.env.JWT_KEY as string);
 
    if (!token) {
      setIsUserLoggedIn(false);
      router.push("/Login");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await UserValidation();
 
      if (response.status === 200) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        router.push("/Login");
      }
    } catch (err) {
      console.log("err", err);
      setIsUserLoggedIn(false);
      router.push("/Login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Spiner /> 
      </div>
    );
  }

  
  return (
    <div className={styles.pageWrapper}>
       <Header/>
       <div className={styles.main}>
        {isUserLoggedIn ? (
        <Main>{children}</Main> 
         ) : (
        <p>You are not loged in . Please Login.</p> 
        )}
       </div>
       <Footer copyrightTitle="Smart Fox © All rights reserved" />
    </div>
  );
};

export default PageTemplate