"use client";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import type { IconType } from "react-icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = theme === "light";
  const Icon: IconType = hovered ? (isLight ? FiMoon : FiSun) : (isLight ? FiSun : FiMoon);

  return (
    <div className="fixed bottom-[4em] right-[4em] sm:right-[2em] sm:bottom-[2.5em] group">
      <button
        onClick={() => setTheme(isLight ? "dark" : "light")}
        aria-label="Toggle theme"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-12 h-12 flex items-center justify-center border-white/50 rounded-full transition-colors duration-300
          ${isLight ? "bg-white text-[#171717] hover:bg-[#61DAFB]" : "bg-white text-[#171717] hover:bg-[#f6c453]"}`}
      >
        <Icon size={20} className="transition-all duration-300 transform group-hover:rotate-180 drop-shadow-md" />
      </button>
    </div>
  );
}
