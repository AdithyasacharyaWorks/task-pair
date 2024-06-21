'use client'
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/custom/Loader";
import addComment from "@/app/actions/addComment";
import { getUserSession } from "@/lib/session";

type UserData = {
  taskName: string;
  taskDesc: string;
  assignedTo: string;
  userId: string;
  email: string;
  status: string;
  priority: string;
  $id: string;
  isAccepted: string;
  comments: string[];
};

type Comment = {
  text: string;
  username: string;
  timestamp: string;
};

const DetailPage = ({ params ,userData}: any) => {
  const [data, setData] = useState<UserData>({
    taskName: "",
    taskDesc: "",
    status: "",
    userId: "",
    priority: "",
    email: "",
    assignedTo: "",
    $id: "",
    isAccepted: "",
    comments: [],
  });
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const router = useRouter();
  const [status,setStatus] = useState()


  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/api/taskdetail?email=adithyasacharya929@gmail.com&taskId=${params.id}`
      )
      .then((res) => {
        const fetchedData = res.data.data.documents[0];
        setData(fetchedData);

        const parsedComments = fetchedData.comments.map((comment: string) => JSON.parse(comment));
        setComments(parsedComments);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [params.id]);

  useEffect(()=>{
    async()=>{
      const data = await getUserSession()
      console.log(data)
    }
  },[])

  const initialStatus = "In Progress";

  const handleStatusChange = (value: any) => {
    setStatus(value);
    setIsStatusChanged(value !== initialStatus);
  };

  const handleAddComment = async () => {
    const username = userData?.email; // Assuming username is based on email for now
    const timestamp = new Date().toLocaleString();
    const comment = {
      text: newComment,
      username,
      timestamp,
    };

    // Update frontend state optimistically
    setComments([...comments, comment]);
    setNewComment("");

    // Prepare data to be sent to backend
    const body = {
      taskId: data.$id, // Assuming taskId is unique identifier of task
      comment,
    };

    try {
      // Send comment to backend
      const response = await addComment(body);
      console.log("Comment added successfully:", response.data);
    } catch (error) {
      console.error("Failed to add comment:", error);
      // Handle error and possibly revert state changes
    }
  };

  const handleUpdate = () => {
    setStatus(status);
    setIsStatusChanged(false);
  };

  return (
    <div className="flex items-center justify-center bg-[#0d1117] mt-32">
      {loading ? (
        <div className="flex justify-center items-center mt-32">
          <Loader />
        </div>
      ) : data === undefined || Object.keys(data).length === 0 ? (
        <div>There is no data.</div>
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
            <div className="sm:flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 pr-3 py-1 rounded-lg text-white text-md">
                  <span>Status:</span>
                  {data.isAccepted === "Accept" ? (
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
                  ) : data.isAccepted === "Declined" ? (
                    <div className="text-red-500">Declined</div>
                  ) : (
                    <div>
                      <div className="text-yellow-400">Pending...</div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#30363d] text-white text-md">
                  <span>Priority:</span>
                  <span className="text-red-500">{data?.priority}</span>
                </div>
              </div>
              <div className="sm:pt-0 pt-2">
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
            </div>

            <div className="py-2 flex gap-2 items-center">
              {data.isAccepted === "Pending" ||
              data.isAccepted === undefined ||
              data.isAccepted === null ? (
                <div className="text-gray-500 text-sm">
                  Note: {data.assignedTo} has not yet accepted your task request.
                </div>
              ) : data.isAccepted === "Declined" ? (
                <div className="text-red-500 text-sm">
                  Note: {data.assignedTo} has declined your task request.
                </div>
              ) : null}
            </div>

            <div className="mb-4 text-sm py-5">
              <h2 className="font-semibold mb-2 text-white">
                Task: {data?.taskName}
              </h2>
              <p className="text-gray-400 mb-2">
                <strong>ID:</strong> {data?.$id}
              </p>
              <p className="text-gray-400">
                <strong>Description:</strong> {data?.taskDesc}
              </p>
            </div>
            <div className="flex justify-end">
              <div className="flex items-center text-end justify-end w-fit mt-5 space-x-2 text-green-700 mb-2 text-sm">
                <div>Task created by:</div>
                <div>{data?.email}</div>
              </div>
            </div>
          </div>

          {data.isAccepted === "Accept" && (
            <div className="bg-[#21262d] shadow-inner rounded-lg p-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-white">Comments</h2>
              <div className="mb-4 space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="p-3 bg-[#30363d] rounded-lg">
                    <p className="text-white">
                      <strong>{comment.username}</strong>{" "}
                      <span className="text-gray-500 text-sm">
                        ({comment.timestamp})
                      </span>
                    </p>
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
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddComment}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailPage;
