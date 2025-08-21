"use client";

import { useEffect } from "react";
import ContactsAccess from "@/components/ui/Sandwich";
import { SideNavbar } from "@/components/ui/SideNavBar";
import { Header } from "@/components/Header";
import { Home } from "@/components/home/Home";
import { Works } from "@/components/projects/Projects";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import { ThreeScene } from "@/components/background/ThreeScene";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { Resume } from "@/components/resume/resume";
import { AnimatedSection } from "@/components/ui/animatedSection";
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
        <AnimatedSection>
          <section id="home" className="min-h-screen p-20 blackdrop-blur-sm">
          {/* contenu */}
          <Home />
          </section>
        </AnimatedSection>
<AnimatedSection>
        <section id="works" className="min-h-screen p-20 bg-gradient-to-t from-black via-black/80 to-transparent">
          <Works />
        </section>
        </AnimatedSection>

        <section id="about" className="min-h-screen p-20 bg-gradient-to-b from-black via-black/80 to-transparent">
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
