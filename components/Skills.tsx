import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Palette, Bot, Database, PenTool, Wrench } from 'lucide-react';
import { SkillSet } from '../types';
import { BlurFade } from './ui/BlurFade';

interface SkillsProps {
  skills: SkillSet;
  lang: 'en' | 'es';
}

export const Skills: React.FC<SkillsProps> = ({ skills, lang }) => {
  const getIcon = (key: string) => {
    switch (key) {
      case "Frontend Architecture": return Cpu;
      case "Modern UI & Styling": return Palette;
      case "AI & Innovation": return Bot;
      case "State & Data": return Database;
      case "Product Design": return PenTool;
      case "Tools & Methods": return Wrench;
      default: return Wrench;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-500/20 to-purple-500/20",
      "from-purple-500/20 to-pink-500/20",
      "from-emerald-500/20 to-teal-500/20",
      "from-orange-500/20 to-red-500/20",
      "from-indigo-500/20 to-cyan-500/20",
      "from-gray-500/20 to-slate-500/20",
    ];
    return gradients[index % gradients.length];
  };

  // Convert to entries safely
  const entries = Object.entries(skills);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 relative z-10" id="skills">
      <div className="absolute inset-0 bg-neutral-950/0 pointer-events-none" />
      
      <BlurFade>
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            {lang === 'en' ? "Technical Arsenal" : "Arsenal Técnico"}
          </h2>
          <p className="text-neutral-400 max-w-2xl text-lg">
            {lang === 'en' 
              ? "A comprehensive overview of the tools and technologies I use to build scalable, high-performance digital products."
              : "Una visión general de las herramientas y tecnologías que utilizo para construir productos digitales escalables y de alto rendimiento."}
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map(([category, items], index) => {
          const Icon = getIcon(category);
          // Defensive check to ensure items is a string before splitting
          const skillList = typeof items === 'string' ? items.split(', ') : [];
          
          return (
            <BlurFade key={category} delay={index * 0.1}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="h-full relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur-sm group"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-neutral-800/80 border border-white/5 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} className="text-neutral-200 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-6 group-hover:text-purple-100 transition-colors">
                    {category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skillList.map((skill) => (
                      <span 
                        key={skill} 
                        className="text-xs font-medium text-neutral-400 bg-neutral-950/50 border border-neutral-800 px-3 py-1.5 rounded-lg group-hover:border-white/10 group-hover:text-neutral-200 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
};