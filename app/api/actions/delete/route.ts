import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

/**
 * API Route: DELETE /api/actions/delete
 * Delete an action
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    console.log(`🗑️ [DELETE ACTION] Deleting action: ${id}`);

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient();

    // Delete the action
    const { error } = await supabase
      .from("content_actions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ [DELETE ACTION] Database error:", error);
      throw error;
    }

    console.log(`✅ [DELETE ACTION] Deleted action: ${id}`);

    return NextResponse.json({
      success: true,
      message: "Action deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ [DELETE ACTION] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete action",
      },
      { status: 500 }
    );
  }
}

