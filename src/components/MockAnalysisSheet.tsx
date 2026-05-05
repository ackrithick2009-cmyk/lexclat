import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, AlertTriangle, BookOpen, Clock, BrainCircuit } from 'lucide-react';

const data = [
  { name: 'Silly Mistakes', value: 15, color: '#FFBB28' },
  { name: 'Concept Gap', value: 35, color: '#FF8042' },
  { name: 'Time Pressure', value: 30, color: '#0088FE' },
  { name: 'Logic Error', value: 20, color: '#00C49F' },
];

const mockStats = {
  score: 84.25,
  targetScore: 108.5, // NLSIU cutoff
  percentile: 92,
  dreamNLU: 'NLSIU Bengaluru',
  stateDomicile: 'Karnataka (General)',
  sections: [
    { name: 'Legal Reasoning', score: 21.5, max: 28, required: 26 },
    { name: 'Current Affairs', score: 18.25, max: 25, required: 22 },
    { name: 'English Language', score: 19.5, max: 22, required: 20 },
    { name: 'Logical Reasoning', score: 18.0, max: 22, required: 20 },
    { name: 'Quantitative', score: 7.0, max: 8, required: 7.5 },
  ]
};

const MockAnalysisDashboard = () => {
  return (
    <div className="p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 text-slate-100 max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-indigo-400" />
            Mock #14 Performance Diagnostic
          </h2>
          <p className="text-slate-400 mt-1">Full-Length LexCLAT Pro Mock | May 2026</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Score</p>
            <p className="text-2xl font-black text-emerald-400">{mockStats.score} <span className="text-sm text-slate-500 font-normal">/ 120</span></p>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Percentile</p>
            <p className="text-2xl font-black text-blue-400">{mockStats.percentile}th</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Error Types Chart */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Error Typology Analysis
          </h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={data} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={90} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scholar Agent Feedback */}
        <div className="space-y-4">
          <div className="bg-indigo-900/30 border border-indigo-800/50 p-5 rounded-xl">
            <h3 className="text-indigo-400 font-bold flex items-center gap-2">
              <BrainCircuit className="w-5 h-5" />
              Scholar Agent Deep Diagnostic
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed text-sm">
              "You lost <span className="text-orange-400 font-bold">35%</span> of your marks due to <b>Concept Gaps</b> in Constitutional Law and Legal Reasoning. Specifically, 3 of your errors were rooted in the <b>2026 Union Budget</b> provisions."
            </p>
            <div className="mt-4 flex items-center gap-3 bg-indigo-950/50 p-3 rounded-lg border border-indigo-900">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <p className="text-sm text-indigo-200">
                Action: Added <span className="font-semibold text-white">'Article 112: Budgetary Procedures'</span> to your study plan for tomorrow.
              </p>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-800/50 p-5 rounded-xl">
             <h3 className="text-blue-400 font-bold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Adaptive Feedback: Time Management
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed text-sm">
              "You left 12 questions unattempted due to <span className="text-blue-400 font-bold">Time Pressure</span> in the Logical Reasoning section."
            </p>
            <div className="mt-4 flex items-center gap-3 bg-blue-950/50 p-3 rounded-lg border border-blue-900">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-blue-200">
                Action: Scheduled <span className="font-semibold text-white">3 days of Speed Reading Drills</span> using the Million-Page Scholar archives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gap Analysis Section */}
      <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" />
              Gap Analysis: The Path to Target
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Dream NLU: <strong className="text-white">{mockStats.dreamNLU}</strong> | 
              Target: <strong className="text-white">{mockStats.targetScore}</strong> | 
              Domicile: <strong className="text-white">{mockStats.stateDomicile}</strong>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Gap to Target</p>
            <p className="text-2xl font-black text-rose-400">{(mockStats.targetScore - mockStats.score).toFixed(2)} Marks</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockStats.sections.map((sec, idx) => (
            <div key={idx} className="relative">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-300">{sec.name}</span>
                <span className="text-slate-400">
                  <span className={sec.score >= sec.required ? "text-emerald-400" : "text-amber-400"}>{sec.score}</span> 
                  {' '}/ {sec.max} <span className="text-xs text-slate-500">(Target: {sec.required})</span>
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full ${sec.score >= sec.required ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  style={{ width: `${(sec.score / sec.max) * 100}%` }}
                ></div>
                {sec.required > sec.score && (
                  <div 
                    className="h-full bg-amber-500/30 border-r-2 border-amber-500"
                    style={{ width: `${((sec.required - sec.score) / sec.max) * 100}%` }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockAnalysisDashboard;
