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
    id: 'legal',
    title: 'Legal Reasoning',
    emoji: '⚖️',
    color: '#C2A35D',
    accentColor: 'rgba(194,163,93,0.15)',
    tagline: 'Your Core USP — Master the Principle Game (28–32 questions)',
    modules: [
      // Layer 1 – Foundation
      { id: 'lr-l1-1', title: 'Law of Torts: Negligence & Defamation', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Elements of negligence, contributory negligence, defamation (libel vs slander), and defences.' },
      { id: 'lr-l1-2', title: 'Strict vs Absolute Liability & Vicarious Liability', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Rylands v Fletcher, M.C. Mehta, and master-servant liability under tort law.' },
      { id: 'lr-l1-3', title: 'Nuisance & Malicious Prosecution', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Public vs private nuisance, essentials of malicious prosecution, and remedies.' },
      { id: 'lr-l1-4', title: 'General Defenses in Tort', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Volenti non fit injuria, Act of God, Inevitable accident, Plaintiff’s wrong, and Statutory authority.' },
      { id: 'lr-l1-5', title: 'Contracts: Offer, Acceptance & Consideration', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Valid offer, acceptance rules, communication of offer/revocation, and lawful consideration under Indian Contract Act.' },
      { id: 'lr-l1-6', title: 'Contracts: Capacity, Free Consent & Void Agreements', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Minor’s agreement, coercion, undue influence, fraud, misrepresentation, and void vs voidable contracts.' },
      { id: 'lr-l1-7', title: 'Criminal Law: Mens Rea & Actus Reus', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Elements of crime, guilty mind, wrongful act, joint liability, and attempt under BNS.' },
      { id: 'lr-l1-8', title: 'Constitutional Law: Preamble & Fundamental Rights (Arts 14–32)', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'Basic structure, preamble as key to interpretation, and overview of Fundamental Rights.' },
      { id: 'lr-l1-9', title: 'Legal Maxims Foundation', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Res Ipsa Loquitur, Quid Pro Quo, Audi Alteram Partem, Nemo Debet, and Ubi Jus Ibi Remedium.' },
      // Layer 2 – Skill Building
      { id: 'lr-l2-1', title: 'Torts Application Drill: 30 questions / 30 min', layer: 2, type: 'drill', estimatedMinutes: 30, description: 'Apply negligence, defamation, liability, and nuisance principles to fact-based scenarios.' },
      { id: 'lr-l2-2', title: 'Contracts: Breach & Remedies Drill', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Damages, specific performance, injunction, and anticipatory breach under Contract Law.' },
      { id: 'lr-l2-3', title: 'Criminal Law: General Exceptions', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Private Defence, Insanity, Minor, and Intoxication under BNS. 20 questions / 20 minutes.' },
      { id: 'lr-l2-4', title: 'Murder vs Culpable Homicide, Theft & Extortion', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Distinction under BNS, essentials of theft, extortion, robbery, and dacoity.' },
      { id: 'lr-l2-5', title: 'Constitutional Law: DPSPs, Duties, Writs & Emergency', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Articles 36–51, Fundamental Duties, five writs, and Emergency Provisions under Constitution.' },
      { id: 'lr-l2-6', title: 'BNS Transformations & New Criminal Law', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Key changes from IPC to BNS: new offences, renumbering, and updated sections tested in CLAT.' },
      { id: 'lr-l2-7', title: 'President, Governor & Judiciary Structure', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'Appointment, powers, and constitutional position of President, Governor, Supreme Court, and High Courts.' },
      // Layer 3 – Application
      { id: 'lr-l3-1', title: 'Torts Case-Based Passage Set: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Long scenario on negligence, strict liability, or defamation followed by 5 principle-application questions.' },
      { id: 'lr-l3-2', title: 'Contracts Case-Based Passage Set: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Contract formation or breach scenario with 5 questions on offer, acceptance, consideration, and remedies.' },
      { id: 'lr-l3-3', title: 'Criminal Law Case-Based Passage Set: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Crime scenario under BNS with 5 questions on mens rea, exceptions, and offence classification.' },
      { id: 'lr-l3-4', title: 'Constitutional Law Case-Based Passage Set: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'FR/DPSP/writs scenario with 5 questions applying constitutional principles to facts.' },
      { id: 'lr-l3-5', title: 'Mixed Legal Principles Passage Set: 6 questions / 18 min', layer: 3, type: 'passage_set', estimatedMinutes: 18, description: 'Multi-domain legal scenario combining torts, contracts, and criminal law. 6 questions.' },
      { id: 'lr-l3-6', title: 'Legal Current Affairs & Landmark Judgments: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Past 12–18 months SC judgments, new bills/acts, international treaties, and recent legal developments.' },
      { id: 'lr-l3-7', title: 'Legal Maxims in Context: 10 questions / 12 min', layer: 3, type: 'passage_set', estimatedMinutes: 12, description: 'Apply Res Ipsa Loquitur, Quid Pro Quo, and other maxims to factual legal problems.' },
      // Layer 4 – Exam Mode
      { id: 'lr-l4-1', title: 'Exception-Based Legal Questions: 15 questions / 18 min', layer: 4, type: 'drill', estimatedMinutes: 18, description: 'The principle applies EXCEPT when... Train the hardest legal question type under time pressure.' },
      { id: 'lr-l4-2', title: 'Closest Answer Logic', layer: 4, type: 'lesson', estimatedMinutes: 15, description: 'When 2 options seem correct — the strategy to pick the "more correct" one in legal reasoning.' },
      { id: 'lr-l4-3', title: 'Full Legal Reasoning Mock: 30 questions / 35 min', layer: 4, type: 'mock', estimatedMinutes: 35, description: 'Complete legal reasoning simulation at CLAT level. Covers torts, contracts, criminal, constitutional, and CA.' },
      { id: 'lr-l4-4', title: 'Legal Maxims Speed Drill: 15 questions / 10 min', layer: 4, type: 'drill', estimatedMinutes: 10, description: 'Rapid-fire maxims and Latin terms tested in CLAT legal reasoning.' },
    ]
  },
  {
    id: 'gk',
    title: 'Current Affairs & GK',
    emoji: '🌍',
    color: '#10B981',
    accentColor: 'rgba(16,185,129,0.15)',
    tagline: '28–32 Marks — Never Leave Them on the Table',
    modules: [
      // Layer 1 – Foundation
      { id: 'gk-l1-1', title: 'National News: Government Schemes & Policies', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'Major central and state schemes, socio-economic initiatives, and welfare programs launched in past 18 months.' },
      { id: 'gk-l1-2', title: 'Union Budget & Economic Survey', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Key allocations, fiscal deficit targets, capital expenditure, and direct tax proposals.' },
      { id: 'gk-l1-3', title: 'International Relations & Global Summits', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'G20, BRICS, UN, COP, SCO summits, outcomes, and India’s role in global institutions.' },
      { id: 'gk-l1-4', title: 'Static GK: Polity & Key Amendments', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Important constitutional amendments, parliamentary procedures, and election-related reforms.' },
      { id: 'gk-l1-5', title: 'Static GK: Modern Indian History & Freedom Struggle', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Key movements, acts, sessions, and personalities from 1857 to independence.' },
      { id: 'gk-l1-6', title: 'Static GK: Geography Essentials', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Major rivers, national parks, biosphere reserves, climate zones, and physical features of India.' },
      // Layer 2 – Skill Building
      { id: 'gk-l2-1', title: 'National Indices & Socio-Economic Initiatives: 20 questions / 20 min', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'HDI, Ease of Doing Business, SDG Index, and related government initiatives.' },
      { id: 'gk-l2-2', title: 'Global Conflicts & Bilateral Treaties: 15 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'India’s bilateral relations, defence deals, trade agreements, and ongoing geopolitical conflicts.' },
      { id: 'gk-l2-3', title: 'G20, BRICS, UN, COP, SCO Deep Dive: 15 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Member countries, host nations, key declarations, and India-specific outcomes.' },
      { id: 'gk-l2-4', title: 'History & Geography Drill: 20 questions / 18 min', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'Mixed static GK on modern history, rivers, national parks, and climate.' },
      { id: 'gk-l2-5', title: 'Science & Technology: Space, AI & Defence: 15 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'ISRO missions, Chandrayaan, AI policy, defence acquisitions, and health breakthroughs.' },
      { id: 'gk-l2-6', title: 'Awards: Nobel, Bharat Ratna & Others: 12 questions / 12 min', layer: 2, type: 'drill', estimatedMinutes: 12, description: 'Recent awardees, categories, and India-specific recognitions.' },
      // Layer 3 – Application
      { id: 'gk-l3-1', title: 'Current Affairs Integration Set: 10 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Mixed national and international CA questions linking schemes, policies, and summits.' },
      { id: 'gk-l3-2', title: 'Static GK Mixed Practice: 10 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Polity, history, geography, and awards combined in a single test-like set.' },
      { id: 'gk-l3-3', title: 'Economy & Budget Application: 8 questions / 12 min', layer: 3, type: 'passage_set', estimatedMinutes: 12, description: 'Budget-based comprehension and inference questions on economic indicators.' },
      { id: 'gk-l3-4', title: 'Science & Environment Integration: 8 questions / 12 min', layer: 3, type: 'passage_set', estimatedMinutes: 12, description: 'COP outcomes, climate agreements, space missions, and environmental policy questions.' },
      // Layer 4 – Exam Mode
      { id: 'gk-l4-1', title: 'Weekly Revision Test: 30 questions / 25 min', layer: 4, type: 'mock', estimatedMinutes: 25, description: 'Mixed CA and static GK from the past 7 days. Benchmark retention.' },
      { id: 'gk-l4-2', title: 'Monthly Mega Quiz: 50 questions / 40 min', layer: 4, type: 'mock', estimatedMinutes: 40, description: 'Full-month CA and static GK coverage. Track your GK retention score.' },
      { id: 'gk-l4-3', title: 'Rapid Revision: One-Liners', layer: 4, type: 'lesson', estimatedMinutes: 10, description: '100 one-liners covering the most testable facts. Revise in 10 minutes.' },
      { id: 'gk-l4-4', title: 'GK Flashcard Deck: 40 questions / 15 min', layer: 4, type: 'drill', estimatedMinutes: 15, description: 'Flip-card revision on appointments, awards, summits, indices, and schemes.' },
    ]
  },
  {
    id: 'english',
    title: 'English Language',
    emoji: '📖',
    color: '#3B82F6',
    accentColor: 'rgba(59,130,246,0.15)',
    tagline: 'Reading Comprehension & Vocabulary (22–26 questions)',
    modules: [
      // Layer 1 – Foundation
      { id: 'en-l1-1', title: 'RC: Main Idea & Fact-Extraction', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Identify the central argument and extract explicit facts from passages.' },
      { id: 'en-l1-2', title: 'RC: Author’s Tone, Style & Perspective', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Sarcastic, neutral, critical, appreciative — decode the author’s emotional register and intent.' },
      { id: 'en-l1-3', title: 'Vocabulary: Contextual Meaning & Synonyms/Antonyms', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'CLAT tests contextual usage, not dictionary meanings. Learn to infer meaning from surrounding text.' },
      { id: 'en-l1-4', title: 'Grammar: Subject-Verb Agreement & Tenses', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Singular/plural concord, collective nouns, and correct tense usage in complex sentences.' },
      { id: 'en-l1-5', title: 'Grammar: Modifiers, Parallelism & Prepositions', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Dangling modifiers, parallel structure, and correct prepositional usage.' },
      // Layer 2 – Skill Building
      { id: 'en-l2-1', title: 'RC: Inference Questions: 12 questions / 18 min', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'What can be concluded but is NOT stated directly? Master this trap-heavy question type.' },
      { id: 'en-l2-2', title: 'RC: Structural Summaries: 10 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Understand how paragraphs are organized and summarize passage structure accurately.' },
      { id: 'en-l2-3', title: 'Vocabulary: Idioms & Phrases: 12 questions / 12 min', layer: 2, type: 'drill', estimatedMinutes: 12, description: 'Common idioms tested in CLAT and their contextual meanings.' },
      { id: 'en-l2-4', title: 'Grammar: Error Spotting: 15 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Identify errors in subject-verb agreement, tenses, modifiers, and parallelism under timed conditions.' },
      { id: 'en-l2-5', title: 'Sentence Completion & Para-Jumbles: 10 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Fill-in-the-blank and sentence rearrangement for coherent paragraph flow.' },
      // Layer 3 – Application
      { id: 'en-l3-1', title: 'Easy Passage Sets: 3 passages / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: '3 passages with 5 questions each. Build confidence before going harder.' },
      { id: 'en-l3-2', title: 'Medium Passage Sets: 3 passages / 25 min', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Editorial-style passages with inference, vocabulary, and tone combo questions.' },
      { id: 'en-l3-3', title: 'Hard Passage Sets (Timed): 2 passages / 20 min', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Philosophical or abstract passages under 10-minute timer. CLAT-level difficulty.' },
      // Layer 4 – Exam Mode
      { id: 'en-l4-1', title: 'Skimming Techniques', layer: 4, type: 'lesson', estimatedMinutes: 10, description: 'How to read 400 words in 90 seconds without missing anything important.' },
      { id: 'en-l4-2', title: 'Elimination Strategy', layer: 4, type: 'lesson', estimatedMinutes: 12, description: 'Knock out 2 wrong answers first. Your accuracy will jump 15%.' },
      { id: 'en-l4-3', title: 'Speed Accuracy Drill: 20 questions / 20 min', layer: 4, type: 'mock', estimatedMinutes: 20, description: 'Mixed RC, vocabulary, and grammar questions under exam-like time pressure.' },
      { id: 'en-l4-4', title: 'Full English Mock: 25 questions / 25 min', layer: 4, type: 'mock', estimatedMinutes: 25, description: 'Complete English section simulation matching CLAT 2026 weightage.' },
    ]
  },
  {
    id: 'logical',
    title: 'Logical Reasoning',
    emoji: '🧩',
    color: '#EF4444',
    accentColor: 'rgba(239,68,68,0.15)',
    tagline: 'Argument Analysis & Analytical Reasoning (22–26 questions)',
    modules: [
      // Layer 1 – Foundation
      { id: 'lg-l1-1', title: 'Arguments, Premises & Conclusions', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The atomic unit of critical reasoning. What makes an argument valid vs invalid?' },
      { id: 'lg-l1-2', title: 'Strengthen/Weaken & Assumptions', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Identify unstated assumptions and learn how options affect argument strength.' },
      { id: 'lg-l1-3', title: 'Flaws, Inferences & Paradoxes', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Common logical flaws, valid inferences, and resolving apparent contradictions.' },
      { id: 'lg-l1-4', title: 'Cause & Effect', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Does A cause B, or just correlate? CLAT loves this distinction.' },
      { id: 'lg-l1-5', title: 'Syllogisms & Analogies', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'All A are B. Some B are C. What follows? And A:B :: C:? relationship mapping.' },
      { id: 'lg-l1-6', title: 'Seating Arrangements, Blood Relations & Coding-Decoding', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Linear/circular seating, family tree logic, and pattern-based coding rules.' },
      // Layer 2 – Skill Building
      { id: 'lg-l2-1', title: 'Strengthen/Weaken Drill: 12 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Which option makes the argument stronger or more vulnerable? Highly logical.' },
      { id: 'lg-l2-2', title: 'Assumptions & Flaws Drill: 12 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'What does the argument SILENTLY assume? And what is the underlying flaw?' },
      { id: 'lg-l2-3', title: 'Inference & Paradox Drill: 10 questions / 12 min', layer: 2, type: 'drill', estimatedMinutes: 12, description: 'What MUST follow from the given information? And how to resolve paradoxes?' },
      { id: 'lg-l2-4', title: 'Cause & Effect Drill: 10 questions / 12 min', layer: 2, type: 'drill', estimatedMinutes: 12, description: 'Distinguish causation from correlation in argument-based questions.' },
      { id: 'lg-l2-5', title: 'Syllogisms & Analogies Drill: 12 questions / 12 min', layer: 2, type: 'drill', estimatedMinutes: 12, description: 'Venn diagram technique for syllogisms and consistent relationship mapping for analogies.' },
      { id: 'lg-l2-6', title: 'Seating, Blood Relations & Coding Drill: 12 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Mixed analytical reasoning under timed conditions.' },
      // Layer 3 – Application
      { id: 'lg-l3-1', title: 'Passage-Based Critical Reasoning: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Long 250-word passages followed by 5 critical reasoning questions. New CLAT format.' },
      { id: 'lg-l3-2', title: 'Seating Arrangements & Blood Relations Sets: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Complex arrangement and family-tree problems with multiple constraints.' },
      { id: 'lg-l3-3', title: 'Coding-Decoding & Mixed Analytical Sets: 5 questions / 12 min', layer: 3, type: 'passage_set', estimatedMinutes: 12, description: 'Pattern recognition and mixed analytical reasoning problem sets.' },
      { id: 'lg-l3-4', title: 'Mixed Critical Reasoning Passage Set: 6 questions / 18 min', layer: 3, type: 'passage_set', estimatedMinutes: 18, description: 'Strengthen, weaken, assumption, inference, and flaw combined in one passage.' },
      // Layer 4 – Exam Mode
      { id: 'lg-l4-1', title: 'Closest Answer Logic', layer: 4, type: 'lesson', estimatedMinutes: 12, description: 'When 2 options both seem correct — the strategy to pick the better one.' },
      { id: 'lg-l4-2', title: 'Full Logical Reasoning Mock: 25 questions / 25 min', layer: 4, type: 'mock', estimatedMinutes: 25, description: 'Complete logical reasoning simulation with critical and analytical reasoning.' },
      { id: 'lg-l4-3', title: 'Speed Accuracy Drill: 20 questions / 18 min', layer: 4, type: 'mock', estimatedMinutes: 18, description: 'Mixed logical reasoning under tight time pressure.' },
      { id: 'lg-l4-4', title: 'Statement–Conclusion Pairs: 15 questions / 12 min', layer: 4, type: 'drill', estimatedMinutes: 12, description: 'Does the conclusion DEFINITELY follow? Train your strict logical lens.' },
    ]
  },
  {
    id: 'quant',
    title: 'Quantitative Techniques',
    emoji: '📊',
    color: '#8B5CF6',
    accentColor: 'rgba(139,92,246,0.15)',
    tagline: 'Data Interpretation is 80% of Quant — Own It (10–14 questions)',
    modules: [
      // Layer 1 – Foundation
      { id: 'qt-l1-1', title: 'Percentages: Increase/Decrease, P&L, Discounts', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The DNA of all DI. Master percent calculations, successive changes, and markup without a pen.' },
      { id: 'qt-l1-2', title: 'Ratios, Proportions & Averages', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Comparing quantities, weighted average, and mean — used in every DI question.' },
      { id: 'qt-l1-3', title: 'SI/CI & Mixtures & Alligations', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Simple and compound interest formulae, and the alligation rule for mixtures.' },
      { id: 'qt-l1-4', title: 'Time-Speed-Distance & Time-Work', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Relative speed, average speed, efficiency, and combined work rate — CLAT staples.' },
      { id: 'qt-l1-5', title: 'Basic Mensuration', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'Area, perimeter, volume of standard 2D and 3D figures tested in quant.' },
      // Layer 2 – Skill Building
      { id: 'qt-l2-1', title: 'DI: Tables & Caselets: 8 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Read a data table or caselet, answer questions in 90 seconds each.' },
      { id: 'qt-l2-2', title: 'DI: Bar Graphs & Line Graphs: 8 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Visual-to-calculation conversion. Fast reading equals fast marks.' },
      { id: 'qt-l2-3', title: 'DI: Pie Charts: 6 questions / 12 min', layer: 2, type: 'drill', estimatedMinutes: 12, description: 'Percentage-based reading. Convert to actual numbers first, then calculate.' },
      { id: 'qt-l2-4', title: 'Core Arithmetic Mixed Drill: 10 questions / 15 min', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Percentages, ratios, averages, interest, and mensuration combined practice.' },
      // Layer 3 – Application
      { id: 'qt-l3-1', title: 'Mixed DI Passage Set: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Table + bar graph combined. Full CLAT-style DI application.' },
      { id: 'qt-l3-2', title: 'Arithmetic Application Set: 5 questions / 12 min', layer: 3, type: 'passage_set', estimatedMinutes: 12, description: 'Word-problem style quantitative questions embedded in passages.' },
      { id: 'qt-l3-3', title: 'Caselet-Based DI Set: 5 questions / 15 min', layer: 3, type: 'passage_set', estimatedMinutes: 15, description: 'Paragraph-based data interpretation. Extract numbers and answer 5 questions.' },
      // Layer 4 – Exam Mode
      { id: 'qt-l4-1', title: 'Approximation Tricks', layer: 4, type: 'lesson', estimatedMinutes: 12, description: 'Avoid exact calculation. Round smartly and pick the closest option.' },
      { id: 'qt-l4-2', title: 'Percentage Shortcut Grid', layer: 4, type: 'lesson', estimatedMinutes: 10, description: '10%, 25%, 33%, 50%... learn fractional equivalents by heart for instant calculation.' },
      { id: 'qt-l4-3', title: 'Full Quant Mock: 12 questions / 15 min', layer: 4, type: 'mock', estimatedMinutes: 15, description: 'Complete quantitative techniques simulation at CLAT difficulty.' },
      { id: 'qt-l4-4', title: 'CLAT DI Full Sets: 3 passages / 20 min', layer: 4, type: 'mock', estimatedMinutes: 20, description: '3 mixed DI passages (table + bar + pie). Full CLAT quant simulation.' },
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
