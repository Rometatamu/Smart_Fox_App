import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '../../components/molecules/NavBar/NavBar';
import AnswersWrapper from '@/components/organisms/AnswersWrapper/AnswersWrapper';
import { useState, useEffect } from "react";
import { Answer } from "../../type/answer";
import { FetchAnswers, FetchAnswersWithLike,FetchUserAnswers } from "../../apiCalls/answer";
import { useRouter } from 'next/router'; 
import { ValidateUser } from '@/utils/ValidateUser/ValidateUser';

const AnswerPage = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const router = useRouter(); 

  const getAnswers = async (type: string) => {
    try {
      let answersData;

      if (type === 'user') {
        const isLoggedIn = await ValidateUser();
        if (!isLoggedIn) {
          alert("You need to log in to view your answers.");
          router.push('/login'); 
          return;
        }
        answersData = await FetchUserAnswers(); 
      } else {
        switch (type) {
          case 'all':
            answersData = await FetchAnswers();
            break;
          case 'likes':
            answersData = await FetchAnswersWithLike();
            break;
          default:
            answersData = await FetchAnswers();
        }
      }

      setAnswers(answersData); 
    } catch (err) {
      console.log("Error receiving questions:", err);
    }
  };

  useEffect(() => {
    getAnswers('all'); 
  }, []);

  return (
    <div className={styles.main}>
      <PageTemplate>
        <NavBar />
        <AnswersWrapper 
          answers={answers} 
          onFetchAnswers={getAnswers} 
        />
      </PageTemplate>
    </div>
  );
};

export default AnswerPage;
