import styles from './style.module.css';
import Link from "next/link";

type QuestionCardProps={
    question_text: string,
    date: string,
    id: string,
    answered: boolean
}

const QuestionCard = ({ id, question_text, date, answered }: QuestionCardProps) => {
    const formattedDate = new Date(date).toDateString();

    return (
      <Link href={`/Item/${id}`} >
        <div className={styles.main}>
          <div
            className={`${styles.circle} ${
             answered ? styles.answered : styles.notAnswered
             }`}
           ></div>
          <div>
           <p className={styles.date}>{formattedDate}</p>
           <p>{question_text}</p>
          </div>
        </div>
      </Link>
    );
};

export default QuestionCard