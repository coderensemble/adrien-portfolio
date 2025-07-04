import { useState } from "react";
import { Plus } from "lucide-react"; // ou autre icône + que tu utilises
import Resume from "../data/resume.json";
import { IconType } from 'react-icons';
import { FaTelegramPlane, FaLinkedinIn, FaGithub } from 'react-icons/fa';


const iconMap: Record<'Email' | 'LinkedIn' | 'GitHub', IconType> = {
  Email: FaTelegramPlane,
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
};

export default function ContactsAccess() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-12 right-0 z-50 flex flex-col items-end">
      {/* Bouton + visible uniquement sur petits écrans */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-white/18 text-white rounded-full shadow-lg hover:bg-[#d8b88d] hover:text-white md:hidden flex items-center justify-center transition-transform duration-300 focus:outline-none"
        aria-label="Afficher contacts"
      >
        <Plus className={`w-6 h-6 transition-transform ${open ? "rotate-45" : "rotate-0"}`} />
      </button>

      {/* Conteneur des icônes */}
      <div
        className={`
          mt-2 flex flex-col items-end space-y-4 pr-12
          transition-all duration-300
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
          md:opacity-100 md:translate-y-0 md:pointer-events-auto
        `}
      >
        
        {Resume.basics.profiles.map((profile) => {
           const network = profile.network as 'Email' | 'LinkedIn' | 'GitHub';
          if (!(network in iconMap)) return null;
          const IconComponent = iconMap[network];
          return (
            <a
              key={profile.network}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-[#d8b88d] transition-colors flex items-center"
              title={profile.network}
            >
              <IconComponent />
            </a>
          );
        })}
      </div>
    </div>
  );
}