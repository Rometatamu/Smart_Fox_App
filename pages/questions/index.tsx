import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '../../components/molecules/NavBar/NavBar';
import QuestionsWrapper from '@/components/organisms/QuestionsWrapper/QuestionsWrapper';
import {useState, useEffect} from "react";
import {Question} from "../../components/types/question";
import {FetchQuestions} from "../../components/apiCalls/Question";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questionsData = await FetchQuestions(); 
        setQuestions(questionsData);
      } catch (err) {
        console.log("Error fetching questions:", err);
      }
    };
    getQuestions(); 
  }, []);



  return (
    <div className={styles.main}> 
     <PageTemplate>
      <NavBar/>
      <QuestionsWrapper questions={questions}/>

     </PageTemplate>
    </div>
  )
}

export default QuestionsPage