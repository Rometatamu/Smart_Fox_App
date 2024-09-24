import styles from './style.module.css';
import UserCard from "../../molecules/UserCard/UserCard";
import {User} from "../../../type/user";

type UsersWrapperProps={
    users: User[];
}

const UsersWrapper = ({users}:UsersWrapperProps) => {

    return (
        <div className={styles.main}>
          {users.map((user) => (
            <div key={user.id}>  
              <UserCard
                name={user.name}
                photo={user.photo}
              />
            </div>
          ))}
        </div>
      );
    };
export default UsersWrapper