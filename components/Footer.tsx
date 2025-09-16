"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // évite le mismatch SSR/CSR

  const textColor = "text-white";

  return (
    <footer className="w-full text-center py-6 border-t border-white/20 border-white/10 mt-10 text-sm text-white">
      <p className={`text-sm mb-2 ${textColor}`}>
        Adrien Neyron – 2025 &copy; Tous droits réservés
      </p>
      <p className={`opacity-70 ${textColor}`}>
        Construit avec{" "}
        <span className="font-semibold text-[#FF6B2D]">React</span>,{" "}
        <span className="font-semibold text-[#f6c453]">
          Next.js
        </span>,{" "}
        <span className="font-semibold text-[#61DAFB]">
          TypeScript
        </span>{" "}
        et{" "}
        <span className="font-semibold text-[#57C785]">Three.js</span>
      </p>
    </footer>
  );
}
