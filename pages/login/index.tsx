import styles from './style.module.css';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import LoginForm from "../../components/molecules/LoginForm/LoginForm";
import SignUpForm from "../../components/molecules/SignUpForm/SignUpForm";

const login = () => {
  return (
    <div className={styles.main}>
      <PageTemplate>
        <LoginForm/>
        <SignUpForm/>
      </PageTemplate>
    </div>
  )
}

export default login