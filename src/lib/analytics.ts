import { db, auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, addDoc, query, orderBy, limit, onSnapshot, Timestamp, increment } from 'firebase/firestore';

// ─── Types ───

export interface SessionEvent {
  type: 'view_change' | 'question_answered' | 'mock_started' | 'mock_completed' | 'study_time' | 'tutor_chat' | 'content_read' | 'flashcard_viewed' | 'achievement_unlocked' | 'streak_maintained';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  studyMinutes: number;
  questionsAnswered: number;
  questionsCorrect: number;
  mocksCompleted: number;
  avgMockScore: number;
  tutorChats: number;
  flashcardsViewed: number;
  contentPagesRead: number;
  streakDay: boolean;
  lastActiveAt: Timestamp | Date;
}

export interface SubjectBreakdown {
  english: { answered: number; correct: number; avgTimeSec: number };
  gk: { answered: number; correct: number; avgTimeSec: number };
  legal: { answered: number; correct: number; avgTimeSec: number };
  logical: { answered: number; correct: number; avgTimeSec: number };
  quant: { answered: number; correct: number; avgTimeSec: number };
}

export interface UserAnalytics {
  totalStudyMinutes: number;
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;
  totalMocksCompleted: number;
  bestMockScore: number;
  avgMockScore: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  subjectBreakdown: SubjectBreakdown;
  weeklyStudyMinutes: number[]; // last 7 days
  dailyStats: Record<string, DailyStats>;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface MockResult {
  id: string;
  scores: Record<string, number>;
  totalScore: number;
  accuracy: number;
  timeTaken: number;
  completedAt: Date;
  errorTags: string[];
  dreamNLU: string;
}

// ─── Constants ───

export const XP_REWARDS = {
  QUESTION_CORRECT: 10,
  QUESTION_INCORRECT: 3,
  MOCK_COMPLETED: 100,
  MOCK_PERFECT_SECTION: 50,
  STUDY_MINUTE: 1,
  TUTOR_CHAT: 5,
  FLASHCARD_VIEWED: 2,
  CONTENT_READ: 5,
  STREAK_3: 30,
  STREAK_7: 75,
  STREAK_14: 150,
  STREAK_30: 400,
  ACHIEVEMENT_UNLOCKED: 50,
  FIRST_LOGIN: 20,
  PROFILE_COMPLETE: 30,
} as const;

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000,
  6500, 8200, 10000, 12000, 14500, 17500, 21000, 25000, 30000, 36000, 43000
];

export const LEVEL_TITLES = [
  'Novice Aspirant', 'Legal Apprentice', 'Case Reader', 'Argument Analyst',
  'Sectional Scholar', 'Mock Warrior', 'Juris Master', 'Logic Architect',
  'Elite Strategist', 'Rank Contender', 'NLU Hopeful', 'CLAT Veteran',
  'Senior Jurist', 'Grand Scholar', 'Legal Luminary', 'Supreme Aspirant',
  'Juris Elite', 'CLAT Legend', 'Top 100 Material', 'AIR 1 Caliber', 'Juris Omnipotent'
];

// ─── Core Analytics Engine ───

class AnalyticsEngine {
  private sessionStart: Date | null = null;
  private currentView: string = 'LANDING';
  private viewStartTime: Date = new Date();
  private questionStartTime: Date | null = null;
  private currentSubject: string = '';
  private events: SessionEvent[] = [];
  private studyTimer: ReturnType<typeof setInterval> | null = null;
  private studySeconds: number = 0;
  private pendingStudyMinutes: number = 0;

  constructor() {
    this.startSession();
  }

  startSession() {
    this.sessionStart = new Date();
    this.viewStartTime = new Date();
    this.trackEvent('view_change', { view: 'LANDING' });
  }

  trackEvent(type: SessionEvent['type'], metadata?: Record<string, any>) {
    this.events.push({ type, timestamp: new Date(), metadata });
    
    // Persist to Firestore for authenticated users
    const user = auth.currentUser;
    if (user) {
      addDoc(collection(db, 'users', user.uid, 'events'), {
        type,
        metadata: metadata || {},
        timestamp: serverTimestamp(),
      }).catch(() => {}); // Silently fail - analytics should not block UX
    }
  }

  changeView(view: string) {
    const duration = (new Date().getTime() - this.viewStartTime.getTime()) / 1000;
    this.trackEvent('view_change', { from: this.currentView, to: view, durationSec: Math.round(duration) });
    this.currentView = view;
    this.viewStartTime = new Date();
  }

  startQuestion(subject: string) {
    this.questionStartTime = new Date();
    this.currentSubject = subject;
  }

  submitAnswer(correct: boolean, subject?: string) {
    const timeTaken = this.questionStartTime
      ? (new Date().getTime() - this.questionStartTime.getTime()) / 1000
      : 0;
    
    this.trackEvent('question_answered', {
      correct,
      subject: subject || this.currentSubject,
      timeTaken: Math.round(timeTaken),
    });
    
    this.addXP(correct ? XP_REWARDS.QUESTION_CORRECT : XP_REWARDS.QUESTION_INCORRECT);
    this.recordQuestion(subject || this.currentSubject, correct, timeTaken);
    this.questionStartTime = null;
  }

  startMock() {
    this.trackEvent('mock_started', { timestamp: new Date().toISOString() });
  }

  completeMock(result: MockResult) {
    this.trackEvent('mock_completed', {
      totalScore: result.totalScore,
      accuracy: result.accuracy,
      timeTaken: result.timeTaken,
      dreamNLU: result.dreamNLU,
    });
    
    this.addXP(XP_REWARDS.MOCK_COMPLETED);
    if (result.accuracy >= 90) {
      this.addXP(XP_REWARDS.MOCK_PERFECT_SECTION);
    }
    
    this.saveMockResult(result);
  }

  startStudyTimer() {
    if (this.studyTimer) return;
    this.studyTimer = setInterval(() => {
      this.studySeconds++;
      if (this.studySeconds >= 60) {
        this.pendingStudyMinutes++;
        this.studySeconds = 0;
        this.addXP(XP_REWARDS.STUDY_MINUTE);
      }
    }, 1000);
  }

  stopStudyTimer() {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
      this.studyTimer = null;
    }
    
    // Flush remaining seconds as partial minute
    if (this.studySeconds > 30) {
      this.pendingStudyMinutes++;
      this.addXP(XP_REWARDS.STUDY_MINUTE);
    }
    this.studySeconds = 0;
    
    if (this.pendingStudyMinutes > 0) {
      this.recordStudyTime(this.pendingStudyMinutes);
      this.pendingStudyMinutes = 0;
    }
  }

  tutorChatUsed() {
    this.trackEvent('tutor_chat');
    this.addXP(XP_REWARDS.TUTOR_CHAT);
  }

  contentRead(pageId: string) {
    this.trackEvent('content_read', { pageId });
    this.addXP(XP_REWARDS.CONTENT_READ);
  }

  flashcardViewed() {
    this.trackEvent('flashcard_viewed');
    this.addXP(XP_REWARDS.FLASHCARD_VIEWED);
  }

  // ─── XP & Level System ───

  async addXP(amount: number) {
    const user = auth.currentUser;
    if (!user) return;
    
    const analyticsRef = doc(db, 'users', user.uid, 'analytics', 'summary');
    const snap = await getDoc(analyticsRef);
    
    if (snap.exists()) {
      const data = snap.data() as UserAnalytics;
      const newXp = data.xp + amount;
      const newLevel = this.calculateLevel(newXp);
      const xpToNext = this.xpForNextLevel(newXp);
      
      await updateDoc(analyticsRef, {
        xp: newXp,
        level: newLevel,
        xpToNextLevel: xpToNext,
        updatedAt: serverTimestamp(),
      });
      
      if (newLevel > data.level) {
        this.trackEvent('achievement_unlocked', { type: 'level_up', level: newLevel, title: LEVEL_TITLES[newLevel] || 'Elite Aspirant' });
      }
    }
  }

  calculateLevel(xp: number): number {
    let level = 0;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        level = i;
      } else {
        break;
      }
    }
    return level;
  }

  xpForNextLevel(currentXp: number): number {
    const currentLevel = this.calculateLevel(currentXp);
    const nextThreshold = LEVEL_THRESHOLDS[currentLevel + 1] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] * 2;
    return nextThreshold - currentXp;
  }

  getLevelTitle(level: number): string {
    return LEVEL_TITLES[level] || 'Elite Aspirant';
  }

  // ─── Streak Management ───

  async updateStreak(): Promise<{ current: number; longest: number; isNew: boolean }> {
    const user = auth.currentUser;
    if (!user) return { current: 0, longest: 0, isNew: false };
    
    const today = new Date().toISOString().split('T')[0];
    const analyticsRef = doc(db, 'users', user.uid, 'analytics', 'summary');
    const snap = await getDoc(analyticsRef);
    
    let currentStreak = 1;
    let longestStreak = 1;
    let isNew = true;
    
    if (snap.exists()) {
      const data = snap.data() as UserAnalytics;
      const lastDate = data.lastActiveDate;
      
      if (lastDate) {
        const last = new Date(lastDate);
        const todayDate = new Date(today);
        const diffDays = (todayDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
        
        if (diffDays === 0) {
          // Already active today, don't increment
          currentStreak = data.currentStreak;
          longestStreak = data.longestStreak;
          isNew = false;
        } else if (diffDays === 1) {
          // Consecutive day
          currentStreak = data.currentStreak + 1;
          longestStreak = Math.max(data.longestStreak, currentStreak);
          isNew = true;
          
          // Streak milestone XP
          if (currentStreak === 3) this.addXP(XP_REWARDS.STREAK_3);
          if (currentStreak === 7) this.addXP(XP_REWARDS.STREAK_7);
          if (currentStreak === 14) this.addXP(XP_REWARDS.STREAK_14);
          if (currentStreak === 30) this.addXP(XP_REWARDS.STREAK_30);
        } else {
          // Streak broken
          currentStreak = 1;
          longestStreak = data.longestStreak;
          isNew = true;
        }
      }
    }
    
    await updateDoc(analyticsRef, {
      currentStreak,
      longestStreak,
      lastActiveDate: today,
      updatedAt: serverTimestamp(),
    });
    
    return { current: currentStreak, longest: longestStreak, isNew };
  }

  // ─── Firestore Persistence ───

  private async recordQuestion(subject: string, correct: boolean, timeTaken: number) {
    const user = auth.currentUser;
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const dailyRef = doc(db, 'users', user.uid, 'daily', today);
    
    await setDoc(dailyRef, {
      date: today,
      questionsAnswered: increment(correct ? 1 : 1), // total answered
      questionsCorrect: increment(correct ? 1 : 0),
      lastActiveAt: serverTimestamp(),
    }, { merge: true });
  }

  private async recordStudyTime(minutes: number) {
    const user = auth.currentUser;
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const dailyRef = doc(db, 'users', user.uid, 'daily', today);
    
    await setDoc(dailyRef, {
      studyMinutes: increment(minutes),
      lastActiveAt: serverTimestamp(),
    }, { merge: true });
  }

  private async saveMockResult(result: MockResult) {
    const user = auth.currentUser;
    if (!user) return;
    
    await addDoc(collection(db, 'users', user.uid, 'mocks'), {
      ...result,
      completedAt: serverTimestamp(),
    });
  }

  // ─── Real-time Analytics Subscription ───

  subscribeToAnalytics(callback: (data: UserAnalytics | null) => void) {
    const user = auth.currentUser;
    if (!user) {
      callback(null);
      return () => {};
    }
    
    const analyticsRef = doc(db, 'users', user.uid, 'analytics', 'summary');
    return onSnapshot(analyticsRef, (snap) => {
      if (snap.exists()) {
        callback(snap.data() as UserAnalytics);
      } else {
        callback(null);
      }
    });
  }

  subscribeToDailyStats(callback: (data: DailyStats[]) => void) {
    const user = auth.currentUser;
    if (!user) {
      callback([]);
      return () => {};
    }
    
    const q = query(
      collection(db, 'users', user.uid, 'daily'),
      orderBy('date', 'desc'),
      limit(30)
    );
    
    return onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => d.data() as DailyStats);
      callback(data);
    });
  }

  // ─── Utility ───

  getWeeklyStudyData(dailyStats: DailyStats[]): number[] {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = new Array(7).fill(0);
    
    dailyStats.forEach(stat => {
      const date = new Date(stat.date);
      const dayIndex = date.getDay();
      result[dayIndex] = stat.studyMinutes || 0;
    });
    
    return result;
  }

  getSubjectAccuracy(breakdown: SubjectBreakdown): Record<string, number> {
    return {
      english: breakdown.english.answered > 0 ? Math.round((breakdown.english.correct / breakdown.english.answered) * 100) : 0,
      gk: breakdown.gk.answered > 0 ? Math.round((breakdown.gk.correct / breakdown.gk.answered) * 100) : 0,
      legal: breakdown.legal.answered > 0 ? Math.round((breakdown.legal.correct / breakdown.legal.answered) * 100) : 0,
      logical: breakdown.logical.answered > 0 ? Math.round((breakdown.logical.correct / breakdown.logical.answered) * 100) : 0,
      quant: breakdown.quant.answered > 0 ? Math.round((breakdown.quant.correct / breakdown.quant.answered) * 100) : 0,
    };
  }

  destroy() {
    this.stopStudyTimer();
  }
}

// Singleton instance
export const analytics = new AnalyticsEngine();

// Initialize analytics for a user
export async function initializeUserAnalytics(userId: string) {
  const analyticsRef = doc(db, 'users', userId, 'analytics', 'summary');
  const snap = await getDoc(analyticsRef);
  
  if (!snap.exists()) {
    await setDoc(analyticsRef, {
      totalStudyMinutes: 0,
      totalQuestionsAnswered: 0,
      totalQuestionsCorrect: 0,
      totalMocksCompleted: 0,
      bestMockScore: 0,
      avgMockScore: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      subjectBreakdown: {
        english: { answered: 0, correct: 0, avgTimeSec: 0 },
        gk: { answered: 0, correct: 0, avgTimeSec: 0 },
        legal: { answered: 0, correct: 0, avgTimeSec: 0 },
        logical: { answered: 0, correct: 0, avgTimeSec: 0 },
        quant: { answered: 0, correct: 0, avgTimeSec: 0 },
      },
      weeklyStudyMinutes: [0, 0, 0, 0, 0, 0, 0],
      dailyStats: {},
      level: 0,
      xp: 0,
      xpToNextLevel: 100,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

export default analytics;
