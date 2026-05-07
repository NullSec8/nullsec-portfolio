import { Suspense } from "react";
import { getUserRepos } from "@/lib/github";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export const metadata = {
  openGraph: {
    title: "nullsec8 | Full-Stack Developer",
    description: "17-year-old CS student building toward a future in AI and systems. Check out my projects and get in touch.",
    type: "website",
  },
};

async function ProjectsSection() {
  const result = await getUserRepos("nullsec8");
  
  if (!result.success) {
    return (
      <div className="min-h-screen py-24 px-6 flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white/60 mb-4">Unable to load projects at this time.</p>
          <p className="text-sm text-white/40">{result.error}</p>
        </div>
      </div>
    );
  }

  const publicRepos = result.data.filter((repo) => !repo.fork);

  return (
    <section id="projects" className="min-h-screen py-24 px-6 flex items-center bg-black">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-[10vw] md:text-7xl leading-none font-black uppercase tracking-tighter text-white mb-8">
          Projects
        </h2>
        <Projects repos={publicRepos} />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Suspense fallback={<Loading />}>
        <ProjectsSection />
      </Suspense>
      <Skills />
      <Contact />
      
      <footer className="py-8 text-center text-white/30 text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} nullsec8. All rights reserved.</p>

      </footer>
    </main>
  );
}
