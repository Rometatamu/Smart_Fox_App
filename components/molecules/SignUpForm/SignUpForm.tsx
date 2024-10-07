import styles from './style.module.css'
import {useState} from "react";
import {SignUp} from "../../../apiCalls/uer";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const SignUpForm = () => {
  const router=useRouter();

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [name, setName]=useState("");
  const [photo, setPhoto]=useState("");
  const [isShowError,setShowError ]=useState(false);
  const [isButtonLoading, setButtonLoading]=useState(false);

  const signUpUser=async()=>{
    try{
      setButtonLoading(true);

      const response=await SignUp({email, password,name,photo});
             
      if (response.status===201){
        Cookies.set(process.env.JWT_KEY as string, response.data.jwtToken);
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
      <h2>New user sign up</h2>
        <Input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={(e)=>{
          setName(e.target.value);
        }} 
      />
      {isShowError && <h5 className={styles.error}>Name is mandatory and must to have at least 3 simbols</h5>}
      <Input
        type="text"
        name="photo"
        value={photo}
        placeholder="User photo"
        onChange={(e)=>{
          setPhoto(e.target.value);
        }} 
      />
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Emai"
        onChange={(e)=>{
          setEmail(e.target.value);
        }} 
      />
      {isShowError && <h5 className={styles.error}>Not corect email </h5>}
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={(e)=>{
         setPassword(e.target.value);
        }} 
      />
      {isShowError && <h5 className={styles.error}>Password must to has at least one number and be six simbols length</h5>}
      <Button
       onClick={signUpUser} title="Sign Up" isLoading={isButtonLoading}
       />

    </div>
  );
};

export default SignUpForm

