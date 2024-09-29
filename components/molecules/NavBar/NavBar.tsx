import styles from "./style.module.css";
import Link from "next/link";


type NavBarProos={
  isOpen: boolean;
}

const NavBar = ({isOpen}:NavBarProos) => {
  
  return (
    <nav className={`${styles.main} ${ isOpen? styles.mobileMeniuOpen : ""}`}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/questions">Questions</Link>
        </li>
        <li>
          <Link href="/answers">Answers</Link>
        </li>
        <li>
          <Link href="/users">Community</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;