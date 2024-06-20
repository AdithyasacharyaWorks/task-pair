"use client";
import React from "react";



import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";


const Dashboard = ({user}:any) => {
  const router = useRouter()
  const words = [

    {
      text: "Hello",
      className: "text-white",
    },
    {
      text: user.name,
      className: "text-white",
    },
    {
      text: "welcome!!",
      className: "text-blue-500 dark:text-blue-500",
    }
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200  text-xs sm:text-base  ">
        Manage all your task
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" onClick={()=>router.push('/task')}>
          Assign Task
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm" onClick={()=>router.push('/requests')}>
          Task Requests
        </button>
      </div>
    </div>);
}

export default Dashboard