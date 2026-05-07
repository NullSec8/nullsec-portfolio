"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 flex items-center bg-black">
      <div className="max-w-2xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10vw] md:text-7xl leading-none font-black uppercase tracking-tighter text-white mb-8"
        >
          Contact
        </motion.h2>

        <p className="text-lg text-white/50 mb-12 max-w-lg">
          Interested in working on a project or just want to chat? Feel free to reach out.
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-white/20 p-8"
          >
            <p className="text-xl font-semibold text-white mb-2">Message received</p>
            <p className="text-white/50">I'll be in touch shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                required
                placeholder="Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-black border border-white/20 p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-black border border-white/20 p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                disabled={isLoading}
              />
            </div>
            <div>
              <textarea
                required
                rows={5}
                placeholder="Message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-black border border-white/20 p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                disabled={isLoading}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              className="w-full py-4 bg-white text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          <a
            href="https://github.com/nullsec8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/20 hover:border-white/50 text-sm transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://discord.com/users/nullsec8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/20 hover:border-white/50 text-sm transition-colors"
          >
            Discord
          </a>
        </motion.div>
      </div>
    </section>
  );
}
