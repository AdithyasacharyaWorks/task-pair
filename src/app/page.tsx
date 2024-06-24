// app/page.tsx

import { redirect } from "next/navigation";
import "./globals.css";
import { getSession } from "next-auth/react";
import { getUserSession } from "@/lib/session";
import Dashboard from "./Dashboard";

export default async function Home() {
  const user = await getUserSession();

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {user ? (
          <Dashboard user={user} />
        ) : (
          <div>
          </div>
        )}
      </div>
    </main>
  );
}
