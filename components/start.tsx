"use client";

import { useState } from "react";
import TextDecrypt from "./textDecrypt";
import resume from "../data/resume.json";

export default function Content() {
  const [countClients, setCountClients] = useState(0);
  const name = resume.basics.name;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        <TextDecrypt text={`${name}`} />
      </h2>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        <TextDecrypt text={resume.basics.job1} />
        <br />
        <TextDecrypt text={resume.basics.job2} />
      </h1>

      <p className="text-lg text-gray-600 mb-4">{countClients} visiteurs</p>

      <button
        onClick={() => setCountClients((prev) => prev + 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-medium"
      >
        Nouveau visiteur
      </button>
    </div>
  );
}
