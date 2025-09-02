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
    <div className="group relative rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition transform hover:scale-95 overflow-hidden">
      <div className="relative w-full h-56 hover:overflow-hidden">
      <Image
        src={imageSrc}
        alt={project.title || "Project image"}
        width={400}
        height={250}
        className="object-cover rounded-xl mb-4 transition-transform duration-500 group-hover:scale-110"
      />
      </div>

      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-gray-600">{project.role}</p>
      <p className="text-sm text-gray-500">{project.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="bg-gray-100 text-xs px-2 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

{/* Overlay au hover */}
        <div className="absolute inset-0 bg-black/80 text-white px-6 py-5 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h1 className="text-xl font-bold">{project.title}</h1>
          <h3 className="text-md text-[#57C785]">{project.role}</h3>
          <p className="text-sm text-gray-200 text-center line-clamp-4">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="bg-white/30 text-white text-xs px-2.5 py-1 rounded-full border border-white/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Boutons */}
          <div className="mt-3 flex flex-wrap gap-4">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg shadow transition text-sm font-medium border border-[#57C785] text-[#57C785] hover:bg-[#57C785] hover:text-white"
              >
                <Github size={18} />
                Code
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#57C785] text-white px-4 py-2 rounded-lg shadow hover:bg-[#57C785] transition text-sm font-medium group"
              >
                <span className="absolute top-0 left-0 h-full scroll-text-container w-10">
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
