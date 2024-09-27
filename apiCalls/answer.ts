import axios from "axios";
import { Answer } from "@/type/answer";
import Cookies from "js-cookie";

type FetchQuestionAnswerProps = {
  questionId: string,
}

export const FetchQuestionAnswer = async ({questionId}: FetchQuestionAnswerProps): Promise<Answer[]> => {
  const jwt = Cookies.get(process.env.JWT_KEY as string);

  if (!jwt) {
    throw new Error("JWT token is missing");
  }
  try {
    const headers = {
      authorization: jwt,
    };

    const response = await axios.get(
      `${process.env.SERVER_URL}/answers/question/${questionId}`,
      { headers }
    );

    console.log('API Response:', response.data); 
    return response.data.answer as Answer[];
  } catch (err) {
    throw err;
  }
};
export const FetchAnswers = async () => {
  try {
       const response = await axios.get(
        `${process.env.SERVER_URL}/answers`,
      );
      console.log(response.data.answers)
    return response.data.answers as Answer[]; 
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const FetchUserAnswers = async () => {
  const jwt = Cookies.get(process.env.JWT_KEY as string);
  const userId=Cookies.get("user_id");

  try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.get(
        `${process.env.SERVER_URL}/answers/user/${userId}`,
        {headers}
      );

    return response.data.answers as Answer[]; 
  } catch (err) {
    console.log(err);
    throw err;
  }
};
type DeleteAnswerProps={
  id: string;
};

export const DeleteAnswer = async (questionId: string, {id}:DeleteAnswerProps) => { 
    const jwt = Cookies.get(process.env.JWT_KEY as string); 
   
    try {
      const headers = { authorization: jwt };
      const response = await axios.delete(`${process.env.SERVER_URL}/answer/${questionId}/${id}`, { headers });

      return response;

    } catch (err) {
        console.log(err);
        throw err;
    }
};
export const FetchAnswersWithLike = async () => {
  try {
       const response = await axios.get(
        `${process.env.SERVER_URL}/answers/filtered`, { params: { filterBy: 'likes' } },
      );
      console.log(response.data.answers)
    return response.data.answers as Answer[]; 
  } catch (err) {
    console.log(err);
    throw err;
  }
};
type PutAnswerLikerProps={
  id: string,
};

export const PutAnswerReaction = async (reactionType: "like" |"dislike", {id}:PutAnswerLikerProps) => { 
  const jwt = Cookies.get(process.env.JWT_KEY as string);  
  try {
    const body = {
      reactionType
    };
    const headers = {
      authorization: jwt,
    };
    const response = await axios.put(`${process.env.SERVER_URL}/answers/${id}/reactions`, body, {
      headers,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
type FetchAnswerByIdProps = {
  id: string;
};

export const FetchAnswerById = async ({ id }: FetchAnswerByIdProps): Promise<Answer| null> => {
  const jwt = Cookies.get(process.env.JWT_KEY as string);
  
  if (!jwt) {
    throw new Error("JWT token is missing");
  }
  
  try {
    const headers = {
      authorization: jwt,
    };
  
    const response = await axios.get(`${process.env.SERVER_URL}/answer/${id}`, { headers });
    return response.data.answer as Answer;
  } catch (err) {
    console.log("Error fetching answer:", err);
    throw err;
  }
};