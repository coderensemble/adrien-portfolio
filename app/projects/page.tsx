"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/models/projects";
import { useTheme } from "next-themes";


export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // 👈 dépendances vides, donc normalement pas de boucle infinie

  if (loading) return <p className="px-6 text-lg sm:text-2xl lg:text-3xl ">Loading projects...</p>;
  if (!projects.length) return <p className="px-6 text-lg sm:text-2xl lg:text-3xl ">No projects found.</p>;

  return (
    <div className="flex flex-col">
        <span className=" px-4 sm:px-6 lg:px-12 text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-8 pt-2 animate-fade-in" >
      SOME PROJECTS...
      </span>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const image =
          theme === "dark"
            ? project.image?.dark || "/projectsoon.png"
            : project.image?.light || "/projectsoon.png";

        return (
          <ProjectCard
            key={project._id}
            project={{
              ...project,
              imageUrl: image, // 👈 on injecte l’image du thème actif
            }}
          />
        );
      })}
      </section>
    </div>
  );
}
