import axios from "axios";
import {Question} from "../types/question";


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
}