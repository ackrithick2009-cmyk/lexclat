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
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <div>
          <div style={{ fontSize: 10, color: '#C2A35D', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>LexCLAT</div>
          <div style={{ fontSize: 22, fontFamily: 'Georgia, serif', fontStyle: 'italic', marginTop: 2 }}>Learning Hub</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['modules', 'journey', 'revision', 'strategy'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: 10,
              fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
              background: activeTab === tab ? '#C2A35D' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? '#000' : '#9ca3af',
              transition: 'all 0.2s',
            }}>
              {tab === 'modules' ? '📚 Modules' : tab === 'journey' ? '🗓 Journey' : tab === 'revision' ? '🔁 Revision' : '🎯 Strategy'}
            </button>
          ))}
        </div>
      </div>

      {/* ── MODULES TAB ── */}
      {activeTab === 'modules' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 73px)' }}>
          {/* Subject Sidebar */}
          <aside style={{ width: 220, borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', padding: '16px 8px', gap: 4, overflowY: 'auto', background: 'rgba(255,255,255,0.01)' }}>
            {SUBJECT_MODULES.map(s => {
              const isActive = s.id === activeSubject;
              const done = s.modules.filter(m => completedIds.has(m.id)).length;
              const pct = Math.round((done / s.modules.length) * 100);
              return (
                <button key={s.id} onClick={() => { setActiveSubject(s.id); setActiveLayer(1); }} style={{
                  background: isActive ? s.accentColor : 'transparent',
                  border: isActive ? `1px solid ${s.color}40` : '1px solid transparent',
                  borderRadius: 6, padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: s.color }}>{SUBJECT_ICONS[s.id]}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? 'white' : '#9ca3af' }}>{s.title}</div>
                      <div style={{ fontSize: 9, color: s.color, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{pct}% done</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: s.color, borderRadius: 2, transition: 'width 0.5s' }} />
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Main Panel */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
            {/* Subject Header */}
            <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 28 }}>{subject.emoji}</span>
                  <h2 style={{ margin: 0, fontSize: 28, fontFamily: 'Georgia, serif', fontStyle: 'italic', color: subject.color }}>{subject.title}</h2>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#6b7280', letterSpacing: '0.08em' }}>{subject.tagline}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 32, fontFamily: 'Georgia, serif', color: subject.color, fontWeight: 700 }}>{progress}%</div>
                <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{completedCount}/{totalModules} Complete</div>
              </div>
            </div>

            {/* Layer Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {LAYER_LABELS.map((label, i) => {
                const layer = (i + 1) as 1 | 2 | 3 | 4;
                const isActive = activeLayer === layer;
                const layerCount = subject.modules.filter(m => m.layer === layer).length;
                const layerDone = subject.modules.filter(m => m.layer === layer && completedIds.has(m.id)).length;
                return (
                  <button key={layer} onClick={() => setActiveLayer(layer)} style={{
                    padding: '10px 18px', border: 'none', cursor: 'pointer', borderRadius: 6,
                    background: isActive ? LAYER_COLORS[i] : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'white' : '#9ca3af',
                    fontSize: 11, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase',
                    transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                    boxShadow: isActive ? `0 0 20px ${LAYER_COLORS[i]}30` : 'none',
                  }}>
                    <span>Layer {layer}: {label}</span>
                    <span style={{ fontSize: 9, opacity: 0.7, fontWeight: 400 }}>{LAYER_DESC[i]} · {layerDone}/{layerCount}</span>
                  </button>
                );
              })}
            </div>

            {/* Module Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
              {layerModules.map((mod, idx) => {
                const done = completedIds.has(mod.id);
                return (
                  <motion.div key={mod.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <div onClick={() => setCompletedIds(prev => { const n = new Set(prev); done ? n.delete(mod.id) : n.add(mod.id); return n; })} style={{
                      background: done ? `${subject.accentColor}` : 'rgba(255,255,255,0.03)',
                      border: done ? `1px solid ${subject.color}60` : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 10, padding: '20px 22px', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseOver={e => { if (!done) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'; }}
                      onMouseOut={e => { if (!done) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: LAYER_COLORS[activeLayer - 1], display: 'flex', alignItems: 'center' }}>{TYPE_ICONS[mod.type]}</span>
                          <span style={{ fontSize: 9, color: LAYER_COLORS[activeLayer - 1], fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{mod.type.replace('_', ' ')}</span>
                        </div>
                        {done
                          ? <CheckCircle size={16} color={subject.color} />
                          : <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#4b5563', fontSize: 10 }}><Clock size={12} />{mod.estimatedMinutes}m</div>
                        }
                      </div>
                      <h4 style={{ margin: '0 0 6px', fontSize: 15, fontFamily: 'Georgia, serif', fontStyle: 'italic', color: done ? subject.color : 'white' }}>{mod.title}</h4>
                      <p style={{ margin: 0, fontSize: 11, color: '#6b7280', lineHeight: 1.6 }}>{mod.description}</p>
                      {done && <div style={{ marginTop: 10, fontSize: 9, color: subject.color, fontWeight: 900, letterSpacing: '0.15em' }}>✓ COMPLETED — CLICK TO UNDO</div>}
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
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>90-Day CLAT Journey</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>Day-by-day plan. Not subjects → chapters. A living progression.</p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {DAY_PLAN.slice(0, 30).map(d => {
              const done = completedIds.has(`day-${d.day}`);
              return (
                <motion.div key={d.day} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: (d.day % 10) * 0.04 }}>
                  <div onClick={() => setCompletedIds(prev => { const n = new Set(prev); done ? n.delete(`day-${d.day}`) : n.add(`day-${d.day}`); return n; })} style={{
                    display: 'flex', alignItems: 'center', gap: 20, padding: '16px 20px', cursor: 'pointer',
                    background: done ? 'rgba(194,163,93,0.1)' : 'rgba(255,255,255,0.03)',
                    border: done ? '1px solid rgba(194,163,93,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8, transition: 'all 0.2s',
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: done ? '#C2A35D' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(194,163,93,0.3)' }}>
                      {done ? <CheckCircle size={18} color="#000" /> : <span style={{ fontSize: 11, fontWeight: 900, color: '#C2A35D' }}>D{d.day}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: done ? '#C2A35D' : 'white', marginBottom: 4 }}>{d.theme}</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {d.subjects.map(s => {
                          const sub = SUBJECT_MODULES.find(m => m.id === s)!;
                          return <span key={s} style={{ fontSize: 9, padding: '3px 8px', background: sub?.accentColor, color: sub?.color, borderRadius: 4, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sub?.emoji} {sub?.title}</span>;
                        })}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Practice</div>
                      <div style={{ fontSize: 11, color: '#C2A35D', fontWeight: 700, marginTop: 2 }}>{d.practiceType}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div style={{ textAlign: 'center', padding: '20px', color: '#4b5563', fontSize: 12, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 8 }}>
              Days 31–90 unlock progressively as you complete earlier days ✦
            </div>
          </div>
        </div>
      )}

      {/* ── REVISION TAB ── */}
      {activeTab === 'revision' && (
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Spaced Revision System</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>Flashcards + daily 5-Qs. The system that builds long-term retention.</p>
          </div>

          {/* Flashcard */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, color: '#C2A35D', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>GK Flashcard — {flashIdx + 1} / {FLASHCARDS.length}</div>
            <motion.div
              key={flashIdx + String(flipped)}
              onClick={() => setFlipped(f => !f)}
              initial={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background: flipped ? 'rgba(194,163,93,0.12)' : 'rgba(255,255,255,0.04)',
                border: flipped ? '1px solid rgba(194,163,93,0.4)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '48px 40px', textAlign: 'center', cursor: 'pointer', minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}
            >
              <div style={{ fontSize: 10, color: flipped ? '#C2A35D' : '#6b7280', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{flipped ? '✓ ANSWER' : '? QUESTION — TAP TO REVEAL'}</div>
              <div style={{ fontSize: 18, fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'white', lineHeight: 1.5 }}>
                {flipped ? FLASHCARDS[flashIdx].a : FLASHCARDS[flashIdx].q}
              </div>
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
              <button onClick={() => { setFlipped(false); setFlashIdx(i => Math.max(0, i - 1)); }} style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', cursor: 'pointer', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>← Prev</button>
              <button onClick={() => { setFlipped(false); setFlashIdx(i => (i + 1) % FLASHCARDS.length); }} style={{ padding: '10px 24px', background: '#C2A35D', border: 'none', color: '#000', cursor: 'pointer', borderRadius: 6, fontSize: 12, fontWeight: 900 }}>Next →</button>
            </div>
          </div>

          {/* Daily 5-Qs */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Flame size={18} color="#f97316" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Daily 5 Practice</div>
                <div style={{ fontSize: 10, color: '#6b7280' }}>5 questions per subject · Builds your streak</div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {SUBJECT_MODULES.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: s.accentColor, borderRadius: 8, border: `1px solid ${s.color}40` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>{s.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.title} · 5 Qs</span>
                  </div>
                  <button style={{ padding: '6px 14px', background: s.color, border: 'none', color: s.id === 'legal' ? '#000' : '#fff', cursor: 'pointer', borderRadius: 4, fontSize: 10, fontWeight: 900, letterSpacing: '0.1em' }}>START</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STRATEGY TAB ── */}
      {activeTab === 'strategy' && (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>CLAT Exam Strategy</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>The section most CLAT apps skip. This is your edge.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
            {[
              { title: 'Section Order Strategy', icon: '🎯', color: '#C2A35D', points: ['Start with your strongest section to build momentum', 'Recommended order: Legal → GK → English → Logical → Quant', 'Never start with Quant — it drains time and confidence', 'Always keep 5 min buffer for review'] },
              { title: 'Time Allocation', icon: '⏱️', color: '#3B82F6', points: ['Legal Reasoning: 28 min (35 Qs)', 'Current Affairs: 20 min (25 Qs)', 'English: 22 min (28 Qs)', 'Logical Reasoning: 18 min (22 Qs)', 'Quant: 12 min (10 Qs)'] },
              { title: 'Elimination Method', icon: '✂️', color: '#10B981', points: ['Always eliminate 2 options first — never guess blind', 'Look for options that are "too extreme" — usually wrong', 'In legal: eliminate options that add facts not in the passage', 'In GK: narrow down by eliminating the obviously wrong years/names'] },
              { title: 'Mock Score Improvement', icon: '📈', color: '#8B5CF6', points: ['Analyse every wrong answer before taking next mock', 'Track your accuracy per section — not just total score', 'Time per question average should be < 75 seconds', 'After 5 mocks: your weakest section should get the most prep time'] },
            ].map(card => (
              <div key={card.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span style={{ fontSize: 24 }}>{card.icon}</span>
                  <h3 style={{ margin: 0, fontSize: 16, fontFamily: 'Georgia, serif', fontStyle: 'italic', color: card.color }}>{card.title}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {card.points.map((p, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>
                      <ChevronRight size={14} color={card.color} style={{ flexShrink: 0, marginTop: 2 }} />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Predicted Score Card */}
          <div style={{ marginTop: 24, background: 'linear-gradient(135deg, rgba(194,163,93,0.15), rgba(194,163,93,0.05))', border: '1px solid rgba(194,163,93,0.3)', borderRadius: 12, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: '#C2A35D', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>🚀 Power Move Feature</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 20, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Predicted CLAT Score</h3>
              <p style={{ margin: 0, fontSize: 12, color: '#6b7280', maxWidth: 400 }}>Complete 3+ mocks to unlock your AI-predicted rank and college probability across all 24 NLUs.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontFamily: 'Georgia, serif', color: '#C2A35D', fontWeight: 700 }}>—</div>
              <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Take 3 Mocks to Unlock</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
