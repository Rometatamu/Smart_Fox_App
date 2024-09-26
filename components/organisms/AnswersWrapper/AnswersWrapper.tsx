import styles from './style.module.css';
import Button from "../../atoms/Button/Button";
import AnswerCard from "../../molecules/AnswerCard/AnswerCard";
import { Answer } from "../../../type/answer";



type AnswersWrapperProps = {
    answers: Answer[];
    onFetchAnswers: (type: string) => void; 
};

const AnswersWrapper = ({ answers, onFetchAnswers }: AnswersWrapperProps) => {
   
    return (
        <div className={styles.main}>
            <div className={styles.searchBox}>
                <Button
                    title="With likes"
                    isLoading={false}
                    onClick={() => onFetchAnswers('likes')} 
                    type="CALL"
                />
                <Button
                    title="My answers"
                    isLoading={false}
                    onClick={() => onFetchAnswers('user')} 
                    type="CALL"
                />
                <Button
                    title="All answers"
                    isLoading={false}
                    onClick={() => onFetchAnswers('all')} 
                    type="CALL"
                />
            </div>
   
            <div className={styles.answers}>
                {answers.map((answer) => (
                    <div key={answer.id}> 
                        <AnswerCard
                            answer_text={answer.answer_text}
                            gained_likes_number={answer.gained_likes_number}
                            gained_dislikes_number={answer.gained_dislikes_number}
                            date={new Date(answer.date).toLocaleDateString()} 
                            onClick={() => {}}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnswersWrapper;