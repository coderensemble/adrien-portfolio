"use client";

import { useEffect, ElementType } from "react";
import { useDencrypt } from "use-dencrypt-effect";

const decryptOptions = {
  chars: "-./*!?#%&@$€()[]{}<>~0123456789abcdefghijklmnopqrstuvwxyz",
  interval: 50,
};

interface TextDecryptProps {
  text: string;
  as?: ElementType;
  className?: string;
}

export default function TextDecrypt({ text, className }: TextDecryptProps) {
  const [result, dencrypt] = useDencrypt(decryptOptions); // Passe les options ICI

  useEffect(() => {
    dencrypt(text); //  Un seul argument ici → uniquement le texte à décrypter
  }, [text, dencrypt]);


  return (
<div className={`${className} relative inline-block h-32 overflow-hidden`}>
      {/* Texte animé */}
      <span className="absolute left-0 top-0 ">{result}&nbsp;</span>
      {/* Gabarit invisible qui fixe la largeur */}
      <span className="invisible">{text}&nbsp;</span>
    </div>
  );
}
