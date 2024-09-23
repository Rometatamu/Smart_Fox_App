import {useState} from "react";
import styles from './style.module.css'
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import QuestionCard from "../../molecules/QuestionCard/QuestionCard";
import {Question} from "../../types/question";

type QuestionsWrapperProps={
    questions: Question[];
}
const QuestionsWrapper = ({questions}:QuestionsWrapperProps) => {
    const [questionText, setQuestionText]=useState("");
  return (
    <div className={styles.main}>
        <div className={styles.searchBox}>
            <Button
             title="Answered"
             isLoading={false}
             onClick={() => {}}
             type="CALL"
            />
            <Button
             title="Not Answered"
             isLoading={false}
             onClick={() => {}}
             type="CALL"
            />
            <Button
             title="My Questions"
             isLoading={false}
             onClick={() => {}}
             type="CALL"
            />
        </div>
        <div className={styles.textarea}>
         <Input
         type="textarea"
         name="question_text"
         value={questionText}
         placeholder="Add your question"
         onChange={(e)=>{
            setQuestionText(e.target.value);
         }}
         style={{
            width: "100%",
            height: "150px",
            padding: "1rem",
            border: "1px solid var(---primery-color)",
            borderRadius: "5px",
            fontSize: "0.8rem",
            resize: "vertical",
        }}
        />
        <Button
            title="Submit"
            isLoading={false}
            onClick={() => {}}
            type="CALL"
        />

        </div>
        <div className={styles.questions}>
          {questions.map((question) => (
            <div key={question.id}>  
              <QuestionCard
                id={question.id}
                question_text={question.question_text}
                answered={question.answered}
                date={question.date}
              />
            </div>
          ))}
        </div>
    </div>
  )
}

export default QuestionsWrapper