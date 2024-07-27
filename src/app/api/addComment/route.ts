import { NextResponse } from "next/server";
import { database, dbId, collectionId } from "@/backend";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
      if (!session) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
    const body = await req.json();
    const { taskId, comment } = body;


    const data = await database.getDocument(dbId,collectionId,taskId)

    if(session?.user?.email !== data?.email || session?.user?.email !==data?.assignedTo){
      return NextResponse.json({ status: 'notValidUser', message: 'You are Unauthorized to perform this operation' }, { status: 401 });
    }



    const updatedDocument = await database.updateDocument(dbId, collectionId, taskId, {
      comments: [ ...data.comments,`${JSON.stringify(comment)}`],
    });

    return NextResponse.json({
      status: "success",
      message: "Comment added successfully",
      data: updatedDocument,
    }, {
      status: 200
    });
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to add comment",
      error: error.message || error,
    }, {
      status: 500
    });
  }
}
