"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CardHoverEffect from "./CardHoverEffect";
import Loader from "@/components/custom/Loader"; // Assuming the path to Loader component
import axios from "axios";

interface Project {
    title: string;
    description: string;
    link: string;
  }
  
  interface ApiResponse {
    data: {
      documents: {
        $id: string;
        email: string;
        taskName: string;
      }[];
    };
  }

const Requestclient = ({userEmail}:{userEmail:string}) => {
    const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(
          `http://localhost:3000/api/request?email=${userEmail}`
        );

        const data = response.data.data.documents;

        if (data.length === 0) {
          setError("There are no requests yet.");
        } else {
          const dynamicProjects = data.map((item) => ({
            title: item.email,
            description: item.taskName,
            link: `/requests/${item.$id}`,
          }));
          setProjects(dynamicProjects);
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-36">
        <Loader />
      </div>
    );
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

  return (
    <div className="min-h-screen bg-[#0E1117] mt-32 text-white">
      {projects.length > 0 ? (
        <CardHoverEffect projects={projects} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p>There are no requests yet.</p>
        </div>
      )}
    </div>
  );
}

export default Requestclient