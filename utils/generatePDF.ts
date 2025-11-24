import jsPDF from 'jspdf';
import { AppData, ExperienceData, SkillSet, EducationData, CertificationData } from '../types';

interface PDFOptions {
  data: AppData;
  lang: 'en' | 'es';
}

// Export function to generate PDF blob
export const generatePDFBlob = async ({ data, lang }: PDFOptions): Promise<Blob> => {
  try {
    const doc = await createPDFDocument(data, lang);
    const blob = doc.output('blob');
    return blob;
  } catch (error) {
    throw error;
  }
};

// Internal function to create PDF document
const createPDFDocument = async (data: AppData, lang: 'en' | 'es'): Promise<jsPDF> => {
  const profile = data.profile;
  const content = lang === 'en' ? data.english : data.spanish;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Load profile image
  let profileImage: string | null = null;
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const imageUrl = profile.avatar.startsWith('/') 
      ? `${window.location.origin}${profile.avatar}` 
      : profile.avatar;
    
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn('Could not load profile image');
        resolve(); // Continue without image
      };
      img.src = imageUrl;
    });
    
    if (img.complete && img.naturalWidth > 0) {
      const canvas = document.createElement('canvas');
      const maxSize = 200; // Max size for PDF
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw image without border radius
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        profileImage = canvas.toDataURL('image/jpeg', 0.9);
      }
    }
  } catch (error) {
    console.warn('Could not load profile image:', error);
  }

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = margin + 5;

  // Colors matching website
  const darkBg: [number, number, number] = [13, 13, 13]; // #0d0d0d
  const purple: [number, number, number] = [139, 92, 246];
  const white: [number, number, number] = [255, 255, 255];
  const gray: [number, number, number] = [163, 163, 163];
  const darkGray: [number, number, number] = [38, 38, 38];

  const newPage = () => {
    doc.addPage();
    y = margin + 5;
    // Apply dark background to new page
    doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.rect(0, 0, pageW, pageH, 'F');
  };

  const checkSpace = (h: number) => {
    if (y + h > pageH - margin - 20) {
      newPage();
      return true;
    }
    return false;
  };

  // Dark background for entire page
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Header with gradient overlay
  const headerHeight = 40;
  const headerPadding = 3; // Reduced padding for header content
  
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, headerHeight, 'F');
  
  // Gradient overlay: blue to purple (equivalent to bg-gradient-to-br from-blue-500/20 to-purple-500/20)
  // Simplified gradient without visible lines
  doc.setFillColor(59, 130, 246); // blue-500
  doc.setGState(doc.GState({ opacity: 0.2 }));
  doc.rect(0, 0, pageW, headerHeight, 'F');
  
  // Purple overlay for gradient effect
  doc.setFillColor(purple[0], purple[1], purple[2]);
  doc.setGState(doc.GState({ opacity: 0.2 }));
  doc.rect(0, 0, pageW, headerHeight, 'F');
  doc.setGState(doc.GState({ opacity: 1 }));

  // Name - Large, bold, white (moved up)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(white[0], white[1], white[2]);
  const nameLines = doc.splitTextToSize(profile.name.toUpperCase(), contentW);
  const nameHeight = nameLines.length * 8;
  doc.text(nameLines, margin, y + headerPadding);
  y += nameHeight + 1; // Reduced spacing after name

  // Profile image on the right side of header (after name)
  if (profileImage) {
    const imgWidth = 40; // Width in mm
    const imgHeight = 55; // Height in mm
    const imgX = pageW - margin - imgWidth;
    const imgY = headerPadding;
    
    // Add image without border radius
    try {
      doc.addImage(profileImage, 'JPEG', imgX, imgY, imgWidth, imgHeight, undefined, 'FAST');
    } catch (error) {
      console.warn('Could not add image to PDF:', error);
    }
  }

  // Headline - Purple (moved up)
  doc.setFontSize(13);
  doc.setTextColor(purple[0], purple[1], purple[2]);
  const headlineLines = doc.splitTextToSize(content.headline, contentW);
  const headlineHeight = headlineLines.length * 5;
  doc.text(headlineLines, margin, y);
  y += headlineHeight + 4; // Reduced spacing after headline

  // Contact info - Gray, smaller (moved up)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(gray[0], gray[1], gray[2]);
  const contact = `${profile.email} • ${profile.phone} • ${profile.location}`;
  doc.text(contact, margin, y);
  y += 4 + headerPadding; // Reduced padding at bottom of header

  // Professional Summary Section
  checkSpace(25);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(white[0], white[1], white[2]);
  doc.text(
    lang === 'en' ? 'PROFESSIONAL SUMMARY' : 'RESUMEN PROFESIONAL',
    margin,
    y
  );
  y += 7;

  // Purple accent line
  doc.setDrawColor(purple[0], purple[1], purple[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 40, y);
  y += 6;

  // Summary text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(gray[0], gray[1], gray[2]);
  const summaryLines = doc.splitTextToSize(content.summary, contentW);
  const summaryHeight = summaryLines.length * 4.8;
  doc.text(summaryLines, margin, y);
  y += summaryHeight + 10;

  // Professional Experience Section
  checkSpace(25);
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(white[0], white[1], white[2]);
  doc.text(
    lang === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'EXPERIENCIA PROFESIONAL',
    margin,
    y
  );
  y += 7;

  // Purple accent line
  doc.setDrawColor(purple[0], purple[1], purple[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 40, y);
  y += 7;

  content.experience.forEach((exp: ExperienceData, idx: number) => {
    if (idx > 0) {
      y += 3;
    }

    checkSpace(35);

      // Company badge - Dark gray background with rounded corners and border
      const badgeY = y;
      const badgeHeight = 7; // Increased height
      
      // Background - #1c1c1c
      doc.setFillColor(28, 28, 28); // #1c1c1c
      doc.roundedRect(margin, badgeY - 3, contentW, badgeHeight, 2, 2, 'F');
      
      // Border - #535353
      doc.setDrawColor(83, 83, 83); // #535353
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, badgeY - 3, contentW, badgeHeight, 2, 2, 'S');

      // Company name - Left aligned, centered vertically in badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(purple[0], purple[1], purple[2]);
      // Center text vertically in badge with slight offset upward
      doc.text(exp.company, margin + 3, badgeY - 3 + badgeHeight / 2 + 1.5);
      y += badgeHeight + 2;

    // Role - White, bold
    doc.setFontSize(10.5);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.text(exp.role, margin, y);
    y += 6;

    // Dates and Location - Gray
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(exp.dates, margin, y);
    const locW = doc.getTextWidth(exp.location);
    doc.text(exp.location, pageW - margin - locW, y);
    y += 6;

    // Highlights with purple bullets
    exp.highlights.forEach((hl: string, hlIdx: number) => {
      if (hlIdx > 0) {
        y += 2;
      }

      // Calculate actual height needed with proper line spacing
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const hlLines = doc.splitTextToSize(hl, contentW - 8);
      const lineHeight = 5.5;
      const hlHeight = hlLines.length * lineHeight;
      
      checkSpace(hlHeight + 10);

      // Purple bullet circle (rounded)
      doc.setFillColor(purple[0], purple[1], purple[2]);
      doc.circle(margin + 2, y - 1, 1.8, 'F');

      // Text with proper line spacing
      doc.setTextColor(gray[0], gray[1], gray[2]);
      hlLines.forEach((line: string, lineIdx: number) => {
        doc.text(line, margin + 6, y + (lineIdx * lineHeight));
      });
      y += hlHeight + 4;
    });

    y += 4;
  });

  // Consulting & Contract Section
  if (content.consulting && content.consulting.length > 0) {
    checkSpace(25);
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.text(
      lang === 'en' ? 'CONSULTING & CONTRACT' : 'CONSULTORÍA Y CONTRATOS',
      margin,
      y
    );
    y += 7;

    // Purple accent line
    doc.setDrawColor(purple[0], purple[1], purple[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 40, y);
    y += 7;

    content.consulting.forEach((exp: ExperienceData, idx: number) => {
      if (idx > 0) {
        y += 3;
      }

      checkSpace(35);

      // Company badge - Dark gray background with rounded corners and border
      const badgeY = y;
      const badgeHeight = 7;
      
      // Background - #1c1c1c
      doc.setFillColor(28, 28, 28);
      doc.roundedRect(margin, badgeY - 3, contentW, badgeHeight, 2, 2, 'F');
      
      // Border - #535353
      doc.setDrawColor(83, 83, 83);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, badgeY - 3, contentW, badgeHeight, 2, 2, 'S');

      // Company name - Left aligned, centered vertically in badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(purple[0], purple[1], purple[2]);
      doc.text(exp.company, margin + 3, badgeY - 3 + badgeHeight / 2 + 1.5);
      y += badgeHeight + 2;

      // Role - White, bold
      doc.setFontSize(10.5);
      doc.setTextColor(white[0], white[1], white[2]);
      doc.text(exp.role, margin, y);
      y += 6;

      // Duration and Location - Gray
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      const duration = exp.duration || exp.dates;
      doc.text(duration, margin, y);
      const locW = doc.getTextWidth(exp.location);
      doc.text(exp.location, pageW - margin - locW, y);
      y += 6;

    // Highlights with purple bullets
    exp.highlights.forEach((hl: string, hlIdx: number) => {
      if (hlIdx > 0) {
        y += 2;
      }

      // Calculate actual height needed with proper line spacing
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const hlLines = doc.splitTextToSize(hl, contentW - 8);
      const lineHeight = 5.5;
      const hlHeight = hlLines.length * lineHeight;
      
      checkSpace(hlHeight + 10);

      // Purple bullet circle (rounded)
      doc.setFillColor(purple[0], purple[1], purple[2]);
      doc.circle(margin + 2, y - 1, 1.8, 'F');

      // Text with proper line spacing
      doc.setTextColor(gray[0], gray[1], gray[2]);
      hlLines.forEach((line: string, lineIdx: number) => {
        doc.text(line, margin + 6, y + (lineIdx * lineHeight));
      });
      y += hlHeight + 4;
    });

      y += 4;
    });
  }

  // Technical Skills Section - New Page
  newPage();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(white[0], white[1], white[2]);
  doc.text(
    lang === 'en' ? 'TECHNICAL SKILLS' : 'HABILIDADES TÉCNICAS',
    margin,
    y
  );
  y += 7;

  // Purple accent line
  doc.setDrawColor(purple[0], purple[1], purple[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 40, y);
  y += 7;

  // Skills in card-like format
  Object.entries(content.skills as SkillSet).forEach(([category, items], catIdx: number) => {
    if (catIdx > 0) {
      y += 2;
    }

    // Calculate actual space needed before checking
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const skillsText = typeof items === 'string' ? items : items.join(', ');
    const skillsLines = doc.splitTextToSize(skillsText, contentW);
    const skillsHeight = skillsLines.length * 4.2;
    const totalHeight = 3 + skillsHeight + 3; // Category title + skills text + spacing

    checkSpace(totalHeight);

    // Category title - White
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.text(category + ':', margin, y);
    y += 5.5;

    // Skills as text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(skillsLines, margin, y);
    y += skillsHeight + 1;
  });

  // Certifications Section
  if (content.certifications && content.certifications.length > 0) {
    checkSpace(25);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(white[0], white[1], white[2]);
    doc.text(
      lang === 'en' ? 'CERTIFICATIONS & ACHIEVEMENTS' : 'CERTIFICACIONES Y LOGROS',
      margin,
      y
    );
    y += 7;

    // Purple accent line
    doc.setDrawColor(purple[0], purple[1], purple[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 40, y);
    y += 7;

    content.certifications.forEach((cert: CertificationData, idx: number) => {
      if (idx > 0) {
        y += 4;
      }

      // Calculate space needed
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const descLines = doc.splitTextToSize(cert.description, contentW - 4);
      const descHeight = descLines.length * 4.5;
      const totalHeight = 6 + descHeight + 4;

      checkSpace(totalHeight);

      // Certification title with purple bullet
      doc.setFillColor(purple[0], purple[1], purple[2]);
      doc.circle(margin + 2, y - 1, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(white[0], white[1], white[2]);
      doc.text(cert.title, margin + 6, y);
      y += 6;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(gray[0], gray[1], gray[2]);
      doc.text(descLines, margin + 6, y);
      y += descHeight + 2;
    });
  }

  // Footer on all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    
    // Footer line
    doc.setDrawColor(purple[0], purple[1], purple[2]);
    doc.setLineWidth(0.3);
    doc.setGState(doc.GState({ opacity: 0.3 }));
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
    doc.setGState(doc.GState({ opacity: 1 }));

    // Footer text
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray[0], gray[1], gray[2]);
    const footer = `${profile.name} - ${lang === 'en' ? 'CV' : 'CV'}`;
    doc.text(footer, pageW / 2, pageH - 8, { align: 'center' });
  }

  return doc;
};

// Main export function - navigates to preview URL
export const generatePDF = async ({ data, lang }: PDFOptions) => {
  try {
    const blob = await generatePDFBlob({ data, lang });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Maximillian_Fernandez_CV_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
