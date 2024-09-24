import axios from "axios";
import {Question} from "../type/question";
import Cookies from "js-cookie";


export const FetchQuestions = async () => {
    try {
         const response = await axios.get(
          `${process.env.SERVER_URL}/questions`,
        );
        console.log(response.data.questions)
      return response.data.questions as Question[]; 
    } catch (err) {
      console.log(err);
      throw err;
    }
};

type SubmitQuestionProps={
    question_text: string,
    }

export const SubmitQuestion = async (formData : SubmitQuestionProps) => {
    const jwt = Cookies.get(process.env.JWT_KEY as string);  
    try {
      const body = {
        question_text: formData.question_text
      };
      const headers = {
        authorization: jwt,
      };
      const response = await axios.post(`${process.env.SERVER_URL}/questions`, body, {
        headers,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
};
export const FetchUserQuestions = async () => {
    const jwt = Cookies.get(process.env.JWT_KEY as string);
    const userId=Cookies.get("user_id");

    try {
        const headers = {
          authorization: jwt,
        };
  
        const response = await axios.get(
          `${process.env.SERVER_URL}/questions/user/${userId}`,
          {headers}
        );
  
      return response.data.questions as Question[]; 
    } catch (err) {
      console.log(err);
      throw err;
    }
};
export const FetchAnsweredQuestions = async ()=>{
    try{
        const response=await axios.get(
          `${process.env.SERVER_URL}/questions/filtered?answered=true`,  
        );
        console.log(response.data.questions)
      return response.data.questions as Question[]; 
    } catch (err) {
      console.log(err);
      throw err;
    }
};
export const FetchNotAnsweredQuestions = async ()=>{
    try{
        const response=await axios.get(
          `${process.env.SERVER_URL}/questions/filtered?answered=false`,  
        );
        console.log(response.data.questions)
      return response.data.questions as Question[]; 
    } catch (err) {
      console.log(err);
      throw err;
    }
};
type GetQuestionProps = {
    id: string;
  };
  
  export const GetQuestion = async ({ id }: GetQuestionProps): Promise<Question | null> => {
    const jwt = Cookies.get(process.env.JWT_KEY as string);
  
    if (!jwt) {
      throw new Error("JWT token is missing");
    }
  
    try {
      const headers = {
        authorization: jwt,
      };
  
      const response = await axios.get(`${process.env.SERVER_URL}/questions/${id}`, { headers });
      return response.data.question as Question;
    } catch (err) {
      console.log("Error fetching question:", err);
      throw err;
    }
  };
  