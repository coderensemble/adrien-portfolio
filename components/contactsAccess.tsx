import { useState } from "react";
import { Plus } from 'lucide-react';
import Resume from "../data/resume.json";

export default function ContactsAccess() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-50" onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button
        className="w-12 h-12 bg-white/20 text-white p-4 rounded-full shadow-lg hover:[#d8b88d] hover:bg-[#d8b88d] hover:setOpen transition hover:rotate-45 focus:outline-none flex items-center justify-center"
      >
                <Plus className="w-6 h-6 text-white transition-transform duration-300 " />

      </button>

      {/* Actions */}
      <div
        className={`flex flex-col items-end space-y-2 mt-2 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {Resume.basics.profiles.map((action) => (
          <a
            key={action.network}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <i className={`${action.x_icon} mr-2`}></i>
            <span className="text-sm">{action.network}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
