import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import TextDecrypt from "./TextDecrypt/textDecrypt";

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
    <section id="contact" className="py-12 px-4 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition">
              <i className="fas fa-terminal"></i> Send message
            </button>
          </form>
        </div>

        <h1 className="mt-8 text-center text-2xl font-semibold">
          <TextDecrypt text={greetings} />
        </h1>
      </div>
    </section>
  );
};
