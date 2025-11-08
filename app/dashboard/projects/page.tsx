"use client";

import { useState } from "react";
import { useProjects } from "@/lib/projects-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Globe, Sparkles, Shield, Plus, Trash2, Edit2 } from "lucide-react";

export default function ProjectsPage() {
  const { projects, currentProjectId, setCurrentProject, createProject, updateProject } = useProjects();
  const [showNewForm, setShowNewForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingTab, setEditingTab] = useState<"brand" | "persona" | "safety">("brand");

  // Local state for editing
  const [editBrandName, setEditBrandName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editPersona, setEditPersona] = useState("");
  const [editKeywords, setEditKeywords] = useState("");
  const [editWatchedAccounts, setEditWatchedAccounts] = useState("");
  const [editAutoPost, setEditAutoPost] = useState(false);
  const [editWhatsappDrafts, setEditWhatsappDrafts] = useState(true);
  const [editMonitorReddit, setEditMonitorReddit] = useState(true);
  const [editDailyLimit, setEditDailyLimit] = useState(30);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName);
      setNewProjectName("");
      setShowNewForm(false);
    }
  };

  const handleEditProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setEditingProjectId(projectId);
      const settings = project.settings;
      setEditBrandName(settings.brandName);
      setEditDescription(settings.description);
      setEditWebsite(settings.website);
      setEditPersona(settings.persona);
      setEditKeywords(settings.keywords);
      setEditWatchedAccounts(settings.watchedAccounts);
      setEditAutoPost(settings.autoPost);
      setEditWhatsappDrafts(settings.whatsappDrafts);
      setEditMonitorReddit(settings.monitorReddit);
      setEditDailyLimit(settings.dailyLimit);
    }
  };

  const handleSaveEdit = () => {
    if (editingProjectId) {
      updateProject(editingProjectId, {
        brandName: editBrandName,
        description: editDescription,
        website: editWebsite,
        persona: editPersona,
        keywords: editKeywords,
        watchedAccounts: editWatchedAccounts,
        autoPost: editAutoPost,
        whatsappDrafts: editWhatsappDrafts,
        monitorReddit: editMonitorReddit,
        dailyLimit: editDailyLimit,
      });
      setEditingProjectId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-3xl font-bold mb-1">Projects</h1>
          <p className="text-sm text-neutral-600">Manage your AI agent projects and configurations</p>
        </div>
        {!showNewForm && (
          <Button
            onClick={() => setShowNewForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}
      </div>

      {/* New Project Form */}
      {showNewForm && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-project-name" className="font-mono text-sm">
                  Project Name
                </Label>
                <Input
                  id="new-project-name"
                  placeholder="e.g., Acme CRM, Tech Blog, Startup Updates"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="font-mono mt-2"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateProject();
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm"
                >
                  Create Project
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewForm(false);
                    setNewProjectName("");
                  }}
                  className="font-mono text-sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border border-neutral-200">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="font-mono text-xl">{project.name}</CardTitle>
                  {currentProjectId === project.id && (
                    <Badge className="bg-blue-100 text-blue-800 font-mono text-xs">Active</Badge>
                  )}
                </div>
                <CardDescription className="font-mono">
                  {project.settings.description || "No description"}
                </CardDescription>
              </div>
            </CardHeader>

            {editingProjectId === project.id ? (
              <CardContent className="space-y-6">
                {/* Edit Tabs */}
                <div className="flex gap-2 border-b">
                  {[
                    { id: "brand", label: "Brand Info", icon: Globe },
                    { id: "persona", label: "Persona & Keywords", icon: Sparkles },
                    { id: "safety", label: "Safety & Review", icon: Shield },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setEditingTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-3 font-mono text-sm border-b-2 transition-colors ${
                        editingTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Brand Info Tab */}
                {editingTab === "brand" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="brand-name-edit" className="font-mono text-sm">
                        Brand Name
                      </Label>
                      <Input
                        id="brand-name-edit"
                        value={editBrandName}
                        onChange={(e) => setEditBrandName(e.target.value)}
                        className="font-mono mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description-edit" className="font-mono text-sm">
                        Description
                      </Label>
                      <Input
                        id="description-edit"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="font-mono mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website-edit" className="font-mono text-sm">
                        Website URL
                      </Label>
                      <Input
                        id="website-edit"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                        className="font-mono mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Persona & Keywords Tab */}
                {editingTab === "persona" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="font-mono text-sm mb-4 block">Personality Tone</Label>
                      <div className="grid grid-cols-4 gap-3">
                        {["normal", "smart", "unhinged", "technical"].map((p) => (
                          <button
                            key={p}
                            onClick={() => setEditPersona(p)}
                            className={`p-3 border-2 rounded-lg text-center transition-all font-mono text-xs ${
                              editPersona === p
                                ? "border-blue-600 bg-blue-50"
                                : "border-neutral-200 hover:border-neutral-300"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="keywords-edit" className="font-mono text-sm">
                        Keywords
                      </Label>
                      <Input
                        id="keywords-edit"
                        placeholder="Comma-separated"
                        value={editKeywords}
                        onChange={(e) => setEditKeywords(e.target.value)}
                        className="font-mono mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="watched-edit" className="font-mono text-sm">
                        Watched Accounts
                      </Label>
                      <Input
                        id="watched-edit"
                        placeholder="@handle, @handle"
                        value={editWatchedAccounts}
                        onChange={(e) => setEditWatchedAccounts(e.target.value)}
                        className="font-mono mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Safety & Review Tab */}
                {editingTab === "safety" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-mono font-semibold text-sm">Auto-post without approval</p>
                          <p className="text-xs text-neutral-600 font-mono">Let AI post automatically</p>
                        </div>
                        <button
                          onClick={() => setEditAutoPost(!editAutoPost)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            editAutoPost ? "bg-green-600" : "bg-neutral-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              editAutoPost ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-mono font-semibold text-sm">Send drafts to WhatsApp</p>
                          <p className="text-xs text-neutral-600 font-mono">Review before posting</p>
                        </div>
                        <button
                          onClick={() => setEditWhatsappDrafts(!editWhatsappDrafts)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            editWhatsappDrafts ? "bg-green-600" : "bg-neutral-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              editWhatsappDrafts ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-mono font-semibold text-sm">Monitor Reddit</p>
                          <p className="text-xs text-neutral-600 font-mono">Track relevant subreddits</p>
                        </div>
                        <button
                          onClick={() => setEditMonitorReddit(!editMonitorReddit)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            editMonitorReddit ? "bg-green-600" : "bg-neutral-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              editMonitorReddit ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="font-mono text-sm">Daily Reply Limit</Label>
                        <span className="font-mono font-bold">{editDailyLimit}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={editDailyLimit}
                        onChange={(e) => setEditDailyLimit(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-green-600 hover:bg-green-700 text-white font-mono text-sm"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProjectId(null)}
                    className="font-mono text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-neutral-600 font-mono">Brand Name</p>
                    <p className="font-mono font-semibold">{project.settings.brandName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 font-mono">Persona</p>
                    <p className="font-mono font-semibold capitalize">{project.settings.persona}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 font-mono">Website</p>
                    <p className="font-mono font-semibold text-sm truncate">{project.settings.website}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      setCurrentProject(project.id);
                    }}
                    className={`font-mono text-sm ${
                      currentProjectId === project.id
                        ? "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {currentProjectId === project.id ? "Currently Active" : "Activate"}
                  </Button>
                  <Button
                    onClick={() => handleEditProject(project.id)}
                    variant="outline"
                    className="font-mono text-sm"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {projects.length > 1 && (
                    <Button
                      onClick={() => {
                        // Delete functionality - for now just show placeholder
                      }}
                      variant="outline"
                      className="font-mono text-sm text-red-600 hover:text-red-700"
                      disabled
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
