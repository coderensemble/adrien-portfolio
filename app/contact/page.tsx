"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import TextDecrypt from "../../components/ui/textDecrypt";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const greetings = "LET'S WORK TOGETHER!";

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_dl9djrv",
          "template_aybi97f",
          form.current,
          "MD6rY0SPz1H_153O_"
        )
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Message sent successfully 🚀",
            showConfirmButton: false,
            timer: 1500,
          });
          form.current?.reset();
        })
        .catch((error) => {
          console.error(error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later.",
          });
        });
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <motion.div
        className="w-[90%] max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Texte animé */}
        <motion.div
          style={{ fontFamily: "var(--font-mono)" }}
          className="flex-1 flex items-center justify-center text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <TextDecrypt
            text={greetings}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#57C785]"
          />
        </motion.div>

        {/* Formulaire */}
        <motion.div
          className="flex-1 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EDDD53] transition"
                placeholder="John Doe"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EDDD53] transition"
                placeholder="you@email.com"
              />
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EDDD53] transition"
                placeholder="Tell me more about your project..."
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <button
                type="submit"
                className="w-full py-3 px-6 flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-[#d5c64a] transition"
              >
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};
