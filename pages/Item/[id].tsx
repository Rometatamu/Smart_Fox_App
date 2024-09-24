import styles from './style.module.css';
import { useEffect, useState } from 'react';
import {useRouter} from"next/router";
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '@/components/molecules/NavBar/NavBar';
import QuestionCard from '@/components/molecules/QuestionCard/QuestionCard';
import { GetQuestion } from '@/apiCalls/question';
import {Question} from "../../type/question"

const ItemPage  = () => {
    const [question, setQuestion] = useState<Question | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchQuestion = async () => {
          if (router.query.id) {
            try {
              const fetchedQuestion = await GetQuestion({ id: router.query.id as string }); 
              setQuestion(fetchedQuestion);
            } catch (err) {
              console.log("Error fetching question:", err);
            }
          }
        };
    
        fetchQuestion();
      }, [router.query.id]);
    
  return (
    <div className={styles.main}>
        <PageTemplate requiresLogin={true} >
            <NavBar/>
            {question && <QuestionCard
            id={question.id}
            question_text={question.question_text}
            answered={question.answered}
            date={new Date(question.date).toLocaleDateString()} 
            />}




        </PageTemplate>
    </div>
  )
}

export default ItemPage