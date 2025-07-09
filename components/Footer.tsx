import { useContext } from "react";
import useIsMounted from "@/hooks/useIsMounted";
import { ThemeContext } from "@/theme/ThemeProvider";

export default function Footer() {
  const mounted = useIsMounted();
  const { theme } = useContext(ThemeContext);

  if (!mounted) return null;

  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <footer className="w-full text-center py-6 border-t border-white/20 dark:border-white/10 mt-10 text-sm text-black dark:text-white">
      <p className={`text-sm mb-2 ${textColor}`}>Adrien Neyron – 2025 &copy; Tous droits réservés</p>
      <p className={`opacity-70 ${textColor}`}>
        Construit avec <span className="font-semibold text-[#61DAFB]">React</span>,{" "}
        <span className="font-semibold text-white dark:text-[#EDDD53]">Next.js</span> et{" "}
        <span className="font-semibold text-[#57C785]">Three.js</span>
      </p>
    </footer>
  );
}
