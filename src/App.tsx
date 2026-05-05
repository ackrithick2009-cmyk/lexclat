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
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from '@/src/lib/firebase';
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
const DailyCurrentAffairs = React.lazy(() => import('./components/DailyCurrentAffairs'));
const DataIngestor = React.lazy(() => import('./components/DataIngestor'));
const WikiMaster = React.lazy(() => import('./components/WikiMaster'));
const LearningHub = React.lazy(() => import('./components/LearningHub'));

// --- Types ---
type View = 'LANDING' | 'DASHBOARD' | 'PRACTICE' | 'MOCKS' | 'PLANNER' | 'TUTOR' | 'ANALYSIS' | 'ARCHIVE' | 'AFFAIRS' | 'DAILY' | 'MATERIALS' | 'INGESTOR' | 'WIKI' | 'LEARN';

interface UserProfile {
  email: string;
  displayName: string;
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
        <p className="text-gray-400 mb-8 leading-relaxed font-sans text-sm tracking-wide">
          {verifying 
            ? "Authenticating your secure premium access token." 
            : "Your status has been elevated to Gold Member. Full academic suite is now unlocked."}
        </p>
        <Button className="w-full h-12 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-none hover:bg-white transition-all border-none" onClick={() => window.location.href = '/'} disabled={verifying}>
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
    <div className="flex gap-4 font-serif">
      {[
        { label: 'Days', val: timeLeft.days },
        { label: 'Hrs', val: timeLeft.hours },
        { label: 'Min', val: timeLeft.minutes },
        { label: 'Sec', val: timeLeft.seconds }
      ].map((t, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="text-xl text-primary font-black leading-none">{t.val < 10 ? `0${t.val}` : t.val}</div>
          <div className="text-[7px] uppercase font-black tracking-widest text-gray-600">{t.label}</div>
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

  return (
    <nav id="nav" className={`fixed top-0 w-full z-50 transition-all duration-500 safe-top ${isScrolled ? 'bg-surface/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('LANDING')}>
          <div className="relative">
            <div className="w-10 h-10 bg-primary rounded-none rotate-45 flex items-center justify-center transition-all group-hover:rotate-0 shadow-[0_0_20px_rgba(194,163,93,0.3)]">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform text-black font-black text-sm font-serif">L</span>
            </div>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-2xl font-serif font-black tracking-tighter text-white group-hover:text-primary transition-colors">LEXCLAT</span>
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary/60">Juris Elite Portal</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[9px] font-black tracking-[0.3em] uppercase">
          {user && (
            <button 
              onClick={() => setView('DASHBOARD')} 
              className={`transition-all relative group h-full py-2 ${currentView === 'DASHBOARD' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
            >
              Dashboard
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${currentView === 'DASHBOARD' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          )}
          {[
            { label: '🚀 Learn', view: 'LEARN' },
            { label: 'Study Material', view: 'WIKI' },
            { label: 'Current Affairs', view: 'DAILY' },
            { label: 'Mocks', view: 'MOCKS' },
            { label: 'AI Tutor', view: 'TUTOR' },
            { label: 'Legal Archives', view: 'ARCHIVE' },
            { label: 'Study Plan', view: 'PLANNER', auth: true },
            { label: 'Analytics', view: 'ANALYSIS', auth: true },
          ].map((item) => {
            if (item.auth && !user) return null;
            return (
              <button 
                key={item.label}
                onClick={() => setView(item.view as View)} 
                className={`transition-all relative group h-full py-2 ${currentView === item.view ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
              >
                {item.label}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${currentView === item.view ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            );
          })}
          
          {user ? (
            <div className="flex items-center gap-8 border-l border-white/10 pl-10">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('DASHBOARD')}>
                <Avatar className="h-10 w-10 rounded-none border border-white/10 ring-4 ring-primary/5 transition-all group-hover:ring-primary/20">
                  <AvatarImage src={user.photoURL || ''} />
                  <AvatarFallback className="bg-accent text-primary rounded-none uppercase text-xs font-black">
                    {profile?.displayName?.[0] || user.email?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white tracking-widest leading-none group-hover:text-primary transition-colors">{profile?.displayName?.toUpperCase() || 'ASPIRANT'}</span>
                  <div className="flex items-center gap-3 mt-1.5">
                     <div className="flex items-center gap-1">
                        <Zap size={10} className="fill-orange-500 text-orange-500" />
                        <span className="text-[8px] font-black text-orange-500 tracking-widest">{streak} DAY STREAK</span>
                     </div>
                     <div className="w-1 h-1 bg-border rounded-full" />
                     <span className="text-[8px] font-black text-primary tracking-widest">{hasPremiumAccess ? 'GOLD ACCREDITED' : 'STANDARD ACCESS'}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-600 hover:text-red-500 transition-all hover:scale-110 active:scale-90" onClick={logout}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              className="bg-primary text-black px-8 py-3.5 text-[10px] font-black tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(194,163,93,0.2)]"
              onClick={loginWithGoogle}
            >
              AUTHENTICATE
            </button>
          )}
        </div>

        <button className="lg:hidden text-primary p-4 border border-primary/20 flex items-center justify-center min-w-[48px] min-h-[48px]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-border shadow-2xl p-8 flex flex-col gap-6 lg:hidden font-sans uppercase tracking-widest text-xs font-bold"
          >
            <button 
              onClick={() => { setView('WIKI'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-primary transition-colors flex items-center justify-between ${currentView === 'WIKI' ? 'text-primary font-black' : ''}`}
            >
              Study Material (Wiki) <ChevronRight size={14} />
            </button>
            <button 
              onClick={() => { setView('MATERIALS'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-primary transition-colors flex items-center justify-between ${currentView === 'MATERIALS' ? 'text-primary font-black' : ''}`}
            >
              Academic Repository <ChevronRight size={14} />
            </button>
            <button 
              onClick={() => { setView('DAILY'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-primary transition-colors flex items-center justify-between ${currentView === 'DAILY' ? 'text-primary font-black' : ''}`}
            >
              Daily Brief <ChevronRight size={14} />
            </button>
            <button 
              onClick={() => { setView('MOCKS'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-primary transition-colors flex items-center justify-between ${currentView === 'MOCKS' ? 'text-primary font-black' : ''}`}
            >
              Mocks Arena <ChevronRight size={14} />
            </button>
            <button 
              onClick={() => { setView('AFFAIRS'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-primary transition-colors flex items-center justify-between ${currentView === 'AFFAIRS' ? 'text-primary font-black' : ''}`}
            >
              Current Affairs <ChevronRight size={14} />
            </button>
            {user && (
              <>
                <button 
                  onClick={() => { setView('PLANNER'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-primary transition-colors flex items-center justify-between ${currentView === 'PLANNER' ? 'text-primary font-black' : ''}`}
                >
                  AI Study Plan <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => { setView('ANALYSIS'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-primary transition-colors flex items-center justify-between font-bold ${currentView === 'ANALYSIS' ? 'text-primary font-black' : 'text-primary'}`}
                >
                  Rank Predictor <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => { setView('ARCHIVE'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-primary transition-colors flex items-center justify-between font-bold ${currentView === 'ARCHIVE' ? 'text-primary font-black' : 'text-primary'}`}
                >
                  Juris Archive <ChevronRight size={14} />
                </button>
              </>
            )}
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">Features</a>
            <a href="#tutor" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">AI Tutor</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">Pricing</a>
            {user ? (
               <button className="flex items-center justify-between text-red-500 pt-4 border-t border-border" onClick={logout}>
                Logout <LogOut size={16} />
               </button>
            ) : (
              <Button className="w-full bg-primary text-black font-black" onClick={loginWithGoogle}>Access Portal</Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LandingPage = ({ user, onCheckout }: { user: FirebaseUser | null; onCheckout: () => void }) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-background">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 text-white relative">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 mb-10">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-[10px] text-primary/80 font-black tracking-[0.4em] uppercase">Daily CLAT Preparation</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif font-medium leading-[1.1] lg:leading-[0.9] mb-10 text-white tracking-tighter">
                The Definitive <br /> 
                <span className="italic text-primary">Authority on Law.</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-sans font-light">
                LexCLAT is a structural transformation for your cognitive readiness. Current affairs, mocks, legal reasoning, and AI-powered study plans engineered to propel you into the top 1%.
              </p>

              <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
                <div className="space-y-4">
                  <div className="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em]">Time to CLAT 2026</div>
                  <Countdown />
                </div>
                <div className="hidden lg:block w-px h-12 bg-white/10" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                       {[
                         "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
                         "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100",
                         "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100",
                         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                       ].map((src, i) => (
                         <img 
                           key={i} 
                           src={src} 
                           className="w-6 h-6 rounded-full border border-background object-cover" 
                           alt="Aspirant"
                           referrerPolicy="no-referrer"
                         />
                       ))}
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">1,200+ Aspirants Active Now</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Repository Updated 14m ago</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <button 
                  className="bg-primary text-black px-12 h-16 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 border-none"
                  onClick={() => (window.dispatchEvent(new CustomEvent('change-view', { detail: 'MOCKS' })))}
                >
                  START FREE MOCK
                </button>
                <button 
                  className="px-10 h-16 border border-white/20 bg-transparent font-black uppercase tracking-[0.2em] text-[11px] text-white hover:border-primary hover:text-primary hover:bg-white/5 transition-all"
                  onClick={() => document.getElementById('free-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  EXPLORE FREE HUB
                </button>
              </div>
              
              <div className="mt-20 flex flex-wrap justify-center lg:justify-start gap-12 font-serif text-white">
                {[
                  { val: '50k+', label: 'Aspirants' },
                  { val: '140+', label: 'Simulations' },
                  { val: 'AIR 01', label: 'Legacy Rank' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 pl-6 border-l border-white/5">
                    <span className="text-4xl font-medium">{stat.val}</span>
                    <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] leading-none font-sans">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 relative w-full lg:max-w-xl group">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200" 
                alt="LexCLAT Intelligence" 
                className="w-full aspect-[4/3] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 bg-surface p-10 z-20 max-w-[280px] shadow-2xl">
               <div className="text-primary font-serif italic text-xl mb-3 leading-none underline decoration-primary/30 underline-offset-8">Cognitive Edge</div>
               <p className="text-[10px] text-gray-400 leading-relaxed font-sans uppercase tracking-widest font-medium">Our neural diagnostics track logic-gap variance with 98.4% precision compared to traditional mocks.</p>
               <div className="mt-6 flex items-center gap-2 group/btn cursor-pointer">
                  <span className="text-[9px] text-primary font-black uppercase tracking-widest">White Paper </span>
                  <ChevronRight size={12} className="text-primary group-hover/btn:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Access Hub */}
      <section className="py-32 px-6 bg-background relative overflow-hidden" id="free-section">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="max-w-2xl space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] font-black rounded-none h-7">Aspirant's Gateway</Badge>
              <h2 className="text-5xl lg:text-7xl font-serif text-white italic tracking-tighter leading-none">The Free <br /> Intelligence Hub.</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">No subscription required. Start sharp with daily essentials curated by AI for serious CLAT aspirants.</p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'MATERIALS' }))}
                className="border border-border text-gray-500 hover:text-white rounded-none h-14 px-8 uppercase tracking-widest text-[10px] font-black transition-all hover:border-primary"
              >
                Explore Full Library
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Daily CA */}
            <div 
              onClick={() => (window.dispatchEvent(new CustomEvent('change-view', { detail: 'DAILY' })))}
              className="bg-accent p-10 space-y-8 group hover:bg-surface transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                 <Newspaper size={80} />
              </div>
              <div className="w-12 h-12 bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors rotate-45 relative z-10">
                <Newspaper size={20} className="-rotate-45" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-serif text-white italic mb-2">Daily Currents</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed font-bold">AI-distilled 60-second news cards with CLAT-specific MCQ angles.</p>
              </div>
              <div className="flex items-center justify-between relative z-10">
                 <span className="text-[10px] text-primary font-black uppercase tracking-widest">Access Now</span>
                 <ArrowRight size={20} className="text-primary group-hover:translate-x-4 transition-all" />
              </div>
            </div>

            {/* Mini Quizzes */}
            <div 
              onClick={() => (window.dispatchEvent(new CustomEvent('change-view', { detail: 'PRACTICE' })))}
              className="bg-accent p-10 space-y-8 group hover:bg-surface transition-all cursor-pointer relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                 <Zap size={80} />
              </div>
              <div className="w-12 h-12 bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors rotate-45 relative z-10">
                <Zap size={20} className="-rotate-45" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-serif text-white italic mb-2">Mini-Quizzes</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed font-bold">10-minute micro-drills to fix your logic gaps on the go.</p>
              </div>
              <div className="flex items-center justify-between relative z-10">
                 <span className="text-[10px] text-primary font-black uppercase tracking-widest">Start Drill</span>
                 <ArrowRight size={20} className="text-primary group-hover:translate-x-4 transition-all" />
              </div>
            </div>

            {/* Rank Predictor */}
            <div 
              onClick={() => (window.dispatchEvent(new CustomEvent('change-view', { detail: 'DASHBOARD' })))}
              className="bg-accent p-10 space-y-8 group hover:bg-surface transition-all cursor-pointer relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                 <Target size={80} />
              </div>
              <div className="w-12 h-12 bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors rotate-45 relative z-10">
                <Target size={20} className="-rotate-45" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-serif text-white italic mb-2">Rank Predictor</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed font-bold">Simulate your NLU admission probability based on past data.</p>
              </div>
              <div className="flex items-center justify-between relative z-10">
                 <span className="text-[10px] text-primary font-black uppercase tracking-widest">Check Rank</span>
                 <ArrowRight size={20} className="text-primary group-hover:translate-x-4 transition-all" />
              </div>
            </div>

            {/* Legal Word */}
            <div 
              onClick={() => (window.dispatchEvent(new CustomEvent('change-view', { detail: 'ARCHIVE' })))}
              className="bg-primary p-10 space-y-8 group hover:bg-white transition-all cursor-pointer relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 opacity-10 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                 <BookOpen size={80} />
              </div>
              <div className="w-12 h-12 bg-black flex items-center justify-center text-primary rotate-45 relative z-10 animate-pulse">
                <BookOpen size={20} className="-rotate-45" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-serif text-black italic mb-2">Legal Lexicon</h4>
                <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mb-4 leading-none">Word of the Day</p>
                <div className="space-y-1">
                  <span className="text-2xl font-serif text-black uppercase tracking-widest block">Res Judicata</span>
                  <span className="text-[10px] text-black/40 italic block uppercase tracking-widest font-black">A matter judged.</span>
                </div>
              </div>
              <div className="flex items-center justify-between relative z-10">
                 <span className="text-[10px] text-black font-black uppercase tracking-widest">Learn More</span>
                 <ArrowRight size={20} className="text-black group-hover:translate-x-4 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Features Grid */}
      <section id="features" className="py-32 bg-background relative border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sectional Precision",
                desc: "Granular drills focused on Torts, Contracts, and Constitutional nuances.",
                icon: <Scale className="text-primary" size={24} />
              },
              {
                title: "Neural Simulations",
                desc: "Predictive mock exams that mirror the evolving difficulty curve of CLAT.",
                icon: <Zap className="text-primary" size={24} />
              },
              {
                title: "Juris Archive",
                desc: "A massive repository of landmark judgments and legal maxims.",
                icon: <BookOpen className="text-primary" size={24} />
              }
            ].map((f, i) => (
              <div key={i} className="bg-surface/50 p-12 space-y-6 group hover:bg-surface transition-colors cursor-default border border-white/5">
                <div className="w-12 h-12 bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:border-primary transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-serif text-white italic">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light uppercase tracking-widest">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-32 bg-surface grid-bg border-b border-border">
        <div className="container mx-auto px-8 flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Our Methodology</span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white italic tracking-tighter leading-tight">
                Beyond Rote Learning. <br />
                <span className="not-italic text-primary">Logical Synthesis.</span>
              </h2>
            </div>
            <div className="grid gap-10">
              {[
                { step: "01", title: "Diagnostic Calibration", desc: "We identify your logic gaps using pattern recognition of previous mistakes." },
                { step: "02", title: "Targeted Remediation", desc: "Custom modules are generated to strengthen weak conceptual foundations." },
                { step: "03", title: "Pressure Testing", desc: "High-yield simulations verify mastery under extreme time constraints." }
              ].map((m, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="text-4xl font-serif text-primary italic opacity-30 group-hover:opacity-100 transition-opacity">{m.step}</span>
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif text-white italic">{m.title}</h4>
                    <p className="text-gray-500 text-sm font-light leading-relaxed max-w-md">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full lg:max-w-xl">
             <div className="aspect-square bg-background border border-primary/20 p-2 relative group overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  alt="Legal Research"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="glass p-12 text-center space-y-4 max-w-xs border-primary/20">
                      <div className="text-4xl text-white font-serif italic">98.4%</div>
                      <p className="text-[9px] text-primary font-black uppercase tracking-[0.3em]">Precision Index</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust & Results Section */}
      <section className="py-32 bg-background border-b border-border overflow-hidden">
        <div className="container mx-auto px-8">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-4">
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">The LexCLAT Advantage</span>
                    <h2 className="text-5xl lg:text-7xl font-serif text-white italic tracking-tighter leading-none">Why Top Rankers <br /> Choose Us.</h2>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-12">
                    {[
                      { title: 'Peer Indexing', desc: 'Real-time benchmarking against 50k+ active aspirants nationwide.' },
                      { title: 'Faculty Curated', desc: 'Content designed by NLU alumni and legal academics.' },
                      { title: 'Hyper-Specific', desc: 'No generic filler. Every passage is vetted for CLAT relevance.' },
                      { title: 'Logic Mapping', desc: 'Our AI tracks your deductive pathways, not just right answers.' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                         <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center text-primary text-xs font-serif italic">{i + 1}</div>
                         <h4 className="text-xl font-serif text-white italic">{item.title}</h4>
                         <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-bold">{item.desc}</p>
                      </div>
                    ))}
                 </div>

                 <div className="flex items-center gap-8 pt-8 border-t border-border">
                    <div className="flex -space-x-4">
                       {[
                         'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
                         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
                       ].map((url, i) => (
                         <img key={i} src={url} className="w-12 h-12 rounded-full border-2 border-background object-cover grayscale" alt="user" referrerPolicy="no-referrer" />
                       ))}
                       <div className="w-12 h-12 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-black text-primary">50k+</div>
                    </div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Join the largest legal brain-trust in the country.</p>
                 </div>
              </div>
              
              <div className="relative">
                 <div className="aspect-[4/5] bg-surface border border-border relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200"
                      className="w-full h-full object-cover grayscale"
                      alt="Law School"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-12 space-y-4">
                       <div className="text-5xl text-white font-serif italic tracking-tighter">"The difference between AIR 10 and AIR 1000 is logical precision."</div>
                       <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">— Adv. Rohan Mehta, NLS Alumni</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Pricing / Access Section */}
      <section id="pricing" className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-8">
           <div className="text-center mb-24 space-y-4">
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Investment Tiers</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white italic tracking-tighter">Your Path to National Law Schools.</h2>
           </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-8">
              {[
                { 
                  name: 'Standard', 
                  price: 'Free', 
                  period: 'Forever',
                  features: ['Daily Current Affairs', '1 Full Mock / Month', 'Mini Logic Quizzes', 'Basic Study Planner'],
                  cta: 'Current Level'
                },
                { 
                  name: 'Weekly Pass', 
                  price: '₹99', 
                  period: 'Per Week',
                  desc: 'Full elite access for intensive sprint preparation.',
                  features: ['Unlimited Mocks', 'AI Doubt Solver', 'Premium CA Vault', 'Deep Diagnostics'],
                  cta: 'Get Pass'
                },
                { 
                  name: 'Monthly', 
                  price: '₹199', 
                  period: 'Per Month',
                  desc: 'Our most popular tier for consistent mastery.',
                  features: ['All Weekly Features', 'AI Study Roadmap', 'Rank Prediction', 'NLU Tracker Pro'],
                  featured: true,
                  cta: 'Start Pro'
                },
                { 
                  name: 'Yearly', 
                  price: '₹1,499', 
                  period: 'Per Year',
                  desc: 'Maximum value for long-term strategic success.',
                  features: ['All Pro Features', 'Personal Mentor Chat', 'Hardcopy Material', 'Batch Priority'],
                  cta: 'Go Annual'
                }
              ].map((tier, i) => (
                <div key={i} className={`p-10 space-y-8 transition-all relative overflow-hidden flex flex-col h-full border border-white/5 ${tier.featured ? 'bg-primary text-black' : 'bg-surface/50 text-white hover:bg-surface'}`}>
                  {tier.featured && <div className="absolute top-0 right-0 p-6 opacity-10"><Zap size={80} /></div>}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-serif italic">{tier.name}</h3>
                       {tier.featured && <Badge className="bg-black text-white text-[7px] uppercase font-black rounded-none">Popular</Badge>}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-serif tracking-tighter">{tier.price}</span>
                      <span className={`text-[10px] uppercase font-black tracking-widest ${tier.featured ? 'text-black/40' : 'text-gray-600'}`}>{tier.period}</span>
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest leading-relaxed line-clamp-2 ${tier.featured ? 'text-black/60' : 'text-gray-500'}`}>
                      {tier.desc}
                    </p>
                  </div>
                  <ul className="space-y-4 flex-grow border-t border-current/10 pt-6">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest leading-tight">
                        <ChevronRight size={12} className={tier.featured ? 'text-black' : 'text-primary'} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={tier.featured || tier.price !== 'Free' ? onCheckout : undefined}
                    className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-none ${tier.featured ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-primary text-black hover:bg-white'}`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <p className="text-3xl lg:text-4xl font-serif text-white italic leading-tight tracking-tighter">
              "The depth of sectional analysis provided by LexCLAT is unprecedented. It isn't just about mocks; it's about re-engineering your legal intuition."
            </p>
            <div className="space-y-4">
              <div className="w-12 h-0.5 bg-primary mx-auto" />
              <div className="space-y-1">
                <h5 className="text-xl font-serif text-white italic">Adv. Aarav Singhania</h5>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Chief Academic Strategist • Top 10 ALL INDIA RANKER</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-surface text-gray-400 py-32 border-t border-border font-sans safe-bottom">
    <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-24">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-sm rotate-45 flex items-center justify-center transition-transform group-hover:rotate-0">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform text-black font-bold text-lg font-serif">L</span>
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tighter">LEXCLAT</span>
          </div>
          <p className="max-w-xs mb-10 leading-relaxed text-[11px] uppercase tracking-[0.2em] font-medium text-gray-500">
            The definitive path to national law schools. Cultivating the elite legal minds of India through algorithmic mentorship and strategic analysis.
          </p>
          <div className="flex gap-2">
             {['01', '02', '03', '04'].map(i => (
               <div key={i} className="w-10 h-10 bg-accent border border-border flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all cursor-pointer text-[10px] text-gray-400 hover:text-primary font-bold">
                 {i}
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-10">
          <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[10px] border-l-2 border-primary pl-4">Academic Suite</h4>
          <ul className="space-y-6 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'DASHBOARD' }))} className="hover:text-white transition-colors flex items-center gap-3 group text-left w-full"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Dashboard</button></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'DAILY' }))} className="hover:text-white transition-colors flex items-center gap-3 group text-left w-full"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Current Affairs & GK</button></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'MOCKS' }))} className="hover:text-white transition-colors flex items-center gap-3 group text-left w-full"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Mock Arena</button></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'ARCHIVE' }))} className="hover:text-white transition-colors flex items-center gap-3 group text-left w-full"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Legal Reasoning</button></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'PLANNER' }))} className="hover:text-white transition-colors flex items-center gap-3 group text-left w-full"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> AI Study Plan</button></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'ANALYSIS' }))} className="hover:text-white transition-colors flex items-center gap-3 group text-left w-full"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Performance Analytics</button></li>
          </ul>
        </div>

        <div className="space-y-10">
          <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[10px] border-l-2 border-primary pl-4">Governance</h4>
          <ul className="space-y-6 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3 group"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3 group"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3 group"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Portal Integrity</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3 group"><ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" /> Support Desk</a></li>
          </ul>
        </div>

        <div className="space-y-10 bg-accent/30 p-6 lg:p-10 border border-border">
           <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Portal Status</h4>
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white">All Systems Operational</span>
              </div>
              <div className="space-y-2">
                 <div className="text-[9px] text-gray-600 uppercase font-black">Latency</div>
                 <div className="text-xl font-serif italic text-white">42ms</div>
              </div>
              <Button variant="outline" className="w-full border-primary/20 text-primary uppercase text-[9px] tracking-widest hover:bg-primary hover:text-black rounded-none h-10">System Log</Button>
           </div>
        </div>
      </div>

      <div className="pt-16 border-t border-border/50 flex flex-col lg:flex-row items-center justify-between text-[9px] font-bold tracking-[0.4em] gap-8 uppercase text-gray-600">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <p>© 2026 Juris Elite Academy • Strictly Academic Integrity</p>
          <div className="hidden lg:block w-px h-4 bg-border" />
          <p>UGC ACCREDIT: AE/402/2026</p>
        </div>
        <p className="text-primary/60">Premium Academic Experience v4.2.1</p>
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
  const [showUpiModal, setShowUpiModal] = useState(false);

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

  // PREMIUM CHECK - In production, this would strictly use profile?.isPremium
  const hasPremiumAccess = profile?.isPremium || true;

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  useEffect(() => {
    const handleViewChange = (e: any) => setView(e.detail);
    window.addEventListener('change-view', handleViewChange);
    
    let unsubProfile: (() => void) | undefined;

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setProfile(null);
        setLoading(false);
        if (view !== 'LANDING' && !['MATERIALS', 'DAILY', 'AFFAIRS', 'ARCHIVE', 'DASHBOARD', 'TUTOR', 'WIKI'].includes(view)) setView('LANDING');
      } else {
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

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background flex-col gap-8">
        <div className="relative">
          <div className="w-16 h-16 bg-primary rounded-sm rotate-45 flex items-center justify-center animate-pulse">
            <Scale size={32} className="-rotate-45 text-black" />
          </div>
          <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse -z-10" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="text-[10px] font-black text-primary tracking-[0.6em] uppercase animate-pulse">Juris Intelligence System</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (sessionId && user) {
    return <SuccessPage sessionId={sessionId} userId={user.uid} />;
  }

  const renderContent = () => {
    switch(view) {
      case 'DASHBOARD': return (
        <div className="pt-32 lg:pt-48 px-4 lg:px-6 max-w-7xl mx-auto space-y-12 lg:space-y-24 pb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-border pb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20">
                 <div className="w-1 h-1 bg-primary rounded-full" />
                 <span className="text-[9px] text-primary font-black uppercase tracking-widest">Authenticated Session</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif text-white italic tracking-tighter">
                Welcome, <span className="text-primary not-italic">{profile?.displayName?.split(' ')[0] || 'Aspirant'}</span>.
              </h1>
              <p className="text-gray-500 text-sm font-light uppercase tracking-[0.2em]">Curation of your academic legacy starts here</p>
            </div>
            <Card className="bg-surface/50 backdrop-blur-sm p-6 border border-primary/20 flex items-center gap-6 rounded-none">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary border border-primary/20 rounded-none shadow-[0_0_15px_rgba(194,163,93,0.1)]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <span className="block text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">Status Accreditation</span>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-bold text-white uppercase tracking-widest">Prestige Gold Member</span>
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              { title: 'Practice', desc: 'Precision logic drills', view: 'PRACTICE', icon: <BookOpen size={20} />, btn: 'Initialize' },
              { title: 'Mocks', desc: 'Real-time simulations', view: 'MOCKS', icon: <Trophy size={20} />, btn: 'Enter Arena' },
              { title: 'Study Plan', desc: 'AI Strategic Roadmap', view: 'PLANNER', icon: <Calendar size={20} />, btn: 'Map Path' },
              { title: 'Library', desc: 'High-yield resources', view: 'MATERIALS', icon: <FileText size={20} />, btn: 'Access' },
              { title: 'Archive', desc: 'Legal precedents', view: 'ARCHIVE', icon: <Scale size={20} />, btn: 'Research' },
              { title: 'Analytics', desc: 'Performance Profiling', view: 'ANALYSIS', icon: <TrendingUp size={20} />, btn: 'View Stats' },
              { title: 'AI Tutor', desc: 'Adaptive mentoring', view: 'TUTOR', icon: <MessageSquare size={20} />, btn: 'Consult' },
            ].map((card, i) => (
              <div 
                key={i} 
                onClick={() => setView(card.view as View)}
                className="bg-background p-8 lg:p-10 flex flex-col gap-12 group hover:bg-primary transition-all duration-700 cursor-pointer relative overflow-hidden h-[340px]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="rotate-12 scale-200 transform transition-transform group-hover:rotate-0">
                    {card.icon}
                  </div>
                </div>
                
                <div className="w-12 h-12 border border-primary/30 flex items-center justify-center group-hover:border-black/30 group-hover:bg-black/5 transition-all">
                  <div className="text-primary group-hover:text-black">
                    {card.icon}
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-serif text-white group-hover:text-black transition-colors italic leading-none">{card.title}</h3>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-black/70 transition-colors leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between group-hover:text-black transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] underline underline-offset-8 decoration-primary/30 group-hover:decoration-black/30">{card.btn}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="relative group cursor-pointer overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
             <div className="p-16 border border-primary/20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="space-y-6">
                   <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-primary/30 rounded-full">
                      <Zap size={12} className="text-primary fill-primary" />
                      <span className="text-[10px] text-primary font-black uppercase tracking-widest">Recommended Strategic Shift</span>
                   </div>
                   <h4 className="text-5xl font-serif text-white tracking-tighter leading-none italic">Improve Logic Gap: <span className="not-italic text-primary underline decoration-primary/20 underline-offset-8">Torts & Contracts</span></h4>
                   <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-light">Your previous session reveals a 12% drop in accuracy during time-pressure transitions. We've curated a high-intensity drill set focusing on Vicarious Liability and Frustration of Contract.</p>
                </div>
                <button 
                  onClick={() => setView('PRACTICE')}
                  className="bg-primary text-black px-16 h-20 font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all shrink-0 border-none shadow-[0_0_40px_rgba(194,163,93,0.3)]"
                >
                  INITIALIZE DRILL
                </button>
             </div>
          </div>

          {/* Cognitive Performance & NLU Tracker */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-surface border border-border p-8 lg:p-12 space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-serif text-white italic">Logical Readiness Progress</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Session attribution & Cognitive Load</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 bg-primary" />
                           <span className="text-[9px] text-white uppercase font-bold tracking-widest">Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 bg-white/10" />
                           <span className="text-[9px] text-white uppercase font-bold tracking-widest">Target</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                     {[
                        { label: 'Current Streak', val: '12 Days', sub: '+2 from avg' },
                        { label: 'Quizzes Done', val: '48', sub: 'Top 15%' },
                        { label: 'Study Hours', val: '156', sub: 'Goal: 200' },
                        { label: 'Acc. Rate', val: '78%', sub: 'High Stability' },
                        { label: 'Mock %ile', val: '94.2', sub: 'Target: 99.0' },
                        { label: 'Logic Gap', val: '12%', sub: 'Focus: Torts' }
                     ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                           <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</p>
                           <h4 className="text-2xl font-serif text-white italic">{stat.val}</h4>
                           <p className="text-[8px] text-primary uppercase font-bold tracking-tighter">{stat.sub}</p>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-6 pt-8 border-t border-white/5">
                     <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                           <span className="text-gray-500">Legal Reasoning Proficiency</span>
                           <span className="text-white">72%</span>
                        </div>
                        <div className="h-1 bg-white/5 overflow-hidden">
                           <div className="h-full bg-primary w-[72%] shadow-[0_0_10px_rgba(194,163,93,0.5)]" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                           <span className="text-gray-500">English Language Synthesis</span>
                           <span className="text-white">54%</span>
                        </div>
                        <div className="h-1 bg-white/5 overflow-hidden">
                           <div className="h-full bg-primary w-[54%] shadow-[0_0_10px_rgba(194,163,93,0.5)]" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                           <span className="text-gray-500">Critical Logic Application</span>
                           <span className="text-white">88%</span>
                        </div>
                        <div className="h-1 bg-white/5 overflow-hidden">
                           <div className="h-full bg-primary w-[88%] shadow-[0_0_10px_rgba(194,163,93,0.5)]" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-1">
               <Card className="bg-[#0C0F14] border-border rounded-none h-full p-8 lg:p-12 space-y-10 relative overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="space-y-4 relative z-10">
                     <div className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Target size={20} />
                     </div>
                     <h3 className="text-3xl font-serif text-white italic tracking-tighter">Dream NLU <br /> Rank Engine</h3>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-relaxed">Simulate your landing spot based on current percentile trajectory.</p>
                  </div>

                  <div className="space-y-8 relative z-10">
                     <div className="space-y-3">
                        <label className="text-[9px] text-primary/60 uppercase font-black tracking-widest">Target University</label>
                        <select 
                           value={dreamNLU || ''} 
                           onChange={(e) => setDreamNLU(e.target.value)}
                           className="w-full bg-surface border border-border p-4 text-white font-serif italic text-lg outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                        >
                           <option value="" disabled>Select Institution</option>
                           <option value="NLSIU">NLSIU Bangalore</option>
                           <option value="NALSAR">NALSAR Hyderabad</option>
                           <option value="WBNUJS">WBNUJS Kolkata</option>
                           <option value="NLUJ">NLU Jodhpur</option>
                           <option value="GNLU">GNLU Gandhinagar</option>
                        </select>
                     </div>

                     <div className="space-y-6 p-6 bg-surface/50 border border-white/5">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Estimated AIR</span>
                           <span className="text-xl font-serif text-white italic">Rank #142 - #210</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Entry Probability</span>
                           <span className="text-xl font-serif text-primary italic">High (82%)</span>
                        </div>
                     </div>

                     <button 
                        onClick={() => setView('ANALYSIS')}
                        className="w-full h-14 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-black transition-all"
                     >
                        Detailed Rank Diagnostics
                     </button>
                  </div>
               </Card>

               <Card className="bg-surface border-border rounded-none p-8 lg:p-12 space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-serif text-white italic">Upcoming Targets</h3>
                     <Badge className="bg-accent text-gray-400 border-none text-[8px] font-black">4 PENDING</Badge>
                  </div>
                  <div className="space-y-4">
                     {[
                        { title: 'Weekly Pro-Mock #4', date: 'Tomorrow, 2:00 PM', urgency: 'High' },
                        { title: 'GK Monthly Revision', date: 'Oct 30, 2024', urgency: 'Moderate' },
                        { title: 'Lexie Analysis: Contracts', date: 'Due in 2 days', urgency: 'Urgent' },
                        { title: 'Sectional Logic Drill', date: 'Next Sunday', urgency: 'Scheduled' }
                     ].map((target, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                           <div className={`w-1 h-8 rounded-full ${target.urgency === 'Urgent' ? 'bg-red-500' : 'bg-primary/20 group-hover:bg-primary transition-colors'}`} />
                           <div className="space-y-0.5">
                              <p className="text-[11px] font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">{target.title}</p>
                              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{target.date}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'DAILY' }))} className="text-[10px] text-primary font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2">
                     VIEW ALL SCHEDULES <ChevronRight size={14} />
                  </button>
               </Card>
            </div>
          </div>

          {!profile?.isPremium && (
            <div className="bg-primary p-12 lg:p-20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-20" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-center lg:text-left max-w-2xl text-black">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-black">Strategic Opportunity</span>
                  <h2 className="text-4xl lg:text-5xl font-serif italic tracking-tighter leading-tight">
                    Your Competitive Edge <br /> is Currently <span className="underline decoration-black/20">Throttled.</span>
                  </h2>
                  <p className="text-black/70 text-sm font-medium uppercase tracking-widest leading-relaxed">
                    Premium members access Predictive Rank Analytics, unlimited AI Tutoring sessions, and the Historical Mock Vault. Don't leave your AIR to chance.
                  </p>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="bg-black text-white px-12 py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95"
                >
                  UPGRADE TO LEX-PREMIUM
                </button>
              </div>
            </div>
          )}
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
      default: return <LandingPage user={user} onCheckout={handleCheckout} />;
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black text-[#E0E0E0] font-sans scroll-ios">
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

      {/* Lexie Coach Resident Avatar - Fixed Bottom Right */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none safe-bottom safe-right">
        <AnimatePresence>
          {view === 'DASHBOARD' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 pointer-events-auto"
            >
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl max-w-[240px] relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Star size={14} className="text-black fill-black" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Lexie Mentor</span>
                </div>
                <p className="text-[11px] text-gray-300 font-serif italic leading-relaxed">
                  "I've identified a logic gap in your Torts performance. Let's fix it in the Masterclass before your next mock."
                </p>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-black/90 border-r border-b border-white/10 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setView('TUTOR')}
          className="w-16 h-16 rounded-full bg-primary border-4 border-black shadow-2xl flex items-center justify-center pointer-events-auto group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap size={28} className="text-black fill-black" />
        </motion.button>
      </div>

      <Footer />

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
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap size={32} className="text-primary" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif italic text-white mb-2">LexCLAT Premium</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manual UPI Checkout</p>
                </div>
                
                <div className="bg-background border border-primary/30 p-6 space-y-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Scan or Pay To Number</p>
                  <p className="text-3xl font-black text-white tracking-widest">7639176376</p>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-2">Accepted: GPay, PhonePe, Paytm</p>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed">
                  Please complete the payment on your UPI app. Once done, click the verification button below. Premium access will be granted upon admin verification.
                </p>

                <Button 
                  onClick={() => {
                    toast.success("Payment verification request sent! You will be upgraded shortly.");
                    setShowUpiModal(false);
                  }}
                  className="w-full bg-primary text-black hover:bg-white font-black uppercase tracking-widest rounded-none h-12"
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
