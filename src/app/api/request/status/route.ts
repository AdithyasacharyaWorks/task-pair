import { dbId, collectionId, database } from "@/backend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id') || "";
    const status = url.searchParams.get('status') || "";

    // Construct the update data based on the received status
    const updateData = {
      isAccepted: status === 'Accepted' ? 'Accept' : 'Decline'
    };

    // Perform the update in the database
    await database.updateDocument(dbId, collectionId, id, updateData);

    return NextResponse.json({
      success: true,
      message: `Document with ID ${id} updated successfully.`,
      updatedData: updateData
    });

  } catch (error: any) {
    console.error('Error updating document:', error);
    return NextResponse.json({
      success: false,
      message: "There is some error in updating data",
      error: error.message || error
    }, {
      status: 500
    });
  }
}
