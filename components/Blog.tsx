import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '../types';
import { BlurFade } from './ui/BlurFade';

interface BlogProps {
  articles: Article[];
  lang: 'en' | 'es';
}

export const Blog: React.FC<BlogProps> = ({ articles, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (!articles || articles.length === 0) return null;

  const itemsPerPage = 2;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const currentArticles = articles.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 6000); // Auto-scroll every 6 seconds

    return () => clearInterval(interval);
  }, [totalPages, isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handleDotClick = (index: number) => {
    setIsPaused(true);
    setCurrentIndex(index);
  };

  return (
    <section id="blog" className="py-24 max-w-6xl mx-auto px-4 scroll-mt-24">
      <BlurFade>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white/90">
              {lang === 'en' ? "Blog" : "Blog"}
            </h2>
            <p className="text-neutral-400 mb-4">
              {lang === 'en' 
                ? "Technical articles, insights, and thoughts on frontend architecture, AI integration, and product development. Explore in-depth guides on web accessibility, LLM integration strategies, legacy migration patterns, and modern React architecture."
                : "Artículos técnicos, insights y reflexiones sobre arquitectura frontend, integración de IA y desarrollo de productos. Explora guías detalladas sobre accesibilidad web, estrategias de integración de LLMs, patrones de migración de sistemas legacy y arquitectura moderna con React."
              }
            </p>
            <p className="text-neutral-500 text-sm">
              {lang === 'en' 
                ? "Learn from real-world production experiences, best practices, and lessons learned building scalable applications."
                : "Aprende de experiencias reales en producción, mejores prácticas y lecciones aprendidas construyendo aplicaciones escalables."
              }
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="relative">
        {/* Navigation Buttons */}
        {totalPages > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/70 text-white transition-colors hidden md:flex items-center justify-center"
              aria-label={lang === 'en' ? "Previous articles" : "Artículos anteriores"}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/70 text-white transition-colors hidden md:flex items-center justify-center"
              aria-label={lang === 'en' ? "Next articles" : "Siguientes artículos"}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {currentArticles.map((article, index) => {
                const articleSlug = article.url?.split('/').pop() || '';
                const isExternal = article.external || false;
                
                const ArticleWrapper = ({ children }: { children: React.ReactNode }) => {
                  if (isExternal && article.url) {
                    return (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        {children}
                      </a>
                    );
                  } else if (article.url && !isExternal) {
                    return (
                      <Link to={article.url} className="block h-full">
                        {children}
                      </Link>
                    );
                  }
                  return <div className="h-full">{children}</div>;
                };

                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group cursor-pointer border border-neutral-800 rounded-xl p-6 hover:border-purple-500/50 bg-neutral-900/30 transition-all duration-300 h-full flex flex-col"
                  >
                    <ArticleWrapper>
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar size={14} className="text-neutral-500" />
                        <span className="text-xs text-neutral-500 font-mono">{article.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-neutral-400 text-sm mb-4 flex-1 line-clamp-3">
                        {article.description}
                      </p>
                      
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
                        <span>{lang === 'en' ? "Read article" : "Leer artículo"}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </ArticleWrapper>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-purple-500 w-8' : 'bg-neutral-700'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

