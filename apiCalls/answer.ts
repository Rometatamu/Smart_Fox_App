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

