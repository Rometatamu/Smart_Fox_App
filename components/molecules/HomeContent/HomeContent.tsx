import styles from './style.module.css';
import Button from "../../atoms/Button/Button";
import Link from "next/link";
import MainPageImg from "../../../assets/main-page-img.jpg";


const HomeContent = () => {
  return (
    <div className={styles.main}>
        <h1>WELCOME TO SMART FOX COMMUNITY!</h1>
        <h2>This is a platform, where you can ask questions and get answers from the community members.</h2>
        <h2>You want to ask a question?</h2>
        <Link href="/login">
           <Button 
           title="Sign Up"
           isLoading={false}
           onClick={() => {}}
           />
         </Link>
        <img src={MainPageImg.src} alt="man_has_question"/>


    </div>
  )
}

export default HomeContent