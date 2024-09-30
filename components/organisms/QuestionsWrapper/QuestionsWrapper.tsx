import { useState } from "react";
import styles from './style.module.css';
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import QuestionCard from "../../molecules/QuestionCard/QuestionCard";
import { Question } from "../../../type/question";
import { SubmitQuestion } from "@/apiCalls/question";
import { useRouter } from "next/router";

type QuestionsWrapperProps = {
    questions: Question[];
    onQuestionSubmit: () => void;
    onFetchQuestions: (type: string) => void; 
    isUserLoggedIn: boolean;
};

const QuestionsWrapper = ({ questions, onQuestionSubmit, onFetchQuestions,isUserLoggedIn }: QuestionsWrapperProps) => {
    const [questionText, setQuestionText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!isUserLoggedIn) {
            alert("You need to log in to submit a question.");
            router.push("/login");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await SubmitQuestion({ question_text: questionText });
            if (response.status === 201) {
                alert("Question submitted successfully!");
                onQuestionSubmit();
                setQuestionText("");
            } else {
                alert("Failed to submit question.");;
            }
        } catch (error) {
            console.error("Error submitting question:", error);
            alert("An error occurred while submitting your question.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.searchBox}>
                <Button
                    title="Answered"
                    isLoading={false}
                    onClick={() => onFetchQuestions('answered')} 
                    type="CALL"
                />
                <Button
                    title="Not answered"
                    isLoading={false}
                    onClick={() => onFetchQuestions('not_answered')} 
                    type="CALL"
                />
                <Button
                    title="My questions"
                    isLoading={false}
                    onClick={() => onFetchQuestions('user')} 
                    type="CALL"
                />
                <Button
                    title="All questions"
                    isLoading={false}
                    onClick={() => onFetchQuestions('all')} 
                    type="CALL"
                />
            </div>
            <div className={styles.textarea}>
                <Input
                    type="textarea"
                    name="question_text"
                    value={questionText}
                    placeholder="Add your question"
                    onChange={(e) => {
                        setQuestionText(e.target.value);
                    }}
                />
                <Button
                    title="Submit"
                    isLoading={isLoading}
                    onClick={handleSubmit}
                />
            </div>
            <div className={styles.questions}>
                {questions.map((question) => (
                    <div key={question.id}> 
                        <QuestionCard
                            id={question.id}
                            question_text={question.question_text}
                            answered={question.answered}
                            date={new Date(question.date).toLocaleDateString()} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsWrapper;
