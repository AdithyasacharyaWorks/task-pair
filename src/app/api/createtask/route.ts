import { dbId, database, collectionId, ID, Query } from "@/backend";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 

type error = {
    message: string;
}

export async function POST(request: Request) {
  const id = ID.unique();
  
  try {

    const session = await getServerSession(authOptions);
      if (!session) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
    const body = await request.json();
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    const data = await database.createDocument(dbId, collectionId, id, {
      taskName: body.username,
      taskDesc: body.description,
      assignedTo: body.assignTo,
      email: email,
      priority:body.priority||"low",
      deadline:body.deadline||"none",
      isAccepted:email === body.assignTo ?"Accept":"Pending"
    });

    return NextResponse.json({
      status: "success",
    }, {
      status: 200
    });
  } catch (error: any) {
    console.error("Error creating task:", error);
    return NextResponse.json({
        status: "error",
        message: "Failed to create task",
        error: error.message || error
    }, {
        status: 500
    });
  }
}
