'use client'
import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { MdArrowForward } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';

const SignIn: React.FC = () => {
  const [providers, setProviders] = useState<any>({});
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

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={headerControls}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Welcome to{' '}
        <span className="text-blue-500">Task Manager</span>
      </motion.h1>
      <motion.div
        className="flex items-center justify-center mb-8 space-x-4 text-center"
        initial={{ opacity: 0, x: -20 }}
        animate={stepsControls}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.span
          className="text-gray-400 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ marginRight: '4px' }}>
            <FcGoogle size={24} />
          </span>
          <span style={{ marginLeft: '4px' }}>Sign in with Google</span>
        </motion.span>
        <motion.span
          className="text-gray-400 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Assign tasks <span style={{ marginLeft: '4px' }}><MdArrowForward size={20} /></span>
        </motion.span>
        <motion.span
          className="text-gray-400 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          Manage tasks <span style={{ marginLeft: '4px' }}><MdArrowForward size={20} /></span>
        </motion.span>
        <motion.span
          className="text-gray-400 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          Complete tasks <span style={{ marginLeft: '4px' }}><MdArrowForward size={20} /></span>
          <span style={{ marginLeft: '4px' }}><BiTimeFive size={20} /></span>
        </motion.span>
      </motion.div>
      <motion.div
        className="bg-[#161b22] p-8 rounded-lg shadow-lg w-full max-w-md text-cente hover:shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={mainContentControls}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-gray-400 mb-8">
          Task Manager enables seamless task assignment, progress tracking, and timely completion.
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
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
