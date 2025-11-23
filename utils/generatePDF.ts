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
  
  // Two-column layout
  const leftColumnWidth = 70; // Dark purple sidebar
  const rightColumnStart = leftColumnWidth;
  const rightColumnWidth = pageWidth - leftColumnWidth;
  const margin = 10;
  const leftMargin = margin;
  const rightMargin = rightColumnStart + margin;
  
  let leftY = margin;
  let rightY = margin;

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

  // Color scheme: Purple neon and black
  const colorHex = {
    darkPurple: '#1a0a2e', // Very dark purple/black
    neonPurple: '#a855f7', // Bright neon purple
    neonPurpleLight: '#c084fc', // Lighter neon purple
    white: '#ffffff',
    textDark: '#1a1a1a',
    textGray: '#4a4a4a',
    textLight: '#e5e7eb',
    bgLight: '#f3f4f6'
  };

  const colors = {
    darkPurple: hexToRgb(colorHex.darkPurple),
    neonPurple: hexToRgb(colorHex.neonPurple),
    neonPurpleLight: hexToRgb(colorHex.neonPurpleLight),
    white: hexToRgb(colorHex.white),
    textDark: hexToRgb(colorHex.textDark),
    textGray: hexToRgb(colorHex.textGray),
    textLight: hexToRgb(colorHex.textLight),
    bgLight: hexToRgb(colorHex.bgLight)
  };

  // Helper function to draw filled rectangle
  const drawRect = (x: number, y: number, w: number, h: number, color: [number, number, number]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, w, h, 'F');
  };

  // Helper function to draw circle
  const drawCircle = (x: number, y: number, radius: number, color: [number, number, number]) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.ellipse(x, y, radius, radius, 'F');
  };

  // Helper function to add text with styling
  const addText = (text: string, x: number, y: number, options: {
    fontSize?: number;
    fontStyle?: 'normal' | 'bold';
    color?: [number, number, number];
    align?: 'left' | 'center' | 'right';
  } = {}) => {
    const { fontSize = 12, fontStyle = 'normal', color = colors.textDark, align = 'left' } = options;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, x, y, { align });
  };

  // Helper function to check page break for right column
  const checkPageBreak = (requiredHeight: number, isLeft: boolean = false) => {
    const currentY = isLeft ? leftY : rightY;
    if (currentY + requiredHeight > pageHeight - margin) {
      doc.addPage();
      // Redraw left column background on new page
      drawRect(0, 0, leftColumnWidth, pageHeight, colors.darkPurple);
      if (isLeft) {
        leftY = margin;
      } else {
        rightY = margin;
      }
      return true;
    }
    return false;
  };

  const profile = data.profile;
  const content = lang === 'en' ? data.english : data.spanish;

  // Draw left column background (dark purple/black)
  drawRect(0, 0, leftColumnWidth, pageHeight, colors.darkPurple);

  // ========== LEFT COLUMN (Dark Purple Sidebar) ==========
  
  // Profile picture placeholder (circle)
  const profilePicRadius = 18;
  const profilePicX = leftColumnWidth / 2;
  const profilePicY = leftY + profilePicRadius + 8;
  
  // White circle background for profile pic with border
  drawCircle(profilePicX, profilePicY, profilePicRadius, colors.white);
  // Inner circle with dark purple
  drawCircle(profilePicX, profilePicY, profilePicRadius - 1.5, colors.darkPurple);
  
  leftY = profilePicY + profilePicRadius + 20;

  // Name in uppercase, white, bold, larger
  const nameParts = profile.name.split(' ');
  nameParts.forEach((part, idx) => {
    addText(part.toUpperCase(), leftColumnWidth / 2, leftY, {
      fontSize: 16,
      fontStyle: 'bold',
      color: colors.white,
      align: 'center'
    });
    leftY += 7;
  });
  leftY += 5;

  // Headline/Title in uppercase, neon purple
  addText(content.headline.toUpperCase(), leftColumnWidth / 2, leftY, {
    fontSize: 9,
    fontStyle: 'bold',
    color: colors.neonPurpleLight,
    align: 'center'
  });
  leftY += 12;

  // Contact Information Section
  const contactTitleHeight = 5;
  drawRect(leftMargin, leftY - 3, leftColumnWidth - (leftMargin * 2), contactTitleHeight, colors.neonPurpleLight);
  addText((lang === 'en' ? 'CONTACT' : 'CONTACTO').toUpperCase(), leftColumnWidth / 2, leftY, {
    fontSize: 10,
    fontStyle: 'bold',
    color: colors.white,
    align: 'center'
  });
  leftY += 10;

  // Contact items with icons (using symbols)
  const contactItems = [
    { icon: '📱', text: profile.phone },
    { icon: '✉️', text: profile.email },
    { icon: '🌐', text: profile.email.split('@')[1] || '' },
    { icon: '📍', text: profile.location }
  ].filter(item => item.text);

  contactItems.forEach((item) => {
    checkPageBreak(8, true);
    const contactText = `${item.icon} ${item.text}`;
    const contactLines = doc.splitTextToSize(contactText, leftColumnWidth - (leftMargin * 2));
    contactLines.forEach((line: string) => {
      addText(line, leftColumnWidth / 2, leftY, {
        fontSize: 8,
        color: colors.textLight,
        align: 'center'
      });
      leftY += 4;
    });
    leftY += 2;
  });

  // ========== RIGHT COLUMN (White Content Area) ==========
  
  rightY = margin + 5;

  // ABOUT ME / SUMMARY Section
  checkPageBreak(30, false);
  
  // Section title with purple background highlight
  const sectionTitleHeight = 6;
  drawRect(rightColumnStart + margin, rightY - 4, rightColumnWidth - (margin * 2), sectionTitleHeight, colors.neonPurpleLight);
  
  addText((lang === 'en' ? 'ABOUT ME' : 'SOBRE MÍ').toUpperCase(), rightColumnStart + margin + 3, rightY, {
    fontSize: 12,
    fontStyle: 'bold',
    color: colors.white,
    align: 'left'
  });
  rightY += 10;

  // Summary text
  const summaryLines = doc.splitTextToSize(content.summary, rightColumnWidth - (margin * 3));
  summaryLines.forEach((line: string) => {
    addText(line, rightColumnStart + margin, rightY, {
      fontSize: 9,
      color: colors.textDark,
      align: 'left'
    });
    rightY += 4.5;
  });
  rightY += 8;

  // SKILLS Section
  checkPageBreak(40, false);
  
  // Section title
  drawRect(rightColumnStart + margin, rightY - 4, rightColumnWidth - (margin * 2), sectionTitleHeight, colors.neonPurpleLight);
  addText((lang === 'en' ? 'SKILLS' : 'HABILIDADES').toUpperCase(), rightColumnStart + margin + 3, rightY, {
    fontSize: 12,
    fontStyle: 'bold',
    color: colors.white,
    align: 'left'
  });
  rightY += 10;

  // Skills with progress bars
  const skills = content.skills as SkillSet;
  const skillEntries = Object.entries(skills);
  
  skillEntries.forEach(([category, items]) => {
    checkPageBreak(15, false);
    
    // Category name
    addText(category, rightColumnStart + margin, rightY, {
      fontSize: 10,
      fontStyle: 'bold',
      color: colors.textDark,
      align: 'left'
    });
    rightY += 5;

    // Skills list
    const skillList = typeof items === 'string' ? items.split(', ') : [];
    const skillsText = skillList.join(' • ');
    const skillLines = doc.splitTextToSize(skillsText, rightColumnWidth - (margin * 3));
    
    skillLines.forEach((line: string) => {
      addText(line, rightColumnStart + margin, rightY, {
        fontSize: 8.5,
        color: colors.textGray,
        align: 'left'
      });
      rightY += 4;
    });
    rightY += 6;
  });

  // EXPERIENCES Section
  checkPageBreak(30, false);
  
  // Section title
  drawRect(rightColumnStart + margin, rightY - 4, rightColumnWidth - (margin * 2), sectionTitleHeight, colors.neonPurpleLight);
  addText((lang === 'en' ? 'EXPERIENCES' : 'EXPERIENCIAS').toUpperCase(), rightColumnStart + margin + 3, rightY, {
    fontSize: 12,
    fontStyle: 'bold',
    color: colors.white,
    align: 'left'
  });
  rightY += 10;

  // Timeline for experiences
  const timelineX = rightColumnStart + margin + 3;
  let timelineStartY = rightY;
  let lastExpY = rightY;

  content.experience.forEach((exp: ExperienceData, index: number) => {
    checkPageBreak(35, false);
    
    // Timeline dot
    drawCircle(timelineX, rightY + 3, 2, colors.neonPurple);
    
    // Draw timeline line (except for first item)
    if (index > 0) {
      doc.setDrawColor(colors.neonPurple[0], colors.neonPurple[1], colors.neonPurple[2]);
      doc.setLineWidth(0.5);
      doc.line(timelineX, lastExpY + 5, timelineX, rightY - 2);
    }
    
    // Company and dates
    addText(`${exp.company} ${exp.dates}`, timelineX + 6, rightY, {
      fontSize: 10,
      fontStyle: 'bold',
      color: colors.textDark,
      align: 'left'
    });
    rightY += 5;

    // Role
    addText(exp.role, timelineX + 6, rightY, {
      fontSize: 9,
      fontStyle: 'bold',
      color: colors.textGray,
      align: 'left'
    });
    rightY += 5;

    // Highlights
    exp.highlights.forEach((highlight: string) => {
      checkPageBreak(8, false);
      const highlightLines = doc.splitTextToSize(highlight, rightColumnWidth - (margin * 3) - 10);
      highlightLines.forEach((line: string) => {
        addText(`• ${line}`, timelineX + 6, rightY, {
          fontSize: 8.5,
          color: colors.textGray,
          align: 'left'
        });
        rightY += 4;
      });
      rightY += 2;
    });

    lastExpY = rightY;
    rightY += 8;
  });

  // EDUCATION Section
  if (content.education && content.education.length > 0) {
    checkPageBreak(25, false);
    
    // Section title
    drawRect(rightColumnStart + margin, rightY - 4, rightColumnWidth - (margin * 2), sectionTitleHeight, colors.neonPurpleLight);
    addText((lang === 'en' ? 'EDUCATION' : 'EDUCACIÓN').toUpperCase(), rightColumnStart + margin + 3, rightY, {
      fontSize: 12,
      fontStyle: 'bold',
      color: colors.white,
      align: 'left'
    });
    rightY += 10;

    content.education.forEach((edu) => {
      checkPageBreak(15, false);
      
      // Year
      addText(edu.year, rightColumnStart + margin, rightY, {
        fontSize: 10,
        fontStyle: 'bold',
        color: colors.neonPurple,
        align: 'left'
      });
      rightY += 5;

      // Institution
      addText(edu.institution, rightColumnStart + margin, rightY, {
        fontSize: 10,
        fontStyle: 'bold',
        color: colors.textDark,
        align: 'left'
      });
      rightY += 5;

      // Degree
      addText(edu.degree, rightColumnStart + margin, rightY, {
        fontSize: 9,
        color: colors.textGray,
        align: 'left'
      });
      rightY += 8;
    });
  }

  // Footer for all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Redraw left column background
    drawRect(0, 0, leftColumnWidth, pageHeight, colors.darkPurple);
    
    // Footer text in right column
    doc.setFontSize(7);
    doc.setTextColor(colors.textGray[0], colors.textGray[1], colors.textGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `${i} / ${totalPages}`,
      pageWidth - margin,
      pageHeight - 5,
      { align: 'right' }
    );
  }

  // Generate filename
  const filename = `${profile.name.replace(/\s+/g, '_')}_CV_${lang.toUpperCase()}.pdf`;
  
  // Save PDF
  doc.save(filename);
};
