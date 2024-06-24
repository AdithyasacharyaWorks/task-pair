"use client";
import React, { useState } from "react";



import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useEffect } from "react";
import axios from "axios";


const Dashboard = ({user}:any) => {
  const router = useRouter()
  const [numberOfRequest,setNumberOfRequest ]= useState(0)
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
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/request?email=${user.email}`)
    .then(res=>{
      setNumberOfRequest(res.data.data.total)
    })
  },[])
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
        <button className="w-40 flex  justify-center items-center gap-2 h-10 rounded-xl bg-white text-black border border-black  text-sm" onClick={()=>router.push('/requests')}>
          <span>Task Requests</span>
         {numberOfRequest>0 &&  <div className=" rounded-full bg-red-600 p-3 h-2 w-2 text-center flex justify-center items-center text-white">{numberOfRequest}</div>}
        </button>
      </div>
    </div>);
}

export default Dashboard