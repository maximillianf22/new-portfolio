import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, PenTool } from 'lucide-react';
import { BlurFade } from './ui/BlurFade';

const FigmaIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z"
      fill="#0ACF83"
    />
    <path
      d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z"
      fill="#A259FF"
    />
    <path
      d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z"
      fill="#F24E1E"
    />
    <path
      d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z"
      fill="#FF7262"
    />
    <path
      d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z"
      fill="#1ABCFE"
    />
  </svg>
);

interface FigmaDesign {
  id: string;
  title: string;
  company?: string;
  url: string;
}

interface FigmaDesignsProps {
  lang: 'en' | 'es';
}

const ROTATION_RANGE = 15;

const figmaDesigns: FigmaDesign[] = [
  {
    id: '1',
    title: 'Humancore',
    url: 'https://www.figma.com/design/F6qzvhRWatEuZ7mhRE7w94/Humancore?node-id=0-1&p=f&t=tRXYafHqIvQ8XSd1-0'
  },
  {
    id: '2',
    title: 'Enroll',
    company: 'At Humancore',
    url: 'https://www.figma.com/design/PI7P7hLQJs7TVcbiGYAqsg/Enroll-Design?node-id=0-1&p=f&t=8669C56b51Bp7faG-0'
  },
  {
    id: '3',
    title: 'Laika',
    url: 'https://www.figma.com/design/LuRRXgRYcKEPcxNLFQo6m4/MVP?node-id=1169-583402&p=f&t=XvTATYkf6kUHaOpV-0'
  },
  {
    id: '4',
    title: 'Addiuva New SOA',
    company: 'AT Ikatech Solutions',
    url: 'https://www.figma.com/design/iRYYQNqQoAnUKZjCRHjLy4/Demo-Soaang?t=w607WLAhwbgrHOR-0'
  }
];

export const FigmaDesigns: React.FC<FigmaDesignsProps> = ({ lang }) => {
  return (
    <section id="designs" className="py-24 max-w-7xl mx-auto px-4 scroll-mt-24">
      <BlurFade>
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-sm mb-4">
            <FigmaIcon size={14} />
            <span>Design</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lang === 'en' ? 'Design Systems & Prototypes' : 'Sistemas de Diseño y Prototipos'}
          </h2>
          <p className="text-neutral-400 max-w-2xl">
            {lang === 'en' 
              ? 'Explore my design work in Figma, from complete design systems to interactive prototypes.'
              : 'Explora mi trabajo de diseño en Figma, desde sistemas de diseño completos hasta prototipos interactivos.'}
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {figmaDesigns.map((design, idx) => (
          <FigmaCard key={design.id} design={design} index={idx} lang={lang} />
        ))}
      </div>
    </section>
  );
};

interface FigmaCardProps {
  design: FigmaDesign;
  index: number;
  lang: 'en' | 'es';
}

const FigmaCard: React.FC<FigmaCardProps> = ({ design, index, lang }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = ((e.clientX - rect.left) / width - 0.5) * ROTATION_RANGE;
    const mouseY = ((e.clientY - rect.top) / height - 0.5) * ROTATION_RANGE * -1;

    x.set(mouseY);
    y.set(mouseX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-purple-500/20 via-pink-500/20 to-rose-500/20',
      'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      'from-emerald-500/20 via-green-500/20 to-lime-500/20',
      'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <BlurFade delay={index * 0.15}>
      <div
        className="relative h-[320px] w-full group perspective-1000"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          style={{
            transformStyle: 'preserve-3d',
            transform,
          }}
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br border border-neutral-800 z-0 transition-all duration-500 overflow-hidden"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
          />
          
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm group-hover:bg-neutral-900/20 transition-all duration-500" />
          
          <div
            style={{ transform: 'translateZ(40px)' }}
            className="absolute inset-0 p-6 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                  <FigmaIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{design.title}</h3>
                  {design.company && (
                    <p className="text-sm text-neutral-400">{design.company}</p>
                  )}
                </div>
              </div>
            </div>

            <motion.a
              href={design.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium transition-all duration-300 group-hover:border-white/40 group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{lang === 'en' ? 'Open in Figma' : 'Abrir en Figma'}</span>
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
          </div>
        </motion.div>
      </div>
    </BlurFade>
  );
};
