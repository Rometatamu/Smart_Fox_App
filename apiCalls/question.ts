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
};
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
export const GetFilteredQuestions = async (answered: boolean) => {
  try {
      const response = await axios.get(
          `${process.env.SERVER_URL}/questions/filtered?answered=${answered}`
      );
      console.log(response.data.questions);
      return response.data.questions as Question[];
  } catch (err) {
      console.log(err);
      throw err;
  }
};
export const FetchAnsweredQuestions = () => GetFilteredQuestions(true);
export const FetchNotAnsweredQuestions = () => GetFilteredQuestions(false);

type GetQuestionProps = {
  id: string;
}; 
export const GetQuestion = async ({ id }: GetQuestionProps) => {
  const jwt = Cookies.get(process.env.JWT_KEY as string);
  
  if (!jwt) {
    throw new Error("JWT token is missing");
  }
  try {
    const headers = {
      authorization: jwt,
    };
    const response = await axios.get(`${process.env.SERVER_URL}/question/${id}`, { headers });
    return response.data.question as Question;
  } catch (err) {
    console.log("Error fetching question:", err);
    throw err;
  }
};

type DeleteQuestionProps={
  id: string;
};

export const DeleteQuestion = async ({id}:DeleteQuestionProps) => { 
    const jwt = Cookies.get(process.env.JWT_KEY as string); 

    try {
      const headers = { authorization: jwt };
      const response = await axios.delete(`${process.env.SERVER_URL}/question/${id}`, { headers });

      return response;

    } catch (err) {
        console.log(err);
        throw err;
    }
};
type SubmitAnswerProps={
  answer_text: string,
}

export const SubmitAnswer = async (questionId: string, answerData:SubmitAnswerProps) => {
  const jwt = Cookies.get(process.env.JWT_KEY as string); 
  if (!jwt) {
    throw new Error("JWT token is missing");
  }
  try {
    const body = {
      answer_text: answerData.answer_text

    };
    const headers = {
      authorization: jwt,
    };
    const response = await axios.post(`${process.env.SERVER_URL}/questions/${questionId}/answers`, body, 
     {headers}
    );
    return response.data;
  } catch (err) {
    console.log("Error submitting answer:", err);
    throw err;
  }
};

  


  