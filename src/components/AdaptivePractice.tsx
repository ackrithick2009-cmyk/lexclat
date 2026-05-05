import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { generatePracticeQuestion } from '@/src/services/geminiService';
import { ChevronRight, Brain, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Question {
  passage: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const AdaptivePractice = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Legal Reasoning');
  const [stats, setStats] = useState({ correct: 0, total: 0, difficulty: 'medium' as 'easy' | 'medium' | 'hard' });

  const subjects = [
    'English Language',
    'Current Affairs & GK',
    'Legal Reasoning',
    'Logical Reasoning',
    'Quantitative Techniques'
  ];

  const loadQuestion = async (subjectOverride?: string) => {
    setLoading(true);
    setSelectedOption(null);
    setShowExplanation(false);
    try {
      const q = await generatePracticeQuestion(subjectOverride || selectedSubject, stats.difficulty);
      setQuestion(q);
    } catch (err) {
      toast.error("Failed to generate question. Retrying...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleAnswer = () => {
    if (selectedOption === null) return;
    setShowExplanation(true);
    
    const isCorrect = selectedOption === question?.correctIndex;
    setStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      // Simple adaptive logic
      difficulty: isCorrect 
        ? (prev.difficulty === 'easy' ? 'medium' : prev.difficulty === 'medium' ? 'hard' : 'hard')
        : (prev.difficulty === 'hard' ? 'medium' : prev.difficulty === 'medium' ? 'easy' : 'easy')
    }));
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    loadQuestion(subject);
  };

  if (loading && !question) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[200px] w-full rounded-none" />
        <Skeleton className="h-[100px] w-full rounded-none" />
        <div className="space-y-2">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-12 w-full rounded-none" />)}
        </div>
      </div>
    );
  }

  return (
    <div id="practice-module" className="max-w-4xl mx-auto space-y-8 pb-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-serif text-white italic">Adaptive Practice</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Calibrating to your logic patterns</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(sub => (
            <button
              key={sub}
              onClick={() => handleSubjectChange(sub)}
              className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-2 sm:px-3 py-1.5 border transition-all ${selectedSubject === sub ? 'bg-primary text-black border-primary' : 'text-gray-500 border-border hover:border-primary/50'}`}
            >
              {sub}
            </button>
          ))}
        </div>
        <div className="text-right">
          <div className="text-primary text-2xl font-serif">{stats.correct}/{stats.total}</div>
          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Accuracy Rating</div>
        </div>
      </div>

      <Progress value={(stats.correct / (stats.total || 1)) * 100} className="h-1 bg-accent" />

      <AnimatePresence mode="wait">
        {question && (
          <motion.div
            key={question.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="bg-surface border-border rounded-none p-6 md:p-8">
              <div className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mb-4">{selectedSubject} • {question.difficulty}</div>
              <p className="text-gray-400 text-sm leading-relaxed font-serif italic mb-8 border-l-2 border-primary/20 pl-6">
                {question.passage}
              </p>
              
              <div className="space-y-6">
                <h3 className="text-xl text-white font-serif">{question.question}</h3>
                
                <RadioGroup value={selectedOption?.toString()} onValueChange={(v) => setSelectedOption(parseInt(v))}>
                  <div className="space-y-3">
                    {question.options.map((opt, i) => (
                      <div key={i} className={`flex items-center space-x-3 p-4 border ${selectedOption === i ? 'border-primary bg-primary/5' : 'border-border bg-accent/30'} hover:border-primary/50 transition-all cursor-pointer`} onClick={() => !showExplanation && setSelectedOption(i)}>
                        <RadioGroupItem value={i.toString()} id={`opt-${i}`} className="border-primary text-primary" disabled={showExplanation} />
                        <Label htmlFor={`opt-${i}`} className="text-gray-300 font-sans cursor-pointer flex-1">{opt}</Label>
                        {showExplanation && i === question.correctIndex && <CheckCircle2 className="text-green-500" size={18} />}
                        {showExplanation && selectedOption === i && i !== question.correctIndex && <XCircle className="text-red-500" size={18} />}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-8 flex justify-between items-center">
                {!showExplanation ? (
                  <Button 
                    className="bg-primary text-black font-black uppercase tracking-widest text-xs h-12 px-8 rounded-none ml-auto"
                    onClick={handleAnswer}
                    disabled={selectedOption === null}
                  >
                    Validate Logic
                  </Button>
                ) : (
                  <div className="w-full space-y-6">
                    <div className="p-6 bg-accent border-l-2 border-primary">
                      <h4 className="text-xs text-primary font-black uppercase tracking-widest mb-2">Ratio Decidendi</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{question.explanation}</p>
                    </div>
                    <Button 
                      className="bg-white text-black font-black uppercase tracking-widest text-xs h-12 px-8 rounded-none ml-auto flex gap-2"
                      onClick={() => loadQuestion()}
                    >
                      Next Module <ChevronRight size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdaptivePractice;
