import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '@/components/molecules/NavBar/NavBar';
import ItemWrapper from '@/components/organisms/ItemWrapper/ItemWrapper';
import { GetQuestion, DeleteQuestion, SubmitAnswer } from '@/apiCalls/question';
import { FetchQuestionAnswer, PutAnswerReaction,FetchAnswerById} from '@/apiCalls/answer';
import { Question } from "../../type/question";
import { Answer } from '@/type/answer';
import { ValidateUser } from '@/utils/ValidateUser/ValidateUser';
import Cookies from "js-cookie";

const ItemPage = () => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [answer, setAnswer] = useState<Answer | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [answerText, setAnswerText] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
      const fetchQuestionData = async () => {
        const isLoggedIn = await ValidateUser();
        if (!isLoggedIn) {
            alert("You need to log in to view this question.");
            router.push('/questions');
            return;
        }
    
        const userId = Cookies.get("user_id") || null; 
        setUserId(userId);
    
        if (router.query.id && userId) {
            try {
                const fetchedQuestion = await GetQuestion({ id: router.query.id as string });
                
                if (fetchedQuestion) { 
                    setQuestion(fetchedQuestion);
    
                    if (fetchedQuestion.answered) {
                        const fetchedAnswer = await FetchQuestionAnswer({ questionId: fetchedQuestion.id });
                        setAnswer(fetchedAnswer.length > 0 ? fetchedAnswer[0] : null);
                    }
                } else {
                    alert("Question not found.");
                    router.push('/questions'); 
                }
            } catch (err) {
                console.error("Error fetching question:", err);
                alert("Failed to get the question. Please try again later.");
            }
        }
    };
        fetchQuestionData();
    }, [router.query.id]);


    const handleDeleteQuestion = async () => {
        if (question) {
            try {
                await DeleteQuestion({ id: question.id });
                alert("Question deleted.");
                router.push('/questions');
            } catch (err) {
                console.error("Error deleting question:", err);
            }
        }
    };

    const handleSubmitAnswer = async () => {
      if (answerText && question) {
          try {
              const answerData = { answer_text: answerText };
              await SubmitAnswer(question.id, answerData); 
              alert("Answer submitted.");
              setAnswerText(''); 
              router.reload(); 
          } catch (err) {
              console.error("Error submitting answer:", err);
          }
      }
    };
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
            setAnswer(updatedAnswer)
          }
    
        } catch (error) {
          console.error('Error handling reaction:', error);
        }
    };

    return (
        <div className={styles.main}>
            <PageTemplate requiresLogin={true}>
                <NavBar />
                <ItemWrapper
                    question={question}
                    answer={answer}
                    userId={userId}
                    answerText={answerText}
                    setAnswerText={setAnswerText}
                    handleDeleteQuestion={handleDeleteQuestion}
                    handleSubmitAnswer={handleSubmitAnswer}
                    handleReaction={handleReaction}
                />
            </PageTemplate>
        </div>
    );
};

export default ItemPage;
