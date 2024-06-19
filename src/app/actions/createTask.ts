import axios from "axios";

type Values = {
  username: string;
  description: string;
  assignTo: string;
  priority: string;
  deadline: string;
};

type Email = string;

export default async function createTask(values: Values, email: Email) {
  return await axios.post(`http://localhost:3000/api/createtask?email=${email}`, values);
}
