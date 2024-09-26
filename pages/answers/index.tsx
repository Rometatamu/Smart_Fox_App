import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '../../components/molecules/NavBar/NavBar';
import AnswersWrapper from '@/components/organisms/AnswersWrapper/AnswersWrapper';
import { useState, useEffect } from "react";
import { Answer } from "../../type/answer";
import { FetchAnswers, FetchAnswersWithLike,FetchUserAnswers, DeleteAnswer } from "../../apiCalls/answer";
import { useRouter } from 'next/router'; 
import { ValidateUser } from '@/utils/ValidateUser/ValidateUser';
import Cookies from "js-cookie";

const AnswerPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
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
    const userId = Cookies.get("user_id") || null;
    setUserId(userId);

    if (router.query.id && userId) {
        // Čia galite gauti atsakymus ir atnaujinti state
        // setAnswers(gautiAtsakymus());
    }
  }, [router.query.id]);

   const onDeleteAnswer = async (questionId: string, answerId: string) => {
    try {
        await DeleteAnswer(questionId, { id: answerId });
        // Po sėkmingo trynimo atnaujinkite atsakymų būseną
        setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== answerId));
    } catch (error) {
        console.error("Failed to delete answer", error);
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
          userId={userId}
          onDeleteAnswer={onDeleteAnswer} 
        />
      </PageTemplate>
    </div>
  );
};

export default AnswerPage;
