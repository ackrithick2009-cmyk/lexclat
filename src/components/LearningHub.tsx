import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { SUBJECT_MODULES, type SubModule } from '../data/learningModules';

const LAYER_LABELS = ['Foundation', 'Practice', 'Application', 'Exam'] as const;

const SUBJECT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  legal: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  gk: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  english: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  logical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  quant: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
};

const TYPE_LABEL: Record<SubModule['type'], string> = {
  lesson: 'Lesson',
  drill: 'Drill',
  passage_set: 'Passage',
  mock: 'Mock',
};

export default function LearningHub() {
  const [activeSubject, setActiveSubject] = useState(SUBJECT_MODULES[0].id);
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3 | 4>(1);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const subject = SUBJECT_MODULES.find(s => s.id === activeSubject)!;
  const layerModules = subject.modules.filter(m => m.layer === activeLayer);
  const colors = SUBJECT_COLORS[subject.id] ?? SUBJECT_COLORS.legal;

  const completedCount = subject.modules.filter(m => completedIds.has(m.id)).length;
  const progress = Math.round((completedCount / subject.modules.length) * 100);

  const toggleComplete = (id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">CLAT Preparation</p>
          <h1 className="text-3xl font-serif font-semibold text-foreground">Learning Hub</h1>
        </div>

        {/* Subject tabs — horizontal, minimal */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {SUBJECT_MODULES.map(s => {
            const isActive = s.id === activeSubject;
            const pct = Math.round((s.modules.filter(m => completedIds.has(m.id)).length / s.modules.length) * 100);
            return (
              <button
                key={s.id}
                onClick={() => { setActiveSubject(s.id); setActiveLayer(1); }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
                }`}
              >
                {s.title.split(' ')[0]} {s.title.includes('&') ? '& GK' : ''}
                {pct > 0 && <span className={`ml-2 text-xs ${isActive ? 'text-blue-100' : 'text-muted-foreground'}`}>{pct}%</span>}
              </button>
            );
          })}
        </div>

        {/* Subject info + progress */}
        <div className="bg-white border border-border rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-semibold text-foreground">{subject.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{subject.tagline}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{progress}%</div>
              <div className="text-xs text-muted-foreground">{completedCount}/{subject.modules.length} done</div>
            </div>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Layer pills — compact */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {LAYER_LABELS.map((label, i) => {
            const layer = (i + 1) as 1 | 2 | 3 | 4;
            const isActive = activeLayer === layer;
            return (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  isActive
                    ? layer <= 2
                      ? 'bg-primary text-white border-primary'
                      : 'bg-accent text-white border-accent'
                    : 'bg-white text-muted-foreground border-border hover:border-primary/30'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Module list — clean cards */}
        <div className="space-y-3">
          {layerModules.map((mod, idx) => {
            const done = completedIds.has(mod.id);
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <button
                  onClick={() => toggleComplete(mod.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    done
                      ? `${colors.bg} ${colors.border}`
                      : 'bg-white border-border hover:border-primary/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold uppercase tracking-wide ${done ? colors.text : 'text-primary'}`}>
                          {TYPE_LABEL[mod.type]}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} /> {mod.estimatedMinutes} min
                        </span>
                      </div>
                      <h3 className={`font-medium text-foreground ${done ? colors.text : ''}`}>{mod.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{mod.description}</p>
                    </div>
                    <div className="flex-shrink-0 pt-1">
                      {done ? (
                        <CheckCircle size={22} className="text-primary" />
                      ) : (
                        <ChevronRight size={20} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {layerModules.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No modules in this section.</div>
        )}
      </div>
    </div>
  );
}
