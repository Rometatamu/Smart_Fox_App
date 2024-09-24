import React, {useEffect, useState} from 'react'
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import NavBar from '@/components/molecules/NavBar/NavBar';
import {User} from "../../type/user";
import { FetchUsers } from '@/apiCalls/uer';
import UsersWrapper from '@/components/organisms/UsersWrapper/UsersWrapper';

const UsersPage = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await FetchUsers(); 
        setUsers(usersData);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };
    getUsers(); 
  }, []);


  return (
    <div>
      <PageTemplate>
        <NavBar/>
        <UsersWrapper users={users}/>
      </PageTemplate>
    </div>
  )
}

export default UsersPage