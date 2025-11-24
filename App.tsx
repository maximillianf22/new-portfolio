import React, { useState } from "react";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { Experience } from "./components/Experience";
import { AIPlayground } from "./components/AIPlayground";
import { ProjectCard } from "./components/ProjectCard";
import { Footer } from "./components/Footer";
import { Skills } from "./components/Skills";
import { BlurFade } from "./components/ui/BlurFade";
import { ProjectItem } from "./types";
import { data } from "./data";
import { Globe, Download } from "lucide-react";
import { generatePDF } from "./utils/generatePDF";

const projects: ProjectItem[] = [
  {
    id: "1",
    title: "Neon Nexus",
    description:
      "A cyberpunk-inspired DeFi dashboard with real-time WebSocket data visualization.",
    tags: ["React", "D3.js", "Socket.io"],
    image: "https://picsum.photos/800/600?grayscale&blur=2",
  },
  {
    id: "2",
    title: "Vocalize AI",
    description:
      "Text-to-speech platform utilizing the latest Gemini Audio models for realistic voice synthesis.",
    tags: ["Next.js", "Gemini API", "Python"],
    image: "https://picsum.photos/800/601?grayscale&blur=2",
  },
];

function App() {
  const [lang, setLang] = useState<"en" | "es">("en");

  const content = lang === "en" ? data.english : data.spanish;
  const profile = data.profile;

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  };

  const handleDownloadPDF = () => {
    generatePDF({ data, lang });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-purple-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
        <div className="pointer-events-auto bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full pl-6 pr-2 py-2 flex items-center gap-6 shadow-2xl">
          <span className="font-bold text-white tracking-tight">MF.</span>
          <div className="w-[1px] h-4 bg-neutral-700"></div>
          <div className="hidden md:flex gap-4 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">
              {lang === "en" ? "About" : "Sobre Mí"}
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              {lang === "en" ? "Skills" : "Habilidades"}
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              {lang === "en" ? "Projects" : "Proyectos"}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {lang === "en" ? "Contact" : "Contacto"}
            </a>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            title={lang === "en" ? "Download CV as PDF" : "Descargar CV en PDF"}
          >
            <Download size={14} />
            <span className="hidden sm:inline">
              {lang === "en" ? "CV" : "CV"}
            </span>
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            <Globe size={14} />
            <span>{lang === "en" ? "ES" : "EN"}</span>
          </button>
        </div>
      </nav>

      <Hero
        name={profile.name}
        headline={content.headline}
        subHeadline={content.sub_headline}
        lang={lang}
        avatar={profile.avatar}
      />

      <div id="about">
        <BentoGrid
          summary={content.summary}
          currentRole={content.experience[0]}
          location={profile.location}
          lang={lang}
        />
      </div>

      <Skills skills={content.skills} lang={lang} />

      <Experience experience={content.experience} lang={lang} />

      <AIPlayground lang={lang} />

      <section id="projects" className="py-24 max-w-7xl mx-auto px-4">
        <BlurFade>
          <h2 className="text-3xl font-bold mb-12 text-white/90">
            {lang === "en" ? "Selected Projects" : "Proyectos Destacados"}
          </h2>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <BlurFade key={project.id} delay={idx * 0.2}>
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </section>

      <div id="contact">
        <Footer email={profile.email} lang={lang} />
      </div>
    </div>
  );
}

export default App;
