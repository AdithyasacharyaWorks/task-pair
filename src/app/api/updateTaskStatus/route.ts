import { collectionId, database, dbId } from "@/backend";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {

const session = await getServerSession(authOptions);
      if (!session) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
    const { taskId, status, statusChange } = await req.json();

    // Fetch the existing document
    const document = await database.getDocument(dbId, collectionId, taskId);
    console.log(document)

    if(session?.user?.email !== document?.email || session?.user?.email !==document?.assignedTo){
      return NextResponse.json({ status: 'notValidUser', message: 'You are Unauthorized to perform this operation' }, { status: 401 });
    }

    // Append the new status change entry to the existing statusChange array
    const updatedStatusChange = [
      ...document.statusChange,
      JSON.stringify(statusChange),
    ];

    // Update the document with the new status and statusChange array
    const updatedDocument = await database.updateDocument(
      dbId,
      collectionId,
      taskId,
      {
        status: status,
        statusChange: updatedStatusChange,
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: updatedDocument,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || error,
      },
      {
        status: 500,
      }
    );
  }
}
