// Backend: addComment.ts
import baseUrl from "@/config/config";
import axios from "axios";

export default async function addComment(body: any) {

  try {
    const response = await axios.post(
      `${process.env.NODE_ENV === 'production' ? baseUrl.production : baseUrl.development}/api/addComment`,
      body
    );
    return response.data; // Assuming the response contains relevant data
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; // Propagate the error for handling in frontend
  }
}
