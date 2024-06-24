import baseUrl from "@/config/config";
import axios from "axios";

export default async function updateStatus(taskId:string,status:string,statusChange:any){
    return await axios.post(`${process.env.NODE_ENV === 'production' ? baseUrl.production : baseUrl.development}/api/updateTaskStatus`,{taskId,status,statusChange})
}