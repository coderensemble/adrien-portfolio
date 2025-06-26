"use client";

import ContactsAccess from "@/components/contactsAccess";
import { SideNavbar } from "@/components/navigation";
import Start from "@/components/start";
import { Works } from "@/components/works";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ThreeScene } from "@/components/background/ThreeScene";
export default function HomePage() {
  return (
    <>
      <div>
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
      </div>
      <SideNavbar />
      <ContactsAccess />
      <ThreeScene />
    </>
  );
}
