'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Corrected import

const RequestsPage = () => {
  const router = useRouter();
  // Simulated tasks assigned to the user (dummy data)
  const [assignedTasks, setAssignedTasks] = useState([]);

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
  const handleTaskClick = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  // Function to handle accepting a task
  const handleAcceptTask = (taskId) => {
    // Implement your logic here for accepting the task
    console.log(`Task ${taskId} accepted`);
  };

  // Function to handle declining a task
  const handleDeclineTask = (taskId) => {
    // Implement your logic here for declining the task
    console.log(`Task ${taskId} declined`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Assigned Task Requests</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignedTasks.length === 0 ? (
            <p className="text-center text-xl">No assigned tasks found.</p>
          ) : (
            assignedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{task.title}</h3>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <p><strong>Assigner:</strong> {task.assignerEmail}</p>
                    <p><strong>Deadline:</strong> {task.deadline}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAcceptTask(task.id)}
                      className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineTask(task.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-8 text-center">
          <Link href="/">
            <span className="text-blue-500 hover:text-blue-600">&larr; Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
