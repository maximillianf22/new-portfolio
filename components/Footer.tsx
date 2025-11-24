import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Facebook, Linkedin, Copy, Check, MessageCircle } from 'lucide-react';
import { SocialLink } from '../types';
import { data } from '../data';

interface FooterProps {
    email: string;
    lang: 'en' | 'es';
}

const socials: SocialLink[] = [
    { label: 'GitHub', href: data.profile.links.github, icon: Github },
    { label: 'LinkedIn', href: data.profile.links.linkedin, icon: Linkedin },
    { label: 'Facebook', href: data.profile.links.facebook, icon: Facebook },
    { label: 'WhatsApp', href: data.profile.links.whatsapp, icon: MessageCircle },
];

export const Footer: React.FC<FooterProps> = ({ email, lang }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="relative py-24 px-4 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter"
                >
                    {lang === 'en' ? "Let's build something " : "Construyamos algo "} 
                    <span className="text-purple-500">
                        {lang === 'en' ? "impossible" : "imposible"}
                    </span>.
                </motion.h2>
                
                <motion.button 
                    onClick={handleCopy}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-4 text-2xl md:text-4xl font-mono text-neutral-400 hover:text-white transition-colors mb-16 p-4 rounded-2xl hover:bg-white/5"
                >
                    {email}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-[-40px]">
                        {copied ? <Check className="text-green-500" /> : <Copy className="text-neutral-500" />}
                    </div>
                </motion.button>

                <div className="flex gap-6 mb-12">
                    {socials.map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${social.label}`}
                            whileHover={{ y: -5 }}
                            className="h-12 w-12 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                        >
                            {social.icon && <social.icon size={20} />}
                        </motion.a>
                    ))}
                </div>

                <div className="text-neutral-600 text-sm flex flex-col md:flex-row gap-4 items-center">
                    <p>© 2024 Maximillian Fernandez.</p>
                    <span className="hidden md:block">•</span>
                    <p>{lang === 'en' ? "Built with Next.js, Tailwind & Framer Motion." : "Construido con Next.js, Tailwind & Framer Motion."}</p>
                </div>
            </div>
        </footer>
    );
};
