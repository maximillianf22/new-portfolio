import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ExperienceData } from '../types';
import { BlurFade } from './ui/BlurFade';

interface ExperienceProps {
  experience: ExperienceData[];
  lang: 'en' | 'es';
  title?: string;
  dateField?: 'dates' | 'duration';
}

const ExperienceItem: React.FC<{ exp: ExperienceData; index: number; lang: 'en' | 'es'; dateField: 'dates' | 'duration' }> = ({ exp, index, lang, dateField }) => {
  return (
    <BlurFade delay={index * 0.05}>
      <div className="relative pl-16 group">
        {/* Dot */}
        <div className="absolute left-[13px] top-1 h-4 w-4 rounded-full border-2 border-neutral-800 bg-neutral-950 group-hover:border-purple-500 group-hover:bg-purple-900 transition-colors duration-300 z-10"></div>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {exp.role}
          </h3>
          <span className="font-mono text-sm text-neutral-500 whitespace-nowrap">
            {dateField === 'duration' ? (exp.duration || exp.dates) : exp.dates}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md text-neutral-400 font-medium">{exp.company}</h4>
          <span className="text-xs text-neutral-600 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
            {exp.location}
          </span>
        </div>

        <div className="overflow-hidden">
          <ul className="list-disc list-outside ml-4 text-neutral-400 text-sm leading-relaxed space-y-2 marker:text-purple-900/50 mb-4">
            {exp.highlights.map((highlight, idx) => (
              <li key={idx}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BlurFade>
  );
};

export const Experience: React.FC<ExperienceProps> = ({ experience, lang, title, dateField = 'dates' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-24 max-w-4xl mx-auto px-4" ref={ref}>
      <BlurFade>
        <h2 className="text-3xl font-bold mb-16 text-white/90">
          {title ?? (lang === 'en' ? "Experience" : "Experiencia Profesional")}
        </h2>
      </BlurFade>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-neutral-800"></div>
        <motion.div
          className="absolute left-[20px] top-0 w-[2px] bg-purple-500 origin-top"
          style={{ height: '100%', scaleY }}
        />

        <div className="space-y-16">
          {experience.map((exp, index) => (
            <ExperienceItem 
              key={`${exp.company}-${index}`} 
              exp={exp} 
              index={index} 
              lang={lang}
              dateField={dateField}
            />
          ))}
        </div>
      </div>
    </section>
  );
};