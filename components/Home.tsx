import React, { useState } from "react";
import { Hero } from "./Hero";
import { BentoGrid } from "./BentoGrid";
import { Experience } from "./Experience";
import { AIPlayground } from "./AIPlayground";
import { ProjectCard } from "./ProjectCard";
import { Footer } from "./Footer";
import { Skills } from "./Skills";
import { Testimonials } from "./Testimonials";
import { Blog } from "./Blog";
import { BlurFade } from "./ui/BlurFade";
import { data } from "../data";
import { Globe, Download } from "lucide-react";
import { generatePDF } from "../utils/generatePDF";
import { trackEvent } from "../utils/analytics";

export const Home: React.FC = () => {
  const [lang, setLang] = useState<"en" | "es">(() => {
    const savedLang = localStorage.getItem('portfolio-lang') as "en" | "es" | null;
    return savedLang || "en";
  });
  
  React.useEffect(() => {
    trackEvent('page_visited', { path: window.location.pathname });
  }, []);
  
  React.useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  React.useEffect(() => {
    let tracked50 = false;
    let tracked90 = false;

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      
      if (scrollPercentage > 50 && !tracked50) {
        trackEvent('scroll', { depth: '50%' });
        tracked50 = true;
      }
      
      if (scrollPercentage > 90 && !tracked90) {
        trackEvent('scroll', { depth: '90%' });
        tracked90 = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = lang === "en" ? data.english : data.spanish;
  const profile = data.profile;
  const projects = data.projects;

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    trackEvent('click_button', { type: 'language_toggle', value: newLang });
  };

  const handleDownloadPDF = () => {
    trackEvent('click_button', { type: 'download_cv' });
    generatePDF({ data, lang });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-purple-500/30 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
        <div className="pointer-events-auto bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full pl-4 pr-2 py-2 flex items-center gap-6 shadow-2xl">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <path d="M20 60 L35 30 L50 60 L65 30 L80 60" stroke="url(#neon)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" filter="url(#blur)"/>
            <path d="M20 60 L35 30 L50 60 L65 30 L80 60" stroke="url(#neon)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="20" cy="60" r="3" fill="#fff"/>
            <circle cx="80" cy="60" r="3" fill="#fff"/>
          </svg>
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
            {content.testimonials && content.testimonials.length > 0 && (
              <a href="#testimonials" className="hover:text-white transition-colors">
                {lang === "en" ? "Testimonials" : "Testimonios"}
              </a>
            )}
            {content.articles && content.articles.length > 0 && (
              <a href="#blog" className="hover:text-white transition-colors">
                {lang === "en" ? "Blog" : "Blog"}
              </a>
            )}
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

      <main className="relative z-10">
        <Hero
          name={profile.name}
          headline={content.headline}
          subHeadline={content.sub_headline}
          lang={lang}
          avatar={profile.avatar}
        />

        <section id="about" className="scroll-mt-24">
          <BentoGrid
            summary={content.summary}
            currentRole={content.experience[0]}
            location={profile.location}
            lang={lang}
          />
        </section>

        <Skills skills={content.skills} lang={lang} />

        <Experience experience={content.experience} lang={lang} />

        <AIPlayground lang={lang} />

        {content.testimonials && content.testimonials.length > 0 && (
          <Testimonials testimonials={content.testimonials} lang={lang} />
        )}

        <section id="projects" className="py-24 max-w-7xl mx-auto px-4 scroll-mt-24">
          <BlurFade>
            <h2 className="text-3xl font-bold mb-12 text-white/90">
              {lang === "en" ? "Selected Projects" : "Proyectos Destacados"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => {
              const isFirstOfThree = projects.length === 3 && idx === 0;
              return (
                <BlurFade 
                  key={project.id} 
                  delay={idx * 0.2}
                  className={isFirstOfThree ? "md:col-span-2" : ""}
                >
                  <ProjectCard project={project} />
                </BlurFade>
              );
            })}
          </div>
        </section>

        {content.articles && content.articles.length > 0 && (
          <Blog articles={content.articles} lang={lang} />
        )}

        <section id="contact" className="scroll-mt-24">
          <Footer email={profile.email} lang={lang} />
        </section>
      </main>
    </div>
  );
};

