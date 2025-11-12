"use client";

import Image from "next/image";
import { Project } from "../models/projects";
import { Github } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  const imageSrc =
    project.image && project.image.trim() !== ""
      ? project.image
      : "/project-portfolio.png";

  return (
    <div className="group relative rounded-2xl shadow-md bg-white hover:shadow-lg transition transform hover:scale-[0.98] overflow-hidden">
      {/* Image container */}
      <div className="w-full overflow-hidden rounded-xl bg-gray-100">
  <Image
    src={imageSrc}
    alt={project.title || "Project image"}
    width={800}
    height={600}
    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
    sizes="100vw"
  />
</div>

      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-black/80 text-white px-6 py-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h1 className="text-xl md:text-4xl font-bold text-center">{project.title}</h1>
        <h3 className="text-lg md:text-2xl font-semibold text-[#57C785]">{project.role}</h3>
        <p className="text-md md:text-md text-gray-200 text-center line-clamp-4">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="bg-white/30 text-white text-[10px] md:text-xs px-2.5 py-1 rounded-full border border-white/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Boutons */}
        <div className="mt-3 flex flex-wrap gap-4 justify-center">
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg shadow transition text-xs md:text-sm font-medium border border-[#57C785] text-[#57C785] hover:bg-[#57C785] hover:text-white"
            >
              <Github size={16} className="md:w-5 md:h-5" />
              Code
            </a>
          )}
          {project.link && (
    
            <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 bg-[#57C785] text-white px-3 md:px-4 py-2 rounded-lg shadow hover:bg-[#4ab173] transition text-xs md:text-sm font-medium overflow-hidden">
            <span className="absolute top-0 left-0 h-full w-10 flex items-center scroll-text-container overflow-hidden">
              <span className="scroll-text">
                Live&nbsp;&nbsp;&nbsp;Live&nbsp;&nbsp;&nbsp;Live&nbsp;&nbsp;&nbsp;Live
              </span>
            </span>
          </a>
          )}
        </div>
      </div>
    </div>
  );
}
