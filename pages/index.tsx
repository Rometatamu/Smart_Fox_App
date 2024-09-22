import React from 'react';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import styles from "../styles/Home.module.css";
import NavBar from "../components/molecules/NavBar/NavBar";
import HomeContent from '@/components/molecules/HomeContent/HomeContent';

const index = () => {
  return (
    <div className={styles.main}>
      <PageTemplate>
        <NavBar/>
        <HomeContent/>
      </PageTemplate> 
    </div>
  )
}

export default index