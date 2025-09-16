"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Fond neutre pour SSR (aucune image)
  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen z-[-10] " />
    );
  }

  const bgImage = theme === "dark" ? "/bivouac.png" : "/bivouac-light.png";
  const brightness = theme === "dark" ? "60" : "90";
  const blur = theme === "dark" ? "3px" : "2px";
  const opacity = theme === "dark" ? 0.2 : 0.1;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen z-[-10] bg-cover bg-center bg-fixed pointer-events-none transition-all duration-500"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: `brightness(${brightness}%) blur(${blur})`,
          opacity,
        }}
      />
      <div
        className="fixed top-0 left-0 w-screen h-screen z-[-9] bg-cover bg-center bg-fixed pointer-events-none transition-all duration-500 animate-[bgMove_20s_ease-in-out_infinite]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    </>
  );
}
