import React from 'react';
import { AppData } from '../types';
import { ExperienceData, SkillSet, EducationData } from '../types';

interface CVPreviewProps {
  data: AppData;
  lang: 'en' | 'es';
  onClose: () => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, onClose }) => {
  const profile = data.profile;
  const content = lang === 'en' ? data.english : data.spanish;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0d] overflow-y-auto">
      {/* Close button */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full transition-colors"
        >
          Close
        </button>
      </div>

      {/* PDF-like container */}
      <div className="max-w-[210mm] mx-auto bg-[#0d0d0d] min-h-screen py-8">
        {/* Header with purple overlay */}
        <div className="relative bg-gradient-to-b from-purple-600/70 to-purple-600/70 px-[15mm] py-[8mm]">
          {/* Name */}
          <h1 className="text-[26pt] font-bold text-white uppercase mb-2">
            {profile.name}
          </h1>
          
          {/* Headline */}
          <p className="text-[13pt] text-purple-300 mb-2">
            {content.headline}
          </p>
          
          {/* Contact info */}
          <p className="text-[9pt] text-gray-400">
            {profile.email} • {profile.phone} • {profile.location}
          </p>
        </div>

        {/* Content */}
        <div className="px-[15mm] py-6 space-y-6">
          {/* Professional Summary */}
          <section>
            <h2 className="text-[12pt] font-bold text-white uppercase mb-2">
              {lang === 'en' ? 'PROFESSIONAL SUMMARY' : 'RESUMEN PROFESIONAL'}
            </h2>
            <div className="w-10 h-0.5 bg-purple-500 mb-3"></div>
            <p className="text-[10pt] text-gray-400 leading-relaxed text-justify">
              {content.summary}
            </p>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-[12pt] font-bold text-white uppercase mb-2">
              {lang === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'EXPERIENCIA PROFESIONAL'}
            </h2>
            <div className="w-10 h-0.5 bg-purple-500 mb-4"></div>
            
            <div className="space-y-5">
              {content.experience.map((exp: ExperienceData, idx: number) => (
                <div key={idx} className="space-y-2">
                  {/* Company badge */}
                  <div className="bg-purple-500/20 rounded px-2 py-1 inline-block">
                    <span className="text-[11pt] font-bold text-purple-400">
                      {exp.company}
                    </span>
                  </div>
                  
                  {/* Role */}
                  <h3 className="text-[10.5pt] font-bold text-white">
                    {exp.role}
                  </h3>
                  
                  {/* Dates and Location */}
                  <div className="flex justify-between text-[9pt] text-gray-400">
                    <span>{exp.dates}</span>
                    <span>{exp.location}</span>
                  </div>
                  
                  {/* Highlights */}
                  <ul className="space-y-1.5 ml-4">
                    {exp.highlights.map((hl: string, hlIdx: number) => (
                      <li key={hlIdx} className="text-[9.5pt] text-gray-400 flex items-start">
                        <span className="text-purple-500 mr-2">▸</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-[12pt] font-bold text-white uppercase mb-2">
              {lang === 'en' ? 'TECHNICAL SKILLS' : 'HABILIDADES TÉCNICAS'}
            </h2>
            <div className="w-10 h-0.5 bg-purple-500 mb-4"></div>
            
            <div className="space-y-3">
              {Object.entries(content.skills as SkillSet).map(([category, items], idx: number) => (
                <div key={idx}>
                  <h3 className="text-[10pt] font-bold text-white mb-1">
                    {category}:
                  </h3>
                  <p className="text-[9pt] text-gray-400">
                    {typeof items === 'string' ? items : items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          {content.education && content.education.length > 0 && (
            <section>
              <h2 className="text-[12pt] font-bold text-white uppercase mb-2">
                {lang === 'en' ? 'EDUCATION' : 'EDUCACIÓN'}
              </h2>
              <div className="w-10 h-0.5 bg-purple-500 mb-4"></div>
              
              <div className="space-y-3">
                {content.education.map((edu: EducationData, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-[10pt] font-bold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-[9pt] text-gray-400">
                      {edu.institution}
                    </p>
                    <p className="text-[9pt] font-bold text-purple-400">
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <div className="border-t border-purple-500/30 pt-3 mt-8">
            <p className="text-[7pt] text-gray-500 text-center">
              {profile.name} - {lang === 'en' ? 'CV' : 'CV'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

