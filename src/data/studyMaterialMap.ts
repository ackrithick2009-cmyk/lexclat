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
  // Legal Reasoning — Layer 1
  'lr-l1-1': { moduleId: 'lr-l1-1', title: 'Negligence & Defamation', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-2': { moduleId: 'lr-l1-2', title: 'Strict vs Absolute Liability', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-3': { moduleId: 'lr-l1-3', title: 'Nuisance & Malicious Prosecution', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-4': { moduleId: 'lr-l1-4', title: 'General Defenses in Tort', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-5': { moduleId: 'lr-l1-5', title: 'Offer, Acceptance & Consideration', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-6': { moduleId: 'lr-l1-6', title: 'Capacity, Consent & Void Agreements', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-7': { moduleId: 'lr-l1-7', title: 'Mens Rea & Actus Reus', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-8': { moduleId: 'lr-l1-8', title: 'Fundamental Rights', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  'lr-l1-9': { moduleId: 'lr-l1-9', title: 'Legal Maxims', subject: 'legal', wikiPath: 'wiki/study_guides/01_Legal_Reasoning.md', layer: 1 },
  // GK — Layer 1
  'gk-l1-1': { moduleId: 'gk-l1-1', title: 'Government Schemes', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-2': { moduleId: 'gk-l1-2', title: 'Union Budget & Economic Survey', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-3': { moduleId: 'gk-l1-3', title: 'International Relations', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-4': { moduleId: 'gk-l1-4', title: 'Polity & Amendments', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-5': { moduleId: 'gk-l1-5', title: 'Modern Indian History', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  'gk-l1-6': { moduleId: 'gk-l1-6', title: 'Geography Essentials', subject: 'gk', wikiPath: 'wiki/study_guides/02_Current_Affairs_GK.md', layer: 1 },
  // English — Layer 1
  'en-l1-1': { moduleId: 'en-l1-1', title: 'Main Idea & Fact-Extraction', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-2': { moduleId: 'en-l1-2', title: 'Tone & Perspective', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-3': { moduleId: 'en-l1-3', title: 'Contextual Vocabulary', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-4': { moduleId: 'en-l1-4', title: 'Subject-Verb Agreement & Tenses', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  'en-l1-5': { moduleId: 'en-l1-5', title: 'Modifiers & Parallelism', subject: 'english', wikiPath: 'wiki/study_guides/03_English_Language.md', layer: 1 },
  // Logical — Layer 1
  'lg-l1-1': { moduleId: 'lg-l1-1', title: 'Arguments & Conclusions', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-2': { moduleId: 'lg-l1-2', title: 'Strengthen/Weaken & Assumptions', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-3': { moduleId: 'lg-l1-3', title: 'Flaws & Paradoxes', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-4': { moduleId: 'lg-l1-4', title: 'Cause & Effect', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-5': { moduleId: 'lg-l1-5', title: 'Syllogisms & Analogies', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  'lg-l1-6': { moduleId: 'lg-l1-6', title: 'Seating & Blood Relations', subject: 'logical', wikiPath: 'wiki/study_guides/04_Logical_Reasoning.md', layer: 1 },
  // Quant — Layer 1
  'qt-l1-1': { moduleId: 'qt-l1-1', title: 'Percentages & P&L', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-2': { moduleId: 'qt-l1-2', title: 'Ratios & Averages', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-3': { moduleId: 'qt-l1-3', title: 'SI/CI & Mixtures', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-4': { moduleId: 'qt-l1-4', title: 'Time-Speed-Distance & Work', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
  'qt-l1-5': { moduleId: 'qt-l1-5', title: 'Basic Mensuration', subject: 'quant', wikiPath: 'wiki/study_guides/05_Quantitative_Techniques.md', layer: 1 },
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
