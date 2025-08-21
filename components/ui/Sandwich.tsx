import { useState, useContext, useEffect } from "react";
import { Plus } from "lucide-react";
import Resume from "../../data/resume.json";
import { IconType } from "react-icons";
import { FaTelegramPlane, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ThemeContext } from "../../theme/ThemeProvider";

const iconMap: Record<"Email" | "LinkedIn" | "GitHub", IconType> = {
  Email: FaTelegramPlane,
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
};

export default function ContactsAccess() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 💥 Empêcher le rendu tant que le client n'est pas monté
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed top-[6em] right-[4em] sm:top-[3.5em] sm:right-[2.5em] flex flex-col items-end">
      <button
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 rounded-full shadow-lg md:hidden flex items-center justify-center transition-transform duration-300 focus:outline-none
          ${isDark ? "bg-[#61DAFB] text-black" : "bg-white/18 text-white hover:bg-[#EDDD53]"}
        `}
        aria-label="Afficher contacts">
        <Plus className={`w-6 h-6 transition-transform ${open ? "rotate-45" : "rotate-0"}`} />
      </button>

      <div
        className={`
         flex flex-col items-end space-y-4 mt-4
         transition-all duration-300
         ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
         md:opacity-100 md:pointer-events-auto
        `}>
        {Resume.basics.profiles.map((profile) => {
          const network = profile.network as keyof typeof iconMap;
          if (!(network in iconMap)) return null;
          const IconComponent = iconMap[network];
          return (
            <a
              key={profile.network}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl transition-colors flex items-center ${
                isDark
                  ? "text-white hover:text-[#EDDD53]"
                  : "text-[#575757] hover:text-[#61DAFB]"
              }`}
              title={profile.network}>
              <IconComponent />
            </a>
          );
        })}
      </div>
    </div>
  );
}
