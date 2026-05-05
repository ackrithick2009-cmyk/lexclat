import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  BookOpen, 
  Download, 
  FileText, 
  Search, 
  ExternalLink,
  ChevronRight,
  Folder,
  ArrowLeft,
  X,
  Zap,
  CheckCircle2,
  Trophy,
  Loader2,
  ClipboardCheck,
  Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getLegalTutorResponse, generateClatPassageTest } from '@/src/services/geminiService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { subjects, months, mockMaterials, Material } from '@/src/constants';
import { db, auth, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

const StudyMaterials = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Legal Reasoning']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [focusedPoint, setFocusedPoint] = useState<{title: string, content: string} | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [fetching, setFetching] = useState(true);
  const [recommendations, setRecommendations] = useState<Material[]>([]);
  const [dbMaterials, setDbMaterials] = useState<Material[]>([]);

  const materialTypes: Material['type'][] = ['Note', 'Passage', 'Data Set', 'Video', 'Strategy'];

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedTypes([]);
    setSelectedMonths([]);
    setSearchQuery('');
  };

  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'materials'));
    return onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Material));
      setDbMaterials(data);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'materials');
    });
  }, []);

  const allMaterials = useMemo(() => {
    const combined = [...mockMaterials, ...dbMaterials];
    const uniqueMap = new Map();
    combined.forEach(m => {
      uniqueMap.set(m.id, m);
    });
    return Array.from(uniqueMap.values());
  }, [dbMaterials]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        // Fallback to local
        try {
          setCompletedIds(JSON.parse(localStorage.getItem('clat_completed_materials') || '[]'));
        } catch {
          setCompletedIds([]);
        }
        setFetching(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setCompletedIds(data.behavior?.completedMaterials || []);
          
          if (data.diagnosticScores) {
            // Calculate weights and recommend material from weakest subject
            const subjects_list = ['english', 'gk', 'legal', 'logical', 'quant'];
            const subject_map: Record<string, string> = {
              'english': 'English Language',
              'gk': 'Current Affairs & GK',
              'legal': 'Legal Reasoning',
              'logical': 'Logical Reasoning',
              'quant': 'Quantitative Techniques'
            };
            
            const weakest = subjects_list.sort((a,b) => data.diagnosticScores[a] - data.diagnosticScores[b])[0];
            const recommended = allMaterials
              .filter(m => m.subject === subject_map[weakest] && !data.behavior?.completedMaterials?.includes(m.id))
              .slice(0, 2);
            setRecommendations(recommended);
          }
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
      } finally {
        setFetching(false);
      }
    };
    fetchProgress();
  }, [user, allMaterials]);

  const markAsComplete = async (id: string) => {
    if (completedIds.includes(id)) return;
    
    const next = [...completedIds, id];
    setCompletedIds(next);
    localStorage.setItem('clat_completed_materials', JSON.stringify(next));

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        // Calculate new completion rate
        const total = allMaterials.length;
        const rate = Math.round((next.length / total) * 100);
        
        await setDoc(userRef, {
          behavior: {
            completedMaterials: arrayUnion(id),
            completionRate: rate
          },
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      }
    }
  };

  const getSubjectProgress = (subjectName: string) => {
    const subjectMaterials = allMaterials.filter(m => m.subject === subjectName);
    if (subjectMaterials.length === 0) return 0;
    const completed = subjectMaterials.filter(m => completedIds.includes(m.id)).length;
    return Math.round((completed / subjectMaterials.length) * 100);
  };

  // Quiz States
  const [quizData, setQuizData] = useState<{ passage: string, questions: any[] } | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (selectedMaterial || focusedPoint || quizData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMaterial, focusedPoint, quizData]);

  const filteredMaterials = useMemo(() => {
    return allMaterials.filter(m => {
      const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(m.subject);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(m.type);
      const matchesMonth = selectedMonths.length === 0 || (m.month && selectedMonths.includes(m.month));
      const matchesSearch = !searchQuery || 
                            m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSubject && matchesType && matchesMonth && matchesSearch;
    });
  }, [selectedSubjects, selectedTypes, selectedMonths, searchQuery, allMaterials]);

  const isBrowsingGkMonths = selectedSubjects.length === 1 && 
                            selectedSubjects[0] === 'Current Affairs & GK' && 
                            selectedMonths.length === 0 && 
                            !searchQuery && 
                            selectedTypes.length === 0;

  const toggleSubject = (name: string) => {
    setSelectedSubjects(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAction = (material: Material) => {
    setSelectedMaterial(material);
    markAsComplete(material.id);
    toast.success(`Opening: ${material.title}`);
  };

  const handleDeepDive = async (point: string) => {
    setIsAnalyzing(true);
    setFocusedPoint({ title: point.split(':')[0], content: '' });
    try {
      const response = await getLegalTutorResponse([{ role: 'user', content: `Explain the following legal/current affairs point in detail for a CLAT aspirant: ${point}` }], point);
      setFocusedPoint({ title: point.split(':')[0], content: response });
    } catch (err) {
      toast.error('AI Research Interrupted.');
      setFocusedPoint(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!selectedMaterial?.content) return;
    
    setIsGeneratingQuiz(true);
    try {
      const data = await generateClatPassageTest(selectedMaterial.content, selectedMaterial.title);
      setQuizData(data);
      setUserAnswers({});
      setShowResults(false);
      toast.success('CLAT-Standard Practice Test Generated.');
    } catch (err) {
      toast.error('Failed to generate practice test.');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    return quizData.questions.reduce((acc, q, idx) => {
      return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
  };

  return (
    <div id="study-materials" className="max-w-7xl mx-auto space-y-12 pb-24 pt-10">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-border pb-12">
        <div>
          <h2 className="text-xs text-primary font-bold tracking-[0.4em] mb-4 uppercase">Academic Repository v4.0</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white tracking-tighter leading-tight italic">Study <br /> Materials.</h1>
        </div>
        <div className="w-full md:w-[500px] flex gap-4 items-center">
          <div className="relative group flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
             <input 
              type="text" 
              placeholder="Search study modules..." 
              className="bg-accent w-full h-16 pl-12 rounded-none border-border focus:border-primary text-white font-serif italic text-lg outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {(selectedSubjects.length > 0 || selectedTypes.length > 0 || selectedMonths.length > 0 || searchQuery) && (
            <button 
              onClick={clearFilters}
              className="h-16 px-6 bg-surface border border-border text-gray-500 hover:text-primary hover:border-primary transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
            >
              <X size={14} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Smart Recommendations Section */}
      <AnimatePresence>
        {recommendations.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Engine Priority: Recommended for Weakest Section</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map(m => (
                <div 
                  key={m.id}
                  onClick={() => handleAction(m)}
                  className="bg-accent/40 border border-primary/20 p-5 group hover:border-primary/50 transition-all cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <span className="text-[9px] text-primary font-black uppercase tracking-widest">{m.subject}</span>
                    <h4 className="text-white font-serif italic text-lg leading-tight mt-1">{m.title}</h4>
                  </div>
                  <ChevronRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-4">Subject Disciplines</p>
            <div className="space-y-2">
              {subjects.map((sub) => {
                const progress = getSubjectProgress(sub.name);
                const isSelected = selectedSubjects.includes(sub.name);
                return (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubject(sub.name)}
                    className={`w-full relative flex flex-col p-5 transition-all group overflow-hidden text-left ${
                      isSelected 
                      ? 'bg-primary text-black' 
                      : 'bg-surface text-gray-400 hover:bg-accent border-l-2 border-transparent hover:border-primary'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <span className={isSelected ? 'text-black' : 'text-primary'}>
                          {sub.icon}
                        </span>
                        <span className="text-sm font-bold tracking-tight">{sub.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black tracking-tighter ${isSelected ? 'text-black/60' : 'text-gray-600'}`}>
                          {progress}%
                        </span>
                        <ChevronRight size={14} className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                      </div>
                    </div>
                    
                    {/* Subject Progress Bar */}
                    <div className={`h-[2px] w-full rounded-full overflow-hidden ${isSelected ? 'bg-black/10' : 'bg-white/5'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className={`h-full ${isSelected ? 'bg-black' : 'bg-primary shadow-[0_0_8px_rgba(255,215,0,0.4)]'}`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-4">Content Type</p>
            <div className="grid grid-cols-2 gap-2">
              {materialTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedTypes(prev => 
                      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                    );
                  }}
                  className={`p-3 text-[10px] font-black uppercase tracking-widest transition-all border text-center ${
                    selectedTypes.includes(type)
                    ? 'bg-primary border-primary text-black'
                    : 'bg-surface border-border text-gray-400 hover:border-primary/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedSubjects.join(',')}-${selectedTypes.join(',')}-${selectedMonths.join(',')}-${searchQuery ? 'search' : 'list'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {isBrowsingGkMonths ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array.from(new Set([...months, ...dbMaterials.map(m => m.month).filter(Boolean)])).map(month => (
                    <Card 
                      key={month as string} 
                      onClick={() => {
                        setSelectedMonths([month as string]);
                        toast.info(`Entering: ${month}`);
                      }}
                      className="bg-surface border-border p-8 rounded-none group hover:border-primary cursor-pointer transition-all flex flex-col items-center text-center gap-4 active:scale-95 shadow-sm hover:shadow-primary/5"
                    >
                      <div className="p-4 bg-accent rounded-full text-primary group-hover:scale-110 transition-transform">
                        <Folder size={32} />
                      </div>
                      <div className="space-y-1 text-center w-full">
                        <h4 className="text-white font-serif italic text-lg">{month as string}</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                          {allMaterials.filter(m => m.subject === 'Current Affairs & GK' && m.month === month).length} Documents
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {selectedSubjects.includes('Current Affairs & GK') && selectedMonths.length > 0 && (
                    <button 
                      onClick={() => setSelectedMonths([])}
                      className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest hover:underline mb-2"
                    >
                      <ArrowLeft size={14} /> Back to Months
                    </button>
                  )}
                  
                  {filteredMaterials.length > 0 ? (
                    <div className="space-y-px bg-border border border-border">
                      {filteredMaterials.map((material) => (
                        <div 
                          key={material.id} 
                          onClick={() => handleAction(material)}
                          className="bg-background p-10 group hover:bg-surface transition-all cursor-pointer relative overflow-hidden"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
                            <div className="space-y-4 md:space-y-6 flex-1">
                              <div className="flex flex-wrap items-center gap-4">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-primary/10 text-primary px-3 py-1.5 border border-primary/20">
                                  {material.type}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                                  {material.date} • {material.readTime} REC
                                </span>
                              </div>
                              
                              <div className="space-y-2">
                                <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors flex items-center gap-4 tracking-tight">
                                  {material.title}
                                  {completedIds.includes(material.id) && (
                                    <CheckCircle2 size={18} className="text-primary fill-primary/5" />
                                  )}
                                </h3>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light max-w-2xl">
                                  {material.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-row md:flex-col gap-4 justify-end shrink-0">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAction(material); }}
                                className="flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 text-[10px] uppercase font-black tracking-widest hover-invert transition-all border border-white/5 h-14"
                              >
                                <Download size={14} /> DOWNLOAD
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAction(material); }}
                                className="flex items-center justify-center gap-3 border border-border text-gray-500 hover:border-primary hover:text-primary px-8 py-4 text-[10px] uppercase font-black tracking-widest transition-all h-14"
                              >
                                <ExternalLink size={14} /> VIEW ONLINE
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center border border-dashed border-border">
                      <FileText size={48} className="mx-auto mb-4 text-gray-700" />
                      <p className="text-gray-500 font-serif italic">No source materials discovered in this discipline yet.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="bg-accent/30 p-6 lg:p-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div>
              <h4 className="text-xl font-serif text-white italic mb-2 tracking-tighter">Submit External Source</h4>
              <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">Help fellow aspirants by suggesting high-yield passages or legal updates.</p>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'INGESTOR' }))}
                className="bg-primary text-black px-10 py-5 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
              >
                Access Ingestion Portal
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMaterial(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-accent w-full max-w-4xl h-full md:h-[90dvh] flex flex-col shadow-2xl relative border border-white/10 cursor-default overflow-hidden safe-top safe-bottom"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-surface shrink-0">
                <div className="pr-12">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1">
                      {selectedMaterial.type}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {selectedMaterial.date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif text-white">{selectedMaterial.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedMaterial(null)}
                  className="p-4 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
              </div>

              {/* Viewer Content */}
              <div 
                className="flex-1 overflow-y-auto p-8 md:p-20 bg-[#111] overscroll-contain scrollbar-thin scrollbar-thumb-primary/20"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="max-w-2xl mx-auto space-y-12">
                  <div className="pb-12 border-b border-white/5">
                    <p className="text-xl text-gray-400 font-light leading-relaxed italic">
                      "{selectedMaterial.description}"
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Detailed Focus Points</h3>
                    <div className="grid gap-6">
                      {selectedMaterial.content ? (
                        selectedMaterial.content.map((point, i) => (
                          <div 
                            key={i} 
                            className="flex gap-6 items-start group border-b border-white/5 pb-6 last:border-0 hover:cursor-pointer"
                            onClick={() => handleDeepDive(point)}
                          >
                            <span className="text-primary font-mono text-sm pt-1">0{i+1}</span>
                            <div className="space-y-2">
                              <div className="text-white text-lg leading-relaxed font-light group-hover:text-primary transition-colors prose prose-invert prose-p:my-0 prose-strong:text-primary max-w-none">
                                <ReactMarkdown>{point}</ReactMarkdown>
                              </div>
                              <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2">
                                <Zap size={10} /> Click for Deep Dive Analysis
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 font-serif italic text-lg">
                          Digital manuscript for this module is being processed. Please refer to the downloadable PDF for full details.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-12 mt-12 border-t border-white/5 flex flex-col gap-8 md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-black">
                        AI
                      </div>
                      <div>
                        <p className="text-xs text-white font-bold">LexCLAT Tutor</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Verified Academic Source</p>
                      </div>
                    </div>
                    <button className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">
                      Download Official PDF
                    </button>
                  </div>

                  {selectedMaterial.content && (
                    <div className="pt-12 mt-12 border-t border-white/10">
                      <div className="bg-primary/5 border border-primary/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group">
                        <div className="flex-1">
                          <h4 className="text-xl font-serif text-primary italic mb-2">Practice Comprehensive Test</h4>
                          <p className="text-xs text-gray-500 leading-relaxed max-w-md uppercase tracking-wider">
                            Generate a CLAT-standard passage and 6 questions based on this module. Recommended for high-level retention.
                          </p>
                        </div>
                        <Button 
                          onClick={handleStartQuiz}
                          disabled={isGeneratingQuiz}
                          className="bg-primary text-black hover:bg-white px-10 py-6 text-[10px] uppercase font-black tracking-[0.2em] transition-all shrink-0 rounded-none h-auto"
                        >
                          {isGeneratingQuiz ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating Passages...
                            </>
                          ) : (
                            <>
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              Start AI Quiz
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {focusedPoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFocusedPoint(null)}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-primary/20 w-full max-w-2xl max-h-[80vh] shadow-3xl text-left flex flex-col"
            >
              <div className="p-10 border-b border-white/5 flex justify-between items-start">
                <h4 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Deep Dive: {focusedPoint.title}</h4>
                <button onClick={() => setFocusedPoint(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-thin scrollbar-thumb-primary/20">
                {isAnalyzing ? (
                  <div className="py-20 flex flex-col items-center gap-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-spin">
                      <Zap size={24} className="text-primary" />
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">AI Analyzing Legal Implications...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="prose prose-invert max-w-none prose-sm prose-p:leading-relaxed text-gray-300 font-light">
                      <ReactMarkdown>{focusedPoint.content}</ReactMarkdown>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-end">
                      <Button 
                        variant="outline" 
                        className="border-primary/20 text-primary text-[10px] tracking-widest uppercase hover:bg-primary hover:text-black font-black h-10 px-6 rounded-none transition-all"
                        onClick={() => setFocusedPoint(null)}
                      >
                        Understood, Return
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Quiz Overlay */}
      <AnimatePresence>
        {quizData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-accent w-full max-w-6xl h-full md:h-[90dvh] flex flex-col shadow-3xl border border-white/10 overflow-hidden safe-top safe-bottom"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface shrink-0">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-primary" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">CLAT Practice Assessment</span>
                  </div>
                  <div className="hidden md:block h-4 w-[1px] bg-white/10" />
                  <span className="hidden md:block text-[10px] text-gray-500 uppercase font-black">{selectedMaterial?.title}</span>
                </div>
                <button 
                  onClick={() => setQuizData(null)}
                  className="p-4 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden bg-black/20 relative">
                {/* Passage Column */}
                <div className="w-full h-[45vh] md:h-auto md:w-1/2 overflow-y-auto p-6 md:p-16 border-b md:border-b-0 md:border-r border-white/5 bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-primary/20 overscroll-contain">
                  <div className="max-w-xl mx-auto space-y-8">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Comprehension Passage</h5>
                    <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-300 prose-p:font-light">
                      {quizData?.passage && <ReactMarkdown>{quizData.passage}</ReactMarkdown>}
                      {!quizData?.passage && <p className="text-gray-500 italic">No passage data available.</p>}
                    </div>
                  </div>
                </div>

                {/* Questions Column */}
                <div className="w-full h-[55vh] md:h-auto md:w-1/2 overflow-y-auto p-6 md:p-16 bg-accent/30 scrollbar-thin scrollbar-thumb-primary/20 overscroll-contain">
                  <div className="max-w-xl mx-auto space-y-12 pb-40">
                    {quizData?.questions?.length ? (
                      quizData.questions.map((q, qIdx) => (
                        <div key={qIdx} className="space-y-6">
                          <div className="flex gap-4">
                            <span className="text-primary font-mono text-xs pt-1">Q.{qIdx+1}</span>
                            <p className="text-white text-lg font-serif italic">{q.question}</p>
                          </div>
                          
                          <div className="grid gap-3 pl-8">
                            {q.options.map((opt: string, oIdx: number) => {
                              const isSelected = userAnswers[qIdx] === oIdx;
                              const isCorrect = q.correctIndex === oIdx;
                              
                              let style = "border-white/5 hover:border-primary/50 text-gray-300";
                              if (isSelected) style = "border-primary bg-primary/10 text-primary";
                              if (showResults) {
                                if (isCorrect) style = "border-green-500 bg-green-500/10 text-green-500";
                                 else if (isSelected) style = "border-red-500 bg-red-500/10 text-red-500";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleAnswerSelect(qIdx, oIdx)}
                                  disabled={showResults}
                                  className={`w-full text-left p-5 border text-sm font-medium transition-all flex justify-between items-center group/btn ${style}`}
                                >
                                  <span>{opt}</span>
                                  {showResults && isCorrect && <CheckCircle2 size={16} />}
                                </button>
                              );
                            })}
                          </div>

                          {showResults && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="pl-8 pt-4"
                            >
                              <div className="bg-white/5 p-6 border-l-2 border-primary">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Explanatory Note</p>
                                <p className="text-xs text-gray-400 leading-relaxed font-light">{q.explanation}</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                        <Zap className="text-primary/20" size={40} />
                        <p className="text-gray-500 uppercase text-[10px] tracking-widest font-black">No questions found in this assessment.</p>
                      </div>
                    )}

                    {/* Submit / Results Section at the bottom of the list */}
                    <div className="pt-12 border-t border-white/5">
                      {!showResults ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <span>Assessment Progress</span>
                            <span className={Object.keys(userAnswers).length === 6 ? 'text-primary' : ''}>
                              {Object.keys(userAnswers).length} / 6 Questions Completed
                            </span>
                          </div>
                          <Button
                            onClick={() => {
                              if (Object.keys(userAnswers).length < 6) {
                                toast.error('Please attempt all 6 questions before submitting.');
                                return;
                              }
                              setShowResults(true);
                              toast.success('Analyzing responses...');
                            }}
                            className="w-full h-20 bg-primary text-black hover:bg-white text-xs font-black uppercase tracking-[0.3em] rounded-none transition-all shadow-2xl"
                          >
                            Submit Assessment
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-surface border border-white/10 p-10 space-y-8">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Passage Score</p>
                              <div className="flex items-end gap-2">
                                <span className="text-5xl font-serif text-white italic">{calculateScore()}</span>
                                <span className="text-2xl text-gray-600 font-serif">/ 6</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Proficiency</p>
                              <p className="text-sm text-white uppercase font-bold tracking-tight">
                                {calculateScore() === 6 ? 'Mastered' : calculateScore() >= 4 ? 'Competitive' : 'Developing'}
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => {
                              setQuizData(null);
                              setSelectedMaterial(null);
                            }}
                            className="w-full bg-white text-black hover:bg-primary h-14 text-[10px] font-black uppercase tracking-widest rounded-none"
                          >
                            Close & Mark as Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyMaterials;
