'use client';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Button,
} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Separator,
} from "@/components/ui/separator";

import { useAppContext } from "@/lib/userContextProvder";
import { cn } from '@/lib/utils';
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AppContextState {
  userEmail: string;
  userId: string;
  userName: string;
}

// Define the shape of the context, including the state and setState function
interface AppContextType {
  state: AppContextState;
  setState: React.Dispatch<React.SetStateAction<AppContextState>>;
}

const ProfilePage = () => {
  // react-hooks/rules-of-hooks
  const [state, setState] = useState<AppContextState>(() => {
    const cookieState = Cookies.get('appContextState');
    return cookieState ? JSON.parse(cookieState) : ""
});
    const router = useRouter();
    const { clearState } = useAppContext();


    const handleLogout = async () => {
        try {
        //   await axios.post("/api/logout");
    
          // Remove cookies
          Cookies.remove('email');
          Cookies.remove('token');
          Cookies.remove('appContextState');
    
          // Clear state
          setState({ userEmail: '', userId: '', userName: '' });
          clearState();
          router.push('/login');
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };


    return (
        <Card className="max-w-md mx-auto mt-10 font-light">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="" alt="User Name" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className={cn("cursor-pointer text-sm font-light")}>
                        <CardTitle>{state.userEmail!=='' && state.userEmail}</CardTitle>
                        <CardDescription>{"hello"}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <span className="text-sm">{state.userEmail!=='' && state.userEmail}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Location:</span>
                        <span className="text-sm">City, Country</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Joined:</span>
                        <span className="text-sm">January 2023</span>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end space-x-2 mt-2">
                <Button variant="default" onClick={handleLogout}>Logout</Button>
            </CardFooter>
        </Card>
    );
}

export default ProfilePage;
