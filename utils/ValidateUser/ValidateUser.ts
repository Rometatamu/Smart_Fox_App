import Cookies from "js-cookie";
import { UserValidation } from "../../apiCalls/uer";

export const ValidateUser = async () => {
  const jwtToken = Cookies.get(process.env.JWT_KEY as string);

  if (!jwtToken) {
    return false;
  }

  try {
    const response = await UserValidation();

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("err", err);
    return false;
  }
};
