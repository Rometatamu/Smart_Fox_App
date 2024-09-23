import styles from './style.module.css'
import {useState} from "react";
import {Login} from "../../apiCalls/user";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const LoginForm = () => {
    const router=useRouter();

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [isShowError,setShowError ]=useState(false);
    const [isButtonLoading, setButtonLoading]=useState(false);

    const loginUser=async()=>{
        try{
            setButtonLoading(true);

            const response=await Login({email, password});
             
            if (response.status===200){
                Cookies.set(process.env.JWT_KEY as string, response.data.token);
                Cookies.set("user_id", response.data.userId);
                router.push("/questions");
            }
            console.log(response);
            setButtonLoading(false);
        } catch (err){
            console.log("err", err);
            setShowError(true);
            setButtonLoading(false);

        }
    };


  return (
    <div className={styles.main}>
      <h2>Existing user login</h2>
        <Input
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        onChange={(e)=>{
            setEmail(e.target.value);
        }} 
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={(e)=>{
            setPassword(e.target.value);
        }} 
      />
      {isShowError && <h5 className={styles.error}>Not corect email or password</h5>}
      <Button
        onClick={loginUser} title="Login" isLoading={isButtonLoading}
       />

    </div>
  );
};

  

export default LoginForm

