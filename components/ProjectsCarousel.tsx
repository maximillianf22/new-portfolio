import React from "react";
import { BlurFade } from "./ui/BlurFade";
import { ProjectItem } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

interface ProjectsCarouselProps {
  title: string;
  projects: ProjectItem[];
  lang: "en" | "es";
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  title,
  projects,
  lang,
}) => {
  const [current, setCurrent] = React.useState(0);
  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));

  const handlePrev = () => {
    setCurrent((c) => (c - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrent((c) => (c + 1) % totalPages);
  };

  const start = current * pageSize;
  const visible = projects.slice(start, start + pageSize);

  return (
    <div className="mb-12">
      <BlurFade>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white/80">{title}</h3>
          {projects.length > pageSize && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white transition-colors"
                aria-label={lang === "en" ? "Previous projects" : "Proyectos anteriores"}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs text-neutral-400 font-mono tabular-nums">
                {current + 1}/{totalPages}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white transition-colors"
                aria-label={lang === "en" ? "Next projects" : "Siguientes proyectos"}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visible.map((project, idx) => (
          <BlurFade key={project.id} delay={idx * 0.15}>
            {/* Only embed if visible to keep performance tight */}
            <ProjectCard project={project} embed />
          </BlurFade>
        ))}
      </div>
    </div>
  );
};


