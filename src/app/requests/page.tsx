'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { Button } from '@/components/ui/button';

const RequestsPage = () => {
  const router = useRouter();
  // Simulated tasks assigned to the user (dummy data)
  const [assignedTasks, setAssignedTasks] = useState<any>([]);

  useEffect(() => {
    // Simulate fetching assigned tasks from API
    const fetchAssignedTasks = async () => {
      // Replace with actual API call to fetch assigned tasks
      // Example of dummy data:
      const dummyTasks = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1', assignerEmail: 'alice@example.com', deadline: '2024-07-01' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2', assignerEmail: 'bob@example.com', deadline: '2024-07-05' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3', assignerEmail: 'charlie@example.com', deadline: '2024-07-10' },
      ];
      setAssignedTasks(dummyTasks);
    };

    fetchAssignedTasks();
  }, []);

  // Function to handle clicking on a task (navigate to task details)
  const handleTaskClick = (taskId:string) => {
    router.push(`/tasks/${taskId}`);
  };

  // Function to handle accepting a task
  const handleAcceptTask = (taskId:string) => {
    // Implement your logic here for accepting the task
    console.log(`Task ${taskId} accepted`);
  };

  // Function to handle declining a task
  const handleDeclineTask = (taskId:string) => {
    // Implement your logic here for declining the task
    console.log(`Task ${taskId} declined`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <span className="text-blue-400 hover:text-blue-500">&larr; Back to Home</span>
          </Link>
        </div>
        <div className="grid gap-8  md:grid-cols-2 lg:grid-cols-2">
          {assignedTasks.length === 0 ? (
            <p className="text-center text-xl col-span-full">No assigned tasks found.</p>
          ) : (
            assignedTasks.map((task:any) => (
              <div
                key={task.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{task.title}</h3>
                  <p className="text-gray-400 mb-4">{task.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <p><strong>Assigner:</strong> {task.assignerEmail}</p>
                    <p><strong>Deadline:</strong> {task.deadline}</p>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button
                    variant={"outline"}
                      onClick={() => handleAcceptTask(task.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleDeclineTask(task.id)}
                      variant={"outline"}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
