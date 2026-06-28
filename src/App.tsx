/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck, 
  ChevronRight, 
  Star,
  Trophy,
  Zap,
  FileText,
  TrendingUp,
  Menu,
  X,
  Lock,
  LogOut,
  User as UserIcon,
  Loader2,
  ArrowRight,
  Newspaper,
  Target,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import stripePromise from '@/src/lib/stripe';
import { auth, db, loginWithGoogle, logout, handleRedirectResult, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  doc, 
  onSnapshot, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit,
  getDoc
} from 'firebase/firestore';
import { getLegalTutorResponse } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';
const AdaptivePractice = React.lazy(() => import('./components/AdaptivePractice'));
const MockSimulator = React.lazy(() => import('./components/MockSimulator'));
const StudyPlanner = React.lazy(() => import('./components/StudyPlanner'));
const StudyMaterials = React.lazy(() => import('./components/StudyMaterials'));
const AITutor = React.lazy(() => import('./components/AITutor'));
const AnalysisPanel = React.lazy(() => import('./components/AnalysisPanel'));
const JurisArchive = React.lazy(() => import('./components/JurisArchive'));
const CurrentAffairs = React.lazy(() => import('./components/CurrentAffairs'));
const AchievementPanel = React.lazy(() => import('./components/AchievementPanel'));
const DailyCurrentAffairs = React.lazy(() => import('./components/DailyCurrentAffairs'));
const DataIngestor = React.lazy(() => import('./components/DataIngestor'));
const WikiMaster = React.lazy(() => import('./components/WikiMaster'));
const LearningHub = React.lazy(() => import('./components/LearningHub'));
const GamificationDashboard = React.lazy(() => import('./components/GamificationDashboard'));

import { analytics, initializeUserAnalytics } from '@/src/lib/analytics';
import { initializeGamification, calculateStreak, addXP } from '@/src/lib/gamification';

// --- Types ---
type View = 'LANDING' | 'DASHBOARD' | 'PRACTICE' | 'MOCKS' | 'PLANNER' | 'TUTOR' | 'ANALYSIS' | 'ARCHIVE' | 'AFFAIRS' | 'DAILY' | 'MATERIALS' | 'INGESTOR' | 'WIKI' | 'LEARN' | 'ACHIEVEMENTS';

interface UserProfile {
  email: string;
  displayName: string;
  photoURL?: string;
  isPremium: boolean;
  createdAt: any;
  updatedAt: any;
}

interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: any;
}

// --- Components ---

const SuccessPage = ({ sessionId, userId }: { sessionId: string; userId: string }) => {
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, userId })
        });
        if (res.ok) {
          toast.success("Payment verified! Welcome to Premium.");
        } else {
          toast.error("Verification failed. Please contact support.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setVerifying(false);
      }
    };
    if (userId && sessionId) verify();
  }, [sessionId, userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 font-sans text-white">
      <Card className="max-w-md w-full text-center p-8 border border-border bg-surface rounded-none">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-none flex items-center justify-center mx-auto mb-6 border border-primary/20">
          {verifying ? <Loader2 className="animate-spin" size={40} /> : <ShieldCheck size={40} />}
        </div>
        <h1 className="text-3xl font-serif font-bold mb-2 text-primary uppercase tracking-tighter">
          {verifying ? "VERIFYING..." : "ACCREDITATION GRANTED"}
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed font-sans text-sm tracking-wide">
          {verifying 
            ? "Authenticating your secure premium access token." 
            : "Your status has been elevated to Gold Member. Full academic suite is now unlocked."}
        </p>
        <Button className="w-full h-12 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-none hover:bg-surface transition-all border-none" onClick={() => window.location.href = '/'} disabled={verifying}>
          RETURN TO DASHBOARD
        </Button>
      </Card>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetYear = new Date().getFullYear() + (new Date().getMonth() >= 11 ? 1 : 0);
    const target = new Date(`${targetYear}-12-01T00:00:00`).getTime(); // Next December 1st (Typical CLAT month)
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 font-sans text-sm text-muted-foreground">
      {[
        { label: 'Days', val: timeLeft.days },
        { label: 'Hrs', val: timeLeft.hours },
        { label: 'Min', val: timeLeft.minutes },
      ].map((t, i) => (
        <div key={i} className="text-center">
          <div className="text-lg font-bold text-primary">{t.val < 10 ? `0${t.val}` : t.val}</div>
          <div className="text-xs">{t.label}</div>
        </div>
      ))}
    </div>
  );
};

const Navbar = ({ user, profile, hasPremiumAccess, setView, currentView, streak }: { user: FirebaseUser | null; profile: UserProfile | null; hasPremiumAccess: boolean, setView: (v: View) => void; currentView: View; streak: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Learn', view: 'LEARN' as View },
    { label: 'Study Material', view: 'WIKI' as View },
    { label: 'Current Affairs', view: 'DAILY' as View },
    { label: 'Mocks', view: 'MOCKS' as View },
  ];

  return (
    <nav id="nav" className={`fixed top-0 w-full z-50 safe-top ${isScrolled ? 'glass-strong py-3' : 'bg-white/80 backdrop-blur-sm py-4 border-b border-border'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('LANDING')}>
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm font-serif">L</span>
          </div>
          <span className="text-xl font-serif font-semibold text-foreground">LexCLAT</span>
        </div>
        
        <div className="hidden md:flex items-center gap-1">
          {user && (
            <button 
              onClick={() => setView('DASHBOARD')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'DASHBOARD' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-primary hover:bg-primary-light'}`}
            >
              Dashboard
            </button>
          )}
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => setView(item.view)} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === item.view ? 'bg-primary text-white' : 'text-muted-foreground hover:text-primary hover:bg-primary-light'}`}
            >
              {item.label}
            </button>
          ))}
          
          {user ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
              <button className="flex items-center gap-2" onClick={() => setView('DASHBOARD')}>
                <Avatar className="h-8 w-8 rounded-lg border border-border">
                  <AvatarImage src={user.photoURL || ''} />
                  <AvatarFallback className="bg-primary-light text-primary text-xs font-semibold rounded-lg">
                    {profile?.displayName?.[0] || user.email?.[0]}
                  </AvatarFallback>
                </Avatar>
              </button>
              <button className="text-muted-foreground hover:text-accent p-2" onClick={logout} aria-label="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              className="ml-4 bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              onClick={loginWithGoogle}
            >
              Sign In
            </button>
          )}
        </div>

        <button className="md:hidden text-primary p-2 rounded-lg hover:bg-primary-light" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 w-full bg-white border-b border-border shadow-lg p-4 flex flex-col gap-1 md:hidden"
          >
            {user && (
              <button onClick={() => { setView('DASHBOARD'); setMobileMenuOpen(false); }} className={`text-left px-4 py-3 rounded-lg text-sm font-medium ${currentView === 'DASHBOARD' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}>
                Dashboard
              </button>
            )}
            {navItems.map(item => (
              <button key={item.label} onClick={() => { setView(item.view); setMobileMenuOpen(false); }} className={`text-left px-4 py-3 rounded-lg text-sm font-medium ${currentView === item.view ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}>
                {item.label}
              </button>
            ))}
            {user ? (
              <button className="text-left px-4 py-3 rounded-lg text-sm font-medium text-accent hover:bg-red-50 mt-2" onClick={logout}>Sign Out</button>
            ) : (
              <button className="mt-2 w-full bg-accent text-white py-3 rounded-lg text-sm font-semibold" onClick={loginWithGoogle}>Sign In</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LandingPage = ({ user, onCheckout, setView }: { user: FirebaseUser | null; onCheckout: () => void; setView: (v: View) => void }) => {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-blue-50/80 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">CLAT 2026 Preparation</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight mb-6">
            Master CLAT with <span className="text-primary">structured</span> study material
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Legal reasoning, current affairs, English, logic, and quant — all in one focused platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-dim shadow-sm"
              onClick={() => setView('LEARN')}
            >
              Start Learning
            </button>
            <button 
              className="w-full sm:w-auto bg-white text-foreground border border-border px-8 py-3.5 rounded-lg font-semibold hover:border-primary hover:text-primary"
              onClick={() => setView('WIKI')}
            >
              Study Material
            </button>
          </div>
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
            <span><strong className="text-foreground">120</strong> questions</span>
            <span className="w-px h-4 bg-border" />
            <span><strong className="text-foreground">5</strong> sections</span>
            <span className="w-px h-4 bg-border" />
            <Countdown />
          </div>
        </div>
      </section>

      {/* Quick access — 3 cards only */}
      <section className="py-16 px-4 sm:px-6" id="free-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-center mb-10">Get started</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Learning Hub', desc: 'Structured modules for all 5 CLAT sections', view: 'LEARN' as View, color: 'primary' },
              { title: 'Study Material', desc: 'Complete guides, notes, and practice sets', view: 'WIKI' as View, color: 'primary' },
              { title: 'Mock Tests', desc: 'Timed simulations with analysis', view: 'MOCKS' as View, color: 'accent' },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => setView(item.view)}
                className="text-left p-6 bg-white border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <ChevronRight size={18} className="text-primary mt-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features — 3 items */}
      <section id="features" className="py-16 px-4 sm:px-6 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Legal Reasoning', desc: 'Principle-application drills for torts, contracts, and constitutional law.', icon: <Scale className="text-primary" size={22} /> },
            { title: 'Current Affairs', desc: 'Daily updates and static GK aligned with CLAT patterns.', icon: <Newspaper className="text-primary" size={22} /> },
            { title: 'Full Mocks', desc: '120-question simulations with sectional timing.', icon: <Trophy className="text-accent" size={22} /> },
          ].map((f, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mb-4">{f.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing — simplified 2 tiers */}
      <section id="pricing" className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-center mb-10">Plans</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 bg-white border border-border rounded-xl">
              <h3 className="font-semibold text-lg mb-1">Free</h3>
              <p className="text-3xl font-bold text-foreground mb-4">₹0</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>Daily current affairs</li>
                <li>Study guides & wiki</li>
                <li>1 mock per month</li>
              </ul>
              <button onClick={() => setView('LEARN')} className="w-full py-3 border border-border rounded-lg font-medium hover:border-primary hover:text-primary">Get Started</button>
            </div>
            <div className="p-8 bg-primary text-white rounded-xl relative overflow-hidden">
              <div className="absolute top-3 right-3 text-xs bg-accent px-2 py-1 rounded font-semibold">Popular</div>
              <h3 className="font-semibold text-lg mb-1">Premium</h3>
              <p className="text-3xl font-bold mb-4">₹199<span className="text-sm font-normal text-blue-100">/mo</span></p>
              <ul className="space-y-2 text-sm text-blue-100 mb-6">
                <li>Unlimited mocks</li>
                <li>AI tutor & analytics</li>
                <li>Rank prediction</li>
              </ul>
              <button onClick={onCheckout} className="w-full py-3 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50">Upgrade</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = ({ setView }: { setView: (v: View) => void }) => (
  <footer className="bg-white border-t border-border py-12 safe-bottom">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-serif font-semibold text-foreground">LexCLAT</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <button onClick={() => setView('LEARN')} className="hover:text-primary">Learn</button>
          <button onClick={() => setView('WIKI')} className="hover:text-primary">Study Material</button>
          <button onClick={() => setView('MOCKS')} className="hover:text-primary">Mocks</button>
          <button onClick={() => setView('DAILY')} className="hover:text-primary">Current Affairs</button>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 LexCLAT</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>(window.location.pathname.startsWith('/wiki') ? 'WIKI' : 'LANDING');
  const [selectedMockId, setSelectedMockId] = useState<string | null>(null);
  const [tutorQuery, setTutorQuery] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [dreamNLU, setDreamNLU] = useState<string | null>(null);
  const [targetRank, setTargetRank] = useState<number>(0);
  const [streak, setStreak] = useState(0);
  const [xp, setPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalStudyMinutes, setTotalStudyMinutes] = useState(0);
  const [totalMocks, setTotalMocks] = useState(0);
  const [bestMockScore, setBestMockScore] = useState(0);

  const handleCheckout = async () => {
    if (!user) {
      toast.info("Identification Required. Please access the portal.");
      loginWithGoogle();
      return;
    }
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid })
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.code === 'CONFIG_MISSING') {
          toast.error("Premium access is currently unavailable as Stripe is not configured. Please contact the administrator.");
          return;
        }
        throw new Error(data.error || 'Checkout initiation failed');
      }
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");
      const { error } = await (stripe as any).redirectToCheckout({ sessionId: data.id });
      if (error) throw new Error(error.message);
    } catch (err: any) {
      toast.error(err.message || 'Financial Handshake Error. Check gateway config.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const askLexie = (query: string) => {
    setTutorQuery(query);
    setView('TUTOR');
  };

  // PREMIUM CHECK - Set to '|| true' for development testing only
  const hasPremiumAccess = profile?.isPremium || false;

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  useEffect(() => {
    const handleViewChange = (e: any) => setView(e.detail);
    window.addEventListener('change-view', handleViewChange);
    
    let unsubProfile: (() => void) | undefined;

    // Handle Google redirect sign-in result (for mobile / popup-blocked browsers)
    handleRedirectResult().then(() => {
      // Redirect result handled, auth state will update
    }).catch(err => console.warn('Redirect result error:', err));

    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setProfile(null);
        setLoading(false);
        if (view !== 'LANDING' && !['MATERIALS', 'DAILY', 'AFFAIRS', 'ARCHIVE', 'DASHBOARD', 'TUTOR', 'WIKI', 'LEARN'].includes(view)) setView('LANDING');
      } else {
        // Initialize analytics and gamification
        try {
          await initializeUserAnalytics(u.uid);
          await initializeGamification(u.uid);
          const streakData = await calculateStreak(u.uid);
          setStreak(streakData.current);
          
          // Track first login XP if new streak
          if (streakData.isNewDay) {
            await addXP(u.uid, 20);
          }
        } catch (err) {
          console.warn('Analytics init error:', err);
        }
        
        // Fetch gamification stats
        try {
          const gamificationRef = doc(db, 'users', u.uid, 'gamification', 'summary');
          const gamificationSnap = await getDoc(gamificationRef);
          if (gamificationSnap.exists()) {
            const gData = gamificationSnap.data();
            setPoints(gData.xp || 0);
            setUserLevel(gData.level || 0);
            setTotalQuestions(gData.totalQuestionsAnswered || 0);
            setTotalCorrect(gData.totalQuestionsCorrect || 0);
            setTotalStudyMinutes(gData.totalStudyMinutes || 0);
            setTotalMocks(gData.totalMocksCompleted || 0);
            setBestMockScore(gData.bestMockScore || 0);
            setUnlockedAchievements((gData.achievements || []).map((a: any) => a.id));
          }
        } catch (err) {
          console.warn('Gamification fetch error:', err);
        }
        
        // Listen to user profile
        if (unsubProfile) unsubProfile();
        unsubProfile = onSnapshot(doc(db, 'users', u.uid), (snap) => {
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${u.uid}`);
          setLoading(false);
        });
      }
    });

    // Force hide loading after 4s as a safety for slow or blocked Firebase initialization on mobile
    const timer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) console.warn('Auth/Profile loading timed out - forcing initialization.');
        return false;
      });
    }, 4000);

    return () => {
      window.removeEventListener('change-view', handleViewChange);
      unsubAuth();
      if (unsubProfile) unsubProfile();
      clearTimeout(timer);
    };
  }, []);

  // Track view changes for analytics
  useEffect(() => {
    analytics.changeView(view);
  }, [view]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (sessionId && user) {
    return <SuccessPage sessionId={sessionId} userId={user.uid} />;
  }

  const renderContent = () => {
    switch(view) {
      case 'DASHBOARD': return (
        <div className="pt-28 px-4 sm:px-6 max-w-6xl mx-auto pb-20">
          <GamificationDashboard
            userXp={xp}
            userLevel={userLevel}
            currentStreak={streak}
            longestStreak={streak}
            unlockedAchievementIds={unlockedAchievements}
            totalQuestions={totalQuestions}
            totalCorrect={totalCorrect}
            totalStudyMinutes={totalStudyMinutes}
            totalMocks={totalMocks}
            bestMockScore={bestMockScore}
            userName={profile?.displayName || 'Aspirant'}
            userPhoto={profile?.photoURL}
            onViewAchievements={() => setView('ACHIEVEMENTS')}
            onStartPractice={() => setView('PRACTICE')}
            onStartMock={() => setView('MOCKS')}
            onOpenPlanner={() => setView('PLANNER')}
            onOpenTutor={() => setView('TUTOR')}
          />
        </div>
      );
      case 'PRACTICE': return <div className="pt-32 px-4 md:px-6"><AdaptivePractice /></div>;
      case 'MOCKS': return <div className="pt-32 px-4 md:px-6"><MockSimulator preloadedMockId={selectedMockId} /></div>;
      case 'PLANNER': return <div className="pt-32 px-4 md:px-6"><StudyPlanner askLexie={askLexie} /></div>;
      case 'TUTOR': return <div className="pt-32 px-4 md:px-6"><AITutor user={user} hasPremiumAccess={hasPremiumAccess} initialQuery={tutorQuery} onQueryHandled={() => setTutorQuery(null)} /></div>;
      case 'ANALYSIS': return <div className="pt-32 px-4 md:px-6"><AnalysisPanel /></div>;
      case 'ARCHIVE': return <div className="pt-32 px-4 md:px-6"><JurisArchive setView={setView} setSelectedMockId={setSelectedMockId} /></div>;
      case 'AFFAIRS': return <div className="pt-32 px-4 md:px-6"><CurrentAffairs /></div>;
      case 'DAILY': return <div className="pt-32 px-4 md:px-6"><DailyCurrentAffairs /></div>;
      case 'MATERIALS': return <div className="pt-32 px-4 md:px-6"><StudyMaterials /></div>;
      case 'INGESTOR': return <div className="pt-32 px-4 md:px-6"><DataIngestor /></div>;
      case 'WIKI': return <div className="pt-0"><WikiMaster initialRoute={window.location.pathname.split('/')[2] || 'index'} onClose={() => { setView('DASHBOARD'); window.history.pushState(null, '', '/'); }} /></div>;
      case 'LEARN': return <div className="pt-16"><LearningHub /></div>;
      case 'ACHIEVEMENTS': return (
        <div className="pt-32 px-4 md:px-6">
          <AchievementPanel 
            userXp={xp} 
            userLevel={userLevel} 
            currentStreak={streak} 
            longestStreak={streak} 
            unlockedAchievementIds={unlockedAchievements} 
          />
        </div>
      );
      default: return <LandingPage user={user} onCheckout={handleCheckout} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white text-foreground font-sans scroll-ios">
      <Navbar user={user} profile={profile} hasPremiumAccess={hasPremiumAccess} setView={setView} currentView={view} streak={streak} />
      <main className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <React.Suspense fallback={
              <div className="flex-1 flex items-center justify-center bg-background min-h-[70vh] flex-col gap-4">
                <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Synchronizing Neural Modules</span>
              </div>
            }>
              {renderContent()}
            </React.Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setView={setView} />
      
      {/* AI Tutor — single button */}
      <button
        onClick={() => setView('TUTOR')}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:bg-red-700 flex items-center justify-center"
        aria-label="AI Tutor"
      >
        <MessageSquare size={22} />
      </button>

      {/* Manual UPI Payment Modal */}
      <AnimatePresence>
        {showUpiModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-border p-8 max-w-sm w-full relative"
            >
              <button 
                onClick={() => setShowUpiModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap size={32} className="text-primary" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif italic text-white mb-2">LexCLAT Premium</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Manual UPI Checkout</p>
                </div>
                
                <div className="bg-background border border-primary/30 p-6 space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Scan or Pay To Number</p>
                  <p className="text-3xl font-black text-white tracking-widest">7639176376</p>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-2">Accepted: GPay, PhonePe, Paytm</p>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Please complete the payment on your UPI app. Once done, click the verification button below. Premium access will be granted upon admin verification.
                </p>

                <Button 
                  onClick={() => {
                    toast.success("Payment verification request sent! You will be upgraded shortly.");
                    setShowUpiModal(false);
                  }}
                  className="w-full bg-primary text-black hover:bg-surface font-black uppercase tracking-widest rounded-none h-12"
                >
                  I Have Completed Payment
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
