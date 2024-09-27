import styles from './style.module.css';
import Button from '@/components/atoms/Button/Button';
import QuestionCard from '../../molecules/QuestionCard/QuestionCard';
import Input from '@/components/atoms/Input/Input';
import { Question } from '@/type/question';
import { Answer } from '@/type/answer';
import AnswerCard from '../../molecules/AnswerCard/AnswerCard';
import { useRouter } from 'next/router';
import ConfirmModal from "../../molecules/Modal/ConfirmModal";
import {useState} from "react";

type ItemWrapperProps = {
    question: Question | null;
    answer: Answer | null;
    userId: string | null;
    answerText: string;
    setAnswerText: (value: string) => void;
    handleDeleteQuestion: () => void;
    handleSubmitAnswer: () => void;
    handleReaction: (reactionType: 'like' | 'dislike', answerId: string) => Promise<void>
};

const ItemWrapper = ({ question, answer, userId, answerText, setAnswerText, handleDeleteQuestion, handleSubmitAnswer,handleReaction }: ItemWrapperProps) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false); 

    const confirmDelete = async () => {
        closeModal();  
        handleDeleteQuestion();
    }
    
    if (!question) return null;

    return (
        <div className={styles.main}>
            <Button title="Back" onClick={() => router.back()} isLoading={false} type="CALL" />

            <QuestionCard
                id={question.id}
                question_text={question.question_text}
                answered={question.answered}
                date={new Date(question.date).toLocaleDateString()}
            />

            {userId === question.userId && !question.answered && (
                <Button title="Delete" onClick={openModal} isLoading={false} type="DANGER" />
            )}
            <ConfirmModal
             isOpen={isModalOpen}
             onRequestClose={closeModal}
             onConfirm={confirmDelete}
             title="Do you really want to delete question?"
             
            />

            {userId !== question.userId && !question.answered && (
                <div className={styles.textarea}>
                    <Input
                        type="textarea"
                        name="answer_text"
                        value={answerText}
                        placeholder="Add your answer"
                        onChange={(e) => setAnswerText(e.target.value)}
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
                    <Button title="Submit" isLoading={false} onClick={handleSubmitAnswer} />
                </div>
            )}

            {question.answered && answer && (
                <AnswerCard
                    key={answer.id}
                    answer_text={answer.answer_text}
                    date={new Date(answer.date).toLocaleDateString()}
                    gained_likes_number={answer.gained_likes_number}
                    gained_dislikes_number={answer.gained_dislikes_number}
                    onReaction={(reactionType) => handleReaction(reactionType, answer.id)}
                />
            )}
        </div>
    );
};

export default ItemWrapper;
