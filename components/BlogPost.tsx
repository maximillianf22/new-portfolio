import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Globe } from 'lucide-react';
import { data } from '../data';
import { BlurFade } from './ui/BlurFade';

const formatMarkdown = (markdown: string): string => {
  let html = markdown;
  
  const codeBlocks: string[] = [];
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const id = `CODE_BLOCK_${codeBlocks.length}`;
    codeBlocks.push(match);
    return id;
  });

  html = html
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold text-white mt-12 mb-6">${line.substring(2)}</h1>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-white mt-10 mb-5">${line.substring(3)}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-bold text-white mt-8 mb-4">${line.substring(4)}</h3>`;
      }
      if (line.startsWith('#### ')) {
        return `<h4 class="text-lg font-semibold text-white mt-6 mb-3">${line.substring(5)}</h4>`;
      }
      if (line.trim() === '') {
        return '<br/>';
      }
      return line;
    })
    .join('\n');

  codeBlocks.forEach((block, index) => {
    const isTypeScript = block.includes('typescript');
    const code = block.replace(/```typescript\n?/g, '').replace(/```\n?/g, '').trim();
    html = html.replace(
      `CODE_BLOCK_${index}`,
      `<pre class="bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-x-auto my-6"><code class="text-sm text-neutral-300 font-mono whitespace-pre">${escapeHtml(code)}</code></pre>`
    );
  });

  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-neutral-200">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-neutral-800 text-purple-400 px-2 py-1 rounded text-sm font-mono">$1</code>')
    .replace(/^- (.*)$/gm, '<li class="ml-6 mb-2 text-neutral-300">$1</li>')
    .replace(/^\d+\. (.*)$/gm, '<li class="ml-6 mb-2 text-neutral-300">$1</li>');

  html = html.replace(/(<li[^>]*>.*?<\/li>\n?)+/g, (match) => {
    return `<ul class="list-disc list-inside mb-6 space-y-2 ml-4">${match}</ul>`;
  });

  html = html
    .split('\n')
    .map((line) => {
      if (line.trim() && !line.match(/^<[h|u|l|p|b|d]/) && !line.match(/^CODE_BLOCK/)) {
        return `<p class="mb-4 text-neutral-300 leading-relaxed">${line}</p>`;
      }
      return line;
    })
    .join('\n');

  html = html.replace(/<p class="mb-4 text-neutral-300 leading-relaxed"><\/p>/g, '');
  html = html.replace(/<br\/>/g, '');

  return html;
};

const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lang, setLang] = useState<"en" | "es">("en");
  
  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio-lang') as "en" | "es" | null;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);
  
  const content = lang === "en" ? data.english : data.spanish;
  const articles = content.articles || [];
  
  const article = articles.find(art => {
    const articleSlug = art.url?.split('/').pop();
    return articleSlug === slug;
  });

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-purple-300"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
        <div className="pointer-events-auto bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full pl-4 pr-2 py-2 flex items-center gap-6 shadow-2xl">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">{lang === 'en' ? 'Home' : 'Inicio'}</span>
          </button>
          <div className="w-[1px] h-4 bg-neutral-700"></div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            <Globe size={14} />
            <span>{lang === "en" ? "ES" : "EN"}</span>
          </button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-24">
        <BlurFade>
          <div className="mb-8"></div>

          <div className="flex items-center gap-3 mb-6">
            <Calendar size={16} className="text-neutral-500" />
            <span className="text-sm text-neutral-500 font-mono">{article.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {article.title}
          </h1>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-mono bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full border border-purple-500/20"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-invert prose-purple max-w-none">
            <div className="text-lg text-neutral-300 leading-relaxed mb-8 border-l-4 border-purple-500/50 pl-6 italic">
              {article.description}
            </div>

            {article.content ? (
              <div 
                className="article-content text-neutral-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(article.content) }}
              />
            ) : (
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 mt-12">
                <p className="text-neutral-400 italic">
                  {lang === 'en' 
                    ? "This article is coming soon. Check back later for the full content!"
                    : "Este artículo estará disponible pronto. ¡Vuelve más tarde para ver el contenido completo!"
                  }
                </p>
              </div>
            )}
          </div>
        </BlurFade>
      </article>
    </div>
  );
};

