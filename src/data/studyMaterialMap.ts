/**
 * Maps Learning Hub module IDs to wiki study guide paths.
 * Used by StudyMaterials, LearningHub, and RAG indexing.
 */
export interface StudyGuideEntry {
  moduleId: string;
  title: string;
  subject: 'legal' | 'gk' | 'english' | 'logical' | 'quant';
  wikiPath: string;
  layer?: 1 | 2 | 3 | 4;
  estimatedMinutes?: number;
}

export const STUDY_GUIDES = [
  {
    id: 'legal-complete',
    title: 'Legal Reasoning — Complete Study Guide',
    subject: 'Legal Reasoning',
    wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md',
    questions: '28–32',
    topics: ['Law of Torts', 'Contracts', 'Criminal Law (BNS)', 'Constitutional Law', 'Legal Maxims', 'Legal CA'],
  },
  {
    id: 'gk-complete',
    title: 'Current Affairs & GK — Complete Study Guide',
    subject: 'Current Affairs & GK',
    wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md',
    questions: '28–32',
    topics: ['Government Schemes', 'Union Budget', 'International Relations', 'Static GK', 'Science & Awards'],
  },
  {
    id: 'english-complete',
    title: 'English Language — Complete Study Guide',
    subject: 'English Language',
    wikiPath: 'wiki/study_guides/03_English_Language.md',
    questions: '22–26',
    topics: ['Reading Comprehension', 'Vocabulary in Context', 'Idioms', 'Applied Grammar', 'Para-Jumbles'],
  },
  {
    id: 'logical-complete',
    title: 'Logical Reasoning — Complete Study Guide',
    subject: 'Logical Reasoning',
    wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md',
    questions: '22–26',
    topics: ['Critical Reasoning', 'Strengthen/Weaken', 'Assumptions', 'Syllogisms', 'Blood Relations', 'Coding-Decoding'],
  },
  {
    id: 'quant-complete',
    title: 'Quantitative Techniques — Complete Study Guide',
    subject: 'Quantitative Techniques',
    wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md',
    questions: '10–14',
    topics: ['Data Interpretation', 'Percentages', 'Ratios', 'SI/CI', 'Time-Speed-Distance', 'Mensuration'],
  },
] as const;

/** Maps learningModules.ts sub-module IDs to study guide sections */
export const MODULE_TO_GUIDE: Record<string, StudyGuideEntry> = {
  // ===== LEGAL REASONING =====
  // Layer 1 — Foundation
  'lr-l1-1': { moduleId: 'lr-l1-1', title: 'What Is a Legal Principle?', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-2': { moduleId: 'lr-l1-2', title: 'Fact vs. Assumption vs. Conclusion', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-3': { moduleId: 'lr-l1-3', title: 'How CLAT Frames Traps', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-4': { moduleId: 'lr-l1-4', title: 'The Principle–Fact–Decision Structure', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  // Layer 2 — Torts
  'lr-l2-1': { moduleId: 'lr-l2-1', title: 'Negligence: Duty, Breach, Causation, Damages', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 2 },
  'lr-l2-2': { moduleId: 'lr-l2-2', title: 'Defamation: Libel, Slander, Defences', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 2 },
  'lr-l2-3': { moduleId: 'lr-l2-3', title: 'Strict Liability vs. Absolute Liability', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 2 },
  'lr-l2-4': { moduleId: 'lr-l2-4', title: 'Vicarious Liability: Master & Servant', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 2 },
  'lr-l2-5': { moduleId: 'lr-l2-5', title: 'Nuisance: Public & Private', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 2 },
  'lr-l2-6': { moduleId: 'lr-l2-6', title: 'Malicious Prosecution & General Defences', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 2 },
  // Layer 3 — Contracts
  'lr-l3-1': { moduleId: 'lr-l3-1', title: 'Offer & Acceptance: The Building Blocks', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 3 },
  'lr-l3-2': { moduleId: 'lr-l3-2', title: 'Consideration: Privity & Past Consideration', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 3 },
  'lr-l3-3': { moduleId: 'lr-l3-3', title: 'Capacity to Contract & Free Consent', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 3 },
  'lr-l3-4': { moduleId: 'lr-l3-4', title: 'Void, Voidable & Contingent Contracts', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 3 },
  'lr-l3-5': { moduleId: 'lr-l3-5', title: 'Breach of Contract & Remedies', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 3 },
  // Layer 4 — Criminal & Constitutional
  'lr-l4-1': { moduleId: 'lr-l4-1', title: 'Mens Rea & Actus Reus: Elements of Crime', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-2': { moduleId: 'lr-l4-2', title: 'General Exceptions: Private Defence, Insanity, Minor', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-3': { moduleId: 'lr-l4-3', title: 'Murder vs. Culpable Homicide: The Thin Line', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-4': { moduleId: 'lr-l4-4', title: 'Theft, Extortion, Robbery & Cheating', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-5': { moduleId: 'lr-l4-5', title: 'The New Criminal Trilogy: BNS, BNSS, BSA', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-6': { moduleId: 'lr-l4-6', title: 'Constitutional Law: Fundamental Rights (Art. 14-32)', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-7': { moduleId: 'lr-l4-7', title: 'DPSPs, Fundamental Duties & Emergency Provisions', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-8': { moduleId: 'lr-l4-8', title: 'Writs: Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-9': { moduleId: 'lr-l4-9', title: 'Legal Maxims: Res Ipsa Loquitur, Quid Pro Quo, Nemo Dat', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-10': { moduleId: 'lr-l4-10', title: 'Landmark SC Judgments (2024-2026)', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },
  'lr-l4-11': { moduleId: 'lr-l4-11', title: 'Legal Current Affairs: New Bills & International Treaties', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 4 },

  // ===== CURRENT AFFAIRS & GK =====
  // Layer 1 — National News
  'gk-l1-1': { moduleId: 'gk-l1-1', title: 'Major Government Schemes (2024-2026)', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-2': { moduleId: 'gk-l1-2', title: 'Union Budget 2026 & Economic Survey Insights', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-3': { moduleId: 'gk-l1-3', title: 'National Indices & Socio-Economic Initiatives', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-4': { moduleId: 'gk-l1-4', title: 'National Security & Defence Developments', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  // Layer 2 — International Relations
  'gk-l2-1': { moduleId: 'gk-l2-1', title: 'G20, BRICS, SCO: India\'s Multilateral Role', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 2 },
  'gk-l2-2': { moduleId: 'gk-l2-2', title: 'UN, COP, ICJ: International Law & Climate', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 2 },
  'gk-l2-3': { moduleId: 'gk-l2-3', title: 'Bilateral Treaties & Trade Agreements', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 2 },
  'gk-l2-4': { moduleId: 'gk-l2-4', title: 'Global Conflicts & Geopolitical Shifts', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 2 },
  // Layer 3 — Static GK
  'gk-l3-1': { moduleId: 'gk-l3-1', title: 'Polity: Key Constitutional Amendments', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 3 },
  'gk-l3-2': { moduleId: 'gk-l3-2', title: 'History: Modern India & Freedom Struggle', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 3 },
  'gk-l3-3': { moduleId: 'gk-l3-3', title: 'Geography: Rivers, Parks, Climate Zones', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 3 },
  'gk-l3-4': { moduleId: 'gk-l3-4', title: 'Science, Space & AI Developments', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 3 },
  'gk-l3-5': { moduleId: 'gk-l3-5', title: 'Awards, Sports & Intellectual Property', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 3 },
  // Layer 4 — Revision
  'gk-l4-1': { moduleId: 'gk-l4-1', title: 'Weekly CA Revision Test (20 MCQs)', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 4 },
  'gk-l4-2': { moduleId: 'gk-l4-2', title: 'Monthly Mega Quiz (50 MCQs)', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 4 },
  'gk-l4-3': { moduleId: 'gk-l4-3', title: 'Static GK One-Liner Drill (100 Facts)', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 4 },
  'gk-l4-4': { moduleId: 'gk-l4-4', title: 'GK Flashcard Deck: High-Yield Facts', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 4 },

  // ===== ENGLISH LANGUAGE =====
  // Layer 1 — RC Foundation
  'en-l1-1': { moduleId: 'en-l1-1', title: 'Types of Passages: Editorial, Philosophical, Narrative', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-2': { moduleId: 'en-l1-2', title: 'Identifying Main Idea & Central Theme', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-3': { moduleId: 'en-l1-3', title: 'Author\'s Tone, Style & Perspective', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-4': { moduleId: 'en-l1-4', title: 'Fact-Extraction & Structural Summaries', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  // Layer 2 — Inference & Vocabulary
  'en-l2-1': { moduleId: 'en-l2-1', title: 'Inference Questions: Reading Between the Lines', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 2 },
  'en-l2-2': { moduleId: 'en-l2-2', title: 'Vocabulary in Context: Synonyms & Antonyms', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 2 },
  'en-l2-3': { moduleId: 'en-l2-3', title: 'Idioms, Phrases & Proverbial Expressions', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 2 },
  'en-l2-4': { moduleId: 'en-l2-4', title: 'Sentence Meaning & Paraphrase', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 2 },
  // Layer 3 — Grammar
  'en-l3-1': { moduleId: 'en-l3-1', title: 'Subject-Verb Agreement & Tense Consistency', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 3 },
  'en-l3-2': { moduleId: 'en-l3-2', title: 'Modifiers, Parallelism & Prepositions', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 3 },
  'en-l3-3': { moduleId: 'en-l3-3', title: 'Error Spotting & Sentence Correction', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 3 },
  // Layer 4 — Exam Mode
  'en-l4-1': { moduleId: 'en-l4-1', title: 'Skimming Techniques for 450-Word Passages', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 4 },
  'en-l4-2': { moduleId: 'en-l4-2', title: 'Elimination Strategy: Knock Out 2 Wrong Answers First', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 4 },
  'en-l4-3': { moduleId: 'en-l4-3', title: 'CLAT-Style Passage Sets (Timed)', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 4 },

  // ===== LOGICAL REASONING =====
  // Layer 1 — Foundation
  'lg-l1-1': { moduleId: 'lg-l1-1', title: 'Arguments, Premises & Conclusions', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-2': { moduleId: 'lg-l1-2', title: 'Strong vs. Weak Arguments', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-3': { moduleId: 'lg-l1-3', title: 'How to Spot Logical Fallacies', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  // Layer 2 — Critical Reasoning Drills
  'lg-l2-1': { moduleId: 'lg-l2-1', title: 'Assumptions: What the Argument Silently Assumes', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 2 },
  'lg-l2-2': { moduleId: 'lg-l2-2', title: 'Strengthening & Weakening Arguments', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 2 },
  'lg-l2-3': { moduleId: 'lg-l2-3', title: 'Drawing Inferences & Paradoxes', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 2 },
  'lg-l2-4': { moduleId: 'lg-l2-4', title: 'Cause & Effect: Correlation vs. Causation', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 2 },
  'lg-l2-5': { moduleId: 'lg-l2-5', title: 'Logical Flaws & Faulty Reasoning', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 2 },
  // Layer 3 — Passage-Based Sets
  'lg-l3-1': { moduleId: 'lg-l3-1', title: 'Passage-Based Critical Reasoning Sets', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 3 },
  'lg-l3-2': { moduleId: 'lg-l3-2', title: 'Statement–Conclusion & Statement–Assumption Pairs', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 3 },
  // Layer 4 — Analytical Reasoning
  'lg-l4-1': { moduleId: 'lg-l4-1', title: 'Syllogisms: Venn Diagram Technique', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 4 },
  'lg-l4-2': { moduleId: 'lg-l4-2', title: 'Seating Arrangements: Linear & Circular', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 4 },
  'lg-l4-3': { moduleId: 'lg-l4-3', title: 'Blood Relations: Family Tree Logic', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 4 },
  'lg-l4-4': { moduleId: 'lg-l4-4', title: 'Coding-Decoding & Analogies', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 4 },
  'lg-l4-5': { moduleId: 'lg-l4-5', title: 'Full Logical Reasoning Mock (26 Questions)', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 4 },

  // ===== QUANTITATIVE TECHNIQUES =====
  // Layer 1 — Core Arithmetic
  'qt-l1-1': { moduleId: 'qt-l1-1', title: 'Percentages: Increase, Decrease, Profit & Loss', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-2': { moduleId: 'qt-l1-2', title: 'Ratios, Proportions & Partnerships', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-3': { moduleId: 'qt-l1-3', title: 'Averages & Weighted Averages', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-4': { moduleId: 'qt-l1-4', title: 'Mixtures & Alligations', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-5': { moduleId: 'qt-l1-5', title: 'Simple Interest & Compound Interest', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-6': { moduleId: 'qt-l1-6', title: 'Time, Speed & Distance + Time & Work', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-7': { moduleId: 'qt-l1-7', title: 'Basic Mensuration: Areas & Volumes', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  // Layer 2 — Data Interpretation
  'qt-l2-1': { moduleId: 'qt-l2-1', title: 'Table DI: Reading & Calculating from Tables', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 2 },
  'qt-l2-2': { moduleId: 'qt-l2-2', title: 'Bar Graph & Pie Chart DI', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 2 },
  'qt-l2-3': { moduleId: 'qt-l2-3', title: 'Line Graph DI: Trends & Rate of Change', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 2 },
  'qt-l2-4': { moduleId: 'qt-l2-4', title: 'Caselet DI: Text-Based Numerical Data', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 2 },
  // Layer 3 — Approximation & Speed
  'qt-l3-1': { moduleId: 'qt-l3-1', title: 'Approximation Tricks for DI', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 3 },
  'qt-l3-2': { moduleId: 'qt-l3-2', title: 'Percentage Shortcut Grid & Fraction Equivalents', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 3 },
  'qt-l3-3': { moduleId: 'qt-l3-3', title: 'Multi-Layered Table DI (Advanced)', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 3 },
  // Layer 4 — Full Simulation
  'qt-l4-1': { moduleId: 'qt-l4-1', title: 'CLAT Quant Full Sets (14 Questions, 15 Mins)', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 4 },
};

export function getStudyGuideForSubject(subjectId: 'legal' | 'gk' | 'english' | 'logical' | 'quant'): string {
  const map: Record<string, string> = {
    legal: 'wiki/study_guides/01_Legal_Reasoning.md',
    gk: 'wiki/study_guides/02_Current_Affairs_GK.md',
    english: 'wiki/study_guides/03_English_Language.md',
    logical: 'wiki/study_guides/04_Logical_Reasoning.md',
    quant: 'wiki/study_guides/05_Quantitative_Techniques.md',
  };
  return map[subjectId] ?? '';
}
