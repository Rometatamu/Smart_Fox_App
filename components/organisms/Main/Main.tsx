import { ReactNode } from 'react';
import styles from './style.module.css';

type MainProps={
  children: ReactNode;
};

const Main = ({children}: MainProps) => {
  return (
    <div className={styles.main}>{children}</div>
  )
}

export default Main