'use client'
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useEffect, useState  } from "react";
import axios from "axios";
import Loader from "@/components/custom/Loader";

type userData = {
    taskName: string,
    taskDesc: string,
    assignedTo: string,
    userId: string,
    email: string,
    status:string,
    priority:string,
    $id: string,

}

const TaskDetails = ({ params }:any) => {
  const [data,setData] = useState<userData>({taskName:"",taskDesc:"",status:"",userId:"",priority:"",email:"",assignedTo:"",$id:""})
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:3000/api/taskdetail?email=adithyasacharya929@gmail.com&taskId=${params.id}`)
    .then((res)=>{
      setData(res.data.data.documents[0])
      setLoading(false)
    }).catch((err)=>{
      setLoading(false);
    })
  },[])

  const initialStatus = "In Progress";

  const [status, setStatus] = React.useState(initialStatus);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [isStatusChanged, setIsStatusChanged] = React.useState(false);


  const handleStatusChange = (value:any) => {
    setStatus(value);
    setIsStatusChanged(value !== initialStatus);
  };

  const handleAddComment = () => {
    const username = "User123";
    const timestamp = new Date().toLocaleString();
    const comment = {
      text: newComment,
      username,
      timestamp,
    };
    setNewComment("");
  };

  const handleUpdate = () => {
    setStatus(status);
    setIsStatusChanged(false);
  };


  return (
    <div>
      
    {loading ? <div className="flex justify-center items-center mt-32"><Loader /></div>:Object.keys(data).length === 0?<Loader/>:<div className="max-w-full mx-auto p-6 bg-gray-900 text-white">
      <div className="flex flex-row justify-between">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Task Details</h1>
      <div className="mb-6 flex">
        <Button 
          variant="secondary" 
          onClick={() => router.back()} 
          className="bg-gray-700 hover:bg-gray-600"
        >
          Back to List
        </Button>
      </div>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-300">
              <span>Status:</span>
              <div className="ml-2 inline-block w-40 ">
              <Select value={status} onValueChange={handleStatusChange} >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full text-gray-300">
              <span>Created by:</span>
              <span>{data?.email}</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full text-gray-300">
              <span>Priority:</span>
              <span className="text-red-500">{data?.priority}</span>
            </div>
          </div>
          <Button 
            variant="default" 
            onClick={handleUpdate} 
            disabled={!isStatusChanged}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Update Status
          </Button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-100">{data?.taskName}</h2>
          <p className="text-gray-400 mb-2"><strong>ID:</strong> {data?.$id}</p>
          <p className="text-gray-400"><strong>Description:</strong> {data?.taskDesc}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="bg-gray-800 shadow-md rounded-lg p-6 flex-1 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Comments</h2>
          <div className="mb-4 space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300"><strong>{"comment.username"}</strong> <span className="text-gray-400 text-sm">({"comment.timestamp"})</span></p>
                <p className="text-gray-400">{"comment.text"}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-3">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow bg-gray-700 text-white"
            />
            <Button variant="default" onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700">Add Comment</Button>
          </div>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Additional Info</h2>
          <p className="text-gray-400">Here you can add any additional information related to the task.</p>
        </div>
      </div>
    </div>}
    </div>
  );
};

export default TaskDetails;
