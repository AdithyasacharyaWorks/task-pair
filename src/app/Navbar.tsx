// components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import Cookies from "js-cookie";
import { useAppContext } from "@/lib/userContextProvder";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";

const Navbar = () => {
  const pathName = usePathname();
  const List = [
    { label: "Home", href: "/" },
    { label: "Add Task", href: "/task" },
    { label: "List Task", href: "/task/list" },
    { label: "Profile", href: "/profile" },
  ];
  const router = useRouter();

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
  const [active, setActive] = useState<string | null>(null);

  return (
    // <div className='shadow-md sticky top-0 z-50 bg-[#30363d]'>

    //     <div className='container mx-auto py-4'>
    //         <div className='flex items-center space-x-6'>
    //             <FaBug color='green' size="24px" />
    //             {List.map((ele) => (
    //                 <Link href={ele.href} key={ele.href}>
    //                     <span
    //                         className={cn(
    //                             "cursor-pointer text-md font-light",
    //                             pathName === ele.href ? "text-blue-500" : "text-white"
    //                         )}
    //                     >
    //                         {ele.label}
    //                     </span>
    //                 </Link>
    //             ))}
    //         </div>
    //     </div>
    // </div>

    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", "top-2")}
    >
      <Menu setActive={setActive}>
        <div className="flex items-center">
          <FaBug color="green" />
        </div>
        <Link href={"/"}>
          <div className="text-black">Home</div>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Task">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/task">Add Task</HoveredLink>
            <HoveredLink href="/task/list">List Task</HoveredLink>
          </div>
        </MenuItem>
        <Link href={"/profile"}>
          <div className="text-black">Profile</div>
        </Link>
      </Menu>
    </div>
  );
};

export default Navbar;
