import { LucideIcon } from 'lucide-react';

export interface ExperienceData {
  company: string;
  location: string;
  role: string;
  dates: string;
  highlights: string[];
}

export interface EducationData {
  degree: string;
  institution: string;
  year: string;
}

export interface SkillSet {
  "Frontend Architecture": string;
  "Modern UI & Styling": string;
  "AI & Innovation": string;
  "State & Data": string;
  "Product Design": string;
  "Tools & Methods": string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  description: string;
  url?: string;
  external?: boolean;
  tags?: string[];
  content?: string;
}

export interface LanguageContent {
  headline: string;
  sub_headline: string;
  summary: string;
  experience: ExperienceData[];
  skills: SkillSet;
  education: EducationData[];
  testimonials?: Testimonial[];
  articles?: Article[];
}

export interface ProfileData {
  name: string;
  phone: string;
  email: string;
  location: string;
  avatar: string;
  links: {
    linkedin: string;
    github: string;
    whatsapp: string;
  };
}

export interface AppData {
  profile: ProfileData;
  spanish: LanguageContent;
  english: LanguageContent;
  projects: ProjectItem[];
}

// Legacy types for UI components (can be refactored or kept for compatibility)
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  problem?: string;
  solution?: string;
  impact?: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isTyping?: boolean;
}