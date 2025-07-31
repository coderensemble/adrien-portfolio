"use client";

import { useEffect } from "react";
import ContactsAccess from "@/components/Sandwich";
import { SideNavbar } from "@/components/SideNavBar";
import { Header } from "@/components/Header";
import { Home } from "@/components/Home/Home";
import { Works } from "@/components/Projects/Projects";
import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";
import Footer from "@/components/Footer";
import { ThreeScene } from "@/components/Background/ThreeScene";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { Resume } from "@/components/Resume/resume";
export default function HomePage() {
  useEffect(() => {
    const progress = document.getElementById("scroll-progress") as HTMLProgressElement;

    const updateProgress = () => {
      const scroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progressValue = (scroll / height) * 100;
      if (progress) progress.value = progressValue;
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <div>
        <ThreeScene />
        <Header />
        <section id="home" className="min-h-screen p-20">
          {/* contenu */}
          <Home />
        </section>

        <section id="works" className="min-h-screen p-20">
          <Works />
        </section>

        <section id="about" className="min-h-screen p-20">
          <About />
        </section>

        <section id="contact" className="min-h-screen p-20">
          <Contact />
        </section>
        <ThemeToggle />
      </div>
      <SideNavbar />
      <ContactsAccess />
      <Resume />
      <Footer />
    </>
  );
}
