"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import resume from "../data/resume.json";
import BackgroundMusic from "./background/BackgroundMusic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [countClients, setCountClients] = useState<number | null>(null);

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

  // Fetch compteur visiteurs
  useEffect(() => {
    async function fetchCount() {
      const { data, error } = await supabase.from("visitor_count").select("count").eq("id", 1).single();

      if (error) {
        console.error("Erreur fetchCount:", error.message, error.details);
        return;
      }
      setCountClients(data.count);
    }
    fetchCount();
  }, []);

  // Incrémente le compteur seulement si ce visiteur n'a pas encore été comptabilisé (localStorage)
  useEffect(() => {
    if (countClients === null) return;

    // Clé pour marquer qu'on a déjà incrémenté ce visiteur
    const localStorageKey = "portfolio_visitor_counted";

    if (!localStorage.getItem(localStorageKey)) {
      // Marque le visiteur comme comptabilisé
      localStorage.setItem(localStorageKey, "true");

      // Update compteur côté client et serveur
      const incrementCount = async () => {
        const newCount = countClients + 1;
        setCountClients(newCount);

        const { error } = await supabase.from("visitor_count").update({ count: newCount }).eq("id", 1);

        if (error) {
          console.error("Erreur incrementCount:", error.message, error.details);
        }
      };

      incrementCount();
    }
  }, [countClients]);

  return (
    <header
      id="header"
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/10 backdrop-blur-sm" : "bg-transparent"
      }`}>
      <div className="flex flex-col sm:flex-row justify-between items-center px-[2.5em] py-3 text-white text-sm gap-1 sm:gap-0">
        {/* Title */}
        <div className="flex flex-col items-center sm:items-start">
          <Link href="/" className="font-semibold">
            {resume.basics.name}
          </Link>
          <span className="opacity-70">{resume.basics.label}</span>
        </div>
        <BackgroundMusic />
        {/* Navigation */}
        <nav id="main-menu" role="navigation" className="flex gap-4 mt-1 sm:mt-0">
          <div className="relative group">
            <Link href="/admin" className="line-through hover:no-underline hover:text-[#EDDD53]">
              Admin
            </Link>

            {/* Tooltip/Modal au survol */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl bg-black text-white text-sm p-3 shadow-lg hidden group-hover:block text-center">
              {countClients !== null
                ? `Already ${countClients} visitors curious about my projects 🚀`
                : "Chargement..."}
            </div>
          </div>
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-[2px] bg-transparent">
          <div id="scroll-progress" className="h-full bg-white w-0 transition-all duration-200" />
        </div>
      </div>
    </header>
  );
};
