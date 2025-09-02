"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../../public/profile.png";
import sculpture from "../../public/sculpture.png";
import resume from "../../data/resume.json";
import TextDecrypt from "../../components/ui/textDecrypt";

export const About: React.FC = () => {
  const greetings = "Hello there!";
  const aboutme = `I'm ${resume.basics.name}, a creative fullstack developer specializing in React, Next.js and MongoDB. 
  I blend clean code with thoughtful UX/UI design to craft applications that are both functional and visually engaging. 
  Passionate about learning and innovation, I thrive on challenges and love transforming ideas into smooth, interactive digital experiences.`;

  const [hovered, setHovered] = useState(false);

  // Split le texte en phrases pour l’animation
  const sentences = aboutme.split(". ");

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-[90%] max-w-4xl mx-auto bg-white/30 border border-white/50 rounded-3xl shadow-lg flex flex-col items-center overflow-hidden">
        {/* Container animation */}
        <div
          className="relative w-80 h-80 mt-10 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Sculpture avec mouvement */}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 3, -3, 3, -3, 0],
              x: [0, 3, -3, 3, -3, 0],
              y: [0, -3, 3, -3, 3, 0],
              scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Image
              src={sculpture}
              alt="Sculpture"
              className="w-full h-full object-contain rounded-xl shadow-lg border border-white/50"
            />
          </motion.div>

          {/* Profil qui apparaît au hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="profile"
                className="absolute inset-0"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-white/50"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Texte interactif */}
        <div className="flex flex-col text-center px-6 py-10 space-y-4">
          <h2
            className="text-2xl font-semibold text-gray-100"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <TextDecrypt text={greetings} />
          </h2>

          <div className="space-y-3">
            {sentences.map((sentence, index) => (
              <motion.p
                key={index}
                className="text-gray-200 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.6, duration: 0.6 }}
              >
                {/* Mots-clés interactifs */}
                {sentence.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-block cursor-pointer px-0.5 hover:text-cyan-300"
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
