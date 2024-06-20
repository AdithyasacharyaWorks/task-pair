'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import Loader from '@/components/custom/Loader'; // Assuming the path to Loader component
import axios from 'axios';

const TaskDetail = ({ params }: any) => {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State to handle success messages
  const router = useRouter();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/request/detail?id=${params?.id}`);
        setTask(response.data.data.documents[0]);
      } catch (error) {
        setError('Error fetching task details.');
        console.error('Error fetching task details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [params.id]);

  const handleAccept = async () => {
    try {
      await axios.post(`http://localhost:3000/api/request/status?id=${params.id}&status=Accepted`);
      setSuccessMessage('Task accepted successfully.'); // Set success message
      router.push(`/task/list/${params.id}`); // Redirect to task list with the specific ID
    } catch (error) {
      console.error('Error accepting task:', error);
      setError('Error accepting task.');
    }
  };

  const handleDecline = async () => {
    try {
      await axios.post(`http://localhost:3000/api/request/status?id=${params.id}&status=Declined`);
      setSuccessMessage('Task declined successfully.'); // Set success message
      router.push(`/requests`); // Redirect to requests page
    } catch (error) {
      console.error('Error declining task:', error);
      setError('Error declining task.');
    }
  };

  if (loading) {
    return<div className='flex justify-center items-center mt-32'><Loader /></div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0E1117] mt-32 text-white flex items-center justify-center">
        <div className="text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-[#0E1117] mt-20 text-white flex items-center justify-center">
        <div className="text-center">
          <p>Task not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1117] text-bg-[#0E1117] py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-[#0E1117] shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">{task.taskName}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <p><span className="font-bold">Assigned By:</span> {task.email}</p>
            <p><span className="font-bold">Priority:</span> {task.priority}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p><span className="font-bold">Deadline:</span> {task.deadline}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">Description:</p>
          <p className="mt-2">{task.taskDesc}</p>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <Button variant="default" onClick={handleAccept}>Accept</Button>
          <Button variant="destructive" onClick={handleDecline}>Decline</Button>
        </div>
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p> // Display success message if exists
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
