import { dbId,collectionId,database,Query } from "@/backend";
import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
    

        const url = new URL(req.url);
        const id = url.searchParams.get('id') || ""
    

        const res = await database.listDocuments(dbId, collectionId, [
            Query.limit(50),
            Query.equal('$id',id)
            // Query.notEqual('email',email)
        ]);

        console.log(res.documents[0].isAccepted)
        let finalRes:any = ''
        if(res.documents[0].isAccepted === "Accept"){
             finalRes= "Accepted"
        }else if(res.documents[0].isAccepted === "Decline"){
            finalRes= "Declined"
        }else{
            finalRes =res
        }


        return NextResponse.json({
            success: true,
            data: finalRes
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