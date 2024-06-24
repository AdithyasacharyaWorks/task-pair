"use client";
import React, { useState ,useEffect } from "react";
import axios from "axios";
import Loader from "@/components/custom/Loader";
import baseUrl from "@/config/config";


const UserDetail = ({ user }: any) => {
    const [loading,setLoading] = useState<boolean>(false)
 

  const [userDetail, setUserDetail] = useState<any>();
  const convertToDDMMYY = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      try {
        const response = await axios.get(
          `${process.env.NODE_ENV === 'production' ? baseUrl.production : baseUrl.development}/api/userDetail`
        );

        setUserDetail(response.data.data[0]);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user detail:", error);
        setLoading(false)
      }
    };

    fetchData();

    return () => {};
  }, []);
  return (
    <div>
      {loading?<Loader /> :<div className="flex justify-between">
        <span className="text-sm font-medium text-white">Joined:</span>
        <span className="text-sm">{convertToDDMMYY(userDetail?.$createdAt)}</span>
      </div>}
    </div>
  );
};

export default UserDetail;
