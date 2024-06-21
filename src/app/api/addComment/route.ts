import { NextResponse } from "next/server";
import { database, dbId, collectionId } from "@/backend"; // Import your configured Appwrite instance

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { taskId, comment } = body;


    const data = await database.getDocument(dbId,collectionId,taskId)


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
