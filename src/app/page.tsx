// app/page.tsx

import { redirect } from "next/navigation";
import "./globals.css";
import { getSession } from "next-auth/react";
import { getUserSession } from "@/lib/session";
import Dashboard from "./Dashboard";

export default async function Home() {
  const user = await getUserSession();

  



  console.log("user detail", user);

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {user ? (
          <Dashboard user={user} />
        ) : (
          <div>
            {/* <button onClick={() => signIn()} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Sign In
            </button> */}
          </div>
        )}
      </div>
    </main>
  );
}
