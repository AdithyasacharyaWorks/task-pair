import { ID, dbId, collectionId, database, Query } from "@/backend/index";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

type Errors=any


export async function POST(req: NextRequest) {
    try {
        const { taskName, taskDesc, assignedTo } = await req.json();

        const res = await database.createDocument(
            dbId,
            collectionId,
            ID.unique(),
            {
                taskName: taskName || "default task name",
                taskDesc: taskDesc || "default task description",
                assignedTo: assignedTo || "default assignee"
            }
        );

        return NextResponse.json({
            success: true,
            data: res,
        });

    } catch (error:Errors) {
        console.error('Error creating document:', error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {
            status: 500 
        });
    }
}

// export async function GET(req:NextRequest){
//     try {
//         const { searchParams } = new URL(req.url);
//         // const email = searchParams.get('email')?.toString();
//         const email = cookies().get('email')?.value;
        

//         console.log(email)

//         const res = await database.listDocuments(dbId,collectionId,[Query.limit(50),Query.equal('email',`${email}`)])
//             return NextResponse.json(
//                 {
//                     success:true,
//                     data:res
//                 }
//             )
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({
//             success:false,
//             data:"there is some error in fetching data"
//         })
//     }
// }
export async function GET(req: NextRequest) {
    try {
    

        const url = new URL(req.url);
        const email = url.searchParams.get('email') || ""
        console.log("get request for list")

        const res = await database.listDocuments(dbId, collectionId, [
            Query.limit(50),
            Query.or( [Query.equal('assignedTo',email),Query.equal('email',email)])


            // Query.or([Query.equal("email", email), Query.equal("assignedTo", email)])
        ]);

        console.log(res)

        console.log(email)

        return NextResponse.json({
            success: true,
            data: res
        });

    } catch (error: Errors) {
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
