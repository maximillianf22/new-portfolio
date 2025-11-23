import React from 'react';
import { MapPin, Globe, Code2, Layers, Cpu, PenTool, Database } from 'lucide-react';
import { BlurFade } from './ui/BlurFade';
import { ExperienceData } from '../types';

interface BentoGridProps {
  summary: string;
  currentRole: ExperienceData;
  location: string;
  lang: 'en' | 'es';
}

export const BentoGrid: React.FC<BentoGridProps> = ({ summary, currentRole, location, lang }) => {
  const techStack = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Layers },
    { name: "TypeScript", icon: Cpu },
    { name: "Tailwind", icon: Globe },
    { name: "Figma", icon: PenTool },
    { name: "Postgres", icon: Database },
    { name: "OpenAI", icon: Cpu },
    // Duplicate for marquee effect
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Layers },
    { name: "TypeScript", icon: Cpu },
    { name: "Tailwind", icon: Globe },
    { name: "Figma", icon: PenTool },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <BlurFade>
        <h2 className="text-3xl font-bold mb-12 text-white/90">{lang === 'en' ? "About Me" : "Sobre Mí"}</h2>
      </BlurFade>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        
        {/* Card 1: Bio (Large) */}
        <BlurFade delay={0.1} className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 flex flex-col justify-between hover:bg-neutral-900/50 transition-colors duration-500">
          <div className="z-10">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
               <span className="text-xl">👋</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">{lang === 'en' ? "Architecture & Design" : "Arquitectura & Diseño"}</h3>
            <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
              {summary}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </BlurFade>

        {/* Card 2: Current Role */}
        <BlurFade delay={0.2} className="md:col-span-1 row-span-1 rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-emerald-500 font-medium">Live</span>
            </div>
            <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">{lang === 'en' ? "Current Role" : "Rol Actual"}</p>
                <h4 className="text-lg font-bold text-white leading-tight mb-1">{currentRole.role}</h4>
                <p className="text-purple-400 text-sm">@{currentRole.company}</p>
            </div>
        </BlurFade>

        {/* Card 3: Location */}
        <BlurFade delay={0.3} className="md:col-span-1 row-span-1 rounded-3xl border border-neutral-800 bg-neutral-900/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.0817,4.6097,12,0/400x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsYnF4cnAwMnc3MnBwZnR4b3J6ZzkzIn0.1')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-950 to-transparent">
                <div className="flex items-center gap-2 text-white">
                    <MapPin size={16} />
                    <span className="font-medium">{location}</span>
                </div>
            </div>
        </BlurFade>

        {/* Card 4: Tech Stack Marquee */}
        <BlurFade delay={0.4} className="md:col-span-2 row-span-1 rounded-3xl border border-neutral-800 bg-neutral-900/30 overflow-hidden flex flex-col justify-center relative group">
           <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-transparent to-neutral-900/90 z-10 pointer-events-none"></div>
           <div className="flex w-full overflow-hidden">
             <div className="flex animate-scroll whitespace-nowrap gap-8 items-center py-4 px-4">
                {techStack.map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors">
                        <tech.icon size={20} />
                        <span className="font-mono text-sm font-semibold">{tech.name}</span>
                    </div>
                ))}
             </div>
           </div>
        </BlurFade>

        {/* Card 5: GitHub Stats / Filler */}
        <BlurFade delay={0.5} className="md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 flex items-center justify-between group hover:bg-neutral-800/30 transition-colors">
            <div>
                <p className="text-neutral-500 text-sm mb-1">Open Source</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">1.2k</span>
                    <span className="text-sm text-neutral-400">{lang === 'en' ? "Contributions in 2024" : "Contribuciones en 2024"}</span>
                </div>
            </div>
            <div className="h-12 w-12 rounded-full border border-neutral-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="text-white" size={24} />
            </div>
        </BlurFade>

      </div>
    </section>
  );
};