import axios from "axios";
import Cookies from "js-cookie";

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
        photo: photo,
        email: email,
        password: password,
    };
    const response=await axios.post(`${process.env.SERVER_URL}/signup`, body);

    return response;
};

