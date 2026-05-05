import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target, 
  Clock, 
  Star, 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  Loader2, 
  Target as TargetIcon, 
  CheckCircle2, 
  RotateCcw, 
  Save, 
  Trash2, 
  ShieldCheck,
  TrendingUp,
  Brain,
  Zap,
  BarChart3,
  Dna,
  Trophy,
  MessageSquare,
  Scale,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { toast } from 'sonner';
import { db, auth, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { 
  NLU_TARGETS,
  NLU_BENCHMARKS,
  calculateImprovementGap, 
  calculateSubjectWeights, 
  calculateWeeklyHours, 
  calculateReadinessScore, 
  distributeWeeklyHours,
  predictRankTrend,
  calculateVelocity,
  StudentProfile,
  DiagnosticScores
} from '@/src/lib/studyEngine';
import { generatePersonalizedRoadmap } from '@/src/services/geminiService';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from 'recharts';

const CLAT_SUBJECTS = [
  { id: 'english', name: 'English Language' },
  { id: 'gk', name: 'Current Affairs & GK' },
  { id: 'legal', name: 'Legal Reasoning' },
  { id: 'logical', name: 'Logical Reasoning' },
  { id: 'quant', name: 'Quantitative Techniques' }
];

interface Task {
  text: string;
  completed: boolean;
  feedback?: number;
}

interface DayPlan {
  focus: string;
  tasks: Task[];
  hours: number;
}

interface Plan {
  schedule: Record<string, DayPlan>;
  strategy: string;
  updatedAt?: any;
}

interface StudyPlannerProps {
  askLexie?: (query: string) => void;
}

const StudyPlanner = ({ askLexie }: StudyPlannerProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  interface LocalUserProfile extends StudentProfile {
    email?: string;
    displayName?: string;
    createdAt?: any;
    updatedAt?: any;
  }

  const [profile, setProfile] = useState<LocalUserProfile | null>(null);
  const [aiRoadmap, setAiRoadmap] = useState<string | null>(null);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  
  const [inputs, setInputs] = useState({
    targetNlu: 'NLSIU Bangalore',
    targetYear: 2026,
    targetRank: 100,
    studentStatus: 'school' as 'dropper' | 'school',
    hoursWeekdays: 4,
    hoursWeekends: 8,
    diag: {
      english: 60,
      gk: 40,
      legal: 55,
      logical: 50,
      quant: 30
    } as DiagnosticScores,
    currentScore: 85,
    targetScore: 105,
    timings: '8 AM - 2 PM School',
    strongSections: 'Legal Reasoning, English',
    weakSections: 'Quantitative Techniques',
    caBacklog: '3 Months (Jan-Mar 2024)',
    mocksAttempted: 5,
    accuracy: 75,
    biggestProblem: 'Time management in Logical section',
    studyStyle: 'Visual/Self-Study',
    stressLevel: 'Moderate',
    consistencyLevel: 'Regular',
    revisionHabit: 'Weekly',
    readingSpeed: 'Average',
    levels: {
      english: 'Intermediate',
      logical: 'Beginner',
      legal: 'Intermediate',
      gk: 'Advanced',
      quant: 'Beginner'
    }
  });

  const [plan, setPlan] = useState<Plan | null>(null);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setFetching(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const planDoc = await getDoc(doc(db, 'users', user.uid, 'studyPlan', 'current'));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.diagnosticScores) {
            setProfile({
              targetNlu: data.targetNlu || 'Other NLU',
              targetYear: data.targetYear || 2025,
              targetRank: data.targetRank || 500,
              studentStatus: data.studentStatus || 'school',
              hoursWeekdays: data.hoursWeekdays || 4,
              hoursWeekends: data.hoursWeekends || 8,
              diagnosticScores: data.diagnosticScores,
              behavior: data.behavior || { consistency: 80, completionRate: 70 }
            });
          }
        }
        
        if (planDoc.exists()) {
          setPlan(planDoc.data() as Plan);
        }

        const roadmapDoc = await getDoc(doc(db, 'users', user.uid, 'roadmap', 'current'));
        if (roadmapDoc.exists()) {
          setAiRoadmap(roadmapDoc.data().content);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `users/${user.uid}/composite_profile`);
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, [user]);

  const saveProfileToFirestore = async (newProfile: StudentProfile) => {
    if (!user) return;
    try {
      const payload: any = {
        ...newProfile,
        email: user.email,
        displayName: user.displayName || profile?.displayName || 'Aspirant',
        createdAt: profile?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  const engineMetrics = useMemo(() => {
    if (!profile) return null;
    
    const avgScore = Object.values(profile.diagnosticScores).reduce((a, b) => a + b, 0) / 5;
    const gap = calculateImprovementGap(avgScore, profile.targetNlu);
    const weights = calculateSubjectWeights(profile.diagnosticScores);
    const weeklyHours = calculateWeeklyHours(profile.hoursWeekdays, profile.hoursWeekends);
    const readiness = calculateReadinessScore(avgScore, profile.behavior.consistency, avgScore, profile.behavior.completionRate);
    const trend = predictRankTrend(readiness);
    const hourAllocation = distributeWeeklyHours(weeklyHours, weights);
    const velocity = calculateVelocity(profile.behavior.completionRate, profile.behavior.consistency);

    const chartData = CLAT_SUBJECTS.map(sub => ({
      subject: sub.name,
      weight: Math.round(weights[sub.id]),
      score: profile.diagnosticScores[sub.id as keyof DiagnosticScores]
    }));

    return { avgScore, gap, weights, weeklyHours, readiness, trend, hourAllocation, velocity, chartData };
  }, [profile]);

  const generateEnginePlan = async () => {
    if (!profile || !engineMetrics) return;
    setLoading(true);
    try {
      // Create a structure based on weights
      const schedule: Record<string, DayPlan> = {};
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
      days.forEach((day, index) => {
        const isWeekend = day === 'Saturday' || day === 'Sunday';
        const hours = isWeekend ? profile.hoursWeekends : profile.hoursWeekdays;
        
        // Pick top focusing subjects for the day based on weights
        const sortedSubjects = [...CLAT_SUBJECTS].sort((a, b) => engineMetrics.weights[b.id] - engineMetrics.weights[a.id]);
        const mainSub = sortedSubjects[index % 3]; // Focus on top 3 weakest subjects primarily
        const secondarySub = sortedSubjects[(index + 1) % 5];
        
        schedule[day] = {
          focus: `${mainSub.name} Focus`,
          hours: hours,
          tasks: [
            { text: `Intensive Review: ${mainSub.name} (Weakness Priority: ${Math.round(engineMetrics.weights[mainSub.id])}%)`, completed: false },
            { text: `Practice: 5 Advanced Passages + Error Analysis in ${mainSub.name}`, completed: false },
            { text: `Secondary Review: ${secondarySub.name}`, completed: false },
            { text: isWeekend ? "Full-Length Pro-Mock Simulation" : "Daily Revision & Current Affairs Digest", completed: false }
          ]
        };
      });

      const newPlan: Plan = {
        schedule,
        strategy: `Your current gap is ${engineMetrics.gap.toFixed(1)} marks to reach ${profile.targetNlu}. Focus on ${CLAT_SUBJECTS.find(s => s.id === Object.keys(engineMetrics.weights).sort((a, b) => engineMetrics.weights[b] - engineMetrics.weights[a])[0])?.name} to bridge this gap faster.`,
        updatedAt: serverTimestamp()
      };

      setPlan(newPlan);
      if (user) {
        await setDoc(doc(db, 'users', user.uid, 'studyPlan', 'current'), newPlan);
      }
      toast.success("Dynamic roadmap recalibrated.");
    } catch (err) {
      toast.error("Engine failed to synchronize.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiagnosticSubmit = async () => {
    setLoading(true);
    const newProfile: StudentProfile = {
      targetNlu: inputs.targetNlu,
      targetYear: inputs.targetYear,
      targetRank: inputs.targetRank,
      studentStatus: inputs.studentStatus,
      hoursWeekdays: inputs.hoursWeekdays,
      hoursWeekends: inputs.hoursWeekends,
      diagnosticScores: inputs.diag,
      behavior: { consistency: 80, completionRate: 70 }
    };
    
    setProfile(newProfile);
    await saveProfileToFirestore(newProfile);
    setLoading(false);
    // Auto-generate plan after diagnostic
    setTimeout(() => generateEnginePlan(), 500);
  };

  const toggleTask = async (dayKey: string, taskIndex: number) => {
    if (!plan || !user) return;
    const newPlan = { ...plan };
    newPlan.schedule[dayKey].tasks[taskIndex].completed = !newPlan.schedule[dayKey].tasks[taskIndex].completed;
    setPlan(newPlan);
    try {
      await setDoc(doc(db, 'users', user.uid, 'studyPlan', 'current'), newPlan);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/studyPlan/current`);
    }
  };

  const rateTask = async (dayKey: string, taskIndex: number, rating: number) => {
    if (!plan || !user) return;
    const newPlan = { ...plan };
    newPlan.schedule[dayKey].tasks[taskIndex].feedback = rating;
    setPlan(newPlan);
    try {
      await setDoc(doc(db, 'users', user.uid, 'studyPlan', 'current'), newPlan, { merge: true });
      toast.success("Task feedback recorded.");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/studyPlan/current`);
    }
  };

  const generateAIRoadmap = async () => {
    if (!user) return;
    setGeneratingRoadmap(true);
    try {
      const roadmapData = {
        targetNlu: inputs.targetNlu,
        currentScore: inputs.currentScore,
        targetScore: inputs.targetScore,
        examYear: inputs.targetYear,
        aspirantStatus: inputs.studentStatus,
        hoursWeekdays: inputs.hoursWeekdays,
        hoursWeekends: inputs.hoursWeekends,
        timings: inputs.timings,
        strongSections: inputs.strongSections,
        weakSections: inputs.weakSections,
        caBacklog: inputs.caBacklog,
        mocksAttempted: inputs.mocksAttempted,
        accuracy: inputs.accuracy,
        biggestProblem: inputs.biggestProblem,
        studyStyle: inputs.studyStyle,
        stressLevel: inputs.stressLevel,
        consistencyLevel: inputs.consistencyLevel,
        revisionHabit: inputs.revisionHabit,
        readingSpeed: inputs.readingSpeed,
        englishLevel: inputs.levels.english,
        logicalLevel: inputs.levels.logical,
        legalLevel: inputs.levels.legal,
        gkLevel: inputs.levels.gk,
        quantLevel: inputs.levels.quant
      };

      const roadmap = await generatePersonalizedRoadmap(roadmapData);
      setAiRoadmap(roadmap);
      await setDoc(doc(db, 'users', user.uid, 'roadmap', 'current'), {
        content: roadmap,
        updatedAt: serverTimestamp()
      });
      toast.success("AI Strategic Roadmap generated.");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/roadmap/current`);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const resetAll = async () => {
    if (!user) return;
    if (!confirm("Are you sure you want to reset your engine and diagnostic data?")) return;
    try {
      await setDoc(doc(db, 'users', user.uid), { 
        diagnosticScores: null,
        updatedAt: serverTimestamp()
      }, { merge: true });
      await deleteDoc(doc(db, 'users', user.uid, 'studyPlan', 'current'));
      setPlan(null);
      setProfile(null);
      setStep(1);
      toast.info("Engine reset.");
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/studyPlan/current`);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center gap-6">
        <Loader2 className="animate-spin text-primary" size={40} />
        <div className="space-y-2">
          <h3 className="text-xl font-serif text-white italic">Synchronizing Academic Engine</h3>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">Processing mock data and trend projections...</p>
        </div>
      </div>
    );
  }

  if (generatingRoadmap) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center gap-10 max-w-lg mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse rounded-full" />
          <div className="relative w-24 h-24 bg-surface border border-primary/40 flex items-center justify-center rotate-45 animate-[spin_10s_linear_infinite]">
             <Brain className="text-primary -rotate-45" size={40} />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-white italic">Neural Roadmap Synthesis</h3>
          <div className="flex flex-col gap-2">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 4, repeatType: 'reverse' }}
              className="text-[10px] text-primary font-black uppercase tracking-[0.3em] h-4"
            >
              Analyzing Mock Accuracy Trends...
            </motion.p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
              Synthesizing a high-yield study architecture based on your target NLU benchmarks and available cognitive load capacity.
            </p>
          </div>
        </div>
        <div className="w-full bg-accent h-px relative overflow-hidden">
           <motion.div 
             initial={{ x: '-100%' }}
             animate={{ x: '100%' }}
             transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
             className="absolute inset-0 bg-primary w-1/3"
           />
        </div>
      </div>
    );
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // --- Profile View (Dashboard) ---
  if (profile && plan && engineMetrics) {
    if (aiRoadmap) {
      return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20 px-2 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Sparkles className="text-primary" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-white italic">AI Strategic Roadmap</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Optimized for {inputs.targetNlu}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setAiRoadmap(null)} 
                className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline"
              >
                Back to Dashboard
              </button>
              <button 
                onClick={generateAIRoadmap}
                className="h-10 px-6 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all"
              >
                Regenerate Roadmap
              </button>
            </div>
          </div>

          <Card className="bg-surface border-border p-10 prose prose-invert prose-primary max-w-none prose-headings:font-serif prose-headings:italic prose-headings:tracking-tight prose-p:text-gray-400 prose-p:text-sm prose-li:text-gray-400 prose-li:text-sm prose-strong:text-white">
            <Markdown>{aiRoadmap}</Markdown>
          </Card>

          <div className="flex justify-center">
             <button 
                onClick={() => setAiRoadmap(null)}
                className="flex items-center gap-2 h-12 px-8 border border-border text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white hover:border-white transition-all"
             >
                <ArrowRight size={14} className="rotate-180" /> Return to Dynamic Planner
             </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto space-y-12 pb-20 px-2 sm:px-6">
        {/* Engine Dashboard Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-surface border-border p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:scale-125 transition-transform">
              <Trophy size={48} />
            </div>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-4">Dream NLU Goal</p>
            <h3 className="text-xl font-serif text-white italic truncate">{profile.targetNlu}</h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 flex-1 bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.min(100, (engineMetrics.avgScore / NLU_TARGETS[profile.targetNlu]) * 100)}%` }} />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">{Math.round((engineMetrics.avgScore / NLU_TARGETS[profile.targetNlu]) * 100)}%</span>
            </div>
          </Card>

          <Card className="bg-surface border-border p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:scale-125 transition-transform">
              <TrendingUp size={48} />
            </div>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-4">Current Rank Trend</p>
            <h3 className="text-xl font-serif text-white italic" style={{ color: engineMetrics.trend.color }}>{engineMetrics.trend.rank}</h3>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-2">{engineMetrics.trend.level}</p>
          </Card>

          <Card className="bg-surface border-border p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:scale-125 transition-transform">
              <Zap size={48} />
            </div>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-4">Improvement Gap</p>
            <h3 className="text-xl font-serif text-white italic">+{engineMetrics.gap.toFixed(1)} Marks</h3>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-2">Required for {profile.targetNlu}</p>
          </Card>

          <Card className="bg-surface border-border p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:scale-125 transition-transform">
              <Brain size={48} />
            </div>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-4">Engine Readiness</p>
            <h3 className="text-xl font-serif text-white italic">{Math.round(engineMetrics.readiness)}/100</h3>
            <div className="mt-4 h-1 bg-accent rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: `${engineMetrics.readiness}%` }} />
            </div>
          </Card>
        </div>

        {/* Strategic Comparison Section */}
        <div className="grid lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-3 bg-surface border-border p-4 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-serif text-white italic">NLU Benchmark Comparison</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Your Standing vs Strategic Thresholds</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/20 border border-primary" />
                  <span className="text-[9px] text-gray-400 uppercase font-bold">NLU Requirement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white" />
                  <span className="text-[9px] text-gray-400 uppercase font-bold">Your Achievement</span>
                </div>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.entries(NLU_BENCHMARKS).slice(0, 10).map(([name, data]) => ({ name, score: data.targetScore, user: engineMetrics.avgScore }))} layout="vertical" margin={{ left: isMobile ? 10 : 100, right: 20 }}>
                  <XAxis type="number" domain={[0, 120]} hide />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#666', fontSize: isMobile ? 8 : 10, fontFamily: 'serif' }} width={isMobile ? 80 : 120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}
                    itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }}
                  />
                  <Bar dataKey="score" fill="rgba(255, 215, 0, 0.1)" stroke="#FFD700" strokeWidth={1} barSize={20} />
                  <Bar dataKey="user" fill="white" barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="bg-primary/5 border-primary/20 p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <TargetIcon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Target Status</span>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 uppercase font-black">Probability Index</p>
                <p className="text-2xl font-serif text-white italic">
                  {engineMetrics.avgScore >= NLU_BENCHMARKS[profile.targetNlu].targetScore ? 'Safe' : 
                   engineMetrics.avgScore >= NLU_BENCHMARKS[profile.targetNlu].targetScore - 5 ? 'Reach' : 'Developing'}
                </p>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
                Current performance is {Math.round(engineMetrics.avgScore)} average. 
                Focus on the remaining {engineMetrics.gap.toFixed(1)} marks to stabilize admission status.
              </p>
            </Card>

            <Card className="bg-surface border-border p-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Scale size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Historic AIR </span>
              </div>
              <div className="text-3xl font-serif text-white italic">#{NLU_BENCHMARKS[profile.targetNlu].historicAIR}</div>
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.2em]">Cutoff for {profile.targetNlu}</p>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Active Schedule */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-6">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Calendar className="text-primary" size={16} />
                 </div>
                 <h2 className="text-2xl font-serif text-white italic">Dynamic Weekly Plan</h2>
               </div>
               <div className="flex gap-4">
                 <button 
                  onClick={generateEnginePlan} 
                  className="flex items-center gap-2 h-10 px-6 border border-primary text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all"
                 >
                   <RotateCcw size={14} /> Recalibrate Plan
                 </button>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
               {Object.entries(plan.schedule).map(([day, details], idx) => (
                 <motion.div 
                   key={day}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className={`p-8 bg-background group hover:bg-surface transition-all relative overflow-hidden ${details.tasks.every(t => t.completed) ? 'bg-primary/5' : ''}`}
                 >
                   <div className="flex justify-between items-start mb-6">
                     <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none">{day}</span>
                     <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest border border-white/5 bg-accent/50 px-2 py-1">
                        <Clock size={10} className="text-primary" /> {details.hours} HRS
                     </div>
                   </div>
                   
                   <h4 className="text-2xl font-serif text-white italic mb-8 group-hover:text-primary transition-colors tracking-tight">{details.focus}</h4>
                   
                   <div className="space-y-4">
                     {details.tasks.map((task, i) => (
                        <div key={i} className="flex flex-col gap-3 group/task border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <Checkbox 
                              checked={task.completed} 
                              onCheckedChange={() => toggleTask(day, i)}
                              className="border-primary/20 h-5 w-5 rounded-none data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all mt-0.5"
                            />
                            <span className={`text-[12px] leading-relaxed transition-all flex-1 font-light ${task.completed ? 'text-gray-600 line-through' : 'text-gray-400 group-hover/task:text-white'}`}>
                              {task.text}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between pl-9">
                             <div className="flex items-center gap-3">
                               <span className="text-[7px] text-gray-700 font-black uppercase tracking-[0.2em] leading-none">Yield Level:</span>
                               <div className="flex gap-1.5">
                                 {[1, 2, 3, 4, 5].map((star) => (
                                   <button
                                     key={star}
                                     onClick={() => rateTask(day, i, star)}
                                     className={`transition-all hover:scale-125 ${star <= (task.feedback || 0) ? 'text-primary' : 'text-gray-900 group-hover/task:text-gray-800'}`}
                                   >
                                     <Star 
                                       size={10} 
                                       fill={star <= (task.feedback || 0) ? "currentColor" : "transparent"} 
                                       strokeWidth={1.5}
                                     />
                                   </button>
                                 ))}
                               </div>
                             </div>
                             
                             {askLexie && (
                               <button 
                                 onClick={() => askLexie(`I am struggling with this task in my study plan: "${task.text}". Can you give me a detailed explanation or an example related to this topic?`)}
                                 className="flex items-center gap-1.5 text-[8px] font-black text-primary uppercase tracking-[0.1em] opacity-0 group-hover/task:opacity-100 hover:tracking-widest transition-all"
                               >
                                 <MessageSquare size={10} /> ASK AI TUTOR
                               </button>
                             )}
                          </div>
                        </div>
                     ))}
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Allocation & Strategy */}
          <div className="space-y-12">
             <div className="space-y-6">
               <p className="text-[10px] text-primary font-black uppercase tracking-widest text-center">Diagnostic Profile</p>
               <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={engineMetrics.chartData}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 9 }} />
                      <Radar
                        name="Strength"
                        dataKey="score"
                        stroke="#FFD700"
                        fill="#FFD700"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Study Weight"
                        dataKey="weight"
                        stroke="#60a5fa"
                        fill="#60a5fa"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex justify-center gap-4 text-[9px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-primary" /> Accuracy</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500" /> Focus Weight</div>
               </div>
               
               <div className="pt-6 space-y-4">
                 {CLAT_SUBJECTS.map(sub => (
                   <div key={sub.id} className="space-y-2">
                     <div className="flex justify-between text-[11px] font-bold">
                       <span className="text-white">{sub.name}</span>
                       <span className="text-primary">{engineMetrics.hourAllocation[sub.id]} Hrs/Week</span>
                     </div>
                     <Progress value={engineMetrics.weights[sub.id]} className="h-[2px] bg-accent" />
                   </div>
                 ))}
               </div>
             </div>

             <Card className="p-6 bg-surface border-border border-t-2 border-t-primary">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">Momentum Velocity</p>
                  <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black">{Math.round(engineMetrics.velocity)}%</Badge>
                </div>
                <div className="flex items-end gap-2 h-12">
                   {[...Array(12)].map((_, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                        className={`flex-1 ${i < (engineMetrics.velocity / 8) ? 'bg-primary' : 'bg-accent'}`}
                     />
                   ))}
                </div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-4">Consistency Index Balanced</p>
             </Card>

             <div className="p-8 bg-accent/30 border-l border-primary/30 relative overflow-hidden">
               <Dna className="absolute -bottom-4 -right-4 text-primary opacity-5" size={120} />
               <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                 <ShieldCheck size={14} /> Directive Alpha
               </p>
               <p className="text-gray-400 text-sm leading-relaxed font-light italic italic">
                 "{plan.strategy}"
               </p>
               <button 
                 onClick={generateAIRoadmap}
                 disabled={generatingRoadmap}
                 className="mt-6 w-full h-12 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 {generatingRoadmap ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                 {generatingRoadmap ? 'Processing Neural Roadmap...' : 'Generate Full AI Roadmap'}
               </button>
             </div>

             <div className="pt-8 border-t border-border">
               <button 
                onClick={resetAll}
                className="w-full h-12 border border-border text-[10px] font-black text-gray-500 uppercase tracking-widest hover:border-red-500/50 hover:text-red-500 transition-all flex items-center justify-center gap-2"
               >
                 <Trash2 size={14} /> Reset Academic Engine
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Onboarding / Diagnostic View ---
  const currentAvg = Object.values(inputs.diag).reduce((a, b) => a + b, 0) / 5;

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-10 px-4 sm:px-6 md:px-0">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-accent border border-primary/20 flex items-center justify-center mx-auto mb-8 rotate-45">
           <Brain className="text-primary -rotate-45" size={32} />
        </div>
        <h2 className="text-4xl font-serif text-white italic tracking-tight">Academic Onboarding</h2>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Smart Goal Calibration • Step {step} of 3</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="bg-surface border border-border p-8 space-y-8">
               <div className="space-y-4">
                  <label className="text-[10px] text-primary font-black uppercase tracking-widest">Dream NLU Selection</label>
                  <Select value={inputs.targetNlu} onValueChange={(val) => setInputs({...inputs, targetNlu: val})}>
                    <SelectTrigger className="bg-black border-border h-14 rounded-none text-serif">
                      <SelectValue placeholder="Select NLU" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-border">
                      {Object.keys(NLU_BENCHMARKS).map(nlu => (
                        <SelectItem key={nlu} value={nlu} className="text-xs">{nlu}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black">Attempt Year</label>
                    <Input type="number" value={inputs.targetYear} onChange={(e) => setInputs({...inputs, targetYear: parseInt(e.target.value)})} className="bg-black border-border rounded-none h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black">Current Status</label>
                    <Select value={inputs.studentStatus} onValueChange={(val: any) => setInputs({...inputs, studentStatus: val})}>
                      <SelectTrigger className="bg-black border-border h-12 rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="dropper">Dropper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black">Mock Score</label>
                    <Input type="number" value={inputs.currentScore} onChange={(e) => setInputs({...inputs, currentScore: parseInt(e.target.value)})} className="bg-black border-border rounded-none h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-black">Target Rank</label>
                    <Input type="number" value={inputs.targetRank} onChange={(e) => setInputs({...inputs, targetRank: parseInt(e.target.value)})} className="bg-black border-border rounded-none h-12 text-white" />
                  </div>
               </div>
            </div>
            <Button className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-none" onClick={() => setStep(2)}>
              Sectional Proficiency <ChevronRight size={16} />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
             <div className="bg-surface border border-border p-8 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 {CLAT_SUBJECTS.map(sub => (
                   <div key={sub.id} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] text-gray-500 uppercase font-black">{sub.name}</label>
                        <span className="text-primary text-[10px] font-black">{inputs.diag[sub.id as keyof DiagnosticScores]}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="range" min="0" max="100" step="1"
                          value={inputs.diag[sub.id as keyof DiagnosticScores]}
                          onChange={(e) => setInputs({...inputs, diag: { ...inputs.diag, [sub.id]: parseInt(e.target.value) }})}
                          className="bg-transparent accent-primary h-2 flex-1"
                        />
                        <Select value={inputs.levels[sub.id as keyof typeof inputs.levels]} onValueChange={(val) => setInputs({...inputs, levels: {...inputs.levels, [sub.id]: val}})}>
                          <SelectTrigger className="w-24 bg-black border-border h-8 rounded-none text-[8px] uppercase font-black">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-surface border-border">
                            <SelectItem value="Beginner" className="text-[9px]">Beg</SelectItem>
                            <SelectItem value="Intermediate" className="text-[9px]">Int</SelectItem>
                            <SelectItem value="Advanced" className="text-[9px]">Adv</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                   </div>
                 ))}
               </div>

               <div className="pt-6 border-t border-border flex items-center justify-between gap-8">
                  <div className="flex-1 space-y-2">
                    <label className="text-[9px] text-gray-500 uppercase font-black">Reading Speed (Words/Min)</label>
                    <Input placeholder="e.g. 250 WPM" value={inputs.readingSpeed} onChange={(e) => setInputs({...inputs, readingSpeed: e.target.value})} className="bg-black border-border rounded-none h-10 text-white text-[10px]" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[9px] text-gray-500 uppercase font-black">Preferred Style</label>
                    <Select value={inputs.studyStyle} onValueChange={(val) => setInputs({...inputs, studyStyle: val})}>
                      <SelectTrigger className="bg-black border-border h-10 rounded-none text-[10px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-border">
                        <SelectItem value="visual">Visual (Passages & Graphics)</SelectItem>
                        <SelectItem value="analytical">Analytical (Logic & Data)</SelectItem>
                        <SelectItem value="verbal">Verbal (Discussion & Reading)</SelectItem>
                        <SelectItem value="kinaesthetic">Kinaesthetic (Active Practice)</SelectItem>
                        <SelectItem value="solitary">Independent (Silence)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>
             </div>
             <div className="flex gap-4">
               <Button variant="outline" className="flex-1 rounded-none border-border h-14 uppercase tracking-widest text-[10px] font-bold" onClick={() => setStep(1)}>Back</Button>
               <Button className="flex-[2] h-14 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-none" onClick={() => setStep(3)}>
                Routine & Roadmap <ChevronRight size={16} />
               </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="bg-surface border border-border p-8 space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-primary font-black uppercase tracking-widest">Weekdays Hrs</label>
                    <Input type="number" value={inputs.hoursWeekdays} onChange={(e) => setInputs({...inputs, hoursWeekdays: parseInt(e.target.value)})} className="bg-black border-border rounded-none h-12 text-white" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-primary font-black uppercase tracking-widest">Weekend Hrs</label>
                    <Input type="number" value={inputs.hoursWeekends} onChange={(e) => setInputs({...inputs, hoursWeekends: parseInt(e.target.value)})} className="bg-black border-border rounded-none h-12 text-white" />
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black">CA Backlog</label>
                    <Input placeholder="Months or Topics" value={inputs.caBacklog} onChange={(e) => setInputs({...inputs, caBacklog: e.target.value})} className="bg-black border-border rounded-none h-12 text-white text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black">Primary Goal/Roadblock</label>
                    <Input placeholder="e.g. Logic accuracy is low" value={inputs.biggestProblem} onChange={(e) => setInputs({...inputs, biggestProblem: e.target.value})} className="bg-black border-border rounded-none h-12 text-white text-xs" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black">School Timing</label>
                    <Input value={inputs.timings} onChange={(e) => setInputs({...inputs, timings: e.target.value})} className="bg-black border-border rounded-none h-10 text-white text-[10px]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black">Consistency</label>
                    <Select value={inputs.consistencyLevel} onValueChange={(val) => setInputs({...inputs, consistencyLevel: val})}>
                      <SelectTrigger className="bg-black border-border h-10 rounded-none text-[10px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-border">
                        <SelectItem value="Regular">Regular (Daily)</SelectItem>
                        <SelectItem value="Irregular">Irregular (On/Off)</SelectItem>
                        <SelectItem value="Intense">Intense (Burnout Risk)</SelectItem>
                        <SelectItem value="Passive">Casual (Weekend Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black">Stress Level</label>
                    <Select value={inputs.stressLevel} onValueChange={(val) => setInputs({...inputs, stressLevel: val})}>
                      <SelectTrigger className="bg-black border-border h-10 rounded-none text-[10px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-border">
                        <SelectItem value="Low">Low / Chilled</SelectItem>
                        <SelectItem value="Moderate">Moderate / Alert</SelectItem>
                        <SelectItem value="High">High / Anxious</SelectItem>
                        <SelectItem value="Extreme">Critical / Panic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black">Revision Habit</label>
                    <Select value={inputs.revisionHabit} onValueChange={(val) => setInputs({...inputs, revisionHabit: val})}>
                      <SelectTrigger className="bg-black border-border h-10 rounded-none text-[10px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-border">
                        <SelectItem value="Daily">Daily / Active</SelectItem>
                        <SelectItem value="Weekly">Weekly / Systematic</SelectItem>
                        <SelectItem value="Monthly">Monthly / Bulk</SelectItem>
                        <SelectItem value="Never">None / Random</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>
            </div>
            <div className="flex gap-4">
               <Button variant="outline" className="flex-1 rounded-none border-border h-14 uppercase tracking-widest text-[10px] font-bold" onClick={() => setStep(2)}>Back</Button>
               <Button className="flex-[2] h-14 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-none" onClick={handleDiagnosticSubmit}>
                Activate Neural Engine
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyPlanner;

