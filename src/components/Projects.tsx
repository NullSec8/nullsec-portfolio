"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GitHubRepo } from "@/lib/github";

const languages = ["All", "Python", "JavaScript", "TypeScript", "C++", "C#"];

export default function Projects({ repos }: { repos: GitHubRepo[] }) {
  const [filter, setFilter] = useState("All");

  const filteredRepos = filter === "All" ? repos : repos.filter((repo) => repo.language === filter);

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-[10vw] md:text-7xl leading-none font-black uppercase tracking-tighter text-white mb-8"
      >
        Projects
      </motion.h2>

      <p className="text-lg text-white/50 mb-12 max-w-lg">
        A collection of projects I've worked on. Check out my GitHub for more details 
        and feel free to reach out if you want to collaborate.
      </p>

      <div className="flex flex-wrap gap-2 mb-12">
        {languages.map((lang) => {
          const count = lang === "All" ? repos.length : repos.filter((r) => r.language === lang).length;
          if (count === 0) return null;
          return (
            <motion.button
              key={lang}
              onClick={() => setFilter(lang)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 text-sm border transition-all ${
                filter === lang
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/60 border-white/20 hover:border-white/50"
              }`}
            >
              {lang} ({count})
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="block p-5 border border-white/20 hover:border-white/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
              <span className="text-xs text-white/30">↗</span>
            </div>
            <p className="text-sm text-white/50 mb-4 line-clamp-2">
              {repo.description || "Check out this project on GitHub."}
            </p>
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>{repo.language || "—"}</span>
              <span>{repo.stargazers_count} ★</span>
            </div>
          </motion.a>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-20 text-white/40">No projects found in this category.</div>
      )}
    </div>
  );
}
