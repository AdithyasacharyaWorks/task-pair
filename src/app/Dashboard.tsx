// components/Dashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import axios from "axios";
import Image from "next/image";
import logo from "@/utils/1.jpeg";
import baseUrl from "@/config/config"
const Dashboard = ({ user }: any) => {
  const router = useRouter();
  const [numberOfRequest, setNumberOfRequest] = useState(0);
  const words = [
    { text: "Hello", className: "text-white text-3xl" }, // Increased font size to text-lg
    { text: user.name, className: "text-white text-3xl" }, // Increased font size to text-lg
    { text: "Welcome!!", className: "text-blue-500 dark:text-blue-500 text-3xl" }, // Increased font size to text-lg
  ];

  useEffect(() => {
    axios.get(`${process.env.NODE_ENV === 'production' ? baseUrl.production : baseUrl.development}/api/request?email=${user.email}`).then((res) => {
      setNumberOfRequest(res.data.data.total);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <div className="text-neutral-600 dark:text-neutral-200 text-base mb-4">
        <Image src={logo} alt="image" height={150} className="rounded-3xl" />
        {/* <span> Manage all your task</span> */}
      </div>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-base" // Increased font size to text-base
          onClick={() => router.push("/task")}
        >
          Assign Task
        </button>
        <button
          className="w-40 flex justify-center items-center gap-2 h-10 rounded-xl bg-white text-black border border-black text-base relative" // Increased font size to text-base
          onClick={() => router.push("/requests")}
        >
          <span>Task Requests</span>
          {numberOfRequest > 0 && (
            <div className="rounded-full bg-red-600 p-1 h-5 w-5 text-center flex justify-center items-center text-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              {numberOfRequest}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
