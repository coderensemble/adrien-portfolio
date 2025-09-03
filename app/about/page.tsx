"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../../public/profile.png";
import sculpture from "../../public/sculpture.png";
import resume from "../../data/resume.json";
import TextDecrypt from "../../components/ui/textDecrypt";

export const About: React.FC = () => {
  const greetings = "HELLO. I'M ADRIEN, WELCOME THERE!";
  const aboutme = `I'm ${resume.basics.name}, a creative fullstack developer specializing in Javascript with frameworks like React, Vue, Next.js and Node.js. I usually code in Typescript. My passion for coding drives me to create innovative solutions that solve problems. With a strong background in business and a knack for problem-solving, I bring a unique perspective to every project. 
  I blend clean code with thoughtful UX/UI design to craft applications that are both functional and visually engaging. Tailwind CSS, Bootstrap is my go-to for creating responsive and visually stunning interfaces. I also discover Three.js, framer-motion and React Three Fiber to bring my designs to life.
  Passionate about learning and innovation, I thrive on challenges and love transforming ideas into smooth, interactive digital experiences.`;

  const [hovered, setHovered] = useState(false);

  // Split le texte en phrases pour l’animation
  const sentences = aboutme.split(". ");

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 "
    >
      <div className="w-[90%] max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Image / sculpture interactive */}
        <div
          className="relative w-72 h-72 md:w-96 md:h-96 m-6 cursor-pointer flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Sculpture avec mouvement */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 2, -2, 2, -2, 0],
              x: [0, 2, -2, 2, -2, 0],
              y: [0, -2, 2, -2, 2, 0],
              scale: [1, 1.01, 0.99, 1, 1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <motion.h2
              className="absolute text-xl md:text-2xl font-bold text-gray-300/80 tracking-wider select-none pointer-events-none"
              animate={{ y: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            ><span className="text-[#eddd53] text-8xl">?</span>
              
            </motion.h2>

            <Image
              src={sculpture}
              alt="Sculpture"
              className="w-full h-full object-contain rounded-xl shadow-lg border border-white/30"
            />
          </motion.div>

          {/* Profil qui apparaît au hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="profile"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Image
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl shadow-xl border border-white/40"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Texte interactif */}
        <div className="flex-1 flex flex-col text-center md:text-left px-6 py-12 md:py-16 space-y-6">
          <h2
            className="text-2xl md:text-3xl font-semibold text-[#57C785]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <TextDecrypt text={greetings} />
          </h2>

          <div className="space-y-3 text-gray-200 text-sm md:text-base">
            {sentences.map((sentence, index) => (
              <motion.p
                key={index}
                className="leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.5, duration: 0.6 }}
              >
                {sentence.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, color: "#eddd53" }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-block cursor-pointer px-0.5"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
