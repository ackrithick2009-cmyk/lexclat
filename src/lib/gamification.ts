import { db, auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';

// ─── Achievement Types ───

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  xpReward: number;
  condition: string;
  unlockedAt?: string | Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  unlockedAt?: string | Date;
}

export interface GamificationState {
  xp: number;
  level: number;
  xpToNext: number;
  title: string;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  badges: Badge[];
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;
  totalStudyMinutes: number;
  totalMocksCompleted: number;
  bestMockScore: number;
  studyDaysThisWeek: number;
  studyDaysThisMonth: number;
  rank: string;
}

// ─── Achievement Definitions ───

export const ACHIEVEMENTS: Achievement[] = [
  // ── Onboarding ──
  { id: 'first_login', title: 'First Step', description: 'Accessed the LexCLAT portal for the first time.', icon: '👋', tier: 'bronze', xpReward: 20, condition: 'first_login' },
  { id: 'profile_complete', title: 'Identity Established', description: 'Completed your aspirant profile with target NLU and diagnostic scores.', icon: '🆔', tier: 'bronze', xpReward: 30, condition: 'profile_complete' },
  
  // ── Question Mastery ──
  { id: 'first_question', title: 'First Strike', description: 'Answered your first practice question.', icon: '⚡', tier: 'bronze', xpReward: 10, condition: 'questions_answered >= 1' },
  { id: 'question_10', title: 'Deca-Solver', description: 'Answered 10 practice questions.', icon: '🔟', tier: 'bronze', xpReward: 25, condition: 'questions_answered >= 10' },
  { id: 'question_50', title: 'Half-Century', description: 'Answered 50 practice questions.', icon: '🏏', tier: 'silver', xpReward: 60, condition: 'questions_answered >= 50' },
  { id: 'question_100', title: 'Centurion', description: 'Answered 100 practice questions.', icon: '💯', tier: 'gold', xpReward: 150, condition: 'questions_answered >= 100' },
  { id: 'question_500', title: 'Grand Master', description: 'Answered 500 practice questions.', icon: '👑', tier: 'platinum', xpReward: 500, condition: 'questions_answered >= 500' },
  { id: 'perfect_streak_10', title: 'Unbroken', description: 'Answered 10 questions correctly in a row.', icon: '🔥', tier: 'gold', xpReward: 100, condition: 'perfect_streak >= 10' },
  { id: 'perfect_streak_25', title: 'Invincible', description: 'Answered 25 questions correctly in a row.', icon: '⚔️', tier: 'platinum', xpReward: 300, condition: 'perfect_streak >= 25' },
  
  // ── Accuracy ──
  { id: 'accuracy_70', title: 'Sharpshooter', description: 'Maintained 70% accuracy across 50+ questions.', icon: '🎯', tier: 'silver', xpReward: 75, condition: 'accuracy >= 70 AND questions_answered >= 50' },
  { id: 'accuracy_85', title: 'Precisionist', description: 'Maintained 85% accuracy across 100+ questions.', icon: '🎯', tier: 'gold', xpReward: 200, condition: 'accuracy >= 85 AND questions_answered >= 100' },
  { id: 'accuracy_95', title: 'Perfect Aim', description: 'Maintained 95% accuracy across 200+ questions.', icon: '💎', tier: 'platinum', xpReward: 500, condition: 'accuracy >= 95 AND questions_answered >= 200' },
  
  // ── Subject Mastery ──
  { id: 'legal_master', title: 'Legal Eagle', description: 'Answered 50 Legal Reasoning questions with 80%+ accuracy.', icon: '⚖️', tier: 'gold', xpReward: 150, condition: 'legal_answered >= 50 AND legal_accuracy >= 80' },
  { id: 'gk_master', title: 'Globe Trotter', description: 'Answered 50 GK questions with 80%+ accuracy.', icon: '🌍', tier: 'gold', xpReward: 150, condition: 'gk_answered >= 50 AND gk_accuracy >= 80' },
  { id: 'english_master', title: 'Wordsmith', description: 'Answered 50 English questions with 80%+ accuracy.', icon: '📖', tier: 'gold', xpReward: 150, condition: 'english_answered >= 50 AND english_accuracy >= 80' },
  { id: 'logical_master', title: 'Logic Architect', description: 'Answered 50 Logical Reasoning questions with 80%+ accuracy.', icon: '🧩', tier: 'gold', xpReward: 150, condition: 'logical_answered >= 50 AND logical_accuracy >= 80' },
  { id: 'quant_master', title: 'Number Ninja', description: 'Answered 50 Quant questions with 80%+ accuracy.', icon: '📊', tier: 'gold', xpReward: 150, condition: 'quant_answered >= 50 AND quant_accuracy >= 80' },
  { id: 'all_rounder', title: 'All-Rounder', description: 'Achieved 70%+ accuracy in all 5 subjects.', icon: '⭐', tier: 'platinum', xpReward: 400, condition: 'all_subjects_accuracy >= 70' },
  
  // ── Mock Tests ──
  { id: 'first_mock', title: 'Mock Warrior', description: 'Completed your first full mock test.', icon: '📝', tier: 'bronze', xpReward: 50, condition: 'mocks_completed >= 1' },
  { id: 'mock_5', title: 'Battle-Tested', description: 'Completed 5 full mock tests.', icon: '🛡️', tier: 'silver', xpReward: 100, condition: 'mocks_completed >= 5' },
  { id: 'mock_20', title: 'Veteran', description: 'Completed 20 full mock tests.', icon: '🏆', tier: 'gold', xpReward: 250, condition: 'mocks_completed >= 20' },
  { id: 'mock_50', title: 'Mock Marathoner', description: 'Completed 50 full mock tests.', icon: '🏅', tier: 'platinum', xpReward: 750, condition: 'mocks_completed >= 50' },
  { id: 'mock_score_80', title: 'High Scorer', description: 'Scored 80+ in a mock test.', icon: '🎖️', tier: 'silver', xpReward: 100, condition: 'best_mock_score >= 80' },
  { id: 'mock_score_100', title: 'Century', description: 'Scored 100+ in a mock test.', icon: '💯', tier: 'gold', xpReward: 250, condition: 'best_mock_score >= 100' },
  { id: 'mock_score_120', title: 'Elite Score', description: 'Scored 120+ in a mock test.', icon: '🥇', tier: 'platinum', xpReward: 600, condition: 'best_mock_score >= 120' },
  
  // ── Study Streaks ──
  { id: 'streak_3', title: 'Warming Up', description: 'Studied for 3 consecutive days.', icon: '🔥', tier: 'bronze', xpReward: 30, condition: 'streak >= 3' },
  { id: 'streak_7', title: 'Week Warrior', description: 'Studied for 7 consecutive days.', icon: '📅', tier: 'silver', xpReward: 75, condition: 'streak >= 7' },
  { id: 'streak_14', title: 'Fortnight Champion', description: 'Studied for 14 consecutive days.', icon: '💪', tier: 'gold', xpReward: 150, condition: 'streak >= 14' },
  { id: 'streak_30', title: 'Month Master', description: 'Studied for 30 consecutive days.', icon: '🌙', tier: 'platinum', xpReward: 400, condition: 'streak >= 30' },
  { id: 'streak_60', title: 'Unstoppable', description: 'Studied for 60 consecutive days.', icon: '🚀', tier: 'diamond', xpReward: 1000, condition: 'streak >= 60' },
  { id: 'streak_100', title: 'Century Streak', description: 'Studied for 100 consecutive days.', icon: '👑', tier: 'diamond', xpReward: 2500, condition: 'streak >= 100' },
  
  // ── Study Time ──
  { id: 'study_1h', title: 'First Hour', description: 'Accumulated 1 hour of study time.', icon: '⏱️', tier: 'bronze', xpReward: 15, condition: 'study_minutes >= 60' },
  { id: 'study_10h', title: 'Dedicated', description: 'Accumulated 10 hours of study time.', icon: '⏳', tier: 'silver', xpReward: 50, condition: 'study_minutes >= 600' },
  { id: 'study_50h', title: 'Scholar', description: 'Accumulated 50 hours of study time.', icon: '📚', tier: 'gold', xpReward: 150, condition: 'study_minutes >= 3000' },
  { id: 'study_100h', title: 'Century Scholar', description: 'Accumulated 100 hours of study time.', icon: '🎓', tier: 'platinum', xpReward: 400, condition: 'study_minutes >= 6000' },
  { id: 'study_500h', title: 'Juris Master', description: 'Accumulated 500 hours of study time.', icon: '🏛️', tier: 'diamond', xpReward: 1500, condition: 'study_minutes >= 30000' },
  
  // ── Special ──
  { id: 'tutor_first', title: 'Curious Mind', description: 'Asked your first question to the AI Tutor.', icon: '🤖', tier: 'bronze', xpReward: 15, condition: 'tutor_chats >= 1' },
  { id: 'tutor_10', title: 'Socratic Student', description: 'Asked 10 questions to the AI Tutor.', icon: '💬', tier: 'silver', xpReward: 50, condition: 'tutor_chats >= 10' },
  { id: 'flashcard_50', title: 'Flash Fanatic', description: 'Viewed 50 flashcards.', icon: '🔁', tier: 'bronze', xpReward: 25, condition: 'flashcards_viewed >= 50' },
  { id: 'ca_30', title: 'News Hound', description: 'Read 30 current affairs articles.', icon: '📰', tier: 'silver', xpReward: 60, condition: 'ca_read >= 30' },
  { id: 'early_bird', title: 'Early Bird', description: 'Started studying before 6 AM.', icon: '🌅', tier: 'bronze', xpReward: 20, condition: 'early_study' },
  { id: 'night_owl', title: 'Night Owl', description: 'Studied past midnight.', icon: '🦉', tier: 'bronze', xpReward: 20, condition: 'night_study' },
  { id: 'weekend_warrior', title: 'Weekend Warrior', description: 'Studied for 4+ hours on a weekend.', icon: '🗓️', tier: 'silver', xpReward: 50, condition: 'weekend_hours >= 4' },
  { id: 'sunday_revision', title: 'Sunday Reviser', description: 'Used the revision feature on a Sunday.', icon: '✝️', tier: 'bronze', xpReward: 15, condition: 'sunday_revision' },
  { id: 'plan_follower', title: 'Disciplined', description: 'Followed your study plan for 7 consecutive days.', icon: '📋', tier: 'silver', xpReward: 75, condition: 'plan_followed >= 7' },
  
  // ── Legendary ──
  { id: 'air_1', title: 'AIR 1 Material', description: 'Achieved a mock score of 140+ with 95%+ accuracy.', icon: '👑', tier: 'diamond', xpReward: 5000, condition: 'best_mock_score >= 140 AND accuracy >= 95' },
  { id: 'completionist', title: 'Completionist', description: 'Completed every module in the Learning Hub.', icon: '🏆', tier: 'platinum', xpReward: 1000, condition: 'all_modules_complete' },
  { id: 'lexie_bestie', title: 'Lexie\'s Best Friend', description: 'Had 50+ conversations with the AI Tutor.', icon: '💖', tier: 'gold', xpReward: 200, condition: 'tutor_chats >= 50' },
];

// ─── Tier Colors ───

export const TIER_COLORS = {
  bronze: { bg: '#CD7F32', text: '#FFFFFF', gradient: 'from-orange-700 to-amber-600' },
  silver: { bg: '#C0C0C0', text: '#0C0E14', gradient: 'from-gray-400 to-gray-300' },
  gold: { bg: '#C9A84C', text: '#0C0E14', gradient: 'from-amber-500 to-yellow-400' },
  platinum: { bg: '#E5E4E2', text: '#0C0E14', gradient: 'from-slate-300 to-slate-200' },
  diamond: { bg: '#B9F2FF', text: '#0C0E14', gradient: 'from-cyan-300 to-blue-200' },
};

export const TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

// ─── XP & Level System ───

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000,
  6500, 8200, 10000, 12000, 14500, 17500, 21000, 25000, 30000, 36000, 43000,
  51000, 60000, 70000, 82000, 95000, 110000, 127000, 145000, 165000, 190000
];

export const LEVEL_TITLES = [
  'Novice Aspirant', 'Legal Apprentice', 'Case Reader', 'Argument Analyst',
  'Sectional Scholar', 'Mock Warrior', 'Juris Master', 'Logic Architect',
  'Elite Strategist', 'Rank Contender', 'NLU Hopeful', 'CLAT Veteran',
  'Senior Jurist', 'Grand Scholar', 'Legal Luminary', 'Supreme Aspirant',
  'Juris Elite', 'CLAT Legend', 'Top 100 Material', 'AIR 1 Caliber',
  'Juris Omnipotent', 'Supreme Court Clerk', 'Attorney General', 'Chief Justice',
  'Juris Immortal', 'Legal Deity', 'God of Law', 'Omniscient Jurist',
  'The Constitution', 'The Final Verdict', 'Lex Suprema'
];

export function calculateLevel(xp: number): number {
  let level = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i;
    else break;
  }
  return level;
}

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length - 1)] || 'Legend';
}

export function xpToNextLevel(currentXp: number): number {
  const level = calculateLevel(currentXp);
  const next = LEVEL_THRESHOLDS[Math.min(level + 1, LEVEL_THRESHOLDS.length - 1)] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return Math.max(0, next - currentXp);
}

export function getLevelProgress(xp: number): number {
  const level = calculateLevel(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level];
  const nextThreshold = LEVEL_THRESHOLDS[Math.min(level + 1, LEVEL_THRESHOLDS.length - 1)] || currentThreshold;
  if (nextThreshold === currentThreshold) return 100;
  return Math.min(100, Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100));
}

// ─── Achievement Checking ───

export function checkAchievements(state: Partial<GamificationState>): Achievement[] {
  const unlocked: Achievement[] = [];
  const { totalQuestionsAnswered = 0, totalQuestionsCorrect = 0, totalStudyMinutes = 0, totalMocksCompleted = 0, bestMockScore = 0, currentStreak = 0 } = state;
  
  const accuracy = totalQuestionsAnswered > 0 ? (totalQuestionsCorrect / totalQuestionsAnswered) * 100 : 0;
  
  for (const achievement of ACHIEVEMENTS) {
    let shouldUnlock = false;
    
    switch (achievement.condition) {
      case 'first_login':
        shouldUnlock = true;
        break;
      case 'questions_answered >= 1':
        shouldUnlock = totalQuestionsAnswered >= 1;
        break;
      case 'questions_answered >= 10':
        shouldUnlock = totalQuestionsAnswered >= 10;
        break;
      case 'questions_answered >= 50':
        shouldUnlock = totalQuestionsAnswered >= 50;
        break;
      case 'questions_answered >= 100':
        shouldUnlock = totalQuestionsAnswered >= 100;
        break;
      case 'questions_answered >= 500':
        shouldUnlock = totalQuestionsAnswered >= 500;
        break;
      case 'accuracy >= 70 AND questions_answered >= 50':
        shouldUnlock = accuracy >= 70 && totalQuestionsAnswered >= 50;
        break;
      case 'accuracy >= 85 AND questions_answered >= 100':
        shouldUnlock = accuracy >= 85 && totalQuestionsAnswered >= 100;
        break;
      case 'accuracy >= 95 AND questions_answered >= 200':
        shouldUnlock = accuracy >= 95 && totalQuestionsAnswered >= 200;
        break;
      case 'mocks_completed >= 1':
        shouldUnlock = totalMocksCompleted >= 1;
        break;
      case 'mocks_completed >= 5':
        shouldUnlock = totalMocksCompleted >= 5;
        break;
      case 'mocks_completed >= 20':
        shouldUnlock = totalMocksCompleted >= 20;
        break;
      case 'mocks_completed >= 50':
        shouldUnlock = totalMocksCompleted >= 50;
        break;
      case 'best_mock_score >= 80':
        shouldUnlock = bestMockScore >= 80;
        break;
      case 'best_mock_score >= 100':
        shouldUnlock = bestMockScore >= 100;
        break;
      case 'best_mock_score >= 120':
        shouldUnlock = bestMockScore >= 120;
        break;
      case 'streak >= 3':
        shouldUnlock = currentStreak >= 3;
        break;
      case 'streak >= 7':
        shouldUnlock = currentStreak >= 7;
        break;
      case 'streak >= 14':
        shouldUnlock = currentStreak >= 14;
        break;
      case 'streak >= 30':
        shouldUnlock = currentStreak >= 30;
        break;
      case 'streak >= 60':
        shouldUnlock = currentStreak >= 60;
        break;
      case 'streak >= 100':
        shouldUnlock = currentStreak >= 100;
        break;
      case 'study_minutes >= 60':
        shouldUnlock = totalStudyMinutes >= 60;
        break;
      case 'study_minutes >= 600':
        shouldUnlock = totalStudyMinutes >= 600;
        break;
      case 'study_minutes >= 3000':
        shouldUnlock = totalStudyMinutes >= 3000;
        break;
      case 'study_minutes >= 6000':
        shouldUnlock = totalStudyMinutes >= 6000;
        break;
      case 'study_minutes >= 30000':
        shouldUnlock = totalStudyMinutes >= 30000;
        break;
      default:
        break;
    }
    
    if (shouldUnlock) {
      unlocked.push(achievement);
    }
  }
  
  return unlocked;
}

// ─── Streak Engine ───

export async function calculateStreak(userId: string): Promise<{ current: number; longest: number; isNewDay: boolean }> {
  const streakRef = doc(db, 'users', userId, 'gamification', 'streak');
  const snap = await getDoc(streakRef);
  
  const today = new Date().toISOString().split('T')[0];
  
  if (!snap.exists()) {
    await setDoc(streakRef, {
      current: 1,
      longest: 1,
      lastActiveDate: today,
      history: [today],
      createdAt: serverTimestamp(),
    });
    return { current: 1, longest: 1, isNewDay: true };
  }
  
  const data = snap.data();
  const lastDate = data.lastActiveDate;
  
  if (lastDate === today) {
    return { current: data.current, longest: data.longest, isNewDay: false };
  }
  
  const last = new Date(lastDate);
  const todayDate = new Date(today);
  const diffDays = (todayDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  
  let current = 1;
  let longest = data.longest;
  
  if (diffDays === 1) {
    current = data.current + 1;
    longest = Math.max(longest, current);
  } else if (diffDays > 1) {
    current = 1;
  }
  
  const history = data.history || [];
  history.push(today);
  
  await updateDoc(streakRef, {
    current,
    longest,
    lastActiveDate: today,
    history: history.slice(-365), // Keep last year
    updatedAt: serverTimestamp(),
  });
  
  return { current, longest, isNewDay: true };
}

export async function getStreakHistory(userId: string): Promise<string[]> {
  const streakRef = doc(db, 'users', userId, 'gamification', 'streak');
  const snap = await getDoc(streakRef);
  if (!snap.exists()) return [];
  return snap.data().history || [];
}

// ─── Gamification State Management ───

export async function initializeGamification(userId: string) {
  const gamificationRef = doc(db, 'users', userId, 'gamification', 'summary');
  const snap = await getDoc(gamificationRef);
  
  if (!snap.exists()) {
    await setDoc(gamificationRef, {
      xp: 0,
      level: 0,
      xpToNext: 100,
      title: 'Novice Aspirant',
      currentStreak: 0,
      longestStreak: 0,
      achievements: [],
      badges: [],
      totalQuestionsAnswered: 0,
      totalQuestionsCorrect: 0,
      totalStudyMinutes: 0,
      totalMocksCompleted: 0,
      bestMockScore: 0,
      studyDaysThisWeek: 0,
      studyDaysThisMonth: 0,
      rank: 'Unranked',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

export async function addXP(userId: string, amount: number): Promise<{ newXp: number; newLevel: number; leveledUp: boolean }> {
  const gamificationRef = doc(db, 'users', userId, 'gamification', 'summary');
  const snap = await getDoc(gamificationRef);
  
  if (!snap.exists()) {
    await initializeGamification(userId);
    return addXP(userId, amount);
  }
  
  const data = snap.data();
  const oldLevel = data.level || 0;
  const newXp = (data.xp || 0) + amount;
  const newLevel = calculateLevel(newXp);
  const xpToNext = xpToNextLevel(newXp);
  
  await updateDoc(gamificationRef, {
    xp: newXp,
    level: newLevel,
    xpToNext,
    title: getLevelTitle(newLevel),
    updatedAt: serverTimestamp(),
  });
  
  return { newXp, newLevel, leveledUp: newLevel > oldLevel };
}

export async function recordActivity(userId: string, type: 'question' | 'mock' | 'study' | 'tutor', data: Record<string, any>) {
  const gamificationRef = doc(db, 'users', userId, 'gamification', 'summary');
  const snap = await getDoc(gamificationRef);
  
  if (!snap.exists()) return;
  
  const current = snap.data();
  const updates: Record<string, any> = { updatedAt: serverTimestamp() };
  
  if (type === 'question') {
    updates.totalQuestionsAnswered = (current.totalQuestionsAnswered || 0) + 1;
    if (data.correct) {
      updates.totalQuestionsCorrect = (current.totalQuestionsCorrect || 0) + 1;
    }
  } else if (type === 'mock') {
    updates.totalMocksCompleted = (current.totalMocksCompleted || 0) + 1;
    if (data.score > (current.bestMockScore || 0)) {
      updates.bestMockScore = data.score;
    }
  } else if (type === 'study') {
    updates.totalStudyMinutes = (current.totalStudyMinutes || 0) + (data.minutes || 0);
  } else if (type === 'tutor') {
    // Tutor chat tracked separately
  }
  
  await updateDoc(gamificationRef, updates);
  
  // Check for new achievements
  const newState = { ...current, ...updates };
  const newAchievements = checkAchievements(newState);
  const existingIds = new Set((current.achievements || []).map((a: any) => a.id));
  const trulyNew = newAchievements.filter(a => !existingIds.has(a.id));
  
  if (trulyNew.length > 0) {
    const achievementsWithDates = trulyNew.map(a => ({
      ...a,
      unlockedAt: new Date().toISOString(),
    }));
    
    await updateDoc(gamificationRef, {
      achievements: arrayUnion(...achievementsWithDates),
    });
    
    // Award XP for each new achievement
    for (const a of trulyNew) {
      await addXP(userId, a.xpReward);
    }
  }
}

export default {
  ACHIEVEMENTS,
  TIER_COLORS,
  LEVEL_THRESHOLDS,
  LEVEL_TITLES,
  calculateLevel,
  getLevelTitle,
  xpToNextLevel,
  getLevelProgress,
  checkAchievements,
  calculateStreak,
  getStreakHistory,
  initializeGamification,
  addXP,
  recordActivity,
};
