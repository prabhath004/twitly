"use client";

import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function ActivityFeedPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-3xl font-bold mb-1">Activity Feed</h1>
        <p className="text-sm text-neutral-600">Real-time activity from your AI agent</p>
      </div>

      {/* Empty State */}
      <Card className="p-12 border border-dashed border-neutral-300 bg-neutral-50">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-neutral-200 rounded-xl mb-4">
            <Activity className="h-6 w-6 text-neutral-600" />
          </div>
          <p className="text-neutral-700 font-semibold mb-1">No activity yet</p>
          <p className="text-sm text-neutral-500">Your agent's posts, replies, and engagements will appear here in real-time</p>
        </div>
      </Card>
    </div>
  );
}
