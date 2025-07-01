import React from "react";
import Image from "next/image";
import profile from "../../public/profile.png";
import resume from "../../data/resume.json";
import TextDecrypt from "../TextDecrypt/textDecrypt";

export const About: React.FC = () => {
  const greetings = "Hello there!";
  const aboutme = `I'm ${resume.basics.name}, a fullstack developer. I'm always down for something new and challenging! I'm here to help you create beautifully formatted application. My projects mostly includes web and mobile development.`;

  return (
    <section id="about" className="min-h-screen flex items-center justify-center">
      <div className="w-[60%] mx-auto bg-white border rounded-3xl shadow-lg flex flex-col ">
        <div className="flex justify-center">
          <Image src={profile} alt="Profile" className="w-[60%] mt-10  rounded-xl shadow-lg border border-white/50 " />
        </div>
        <div className="_content_wrapper flex flex-col text-center m-10">
          <h2 className="text-2xl font-semibold">
            <TextDecrypt className="text-black" text={greetings} />
          </h2>
          <p className="text-black">{aboutme}</p>
        </div>
      </div>
    </section>
  );
};
