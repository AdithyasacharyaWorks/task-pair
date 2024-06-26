import { database, dbId, userCollectionId, Query } from "@/backend";
import axios from "axios";
import baseUrl from "@/config/config";
const checkEmail = async (inputEmail: string) => {

  try {
    const result = await axios.get(`${process.env.NODE_ENV === 'production' ? baseUrl.production : baseUrl.development}/api/checkEmail?email=${inputEmail}`)
    return result;
  } catch (error) {
    console.error("Error checking email:", error);
    throw new Error("Error checking email. Please try again.");
  }
};

export default checkEmail;
