import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '../../components/molecules/NavBar/NavBar';
import QuestionsWrapper from '@/components/organisms/QuestionsWrapper/QuestionsWrapper';
import { useState, useEffect } from "react";
import { Question } from "../../type/question";
import { FetchQuestions } from "../../apiCalls/question";
import { FetchUserQuestions } from "../../apiCalls/question";
import {FetchAnsweredQuestions, FetchNotAnsweredQuestions} from "../../apiCalls/question";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const getQuestions = async (type: string) => {
    try {
      let questionsData;
      switch (type) {
        case 'all':
          questionsData = await FetchQuestions();
          break;
        case 'user':
          questionsData = await FetchUserQuestions();
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

