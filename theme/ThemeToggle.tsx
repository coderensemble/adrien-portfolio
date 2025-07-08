import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";
import type { IconType } from "react-icons";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as {
    theme: "light" | "dark";
    toggleTheme: () => void;
  };

  const [mounted, setMounted] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-10 h-10 rounded-full bg-gray-300"
        disabled
      />
    );
  }

  const isLight = theme === "light";

  // Déterminer l'icône à afficher
  const Icon: IconType = hovered
    ? isLight
      ? FiMoon
      : FiSun
    : isLight
    ? FiSun
    : FiMoon;

  return (
    <div className="fixed bottom-[4em] right-[4em] sm:right-[2.0em] sm:bottom-[2.5em] sm:right-[2.0em] group">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-12 h-12 flex items-center justify-center border-white/50 rounded-full transition-colors duration-300 bg-white text-[#171717] ${
      isLight
        ? "hover:bg-[#2A7B9B]"
        : "hover:bg-[#EDDD53]"
    }
           
        `}
      >
        <Icon
          size={20}
          className="transition-all duration-300 transform group-hover:rotate-180 drop-shadow-md"
        />
      </button>
    </div>
  );
};
