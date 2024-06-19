'use client'
import dynamic from 'next/dynamic'
import ListComponent from './ListComponent'
import task from '@/app/actions/task'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import Loader from "../../../components/custom/Loader";

const Page = () => {
    const [data, setData] = useState<Task[]>([]); // Initialize with an empty array;
    const [error,setError] =useState(false)

    useEffect(() => {

        setError(false);
        task().then((res) => res.json())
             .then((res) => setData(res.data.documents)).catch((res)=>{
                console.log("here inside this errosr")
                setError(true);
             })
    }, []);

    console.log(data)


    type Task = {
        $id: string;
        taskName: string;
        taskDesc: string;
        status: string;
        priority: string;
        isAccepted: boolean | null;
    };

    return (
        <div className=''>
            {error?"Error fetching the data": !data?<div className='flex justify-center'>No data</div>:data.length > 0 ? (
                <div className="relative">
                   {!error &&  <div className='z-10'><ListComponent data={data}/></div>}
                </div>
            ) :<div className='flex justify-center mt-32'> <Loader /></div>}
        </div>
    );
}

export default Page;
