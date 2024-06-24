import { database,dbId,collectionId,Query } from "@/backend";
import { NextResponse,NextRequest } from "next/server";
import { getSession } from "next-auth/react";

const getusers=async ()=>{
    const session = await getSession()
    return session
}
export async function GET(req: NextRequest) {
    try {

        const session = await getusers()

    

        const url = new URL(req.url);
        const email = url.searchParams.get('email') || ""
        const taskId = url.searchParams.get('taskId')|| ""
    


        const res = await database.listDocuments(dbId, collectionId, [
            Query.limit(50),
            // Query.equal('email', "adithyasacharya929@gmail.com"),
            Query.equal('$id',taskId)
        ]);

        return NextResponse.json({
            success: true,
            data: res
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "There is some error in fetching data",
            error: error.message || error
        }, {
            status: 500 
        });
    }
}