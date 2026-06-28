import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, Star, Award, Lock, ChevronRight, Flame, TrendingUp, Target, Crown, Shield, Medal, Sparkles, ArrowUp, ChevronDown, ChevronUp, RotateCcw, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ACHIEVEMENTS, 
  TIER_COLORS, 
  TIER_ORDER,
  calculateLevel, 
  getLevelTitle, 
  getLevelProgress,
  xpToNextLevel,
  type Achievement 
} from '@/src/lib/gamification';

interface AchievementPanelProps {
  userXp: number;
  userLevel: number;
  currentStreak: number;
  longestStreak: number;
  unlockedAchievementIds: string[];
}

const TIER_ICONS = {
  bronze: Medal,
  silver: Award,
  gold: Trophy,
  platinum: Crown,
  diamond: Shield,
};

/* ── Confetti Particle for celebrations ── */
const Confetti = ({ count = 30 }: { count?: number }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * -100 - 20,
    rotate: Math.random() * 360,
    color: ['#C9A84C', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#F59E0B'][Math.floor(Math.random() * 6)],
    size: Math.random() * 6 + 4,
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: '50%', y: '50%', opacity: 1, scale: 1, rotate: 0 }}
          animate={{ 
            x: `calc(50% + ${p.x}px)`, 
            y: `calc(50% + ${p.y + 200}px)`,
            opacity: 0,
            scale: 0.3,
            rotate: p.rotate + 720,
          }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeOut' }}
          className="absolute"
          style={{ width: p.size, height: p.size, backgroundColor: p.color, borderRadius: '2px' }}
        />
      ))}
    </div>
  );
};

/* ── Achievement Card ── */
const AchievementCard = ({ achievement, unlocked, isNew }: { achievement: Achievement; unlocked: boolean; isNew?: boolean }) => {
  const Icon = TIER_ICONS[achievement.tier];
  const colors = TIER_COLORS[achievement.tier];
  const [showConfetti, setShowConfetti] = useState(isNew);
  
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <motion.div
      initial={isNew ? { opacity: 0, scale: 0.8, y: 20 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      className={`relative p-5 border rounded-xl transition-all duration-300 overflow-hidden ${
        unlocked 
          ? 'premium-card hover:border-primary/30' 
          : 'bg-surface/50 border-border/50 opacity-60'
      } ${isNew ? 'ring-2 ring-primary/40 ring-offset-2 ring-offset-background' : ''}`}
    >
      {showConfetti && <Confetti count={20} />}
      
      {isNew && (
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 z-10"
        >
          <Badge className="bg-primary text-black font-black text-[8px] uppercase tracking-wider">
            <Sparkles size={10} className="mr-1" /> NEW
          </Badge>
        </motion.div>
      )}
      
      {unlocked && !isNew && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
            <Star size={12} className="text-success fill-success" />
          </div>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <motion.div 
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ 
            backgroundColor: unlocked ? colors.bg + '20' : '#1A1E28',
            border: `1px solid ${unlocked ? colors.bg + '40' : 'rgba(255,255,255,0.06)'}` 
          }}
          whileHover={unlocked ? { scale: 1.1, rotate: 5 } : {}}
        >
          {unlocked ? (
            <Icon size={22} style={{ color: colors.bg }} />
          ) : (
            <Lock size={18} className="text-muted-dim" />
          )}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`text-sm font-bold ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
              {achievement.title}
            </h4>
            <Badge 
              className="text-[8px] font-black uppercase tracking-wider h-4"
              style={{ 
                backgroundColor: unlocked ? colors.bg + '20' : '#1A1E28',
                color: unlocked ? colors.bg : '#5A6070',
                border: `1px solid ${unlocked ? colors.bg + '30' : 'rgba(255,255,255,0.06)'}`
              }}
            >
              {achievement.tier}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-primary" />
            <span className="text-[10px] font-bold text-primary">+{achievement.xpReward} XP</span>
            {unlocked && achievement.unlockedAt && (
              <span className="text-[9px] text-muted-dim ml-auto">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Next Unlock Preview ── */
const NextUnlockPreview = ({ state }: { state: { totalQuestionsAnswered: number; totalQuestionsCorrect: number; totalStudyMinutes: number; totalMocksCompleted: number; bestMockScore: number; currentStreak: number } }) => {
  const { totalQuestionsAnswered, totalQuestionsCorrect, totalStudyMinutes, totalMocksCompleted, bestMockScore, currentStreak } = state;
  const accuracy = totalQuestionsAnswered > 0 ? (totalQuestionsCorrect / totalQuestionsAnswered) * 100 : 0;
  
  const nextUnlocks = [
    { name: '10 Questions', progress: Math.min(100, (totalQuestionsAnswered / 10) * 100), current: totalQuestionsAnswered, target: 10 },
    { name: '1 Hour Study', progress: Math.min(100, (totalStudyMinutes / 60) * 100), current: totalStudyMinutes, target: 60 },
    { name: '3-Day Streak', progress: Math.min(100, (currentStreak / 3) * 100), current: currentStreak, target: 3 },
    { name: '1st Mock', progress: Math.min(100, (totalMocksCompleted / 1) * 100), current: totalMocksCompleted, target: 1 },
  ];
  
  return (
    <Card className="premium-card p-5">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <ArrowUp size={16} className="text-primary" />
        Next Unlock
      </h3>
      <div className="space-y-3">
        {nextUnlocks.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{item.name}</span>
              <span className="text-primary font-bold">{item.current}/{item.target}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-primary-bright rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* ── Main Panel ── */
export default function AchievementPanel({ 
  userXp, 
  userLevel, 
  currentStreak, 
  longestStreak, 
  unlockedAchievementIds 
}: AchievementPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [newUnlocks, setNewUnlocks] = useState<Set<string>>(new Set());
  
  const unlockedSet = new Set(unlockedAchievementIds);
  
  const filtered = ACHIEVEMENTS.filter(a => {
    if (filter === 'unlocked') return unlockedSet.has(a.id);
    if (filter === 'locked') return !unlockedSet.has(a.id);
    if (tierFilter) return a.tier === tierFilter;
    return true;
  });
  
  const unlockedCount = unlockedAchievementIds.length;
  const totalCount = ACHIEVEMENTS.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);
  
  const tierCounts = TIER_ORDER.reduce((acc, tier) => {
    acc[tier] = ACHIEVEMENTS.filter(a => a.tier === tier && unlockedSet.has(a.id)).length;
    return acc;
  }, {} as Record<string, number>);
  
  const tierTotals = TIER_ORDER.reduce((acc, tier) => {
    acc[tier] = ACHIEVEMENTS.filter(a => a.tier === tier).length;
    return acc;
  }, {} as Record<string, number>);
  
  const xpToNext = xpToNextLevel(userXp);
  const levelProgress = getLevelProgress(userXp);
  const title = getLevelTitle(userLevel);
  
  // Detect new unlocks (simulated - in real app, compare with previous state)
  useEffect(() => {
    const newOnes = unlockedAchievementIds.filter(id => !newUnlocks.has(id));
    if (newOnes.length > 0) {
      setNewUnlocks(new Set(unlockedAchievementIds));
    }
  }, [unlockedAchievementIds]);
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4 md:px-0">
      
      {/* ── Hero Stats Section ── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {/* Level Card */}
          <Card className="premium-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 relative">
              <motion.div 
                className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Crown size={28} className="text-primary" />
              </motion.div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level</p>
                <p className="text-3xl font-serif text-foreground italic">{userLevel}</p>
                <p className="text-[10px] text-primary font-bold">{title}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-muted-foreground">To Next Level</span>
                <span className="text-primary">{xpNext} XP</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-primary-bright rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </Card>
          
          {/* Streak Card */}
          <Card className="premium-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 relative">
              <motion.div 
                className="w-14 h-14 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame size={28} className="text-orange-500" />
              </motion.div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Streak</p>
                <p className="text-3xl font-serif text-foreground italic">{currentStreak} <span className="text-lg text-muted-foreground">days</span></p>
                <p className="text-[10px] text-orange-500 font-bold">Best: {longestStreak} days</p>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex-1 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold ${
                    i < Math.min(currentStreak, 7) 
                      ? 'bg-orange-500/20 border border-orange-500/30 text-orange-500' 
                      : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  {i < Math.min(currentStreak, 7) ? <Check size={12} /> : ''}
                </motion.div>
              ))}
            </div>
          </Card>
          
          {/* Achievements Card */}
          <Card className="premium-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 relative">
              <motion.div 
                className="w-14 h-14 rounded-lg bg-success/10 flex items-center justify-center border border-success/20"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Trophy size={28} className="text-success" />
              </motion.div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Achievements</p>
                <p className="text-3xl font-serif text-foreground italic">{unlockedCount}<span className="text-lg text-muted-foreground">/{totalCount}</span></p>
                <p className="text-[10px] text-success font-bold">{progress}% Complete</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {TIER_ORDER.map(tier => (
                <div key={tier} className="flex-1 text-center">
                  <div className="text-[10px] font-bold capitalize text-muted-foreground mb-1">{tier}</div>
                  <div className="text-lg font-bold" style={{ color: TIER_COLORS[tier as keyof typeof TIER_COLORS].bg }}>
                    {tierCounts[tier]}
                  </div>
                  <div className="text-[8px] text-muted-dim">/{tierTotals[tier]}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
      
      {/* ── Next Unlock Preview ── */}
      <NextUnlockPreview state={{
        totalQuestionsAnswered: 0, // These would be passed from parent in real usage
        totalQuestionsCorrect: 0,
        totalStudyMinutes: 0,
        totalMocksCompleted: 0,
        bestMockScore: 0,
        currentStreak: currentStreak,
      }} />
      
      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-surface rounded-lg p-1 border border-border">
          {(['all', 'unlocked', 'locked'] as const).map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setTierFilter(null); }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                filter === f && !tierFilter
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? 'All' : f === 'unlocked' ? 'Unlocked' : 'Locked'}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {TIER_ORDER.map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tierFilter === tier ? null : tier)}
              className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                tierFilter === tier
                  ? 'border-primary text-primary bg-primary/10' 
                  : 'border-border text-muted-foreground hover:border-border-light'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>
      
      {/* ── Achievement Grid ── */}
      <div className="grid md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filtered.map(achievement => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              unlocked={unlockedSet.has(achievement.id)}
              isNew={newUnlocks.has(achievement.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
