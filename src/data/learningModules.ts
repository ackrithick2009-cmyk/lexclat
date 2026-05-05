export interface SubModule {
  id: string;
  title: string;
  layer: 1 | 2 | 3 | 4;
  type: 'lesson' | 'drill' | 'passage_set' | 'mock';
  estimatedMinutes: number;
  description: string;
  completed?: boolean;
}

export interface SubjectModule {
  id: 'english' | 'legal' | 'quant' | 'logical' | 'gk';
  title: string;
  emoji: string;
  color: string;
  accentColor: string;
  tagline: string;
  modules: SubModule[];
}

export const SUBJECT_MODULES: SubjectModule[] = [
  {
    id: 'english',
    title: 'English',
    emoji: '📖',
    color: '#3B82F6',
    accentColor: 'rgba(59,130,246,0.15)',
    tagline: 'Reading Comprehension & Vocabulary',
    modules: [
      // Layer 1 – Foundation
      { id: 'en-l1-1', title: 'Types of Passages', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Narrative, Opinion/Editorial, Philosophical — learn to identify each type instantly.' },
      { id: 'en-l1-2', title: 'Identifying Main Idea', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'The #1 skill in RC. Learn to separate the central argument from supporting details.' },
      { id: 'en-l1-3', title: 'Tone Detection', layer: 1, type: 'lesson', estimatedMinutes: 10, description: 'Sarcastic, neutral, critical, appreciative — master the author\'s emotional register.' },
      { id: 'en-l1-4', title: 'Author\'s Intent', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Why did the author write this? Learn to decode purpose behind every passage.' },
      // Layer 2 – Skill Building
      { id: 'en-l2-1', title: 'Inference Questions', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'What can be concluded but is NOT stated directly? Master this trap-heavy question type.' },
      { id: 'en-l2-2', title: 'Vocabulary in Context', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'CLAT doesn\'t test dictionary meanings — it tests contextual usage. Crack the pattern.' },
      { id: 'en-l2-3', title: 'Sentence Meaning', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Paraphrase-type questions. Find the option that means exactly what the sentence says.' },
      { id: 'en-l2-4', title: 'Para-Jumbles', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'Rearranging sentences into a coherent paragraph. Logic + flow = marks.' },
      // Layer 3 – Application
      { id: 'en-l3-1', title: 'Easy Passage Sets', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: '3 passages with 5 questions each. Build confidence before going harder.' },
      { id: 'en-l3-2', title: 'Medium Passage Sets', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Editorial-style passages with inference + vocabulary combo questions.' },
      { id: 'en-l3-3', title: 'Hard Passage Sets (Timed)', layer: 3, type: 'passage_set', estimatedMinutes: 30, description: 'Philosophical passages under 8-minute timer. CLAT-level difficulty.' },
      // Layer 4 – Exam Mode
      { id: 'en-l4-1', title: 'Skimming Techniques', layer: 4, type: 'lesson', estimatedMinutes: 10, description: 'How to read 400 words in 90 seconds without missing anything important.' },
      { id: 'en-l4-2', title: 'Elimination Strategy', layer: 4, type: 'lesson', estimatedMinutes: 12, description: 'Knock out 2 wrong answers first. Your accuracy will jump 15%.' },
      { id: 'en-l4-3', title: 'Speed Accuracy Drill', layer: 4, type: 'mock', estimatedMinutes: 20, description: '5 passages in 30 minutes. Benchmark your speed.' },
    ]
  },
  {
    id: 'legal',
    title: 'Legal Reasoning',
    emoji: '⚖️',
    color: '#C2A35D',
    accentColor: 'rgba(194,163,93,0.15)',
    tagline: 'Your Core USP — Master the Principle Game',
    modules: [
      // Layer 1
      { id: 'lr-l1-1', title: 'What Is a "Principle"?', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The foundation of all legal reasoning questions. Understand how CLAT defines and tests legal principles.' },
      { id: 'lr-l1-2', title: 'Fact vs Assumption', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'This distinction determines half your marks. Master it cold.' },
      { id: 'lr-l1-3', title: 'How CLAT Frames Traps', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'The 5 most common trap types in legal reasoning. Learn them, never fall for them.' },
      // Layer 2
      { id: 'lr-l2-1', title: 'Direct Application', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Apply the principle straight to the facts. The "easy" mode. Don\'t lose marks here.' },
      { id: 'lr-l2-2', title: 'Twisted Principles', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Principle seems to say one thing but leads somewhere unexpected. High-yield.' },
      { id: 'lr-l2-3', title: 'Multiple Principle Questions', layer: 2, type: 'drill', estimatedMinutes: 30, description: '2-3 principles in one question. Sequence your application logically.' },
      // Layer 3 – Legal Topics
      { id: 'lr-l3-1', title: 'Constitutional Law (FR & DPSP)', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Fundamental Rights, Directive Principles — tested every year in CLAT.' },
      { id: 'lr-l3-2', title: 'Law of Torts', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Negligence, Defamation, Nuisance — the most tested area in legal reasoning.' },
      { id: 'lr-l3-3', title: 'Criminal Law Basics', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Mens rea, actus reus, culpability under BNS. Post-2024 updates included.' },
      { id: 'lr-l3-4', title: 'Contract Law Basics', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Offer, acceptance, consideration, void agreements. Core to legal reasoning passages.' },
      { id: 'lr-l3-5', title: 'Long Case-Based Sets', layer: 3, type: 'passage_set', estimatedMinutes: 35, description: 'Full case simulations. Read a 300-word scenario, apply 3 principles.' },
      // Layer 4
      { id: 'lr-l4-1', title: 'Exception-Based Questions', layer: 4, type: 'drill', estimatedMinutes: 20, description: 'The principle applies EXCEPT when... These are the hardest legal Qs.' },
      { id: 'lr-l4-2', title: 'Closest Answer Logic', layer: 4, type: 'lesson', estimatedMinutes: 15, description: 'When 2 options both seem correct — the strategy to pick the "closer" one.' },
    ]
  },
  {
    id: 'gk',
    title: 'Current Affairs & GK',
    emoji: '🌍',
    color: '#10B981',
    accentColor: 'rgba(16,185,129,0.15)',
    tagline: '~25 Marks — Never Leave Them on the Table',
    modules: [
      // Layer 1
      { id: 'gk-l1-1', title: 'June 2025 CA', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'Key events, appointments, legislation from June 2025.' },
      { id: 'gk-l1-2', title: 'July 2025 CA', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'Summits, verdicts, schemes — July edition.' },
      { id: 'gk-l1-3', title: 'Aug–Dec 2025 CA', layer: 1, type: 'lesson', estimatedMinutes: 30, description: 'Second-half 2025 consolidated. Heavy prep phase.' },
      { id: 'gk-l1-4', title: 'Jan–May 2026 CA', layer: 1, type: 'lesson', estimatedMinutes: 30, description: 'Most recent and highest-probability questions.' },
      // Layer 2 – Topic-wise
      { id: 'gk-l2-1', title: 'Polity & Governance', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'SC judgments, constitutional amendments, government schemes.' },
      { id: 'gk-l2-2', title: 'Economy', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'Budget 2026, RBI policies, GDP, economic indicators.' },
      { id: 'gk-l2-3', title: 'International Relations', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'India\'s bilateral deals, UN developments, treaties.' },
      { id: 'gk-l2-4', title: 'Science & Tech', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Space missions, AI policy, defence tech, health breakthroughs.' },
      { id: 'gk-l2-5', title: 'Environment', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'COP summits, wildlife protection, climate agreements.' },
      // Layer 3 – Static GK
      { id: 'gk-l3-1', title: 'Constitution Basics', layer: 3, type: 'lesson', estimatedMinutes: 20, description: 'Preamble, FRs, DPSPs, constitutional bodies — the static base.' },
      { id: 'gk-l3-2', title: 'Geography Essentials', layer: 3, type: 'lesson', estimatedMinutes: 15, description: 'States, rivers, national parks, borders — tested indirectly through CA.' },
      { id: 'gk-l3-3', title: 'Important Institutions', layer: 3, type: 'lesson', estimatedMinutes: 12, description: 'RBI, SEBI, NHRC, CIC, CAG — their roles and recent developments.' },
      // Layer 4 – Revision
      { id: 'gk-l4-1', title: 'Weekly Revision Test', layer: 4, type: 'mock', estimatedMinutes: 20, description: '20 MCQs, all from the past 7 days of CA. Take every Sunday.' },
      { id: 'gk-l4-2', title: 'Monthly Mega Quiz', layer: 4, type: 'mock', estimatedMinutes: 35, description: '50 MCQs spanning the full month. Track your CA retention score.' },
      { id: 'gk-l4-3', title: 'Rapid Revision: One-Liners', layer: 4, type: 'lesson', estimatedMinutes: 10, description: '100 one-liners covering the most testable facts. Revise in 10 min.' },
      { id: 'gk-l4-4', title: 'GK Flashcard Deck', layer: 4, type: 'drill', estimatedMinutes: 15, description: 'Flip-card revision. Appointments, awards, summits, indices.' },
    ]
  },
  {
    id: 'quant',
    title: 'Quantitative Techniques',
    emoji: '📊',
    color: '#8B5CF6',
    accentColor: 'rgba(139,92,246,0.15)',
    tagline: 'Data Interpretation is 80% of Quant — Own It',
    modules: [
      // Layer 1
      { id: 'qt-l1-1', title: 'Percentages', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The DNA of all DI. Master percent calculations without a pen.' },
      { id: 'qt-l1-2', title: 'Ratio & Proportion', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Comparing quantities — used in every single DI question.' },
      { id: 'qt-l1-3', title: 'Averages', layer: 1, type: 'lesson', estimatedMinutes: 10, description: 'Weighted average, mean — quick formula and pattern recognition.' },
      // Layer 2
      { id: 'qt-l2-1', title: 'Profit & Loss', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'CP, SP, profit%, discount — standard arithmetic with CLAT passage context.' },
      { id: 'qt-l2-2', title: 'Simple & Compound Interest', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'Formula-based but fast. Crack in under 90 seconds each.' },
      { id: 'qt-l2-3', title: 'Time & Work', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Efficiency, combined work rate — another CLAT staple.' },
      { id: 'qt-l2-4', title: 'Speed, Distance & Time', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Relative speed, average speed — often embedded in DI passages.' },
      // Layer 3 – DI (Most Important)
      { id: 'qt-l3-1', title: 'Table DI', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Read a data table, answer 5 questions in 6 minutes. The most common DI format.' },
      { id: 'qt-l3-2', title: 'Bar Graph DI', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Visual-to-calculation conversion. Fast reading = fast marks.' },
      { id: 'qt-l3-3', title: 'Pie Chart DI', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Percentage-based reading. The trick: convert to actual numbers first.' },
      // Layer 4 – Shortcuts
      { id: 'qt-l4-1', title: 'Approximation Tricks', layer: 4, type: 'lesson', estimatedMinutes: 12, description: 'Avoid exact calculation. Round smartly, pick the closest option.' },
      { id: 'qt-l4-2', title: 'Percentage Shortcut Grid', layer: 4, type: 'lesson', estimatedMinutes: 10, description: '10%, 25%, 33%, 50%... learn fractional equivalents by heart.' },
      { id: 'qt-l4-3', title: 'CLAT DI Full Sets', layer: 4, type: 'mock', estimatedMinutes: 30, description: '3 mixed DI passages (table + bar + pie). Full CLAT simulation.' },
    ]
  },
  {
    id: 'logical',
    title: 'Logical Reasoning',
    emoji: '🧩',
    color: '#EF4444',
    accentColor: 'rgba(239,68,68,0.15)',
    tagline: 'Argument Analysis — Where Smart Students Win',
    modules: [
      // Layer 1
      { id: 'lg-l1-1', title: 'Statements & Arguments', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The atomic unit of logical reasoning. What makes an argument valid?' },
      { id: 'lg-l1-2', title: 'Premise vs Conclusion', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Identify what\'s being claimed vs what\'s supporting it. Critical foundation.' },
      // Layer 2
      { id: 'lg-l2-1', title: 'Assumptions', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'What does the argument SILENTLY assume? The #1 tested question type.' },
      { id: 'lg-l2-2', title: 'Inference Questions', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'What MUST follow from the given information? Strict logical consequence.' },
      { id: 'lg-l2-3', title: 'Strengthen / Weaken', layer: 2, type: 'drill', estimatedMinutes: 22, description: 'Which option makes the argument stronger or more vulnerable? Highly logical.' },
      { id: 'lg-l2-4', title: 'Cause & Effect', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Does A cause B, or just correlate with it? CLAT loves this distinction.' },
      // Layer 3
      { id: 'lg-l3-1', title: 'Passage-Based Reasoning Sets', layer: 3, type: 'passage_set', estimatedMinutes: 30, description: 'Long 250-word passages followed by 5 logic Qs. New CLAT format since 2020.' },
      // Layer 4
      { id: 'lg-l4-1', title: 'Analogies', layer: 4, type: 'drill', estimatedMinutes: 15, description: 'A:B :: C:? — find the relationship, apply it consistently.' },
      { id: 'lg-l4-2', title: 'Statement–Conclusion Pairs', layer: 4, type: 'drill', estimatedMinutes: 15, description: 'Does the conclusion DEFINITELY follow? Train your strict logical lens.' },
      { id: 'lg-l4-3', title: 'Syllogisms (Basic)', layer: 4, type: 'drill', estimatedMinutes: 12, description: 'All A are B. Some B are C. What follows? Venn diagram technique.' },
    ]
  }
];

export const DAY_PLAN = Array.from({ length: 90 }, (_, i) => {
  const day = i + 1;
  const patterns = [
    { theme: 'English + Legal', subjects: ['english', 'legal'], practiceType: 'Passage Drill' },
    { theme: 'Quant + GK', subjects: ['quant', 'gk'], practiceType: 'DI + CA Quiz' },
    { theme: 'Logical + English', subjects: ['logical', 'english'], practiceType: 'Argument Analysis' },
    { theme: 'Legal + GK', subjects: ['legal', 'gk'], practiceType: 'Legal CA Crossover' },
    { theme: 'Mixed Test', subjects: ['english', 'logical', 'quant'], practiceType: 'Mini Mock (30 Qs)' },
  ];
  const pattern = patterns[(day - 1) % patterns.length];
  return { day, ...pattern };
});
