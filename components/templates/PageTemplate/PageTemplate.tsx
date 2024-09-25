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

  // Patikriname, ar vartotojas yra prisijungęs
  const checkUser = async () => {
    setIsLoading(true); // Užkrauname, kol tikriname būseną
    const isLoggedIn = await ValidateUser(); // Laukiame atsakymo iš ValidateUser
    setIsUserLoggedIn(isLoggedIn); // Atnaujiname vartotojo būseną
    setIsLoading(false); // Baigiame krauti
  };

  // Atsijungimo funkcija
  const handleSignOut = () => {
    Cookies.remove(process.env.JWT_KEY as string); // Pašaliname slapuką
    setIsUserLoggedIn(false); // Nustatome neprisijungusio vartotojo būseną
    router.push("/"); // Nukreipiame į pagrindinį puslapį
  };

  // Tikriname vartotoją pradiniame krovime
  useEffect(() => {
    checkUser();
  }, [requiresLogin]);

  // Stebime maršruto pokytį ir atnaujiname vartotojo būseną
  useEffect(() => {
    checkUser(); // Kiekvieną kartą, kai keičiasi maršrutas, tikriname vartotoją
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
