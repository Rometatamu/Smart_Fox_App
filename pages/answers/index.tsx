import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import AnswersWrapper from '@/components/organisms/AnswersWrapper/AnswersWrapper';
import { useState, useEffect } from "react";
import { Answer } from "../../type/answer";
import { FetchAnswers, FetchAnswersWithLike,FetchUserAnswers, DeleteAnswer, PutAnswerReaction,FetchAnswerById } from "../../apiCalls/answer";
import { useRouter } from 'next/router'; 
import { ValidateUser } from '@/utils/ValidateUser/ValidateUser';
import Cookies from "js-cookie";


const AnswerPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const userId = Cookies.get("user_id") || null;
    setUserId(userId);
  }, [router.query.id]);

  const handleReaction = async (reactionType: 'like' | 'dislike', answerId: string) => {
    try {
      if (!userId) {
        const isLoggedIn = await ValidateUser();
        if (!isLoggedIn) {
          alert("You need to log in to react.");
          router.push('/login');
          return;
        }
      }
      if (!answerId) {
        console.error('Answer ID not found');
        return;
      }
      await PutAnswerReaction(reactionType, { id: answerId }); 
      const updatedAnswer = await FetchAnswerById({ id: answerId });
      if (updatedAnswer) {  
        setAnswers((prevAnswers) => 
          prevAnswers.map(answer => answer.id === answerId ? updatedAnswer : answer)
        );
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };
  const onDeleteAnswer = async (questionId: string, answerId: string) => {
    try {
        await DeleteAnswer(questionId, { id: answerId });
        setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== answerId));
    } catch (error) {
        console.error("Failed to delete answer", error);
    }
  };
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
        <AnswersWrapper 
          answers={answers} 
          onFetchAnswers={getAnswers}
          userId={userId}
          onDeleteAnswer={onDeleteAnswer} 
          handleReaction={handleReaction}
        />
      </PageTemplate>
    </div>
  );
};

export default AnswerPage;
