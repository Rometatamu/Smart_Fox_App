import React, {ReactNode} from 'react';
import styles from "./style.module.css";
import Main from "../../organisms/Main/Main"
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

type PageTemplateProps = {
    children: ReactNode;
};

const PageTemplate = ({ children}:PageTemplateProps) => {
  return (
    <div className={styles.pageWrapper}>
       <Header/>
       <div className={styles.main}>
         <Main>{children}</Main>
       </div>
       <Footer copyrightTitle="Smart Fox © All rights reserved" />
    </div>
  )
}

export default PageTemplate