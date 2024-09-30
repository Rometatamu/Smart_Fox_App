import styles from './style.module.css';

type FooterProps={
  copyrightTitle: string;
};

const Fotter = ({copyrightTitle}:FooterProps) => {
  return (
    <div className={styles.main}>
      <h4>{copyrightTitle}</h4>
    </div>
  )
}

export default Fotter