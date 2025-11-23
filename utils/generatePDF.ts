import jsPDF from 'jspdf';
import { AppData, ExperienceData, SkillSet } from '../types';

interface PDFOptions {
  data: AppData;
  lang: 'en' | 'es';
}

export const generatePDF = ({ data, lang }: PDFOptions) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : [0, 0, 0];
  };

  // Modern color scheme with better contrast
  const colorHex = {
    dark: '#0a0a0a',
    surface: '#1a1a1a',
    purple: '#8b5cf6',
    purpleLight: '#a78bfa',
    purpleDark: '#6d28d9',
    text: '#1a1a1a',
    textSecondary: '#4a4a4a',
    textMuted: '#6b6b6b',
    border: '#e5e5e5',
    bgLight: '#f8f9fa',
    accent: '#8b5cf6'
  };

  const colors = {
    dark: hexToRgb(colorHex.dark),
    surface: hexToRgb(colorHex.surface),
    purple: hexToRgb(colorHex.purple),
    purpleLight: hexToRgb(colorHex.purpleLight),
    purpleDark: hexToRgb(colorHex.purpleDark),
    text: hexToRgb(colorHex.text),
    textSecondary: hexToRgb(colorHex.textSecondary),
    textMuted: hexToRgb(colorHex.textMuted),
    border: hexToRgb(colorHex.border),
    bgLight: hexToRgb(colorHex.bgLight),
    accent: hexToRgb(colorHex.accent)
  };

  // Helper function to draw filled rectangle
  const drawRect = (x: number, y: number, w: number, h: number, color: [number, number, number]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, w, h, 'F');
  };

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to draw a line
  const drawLine = (y: number, lineColor: [number, number, number] = colors.border, width: number = 0.5) => {
    doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
    doc.setLineWidth(width);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // Helper function to draw accent line (purple)
  const drawAccentLine = (y: number) => {
    doc.setDrawColor(colors.purple[0], colors.purple[1], colors.purple[2]);
    doc.setLineWidth(2);
    doc.line(margin, y, margin + 30, y);
  };

  // Helper function to add text with styling
  const addText = (text: string, x: number, y: number, options: {
    fontSize?: number;
    fontStyle?: 'normal' | 'bold';
    color?: [number, number, number];
    align?: 'left' | 'center' | 'right';
  } = {}) => {
    const { fontSize = 12, fontStyle = 'normal', color = colors.text, align = 'left' } = options;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, x, y, { align });
  };

  // Header Section with modern design
  const profile = data.profile;
  const content = lang === 'en' ? data.english : data.spanish;

  // Top accent bar
  drawRect(0, 0, pageWidth, 4, colors.purple);
  yPosition = 18;

  // Name with accent
  addText(profile.name, margin, yPosition, {
    fontSize: 32,
    fontStyle: 'bold',
    color: colors.text
  });
  yPosition += 12;

  // Headline with purple accent
  addText(content.headline, margin, yPosition, {
    fontSize: 16,
    fontStyle: 'bold',
    color: colors.purple
  });
  yPosition += 10;

  // Contact Info in a subtle box
  const contactInfo = [
    profile.email,
    profile.phone,
    profile.location
  ].filter(Boolean);

  contactInfo.forEach((info, idx) => {
    addText(info, margin + (idx * (contentWidth / 3)), yPosition, {
      fontSize: 9,
      color: colors.textSecondary,
      align: 'left'
    });
  });
  yPosition += 10;

  // Summary Section with background
  checkPageBreak(35);
  drawLine(yPosition - 3, colors.border, 0.3);
  yPosition += 5;
  
  addText(lang === 'en' ? 'Summary' : 'Resumen', margin, yPosition, {
    fontSize: 18,
    fontStyle: 'bold',
    color: colors.purple
  });
  drawAccentLine(yPosition - 2);
  yPosition += 8;

  // Summary in a subtle background box
  const summaryLines = doc.splitTextToSize(content.summary, contentWidth - 4);
  const summaryHeight = summaryLines.length * 5 + 4;
  drawRect(margin, yPosition - 3, contentWidth, summaryHeight, colors.bgLight);
  
  summaryLines.forEach((line: string) => {
    addText(line, margin + 2, yPosition, {
      fontSize: 10,
      color: colors.text,
      align: 'left'
    });
    yPosition += 5;
  });
  yPosition += 5;

  // Experience Section
  checkPageBreak(40);
  drawLine(yPosition - 3, colors.border, 0.3);
  yPosition += 5;

  addText(lang === 'en' ? 'Experience' : 'Experiencia Profesional', margin, yPosition, {
    fontSize: 18,
    fontStyle: 'bold',
    color: colors.purple
  });
  drawAccentLine(yPosition - 2);
  yPosition += 10;

  content.experience.forEach((exp: ExperienceData, index: number) => {
    checkPageBreak(40);

    // Experience item with left border accent
    drawRect(margin - 2, yPosition - 2, 2, 1, colors.purple);

    // Role and Dates
    addText(exp.role, margin, yPosition, {
      fontSize: 14,
      fontStyle: 'bold',
      color: colors.text
    });

    addText(exp.dates, pageWidth - margin, yPosition, {
      fontSize: 10,
      fontStyle: 'bold',
      color: colors.purple,
      align: 'right'
    });
    yPosition += 7;

    // Company and Location
    addText(exp.company, margin, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: colors.textSecondary
    });

    addText(exp.location, pageWidth - margin, yPosition, {
      fontSize: 9,
      color: colors.textMuted,
      align: 'right'
    });
    yPosition += 7;

    // Highlights with better formatting
    exp.highlights.forEach((highlight: string) => {
      checkPageBreak(8);
      const highlightLines = doc.splitTextToSize(highlight, contentWidth - 8);
      
      // Bullet point using ellipse
      doc.setFillColor(colors.purple[0], colors.purple[1], colors.purple[2]);
      doc.ellipse(margin + 3, yPosition - 1, 1, 1, 'F');
      
      highlightLines.forEach((line: string, lineIdx: number) => {
        addText(line, margin + 7, yPosition, {
          fontSize: 9.5,
          color: colors.text,
          align: 'left'
        });
        yPosition += 4.5;
      });
      yPosition += 2;
    });

    yPosition += 6;
    
    // Subtle separator between experiences
    if (index < content.experience.length - 1) {
      drawLine(yPosition - 2, colors.border, 0.2);
      yPosition += 3;
    }
  });

  // Skills Section
  checkPageBreak(50);
  drawLine(yPosition - 3, colors.border, 0.3);
  yPosition += 5;

  addText(lang === 'en' ? 'Technical Skills' : 'Habilidades Técnicas', margin, yPosition, {
    fontSize: 18,
    fontStyle: 'bold',
    color: colors.purple
  });
  drawAccentLine(yPosition - 2);
  yPosition += 10;

  const skills = content.skills as SkillSet;
  const skillEntries = Object.entries(skills);

  skillEntries.forEach(([category, items], catIndex) => {
    checkPageBreak(20);

    // Category with background
    const categoryLines = doc.splitTextToSize(category, contentWidth - 4);
    const categoryHeight = categoryLines.length * 5 + 3;
    
    // Category background
    drawRect(margin, yPosition - 4, contentWidth, categoryHeight, colors.bgLight);
    
    // Category Title
    addText(category, margin + 2, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: colors.purple
    });
    yPosition += 7;

    // Skills list - simple and clean
    const skillList = typeof items === 'string' ? items.split(', ') : [];
    const skillsText = skillList.join(' • ');
    const skillLines = doc.splitTextToSize(skillsText, contentWidth - 4);
    
    skillLines.forEach((line: string) => {
      addText(line, margin + 2, yPosition, {
        fontSize: 9.5,
        color: colors.text,
        align: 'left'
      });
      yPosition += 4.5;
    });
    yPosition += 6;
  });

  // Education Section (if exists)
  if (content.education && content.education.length > 0) {
    checkPageBreak(25);
    drawLine(yPosition - 3, colors.border, 0.3);
    yPosition += 5;

    addText(lang === 'en' ? 'Education' : 'Educación', margin, yPosition, {
      fontSize: 18,
      fontStyle: 'bold',
      color: colors.purple
    });
    drawAccentLine(yPosition - 2);
    yPosition += 10;

    content.education.forEach((edu) => {
      checkPageBreak(15);
      
      // Education item with background
      const eduHeight = 12;
      drawRect(margin, yPosition - 4, contentWidth, eduHeight, colors.bgLight);
      
      addText(edu.degree, margin + 2, yPosition, {
        fontSize: 12,
        fontStyle: 'bold',
        color: colors.text
      });
      yPosition += 6;

      addText(`${edu.institution} • ${edu.year}`, margin + 2, yPosition, {
        fontSize: 10,
        color: colors.textSecondary
      });
      yPosition += 8;
    });
  }

  // Footer with modern design
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Footer line
    drawLine(pageHeight - 12, colors.border, 0.3);
    
    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `${profile.name} - ${lang === 'en' ? 'Curriculum Vitae' : 'Currículum Vitae'}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
    doc.text(
      `${i} / ${totalPages}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  }

  // Generate filename
  const filename = `${profile.name.replace(/\s+/g, '_')}_CV_${lang.toUpperCase()}.pdf`;
  
  // Save PDF
  doc.save(filename);
};

