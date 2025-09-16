"use client";

import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/theme/ThemeToggle";


export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
  <div className="">
    <ThemeToggle />
    {children}
  </div>
</ThemeProvider>

  );
}
