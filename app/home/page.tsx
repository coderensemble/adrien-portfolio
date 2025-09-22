"use client";

import TextDecrypt from "../../components/ui/textDecrypt";
import resume from "../../data/resume.json";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-between items-stretch mt-20 px-4 sm:px-6 lg:px-12">
      {/* Colonne gauche */}
      <div className="flex-[2] flex flex-col justify-start items-start">
        <h1 className="flex flex-col text-left leading-none gap-2 sm:gap-3">
          {/* Ligne 1 */}
            <span className="text-lg sm:text-2xl lg:text-3xl font-medium text-accent">Athlete&apos;s</span>

          {/* Ligne 2 : MINDSET + & */}
          <span className="flex items-center flex-wrap">
            <span className="text-4xl sm:text-6xl lg:text-8xl font-bold text-black dark:text-white">
              <TextDecrypt text="MINDSET" />
            </span>
            <span className="text-3xl sm:text-5xl lg:text-7xl font-medium text-accent relative lg:top-3 -left-1 sm:-left-2 lg:-left-3 rotate-0 sm:rotate-[15deg]">
              &amp;
            </span>
          </span>

          {/* Ligne 3 : DEVELOPER + 's skills' */}
          <span className="flex items-center flex-wrap">
              <span className="text-4xl sm:text-6xl lg:text-8xl font-bold text-black dark:text-white">
                <TextDecrypt text="DEVELOPER" />
              </span>
            <span className="text-base sm:text-xl lg:text-2xl font-medium text-accent relative lg:top-3 -left-1 sm:-left-2 lg:-left-3">
              &apos;s skills
            </span>
          </span>
        </h1>
      </div>

      {/* Colonne droite */}
      <div className="flex-1 flex flex-col justify-center mt-10 md:translate-y-0">
        {/* Titre principal */}
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-accent mb-2">
          {resume.basics.job1}
        </div>

        {/* Sous-titre */}
        <div className="text-lg sm:text-2xl lg:text-3xl mb-6 text-black dark:text-white">{resume.basics.job2}</div>

        {/* Boutons */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="relative overflow-hidden px-6 py-3 rounded-2xl font-semibold shadow-md button-accent text-white group">
            <span className="absolute top-0 left-0 h-full flex items-center scroll-text-container w-28">
              <span className="scroll-text">
                See my projects&nbsp;&nbsp;&nbsp;See my projects&nbsp;&nbsp;&nbsp;See my projects&nbsp;&nbsp;&nbsp;See
                my projects
              </span>
            </span>
          </a>

          <a
            href="#contact"
            className="button-empty hover:button-empty hover:text-white px-6 py-3 rounded-2xl font-semibold transition">
            Contact me
          </a>
        </div>
      </div>
    </div>
  );
}
