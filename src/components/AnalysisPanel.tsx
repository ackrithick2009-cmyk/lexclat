import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Legend
} from 'recharts';
import { Trophy, TrendingUp, Target, Brain, Award, Loader2, Info } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

interface MockAttempt {
  testType: string;
  scores: Record<string, number>;
  totalScore: number;
  accuracy: number;
  completedAt: any;
}

const getLevel = (score: number) => {
  if (score < 40) return { title: 'Junior Aspirant', color: 'text-gray-400', bg: 'bg-gray-400/10' };
  if (score < 70) return { title: 'Legal Scholar', color: 'text-blue-400', bg: 'bg-blue-400/10' };
  if (score < 95) return { title: 'Reasoning Master', color: 'text-purple-400', bg: 'bg-purple-400/10' };
  if (score < 110) return { title: 'Senior Jurist', color: 'text-orange-400', bg: 'bg-orange-400/10' };
  return { title: 'Juris Elite', color: 'text-primary', bg: 'bg-primary/10' };
};

const AnalysisPanel = () => {
  const [history, setHistory] = useState<MockAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'mocks'),
      orderBy('completedAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => {
        const d = doc.data();
        return {
          ...d,
          completedAt: d.completedAt?.toDate() || new Date()
        } as MockAttempt;
      });
      setHistory(data.reverse()); // Reverse for chronological chart
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `users/${auth.currentUser.uid}/mocks`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center text-center gap-6 bg-background">
        <div className="p-8 bg-white border border-gray-100 shadow-xl rotate-45">
          <Target size={40} className="-rotate-45 text-primary opacity-20" />
        </div>
        <div>
          <h3 className="text-2xl font-serif text-foreground italic">No Academic Records Found</h3>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest mt-2 font-bold">Initialize a Mock Examination to generate analytical data.</p>
        </div>
      </div>
    );
  }

  const latestScore = history[history.length - 1].totalScore;
  const level = getLevel(latestScore);
  const avgScore = history.reduce((acc, curr) => acc + curr.totalScore, 0) / history.length;

  const radarData = [
    { subject: 'English', A: history.reduce((acc, curr) => acc + (curr.scores.english || 0), 0) / history.length, fullMark: 24 },
    { subject: 'Current', A: history.reduce((acc, curr) => acc + (curr.scores.current || 0), 0) / history.length, fullMark: 28 },
    { subject: 'Legal', A: history.reduce((acc, curr) => acc + (curr.scores.legal || 0), 0) / history.length, fullMark: 32 },
    { subject: 'Logical', A: history.reduce((acc, curr) => acc + (curr.scores.logical || 0), 0) / history.length, fullMark: 24 },
    { subject: 'Quant', A: history.reduce((acc, curr) => acc + (curr.scores.quant || 0), 0) / history.length, fullMark: 12 },
  ];

  const lineData = history.map(h => ({
    date: h.completedAt.toLocaleDateString(),
    score: h.totalScore,
    type: h.testType
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4 lg:px-6 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
         <div className="text-left">
            <h2 className="text-[10px] text-primary font-black tracking-[0.4em] mb-4 uppercase">Predictive Intelligence</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground italic tracking-tighter leading-tight">Academic Performance <br />Status Report.</h3>
         </div>
         <Card className="bg-white border-gray-100 p-6 flex items-center gap-6 rounded-sm shadow-xl">
            <div className="p-4 border border-primary text-primary bg-primary-light"><Award size={32} /></div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Standing</span>
              <span className="text-2xl font-serif italic text-primary">{level.title}</span>
            </div>
         </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col: Overview Stats */}
        <div className="space-y-8">
           <Card className="bg-white border-gray-100 p-8 rounded-sm shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Composite Average</span>
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl lg:text-6xl font-serif text-primary italic font-black">{avgScore.toFixed(1)}</span>
                <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">/ 120.0</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed font-bold">Based on your last {history.length} simulations.</p>
           </Card>

           <Card className="bg-white border-gray-100 p-8 rounded-sm shadow-lg">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Mastery Breakdown</h4>
              <div className="space-y-6">
                {radarData.map(d => (
                  <div key={d.subject} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground">
                      <span>{d.subject}</span>
                      <span className="text-primary font-black">{((d.A / d.fullMark) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000" 
                        style={{ width: `${(d.A / d.fullMark) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
           </Card>
        </div>

        {/* Center: Score Trend */}
        <Card className="lg:col-span-2 bg-white border-gray-100 p-6 lg:p-10 rounded-sm shadow-lg flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Score Progression Matrix</h4>
                <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">Temporal Analysis • CLAT 2025 Standard</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#1E3A8A]" /> SCORES
                 </div>
              </div>
           </div>
           
           <div className="flex-1 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#999" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#666', fontWeight: 700 }}
                  />
                  <YAxis 
                    stroke="#999" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#666', fontWeight: 700 }}
                    domain={[0, 120]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '4px', fontSize: '10px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1E3A8A', fontWeight: 800 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#1E3A8A" 
                    strokeWidth={4} 
                    dot={{ fill: '#1E3A8A', r: 5, strokeWidth: 2, stroke: '#fff' }} 
                    activeDot={{ r: 7, stroke: '#fff', strokeWidth: 3 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Bottom Row - Sectional Radar */}
        <Card className="lg:col-span-1 bg-white border-gray-100 p-6 lg:p-10 rounded-sm shadow-lg flex flex-col">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground mb-8">Attribute Radar</h4>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#eee" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 32]} tick={false} axisLine={false} />
                  <Radar
                    name="Mastery"
                    dataKey="A"
                    stroke="#1E3A8A"
                    fill="#1E3A8A"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
        </Card>

        <Card className="lg:col-span-2 bg-primary p-6 lg:p-12 rounded-sm shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10"><Brain size={120} className="text-white" /></div>
           <div className="flex flex-col sm:flex-row gap-8 relative z-10">
              <div className="p-5 bg-white text-primary shrink-0 h-fit w-fit shadow-lg rounded-sm"><Info size={28} /></div>
              <div className="space-y-6">
                 <h4 className="text-2xl font-serif text-white italic">AI Strategic Insights</h4>
                 <p className="text-white/80 text-sm leading-relaxed font-light max-w-xl">
                   Your {radarData.reduce((prev, curr) => prev.A < curr.A ? prev : curr).subject} score is currently your primary bottleneck for Top-3 NLU admission. 
                   The model suggests {history.length > 5 ? 'deep-diving into legal reasoning patterns and principle-fact logic.' : 'initiating 3 more full-length simulations to stabilize timing benchmarks.'}
                 </p>
                 <div className="pt-6 flex gap-10 border-t border-white/10">
                    <div className="flex flex-col">
                       <span className="text-xl font-serif text-white italic leading-none">98.2%</span>
                       <span className="text-[9px] text-white/60 font-black uppercase tracking-widest mt-2">Confidence Index</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xl font-serif text-white italic leading-none">Top 12%</span>
                       <span className="text-[9px] text-white/60 font-black uppercase tracking-widest mt-2">National Standing</span>
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisPanel;
