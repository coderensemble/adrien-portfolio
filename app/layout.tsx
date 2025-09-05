import "../Styles/globals.css";
import { Lato, Playfair_Display } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";

const lato = Lato({ subsets: ["latin"], weight: ["400","700"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","700"], variable: "--font-title" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${lato.variable} ${playfair.variable}`}
    suppressHydrationWarning>
      <body className="antialiased relative">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
