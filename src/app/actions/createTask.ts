import axios from "axios"

type Values = {
    username: string;
    description: string;
    assignTo: string;
};

type Email =  {
    userEmail: string,
    userId:string,
    userName: string
  }


export default async function createTask(values: Values,email:Email) {
    return await axios.post(`http://localhost:3000/api/createtask?email=${email.userEmail}`,values)
}
