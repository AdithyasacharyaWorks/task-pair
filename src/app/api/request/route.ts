import { dbId,collectionId,database,Query } from "@/backend";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 
export async function GET(req: NextRequest) {
    try {
    

        const url = new URL(req.url);
        const email = url.searchParams.get('email') || ""
        console.log("this is email coming from first page",email)

        const session = await getServerSession(authOptions);
        if (!session) {
            console.log("ihdfashdkfjgadf")
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }

        console.log("session detail",session)
        console.log("email",email)

        if (session?.user?.email != email) {
            console.log("8937458734593864")
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
    

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