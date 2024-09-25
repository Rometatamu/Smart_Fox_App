import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '../../components/molecules/NavBar/NavBar';
import QuestionsWrapper from '@/components/organisms/QuestionsWrapper/QuestionsWrapper';
import { useState, useEffect } from "react";
import { Question } from "../../type/question";
import { FetchQuestions } from "../../apiCalls/question";
import { FetchUserQuestions } from "../../apiCalls/question";
import {FetchAnsweredQuestions, FetchNotAnsweredQuestions} from "../../apiCalls/question";
import { useRouter } from 'next/router'; 
import { ValidateUser } from '@/utils/ValidateUser/ValidateUser';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter(); 

  const getQuestions = async (type: string) => {
    try {
      let questionsData;

      if (type === 'user') {
        const isLoggedIn = await ValidateUser();
        if (!isLoggedIn) {
          alert("You need to log in to view your questions.");
          router.push('/login'); 
          return;
        }
        questionsData = await FetchUserQuestions(); 
      } else {
        switch (type) {
          case 'all':
            questionsData = await FetchQuestions();
            break;
          case 'answered':
            questionsData = await FetchAnsweredQuestions();
            break;
          case 'not_answered':
            questionsData = await FetchNotAnsweredQuestions(); 
            break;
          default:
            questionsData = await FetchQuestions();
        }
      }

      setQuestions(questionsData); 
    } catch (err) {
      console.log("Error receiving questions:", err);
    }
  };

  useEffect(() => {
    getQuestions('all'); 
  }, []);

  return (
    <div className={styles.main}>
      <PageTemplate>
        <NavBar />
        <QuestionsWrapper 
          questions={questions} 
          onQuestionSubmit={() => getQuestions('all')} 
          onFetchQuestions={getQuestions} 
        />
      </PageTemplate>
    </div>
  );
};

export default QuestionsPage;
