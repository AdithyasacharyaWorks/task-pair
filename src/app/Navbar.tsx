// components/Navbar.tsx
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Cookies from "js-cookie";
import { useAppContext } from '@/lib/userContextProvder'; 
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const pathName = usePathname();
    const List = [
        { label: "Home", href: "/" },
        { label: "Add Task", href: "/task" },
        { label: "List Task", href: '/task/list' },
        { label: "Profile", href: "/profile" }
    ];
    const router = useRouter()

    const { state, clearState } = useAppContext();
    // const { userEmail } = state;

    const handleLogout = async () => {
        // try {
        //     await fetch('/api/logout', {
        //         method: 'POST',
        //     });

        //     clearState(); 
        //     router.push('/login')
        // } catch (error) {
        //     console.error('Logout failed:', error);
        // Cookies.remove('appContextState', "string");
        // }

    };

    // if (!userEmail) {
    //     return null; // Render nothing if no user is logged in
    // }

    return (
        <div className='shadow-md sticky top-0 z-50 bg-[#30363d]'>
            <div className='container mx-auto py-4'>
                <div className='flex items-center space-x-6'>
                    <FaBug color='green' size="24px" />
                    {List.map((ele) => (
                        <Link href={ele.href} key={ele.href}>
                            <span
                                className={cn(
                                    "cursor-pointer text-md font-light",
                                    pathName === ele.href ? "text-blue-500" : "text-white"
                                )}
                            >
                                {ele.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
