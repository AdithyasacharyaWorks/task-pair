"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/custom/Loader";
import addComment from "@/app/actions/addComment";
import updateStatus from "@/app/actions/updateStatus";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SelectItem } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  $createdAt: string;
  deadline: string;
  statusChange: any;
};

type Comment = {
  text: string;
  username: string;
  timestamp: string;
};

type ChangeLogEntry = {
  email: string;
  date: string;
  from: string;
  to: string;
};

const DetailPage = ({ params, userData }: any) => {
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
    $createdAt: "",
    deadline: "",
    statusChange: [""],
  });
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [status, setStatus] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
  const [errorAddingComment, setErrorAddingComment] = useState<string>("");
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const router = useRouter();
  const [fetchingError, setFetchingError] = useState<string>();

  const convertToDDMMYY = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/taskdetail?email=adithyasacharya929@gmail.com&taskId=${params.id}`
        );
        const fetchedData = res.data.data.documents[0];
        setData(fetchedData);
        setStatus(fetchedData.status);
        setFetchingError("");
  
        // Parse statusChange from string to object
        const parsedChangeLog = fetchedData.statusChange.map((entry: string) =>
          JSON.parse(entry)
        );
        setChangeLog(parsedChangeLog);
  
        const parsedComments = fetchedData.comments.map((comment: string) =>
          JSON.parse(comment)
        );
        setComments(parsedComments.reverse());
      } catch (err) {
        setFetchingError("Failed to fetch the detail!");
        console.error("Failed to fetch task details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTaskDetails();
  }, [params.id]);
  

  const handleStatusChange = (value: any) => {
    setStatus(value);
    setIsStatusChanged(value !== status); // Compare with current state status
  };

  const handleAddComment = async () => {
    setErrorAddingComment("");

    if (newComment === "") {
      setErrorAddingComment("Please enter any message");
      return;
    }

    const username = userData?.email; // Assuming username is based on email for now
    const timestamp = new Date().toLocaleString();
    const comment = {
      text: newComment,
      username,
      timestamp,
    };

    setNewComment("");
    setAddCommentLoading(true);

    const body = {
      taskId: data.$id, // Assuming taskId is unique identifier of task
      comment,
    };

    try {
      const response = await addComment(body);
      setComments([comment, ...comments]);
    } catch (error) {
      console.error("Failed to add comment:", error);
      setErrorAddingComment("Failed to add comment");
    } finally {
      setAddCommentLoading(false);
    }
  };

  const handleUpdate = async () => {
    setStatusLoading(true);
    setStatusError("");
    const previousStatus = data.status; // Capture previous status
  
    try {
      // Prepare change log entry
      const logEntry = {
        email: userData?.email || "",
        date: new Date().toLocaleString(),
        from: previousStatus,
        to: status,
      };
  

      const taskId= data.$id

       const  statusChange = logEntry

  
      const response =await updateStatus(taskId,
        status,
       statusChange)
      if (response.data.success) {
        // Update status in the local state
        setStatus(status);
        console.log("Status updated to:", status);
  
        // Update change log state
        setChangeLog([...changeLog, logEntry]);
  
        setIsStatusChanged(false);
      } else {
        setStatusError("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatusError("Failed to update status");
    } finally {
      setStatusLoading(false);
    }
  };
  

  const handleBackToList = () => {
    router.push("/task/list");
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
          {fetchingError === "" ? (
            <div className="bg-[#21262d] shadow-inner rounded-lg p-6 mb-6">
              <div className="sm:flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 pr-3 py-1 rounded-lg text-white text-md">
                    <span>Status:</span>
                    {statusLoading ? (
                      <div className="ml-2 inline-block w-40 text-sm">
                        <Loader />
                      </div>
                    ) : (
                      <div className="ml-2 inline-block w-40 text-white">
                        <Select
                          value={status}
                          onValueChange={handleStatusChange}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {status || "Select status"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Backlog">Backlog</SelectItem>
                            <SelectItem value="Todo">Todo</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="text-red-500">{statusError}</div>
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
                    Note: {data.assignedTo} has not yet accepted your task
                    request.
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
                <p className="text-gray-400 mb-2">
                  <strong>Description:</strong> {data?.taskDesc}
                </p>
                <p className="text-gray-400">
                  <strong>Deadline:</strong> <span>{convertToDDMMYY(data?.deadline)}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-end justify-end w-fit mt-5 space-x-2 text-green-700 mb-2 text-sm">
                  <div>Task created by:</div>
                  <div>
                    {data?.email === userData?.email ? "You" : data.email} on{" "}
                    {convertToDDMMYY(data.$createdAt)}
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBackToList}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Back to List
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-32 text-red-700">
              ✕ {fetchingError}
            </div>
          )}
          <div className="flex flex-row justify-between mb-4">
            {fetchingError === "" && (
              <h1 className="text-xl font-bold text-white">Task Details</h1>
            )}
          </div>
          {fetchingError === "" && (
            <div>
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="comments" className="w-full">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="changelog" className="w-full">
                    Change Log
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comments">
                  <div className="space-y-4">
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold text-white">
                        Add a Comment
                      </h2>
                      <textarea
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-[#0d1117] text-white"
                        rows={4}
                        placeholder="Enter your comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleAddComment}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {addCommentLoading ? "Adding..." : "Add Comment"}
                        </Button>
                      </div>
                      <div className="text-red-500">{errorAddingComment}</div>
                    </div>
                    {comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg shadow-md bg-[#21262d]"
                        >
                          <p className="text-white">{comment.text}</p>
                          <div className="mt-2 text-gray-400 text-sm">
                            <span>
                              Posted by{" "}
                              {comment.username === userData.email ? (
                                <span className="text-blue-600">You</span>
                              ) : (
                                <span className="text-green-700">
                                  {comment.username}
                                </span>
                              )}
                            </span>
                            <span className="ml-2">{comment.timestamp}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No comments yet.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="changelog">
                  <div className="space-y-4">
                    {changeLog.length > 0 ? (
                      changeLog.map((entry, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg shadow-md bg-[#21262d]"
                        >
                          <p className="text-white">
                            Status changed from {entry.from} to {entry.to}
                          </p>
                          <div className="mt-2 text-gray-400 text-sm">
                            <span>Changed by {entry.email === userData.email ?"You":entry.email}</span>
                            <span className="ml-2">{entry.date}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No changes yet.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailPage;
