// pages/profile.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserSession } from "@/lib/session";
import { signOut } from "next-auth/react";
import UserDetail from "./UserDetail";
import { cn } from '@/lib/utils';
import Cardfooter from "./Cardfooter";

const ProfilePage = async () => {
  const user = await getUserSession();

  return (
    <Card className="max-w-md mx-auto mt-32 font-light shadow-3xl rounded-lg border bg-[#0E1117] border-gray-300 text-white">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.image || ""} alt="User Name" />
            <AvatarFallback className="bg-white">UN</AvatarFallback>
          </Avatar>
          <div className={cn("cursor-pointer text-sm font-light")}>
            <CardTitle className="text-xl font-semibold">
              {user?.name}
            </CardTitle>
            <CardDescription className="">{user?.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-4 mt-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white">Email:</span>
            <span className="text-sm">{user?.email}</span>
          </div>
          <UserDetail />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end space-x-2 mt-4">
       <Cardfooter />
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;
