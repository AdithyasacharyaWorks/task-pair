'use client'
import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from "@/utils/1.jpeg";
import { FcGoogle } from "react-icons/fc";

const SignIn: React.FC = () => {
  const [providers, setProviders] = useState<any>({});
  const [openDoc, setOpenDoc] = useState(false);
  const headerControls = useAnimation();
  const stepsControls = useAnimation();
  const mainContentControls = useAnimation();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    const animateComponents = async () => {
      await headerControls.start({ opacity: 1, scale: 1 });
      await stepsControls.start({ opacity: 1, x: 0 });
      await mainContentControls.start({ opacity: 1, y: 0 });
    };

    fetchProviders();
    animateComponents();
  }, [headerControls, stepsControls, mainContentControls]);

  const toggleDocumentation = () => {
    setOpenDoc(!openDoc);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={headerControls}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Welcome to{' '}
        <span className="text-blue-500">Task Pair</span>
      </motion.h1>
      <motion.div
        className="bg-[#161b22] p-8 rounded-lg shadow-lg w-full max-w-md text-center hover:shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={mainContentControls}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className='flex justify-center pb-5'>
          <Image src={Logo} alt='Logo' height={"100"} />
        </div>
        <p className="text-gray-400 mb-8">
          Task Pair enables seamless task assignment, progress tracking, and timely completion.
        </p>
        {providers && Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="mb-4">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
            >
              <div className="mr-2">
                <FcGoogle size={24} />
              </div>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        <Button className='bg-blue-600 mt-5 w-full' onClick={toggleDocumentation}>
          Open documentation
        </Button>
      </motion.div>

      {openDoc && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-90 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 text-gray-800 relative overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Product Documentation: Task Pair</h2>
            <div className="space-y-4 text-sm">
              <p>
                <span className="font-semibold">Product Overview:</span> Task Pair is designed to facilitate efficient task assignment, management, and tracking for pairs. It integrates Google Sign-In for secure authentication and provides features like task creation, assignment, and status tracking tailored for pairs working together.
              </p>
              <p>
                <span className="font-semibold">Features and Functionality:</span>
              </p>
              <ul className="list-disc ml-6">
                <li>User Authentication: Sign in securely with Google accounts.</li>
                <li>Task Management: Create tasks, assign them, and track progress.</li>
                <li>Task Requests: Manage incoming task requests and accepted tasks.</li>
                <li>Advanced Task Table: Comprehensive view with filtering and sorting options.</li>
                <li>Ability to Assign Tasks: Users can assign tasks themselves.</li>
              </ul>
              <p>
                <span className="font-semibold">Detailed Workflow:</span>
              </p>
              <ul className="list-disc ml-6">
                <li>User Authentication: Authenticate securely with Google.</li>
                <li>Task Creation and Assignment: Create tasks, assign them to users.</li>
                <li>Managing Task Requests: Accept or decline task requests.</li>
                <li>Managing Accepted Tasks: Update tasks and add comments.</li>
                <li>Advanced Task Table: Access detailed task information and perform actions.</li>
              </ul>
            </div>
            <Button onClick={toggleDocumentation} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 w-full">
              Close Documentation
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SignIn;
