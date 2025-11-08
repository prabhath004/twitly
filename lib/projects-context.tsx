"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createSupabaseClient } from "./supabase";

export interface ProjectSettings {
  brandName: string;
  description: string;
  website: string;
  persona: string;
  keywords: string;
  watchedAccounts: string;
  autoPost: boolean;
  whatsappDrafts: boolean;
  monitorReddit: boolean;
  dailyLimit: number;
}

export interface Project {
  id: string;
  name: string;
  settings: ProjectSettings;
}

interface ProjectsContextType {
  projects: Project[];
  currentProjectId: string;
  currentProject: Project | undefined;
  setCurrentProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<ProjectSettings>) => void;
  createProject: (name: string) => void;
  isLoading: boolean;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: ProjectSettings = {
  brandName: "",
  description: "",
  website: "",
  persona: "normal",
  keywords: "",
  watchedAccounts: "",
  autoPost: false,
  whatsappDrafts: true,
  monitorReddit: true,
  dailyLimit: 30,
};

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createSupabaseClient();

  // Load projects from database on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user logged in");
          return;
        }

        // Fetch brand_agent records from database
        const { data, error } = await (supabase
          .from("brand_agent")
          .select("*")
          .eq("user_id", user.id) as any);

        if (error) {
          console.error("Failed to load projects from database:", error);
          return;
        }

        // Transform database records to Project format
        const loadedProjects: Project[] = (data || []).map((agent: any) => ({
          id: agent.id,
          name: agent.name,
          settings: {
            brandName: agent.brand_name || "",
            description: agent.description || "",
            website: agent.website || "",
            persona: agent.personality || "normal",
            keywords: agent.keywords || "",
            watchedAccounts: agent.watched_accounts || "",
            autoPost: agent.auto_post || false,
            whatsappDrafts: agent.whatsapp_drafts || true,
            monitorReddit: agent.monitor_reddit || true,
            dailyLimit: agent.daily_reply_limit || 30,
          },
        }));

        setProjects(loadedProjects);

        // Set first project as current if none selected
        if (loadedProjects.length > 0) {
          setCurrentProjectId(loadedProjects[0].id);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const currentProject = projects.find((p) => p.id === currentProjectId);

  const setCurrentProject = (projectId: string) => {
    const exists = projects.find((p) => p.id === projectId);
    if (exists) {
      setCurrentProjectId(projectId);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<ProjectSettings>) => {
    try {
      // Update local state immediately for UX
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, settings: { ...p.settings, ...updates } }
            : p
        )
      );

      // Update database
      const updateData: Record<string, any> = {};
      if (updates.brandName !== undefined) updateData.brand_name = updates.brandName;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.website !== undefined) updateData.website = updates.website;
      if (updates.persona !== undefined) updateData.personality = updates.persona;
      if (updates.keywords !== undefined) updateData.keywords = updates.keywords;
      if (updates.watchedAccounts !== undefined) updateData.watched_accounts = updates.watchedAccounts;
      if (updates.autoPost !== undefined) updateData.auto_post = updates.autoPost;
      if (updates.whatsappDrafts !== undefined) updateData.whatsapp_drafts = updates.whatsappDrafts;
      if (updates.monitorReddit !== undefined) updateData.monitor_reddit = updates.monitorReddit;
      if (updates.dailyLimit !== undefined) updateData.daily_reply_limit = updates.dailyLimit;

      updateData.updated_at = new Date().toISOString();

      const result: any = await (supabase as any)
        .from("brand_agent")
        .update(updateData)
        .eq("id", projectId);

      if (result.error) {
        console.error("Failed to update project in database:", result.error);
        // Revert local state on error
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectId
              ? { ...p, settings: { ...p.settings, ...updates } }
              : p
          )
        );
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const createProject = async (name: string) => {
    try {
      setIsLoading(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user logged in");
        return;
      }

      // Create in database
      const { data, error } = await (supabase
        .from("brand_agent")
        .insert([
          {
            user_id: user.id,
            name,
            brand_name: "",
            description: "",
            website: "",
            personality: "normal",
            keywords: "",
            watched_accounts: "",
            auto_post: false,
            whatsapp_drafts: true,
            monitor_reddit: true,
            daily_reply_limit: 30,
            is_active: true,
          },
        ] as any)
        .select()
        .single() as any);

      if (error) {
        console.error("Failed to create project in database:", error);
        return;
      }

      // Create local project object
      const newProject: Project = {
        id: (data as any).id,
        name,
        settings: { ...DEFAULT_SETTINGS },
      };

      setProjects((prev) => [...prev, newProject]);
      setCurrentProjectId(newProject.id);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        currentProjectId,
        currentProject,
        setCurrentProject,
        updateProject,
        createProject,
        isLoading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
};
