"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/lib/projects-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Sparkles, Shield, ChevronRight, CheckCircle } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject } = useProjects();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Brand Info Tab
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  // Persona & Keywords Tab
  const [personality, setPersonality] = useState("normal");
  const [keywords, setKeywords] = useState("");
  const [watchedAccounts, setWatchedAccounts] = useState("");

  // Safety & Review Tab
  const [autoPost, setAutoPost] = useState(false);
  const [whatsappDrafts, setWhatsappDrafts] = useState(true);
  const [monitorReddit, setMonitorReddit] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(30);

  const TOTAL_STEPS = 4;

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      setIsSaving(true);
      await createProject(projectName);
      setCurrentStep(2);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSaving(true);
    try {
      // Update the project with all the form data
      // This would be called from the projects context
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-mono text-3xl font-bold mb-2">Create New Project</h1>
          <p className="text-sm text-neutral-600">Set up your brand automation project</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-semibold text-neutral-600">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="font-mono text-xs font-semibold text-neutral-600">
              {progressPercentage.toFixed(0)}% complete
            </span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step 1: Project Name */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-xl">Project Name</CardTitle>
              <CardDescription className="font-mono">
                Give your project a name (this can be changed later)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="projectName" className="font-mono text-sm">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Acme CRM, Tech Blog, Startup Updates"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="font-mono mt-2"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleCreateProject();
                  }}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={handleCreateProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm"
                  disabled={isSaving}
                >
                  {isSaving ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Brand Info */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <div>
                  <CardTitle className="font-mono text-xl">Brand Information</CardTitle>
                  <CardDescription className="font-mono">
                    Tell us about your brand
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="brandName" className="font-mono text-sm">
                  Brand Name
                </Label>
                <Input
                  id="brandName"
                  placeholder="Your Brand"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="font-mono mt-2"
                />
              </div>
              <div>
                <Label htmlFor="description" className="font-mono text-sm">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="What does your brand do?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="font-mono mt-2"
                />
              </div>
              <div>
                <Label htmlFor="website" className="font-mono text-sm">
                  Website URL
                </Label>
                <Input
                  id="website"
                  placeholder="https://yourbrand.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="font-mono mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Persona & Keywords */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <div>
                  <CardTitle className="font-mono text-xl">Persona & Keywords</CardTitle>
                  <CardDescription className="font-mono">
                    Define your brand voice and interests
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="font-mono text-sm mb-4 block">Personality Tone</Label>
                <div className="grid grid-cols-4 gap-3">
                  {["normal", "smart", "unhinged", "technical"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPersonality(p)}
                      className={`p-3 border-2 rounded-lg text-center transition-all font-mono text-xs ${
                        personality === p
                          ? "border-purple-600 bg-purple-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="keywords" className="font-mono text-sm">
                  Keywords
                </Label>
                <Input
                  id="keywords"
                  placeholder="Comma-separated keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="font-mono mt-2"
                />
              </div>
              <div>
                <Label htmlFor="watched" className="font-mono text-sm">
                  Watched Accounts
                </Label>
                <Input
                  id="watched"
                  placeholder="@handle, @handle"
                  value={watchedAccounts}
                  onChange={(e) => setWatchedAccounts(e.target.value)}
                  className="font-mono mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Safety & Review */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <CardTitle className="font-mono text-xl">Safety & Review</CardTitle>
                  <CardDescription className="font-mono">
                    Control how your agent behaves
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-mono font-semibold text-sm">Auto-post without approval</p>
                    <p className="text-xs text-neutral-600 font-mono">Let AI post automatically</p>
                  </div>
                  <button
                    onClick={() => setAutoPost(!autoPost)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      autoPost ? "bg-green-600" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        autoPost ? "translate-x-6" : "translate-x-0.5"
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
                    onClick={() => setWhatsappDrafts(!whatsappDrafts)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      whatsappDrafts ? "bg-green-600" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        whatsappDrafts ? "translate-x-6" : "translate-x-0.5"
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
                    onClick={() => setMonitorReddit(!monitorReddit)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      monitorReddit ? "bg-green-600" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        monitorReddit ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="font-mono text-sm">Daily Reply Limit</Label>
                  <span className="font-mono font-bold">{dailyLimit}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between mt-8">
          <div>
            {currentStep > 1 && (
              <Button
                onClick={handlePrevStep}
                variant="outline"
                className="font-mono text-sm"
              >
                ← Back
              </Button>
            )}
          </div>
          <div>
            {currentStep < TOTAL_STEPS ? (
              <Button
                onClick={handleNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white font-mono text-sm"
                disabled={isSaving}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
