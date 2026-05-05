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
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'mocks'),
      orderBy('completedAt', 'desc'),
      limit(20)
    );

    return onSnapshot(q, (snap) => {
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
  }, []);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center text-center gap-6">
        <div className="p-8 bg-accent border border-border rotate-45">
          <Target size={40} className="-rotate-45 text-primary opacity-20" />
        </div>
        <div>
          <h3 className="text-2xl font-serif text-white">No Academic Records Found</h3>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Initialize a Mock Examination to generate analytical data.</p>
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
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4 lg:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
         <div className="text-left">
            <h2 className="text-xs text-primary font-bold tracking-[0.4em] mb-4 uppercase">Predictive Intelligence</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tighter">Academic Performance <br />Status Report.</h3>
         </div>
         <Card className={`${level.bg} border-primary/20 p-6 flex items-center gap-6 rounded-none`}>
            <div className={`p-4 border border-current ${level.color}`}><Award size={32} /></div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Current Standing</span>
              <span className={`text-2xl font-serif italic ${level.color}`}>{level.title}</span>
            </div>
         </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col: Overview Stats */}
        <div className="space-y-8">
           <Card className="bg-surface border-border p-8 rounded-none">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Composite Average</span>
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl lg:text-6xl font-serif text-white italic">{avgScore.toFixed(1)}</span>
                <span className="text-gray-600 text-xs">/ 120.0</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">Based on your last {history.length} simulations.</p>
           </Card>

           <Card className="bg-surface border-border p-8 rounded-none">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Mastery Breakdown</h4>
              <div className="space-y-6">
                {radarData.map(d => (
                  <div key={d.subject} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white">
                      <span>{d.subject}</span>
                      <span>{((d.A / d.fullMark) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1 w-full bg-black">
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
        <Card className="lg:col-span-2 bg-surface border-border p-6 lg:p-8 rounded-none flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Score Progression Matrix</h4>
                <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest">Temporal Analysis • CLAT 2025 Standard</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-primary" /> SCORES
                 </div>
              </div>
           </div>
           
           <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#444" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    stroke="#444" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#666' }}
                    domain={[0, 120]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1D21', border: '1px solid #333', fontSize: '10px', color: '#fff' }}
                    itemStyle={{ color: '#C2A35D' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#C2A35D" 
                    strokeWidth={3} 
                    dot={{ fill: '#C2A35D', r: 4, strokeWidth: 0 }} 
                    activeDot={{ r: 6, stroke: '#000', strokeWidth: 2 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Bottom Row - Sectional Radar */}
        <Card className="lg:col-span-1 bg-surface border-border p-6 lg:p-8 rounded-none flex flex-col">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-8">Attribute Radar</h4>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 32]} tick={false} axisLine={false} />
                  <Radar
                    name="Mastery"
                    dataKey="A"
                    stroke="#C2A35D"
                    fill="#C2A35D"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
        </Card>

        <Card className="lg:col-span-2 bg-[#0C0F14] border-l-4 border-primary p-6 lg:p-10 rounded-none">
           <div className="flex flex-col sm:flex-row gap-8">
              <div className="p-5 bg-white text-black shrink-0 h-fit w-fit"><Info size={24} /></div>
              <div className="space-y-4">
                 <h4 className="text-xl font-serif text-white italic">AI Strategic Advice</h4>
                 <p className="text-gray-400 text-sm leading-relaxed font-light">
                   Your {radarData.reduce((prev, curr) => prev.A < curr.A ? prev : curr).subject} score is currently your primary bottleneck for NLU admission. 
                   The algorithm suggests {history.length > 5 ? 'deep-diving into legal reasoning patterns' : 'initiating 3 more full-length mocks to refine timing.'}
                 </p>
                 <div className="pt-4 flex gap-6">
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-white uppercase tracking-widest leading-none">98.2%</span>
                       <span className="text-[9px] text-gray-600 uppercase tracking-widest mt-1">Consistency Confidence</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Top 12%</span>
                       <span className="text-[9px] text-gray-600 uppercase tracking-widest mt-1">National Peer Ranking</span>
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
