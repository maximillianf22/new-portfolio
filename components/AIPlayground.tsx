import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { data } from '../data';

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
         setMessages([INITIAL_MESSAGE]);
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

  const callDeepSeekAPI = async (question: string) => {
    const DEEPSEEK_API_KEY = 'sk-87f18d2938e8441b8e0f286f19730b52';
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
    
    const systemPrompt = buildContext();
    
    const conversationHistory = messages
      .filter(msg => msg.id !== 'init')
      .map(msg => ({
        role: msg.role,
        content: msg.text
      }));
    
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
    return data.choices[0]?.message?.content || (lang === 'en' ? 'Sorry, I could not generate a response.' : 'Lo siento, no pude generar una respuesta.');
  };

  const simulateResponse = async (question: string) => {
    setIsTyping(true);
    
    const newMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: newMessageId, role: 'assistant', text: "", isTyping: true }]);
    
    try {
      const responseText = await callDeepSeekAPI(question);
      
      // Streaming effect
      let i = 0;
      const streamInterval = setInterval(() => {
        if (i < responseText.length) {
          setMessages(prev => prev.map(msg => 
            msg.id === newMessageId ? { ...msg, text: responseText.substring(0, i + 1) } : msg
          ));
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

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userText = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setInputValue("");
    scrollToBottom();
    simulateResponse(userText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSendMessage();
      }
  };

  const handleQuestionClick = (question: string) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: question }]);
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
                            {msg.text}
                            {msg.isTyping && <span className="inline-block w-2 h-4 ml-1 bg-purple-400 animate-pulse align-middle"></span>}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {isTyping && messages[messages.length - 1].role === 'user' && (
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