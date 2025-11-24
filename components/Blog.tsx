import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { BlurFade } from './ui/BlurFade';

interface BlogProps {
  articles: Article[];
  lang: 'en' | 'es';
}

export const Blog: React.FC<BlogProps> = ({ articles, lang }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section id="blog" className="py-24 max-w-6xl mx-auto px-4 scroll-mt-24">
      <BlurFade>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white/90">
              {lang === 'en' ? "Blog" : "Blog"}
            </h2>
            <p className="text-neutral-400">
              {lang === 'en' 
                ? "Technical articles, insights, and thoughts on frontend architecture, AI integration, and product development."
                : "Artículos técnicos, insights y reflexiones sobre arquitectura frontend, integración de IA y desarrollo de productos."
              }
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => {
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
            <BlurFade key={article.id} delay={index * 0.1}>
              <motion.article
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
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
};

