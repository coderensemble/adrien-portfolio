"use client";

import ContactsAccess from "@/components/Sandwich";
import { SideNavbar } from "@/components/navigation";
import Start from "@/components/start";
import { Works } from "@/components/works";
import { About } from "@/components/About/About";
import { Contact } from "@/components/ContactMe";
import Footer from "@/components/Footer";
import { ThreeScene } from "@/components/Background/ThreeScene";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { Resume } from "@/components/Resume/resume";
export default function HomePage() {
  return (
    <>
      <div>
        <ThreeScene />
        <section id="home" className="min-h-screen p-20">
          {/* contenu */}
          <Start />
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
