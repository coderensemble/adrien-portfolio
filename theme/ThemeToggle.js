import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-6 sm:right-6 z-50 group">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white text-white rounded-full hover:bg-[#575757] hover:text-black transition-colors"
      >
        {theme === "light" ? (
          <i className="fas fa-moon text-base" />
        ) : (
          <i className="fas fa-sun text-base" />
        )}
      </button>

      {/* Tooltip visible au hover */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {theme === "light" ? "Mode sombre" : "Mode clair"}
      </div>
    </div>
  );
};
