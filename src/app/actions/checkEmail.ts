// checkEmail.ts

import { database, dbId, userCollectionId, Query } from "@/backend";
import axios from "axios";
const checkEmail = async (inputEmail: string) => {

  try {
    const result = await axios.get(`http://localhost:3000/api/checkEmail?email=${inputEmail}`)
    return result;
  } catch (error) {
    console.error("Error checking email:", error);
    throw new Error("Error checking email. Please try again.");
  }
};

export default checkEmail;
