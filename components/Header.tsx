"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import resume from "../data/resume.json";
import BackgroundMusic from "./Background/BackgroundMusic";
import { useTheme } from "next-themes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [countClients, setCountClients] = useState<number | null>(null);

  // ✅ Tous les hooks ici, avant le return conditionnel
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const updateOnScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = `${progress}%`;
      setIsScrolled(scrollTop > 10);
    };
    window.addEventListener("scroll", updateOnScroll);
    return () => window.removeEventListener("scroll", updateOnScroll);
  }, []);

  useEffect(() => {
    async function fetchCount() {
      const res = await fetch("/api/visitors");
      const data = await res.json();
      if (data.count !== undefined) setCountClients(data.count);
    }
    fetchCount();
  }, []);

  useEffect(() => {
    if (countClients === null) return;

    const localStorageKey = "portfolio_visitor_counted";

    if (!localStorage.getItem(localStorageKey)) {
      localStorage.setItem(localStorageKey, "true");

      const increment = async () => {
        const res = await fetch("/api/visitors", { method: "POST" });
        const data = await res.json();
        if (data.count !== undefined) setCountClients(data.count);
      };

      increment();
    }
  }, [countClients]);

  // ✅ ici seulement le return
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <header
      id="header"
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? `bg-black/20 backdrop-blur-sm` : "bg-transparent"
      }`}>
      <div className="flex flex-col sm:flex-row justify-between items-center px-[2.5em] py-3 text-white text-sm gap-1 sm:gap-0">
        {/* Title */}
        <div className="flex flex-col items-center sm:items-start">
          <Link href="/" className={`font-semibold ${isDark ? "hover:text-[#61DAFB]" : "hover:text-[#f6c453]"}`}>
            {resume.basics.name}
          </Link>
          <span className="opacity-70">{resume.basics.label}</span>
        </div>

        <BackgroundMusic />

        {/* Navigation */}
        <nav id="main-menu" role="navigation" className="flex gap-4 mt-1 sm:mt-0">
          <div className="relative group">
            <Link
              href="/admin"
              className={`line-through hover:no-underline ${isDark ? "hover:text-[#61DAFB]" : "hover:text-[#f6c453]"}`}>
              Admin
            </Link>
            <div className="fixed left-1/2 w-80 rounded-2xl text-white text-sm hidden group-hover:block text-center z-[70] p-3 top-2">
              {countClients !== null
                ? `Already ${countClients} visitors curious about my projects 🥾`
                : "Chargement..."}
            </div>
          </div>
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-[2px] bg-transparent">
          <div
            id="scroll-progress"
            className={`h-full w-0 transition-all duration-200 ${isDark ? "bg-[#57C785]" : "bg-[#FF6B2D]"}`}
          />
        </div>
      </div>
    </header>
  );
};
