"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-bold mb-1">Scheduled Posts</h1>
        <p className="text-sm text-neutral-600">Manage your content calendar</p>
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Post
        </Button>
      </div>

      {/* Empty State */}
      <Card className="p-12 border border-dashed border-neutral-300 bg-neutral-50">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-neutral-200 rounded-xl mb-4">
            <Calendar className="h-6 w-6 text-neutral-600" />
          </div>
          <p className="text-neutral-700 font-semibold mb-1">No scheduled posts yet</p>
          <p className="text-sm text-neutral-500">Start creating posts and they will appear here with their status and scheduling information</p>
        </div>
      </Card>
    </div>
  );
}
