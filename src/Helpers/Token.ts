import axios from "axios";

export const testToken = async (token: string): Promise<boolean> => {
  if (token) {
    try {
      const tokenVarification = await axios.post(
        `${process.env.API_ENDPOINT}/tokens/verify`,
        {
          token: token,
        }
      );
      if (tokenVarification.data.exp > Math.floor(Date.now() / 1000))
        return true;
      else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};
