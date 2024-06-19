'use server'
import { getUserSession } from "@/lib/session"
export default async function(){
    'use server'

    const user =  await getUserSession()
    return user?.name
}