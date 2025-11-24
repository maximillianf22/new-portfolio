import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
    project: ProjectItem;
}

const ROTATION_RANGE = 20; // Degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE / width - HALF_ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE / height - HALF_ROTATION_RANGE;

    const rX = mouseY * -1;
    const rY = mouseX;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  return (
    <div 
        className="relative h-[500px] w-full group perspective-1000"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        {/* 3D Background Container (Browser Window) */}
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            transform,
          }}
          className="absolute inset-0 w-full h-full rounded-2xl bg-neutral-900 border border-neutral-800 z-0 transition-all duration-500"
        >
          <div 
            style={{ transform: "translateZ(50px)" }}
            className="absolute inset-4 rounded-xl overflow-hidden bg-neutral-950 shadow-2xl flex flex-col border border-neutral-800"
          >
            {/* Fake Browser Chrome */}
            <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2 shrink-0">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="flex-1 mx-4">
                    <div className="bg-neutral-800 rounded flex items-center px-3 py-0.5 text-[10px] text-neutral-500 font-mono truncate">
                       {project.link ? new URL(project.link).hostname : 'localhost:3000'}
                    </div>
                </div>
            </div>

            {/* Browser Content (Iframe or Image) */}
            <div className="relative flex-1 bg-white w-full overflow-hidden group-hover:pointer-events-auto">
                <div className="w-full h-full transition-all duration-500 group-hover:blur-sm group-hover:brightness-50">
                    {project.link ? (
                        <div className="w-[200%] h-[200%] origin-top-left scale-[0.5]">
                            <iframe 
                                src={project.link}
                                className="w-full h-full border-0"
                                title={project.title}
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            />
                        </div>
                    ) : (
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                
                {/* Overlay for interaction protection/visual */}
                <div className="absolute inset-0 bg-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Content Overlay - Static Position, No 3D Transform */}
        <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
             <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <div className="flex gap-2 pointer-events-auto">
                        {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              aria-label={`View ${project.title} source code on GitHub`}
                              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <Github size={16} />
                            </a>
                        )}
                        {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              aria-label={`Visit ${project.title} live site`}
                              className="p-1.5 bg-purple-600 hover:bg-purple-500 rounded-full text-white transition-colors"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
                
                <p className="text-neutral-300 text-sm mb-3">
                    {project.description}
                </p>

                {/* Expanded Details (Problem/Solution/Impact) */}
                <div className="grid grid-cols-1 gap-2 mt-3 border-t border-white/10 pt-3">
                    {project.problem && (
                        <div className="text-xs">
                            <span className="text-red-400 font-semibold">Problem:</span> <span className="text-neutral-400">{project.problem}</span>
                        </div>
                    )}
                    {project.solution && (
                        <div className="text-xs">
                            <span className="text-green-400 font-semibold">Solution:</span> <span className="text-neutral-400">{project.solution}</span>
                        </div>
                    )}
                    {project.impact && (
                        <div className="text-xs mt-1">
                            <span className="text-purple-400 font-semibold">Impact:</span>
                            <ul className="list-disc list-inside text-neutral-400 mt-0.5">
                                {project.impact.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-neutral-400 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
             </div>
        </div>
    </div>
  );
};