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

export default function TextDecrypt({ text, as = "span", className }: TextDecryptProps) {
  const [result, dencrypt] = useDencrypt(decryptOptions); // Passe les options ICI

  useEffect(() => {
    dencrypt(text); //  Un seul argument ici → uniquement le texte à décrypter
  }, [text, dencrypt]);

  const Component: ElementType = as;

  return <Component className={className}>{result}&nbsp;</Component>;
}
