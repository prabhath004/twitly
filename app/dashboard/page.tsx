"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, ArrowUpRight, Clock, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-mono text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-sm text-neutral-600">Real-time insights for your AI agent</p>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Engagement Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-200 transition-all hover:shadow-md">
          <div className="flex items-start justify-between mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
              <ArrowUpRight className="h-3 w-3" />
              Up 14%
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">Total Engagements</p>
            <p className="text-4xl font-bold text-neutral-900">0</p>
          </div>
        </Card>

        {/* Scheduled Card */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:border-emerald-200 transition-all hover:shadow-md">
          <div className="flex items-start justify-between mb-8">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Send className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1 text-neutral-500 text-xs font-semibold">
              <Clock className="h-3 w-3" />
              Pending
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">Queued Posts</p>
            <p className="text-4xl font-bold text-neutral-900">0</p>
          </div>
        </Card>

        {/* Performance Card */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:border-purple-200 transition-all hover:shadow-md">
          <div className="flex items-start justify-between mb-8">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-neutral-500 text-xs font-semibold">
              <Clock className="h-3 w-3" />
              Ready
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">Success Rate</p>
            <p className="text-4xl font-bold text-neutral-900">—</p>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-12 border border-dashed border-neutral-300 bg-neutral-50">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-neutral-200 rounded-xl mb-4">
                <MessageSquare className="h-6 w-6 text-neutral-600" />
              </div>
              <p className="text-neutral-700 font-semibold mb-1">No activity yet</p>
              <p className="text-sm text-neutral-500">Posts and conversations will appear here as your agent becomes active</p>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Project Info */}
          <Card className="p-5 border border-neutral-200">
            <h3 className="font-mono font-semibold text-sm mb-4">Project Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600">Setup</span>
                <span className="text-xs font-semibold text-amber-600">In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600">Agent</span>
                <span className="text-xs font-semibold text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600">Monitoring</span>
                <span className="text-xs font-semibold text-blue-600">Enabled</span>
              </div>
            </div>
          </Card>

          {/* Quick Start */}
          <Card className="p-5 border border-neutral-200">
            <h3 className="font-mono font-semibold text-sm mb-4">Get Started</h3>
            <div className="space-y-2">
              <Button className="w-full font-mono bg-blue-600 hover:bg-blue-700 text-white text-xs h-9">
                Create Post
              </Button>
              <Button variant="outline" className="w-full font-mono text-xs h-9">
                View Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
