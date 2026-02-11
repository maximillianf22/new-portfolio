import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Command, Code, Sparkles, Trophy } from "lucide-react";

interface HeroProps {
  name: string;
  headline: string;
  subHeadline: string;
  lang: "en" | "es";
  avatar: string;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  headline,
  subHeadline,
  lang,
  avatar,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);

  const words =
    lang === "en"
      ? [
          "React/Vue Architect",
          "AI Engineering",
          "UX Obsessed",
          "Performance First",
        ]
      : [
          "Arquitecto React/Vue",
          "Ingeniería IA",
          "Obsesionado con UX",
          "Rendimiento Primero",
        ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12 lg:pt-0">
      {/* Spotlight Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.05), transparent 40%)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none"></div>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/50 bg-purple-500/10 backdrop-blur-sm text-sm font-semibold text-purple-300 mb-8 shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]"
            >
              <Sparkles size={14} className="text-purple-400" />
              {lang === "en"
                ? "Personal Portfolio 2025"
                : "Portafolio Personal 2025"}
            </motion.div>

            {/* Name - Now the main focus */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {name.split(" ")[0]} <br className="md:hidden" />
              <span className="text-white">{name.split(" ")[1]}</span>.
            </motion.h1>

            {/* Slogan */}
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-purple-200 to-neutral-400">
                {subHeadline}
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {headline}
            </motion.p>

            {/* Command Bar Simulation */}
            <motion.div
              className="flex items-center justify-between max-w-md mx-auto lg:mx-0 h-16 bg-neutral-900/90 border border-neutral-700/50 rounded-2xl px-5 backdrop-blur-xl shadow-2xl shadow-purple-900/20 group hover:border-purple-500/30 transition-all cursor-default"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 text-neutral-400">
                <Command
                  size={22}
                  className="group-hover:text-purple-400 transition-colors"
                />
                <div className="flex flex-col h-6 overflow-hidden relative w-56 items-start">
                  <motion.span
                    key={textIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="absolute font-mono text-base font-medium whitespace-nowrap text-neutral-200"
                  >
                    {words[textIndex]}
                  </motion.span>
                </div>
              </div>
              <div className="flex gap-2 opacity-50">
                <div className="px-2 py-1 rounded-md bg-neutral-800 text-[10px] font-mono text-neutral-400 border border-neutral-700">
                  CMD+K
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex flex-col lg:items-start items-center gap-3 text-neutral-600 text-xs font-medium uppercase tracking-widest"
            >
              <span>
                {lang === "en" ? "Scroll to explore" : "Desliza para explorar"}
              </span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-neutral-600 via-neutral-800 to-transparent"></div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative w-full max-w-[480px] order-1 lg:order-2 perspective-1000">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-purple-900/20 group z-10"
            >
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback only if the user hasn't uploaded their photo yet
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                }}
              />

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

              {/* Glass Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-white font-bold text-base">{name}</p>
                  <p className="text-neutral-300 text-xs font-medium tracking-wide">
                    Frontend Architect
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-inner">
                  <Code size={18} strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>

            {/* Floating Achievement Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-12 -right-6 lg:-right-12 bg-neutral-900/90 border border-neutral-800 p-4 rounded-2xl shadow-xl backdrop-blur-md hidden md:flex items-center gap-4 z-20 hover:scale-105 transition-transform"
            >
              <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  Experience
                </p>
                <p className="text-lg font-bold text-white">10+ Years</p>
              </div>
            </motion.div>

            {/* Decorative Elements (Matched to Photo: Cyan Left, Purple Right) */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse-slow"></div>
            <div
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
