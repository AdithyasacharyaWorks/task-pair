import { getSession } from "next-auth/react";


export default async function(){
    return await getSession()
}