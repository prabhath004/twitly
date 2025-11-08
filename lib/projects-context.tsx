"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: ProjectSettings = {
  brandName: "AcmeCRM",
  description: "AI-powered CRM for startups",
  website: "https://acmecrm.com",
  persona: "smart",
  keywords: "CRM, automation, startups",
  watchedAccounts: "@founder, @competitor",
  autoPost: false,
  whatsappDrafts: true,
  monitorReddit: true,
  dailyLimit: 30,
};

const DEFAULT_PROJECT: Project = {
  id: "default",
  name: "Default Project",
  settings: DEFAULT_SETTINGS,
};

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([DEFAULT_PROJECT]);
  const [currentProjectId, setCurrentProjectId] = useState("default");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("brandpilot-projects");
    const savedCurrentId = localStorage.getItem("brandpilot-current-project");

    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    }

    if (savedCurrentId) {
      setCurrentProjectId(savedCurrentId);
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("brandpilot-projects", JSON.stringify(projects));
    }
  }, [projects, isLoaded]);

  // Save current project ID
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("brandpilot-current-project", currentProjectId);
    }
  }, [currentProjectId, isLoaded]);

  const currentProject = projects.find((p) => p.id === currentProjectId);

  const setCurrentProject = (projectId: string) => {
    const exists = projects.find((p) => p.id === projectId);
    if (exists) {
      setCurrentProjectId(projectId);
    }
  };

  const updateProject = (projectId: string, updates: Partial<ProjectSettings>) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, settings: { ...p.settings, ...updates } }
          : p
      )
    );
  };

  const createProject = (name: string) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      settings: { ...DEFAULT_SETTINGS },
    };
    setProjects((prev) => [...prev, newProject]);
    setCurrentProjectId(newProject.id);
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
