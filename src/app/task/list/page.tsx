'use client'
import dynamic from 'next/dynamic'
import ListComponent from './ListComponent'
import task from '@/app/actions/task'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import Loader from "../../../components/custom/Loader";

const Page = () => {
    const [data, setData] = useState<Task[]>([]); // Initialize with an empty array
    const cookieState = Cookies.get('appContextState');
    const email = cookieState ? JSON.parse(cookieState) :""

    useEffect(() => {
        task(email.userEmail).then((res) => res.json())
             .then((res) => setData(res.data.documents));
    }, []);


    type Task = {
        $id: string;
        taskName: string;
        taskDesc: string;
        assignedTo: string;
        status: string;
        priority: string;
    }

    return (
        <div className=''>
            {!data?<div className='flex justify-center'>No data</div>:data.length > 0 ? (
                <div className="relative">
                    <div className='z-10'><ListComponent data={data} /></div>
                </div>
            ) :<div className='flex justify-center mt-32'> <Loader /></div>}
        </div>
    );
}

export default Page;
