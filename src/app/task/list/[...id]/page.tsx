'use client'
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/custom/Loader";

type userData = {
  taskName: string,
  taskDesc: string,
  assignedTo: string,
  userId: string,
  email: string,
  status: string,
  priority: string,
  $id: string,
}

type Comment = {
  text: string,
  username: string,
  timestamp: string
}

const TaskDetails = ({ params }: any) => {
  const [data, setData] = useState<userData>({
    taskName: "",
    taskDesc: "",
    status: "",
    userId: "",
    priority: "",
    email: "",
    assignedTo: "",
    $id: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/taskdetail?email=adithyasacharya929@gmail.com&taskId=${params.id}`)
      .then((res) => {
        setData(res.data.data.documents[0]);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
      });
  }, [params.id]);

  const initialStatus = "In Progress";

  const [status, setStatus] = React.useState(initialStatus);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [newComment, setNewComment] = React.useState("");
  const [isStatusChanged, setIsStatusChanged] = React.useState(false);

  const handleStatusChange = (value: any) => {
    setStatus(value);
    setIsStatusChanged(value !== initialStatus);
  };

  const handleAddComment = () => {
    const username = "User123"; // This should be dynamically set based on the current user
    const timestamp = new Date().toLocaleString();
    const comment = {
      text: newComment,
      username,
      timestamp,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleUpdate = () => {
    setStatus(status);
    setIsStatusChanged(false);
  };

  return (
    <div className=" flex items-center justify-center bg-[#0d1117]">
      {loading ? (
        <div className="flex justify-center items-center mt-32">
          <Loader />
        </div>
      ) : Object.keys(data).length === 0 ? (
        <Loader />
      ) : (
        <div className="max-w-4xl w-full mx-auto p-6 bg-[#161b22] text-white shadow-lg rounded-lg mt-8 overflow-hidden">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Task Details</h1>
            <Button 
              variant="link" 
              onClick={() => router.back()} 
              className="bg-[#21262d] hover:bg-[#30363d] text-white"
            >
              Back to List
            </Button>
          </div>

          <div className="bg-[#21262d] shadow-inner rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#30363d] text-white text-sm">
                  <span>Status:</span>
                  <div className="ml-2 inline-block w-40 text-sm">
                    <Select value={status} onValueChange={handleStatusChange}>
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
               
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#30363d] text-white text-sm">
                  <span>Priority:</span>
                  <span className="text-red-500">{data?.priority}</span>
                </div>
              </div>
              <Button 
                variant="default" 
                size="sm"
                onClick={handleUpdate} 
                disabled={!isStatusChanged}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Status
              </Button>
            </div>
            <div className="flex items-center w-fit space-x-2  text-green-700 mb-2  text-sm">
                  <div>Created by:</div>
                  <div>{data?.email}</div>
            </div>
            <div className="mb-4 text-sm">
              <h2 className="font-semibold mb-2 text-white rounded-full bg-[#30363d] py-1 px-3">{data?.taskName}</h2>
              <p className="text-gray-400 mb-2"><strong>ID:</strong> {data?.$id}</p>
              <p className="text-gray-400"><strong>Description:</strong> {data?.taskDesc}</p>
            </div>
          </div>

          <div className="bg-[#21262d] shadow-inner rounded-lg p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Comments</h2>
            <div className="mb-4 space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-3 bg-[#30363d] rounded-lg">
                  <p className="text-white"><strong>{comment.username}</strong> <span className="text-gray-500 text-sm">({comment.timestamp})</span></p>
                  <p className="text-gray-400">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="flex space-x-3">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow bg-[#30363d] text-white"
              />
              <Button variant="default" size="sm" onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
