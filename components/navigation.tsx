"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { id: "#home", label: "Home" },
  { id: "#works", label: "Projects" },
  { id: "#about", label: "About" },
  { id: "#contact", label: "Contact" },
];

export const SideNavbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>("#");

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          setActiveNav(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    });

    navItems.forEach(({ id }) => {
      if (id === "#") {
        const homeSection = document.getElementById("home");
        if (homeSection) observer.observe(homeSection);
      } else {
        const section = document.getElementById(id.replace("#", ""));
        if (section) observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="
        fixed
        flex
        flex-row-reverse
        gap-7
        top-[40%]
        left-[2.8rem]
        transform -rotate-90 -translate-x-1/2
      "
    >
      {navItems.map(({ id, label }) => (
        <Link
          key={id}
          href={id}
          passHref
          onClick={() => setActiveNav(id)}
          className={`
      
            no-underline
            ${activeNav === id ? "text-[#EDDD53]" : "text-[#575757]"}
            hover:text-[#EDDD53]
            text-lg
            cursor-pointer
          `}
        >
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
};
