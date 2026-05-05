import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Search, Book, Scale, Shield, ChevronRight, Filter, Info, Star, Loader2, Bookmark, ArrowRight, Zap, Target, BookOpen, PlayCircle, Layers, CheckCircle, HelpCircle, Lightbulb, FileText, Lock, History, ShieldAlert, Cpu, Download, X, Maximize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { courseChapters, Chapter } from '../constants';

interface Doctrine {
  title: string;
  category: 'Constitutional' | 'Torts' | 'Contracts' | 'Criminal' | 'Logical Reasoning' | 'English' | 'Quantitative' | 'Legal Reasoning' | 'Intellectual Property' | 'Family Law' | 'Civil Procedure' | 'Evidence';
  summary: string;
  landmarkCase?: string;
  important: boolean;
  id?: string;
}

interface JurisArchiveProps {
  setView: (v: any) => void;
  setSelectedMockId: (id: string) => void;
}

const LOCAL_DOCTRINES: Doctrine[] = [
  {
    title: "Definition of State (Art 12)",
    category: "Constitutional",
    summary: "Includes Gov/Parliament of India, Gov/Leg of States, and all local/other authorities. Instrumentality tests include share capital, deep control, and public functions.",
    landmarkCase: "Ajay Hasia v. Khalid Mujib",
    important: true
  },
  {
    title: "Meaning of Law (Art 13)",
    category: "Constitutional",
    summary: "Wide connotation including ordinances, bye-laws, rules, and customs. Pre-constitutional laws are void to the extent of inconsistency with FRs.",
    important: true
  },
  {
    title: "Doctrine of Eclipse/Severability",
    category: "Constitutional",
    summary: "Eclipse: Laws contrary to FRs become dormant. Severability: Only the infringing part is void if separable from the whole act.",
    important: true
  },
  {
    title: "Assault vs Battery (Criminal)",
    category: "Criminal",
    summary: "Assault (Sec 351) is the apprehension of harm (no contact needed). Battery (Sec 352) is the actual physical contact with intent to harm.",
    landmarkCase: "Indian Penal Code Sections 351-352",
    important: true
  },
  {
    title: "Rules vs Standards",
    category: "Legal Reasoning",
    summary: "Rules are ex-ante advance determinations of permissible conduct (e.g. speed limits), while standards are ex-post determinations by adjudicators (e.g. 'harmful speed').",
    important: true
  },
  {
    title: "Strict Liability (Escaped Mischief)",
    category: "Legal Reasoning",
    summary: "If a person brings onto his land anything likely to do mischief if it escapes, he must keep it at his peril. Defense: Act of stranger or unforeseeable catastrophe.",
    landmarkCase: "Rylands v. Fletcher (Tiger Escape Scenario)",
    important: true
  },
  {
    title: "Duty to Warn (Psychologist's Duty)",
    category: "Torts",
    summary: "Professionals (like therapists) may have a duty to warn potential victims of a patient's credible threats, overriding professional confidentiality if a crime is imminent.",
    landmarkCase: "Soman vs Pamela (NLUD Case Study)",
    important: true
  },
  {
    title: "Obscenity: Hicklin vs Community Test",
    category: "Criminal",
    summary: "Hicklin Test (1868) focused on whether isolated passages 'deprave and corrupt' children. Modern 'Community Standards' test judges the work as a whole based on contemporary mores.",
    landmarkCase: "Regina v. Hicklin / Ranjit D. Udeshi",
    important: true
  },
  {
    title: "Competence to Contract (Sec 11)",
    category: "Contracts",
    summary: "A person is competent if they have attained the age of majority (18+), are of sound mind, and not disqualified by any law. Agreements with minors are void-ab-initio.",
    landmarkCase: "Mohiri Bibee v. Dharmodas Ghose",
    important: true
  },
  {
    title: "Doctrine of Res Judicata",
    category: "Civil Procedure",
    summary: "A matter once decided by a competent court cannot be litigated again between the same parties. It ensures finality to litigation.",
    landmarkCase: "Section 11, CPC / Daryao v. State of UP",
    important: true
  },
  {
    title: "Double Jeopardy",
    category: "Criminal",
    summary: "No person shall be prosecuted and punished for the same offence more than once. Applies only to judicial proceedings, not departmental enquiries.",
    landmarkCase: "Article 20(2) / Maqbool Hussain v. State of Bombay",
    important: true
  },
  {
    title: "Dying Declaration",
    category: "Evidence",
    summary: "A statement made by a person as to the cause of his death or circumstances of the transaction which resulted in his death. It is admissible as substantive evidence.",
    landmarkCase: "Section 32, Evidence Act / Pakala Narayana Swami",
    important: true
  },
  {
    title: "Doctrine of Privity",
    category: "Contracts",
    summary: "Only parties to a contract can sue or be sued upon it. A stranger to a contract cannot enforce it, even if made for his benefit.",
    landmarkCase: "Tweddle v Atkinson / Dunlop Pneumatic Tyre Co Ltd",
    important: true
  },
  {
    title: "Nuisance (Unreasonable Interference)",
    category: "Torts",
    summary: "Unlawful interference with a person's use or enjoyment of land, or some right over, or in connection with it.",
    landmarkCase: "Xandiapur Cricket Club Case Study",
    important: true
  },
  {
    title: "Writ of Mandamus",
    category: "Constitutional",
    summary: "A command issued by a court to a public authority to perform a public duty which it has failed to perform.",
    landmarkCase: "Article 32 & 226",
    important: true
  },
  {
    title: "DPDPA 2023 (Data Protection)",
    category: "Legal Reasoning",
    summary: "Digital Personal Data Protection Act. Regulates the processing of digital personal data. Establishes rights of Data Principals and obligations of Data Fiduciaries.",
    important: true
  },
  {
    title: "POCSO Act 2012",
    category: "Criminal",
    summary: "Protection of Children from Sexual Offences Act. Comprehensive law to protect children from offences of sexual assault, sexual harassment and pornography.",
    landmarkCase: "Justice U.U. Lalit (Skin-to-Skin judgment overturned)",
    important: true
  },
  {
    title: "Right to Information (RTI)",
    category: "Constitutional",
    summary: "RTI Act 2005 empowers citizens to secure access to information under control of public authorities, promoting transparency and accountability.",
    important: true
  },
  {
    title: "Information Technology Act, 2000",
    category: "Legal Reasoning",
    summary: "Primary law in India dealing with cybercrime and electronic commerce. Section 66A was struck down for violating freedom of speech.",
    landmarkCase: "Shreya Singhal v. Union of India",
    important: true
  },
  {
    title: "Doctrine of Severability",
    category: "Constitutional",
    summary: "If an Act is partially unconstitutional, only the offending portion is struck down, provided it can be separated from the rest of the Act.",
    landmarkCase: "A.K. Gopalan v. State of Madras",
    important: false
  },
  {
    title: "Doctrine of Eclipse",
    category: "Constitutional",
    summary: "A law that violates fundamental rights is not dead but remains in a 'moribund' state (eclipsed). If the fundamental right is later amended, the law becomes active again.",
    landmarkCase: "Bhikaji Narain Dhakras v. State of MP",
    important: false
  },
  {
    title: "Ratio Decidendi",
    category: "Legal Reasoning",
    summary: "The reason or ground for a judicial decision. It is the binding part of a precedent.",
    important: true
  },
  {
    title: "Obiter Dicta",
    category: "Legal Reasoning",
    summary: "Incidental remarks made by a judge in a judgment which do not form part of the core reasoning and are not binding.",
    important: false
  },
  {
    title: "Salus Populi Suprema Lex",
    category: "Constitutional",
    summary: "The welfare of the people is the paramount law. Often used to justify state actions in public interest.",
    important: true
  },
  {
    title: "Res Judicata",
    category: "Legal Reasoning",
    summary: "A matter once decided by a competent court cannot be litigated again between the same parties.",
    landmarkCase: "Daryao v State of UP",
    important: true
  },
  {
    title: "Pacta Sunt Servanda",
    category: "Legal Reasoning",
    summary: "Agreements must be kept. A fundamental principle of international and contract law.",
    important: false
  },
  {
    title: "Novation",
    category: "Legal Reasoning",
    summary: "The substitution of a new contract or obligation for an old one, by mutual agreement of all parties.",
    important: false
  },
  {
    title: "Juvenile Justice Act",
    category: "Criminal",
    summary: "Care and protection of children. Allows children aged 16-18 to be tried as adults for heinous offenses after assessment by JJB.",
    landmarkCase: "Nirbhaya Case (Impact)",
    important: true
  },
  {
    title: "Lokpal & Lokayuktas",
    category: "Legal Reasoning",
    summary: "Anti-corruption ombudsman at the Union (Lokpal) and State (Lokayukta) levels to investigate allegations against public servants.",
    important: true
  },
  {
    title: "Doctrine of Lapse",
    category: "Constitutional",
    summary: "Annexation policy applied by the British East India Company in India until 1859. If a ruler of a princely state died without a biological male heir, the state was annexed.",
    landmarkCase: "Satara, Jaitpur, Sambalpur, Jhansi",
    important: true
  },
  {
    title: "Preamble Significance",
    category: "Constitutional",
    summary: "Salient feature of the Constitution. In Keshavananda Bharati case, it was held that Preamble is part of the Constitution and can be used to interpret ambiguous areas.",
    landmarkCase: "Keshavananda Bharati v State of Kerala",
    important: true
  },
  {
    title: "Money Bill (Art 110)",
    category: "Constitutional",
    summary: "A bill is a Money Bill if it contains only provisions dealing with taxation, borrowing, etc. Speaker of Lok Sabha has final authority to certify a bill as a Money Bill.",
    important: true
  },
  {
    title: "RERA Act 2016",
    category: "Legal Reasoning",
    summary: "Real Estate Regulation and Development Act. Aimed at protecting home-buyers and boosting investment in the real estate sector.",
    important: false
  },
  {
    title: "Doctrine of Pith and Substance",
    category: "Constitutional",
    summary: "Used to determine which list (Union, State, Concurrent) a law belongs to by looking at its true nature rather than incidental encroachment on another field.",
    landmarkCase: "State of Bombay v. F.N. Balsara",
    important: true
  },
  {
    title: "Sine Die",
    category: "Legal Reasoning",
    summary: "Adjourned without fixing a date for the next meeting. Literally 'without a day'.",
    important: false
  },
  {
    title: "Tabula Rasa",
    category: "Legal Reasoning",
    summary: "A clean slate. In psychology/law, referring to a mind without pre-conceived notions.",
    important: false
  },
  {
    title: "Caveat Venditor",
    category: "Legal Reasoning",
    summary: "Seller beware. A principle that the seller is responsible for any defects in the goods sold.",
    important: true
  },
  {
    title: "Malus Animus",
    category: "Criminal",
    summary: "Evil intent or bad faith. Higher degree of planning compared to simple mens rea.",
    important: true
  },
  {
    title: "Strict vs Absolute Liability",
    category: "Torts",
    summary: "Strict liability (Rylands v Fletcher) allows for exceptions like Act of God. Absolute liability (MC Mehta v Union of India) has NO exceptions for enterprises engaged in hazardous activities.",
    landmarkCase: "MC Mehta v. Union of India (Oleum Gas Leak)",
    important: true
  }
];

const SAMPLE_PAPERS = [
  {
    id: "clat-2024",
    title: "CLAT 2024 Actual Paper",
    year: "2024",
    difficulty: "Advanced",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "Analyzing Bureaucracy reforms, the Delhi Services Act, and the Pusan Perimeter historical analysis."
  },
  {
    id: "clat-2023",
    title: "CLAT 2023 Actual Paper",
    year: "2023",
    difficulty: "Moderate",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "Focuses on Basic Structure Doctrine and International Strategic Partnerships."
  },
  {
    id: "quants-mastery-24",
    title: "Quants Mastery 2024",
    year: "2024",
    difficulty: "Challenging",
    sections: ["English", "Legal", "Logical", "GK", "Quant"],
    description: "High-intensity training set focused on Relative Speed, Alligation, and Linear Geometry."
  },
  {
    id: "philology-grammar-24",
    title: "Philology & Grammar 2024",
    year: "2024",
    difficulty: "Challenging",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "Deep dive into prepositional usage, Latin fragments, and historical dates."
  },
  {
    id: "lexicon-mastery-24",
    title: "Lexicon Mastery 2024",
    year: "2024",
    difficulty: "Moderate",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "Comprehensive test on Latin maxims, common errors, and world milestones."
  },
  {
    id: "grammar-usage-2024",
    title: "English & Writ Marathon 2024",
    year: "2024",
    difficulty: "Moderate",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "Focuses on prepositional mastery, writs like Mandamus, and DRDO milestones."
  },
  {
    id: "quants-drills-2024",
    title: "Quants Mastery Drill 2024",
    year: "2024",
    difficulty: "Advanced",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "Intensive training on Ratio, Average Speed, Mensuration, and Data Interpretation based on latest textbook patterns."
  },
  {
    id: "lexicon-gk-2024",
    title: "Legal Lexicon & GK 2024",
    year: "2024",
    difficulty: "Moderate",
    sections: ["English", "GK", "Legal"],
    description: "Specialized focus on Latin maxims, anagrams, and historical landmarks like Jallianwala Bagh."
  },
  {
    id: "mock-may-24",
    title: "AI Open Mock - May 2024",
    year: "2024",
    difficulty: "Elite",
    sections: ["English", "GK", "Legal", "Logical", "Quant"],
    description: "A high-fidelity simulation predicting the 2025 pattern with 400+ word passages."
  }
];

const JurisArchive = ({ setView, setSelectedMockId }: JurisArchiveProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'doctrines' | 'papers' | 'chapters'>('chapters');
  const [activeVideo, setActiveVideo] = useState<Chapter | null>(null);
  const [methodTab, setMethodTab] = useState<'traditional' | 'shortcut'>('traditional');
  const [sidebarTab, setSidebarTab] = useState<'steps' | 'cheat'>('steps');
  const [shortcutUnlocked, setShortcutUnlocked] = useState<Record<string, boolean>>({});
  const [lightningQuizActive, setLightningQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedFullChapter, setSelectedFullChapter] = useState<Chapter | null>(null);

  const unlockShortcut = (chapterId: string) => {
    setShortcutUnlocked(prev => ({ ...prev, [chapterId]: true }));
    setMethodTab('shortcut');
  };
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [dbDoctrines, setDbDoctrines] = useState<Doctrine[]>([]);
  const [dbMocks, setDbMocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const qDoc = query(collection(db, 'doctrines'));
    const unsubDoc = onSnapshot(qDoc, (snap) => {
      const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Doctrine));
      setDbDoctrines(data);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'doctrines');
    });

    const qMock = query(collection(db, 'mocks'));
    const unsubMock = onSnapshot(qMock, (snap) => {
      const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDbMocks(data);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'mocks');
      setLoading(false);
    });

    return () => {
      unsubDoc();
      unsubMock();
    };
  }, []);

  const combinedDoctrines = useMemo(() => {
    return [...LOCAL_DOCTRINES, ...dbDoctrines];
  }, [dbDoctrines]);

  const filteredDoctrines = useMemo(() => {
    return combinedDoctrines.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                           d.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? d.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, combinedDoctrines]);

  const filteredPapers = useMemo(() => {
    const combined = [...SAMPLE_PAPERS, ...dbMocks];
    return combined.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      (p.year && p.year.includes(search))
    );
  }, [search, dbMocks]);

  const categories = Array.from(new Set(combinedDoctrines.map(d => d.category)));

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 px-6 pt-10">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-border pb-12">
        {/* Full Syllabus Reader Overlay */}
        <AnimatePresence>
            {selectedFullChapter && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col pt-10"
                >
                    <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col relative px-6 overflow-hidden">
                        <div className="flex items-start justify-between mb-8 border-b border-white/10 pb-8">
                            <div className="space-y-2">
                                <Badge className="bg-primary/20 text-primary rounded-none text-[8px] tracking-[0.3em] font-black border-none h-5">Master Curriculum v5.0</Badge>
                                <h2 className="text-4xl font-serif italic text-white tracking-tighter leading-none">
                                    {selectedFullChapter.title}
                                </h2>
                            </div>
                            <button 
                                onClick={() => setSelectedFullChapter(null)}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar pb-32">
                            <div className="prose prose-invert prose-headings:font-serif prose-headings:italic prose-headings:tracking-tighter prose-headings:text-primary prose-p:font-serif prose-p:italic prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-li:text-gray-400 prose-hr:border-white/5 max-w-none">
                                <ReactMarkdown>
                                    {selectedFullChapter.fullSyllabusContent || "Detailed material is currently being digitized for this module. Refer to traditional methods."}
                                </ReactMarkdown>
                            </div>
                        </div>
                        
                        <div className="absolute bottom-10 left-6 right-10 flex justify-between items-center pointer-events-none">
                             <div className="h-px bg-white/10 flex-grow mr-10" />
                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest pointer-events-auto bg-black px-4">End of Chapter {selectedFullChapter.chapterNumber}</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div>
           <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] font-black rounded-none h-6 mb-4">Educational Framework v5.0</Badge>
           <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white tracking-tighter leading-none italic">
             {activeTab === 'chapters' ? 'Interactive \n Courseware.' : activeTab === 'doctrines' ? 'Legal Modules \n & Precedents.' : 'Mock Vault \n & Papers.'}
           </h1>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex bg-accent p-1">
              <button 
               onClick={() => setActiveTab('chapters')}
               className={`flex-1 h-12 px-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'chapters' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Curriculum
              </button>
              <button 
               onClick={() => setActiveTab('doctrines')}
               className={`flex-1 h-12 px-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'doctrines' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Knowledge
              </button>
              <button 
               onClick={() => setActiveTab('papers')}
               className={`flex-1 h-12 px-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'papers' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Simulations
              </button>
            </div>
           <div className="w-full md:w-96 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
              <Input 
                placeholder={activeTab === 'chapters' ? "Search curriculum..." : activeTab === 'doctrines' ? "Search legal concepts..." : "Search mock papers..."}
                className="bg-accent h-16 pl-12 rounded-none border-border focus:border-primary text-white font-serif italic text-lg shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>
      </div>

      {activeTab === 'chapters' ? (
        <div className="space-y-24">
          {courseChapters.map((chapter, cIdx) => (
            <motion.section 
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Visual Chapter Sidebar */}
                <div className="lg:col-span-1 hidden lg:flex flex-col items-center">
                  <div className="w-16 h-16 bg-accent border-2 border-primary/20 flex flex-col items-center justify-center text-primary mb-6 group hover:border-primary transition-all cursor-default">
                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">CH</span>
                    <span className="text-2xl font-serif italic font-black">{chapter.chapterNumber}</span>
                  </div>
                  <div className="w-px flex-grow bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
                </div>

                <div className="lg:col-span-11 space-y-10">
                  {/* NCERT Header Styling */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-primary/40" />
                      <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{chapter.subject}</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter italic">
                      {chapter.title}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Objectives Section */}
                    <div className="md:col-span-1 bg-accent/20 p-8 border-l-4 border-primary space-y-6">
                      <div className="flex items-center gap-3 text-primary">
                        <Target size={18} />
                        <h4 className="text-[10px] font-black uppercase tracking-wider">Objectives</h4>
                      </div>
                      <ul className="space-y-6">
                        {chapter.learningObjectives.map((obj, i) => (
                          <li key={i} className="text-sm text-gray-400 font-serif italic leading-relaxed">
                            "{obj}"
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Context/Summary */}
                    <div className="md:col-span-2 space-y-8 p-4">
                      <div className="flex items-center gap-3 text-white/30">
                        <BookOpen size={18} />
                        <h4 className="text-[10px] font-black uppercase tracking-wider">Primary Study Content</h4>
                      </div>
                      <div className="prose prose-invert prose-p:font-serif prose-p:italic prose-p:text-white/90 prose-p:text-xl prose-p:leading-relaxed max-w-none">
                        <ReactMarkdown>
                          {chapter.summary}
                        </ReactMarkdown>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-primary/60">Advanced Modules</h5>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedFullChapter(chapter)}
                                    className="px-3 py-1 text-[8px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-1.5 transition-all"
                                >
                                    <Maximize2 size={10} />
                                    Full Interactive Syllabus
                                </button>
                                <div className="flex bg-accent/40 p-0.5 border border-white/5">
                                    <button 
                                        onClick={() => setMethodTab('traditional')}
                                        className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest transition-all ${methodTab === 'traditional' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        Traditional
                                    </button>
                                    <button 
                                        onClick={() => shortcutUnlocked[chapter.id] ? setMethodTab('shortcut') : toast.error("Locked", { description: "Master the traditional method first!" })}
                                        className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-1 ${methodTab === 'shortcut' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {!shortcutUnlocked[chapter.id] && <Layers size={10} />}
                                        Lexie Shortcut
                                    </button>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {methodTab === 'traditional' ? (
                                <motion.div
                                    key="traditional"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-6"
                                >
                                    <p className="text-sm text-gray-400 font-serif leading-relaxed italic">
                                        {chapter.traditionalMethod}
                                    </p>
                                    {!shortcutUnlocked[chapter.id] && (
                                        <button 
                                            onClick={() => unlockShortcut(chapter.id)}
                                            className="group flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:gap-5 transition-all"
                                        >
                                            <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-black">
                                                <ArrowRight size={14} />
                                            </div>
                                            Mark as Mastered to Unlock Shortcut
                                        </button>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="shortcut"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <p className="text-sm text-primary font-serif leading-relaxed italic font-medium">
                                        {chapter.clatShortcut}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                      
                      {/* NCERT-style "Tip" box */}
                      <div className="bg-[#12161B] p-6 border-y border-white/5 flex gap-4">
                         <Info size={24} className="text-primary shrink-0" />
                         <div className="space-y-1">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic block">NCERT Master Tip</span>
                            <p className="text-xs text-gray-300 font-serif leading-relaxed">Remember: Logical quantitate patterns often repeat. High-scoring aspirants spend 60% of their time on Data Interpretation sets rather than standalone arithmetic.</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Exercises Section */}
                  <div className="space-y-10 bg-[#0A0D11] p-12 border border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                       <HelpCircle size={120} className="text-primary" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary">
                           <FileText size={20} />
                        </div>
                        <div>
                           <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Summative Assessment</h4>
                           <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Exercise Set {chapter.chapterNumber}.1</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-none rounded-none text-[9px] px-4 h-7 uppercase font-black tracking-widest">
                        {chapter.exercises.length} Problems
                      </Badge>
                    </div>

                    <div className="grid gap-16 relative z-10">
                      {chapter.exercises.map((ex, exIdx) => {
                        const questionId = `${chapter.id}-${exIdx}`;
                        const selected = selectedAnswers[questionId];
                        const isAnswered = !!selected;
                        const isCorrect = selected === ex.correctAnswer;

                        return (
                          <div key={exIdx} className="space-y-8">
                            <div className="flex gap-6">
                              <span className="text-6xl font-serif italic text-white/5 font-black shrink-0 leading-none">0{exIdx + 1}</span>
                              <div className="space-y-8 flex-grow">
                                <p className="text-xl font-serif text-white/90 leading-relaxed italic">{ex.question}</p>
                                
                                <div className="grid sm:grid-cols-2 gap-4">
                                  {ex.options.map((opt, oIdx) => {
                                    const isThisSelected = selected === opt;
                                    const showAsCorrect = isAnswered && opt === ex.correctAnswer;
                                    const showAsWrong = isAnswered && isThisSelected && !isCorrect;

                                    return (
                                      <button 
                                        key={oIdx}
                                        disabled={isAnswered}
                                        className={`px-8 py-5 border text-left text-sm font-bold transition-all relative overflow-hidden group
                                          ${isAnswered 
                                            ? showAsCorrect 
                                              ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                                              : showAsWrong 
                                                ? 'bg-red-500/10 border-red-500/50 text-red-400'
                                                : 'bg-surface/50 border-white/5 text-gray-600'
                                            : 'bg-surface border-white/10 text-gray-400 hover:border-primary hover:text-white'
                                          }`}
                                        onClick={() => {
                                          setSelectedAnswers(prev => ({ ...prev, [questionId]: opt }));
                                          if (opt === ex.correctAnswer) {
                                            toast.success("Correct Answer!", {
                                              description: "Excellent logical deduction.",
                                              className: "bg-surface border-primary text-white"
                                            });
                                          } else {
                                            toast.error("Incorrect Choice", {
                                              description: `The correct answer was ${ex.correctAnswer}.`,
                                            });
                                          }
                                        }}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-4">
                                            <span className={`text-[10px] font-black w-6 h-6 flex items-center justify-center border rounded-full transition-colors
                                              ${isThisSelected ? 'border-current bg-current/10' : 'border-white/10 opacity-30'}
                                            `}>
                                              {String.fromCharCode(65 + oIdx)}
                                            </span>
                                            {opt}
                                          </div>
                                          {showAsCorrect && <CheckCircle size={16} className="text-green-500" />}
                                          {showAsWrong && <Zap size={16} className="text-red-500" />}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>

                                {isAnswered && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-accent/30 p-6 border-l-2 border-primary/40 space-y-3"
                                  >
                                    <div className="flex items-center gap-2 text-primary">
                                       <Lightbulb size={14} />
                                       <span className="text-[10px] font-black uppercase tracking-widest">Rational Explanation</span>
                                    </div>
                                    <p className="text-sm text-gray-400 font-serif leading-relaxed italic">
                                      {ex.explanation}
                                    </p>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Knowledge Grid */}
                  <div className="grid md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
                    {chapter.ncertHighlights.map((hl, i) => (
                      <div key={i} className="p-10 space-y-4 hover:bg-accent/10 transition-colors group">
                        <div className="w-8 h-px bg-primary/20 group-hover:w-16 transition-all" />
                        <p className="text-sm text-gray-300 leading-loose">
                           {hl.split(':').map((part, pi) => (
                              <span key={pi} className={pi === 0 ? "font-bold text-white block mb-2 uppercase tracking-wide text-xs" : "font-light"}>
                                {part}{pi === 0 ? '' : ''}
                              </span>
                            ))}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Masterclass Video Call to Action */}
                  <div className="relative">
                    <Card 
                      onClick={() => shortcutUnlocked[chapter.id] ? setActiveVideo(chapter) : toast.info("Theory Locked", { description: "You must mark the traditional method as mastered to unlock the Video Masterclass." })}
                      className={`${shortcutUnlocked[chapter.id] ? 'bg-primary hover:bg-white' : 'bg-surface border-white/5 opacity-80 cursor-not-allowed'} transition-colors duration-500 rounded-none overflow-hidden group border-none shadow-2xl`}
                    >
                       <div className="p-1 text-black flex flex-col md:flex-row items-stretch">
                          <div className={`p-10 md:w-1/2 space-y-10 flex flex-col justify-between ${!shortcutUnlocked[chapter.id] && 'text-gray-500'}`}>
                             <div className="space-y-4">
                                <motion.div
                                  animate={shortcutUnlocked[chapter.id] ? { scale: [1, 1.1, 1] } : {}}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                  <PlayCircle size={64} className={`${shortcutUnlocked[chapter.id] ? 'text-black' : 'text-gray-700'} group-hover:scale-110 transition-transform`} />
                                </motion.div>
                                <Badge className={`${shortcutUnlocked[chapter.id] ? 'bg-black text-white' : 'bg-white/5 text-gray-500'} text-[9px] font-black uppercase tracking-widest h-6 px-3`}>
                                   {shortcutUnlocked[chapter.id] ? 'Available Now' : 'Locked'}
                                </Badge>
                             </div>
                             <div className="space-y-2">
                                <h4 className="text-[10px] font-serif italic text-black/50 font-bold uppercase">Masterclass Chapter {chapter.chapterNumber}</h4>
                                <h3 className="text-3xl font-serif font-black italic tracking-tighter leading-none">{chapter.videoTutorial.title}</h3>
                             </div>
                             <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                   <span className="text-[8px] font-black uppercase opacity-40">Duration</span>
                                   <span className="font-serif italic font-bold">{chapter.videoTutorial.duration} Mins</span>
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[8px] font-black uppercase opacity-40">Instructor</span>
                                   <span className="font-serif italic font-bold">A. Verma</span>
                                </div>
                             </div>
                          </div>
                          <div className={`${shortcutUnlocked[chapter.id] ? 'bg-black/5' : 'bg-black/20'} p-10 md:w-1/2 flex flex-col justify-between space-y-8`}>
                             <div className="space-y-6 text-black/80">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-black/40">Inside this session:</h5>
                                <div className="space-y-4">
                                  {chapter.videoTutorial.steps.map((step, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                      <span className="text-xl font-serif italic text-black/20 font-black">0{i+1}</span>
                                      <p className="text-sm font-bold leading-tight pt-1">{step}</p>
                                    </div>
                                  ))}
                                </div>
                             </div>
                             <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (shortcutUnlocked[chapter.id]) setActiveVideo(chapter);
                                  else toast.info("Theory Locked", { description: "You must mark the traditional method as mastered to unlock the Video Masterclass." });
                                }}
                                className={`h-16 w-full ${shortcutUnlocked[chapter.id] ? 'bg-black text-primary hover:!bg-white' : 'bg-white/5 text-gray-700 pointer-events-none'} font-black uppercase text-[11px] tracking-[0.2em] group-hover:bg-primary group-hover:text-black border-2 border-transparent hover:border-black transition-all`}
                             >
                                {shortcutUnlocked[chapter.id] ? 'Stream Full Episode' : 'Complete Theory First'}
                             </button>
                          </div>
                       </div>
                    </Card>
                    {!shortcutUnlocked[chapter.id] && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/10">
                                <Shield size={32} className="text-primary/50" />
                            </div>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      ) : activeTab === 'doctrines' ? (
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-6">
             <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest border-b border-border pb-4">Knowledge Domains</h4>
             <div className="space-y-1">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-l-2 ${!selectedCategory ? 'bg-primary/10 border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                  All Jurisdictions
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-l-2 ${selectedCategory === cat ? 'bg-primary/10 border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             
             <Card className="bg-[#0C0F14] border-border p-6 space-y-4 rounded-none mt-12">
                <div className="flex items-center gap-2 text-primary">
                   <Target size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Mastery Tip</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed italic">"Constitutional Law often forms 30% of the Legal Reasoning section. Prioritize Articles 12-35."</p>
             </Card>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredDoctrines.map((doctrine, idx) => (
                <motion.div
                  layout
                  key={doctrine.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-surface border border-border group hover:border-primary/40 transition-all relative overflow-hidden"
                >
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                       <h3 className="text-2xl font-serif text-white italic group-hover:text-primary transition-colors">{doctrine.title}</h3>
                       {doctrine.important && (
                         <div className="flex items-center gap-2 animate-pulse">
                            <Star size={14} className="text-primary fill-primary" />
                            <span className="text-[9px] text-primary font-black uppercase tracking-widest">High Yield</span>
                         </div>
                       )}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed font-light first-letter:text-2xl first-letter:font-serif first-letter:text-white first-letter:float-left first-letter:mr-2">
                       {doctrine.summary}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border">
                       {doctrine.landmarkCase && (
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent flex items-center justify-center text-primary">
                               <Scale size={14} />
                            </div>
                            <div className="space-y-1">
                               <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest block leading-none">Landmark Evidence</span>
                               <span className="text-[10px] text-white font-bold uppercase tracking-tight">{doctrine.landmarkCase}</span>
                            </div>
                         </div>
                       )}
                       <div className="flex gap-4">
                          <button className="flex items-center gap-2 text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all">
                             <Bookmark size={14} /> Save Module
                          </button>
                          <button className="flex items-center gap-2 text-primary hover:tracking-widest text-[9px] font-black uppercase tracking-widest transition-all">
                             Deep Analysis <ArrowRight size={14} />
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredPapers.map((paper, idx) => (
             <motion.div
               key={paper.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-surface border border-border p-8 space-y-8 group hover:border-primary transition-all relative flex flex-col h-full"
             >
                <div className="flex justify-between items-start">
                   <div className="w-10 h-10 bg-accent flex items-center justify-center text-primary border border-primary/20 rotate-45 group-hover:bg-primary group-hover:text-black transition-all">
                      <Book size={20} className="-rotate-45" />
                   </div>
                   <Badge variant="outline" className="rounded-none border-primary/40 text-primary uppercase text-[8px] tracking-widest h-6">
                      {paper.difficulty}
                   </Badge>
                </div>

                <div className="space-y-2 flex-grow">
                   <h3 className="text-2xl font-serif text-white italic">{paper.title}</h3>
                   <p className="text-gray-500 text-xs leading-relaxed font-bold uppercase tracking-widest opacity-60">
                      {paper.year} • {paper.sections.join(' • ')}
                   </p>
                   <p className="text-gray-400 text-sm font-light leading-relaxed mt-4">
                      {paper.description}
                   </p>
                </div>

                <div className="pt-8 border-t border-border flex gap-4">
                   <button 
                    onClick={() => { setSelectedMockId(paper.id); setView('MOCKS'); }}
                    className="flex-1 bg-primary text-black h-12 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-primary/5"
                   >
                     Initialize Simulation
                   </button>
                   <button className="w-12 h-12 border border-border flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                      <Shield size={18} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      )}
      {/* Video Masterclass Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-accent border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Player Header */}
              <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40">
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary/20 text-primary border-none rounded-none text-[8px] font-black uppercase">Session Active</Badge>
                  <span className="text-xs font-serif italic text-gray-400">Masterclass: {activeVideo.title}</span>
                </div>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                >
                  <ArrowRight className="rotate-180" />
                </button>
              </div>

              {/* Main Player Area */}
              <div className="flex-grow relative flex flex-col md:flex-row">
                 {/* Video Player */}
                 <div className="flex-grow bg-black relative overflow-hidden flex items-center justify-center">
                    {/* Fallback Simulation UI (Shown underneath) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-accent/20 z-0">
                       <PlayCircle size={80} className="text-white/10 animate-pulse" />
                       <div className="text-center px-10 space-y-4">
                          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Streaming Masterclass</p>
                          <p className="text-sm italic text-gray-400 font-serif">If the video does not load correctly, it may be due to regional restrictions.</p>
                          <a 
                            href={`https://www.youtube.com/watch?v=${activeVideo.videoId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                          >
                            Watch on YouTube <ArrowRight size={14} />
                          </a>
                       </div>
                    </div>

                    {/* Real YouTube Embed with specific video ID */}
                    <iframe 
                      className="absolute inset-0 w-full h-full z-10"
                      src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&modestbranding=1&rel=0&origin=${encodeURIComponent(window.location.origin)}`}
                      title={activeVideo.videoTutorial.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>

                    {/* Overlay if still loading or blocked */}
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                       <Badge className="bg-black/60 text-white border-white/10 backdrop-blur-md">Chapter {activeVideo.chapterNumber}: {activeVideo.subject}</Badge>
                    </div>
                 </div>

                 {/* Sidebar: Steps Walkthrough */}
                 <div className="md:w-[400px] bg-accent border-l border-white/5 flex flex-col h-full overflow-hidden">
                    <div className="flex border-b border-white/5 sticky top-0 bg-accent z-20">
                       <button 
                         onClick={() => setMethodTab('traditional')}
                         className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${methodTab === 'traditional' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-white'}`}
                       >
                          Traditional
                       </button>
                       <button 
                         onClick={() => {
                           if (shortcutUnlocked[activeVideo.id]) {
                             setMethodTab('shortcut');
                           }
                         }}
                         className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${methodTab === 'shortcut' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-white'}`}
                       >
                          {!shortcutUnlocked[activeVideo.id] && <Lock size={10} className="text-gray-600" />}
                          Lexie Shortcut
                       </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide">
                       <AnimatePresence mode="wait">
                          {lightningQuizActive ? (
                            <motion.div
                                key="lightning-quiz"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between border-b border-primary/20 pb-4">
                                    <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest">
                                        <Zap size={14} fill="currentColor" className="animate-pulse" />
                                        Lightning Round
                                    </div>
                                    <button 
                                        onClick={() => setLightningQuizActive(false)}
                                        className="text-[9px] text-gray-500 uppercase font-black hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="space-y-10">
                                    {activeVideo.exercises.slice(0, 2).map((ex, i) => {
                                        const qId = `lightning-${activeVideo.id}-${i}`;
                                        const sel = selectedAnswers[qId];
                                        const answered = !!sel;
                                        return (
                                            <div key={i} className="space-y-4">
                                                <div className="flex gap-4">
                                                    <span className="text-xl font-serif italic text-white/20 font-black">Q{i+1}</span>
                                                    <p className="text-sm font-bold text-white/90 leading-tight pt-1">{ex.question}</p>
                                                </div>
                                                <div className="grid gap-2 pl-10">
                                                    {ex.options.map((opt, oi) => {
                                                        const isSel = sel === opt;
                                                        const isCorr = opt === ex.correctAnswer;
                                                        return (
                                                            <button 
                                                                key={oi}
                                                                disabled={answered}
                                                                onClick={() => {
                                                                    setSelectedAnswers(prev => ({ ...prev, [qId]: opt }));
                                                                    if (opt === ex.correctAnswer) {
                                                                        setQuizScore(s => s + 1);
                                                                        toast.success("Spot on!", { description: "You mastered the shortcut!" });
                                                                    } else {
                                                                        toast.error("Not quite.", { description: "Check Lexie's hint below." });
                                                                    }
                                                                }}
                                                                className={`p-3 text-left text-xs font-bold transition-all border ${answered ? (isCorr ? 'bg-green-500/10 border-green-500/50 text-green-400' : (isSel ? 'bg-red-500/10 border-red-500/50 text-red-100' : 'bg-transparent border-white/5 opacity-40')) : 'bg-surface border-white/5 hover:border-primary text-gray-400'}`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {answered && (
                                                    <p className="pl-10 text-[10px] text-primary/60 italic font-medium leading-relaxed">
                                                        Lexie: "{ex.explanation}"
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                          ) : methodTab === 'traditional' ? (
                             <motion.div 
                               key="traditional"
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, x: -20 }}
                               className="space-y-6"
                             >
                                <div className="space-y-4">
                                   <div className="flex items-center gap-3 text-white/40">
                                      <History size={16} />
                                      <h6 className="text-[10px] font-black uppercase tracking-widest">Base Methodology</h6>
                                   </div>
                                   <p className="text-sm text-gray-400 leading-relaxed font-light">
                                      {activeVideo.traditionalMethod || "The standard NCERT approach involving step-by-step substitution and formula application. Accurate but time-intensive."}
                                   </p>
                                </div>

                                <div className="p-4 bg-white/5 border border-white/5 space-y-4">
                                   <h6 className="text-[9px] font-black uppercase tracking-widest text-primary">Traditional Roadmap</h6>
                                   <div className="space-y-6">
                                      {activeVideo.videoTutorial.steps.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                           <span className="text-xs font-serif italic text-white/20">0{i+1}</span>
                                           <p className="text-xs text-gray-400 font-light">{step}</p>
                                        </div>
                                      ))}
                                   </div>
                                </div>

                                {!shortcutUnlocked[activeVideo.id] && (
                                   <button 
                                     onClick={() => unlockShortcut(activeVideo.id)}
                                     className="w-full h-12 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-3 mt-8"
                                   >
                                      Analyze Shortcut Strategy <ArrowRight size={14} />
                                   </button>
                                )}
                             </motion.div>
                          ) : (
                             <motion.div 
                               key="shortcut"
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, x: -20 }}
                               className="space-y-8"
                             >
                                <div className="space-y-6">
                                   <div className="flex items-center gap-3 text-primary">
                                      <Zap size={16} fill="currentColor" />
                                      <h6 className="text-[10px] font-black uppercase tracking-widest">Lexie's Hack</h6>
                                   </div>
                                   <div className="bg-primary/5 border-l-2 border-primary p-4">
                                      <p className="text-sm text-white font-serif italic leading-relaxed">
                                         {activeVideo.clatShortcut || "Use the 10% anchor rule to estimate values within 2 seconds. Mentally subtract deviations from the nearest 100."}
                                      </p>
                                   </div>
                                </div>

                                <div className="space-y-4">
                                   <h6 className="text-[9px] font-black uppercase tracking-widest text-gray-500">Cheat Sheet Snippets</h6>
                                   <div className="space-y-3">
                                      {(activeVideo.cheatSheetHighlights || []).map((h, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-[#0C0F14] p-3 border border-white/5">
                                           <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                           <span className="text-[11px] text-gray-300 font-medium">{h}</span>
                                        </div>
                                      ))}
                                   </div>
                                </div>

                                <div className="p-6 bg-black border border-primary/20 space-y-4 relative overflow-hidden">
                                   <div className="absolute top-0 right-0 p-2 opacity-10">
                                      <Target size={40} className="text-primary" />
                                   </div>
                                   <h6 className="text-[9px] font-black uppercase tracking-widest text-primary">Mentor Insight</h6>
                                   <p className="text-xs text-primary/60 italic font-medium leading-relaxed">
                                      "In CLAT, the options are your best friends. Never solve completely until you've checked if only one option fits the unit-digit or divisibility rule."
                                   </p>
                                </div>
                             </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                    
                    <div className="p-8 border-t border-white/5 mt-auto bg-black/40 space-y-4">
                       {!lightningQuizActive ? (
                        <>
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-gray-500">
                                <span>Lightning Round Status</span>
                                <span className={quizScore > 0 ? "text-primary anim-pulse" : ""}>
                                    {quizScore > 0 ? `${quizScore} Mastery Points` : "Ready to Start"}
                                </span>
                            </div>
                            <button 
                                onClick={() => setLightningQuizActive(true)}
                                className="w-full h-14 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2"
                            >
                                <Target size={14} /> Start Lightning Quiz
                            </button>
                        </>
                       ) : (
                        <button 
                            onClick={() => { setLightningQuizActive(false); setQuizScore(0); }}
                            className="w-full h-14 bg-accent text-white border border-white/10 font-black uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                        >
                            Reset Round
                        </button>
                       )}
                       <button className="w-full h-12 bg-surface/50 text-gray-500 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 border border-white/5">
                          <Download size={14} /> Download PDF Cheat Sheet
                       </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JurisArchive;
