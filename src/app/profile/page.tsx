

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
import { getUserSession } from "@/lib/session";
import { cn } from '@/lib/utils';
import { redirect } from "next/navigation";



interface AppContextState {
  userEmail: string;
  userId: string;
  userName: string;
}

interface AppContextType {
  state: AppContextState;
  setState: React.Dispatch<React.SetStateAction<AppContextState>>;
}

const ProfilePage = async() => {

    const user = await getUserSession();
    const handleLogout = async () => {
        'use server'
        redirect('/api/auth/signout')
      };


    return (
        <form action={handleLogout}>
        <Card className="max-w-md mx-auto mt-10 font-light">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={user?.image||""} alt="User Name" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className={cn("cursor-pointer text-sm font-light")}>
                        <CardTitle>{user?.name}</CardTitle>
                        <CardDescription>{user?.email}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <span className="text-sm">{user?.email}</span>
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
                <Button variant="default" >Logout</Button>
            </CardFooter>
        </Card>
        </form>
    );
}

export default ProfilePage;
