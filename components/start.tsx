"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import TextDecrypt from "./TextDecrypt/textDecrypt";
import resume from "../data/resume.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Content() {
  const [countClients, setCountClients] = useState<number | null>(null);

  // Charger le compteur au chargement du composant
  useEffect(() => {
    async function fetchCount() {
      const { data, error } = await supabase.from("visitor_count").select("count").eq("id", 1).single();

      if (error) {
        console.error("Erreur fetchCount:", error.message, error.details);
        return;
      }
      setCountClients(data.count);
    }
    fetchCount();
  }, []);

  // Incrémente le compteur seulement si ce visiteur n'a pas encore été comptabilisé (localStorage)
  useEffect(() => {
    if (countClients === null) return;

    // Clé pour marquer qu'on a déjà incrémenté ce visiteur
    const localStorageKey = "portfolio_visitor_counted";

    if (!localStorage.getItem(localStorageKey)) {
      // Marque le visiteur comme comptabilisé
      localStorage.setItem(localStorageKey, "true");

      // Update compteur côté client et serveur
      const incrementCount = async () => {
        const newCount = countClients + 1;
        setCountClients(newCount);

        const { error } = await supabase.from("visitor_count").update({ count: newCount }).eq("id", 1);

        if (error) {
          console.error("Erreur incrementCount:", error.message, error.details);
        }
      };

      incrementCount();
    }
  }, [countClients]);

  return (
    <div className="min-h-screen flex justify-center flex-col md:ml-30" style={{ fontFamily: "var(--font-mono)" }}>
       <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
        <TextDecrypt text={resume.basics.label} />
      </h1>

      <h2 className="text-2xl md:text-3xl mb-4">
        <TextDecrypt text={resume.basics.job1} />
      </h2>

      <h2 className="text-2xl md:text-3xl text-gray-600 mb-4 w-2/3 max-w-screen-md">
        {resume.basics.name}{resume.basics.job2}
      </h2>

      <p className="text-lg text-gray-600 mb-4">
        {countClients !== null ? `${countClients} visiteurs` : "Chargement..."}
      </p>
    </div>
  );
}
