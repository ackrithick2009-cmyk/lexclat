import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Trophy, Flame, Target, Calendar, MessageSquare, BookOpen, 
  TrendingUp, Star, Check, Clock, Brain, Globe, Scale, BarChart3, 
  ChevronRight, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  calculateLevel, getLevelTitle, getLevelProgress, xpToNextLevel,
  ACHIEVEMENTS, TIER_COLORS, TIER_ORDER
} from '@/src/lib/gamification';

interface GamificationDashboardProps {
  userXp: number;
  userLevel: number;
  currentStreak: number;
  longestStreak: number;
  unlockedAchievementIds: string[];
  totalQuestions: number;
  totalCorrect: number;
  totalStudyMinutes: number;
  totalMocks: number;
  bestMockScore: number;
  userName: string;
  userPhoto?: string;
  onViewAchievements: () => void;
  onStartPractice: () => void;
  onStartMock: () => void;
  onOpenPlanner: () => void;
  onOpenTutor: () => void;
}

const SUBJECT_COLORS = {
  legal: '#C2A35D',
  gk: '#10B981',
  english: '#3B82F6',
  logical: '#EF4444',
  quant: '#8B5CF6',
};

const SUBJECT_ICONS = {
  legal: Scale,
  gk: Globe,
  english: BookOpen,
  logical: Brain,
  quant: BarChart3,
};

const DAILY_QUESTS = [
  { id: 'q1', label: 'Answer 10 questions', target: 10, reward: 50, icon: Zap },
  { id: 'q2', label: 'Study for 30 minutes', target: 30, reward: 30, icon: Clock },
  { id: 'q3', label: 'Complete 1 mock test', target: 1, reward: 100, icon: Trophy },
];

export default function GamificationDashboard({
  userXp, userLevel, currentStreak, longestStreak,
  unlockedAchievementIds, totalQuestions, totalCorrect,
  totalStudyMinutes, totalMocks, bestMockScore,
  userName, userPhoto,
  onViewAchievements, onStartPractice, onStartMock, onOpenPlanner, onOpenTutor
}: GamificationDashboardProps) {
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const xpProgress = getLevelProgress(userXp);
  const xpNext = xpToNextLevel(userXp);
  const title = getLevelTitle(userLevel);
  const studyHours = Math.floor(totalStudyMinutes / 60);
  const studyMins = totalStudyMinutes % 60;

  const unlockedSet = new Set(unlockedAchievementIds);
  const recentAchievements = ACHIEVEMENTS
    .filter(a => unlockedSet.has(a.id))
    .slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* ── Welcome Header ── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
            {userPhoto ? (
              <img src={userPhoto} alt="" className="w-12 h-12 rounded-lg object-cover" />
            ) : (
              <span className="text-xl font-bold text-primary">{userName[0]?.toUpperCase() || 'A'}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              {greeting}, <span className="text-primary">{userName.split(' ')[0]}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Level {userLevel} · <span className="text-primary font-semibold">{title}</span>
              {currentStreak > 0 && (
                <span className="ml-2 text-orange-500">🔥 {currentStreak} day streak</span>
              )}
            </p>
          </div>
        </div>
        {currentStreak > 0 && (
          <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1.5">
            <Flame size={14} className="mr-1" /> Daily Quest Active
          </Badge>
        )}
      </motion.div>

      {/* ── Stats Grid ── */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* XP Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="premium-card p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Star size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience</p>
                <p className="text-2xl font-bold text-foreground">{userXp.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">XP</span></p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-muted-foreground">Level {userLevel} → {userLevel + 1}</span>
                <span className="text-primary">{xpNext} XP to go</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-primary-bright rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-center">{xpProgress}% to next level</p>
            </div>
          </Card>
        </motion.div>

        {/* Streak Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="premium-card p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Flame size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Study Streak</p>
                <p className="text-2xl font-bold text-foreground">{currentStreak} <span className="text-sm text-muted-foreground font-normal">days</span></p>
              </div>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 h-10 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    i < Math.min(currentStreak, 7) 
                      ? 'bg-orange-500/20 border border-orange-500/30 text-orange-500' 
                      : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  {i < Math.min(currentStreak, 7) ? <Check size={14} /> : ''}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">Best: {longestStreak} days</p>
          </Card>
        </motion.div>

        {/* Accuracy Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="premium-card p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center border border-success/20">
                <Target size={20} className="text-success" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{totalCorrect} correct</span>
              <span>{totalQuestions} total</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Subject Mastery + Daily Quests + Recent Achievements ── */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Subject Mastery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="premium-card p-6 h-full">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                Subject Mastery
              </CardTitle>
            </CardHeader>
            <div className="space-y-4 mt-2">
              {Object.entries(SUBJECT_COLORS).map(([subject, color], i) => {
                const Icon = SUBJECT_ICONS[subject as keyof typeof SUBJECT_ICONS];
                const progress = [65, 42, 78, 55, 30][i]; // Mock data — replace with real
                return (
                  <div key={subject} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2 text-muted-foreground capitalize">
                        <Icon size={14} style={{ color }} />
                        {subject}
                      </span>
                      <span className="font-bold" style={{ color }}>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Daily Quests */}
        <motion.div initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card className="premium-card p-6 h-full">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                Daily Quests
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 mt-2">
              {DAILY_QUESTS.map((quest, i) => {
                const Icon = quest.icon;
                const progress = [7, 15, 0][i]; // Mock progress
                const completed = progress >= quest.target;
                return (
                  <div key={quest.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    completed 
                      ? 'bg-success/5 border-success/20' 
                      : 'bg-white/[0.02] border-border/50'
                  }`}>
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      completed ? 'bg-success/20' : 'bg-white/5'
                    }`}>
                      {completed ? (
                        <Check size={16} className="text-success" />
                      ) : (
                        <Icon size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${completed ? 'text-success line-through' : 'text-foreground'}`}>
                        {quest.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {progress}/{quest.target} · +{quest.reward} XP
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <Card className="premium-card p-6 h-full">
            <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Award size={16} className="text-primary" />
                Recent Achievements
              </CardTitle>
              <button onClick={onViewAchievements} className="text-[10px] font-bold text-primary hover:text-primary-bright transition-colors">
                View All <ChevronRight size={12} className="inline" />
              </button>
            </CardHeader>
            <div className="space-y-3 mt-2">
              {recentAchievements.length > 0 ? recentAchievements.map((ach, i) => (
                <motion.div 
                  key={ach.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-border/50"
                >
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ 
                      backgroundColor: TIER_COLORS[ach.tier].bg + '20',
                      border: `1px solid ${TIER_COLORS[ach.tier].bg}40`
                    }}
                  >
                    {ach.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{ach.title}</p>
                    <p className="text-[10px] text-muted-foreground">+{ach.xpReward} XP</p>
                  </div>
                  <Badge 
                    className="text-[8px] font-black uppercase h-4"
                    style={{ 
                      backgroundColor: TIER_COLORS[ach.tier].bg + '20',
                      color: TIER_COLORS[ach.tier].bg,
                      border: `1px solid ${TIER_COLORS[ach.tier].bg}30`
                    }}
                  >
                    {ach.tier}
                  </Badge>
                </motion.div>
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Lock size={24} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No achievements yet. Start practicing!</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Quick Actions ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: 'Practice Questions', icon: Zap, color: '#C9A84C', onClick: onStartPractice },
          { label: 'Take Mock Test', icon: Trophy, color: '#EF4444', onClick: onStartMock },
          { label: 'Study Plan', icon: Calendar, color: '#3B82F6', onClick: onOpenPlanner },
          { label: 'AI Tutor', icon: MessageSquare, color: '#10B981', onClick: onOpenTutor },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-border/50 hover:border-primary/30 transition-all text-left"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: action.color + '15', border: `1px solid ${action.color}30` }}
              >
                <Icon size={20} style={{ color: action.color }} />
              </div>
              <span className="text-xs font-bold text-foreground">{action.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── Study Time + Mock Stats ── */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="premium-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Study Time</p>
                <p className="text-2xl font-bold text-foreground">{studyHours}h {studyMins}m</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Weekly avg: {Math.round(totalStudyMinutes / 7)} min</span>
              <span>Today: 0 min</span>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="premium-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                <Trophy size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mock Tests</p>
                <p className="text-2xl font-bold text-foreground">{totalMocks} <span className="text-sm text-muted-foreground font-normal">completed</span></p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Best score: {bestMockScore}/120</span>
              <span>Avg: {totalMocks > 0 ? Math.round(bestMockScore / totalMocks) : 0}/120</span>
            </div>
          </Card>
        </motion.div>
      </div>

    </div>
  );
}
