"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import resume from "../data/resume.json";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateOnScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = `${progress}%`;

      // Met à jour le flou et le fond selon le scroll
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", updateOnScroll);
    return () => window.removeEventListener("scroll", updateOnScroll);
  }, []);

  return (
    <header
      id="header"
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/40 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center px-[2.5em] py-3 text-white text-sm gap-1 sm:gap-0">
        {/* Title */}
        <div className="flex flex-col items-center sm:items-start">
          <Link href="/" className="font-semibold">
            {resume.basics.name}
          </Link>
          <span className="opacity-70">{resume.basics.label}</span>
        </div>

        {/* Navigation */}
        <nav id="main-menu" role="navigation" className="flex gap-4 mt-1 sm:mt-0">
          <Link href="/dashboard" className="hover:underline">
            Tableau de bord
          </Link>
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-[2px] bg-transparent">
          <div
            id="scroll-progress"
            className="h-full bg-white w-0 transition-all duration-200"
          />
        </div>
      </div>
    </header>
  );
};
