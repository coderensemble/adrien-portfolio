"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // évite le mismatch SSR/CSR

  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <footer className="w-full text-center py-6 border-t border-white/20 dark:border-white/10 mt-10 text-sm text-black dark:text-white">
      <p className={`text-sm mb-2 ${textColor}`}>
        Adrien Neyron – 2025 &copy; Tous droits réservés
      </p>
      <p className={`opacity-70 ${textColor}`}>
        Construit avec{" "}
        <span className="font-semibold text-[#61DAFB]">React</span>,{" "}
        <span className="font-semibold text-white dark:text-[#EDDD53]">
          Next.js
        </span>{" "}
        et{" "}
        <span className="font-semibold text-[#57C785]">Three.js</span>
      </p>
    </footer>
  );
}
