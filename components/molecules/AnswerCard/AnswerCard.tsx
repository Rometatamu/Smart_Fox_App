import styles from './style.module.css';
import Like from "../../../assets/like.png";
import Dislike from "../../../assets/dislike.png";
import Button from '../../atoms/Button/Button';
import ConfirmModal from '../Modal/ConfirmModal';
import { useState } from 'react';

type AnswerCardProps = {
    answer_text: string;
    date: string;
    gained_likes_number: number;
    gained_dislikes_number: number;
    onReaction: (reactioType:"like" | "dislike") => Promise<void>;
    userId?: string | null;
    currentUserId?:string;
    onDelete?: () => void;
};

const AnswerCard = ({ 
    answer_text, 
    date, 
    gained_likes_number, 
    gained_dislikes_number, 
    onReaction,
    userId,
    currentUserId, 
    onDelete ,
}: AnswerCardProps) => {
    const formattedDate = new Date(date).toDateString();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false); 

    const confirmDelete = async () => {
        closeModal();  
        if (onDelete){
            onDelete();
        }
    }
    return (
        <div className={styles.main}>
            <p className={styles.date}>{formattedDate}</p>
            <p>{answer_text}</p>
            <div className={styles.reactionbox}>
                <button onClick={()=>onReaction("like")}><img src={Like.src} alt="like" /></button>
                <p>{gained_likes_number}</p>
                <button onClick={()=>onReaction("dislike")}><img src={Dislike.src} alt="dislike" /></button>
                <p>{gained_dislikes_number}</p>
            </div>
            <div>
            {onDelete &&  currentUserId === userId && (
                <Button
                    title="Delete"
                    isLoading={false}
                    onClick={openModal}
                    type="DANGER"
                />
            )}
            <ConfirmModal
             isOpen={isModalOpen}
             onRequestClose={closeModal}
             onConfirm={confirmDelete}
             title="Do you really want to delete answer?"
            />
            </div>
        </div>
    );
};

export default AnswerCard;
