import axios from "axios";
import Cookies from "js-cookie";
import {User} from "../types/user";

type LoginProps={
    email: string;
    password: string;
}

export const Login= async ({email, password}:LoginProps)=>{
    const body={
        email: email,
        password: password,
    };
    const response=await axios.post(`${process.env.SERVER_URL}/login`, body);

    return response;
};

export const UserValidation = async () => {
    const jwt= Cookies.get(process.env.JWT_KEY as string);

    const headers = {
    authorization: jwt,
    };
    const response = await axios.get(`${process.env.SERVER_URL}/login/validate`, {
        headers,
    });
    return response
};

type SignUpProps={
    name: string,
    photo: string,
    email: string;
    password: string;
}

export const SignUp= async ({name, photo, email, password}:SignUpProps)=>{
    const body={
        name: name,
        photo: photo === "" ? undefined : photo,
        email: email,
        password: password,
    };
    const response=await axios.post(`${process.env.SERVER_URL}/signup`, body);

    return response;
};
export const FetchUsers = async () => {
    try {
         const response = await axios.get(
          `${process.env.SERVER_URL}/users`,
        );
        console.log(response.data.users)
      return response.data.users as User[]; 
    } catch (err) {
      console.log(err);
      throw err;
    }
};


