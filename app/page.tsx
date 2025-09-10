"use client";

import { useEffect } from "react";

import ContactsAccess from "@/components/ui/Sandwich";
import { SideNavbar } from "@/components/ui/SideNavBar";
import { Header } from "@/components/Header";
import Home from "@/app/home/page";
import ProjectsPage from "@/app/projects/page";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import Footer from "@/components/Footer";
import ThreeScene from "@/components/Background/ThreeScene";
import ThemeToggle from "@/components/theme/ThemeToggle";
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
          <section id="home" className="min-h-screen pt-12 px-6 sm:px-12 lg:px-20 blackdrop-blur-sm">
            {/* contenu */}
            <Home />
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section
            id="works"
            className="min-h-screen pt-12 px-6 sm:px-12 lg:px-20 bg-gradient-to-t from-black via-black/80 to-transparent">
            <ProjectsPage />
          </section>
        </AnimatedSection>

        <section
          id="about"
          className="min-h-screen pt-12 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-black via-black/80 to-transparent">
          <AboutPage />
        </section>

        <section id="contact" className="min-h-screen pt-12 px-6 sm:px-12 lg:px-20">
          <ContactPage />
        </section>
        <ThemeToggle />
      </div>
      <SideNavbar />
      <ContactsAccess />
      <Footer />
    </>
  );
}
