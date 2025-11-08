"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/lib/projects-context";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "./button";
import { SummarizedText } from "@/components/summarized-text";

export const ProjectSelector = () => {
  const router = useRouter();
  const { projects, currentProject, setCurrentProject } = useProjects();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewProject = () => {
    setIsOpen(false);
    router.push("/onboarding");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 transition-colors font-mono text-sm"
      >
        <span className="truncate max-w-[120px]">
          {currentProject?.name ? (
            <SummarizedText text={currentProject.name} maxLength={15} />
          ) : (
            "Select Project"
          )}
        </span>
        <ChevronDown className="h-4 w-4 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
          <div className="p-2 max-h-64 overflow-y-auto">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setCurrentProject(project.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                  currentProject?.id === project.id
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : "hover:bg-neutral-100 text-neutral-700"
                }`}
              >
                <SummarizedText text={project.name} maxLength={40} />
              </button>
            ))}
          </div>

          <div className="border-t border-neutral-200 p-2">
            <button
              onClick={handleNewProject}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
