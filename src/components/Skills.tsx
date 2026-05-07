"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    level: "Proficient",
    skills: ["Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Languages",
    level: "Familiar",
    skills: ["C++", "C#"],
  },
  {
    category: "Security",
    level: "Familiar",
    skills: ["Penetration Testing", "Network Security", "CTF"],
  },
  {
    category: "Tools",
    level: "Experienced",
    skills: ["Git", "Linux", "Windows"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 px-6 flex items-center bg-black">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10vw] md:text-7xl leading-none font-black uppercase tracking-tighter text-white mb-16"
        >
          Skills
        </motion.h2>

        <div className="space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category + group.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-sm font-mono uppercase text-white/40">{group.category}</h3>
                <span className="text-xs font-mono text-white/20">—</span>
                <span className="text-xs font-mono text-white/50">{group.level}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border border-white/20 text-sm text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-sm text-white/40"
        >
          Always learning new things. Check out my GitHub for more details.
        </motion.p>
      </div>
    </section>
  );
}