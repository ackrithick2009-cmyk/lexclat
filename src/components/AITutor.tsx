import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  ChevronRight, 
  Zap, 
  Loader2, 
  Scale, 
  Lock, 
  Download, 
  Lightbulb,
  BookOpen,
  Target,
  BrainCircuit,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Library,
  HelpCircle,
  FileSearch,
  Sparkles
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  doc,
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { getLegalTutorResponse, clearClatDoubt } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';
import { User as FirebaseUser } from 'firebase/auth';

interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: any;
  feedback?: number;
}

interface AITutorProps {
  user: FirebaseUser | null;
  hasPremiumAccess: boolean;
  initialQuery?: string | null;
  onQueryHandled?: () => void;
}

const SUGGESTED_PROMPTS = [
  { text: "Explain strict liability in Torts.", icon: <Scale size={14} /> },
  { text: "Analyze a complex English passage.", icon: <BookOpen size={14} /> },
  { text: "Help me with a syllogism problem.", icon: <BrainCircuit size={14} /> },
  { text: "How to approach Quant caselets?", icon: <Target size={14} /> }
];

const AITutor = ({ user, hasPremiumAccess, initialQuery, onQueryHandled }: AITutorProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thoughtState, setThoughtState] = useState('Analyzing patterns...');
  const [mode, setMode] = useState<'CHAT' | 'DOUBT'>('CHAT');
  const [doubtMode, setDoubtMode] = useState<'TERMINOLOGY' | 'STRATEGY' | 'GENERAL'>('GENERAL');
  const [doubtResult, setDoubtResult] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle initial query from Study Planner
  useEffect(() => {
    if (initialQuery && !isTyping) {
      if (initialQuery.toLowerCase().includes('how to') || initialQuery.toLowerCase().includes('strategy')) {
        setMode('DOUBT');
        setDoubtMode('STRATEGY');
      }
      handleSend(initialQuery);
      if (onQueryHandled) onQueryHandled();
    }
  }, [initialQuery]);

  const thoughtCycles = [
    "Consulting Jurisdictional Precedents...",
    "Breaking down logical structures...",
    "Scanning linguistic nuances...",
    "Mapping score-density frameworks...",
    "Synthesizing mentor feedback..."
  ];

  useEffect(() => {
    let interval: any;
    if (isTyping) {
      let i = 0;
      interval = setInterval(() => {
        setThoughtState(thoughtCycles[i % thoughtCycles.length]);
        i++;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  useEffect(() => {
    if (!user) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: "Welcome to Juris Elite, Aspirant. I am Lexie, your analytical proxy. I am equipped to help you with Legal Reasoning, English, Logic, Quants, and Current Affairs. \n\nI've recently been upgraded to prioritize **inference-heavy analysis**, **legal principles application**, and **real-time doubt clearing**. How can I help you sharpen your reasoning today?",
        createdAt: new Date()
      }]);
      return;
    }
    const q = query(
      collection(db, 'users', user.uid, 'chats'),
      orderBy('createdAt', 'asc'),
      limit(50)
    );
    return onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}/chats`);
    });
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollTimeout = setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
      return () => clearTimeout(scrollTimeout);
    }
  }, [messages, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isTyping) return;

    if (!hasPremiumAccess && messages.filter(m => m.role === 'user').length >= 10) {
      toast.error("Standard Trial Limit Exceeded. Upgrade to Juris Elite Gold.");
      return;
    }

    const userMsg = textToSend.trim();
    if (!customText) setInput('');
    setIsTyping(true);

    if (mode === 'DOUBT') {
      try {
        const result = await clearClatDoubt(userMsg, doubtMode);
        setDoubtResult(result);
        
        // Also add to chat for persistence if logged in
        if (user) {
          const chatPath = `users/${user.uid}/chats`;
          await addDoc(collection(db, chatPath), {
            role: 'user',
            content: `[Doubt Mode: ${doubtMode}] ${userMsg}`,
            createdAt: serverTimestamp()
          });

          await addDoc(collection(db, chatPath), {
            role: 'assistant',
            content: result.explanation + (result.example ? `\n\n**Example:** ${result.example}` : '') + (result.landmark !== 'N/A' ? `\n\n**Landmark Case:** ${result.landmark}` : ''),
            createdAt: serverTimestamp()
          });
        } else {
           setMessages(prev => [
             ...prev, 
             { role: 'user', content: userMsg, createdAt: new Date() },
             { role: 'assistant', content: result.explanation, createdAt: new Date() }
           ] as ChatMessage[]);
        }
      } catch (err) {
        toast.error("Lexie could not resolve this doubt. Retrying connectivity...");
      } finally {
        setIsTyping(false);
      }
      return;
    }

    if (!user) {
      const newMsgs = [...messages, { role: 'user', content: userMsg, createdAt: new Date() } as ChatMessage];
      setMessages(newMsgs);
      try {
        const response = await getLegalTutorResponse(newMsgs, userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: response || "Analysis failure.", createdAt: new Date() } as ChatMessage]);
      } catch (err) {
        toast.error("AI Link Interrupted.");
      } finally {
        setIsTyping(false);
      }
      return;
    }

    try {
      const chatPath = `users/${user.uid}/chats`;
      await addDoc(collection(db, chatPath), {
        role: 'user',
        content: userMsg,
        createdAt: serverTimestamp()
      });

      const response = await getLegalTutorResponse(messages, userMsg);

      await addDoc(collection(db, chatPath), {
        role: 'assistant',
        content: response || "Analytical failure. Please rephrase your query.",
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/chats`);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFeedback = async (messageId: string, rating: number) => {
    if (!user) {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, feedback: rating } : m));
      toast.info("Feedback registered locally.");
      return;
    }

    try {
      const msgRef = doc(db, 'users', user.uid, 'chats', messageId);
      await updateDoc(msgRef, { feedback: rating });
      toast.success("Feedback submitted. Lexie is learning!");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}/chats/${messageId}`);
    }
  };

  const downloadTranscript = () => {
    const text = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lexie_Tutor_Transcript_${new Date().toLocaleDateString()}.txt`;
    a.click();
    toast.success("Transcript Downloaded.");
  };

  return (
    <div className="font-sans overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-32"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="h-px w-8 bg-primary" />
             <h2 className="text-xs text-primary font-bold tracking-[0.4em] uppercase">Mentorship v5.0</h2>
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif font-medium text-white mb-8 leading-tight">
            Consult the <br /><span className="italic text-primary border-b-2 border-primary/20 pb-1">AI Mentor.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md font-light">
            Lexie is now powered by the 2025 inference engine, specializing in logic-gap identification and high-order reasoning across all CLAT domains.
          </p>
          
          <div className="grid gap-6">
            <div className="flex bg-accent/30 border border-border p-1 rounded-none mb-2">
               <button 
                onClick={() => setMode('CHAT')}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'CHAT' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
               >
                 <MessageSquare className="inline-block mr-2" size={14} /> AI Mentor
               </button>
               <button 
                onClick={() => setMode('DOUBT')}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'DOUBT' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
               >
                 <HelpCircle className="inline-block mr-2" size={14} /> Doubt Hub
               </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'CHAT' ? (
                <motion.div 
                  key="chat-opt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-accent/50 border border-border p-6 rounded-none group hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                      <Lightbulb size={20} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Suggested Drills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                      {SUGGESTED_PROMPTS.map((p, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleSend(p.text)}
                          className="px-4 py-2 bg-background border border-border text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                        >
                          {p.icon} {p.text}
                        </button>
                      ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="doubt-opt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-primary/5 border border-primary/20 p-6 rounded-none space-y-4"
                >
                  <div className="flex items-center gap-4 mb-2">
                      <Sparkles size={20} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Doubt Clearing Engine</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'TERMINOLOGY', label: 'Legal Terminology', icon: <Library size={12} /> },
                      { id: 'STRATEGY', label: 'Study Strategy', icon: <Target size={12} /> },
                      { id: 'GENERAL', label: 'General Queries', icon: <Search size={12} /> }
                    ].map((d) => (
                      <button 
                        key={d.id}
                        onClick={() => setDoubtMode(d.id as any)}
                        className={`flex items-center gap-3 px-4 py-3 border text-[9px] font-black uppercase tracking-widest transition-all ${doubtMode === d.id ? 'bg-primary text-black border-primary' : 'bg-background text-gray-400 border-border hover:border-primary/50'}`}
                      >
                        {d.icon} {d.label}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
                      Lexie's doubt engine uses deterministic legal parsing to provide 100% accurate conceptual breakdowns for {doubtMode === 'TERMINOLOGY' ? 'complex legal terms.' : doubtMode === 'STRATEGY' ? 'preparation bottlenecks.' : 'subject-specific queries.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-4 p-6 border-l-4 border-primary bg-surface shadow-2xl">
               <div className="shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Download size={20} />
               </div>
               <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Session Archival</h4>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em]">Download your mentorship transcripts for offline revision.</p>
                  <button onClick={downloadTranscript} className="text-[9px] text-primary font-bold uppercase mt-2 hover:underline">Download Current Session</button>
               </div>
            </div>
          </div>
        </motion.div>
        
        <div className="h-[calc(100dvh-240px)] lg:h-[750px] flex flex-col bg-surface border border-border relative overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-border bg-accent/30 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                 <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                 <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <div>
                <div className="font-serif text-xl italic text-white leading-none">Lexie AI Mentor</div>
                <div className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-1 uppercase">Active Monitoring • v5.0</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest mr-4">
                 <Zap size={10} className="text-primary" /> Multi-Domain Auth
              </div>
              <div className="text-[10px] font-bold text-primary tracking-widest uppercase border border-primary/30 px-3 py-1">Secure</div>
            </div>
          </div>
          
          <ScrollArea viewport_ref={scrollRef} className="flex-1 overflow-hidden bg-[#0C0F14]">
            <div className="p-4 md:p-8 space-y-10">
              {doubtResult && mode === 'DOUBT' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 border border-primary/30 p-8 space-y-6 mb-10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary text-black">
                        {doubtMode === 'TERMINOLOGY' ? <Library size={16} /> : doubtMode === 'STRATEGY' ? <Target size={16} /> : <Search size={16} />}
                      </div>
                      <h3 className="text-xl font-serif text-white italic">{doubtResult.brief}</h3>
                    </div>
                    <button onClick={() => setDoubtResult(null)} className="text-[10px] text-gray-500 uppercase hover:text-white font-black">Clear Result</button>
                  </div>

                  <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:text-sm prose-p:leading-relaxed prose-strong:text-primary">
                    <ReactMarkdown>{doubtResult.explanation}</ReactMarkdown>
                  </div>

                  {doubtResult.example && (
                    <div className="bg-accent/40 p-4 border-l-2 border-primary">
                      <div className="text-[9px] text-primary font-black uppercase tracking-widest mb-2">Practical Scenario</div>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed italic">{doubtResult.example}</p>
                    </div>
                  )}

                  {doubtResult.landmark !== 'N/A' && doubtResult.landmark && (
                    <div className="flex items-center gap-4 py-3 border-y border-white/5">
                      <Scale size={14} className="text-primary" />
                      <div>
                        <div className="text-[8px] text-gray-600 font-bold uppercase tracking-widest leading-none mb-1">Landmark Reference</div>
                        <div className="text-[11px] text-white font-serif italic">{doubtResult.landmark}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4">
                    <Zap size={14} className="text-orange-500 animate-pulse" />
                    <div>
                      <div className="text-[8px] text-orange-500 font-bold uppercase tracking-widest leading-none mb-1">Lexie Action Item</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{doubtResult.actionItem}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 0 && !isTyping && !doubtResult && (
                <div className="text-center py-24 space-y-8 max-w-sm mx-auto">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <Scale size={64} className="relative mx-auto text-primary animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-serif text-white italic tracking-tighter">Your Judicial <br /> Consultation Starts Here.</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-relaxed px-6">
                      Ask about specific doctrines, landmark cases, or strategic advice for your preparation. I am trained on the latest CLAT patterns and judicial shifts.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 pt-6">
                     {[
                       "Explain the Doctrine of Basic Structure.",
                       "How to manage time in the Legal Reasoning section?",
                       "Analyze the impact of the new BNS laws on CLAT."
                     ].map((prompt, i) => (
                       <button 
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="text-[9px] text-primary/60 hover:text-primary transition-colors uppercase tracking-widest border border-primary/10 hover:border-primary/40 px-4 py-2 bg-accent/20"
                       >
                         "{prompt}"
                       </button>
                     ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className="flex flex-col space-y-2 text-white"
                >
                   <div className={`text-[10px] uppercase tracking-widest ${m.role === 'user' ? 'text-right text-primary' : 'text-left text-gray-500'}`}>
                    {m.role === 'user' ? 'YOU • ASPIRANT' : 'LEXIE • AI MENTOR'}
                  </div>
                  <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex flex-col gap-2 max-w-[90%]">
                      <div className={`p-6 text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-black font-bold rounded-none border-none' : 'bg-accent/40 text-gray-300 border-l-2 border-primary shadow-lg backdrop-blur-sm'}`}>
                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:p-4 prose-sm prose-li:my-1 font-sans">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      </div>
                      
                      {m.role === 'assistant' && (
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Helpfulness:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => m.id && handleFeedback(m.id, star)}
                                className={`transition-all hover:scale-125 ${star <= (m.feedback || 0) ? 'text-primary' : 'text-gray-700'}`}
                              >
                                <Star 
                                  size={10} 
                                  fill={star <= (m.feedback || 0) ? "currentColor" : "transparent"} 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-accent border-l-2 border-primary p-6 flex flex-col gap-4 w-72 shadow-2xl">
                    <div className="flex items-center gap-3">
                       <Loader2 className="animate-spin text-primary" size={14} />
                       <span className="text-[10px] text-gray-300 font-black tracking-widest uppercase">{thoughtState}</span>
                    </div>
                    <div className="w-full bg-background h-[2px] overflow-hidden">
                       <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="w-1/2 h-full bg-primary shadow-[0_0_10px_#FFD700]"
                       />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 md:p-8 border-t border-border bg-surface shrink-0 z-10 safe-bottom">
            {!hasPremiumAccess && (
              <div className="bg-primary p-4 mb-4 flex items-center justify-between text-[11px] font-black uppercase tracking-tighter text-black">
                <span className="flex items-center gap-2"><Lock size={12} /> {user ? `${10 - messages.filter(m => m.role === 'user').length} SESSIONS REMAINING` : 'AUTHENTICATION REQUIRED'}</span>
                <a href="#pricing" className="bg-black text-white px-4 py-2 hover:opacity-80 transition-opacity uppercase tracking-widest text-[10px]">UPGRADE</a>
              </div>
            )}
            <div className="relative group">
              <input 
                placeholder={mode === 'DOUBT' ? `Enter ${doubtMode.toLowerCase()} query...` : user ? "Analyze legal principle or logic..." : "Ask Lexie anything (Guest Mode)..."}
                disabled={isTyping}
                className="w-full bg-black border border-border p-6 text-sm focus:outline-none focus:border-primary text-white font-sans placeholder:text-gray-700 transition-all focus:ring-1 focus:ring-primary/20 pr-32"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <button 
                  className="bg-accent/50 p-3 text-primary border border-primary/20 hover:bg-primary hover:text-black transition-all group/icon"
                  title="Voice Command"
                >
                  <Zap size={14} className="group-hover/icon:scale-110" />
                </button>
                <button 
                  className="text-primary disabled:opacity-30 hover:scale-110 active:scale-95 transition-all" 
                  onClick={() => handleSend()} 
                  disabled={isTyping || !input.trim()}
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
               <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-medium italic font-serif">Mentorship active • v5.0.4-Inference</p>
               <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                 <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                 <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
