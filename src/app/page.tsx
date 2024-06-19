import { redirect } from "next/navigation"
import "./globals.css"
import {getUserSession} from "@/lib/session"
import { Button } from "@/components/ui/button"

export default async function Home() {
 const user = await getUserSession()

 const login =async()=>{
  'use server'
  redirect('/api/auth/signin')
 }
  return (
    <main className="flex  flex-col items-center justify-between p-24">
     {user === undefined ? 
     <form action={login}>
      <div className="flex flex-col">
      <label>Please sign in to continue</label>
       <Button variant={"secondary"}>sign in </Button>
       </div>
      </form>
      :
      <div>
        <div>{user?.name}</div>
        <img src={user?.image||""} alt="image"/>
        <div>{user?.email}</div>
      </div>
      }
    </main>
  );
}
