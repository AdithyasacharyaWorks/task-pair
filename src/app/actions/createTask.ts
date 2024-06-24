import baseUrl from "@/config/config";
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
  return await axios.post(`${process.env.NODE_ENV === 'production' ? baseUrl.production : baseUrl.development}/api/createtask?email=${email}`, values);
}
