import styles from './style.module.css';

type UserCardProps={
    photo: string;
    name: string;
}

const UserCard = ({ photo, name}:UserCardProps) => {
  return (
    <div className={styles.main}>
      <img src={photo} alt="user-img"/>
      <h5>{name}</h5>
    </div>
  )
}
export default UserCard