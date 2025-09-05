"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Example = {
  language: string;
  title: string;
  code: string;
  result: string;
  extra?: string; // Pour info supplémentaire (ex: portabilité)
};

const examples: Example[] = [
  {
    language: "asm",
    title: "Assembleur x86",
    code: `section .data
num1 dw 5
num2 dw 7

section .text
global _start

_start:
mov ax, [num1]
add ax, [num2]   ; AX = 12
mov eax, 1
int 0x80`,
    result: "AX = 12 (simulation)",
    extra: "Le code assembleur est spécifique à x86, ne peut pas s'exécuter directement sur d'autres machines.",
  },
  {
    language: "c",
    title: "C (compilé)",
    code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = 7;
    printf("%d\\n", a + b);
    return 0;
}`,
    result: "12 (résultat attendu après compilation et exécution sur CPU)",
    extra:
      "Le code C est compilé directement en instructions CPU. Il est spécifique à l'OS et au processeur. Pas portable sans recompilation.",
  },
  {
    language: "python",
    title: "Python",
    code: `def addition(a, b):
    return a + b

print(addition(5, 7))`,
    result: `${5 + 7}`,
  },
  {
    language: "javascript",
    title: "JavaScript",
    code: `function add(a, b) {
  return a + b;
}

console.log(add(5, 7));`,
    result: `${5 + 7}`,
  },
  {
    language: "java",
    title: "Java",
    code: `public class Main {
  public static void main(String[] args) {
    int a = 5;
    int b = 7;
    System.out.println(a + b);
  }
}`,
    result: `${5 + 7}`,
    extra: `Bytecode Java → JVM → instructions CPU spécifiques à chaque machine. Portable sur tous les OS avec JVM.`,
  },
];

export default function MultiLangDemo() {
  const [selected, setSelected] = useState<Example>(examples[0]);
  const [showJavaPort, setShowJavaPort] = useState(false);

  const javaCpuInstructions = {
    Windows: `MOV REG1, 5
MOV REG2, 7
ADD REG1, REG2
PRINT REG1`,
    Linux: `MOV R1, 5
MOV R2, 7
ADD R1, R2
PRINT R1`,
    macOS: `LOAD R1, 5
LOAD R2, 7
ADD R1, R2
OUTPUT R1`,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Calcul 5 + 7 dans plusieurs langages</h2>

      {/* Sélection du langage */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {examples.map((ex) => (
          <button
            key={ex.title}
            onClick={() => {
              setSelected(ex);
              setShowJavaPort(false);
            }}
            className={`px-4 py-2 rounded-xl shadow-md transition ${
              selected.title === ex.title ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            {ex.title}
          </button>
        ))}
      </div>

      {/* Zone code */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <SyntaxHighlighter language={selected.language} style={oneDark} showLineNumbers wrapLongLines>
          {selected.code}
        </SyntaxHighlighter>
      </div>

      {/* Résultat */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-2">
        <strong>Résultat :</strong> {selected.result}
      </div>

      {/* Info supplémentaire */}
      {selected.extra && <div className="bg-gray-200 p-3 rounded-lg mb-2 italic text-gray-700">{selected.extra}</div>}

      {/* Option : affichage portabilité Java */}
      {selected.language === "java" && (
        <div className="mt-2">
          <button
            onClick={() => setShowJavaPort(!showJavaPort)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl shadow-md mb-2">
            {showJavaPort ? "Cacher la simulation JVM → CPU" : "Voir simulation JVM → CPU"}
          </button>
          {showJavaPort && (
            <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg shadow-lg">
              <strong>Instructions CPU simulées :</strong>
              <pre>{javaCpuInstructions.Windows}</pre>
              <p className="text-sm mt-2">Similaire pour Linux et macOS, dépend de la JVM.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
