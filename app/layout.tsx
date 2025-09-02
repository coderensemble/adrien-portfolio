// app/layout.tsx ou pages/_app.tsx
import "../Styles/globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Lato, Playfair_Display } from "next/font/google";

const lato = Lato({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-sans"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-title"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="fr" 
      className={`${lato.variable} ${playfair.variable}`} 
      style={{ backgroundColor: "#000" }}
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
