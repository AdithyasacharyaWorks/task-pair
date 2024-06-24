import axios from "axios";

export default async function updateStatus(taskId:string,status:string,statusChange:any){
    return await axios.post('http://localhost:3000/api/updateTaskStatus',{taskId,status,statusChange})
}