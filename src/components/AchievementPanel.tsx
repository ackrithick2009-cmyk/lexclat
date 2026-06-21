import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, Star, Award, Lock, ChevronRight, Flame, TrendingUp, Target, Crown, Shield, Medal } from 'lucide-react';
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

const AchievementCard = ({ achievement, unlocked }: { achievement: Achievement; unlocked: boolean }) => {
  const Icon = TIER_ICONS[achievement.tier];
  const colors = TIER_COLORS[achievement.tier];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-5 border transition-all duration-300 ${
        unlocked 
          ? 'premium-card hover:border-primary/30' 
          : 'bg-surface/50 border-border/50 opacity-50'
      }`}
    >
      {unlocked && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
            <Star size={12} className="text-success fill-success" />
          </div>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ 
            backgroundColor: unlocked ? colors.bg + '20' : '#1A1E28',
            border: `1px solid ${unlocked ? colors.bg + '40' : 'rgba(255,255,255,0.06)'}` 
          }}
        >
          {unlocked ? (
            <Icon size={22} style={{ color: colors.bg }} />
          ) : (
            <Lock size={18} className="text-muted-dim" />
          )}
        </div>
        
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

export default function AchievementPanel({ 
  userXp, 
  userLevel, 
  currentStreak, 
  longestStreak, 
  unlockedAchievementIds 
}: AchievementPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  
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
  
  const xpToNext = xpToNextLevel(userXp);
  const levelProgress = getLevelProgress(userXp);
  const title = getLevelTitle(userLevel);
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4 md:px-0">
      {/* ── Header Stats ── */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="premium-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Crown size={28} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level</p>
              <p className="text-3xl font-serif text-foreground italic">{userLevel}</p>
              <p className="text-[10px] text-primary font-bold">{title}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-muted-foreground">To Next Level</span>
              <span className="text-primary">{xpToNext} XP</span>
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
        
        <Card className="premium-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Flame size={28} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Streak</p>
              <p className="text-3xl font-serif text-foreground italic">{currentStreak} <span className="text-lg text-muted-foreground">days</span></p>
              <p className="text-[10px] text-orange-500 font-bold">Best: {longestStreak} days</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-8 rounded-sm ${
                  i < Math.min(currentStreak, 7) 
                    ? 'bg-orange-500/20 border border-orange-500/30' 
                    : 'bg-white/5'
                }`}
              />
            ))}
          </div>
        </Card>
        
        <Card className="premium-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-success/10 flex items-center justify-center border border-success/20">
              <Trophy size={28} className="text-success" />
            </div>
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
              </div>
            ))}
          </div>
        </Card>
      </div>
      
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
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
