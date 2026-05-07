"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const glitchChars = "7g71j239gj51l!0@#3$%^&*()-=+[]{}|;:,.<>?/";
const getRandomGlitch = () => Array(12).fill(0).map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join("");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [phase, setPhase] = useState<"glitch" | "reveal" | "done">("glitch");
  const [glitchText, setGlitchText] = useState("");

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(getRandomGlitch());
    }, 80);

    const revealTimeout = setTimeout(() => {
      clearInterval(glitchInterval);
      setPhase("reveal");
      setGlitchText("NULLSEC8");
    }, 1200);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(revealTimeout);
    };
  }, []);

  useEffect(() => {
    if (phase === "reveal") {
      const doneTimeout = setTimeout(() => setPhase("done"), 150);
      return () => clearTimeout(doneTimeout);
    }
  }, [phase]);

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-black"
      aria-label="Hero section with glitch animation"
    >
      <motion.div style={{ y, opacity }} className="text-center w-full overflow-hidden">
        {(phase === "glitch" || phase === "reveal") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10vw] md:text-[8vw] font-mono uppercase tracking-wider text-white/80"
            aria-label="Glitch effect text"
          >
            {glitchText}
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.15, ease: "linear" }}
            className="text-[18vw] md:text-[14vw] leading-none font-black uppercase tracking-tighter text-white"
            aria-label="NULLSEC8"
          >
            NULLSEC8
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-4 text-lg md:text-xl font-medium text-white/60"
          >
            Full-Stack Developer
          </motion.div>
        )}

        {phase === "done" && (
          <motion.a
            href="#projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="inline-block mt-8 text-sm font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            aria-label="View Projects section"
          >
            View Projects
          </motion.a>
        )}
      </motion.div>

      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-px h-8 bg-white/30"
            aria-label="Scroll indicator"
          />
        </motion.div>
      )}
    </section>
  );
}
