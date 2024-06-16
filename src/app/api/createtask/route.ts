import { dbId, database, collectionId, ID, Query } from "@/backend";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

type error = {
    message: string;
}

export async function POST(request: Request) {
  const id = ID.unique();
  
  try {
    const body = await request.json();
    console.log("Request body:", body);

    // Retrieve email from cookies
    // const email = cookies().get('email')?.value;
    const url = new URL(request.url);
    const email = url.searchParams.get('email');



    const data = await database.createDocument(dbId, collectionId, id, {
      taskName: body.username,
      taskDesc: body.description,
      assignedTo: body.assignTo,
      userId: "666c6b21003d48813de0",
      email: email
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
