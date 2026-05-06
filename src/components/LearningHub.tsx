import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Clock, CheckCircle, Lock, Zap, Target, BookOpen, BarChart2, Brain, Globe, Trophy, Calendar, ArrowRight, Flame, Star } from 'lucide-react';
import { SUBJECT_MODULES, DAY_PLAN, type SubModule } from '../data/learningModules';

const LAYER_LABELS = ['Foundation', 'Skill Building', 'Application', 'Exam Mode'] as const;
const LAYER_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
const LAYER_DESC = [
  'Core concepts & theory',
  'Topic mastery drills',
  'CLAT-level passage sets',
  'Mocks + strategy',
];

const TYPE_ICONS: Record<SubModule['type'], React.ReactNode> = {
  lesson: <BookOpen size={12} />,
  drill: <Zap size={12} />,
  passage_set: <BarChart2 size={12} />,
  mock: <Target size={12} />,
};

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  english: <BookOpen size={20} />,
  legal: <span style={{ fontFamily: 'Georgia', fontSize: 18, fontStyle: 'italic' }}>⚖</span>,
  gk: <Globe size={20} />,
  quant: <BarChart2 size={20} />,
  logical: <Brain size={20} />,
};

export default function LearningHub() {
  const [activeSubject, setActiveSubject] = useState(SUBJECT_MODULES[0].id);
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3 | 4>(1);
  const [activeTab, setActiveTab] = useState<'modules' | 'journey' | 'revision' | 'strategy'>('modules');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [flashIdx, setFlashIdx] = useState(0);

  const subject = SUBJECT_MODULES.find(s => s.id === activeSubject)!;
  const layerModules = subject.modules.filter(m => m.layer === activeLayer);

  const totalModules = subject.modules.length;
  const completedCount = subject.modules.filter(m => completedIds.has(m.id)).length;
  const progress = Math.round((completedCount / totalModules) * 100);

  const FLASHCARDS = [
    { q: 'Who is the current Chief Justice of India?', a: 'Justice Sanjiv Khanna (Nov 2024)' },
    { q: 'What does "Res Judicata" mean?', a: 'A matter already judged — cannot be re-litigated.' },
    { q: 'What is the GDP growth rate for FY26 (RBI estimate)?', a: '6.4%' },
    { q: 'Which Article provides Right to Education?', a: 'Article 21A (added by 86th Amendment, 2002)' },
    { q: 'What replaced the IPC in 2024?', a: 'Bharatiya Nyaya Sanhita (BNS)' },
    { q: 'Current Repo Rate (Feb 2025 cut)?', a: '6.25% (25 bps cut)' },
    { q: 'What is "Mens Rea"?', a: 'Guilty mind — the mental element required for a crime.' },
  ];

  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-20 pb-32">
      {/* ── Header ── */}
      <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between bg-white/80 backdrop-blur-md fixed top-16 w-full z-40 shadow-sm">
        <div>
          <div className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">LexCLAT</div>
          <div className="text-2xl font-serif italic text-foreground mt-0.5">Learning Hub</div>
        </div>
        <div className="flex gap-2">
          {(['modules', 'journey', 'revision', 'strategy'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-5 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all rounded-sm ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-gray-50 text-muted-foreground hover:bg-gray-100 hover:text-primary'
              }`}
            >
              {tab === 'modules' ? '📚 Modules' : tab === 'journey' ? '🗓 Journey' : tab === 'revision' ? '🔁 Revision' : '🎯 Strategy'}
            </button>
          ))}
        </div>
      </div>

      {/* ── MODULES TAB ── */}
      {activeTab === 'modules' && (
        <div className="flex h-[calc(100vh-140px)] mt-14 overflow-hidden">
          {/* Subject Sidebar */}
          <aside className="w-64 border-r border-gray-200 flex flex-col p-4 gap-2 overflow-y-auto bg-white shadow-sm">
            {SUBJECT_MODULES.map(s => {
              const isActive = s.id === activeSubject;
              const done = s.modules.filter(m => completedIds.has(m.id)).length;
              const pct = Math.round((done / s.modules.length) * 100);
              return (
                <button 
                  key={s.id} 
                  onClick={() => { setActiveSubject(s.id); setActiveLayer(1); }} 
                  className={`p-4 rounded-sm text-left transition-all border ${
                    isActive 
                      ? 'bg-primary-light border-primary/20 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-primary' : 'text-gray-400'}>{SUBJECT_ICONS[s.id]}</span>
                    <div>
                      <div className={`text-xs font-black uppercase tracking-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>{s.title}</div>
                      <div className="text-[10px] text-muted-foreground font-medium">{pct}% done</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Main Panel */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            {/* Subject Header */}
            <div className="mb-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl">{subject.emoji}</span>
                  <h2 className="text-3xl font-serif italic font-medium text-foreground">{subject.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground font-light tracking-wide">{subject.tagline}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-serif font-black text-primary">{progress}%</div>
                <div className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">{completedCount}/{totalModules} Complete</div>
              </div>
            </div>

            {/* Layer Tabs */}
            <div className="flex gap-3 mb-10 flex-wrap">
              {LAYER_LABELS.map((label, i) => {
                const layer = (i + 1) as 1 | 2 | 3 | 4;
                const isActive = activeLayer === layer;
                const layerCount = subject.modules.filter(m => m.layer === layer).length;
                const layerDone = subject.modules.filter(m => m.layer === layer && completedIds.has(m.id)).length;
                return (
                  <button 
                    key={layer} 
                    onClick={() => setActiveLayer(layer)} 
                    className={`p-5 flex flex-col items-start gap-2 min-w-[200px] border transition-all rounded-sm ${
                      isActive 
                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
                        : 'bg-white border-gray-200 text-muted-foreground hover:border-primary/40 hover:bg-primary-light'
                    }`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-widest">Layer {layer}: {label}</span>
                    <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-muted-foreground'}`}>{LAYER_DESC[i]} · {layerDone}/{layerCount}</span>
                  </button>
                );
              })}
            </div>

            {/* Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {layerModules.map((mod, idx) => {
                const done = completedIds.has(mod.id);
                return (
                  <motion.div 
                    key={mod.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div 
                      onClick={() => setCompletedIds(prev => { 
                        const n = new Set(prev); 
                        done ? n.delete(mod.id) : n.add(mod.id); 
                        return n; 
                      })} 
                      className={`h-full p-8 transition-all border cursor-pointer rounded-sm group ${
                        done 
                          ? 'bg-primary-light border-primary/30 shadow-inner' 
                          : 'bg-white border-gray-100 hover:border-primary/50 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-primary">{TYPE_ICONS[mod.type]}</span>
                          <span className="text-[10px] text-primary font-black uppercase tracking-widest">{mod.type.replace('_', ' ')}</span>
                        </div>
                        {done
                          ? <CheckCircle size={18} className="text-primary" />
                          : <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold"><Clock size={14} />{mod.estimatedMinutes}M</div>
                        }
                      </div>
                      <h4 className={`text-xl font-serif italic mb-4 ${done ? 'text-primary' : 'text-foreground'}`}>{mod.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">{mod.description}</p>
                      {done && <div className="mt-6 text-[10px] text-primary font-black uppercase tracking-widest">✓ Completed</div>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── JOURNEY TAB ── */}
      {activeTab === 'journey' && (
        <div className="max-w-4xl mx-auto px-8 py-16 mt-20">
          <div className="mb-12">
            <h2 className="text-4xl font-serif italic text-foreground">90-Day CLAT Journey</h2>
            <p className="text-muted-foreground mt-4 text-lg font-light">Day-by-day progression. Strategic mastery, one step at a time.</p>
          </div>
          <div className="space-y-4">
            {DAY_PLAN.slice(0, 30).map(d => {
              const done = completedIds.has(`day-${d.day}`);
              return (
                <motion.div 
                  key={d.day} 
                  initial={{ opacity: 0, x: -10 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                >
                  <div 
                    onClick={() => setCompletedIds(prev => { 
                      const n = new Set(prev); 
                      done ? n.delete(`day-${d.day}`) : n.add(`day-${d.day}`); 
                      return n; 
                    })} 
                    className={`flex items-center gap-8 p-6 transition-all border cursor-pointer rounded-sm ${
                      done 
                        ? 'bg-primary-light border-primary/20' 
                        : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-lg'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                      done ? 'bg-primary border-primary' : 'bg-gray-50 border-gray-100'
                    }`}>
                      {done 
                        ? <CheckCircle size={20} className="text-white" /> 
                        : <span className="text-xs font-black text-primary">D{d.day}</span>
                      }
                    </div>
                    <div className="flex-1">
                      <div className={`text-lg font-medium ${done ? 'text-primary' : 'text-foreground'}`}>{d.theme}</div>
                      <div className="flex gap-2 mt-3">
                        {d.subjects.map(s => {
                          const sub = SUBJECT_MODULES.find(m => m.id === s)!;
                          return <span key={s} className="text-[9px] px-3 py-1 bg-gray-50 text-muted-foreground border border-gray-100 rounded-sm font-black uppercase tracking-widest">{sub?.emoji} {sub?.title}</span>;
                        })}
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Protocol</div>
                      <div className="text-xs font-black text-primary mt-1 uppercase tracking-widest">{d.practiceType}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── REVISION TAB ── */}
      {activeTab === 'revision' && (
        <div className="max-w-3xl mx-auto px-8 py-20 mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic text-foreground">Spaced Revision System</h2>
            <p className="text-muted-foreground mt-4 text-lg font-light">Algorithmic flashcards for long-term retention.</p>
          </div>

          {/* Flashcard */}
          <div className="mb-20">
            <div className="text-[10px] text-primary font-black tracking-[0.3em] uppercase text-center mb-8">
              GK Flashcard — {flashIdx + 1} / {FLASHCARDS.length}
            </div>
            <motion.div
              key={flashIdx + String(flipped)}
              onClick={() => setFlipped(f => !f)}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`min-h-[300px] flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-all border rounded-sm ${
                flipped 
                  ? 'bg-primary-light border-primary/30 shadow-inner' 
                  : 'bg-white border-gray-100 shadow-2xl'
              }`}
            >
              <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-10">
                {flipped ? '✓ Correct Answer' : '? Tap to Reveal'}
              </div>
              <div className={`text-2xl font-serif italic leading-relaxed ${flipped ? 'text-primary' : 'text-foreground'}`}>
                {flipped ? FLASHCARDS[flashIdx].a : FLASHCARDS[flashIdx].q}
              </div>
            </motion.div>
            <div className="flex justify-center gap-6 mt-12">
              <button 
                onClick={() => { setFlipped(false); setFlashIdx(i => Math.max(0, i - 1)); }} 
                className="px-10 py-4 bg-white border border-gray-200 text-muted-foreground font-black uppercase text-[10px] tracking-widest hover:border-primary hover:text-primary transition-all rounded-sm"
              >
                ← Prev
              </button>
              <button 
                onClick={() => { setFlipped(false); setFlashIdx(i => (i + 1) % FLASHCARDS.length); }} 
                className="px-10 py-4 bg-primary text-white font-black uppercase text-[10px] tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 rounded-sm"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STRATEGY TAB ── */}
      {activeTab === 'strategy' && (
        <div className="max-w-6xl mx-auto px-8 py-20 mt-20">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl font-serif italic text-foreground">CLAT Strategic Core</h2>
            <p className="text-muted-foreground mt-4 text-lg font-light">The tactical roadmap most aspirants ignore. This is your leverage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Section Order Strategy', icon: '🎯', color: 'primary', points: ['Start with your strongest section to build momentum', 'Recommended: Legal → GK → English → Logical → Quant', 'Never start with Quant — it drains cognitive load', 'Maintain a strict 5-minute final review buffer'] },
              { title: 'Time Allocation', icon: '⏱️', color: 'primary', points: ['Legal Reasoning: 28 min (35 Qs)', 'Current Affairs: 20 min (25 Qs)', 'English: 22 min (28 Qs)', 'Logical Reasoning: 18 min (22 Qs)', 'Quant: 12 min (10 Qs)'] },
              { title: 'Deductive Elimination', icon: '✂️', color: 'primary', points: ['Identify two distractors immediately — never guess blindly', 'Flag "Extreme Language" (All, Never, Must) as red flags', 'Legal: Ignore external facts not found in the passage', 'Logical: Map the premise-conclusion link before looking at options'] },
              { title: 'Mock Analysis Protocol', icon: '📈', color: 'primary', points: ['Review every wrong answer before the next simulation', 'Track accuracy variance per section, not just raw scores', 'Target an average of < 75 seconds per passage question', 'Prioritize your weakest section for 60% of next week\'s prep'] },
            ].map(card => (
              <div key={card.title} className="bg-white p-10 border border-gray-100 shadow-sm rounded-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="text-xl font-serif italic text-primary">{card.title}</h3>
                </div>
                <ul className="space-y-4">
                  {card.points.map((p, i) => (
                    <li key={i} className="flex gap-4 text-sm text-muted-foreground leading-relaxed">
                      <ChevronRight size={16} className="text-primary flex-shrink-0 mt-1" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
