import { dbId,collectionId,database,Query } from "@/backend";
import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
    

        const url = new URL(req.url);
        const email = url.searchParams.get('email') || ""
    

        const res = await database.listDocuments(dbId, collectionId, [
            Query.limit(50),
            Query.equal('assignedTo', email),
            Query.equal('isAccepted','Pending'),
            // Query.notEqual('email',email)
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