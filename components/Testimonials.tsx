import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';
import { BlurFade } from './ui/BlurFade';

interface TestimonialsProps {
  testimonials: Testimonial[];
  lang: 'en' | 'es';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-24 max-w-5xl mx-auto px-4 scroll-mt-24">
      <BlurFade>
        <h2 className="text-3xl font-bold mb-12 text-white/90 text-center">
          {lang === 'en' ? "What People Say" : "Lo Que Dicen"}
        </h2>
      </BlurFade>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 md:p-12 h-[320px] md:h-[380px] flex flex-col"
            >
              <Quote className="absolute top-6 right-6 text-purple-500/20" size={40} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center overflow-y-auto mb-8">
                  <p className="text-neutral-300 text-lg md:text-xl leading-relaxed italic text-center max-w-3xl mx-auto px-2">
                    "{(testimonials[currentIndex].content && testimonials[currentIndex].content.trim().length > 0)
                      ? testimonials[currentIndex].content
                      : (lang === 'en' ? 'Great collaboration and results.' : 'Excelente colaboración y resultados.')}"
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-2 border-t border-neutral-800 pt-6">
                  <h4 className="text-white font-semibold text-xl">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-neutral-400 text-sm">
                    {testimonials[currentIndex].role}{testimonials[currentIndex].company ? ` at ${testimonials[currentIndex].company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-full text-white transition-all hover:border-purple-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-full text-white transition-all hover:border-purple-500"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-purple-500 w-8'
                      : 'bg-neutral-700 w-2 hover:bg-neutral-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

