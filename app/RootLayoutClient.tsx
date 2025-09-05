"use client";

import { ThemeProvider } from "next-themes";
import ThemeToggle from "../components/theme/ThemeToggle";
import Background from "../components/background/Background";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class"
          defaultTheme="light"
          enableSystem={false}
          >
      <Background />
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}
