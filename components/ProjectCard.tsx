import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
    project: ProjectItem;
}

const ROTATION_RANGE = 20; // Degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);

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
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-full rounded-2xl bg-neutral-900 border border-neutral-800 group"
    >
      <div 
        style={{ transform: "translateZ(75px)" }}
        className="absolute inset-4 rounded-xl overflow-hidden bg-neutral-950 shadow-2xl"
      >
         <img 
            src={project.image} 
            alt={project.title} 
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
         />
         <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />
      </div>

      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute bottom-8 left-8 right-8 pointer-events-none"
      >
        <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-lg">{project.title}</h3>
        <p className="text-neutral-300 text-sm mb-4 line-clamp-2 shadow-black drop-shadow-md">{project.description}</p>
        <div className="flex gap-2 mb-4">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs font-mono bg-white/10 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      {/* Hover Action */}
      <div 
         style={{ transform: "translateZ(100px)" }}
         className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
      >
         <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform">
            <ArrowUpRight size={20} />
         </button>
      </div>
    </motion.div>
  );
};