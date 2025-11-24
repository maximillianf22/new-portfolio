import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { data } from '../data';
import { trackEvent } from '../utils/analytics';

const formatMarkdown = (text: string): string => {
  let html = text;
  
  const codeBlocks: string[] = [];
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const id = `CODE_BLOCK_${codeBlocks.length}`;
    codeBlocks.push(match);
    return id;
  });

  codeBlocks.forEach((block, index) => {
    const language = block.match(/```(\w+)?/)?.[1] || '';
    let code = block.replace(/```[\w]*\n?/g, '').replace(/```/g, '').trim();
    
    code = code
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map(line => line.replace(/\s+$/, ''))
      .filter(line => line.trim() !== '')
      .join('\n');
    
    html = html.replace(
      `CODE_BLOCK_${index}`,
      `<pre class="bg-neutral-900 border border-neutral-800 rounded-lg p-3 overflow-x-auto my-2" style="line-height: 1.2; margin: 0;"><code class="text-xs text-neutral-300 font-mono block" style="line-height: 1.2; display: block; white-space: pre;">${escapeHtml(code)}</code></pre>`
    );
  });

  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-neutral-300">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-neutral-900 text-purple-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300 underline">$1</a>');

  const paragraphs = html.split(/\n\n+/).filter(p => p.trim() !== '');
  const formattedParagraphs = paragraphs.map(p => {
    const cleaned = p.trim().replace(/\n/g, '<br/>');
    return cleaned ? `<p class="mb-2">${cleaned}</p>` : '';
  }).filter(p => p !== '').join('');

  return formattedParagraphs || `<p>${html.replace(/\n/g, '<br/>')}</p>`;
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

interface AIPlaygroundProps {
    lang: 'en' | 'es';
}

export const AIPlayground: React.FC<AIPlaygroundProps> = ({ lang }) => {
  const INITIAL_MESSAGE: ChatMessage = {
    id: 'init',
    role: 'assistant',
    text: lang === 'en' 
        ? "Hello! I'm Max's AI assistant. Ask me about his stack, his availability, or his favorite coffee."
        : "¡Hola! Soy el asistente IA de Max. Pregúntame sobre su stack, disponibilidad o proyectos.",
  };

  const PRESET_QUESTIONS = lang === 'en' ? [
    "What is Max's tech stack?",
    "Is Max available for freelance?",
    "View GitHub Profile",
    "Tell me a dev joke"
  ] : [
    "¿Cuál es el stack técnico de Max?",
    "¿Max está disponible para proyectos?",
    "Ver perfil de GitHub",
    "Cuéntame un chiste de dev"
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes if chat hasn't started
  useEffect(() => {
     if(messages.length === 1 && messages[0].id === 'init') {
         setMessages([{ ...INITIAL_MESSAGE, id: 'init' }]);
     }
  }, [lang]);

  const buildContext = () => {
    const content = lang === 'en' ? data.english : data.spanish;
    const profile = data.profile;
    
    const experienceText = content.experience.map(exp => 
      `${exp.role} at ${exp.company} (${exp.location}) - ${exp.dates}\n${exp.highlights.map(h => `- ${h}`).join('\n')}`
    ).join('\n\n');
    
    const skillsText = Object.entries(content.skills).map(([category, items]) => 
      `${category}: ${typeof items === 'string' ? items : items.join(', ')}`
    ).join('\n');
    
    return `You are an AI assistant representing Maximillian Fernandez, a Technical Product Lead & Senior Frontend Developer.

PROFILE:
- Name: ${profile.name}
- Location: ${profile.location}
- Email: ${profile.email}
- Headline: ${content.headline}
- Summary: ${content.summary}

PROFESSIONAL EXPERIENCE:
${experienceText}

TECHNICAL SKILLS:
${skillsText}

INSTRUCTIONS:
- Answer questions about Max's experience, skills, availability, and projects
- Be professional, friendly, and concise
- If asked about availability or hiring, mention he's open to new opportunities
- Always respond in ${lang === 'en' ? 'English' : 'Spanish'}
- If you don't know something specific, suggest contacting Max directly at ${profile.email}`;
  };

  const getSimulatedResponse = (question: string): string => {
    const content = lang === 'en' ? data.english : data.spanish;
    const profile = data.profile;
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('stack') || questionLower.includes('tecnolog') || questionLower.includes('tech')) {
      const skills = Object.entries(content.skills).map(([cat, items]) => 
        `${cat}: ${typeof items === 'string' ? items : items.join(', ')}`
      ).join('\n');
      return lang === 'en' 
        ? `Max's tech stack includes:\n\n${skills}\n\nHe specializes in modern frontend architectures, particularly with Next.js, React, and TypeScript.`
        : `El stack técnico de Max incluye:\n\n${skills}\n\nSe especializa en arquitecturas frontend modernas, particularmente con Next.js, React y TypeScript.`;
    }
    
    if (questionLower.includes('disponib') || questionLower.includes('available') || questionLower.includes('freelance') || questionLower.includes('proyecto')) {
      return lang === 'en'
        ? `Yes! Max is open to new opportunities, freelance projects, and collaborations. You can reach him directly at ${profile.email} or through his LinkedIn profile.`
        : `¡Sí! Max está abierto a nuevas oportunidades, proyectos freelance y colaboraciones. Puedes contactarlo directamente en ${profile.email} o a través de su perfil de LinkedIn.`;
    }
    
    if (questionLower.includes('github') || questionLower.includes('repositorio') || questionLower.includes('code')) {
      return lang === 'en'
        ? `You can find Max's GitHub profile at: https://github.com/maximillianf22\n\nHe has several projects showcasing his frontend expertise, including modern React applications and Next.js architectures.`
        : `Puedes encontrar el perfil de GitHub de Max en: https://github.com/maximillianf22\n\nTiene varios proyectos que muestran su experiencia en frontend, incluyendo aplicaciones React modernas y arquitecturas Next.js.`;
    }
    
    if (questionLower.includes('chiste') || questionLower.includes('joke') || questionLower.includes('humor')) {
      const jokes = lang === 'en' ? [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "Why did the developer go broke? Because he used up all his cache! 💰"
      ] : [
        "¿Por qué los programadores prefieren el modo oscuro? ¡Porque la luz atrae bugs! 🐛",
        "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, ¡eso es un problema de hardware! 💡",
        "¿Por qué el desarrollador se quedó sin dinero? ¡Porque usó toda su caché! 💰"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    if (questionLower.includes('experiencia') || questionLower.includes('experience') || questionLower.includes('trabajo') || questionLower.includes('work')) {
      const exp = content.experience[0];
      return lang === 'en'
        ? `Max is currently ${exp.role} at ${exp.company} in ${exp.location}. He has extensive experience in frontend development, technical leadership, and product development. For more details, check out his full experience section on the portfolio.`
        : `Max actualmente es ${exp.role} en ${exp.company} en ${exp.location}. Tiene amplia experiencia en desarrollo frontend, liderazgo técnico y desarrollo de productos. Para más detalles, revisa su sección completa de experiencia en el portafolio.`;
    }
    
    if (questionLower.includes('hola') || questionLower.includes('hello') || questionLower.includes('hi') || questionLower.includes('saludo')) {
      return lang === 'en'
        ? `Hello! I'm Max's AI assistant. I can tell you about his tech stack, availability, projects, and more. What would you like to know?`
        : `¡Hola! Soy el asistente IA de Max. Puedo contarte sobre su stack técnico, disponibilidad, proyectos y más. ¿Qué te gustaría saber?`;
    }
    
    return lang === 'en'
      ? `I can help you learn about Max's technical skills, experience, availability, and projects. Feel free to ask specific questions, or contact Max directly at ${profile.email} for detailed inquiries.`
      : `Puedo ayudarte a conocer las habilidades técnicas, experiencia, disponibilidad y proyectos de Max. Siéntete libre de hacer preguntas específicas, o contacta a Max directamente en ${profile.email} para consultas detalladas.`;
  };

  const callDeepSeekAPI = async (question: string) => {
    const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
    
    if (!DEEPSEEK_API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return getSimulatedResponse(question);
    }
    
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
    const systemPrompt = buildContext();
    
    const conversationHistory = messages
      .filter(msg => msg.id !== 'init')
      .map(msg => ({
        role: msg.role,
        content: msg.text
      }));
    
    try {
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: question }
          ],
          stream: false,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || getSimulatedResponse(question);
    } catch (error) {
      console.error('Error calling DeepSeek API, using simulated response:', error);
      return getSimulatedResponse(question);
    }
  };

  const simulateResponse = async (question: string) => {
    setIsTyping(true);
    
    const newMessageId = `assistant-${Date.now()}`;
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.role === 'user') {
        return [...prev, { id: newMessageId, role: 'assistant', text: "", isTyping: true }];
      }
      return prev;
    });
    
    try {
      const responseText = await callDeepSeekAPI(question);
      
      let i = 0;
      const streamInterval = setInterval(() => {
        if (i < responseText.length) {
          setMessages(prev => {
            return prev.map(msg => 
              msg.id === newMessageId 
                ? { ...msg, text: responseText.substring(0, i + 1), isTyping: false } 
                : msg
            );
          });
          i++;
          scrollToBottom();
        } else {
          clearInterval(streamInterval);
          setMessages(prev => prev.map(msg => 
            msg.id === newMessageId ? { ...msg, isTyping: false } : msg
          ));
          setIsTyping(false);
        }
      }, 20);
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      const errorMessage = lang === 'en' 
        ? "Sorry, I'm having trouble connecting right now. Please try again later or contact Max directly."
        : "Lo siento, estoy teniendo problemas para conectarme. Por favor intenta más tarde o contacta a Max directamente.";
      
      setMessages(prev => prev.map(msg => 
        msg.id === newMessageId ? { ...msg, text: errorMessage, isTyping: false } : msg
      ));
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userText = inputValue.trim();
    const userMessageId = `user-${Date.now()}`;
    trackEvent('chat_interaction', { type: 'message_sent', length: userText.length });
    
    setMessages(prev => [...prev, { id: userMessageId, role: 'user', text: userText }]);
    setInputValue("");
    
    await new Promise(resolve => setTimeout(resolve, 50));
    scrollToBottom();
    simulateResponse(userText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSendMessage();
      }
  };

  const handleQuestionClick = async (question: string) => {
    if (isTyping) return;
    const userMessageId = `user-${Date.now()}`;
    trackEvent('chat_interaction', { type: 'preset_question', question });
    setMessages(prev => [...prev, { id: userMessageId, role: 'user', text: question }]);
    
    await new Promise(resolve => setTimeout(resolve, 50));
    scrollToBottom();
    simulateResponse(question);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  
  const resetChat = () => {
      setMessages([INITIAL_MESSAGE]);
      setIsTyping(false);
  }

  return (
    <section className="py-24 max-w-5xl mx-auto px-4">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Sparkles size={14} />
            <span>AI Playground</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{lang === 'en' ? "Ask the Digital Twin" : "Pregunta al Gemelo Digital"}</h2>
        <p className="text-neutral-400">{lang === 'en' ? "Experience a simulated conversation with my portfolio." : "Experimenta una conversación simulada con mi portafolio."}</p>
      </div>

      <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl h-[500px] flex flex-col relative">
        {/* Header */}
        <div className="h-14 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-white">MaxGPT-4.0</span>
            </div>
            <button 
                onClick={resetChat} 
                className="text-neutral-500 hover:text-white transition-colors"
                aria-label={lang === 'en' ? "Reset chat" : "Reiniciar chat"}
            >
                <RefreshCw size={16} />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth" ref={scrollRef}>
            <AnimatePresence>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-purple-600' : 'bg-neutral-700'}`}>
                            {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                            msg.role === 'assistant' 
                            ? 'bg-neutral-800 text-neutral-200 rounded-tl-none' 
                            : 'bg-white text-black rounded-tr-none'
                        }`}>
                            {msg.role === 'assistant' ? (
                                <div 
                                    className="markdown-content"
                                    dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }}
                                />
                            ) : (
                                <span>{msg.text}</span>
                            )}
                            {msg.isTyping && <span className="inline-block w-2 h-4 ml-1 bg-purple-400 animate-pulse align-middle"></span>}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {isTyping && messages.length > 0 && messages[messages.length - 1].role === 'user' && !messages.some(msg => msg.id.startsWith('assistant-') && msg.isTyping) && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-white" />
                    </div>
                    <div className="flex items-center gap-1 bg-neutral-800 rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="h-2 w-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-neutral-500 rounded-full animate-bounce"></div>
                    </div>
                 </motion.div>
            )}
        </div>

        {/* Input Area (Mock) */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/80">
            {/* Quick Prompts */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                {PRESET_QUESTIONS.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => handleQuestionClick(q)}
                        disabled={isTyping}
                        className="whitespace-nowrap px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/50 text-xs text-neutral-300 hover:bg-neutral-700 hover:text-white transition-all disabled:opacity-50"
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div className="relative">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={lang === 'en' ? "Type a message..." : "Escribe un mensaje..."}
                    disabled={isTyping}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-4 pr-12 text-sm text-neutral-400 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputValue.trim()}
                    aria-label={lang === 'en' ? "Send message" : "Enviar mensaje"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-neutral-800 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-700 transition-all disabled:opacity-30 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-500"
                >
                    <Send size={16} />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};