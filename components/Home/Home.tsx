"use client";

import TextDecrypt from "../ui/textDecrypt";
import resume from "../../data/resume.json";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-between items-stretch mt-20 px-3 ">

       {/* Colonne gauche */}
      <div className="flex-1 flex items-start">
        <div className="text-4xl sm:text-5xl font-bold leading-tight text-[#57C785]">
          {resume.basics.job1}
        </div>
      </div>

{/* Colonne droite */}
      <div className="flex-1 flex flex-col justify-end items-end mb-80 mr-0">
        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl md:w-2/3 font-bold mb-6 leading-tight text-[#57C785]">
          <TextDecrypt text={resume.basics.job1} />
        </h1>

        {/* Sous-titre 1 */}
        <h2 className="text-2xl md:text-3xl w-full md:w-2/3 mb-6 text-white">{resume.basics.job2}</h2>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="relative overflow-hidden px-6 py-3 rounded-2xl font-semibold shadow-md bg-[#57C785] text-white group">
            {/* Texte défilant */}
            <span className="absolute top-0 left-0 h-full flex items-center scroll-text-container w-28">
              <span className="scroll-text">See my projects See my projects See my projects See my projects</span>
            </span>
          </a>

          <a
            href="#contact"
            className="border border-[#57C785] text-[#57C785] hover:bg-[#57C785] hover:text-white px-6 py-3 rounded-2xl font-semibold transition w-35">
            Contact me
          </a>
        </div>
      </div>
     
    </div>
  );
};
