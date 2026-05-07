"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-24 px-6 flex items-center bg-black">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10vw] md:text-7xl leading-none font-black uppercase tracking-tighter text-white mb-16"
        >
          About
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              17-year-old Computer Science student
              <br />
              building toward a future in AI and systems.
            </h3>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
              I grew up with games like Half-Life and Counter-Strike. Figuring out how they worked 
              under the hood is what got me into programming. Now I'm focused on learning everything 
              I can about software development, AI/ML, and systems architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-white/20">
              <h4 className="text-sm font-mono uppercase text-white/40 mb-3">Currently</h4>
              <p className="text-white/80">CS Student</p>
            </div>
            <div className="p-6 border border-white/20">
              <h4 className="text-sm font-mono uppercase text-white/40 mb-3">Learning</h4>
              <p className="text-white/80">AI/ML, Systems Programming</p>
            </div>
            <div className="p-6 border border-white/20">
              <h4 className="text-sm font-mono uppercase text-white/40 mb-3">Goals</h4>
              <p className="text-white/80">Build intelligent systems</p>
            </div>
            <div className="p-6 border border-white/20">
              <h4 className="text-sm font-mono uppercase text-white/40 mb-3">Open to</h4>
              <p className="text-white/80">Projects, collaboration, chat</p>
            </div>
          </div>

          <p className="text-base text-white/50">
            I&apos;m always open to projects, collaboration, or just chatting about tech. 
            Feel free to reach out if you want to work on something interesting.
          </p>

        </motion.div>
      </div>
    </section>
  );
}