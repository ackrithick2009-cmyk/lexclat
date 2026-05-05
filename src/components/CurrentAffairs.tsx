import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Activity, Zap, Search, Target, ArrowRight, Scale, Globe, Landmark, BookOpen, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import currentAffairsData from '@/src/data/current_affairs.json';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CurrentAffairsEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  clat_relevance_summary: string;
}

// ─── Category Config ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<string, { color: string; icon: React.ReactNode; short: string }> = {
  'Legal/Judiciary':    { color: 'text-red-400 border-red-400/40',    icon: <Scale size={12} />,    short: 'Legal'    },
  'Legal/Health':       { color: 'text-red-400 border-red-400/40',    icon: <Scale size={12} />,    short: 'Legal'    },
  'Banking & Finance':  { color: 'text-emerald-400 border-emerald-400/40', icon: <TrendingUp size={12} />, short: 'Finance' },
  'International Affairs': { color: 'text-blue-400 border-blue-400/40', icon: <Globe size={12} />, short: 'Global'  },
  'Government Schemes': { color: 'text-amber-400 border-amber-400/40', icon: <Landmark size={12} />, short: 'Schemes' },
  'National Affairs':   { color: 'text-primary border-primary/40',     icon: <BookOpen size={12} />, short: 'National' },
};

const getCategoryStyle = (cat: string) => {
  for (const key of Object.keys(CATEGORY_CONFIG)) {
    if (cat.includes(key)) return CATEGORY_CONFIG[key];
  }
  return { color: 'text-primary border-primary/40', icon: <BookOpen size={12} />, short: 'Other' };
};

const ALL_FILTER_TABS = ['All', 'Legal', 'Finance', 'Global', 'National', 'Schemes'] as const;
type FilterTab = (typeof ALL_FILTER_TABS)[number];

const matchesTab = (entry: CurrentAffairsEntry, tab: FilterTab): boolean => {
  if (tab === 'All') return true;
  const cfg = getCategoryStyle(entry.category);
  return cfg.short === tab;
};

// ─── Impact Level Derivation ──────────────────────────────────────────────────

const getImpactLevel = (entry: CurrentAffairsEntry): 'High' | 'Medium' | 'Low' => {
  const highKeywords = ['Supreme Court', 'Constitution', 'Article 21', 'Fundamental', 'SC', 'RBI', 'landmark'];
  const medKeywords = ['SEBI', 'NPCI', 'Ministry', 'Cabinet', 'NITI Aayog'];
  const text = entry.title + entry.clat_relevance_summary;
  if (highKeywords.some(k => text.includes(k))) return 'High';
  if (medKeywords.some(k => text.includes(k))) return 'Medium';
  return 'Low';
};

// ─── Category counts for sidebar ─────────────────────────────────────────────

const ALL_DATA: CurrentAffairsEntry[] = currentAffairsData as CurrentAffairsEntry[];

const categoryCounts = ALL_FILTER_TABS.slice(1).map(tab => ({
  label: tab,
  count: ALL_DATA.filter(e => matchesTab(e, tab as FilterTab)).length,
}));

// ─── Component ────────────────────────────────────────────────────────────────

const CurrentAffairs = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = ALL_DATA.filter(entry => {
    const matchesSearch =
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.category.toLowerCase().includes(search.toLowerCase()) ||
      entry.clat_relevance_summary.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesTab(entry, activeFilter);
  });

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 px-6 pt-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-border pb-12">
        <div>
          <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] mb-4 rounded-none h-6">
            Live Intelligence Feed — May 2026
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white tracking-tighter italic">
            Current Affairs <br />& CLAT Intel.
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-4">
            {ALL_DATA.length} entries · AffairsCloud · Updated {formatDate(ALL_DATA[0]?.date ?? '')}
          </p>
        </div>
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <Input
            id="ca-search"
            placeholder="Search intelligence feed..."
            className="bg-accent h-16 pl-12 rounded-none border-border focus:border-primary text-white font-serif italic text-lg shadow-inner ring-0 focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {ALL_FILTER_TABS.map(tab => (
          <button
            key={tab}
            id={`ca-filter-${tab.toLowerCase()}`}
            onClick={() => setActiveFilter(tab)}
            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
              activeFilter === tab
                ? 'bg-primary text-black border-primary'
                : 'bg-transparent text-gray-500 border-border hover:border-primary/50 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">

        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          {filtered.length > 0 ? (
            filtered.map((entry, idx) => {
              const catStyle = getCategoryStyle(entry.category);
              const impact = getImpactLevel(entry);
              const isExpanded = expandedId === entry.id;

              return (
                <motion.div
                  key={entry.id}
                  id={`ca-entry-${entry.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-surface border border-border group hover:border-primary/40 transition-all relative overflow-hidden cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                >
                  <div className="p-6 space-y-4">
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`rounded-none uppercase tracking-widest text-[8px] h-6 px-3 flex items-center gap-1 ${catStyle.color}`}
                        >
                          {catStyle.icon} {entry.category.split('/')[0].trim()}
                        </Badge>
                        <span className={`text-[9px] font-black uppercase tracking-widest border rounded px-2 py-0.5 ${
                          impact === 'High' ? 'border-red-500/50 text-red-500' :
                          impact === 'Medium' ? 'border-amber-500/50 text-amber-500' :
                          'border-border text-gray-600'
                        }`}>
                          {impact} Impact
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-[9px] font-black uppercase tracking-widest">
                        <Calendar size={10} />
                        {formatDate(entry.date)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif text-white italic tracking-tight leading-snug group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>

                    {/* CLAT Relevance — collapsed preview */}
                    <AnimatePresence>
                      {!isExpanded ? (
                        <motion.p
                          key="preview"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-medium"
                        >
                          {entry.clat_relevance_summary}
                        </motion.p>
                      ) : (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-accent/40 border border-border p-5 space-y-3">
                            <div className="flex items-center gap-2">
                              <Target size={12} className="text-primary" />
                              <span className="text-[9px] text-primary font-black uppercase tracking-widest">CLAT Relevance & Legal Context</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {entry.clat_relevance_summary}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand hint */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-[9px] text-primary font-black uppercase tracking-widest">
                        {isExpanded ? 'Collapse' : 'View CLAT Relevance'}
                      </span>
                      <ArrowRight
                        size={14}
                        className={`text-primary transition-all ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="bg-surface border border-border p-20 text-center space-y-6">
              <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto text-gray-700">
                <Search size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif text-white italic">No Intelligence Matches</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                  Your search does not align with our current intelligence trajectory.
                </p>
              </div>
              <button
                onClick={() => { setSearch(''); setActiveFilter('All'); }}
                className="text-primary text-[10px] font-black uppercase tracking-widest underline decoration-primary/30 underline-offset-8"
              >
                Flush Search Parameters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-[#0C0F14] border-border rounded-none p-8 space-y-8 sticky top-32">
            <div className="space-y-2">
              <h4 className="text-xs text-primary font-black uppercase tracking-[0.3em]">Knowledge Categorization</h4>
              <div className="h-px bg-primary/20 w-12" />
            </div>
            <div className="space-y-6">
              {categoryCounts.map((mod, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-pointer"
                  onClick={() => setActiveFilter(mod.label as FilterTab)}
                >
                  <span className={`text-[11px] uppercase font-bold tracking-widest transition-colors ${activeFilter === mod.label ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`}>
                    {mod.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-primary font-black opacity-40">
                      {mod.count < 10 ? `0${mod.count}` : mod.count}
                    </span>
                    <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-primary text-black space-y-6 mt-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5 translate-x-4 translate-y-4 rotate-12 group-hover:rotate-0 transition-transform">
                <Activity size={80} />
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-6 h-6 bg-black flex items-center justify-center text-primary">
                  <Zap size={12} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest underline decoration-black/20">LIVE: INTELLIGENCE PULSE</span>
              </div>
              <p className="text-black text-sm font-black leading-tight italic relative z-10">
                "{filtered[0]?.title ?? 'SC expands Article 21 to include right to safe roads...'}"
              </p>
              <div className="text-[8px] text-black/60 uppercase font-black tracking-widest leading-none relative z-10">
                {filtered.length} entries matching current filter
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default CurrentAffairs;
