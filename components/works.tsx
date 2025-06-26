import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import TextDecrypt from "./textDecrypt/textDecrypt";

import AspiSport from "../public/recentprojects/aspirationSport.png";
import PortFam from "../public/recentprojects/portfam.png";
import Cpaie from "../public/recentprojects/cpaie.png";
import DressMeUp from "../public/recentprojects/dressmeup.png";
import Morning from "../public/recentprojects/morning.png";

interface Project {
  id: number;
  title: string;
  description: string;
  href: string;
  hrefCode?: string;
  alt: string;
  image: StaticImageData;
}

export const Works: React.FC = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "C + Paie",
      description: `Showcase site in React & TailwindCSS to increase the visibility and sales of the company`,
      href: `none`,
      hrefCode: `none`,
      alt: "C + Paie",
      image: Cpaie,
    },
    {
      id: 2,
      title: "Dress Me Up",
      description: `A mobile dressing room to prepare your outfits from wherever you want. Within a team of 3 developers,
              we used the following technologies to create the mobile application:
              React Native, Expo, Node Js, and a Mongo Db database`,
      href: `none`,
      hrefCode: `https://github.com/coderensemble/dressMeUp-backend`,
      alt: "Dress Me Up",
      image: DressMeUp,
    },
    {
      id: 3,
      title: "Morning News",
      description: `A web application with secure authentication
              which allows you to organize a personal playlist from an API.
              User information is stored in database.
              React, Node and mongo DB were the main technologies used.`,
      href: `https://morning-frontend-topaz.vercel.app/`,
      alt: "Morning News",
      image: Morning,
    },
    {
      id: 4,
      title: "Portail Famille",
      description: `Web/mobile application simplifying registrations and tracking
              extracurricular. Developed with React Native, PHP Symfony and a
               Secure SQL database.`,
      href: `none`,
      hrefCode: `https://github.com/coderensemble/Collectivite`,
      alt: "Portail Famille",
      image: PortFam,
    },
    {
      id: 5,
      title: "Aspiration Sport",
      description: `I created Aspiration Sport: an online sports coaching platform,
               combining technical expertise and passion for sport. I used React, node and mongo DB to did it.`,
      href: `none`,
      hrefCode: `none`,
      alt: "Aspiration Sport",
      image: AspiSport,
    },
  ]);

  return (
    <section id="works" className="min-h-screen flex items-center justify-center">
      <div className="w-[100%] mx-auto">
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col md:flex-row gap-8`}>
              {/* Image */}
              <div className="w-full md:w-[50em] max-w-full flex-shrink-0">
                <Image src={project.image} alt={project.alt} className="w-full object-cover rounded-lg shadow-lg" />
              </div>
              {/* Content */}
              <div className="w-full md:w-[50%] flex flex-col items-center justify-center p-6 rounded-xl bg-white/30 backdrop-blur-md shadow-lg border border-white/50">
                <h3 className="text-xl font-semibold mb-2 text-white-800 text-center">
                  <TextDecrypt text={`${project.id}. ${project.title}`} />
                </h3>
                <p className="text-white-700 text-sm mb-4 whitespace-pre-line text-center">{project.description}</p>
                <div className="flex flex-wrap gap-4 mt-auto">
                  {project.href !== "none" && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d8b88d] text-sm hover:underline">
                      See the website
                    </a>
                  )}
                  {project.hrefCode !== "none" && (
                    <a
                      href={project.hrefCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d8b88d] text-sm hover:underline">
                      Explore the code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
