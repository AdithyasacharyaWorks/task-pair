import { NextResponse } from "next/server";
import { database, userCollectionId,dbId, Query } from "@/backend";
import { getUserSession } from "@/lib/session";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
export async function GET(req:Request){
    try {
        const session = await getServerSession(authOptions);
      if (!session) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
        const user:any = await getUserSession();

       const res =  await database.listDocuments(dbId,userCollectionId,[Query.equal('email',user?.email)])

        return NextResponse.json({
            status:200,
            data:res.documents
        })
    } catch (error) {
        return NextResponse.json({
            status:400,
            data:"failed to get the user detail"
        })
    }
}