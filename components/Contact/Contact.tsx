import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import TextDecrypt from "../ui/textDecrypt";

export const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const greetings = "Let's work together!";

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm("service_dl9djrv", "template_aybi97f", form.current, "MD6rY0SPz1H_153O_")
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have sent an email!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.current?.reset();
        })
        .catch((error) => {
          console.error(error.text);
        });
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center">
      <div className="w-full max-w-[90em] mx-auto flex flex-col md:flex-row md:justify-between md:space-x-12 space-y-6 md:space-y-0 items-center">
        {/* Formulaire */}
        <div className="w-[90%] sm:w-[30em] md:w-[40em] bg-white/30 border rounded-lg shadow-lg border-white">
          <form ref={form} onSubmit={sendEmail} className="space-y-6 p-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 bg-white/30 text-white rounded focus:outline-none focus:ring-2 focus:ring-white-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 bg-white/30 text-white rounded focus:outline-none focus:ring-2 focus:ring-white-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-3 py-2 bg-white/30 text-white rounded focus:outline-none focus:ring-2 focus:ring-white-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 hover:border-[#EDDD53]
            hover:bg-[#EDDD53] hover:text-[#0a0a0a]
           rounded font-semibold border border-white transition-colors duration-300">
              <i className="fas fa-terminal"></i> Send message
            </button>
          </form>
        </div>
        {/* Texte animé */}
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="w-[90%] md:w-[40%] flex items-center justify-center text-center">
          <TextDecrypt text={greetings} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" />
        </div>
      </div>
    </section>
  );
};
