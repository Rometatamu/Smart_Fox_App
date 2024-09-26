import styles from './style.module.css';
import Like from "../../../assets/like.png";
import Dislike from "../../../assets/dislike.png";
import Button from '../../atoms/Button/Button';

type AnswerCardProps = {
    answer_text: string;
    date: string;
    gained_likes_number: number;
    gained_dislikes_number: number;
    onClick: () => void;
    userId?: string | null;
    currentUserId?:string;
    onDelete?: () => void;
};

const AnswerCard = ({ 
    answer_text, 
    date, 
    gained_likes_number, 
    gained_dislikes_number, 
    onClick,
    userId,
    currentUserId, 
    onDelete , 

}: AnswerCardProps) => {
    const formattedDate = new Date(date).toDateString();

    return (
        <div className={styles.main}>
            <p className={styles.date}>{formattedDate}</p>
            <p>{answer_text}</p>
            <div className={styles.reactionbox}>
                <button onClick={onClick}><img src={Like.src} alt="like" /></button>
                <p>{gained_likes_number}</p>
                <button onClick={onClick}><img src={Dislike.src} alt="dislike" /></button>
                <p>{gained_dislikes_number}</p>
            </div>
            <div>
            {onDelete &&  currentUserId === userId && (
                <Button
                    title="Delete"
                    isLoading={false}
                    onClick={onDelete}
                    type="DANGER"
                />
            )}
            </div>
            
        </div>
    );
};

export default AnswerCard;
