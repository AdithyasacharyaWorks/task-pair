import { account,ID } from "@/backend/index";
import axios from "axios"


type userDetail = {
    email: string;
    password: string;
  };

 
export default async function signup(userDetail:userDetail){
    try {
        const response = await axios.post('http://localhost:3000/api/signup', {
          email:userDetail.email,
          password: userDetail.password
        });
        return response
      } catch (error) {
        console.error('Error creating user:', error);
      }

}