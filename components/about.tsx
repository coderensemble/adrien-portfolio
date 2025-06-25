import React from 'react';
import Image from 'next/image';
import profile from '../public/profile.png';
import resume from "../data/resume.json";
import TextDecrypt from "./textDecrypt";

export const About: React.FC = () => {
    const greetings = "Hello there!";
    const aboutme = `I'm ${resume.basics.name}, a fullstack developer. I'm always down for something new and challenging!
                                    I'm here to help you create beautifully formatted application. 
                                    My projects mostly includes web and mobile development.`;

    return (
        <section id="about" className="mt-12 mb-auto max-w-screen-md mx-auto px-4">
      <div className="about flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          className="_img w-48 h-48 rounded-lg shadow-lg flex-shrink-0"
          src={profile}
          alt="Profile"
        />
        <div className="_content_wrapper flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">
            <TextDecrypt text={greetings} />
          </h2>
          <p className="aboutme text-base leading-relaxed whitespace-pre-line">
            {aboutme}
          </p>
        </div>
      </div>
    </section>
    );
}