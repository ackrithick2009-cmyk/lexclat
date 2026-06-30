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
    tagline: '~28-32 Questions — Your Core USP',
    modules: [
      // Layer 1 — Foundation: What is a Legal Principle?
      { id: 'lr-l1-1', title: 'What Is a "Legal Principle"?', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The foundation of all legal reasoning. Learn how CLAT defines and tests legal principles in passage-based questions.' },
      { id: 'lr-l1-2', title: 'Fact vs. Assumption vs. Conclusion', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'This distinction determines half your marks. Master the structure of legal reasoning arguments.' },
      { id: 'lr-l1-3', title: 'How CLAT Frames Traps', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'The 5 most common trap types in legal reasoning. Learn them, never fall for them.' },
      { id: 'lr-l1-4', title: 'The Principle–Fact–Decision Structure', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'CLAT passages always follow this pattern. Learn to extract each component instantly.' },
      // Layer 2 — Law of Torts (most tested area)
      { id: 'lr-l2-1', title: 'Negligence: Duty, Breach, Causation, Damages', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'The most-tested tort. Donovan v. Stevenson (neighbour principle), Bolam test, and Res Ipsa Loquitur.' },
      { id: 'lr-l2-2', title: 'Defamation: Libel, Slander, Defences', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Essential elements, justification (truth), fair comment, privilege — absolute vs. qualified.' },
      { id: 'lr-l2-3', title: 'Strict Liability vs. Absolute Liability', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Rylands v. Fletcher (strict liability) vs. MC Mehta v. Union of India (absolute liability). No-fault regimes.' },
      { id: 'lr-l2-4', title: 'Vicarious Liability: Master & Servant', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Scope of employment, independent contractors, and the doctrine of "let the master answer".' },
      { id: 'lr-l2-5', title: 'Nuisance: Public & Private', layer: 2, type: 'drill', estimatedMinutes: 18, description: 'Interference with use/enjoyment of land. Sturges v. Bridgman, the "live and let live" principle.' },
      { id: 'lr-l2-6', title: 'Malicious Prosecution & General Defences', layer: 2, type: 'drill', estimatedMinutes: 22, description: 'Volenti non fit injuria, act of God, inevitable accident, private defence, and contributory negligence.' },
      // Layer 3 — Law of Contracts
      { id: 'lr-l3-1', title: 'Offer & Acceptance: The Building Blocks', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Invitation to treat vs. offer, communication of acceptance, revocation rules (Byrne v. Van Tienhoven).' },
      { id: 'lr-l3-2', title: 'Consideration: Privity & Past Consideration', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Tweddle v. Atkinson, Chinnaya v. Ramayya, and the doctrine of privity of contract.' },
      { id: 'lr-l3-3', title: 'Capacity to Contract & Free Consent', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Minor contracts (Mohiri Bibee v. Dharmodas Ghose), coercion, undue influence, fraud, misrepresentation.' },
      { id: 'lr-l3-4', title: 'Void, Voidable & Contingent Contracts', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Uncertainty, impossibility, wagering agreements, and the distinction between void ab initio and voidable.' },
      { id: 'lr-l3-5', title: 'Breach of Contract & Remedies', layer: 3, type: 'passage_set', estimatedMinutes: 22, description: 'Damages, specific performance, injunctions, and the doctrine of frustration (Satyabrata Ghosh v. Mugneeram).' },
      // Layer 4 — Criminal Law & Constitutional Law (heaviest sections)
      { id: 'lr-l4-1', title: 'Mens Rea & Actus Reus: Elements of Crime', layer: 4, type: 'lesson', estimatedMinutes: 20, description: 'Guilty mind + guilty act. General mens rea, specific intent, transferred malice, and coincidence of actus reus and mens rea.' },
      { id: 'lr-l4-2', title: 'General Exceptions: Private Defence, Insanity, Minor', layer: 4, type: 'drill', estimatedMinutes: 25, description: 'BNS Sections 14-33. MC Naughten rules, infancy defence, and the limits of private defence under Section 34.' },
      { id: 'lr-l4-3', title: 'Murder vs. Culpable Homicide: The Thin Line', layer: 4, type: 'drill', estimatedMinutes: 25, description: 'BNS Section 100 vs. 101. The 7 exceptions to murder, "rarest of rare" doctrine (Bachan Singh v. State of Punjab).' },
      { id: 'lr-l4-4', title: 'Theft, Extortion, Robbery & Cheating', layer: 4, type: 'drill', estimatedMinutes: 20, description: 'BNS Sections 286-306. Dishonest intention, movable property, and the distinction between theft and extortion.' },
      { id: 'lr-l4-5', title: 'The New Criminal Trilogy: BNS, BNSS, BSA', layer: 4, type: 'lesson', estimatedMinutes: 30, description: 'Dec 2023 assent, July 2024 force. Decolonial jurisprudence, BNS Sec 152 (sedition replacement), BSA electronic evidence integration.' },
      { id: 'lr-l4-6', title: 'Constitutional Law: Fundamental Rights (Art. 14-32)', layer: 4, type: 'passage_set', estimatedMinutes: 35, description: 'Articles 14 (equality), 19 (speech), 21 (life), 32 (remedies). The Basic Structure doctrine (Kesavananda Bharati).' },
      { id: 'lr-l4-7', title: 'DPSPs, Fundamental Duties & Emergency Provisions', layer: 4, type: 'passage_set', estimatedMinutes: 25, description: 'Articles 36-51 (DPSPs), Article 51A (duties), and Articles 352-360 (emergency powers).' },
      { id: 'lr-l4-8', title: 'Writs: Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto', layer: 4, type: 'drill', estimatedMinutes: 20, description: 'Article 32 & 226. ADM Jabalpur v. Shivkant Shukla and the "rarest of rare" context for habeas corpus suspension.' },
      { id: 'lr-l4-9', title: 'Legal Maxims: Res Ipsa Loquitur, Quid Pro Quo, Nemo Dat', layer: 4, type: 'lesson', estimatedMinutes: 15, description: 'Latin maxims tested directly in CLAT. Learn their meaning, application, and common traps.' },
      { id: 'lr-l4-10', title: 'Landmark SC Judgments (2024-2026)', layer: 4, type: 'passage_set', estimatedMinutes: 40, description: 'Electoral Bonds (ADR v. UOI), SC/ST Sub-classification (Punjab v. Davinder Singh), Uttarakhand UCC, Right to be Forgotten.' },
      { id: 'lr-l4-11', title: 'Legal Current Affairs: New Bills & International Treaties', layer: 4, type: 'mock', estimatedMinutes: 30, description: 'Full CLAT-level legal reasoning passages based on real recent events and legislative changes.' },
    ]
  },
  {
    id: 'gk',
    title: 'Current Affairs & GK',
    emoji: '🌍',
    color: '#10B981',
    accentColor: 'rgba(16,185,129,0.15)',
    tagline: '~28-32 Questions — Background, Causes & Consequences',
    modules: [
      // Layer 1 — Contemporary National News
      { id: 'gk-l1-1', title: 'Major Government Schemes (2024-2026)', layer: 1, type: 'lesson', estimatedMinutes: 25, description: 'Ayushman Bharat 2.0, PM-KISAN, DBT 2.0, National Quantum Mission, Semicon India, and Mission Saksham.' },
      { id: 'gk-l1-2', title: 'Union Budget 2026 & Economic Survey Insights', layer: 1, type: 'lesson', estimatedMinutes: 30, description: 'GDP growth targets, fiscal deficit, capital expenditure, tax slabs, and sectoral allocations.' },
      { id: 'gk-l1-3', title: 'National Indices & Socio-Economic Initiatives', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'Human Development Index, Ease of Doing Business, Global Innovation Index, and SDG rankings.' },
      { id: 'gk-l1-4', title: 'National Security & Defence Developments', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'BrahMos exports, HGV tests, Chandrayaan-4, AI in defence, and the Defence Acquisition Procedure.' },
      // Layer 2 — International Relations
      { id: 'gk-l2-1', title: 'G20, BRICS, SCO: India\'s Multilateral Role', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'G20 Delhi legacy, BRICS expansion (2024), SCO membership, and India\'s DPI Charter diplomacy.' },
      { id: 'gk-l2-2', title: 'UN, COP, ICJ: International Law & Climate', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'COP31 net-zero pledges, ICJ climate advisory opinion, UN SDG Summit, and India\'s Arctic policy.' },
      { id: 'gk-l2-3', title: 'Bilateral Treaties & Trade Agreements', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'India-UAE CEPA 2.0, India-UK FTA, QUAD partnership, and the India-Bangladesh transit agreement.' },
      { id: 'gk-l2-4', title: 'Global Conflicts & Geopolitical Shifts', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Gaza ICJ case, Ukraine conflict, Red Sea crisis, and the India-Middle East-Europe Corridor (IMEC).' },
      // Layer 3 — Static GK
      { id: 'gk-l3-1', title: 'Polity: Key Constitutional Amendments', layer: 3, type: 'lesson', estimatedMinutes: 25, description: '1st, 7th, 42nd, 44th, 73rd, 74th, 86th, 103rd, 104th amendments. Their significance and current relevance.' },
      { id: 'gk-l3-2', title: 'History: Modern India & Freedom Struggle', layer: 3, type: 'lesson', estimatedMinutes: 30, description: '1857 Revolt, INC formation (1885), Partition of Bengal (1905), Jallianwala (1919), Non-Cooperation, Civil Disobedience, Quit India, and Independence.' },
      { id: 'gk-l3-3', title: 'Geography: Rivers, Parks, Climate Zones', layer: 3, type: 'lesson', estimatedMinutes: 20, description: 'Major river systems, national parks (Jim Corbett, Kaziranga, Sundarbans), climate zones, and monsoon patterns.' },
      { id: 'gk-l3-4', title: 'Science, Space & AI Developments', layer: 3, type: 'lesson', estimatedMinutes: 25, description: 'ISRO missions (Chandrayaan, Aditya), quantum computing (Annapurna), AI policy, and semiconductor manufacturing.' },
      { id: 'gk-l3-5', title: 'Awards, Sports & Intellectual Property', layer: 3, type: 'lesson', estimatedMinutes: 20, description: 'Nobel Prize 2024-25, Bharat Ratna recipients, Paris Olympics 2026, major sports events, and IPR developments.' },
      // Layer 4 — Revision & Current Affairs Integration
      { id: 'gk-l4-1', title: 'Weekly CA Revision Test (20 MCQs)', layer: 4, type: 'mock', estimatedMinutes: 20, description: 'All from the past 7 days of current affairs. Take every Sunday without fail.' },
      { id: 'gk-l4-2', title: 'Monthly Mega Quiz (50 MCQs)', layer: 4, type: 'mock', estimatedMinutes: 35, description: 'Spanning the full month: national, international, and static GK. Track your retention score.' },
      { id: 'gk-l4-3', title: 'Static GK One-Liner Drill (100 Facts)', layer: 4, type: 'drill', estimatedMinutes: 15, description: 'Appointments, awards, summits, indices, constitutional articles, and historical dates.' },
      { id: 'gk-l4-4', title: 'GK Flashcard Deck: High-Yield Facts', layer: 4, type: 'drill', estimatedMinutes: 15, description: 'Flip-card revision for the most-testable facts in CLAT history.' },
    ]
  },
  {
    id: 'english',
    title: 'English Language',
    emoji: '📖',
    color: '#3B82F6',
    accentColor: 'rgba(59,130,246,0.15)',
    tagline: '~22-26 Questions — 450-Word Passages',
    modules: [
      // Layer 1 — Reading Comprehension Foundation
      { id: 'en-l1-1', title: 'Types of Passages: Editorial, Philosophical, Narrative', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'CLAT passages are drawn from The Hindu, The Indian Express, and literary essays. Learn to identify each type instantly.' },
      { id: 'en-l1-2', title: 'Identifying Main Idea & Central Theme', layer: 1, type: 'lesson', estimatedMinutes: 12, description: 'The #1 skill in RC. Learn to separate the central argument from supporting details and examples.' },
      { id: 'en-l1-3', title: 'Author\'s Tone, Style & Perspective', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Sarcastic, neutral, critical, appreciative, polemical — master the author\'s emotional and intellectual register.' },
      { id: 'en-l1-4', title: 'Fact-Extraction & Structural Summaries', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'What is explicitly stated? What is the structure of the argument? Map the passage before answering.' },
      // Layer 2 — Inference & Vocabulary
      { id: 'en-l2-1', title: 'Inference Questions: Reading Between the Lines', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'What MUST be true but is NOT stated directly? The most trap-heavy question type in CLAT English.' },
      { id: 'en-l2-2', title: 'Vocabulary in Context: Synonyms & Antonyms', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'CLAT never tests dictionary meanings — it tests contextual usage. Crack the pattern of contextual inference.' },
      { id: 'en-l2-3', title: 'Idioms, Phrases & Proverbial Expressions', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Common idioms tested in CLAT: "a double-edged sword," "the tip of the iceberg," "bury the hatchet."' },
      { id: 'en-l2-4', title: 'Sentence Meaning & Paraphrase', layer: 2, type: 'drill', estimatedMinutes: 15, description: 'Find the option that means EXACTLY what the sentence says, without adding or removing information.' },
      // Layer 3 — Grammar & Applied Language
      { id: 'en-l3-1', title: 'Subject-Verb Agreement & Tense Consistency', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Collective nouns, indefinite pronouns, and the sequence of tenses in complex sentences.' },
      { id: 'en-l3-2', title: 'Modifiers, Parallelism & Prepositions', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Dangling modifiers, faulty parallelism, and prepositional idioms (NOT "discuss about" but "discuss").' },
      { id: 'en-l3-3', title: 'Error Spotting & Sentence Correction', layer: 3, type: 'passage_set', estimatedMinutes: 20, description: 'Identify the grammatically incorrect portion and select the correct replacement from the options.' },
      // Layer 4 — Exam Mode & Speed
      { id: 'en-l4-1', title: 'Skimming Techniques for 450-Word Passages', layer: 4, type: 'lesson', estimatedMinutes: 12, description: 'How to read 450 words in 90 seconds and extract the main idea without getting lost in details.' },
      { id: 'en-l4-2', title: 'Elimination Strategy: Knock Out 2 Wrong Answers First', layer: 4, type: 'lesson', estimatedMinutes: 15, description: 'Your accuracy will jump 15% if you eliminate the obviously wrong options before deep analysis.' },
      { id: 'en-l4-3', title: 'CLAT-Style Passage Sets (Timed)', layer: 4, type: 'mock', estimatedMinutes: 30, description: '3 editorial passages with 5 questions each. Full 26-minute simulation. Time yourself ruthlessly.' },
    ]
  },
  {
    id: 'logical',
    title: 'Logical Reasoning',
    emoji: '🧩',
    color: '#EF4444',
    accentColor: 'rgba(239,68,68,0.15)',
    tagline: '~22-26 Questions — Critical & Analytical Reasoning',
    modules: [
      // Layer 1 — Critical Reasoning Foundation
      { id: 'lg-l1-1', title: 'Arguments, Premises & Conclusions', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The atomic unit of logical reasoning. What makes an argument valid? Identify unstated assumptions.' },
      { id: 'lg-l1-2', title: 'Strong vs. Weak Arguments', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Evaluate the strength of arguments based on relevance, evidence, and logical structure.' },
      { id: 'lg-l1-3', title: 'How to Spot Logical Fallacies', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Ad hominem, straw man, false dichotomy, circular reasoning, post hoc ergo propter hoc.' },
      // Layer 2 — Critical Reasoning Drills (High Priority)
      { id: 'lg-l2-1', title: 'Assumptions: What the Argument Silently Assumes', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'The #1 tested question type in CLAT Logical Reasoning. Spot the hidden premise.' },
      { id: 'lg-l2-2', title: 'Strengthening & Weakening Arguments', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Which option makes the argument stronger or more vulnerable? Focus on causal links.' },
      { id: 'lg-l2-3', title: 'Drawing Inferences & Paradoxes', layer: 2, type: 'drill', estimatedMinutes: 22, description: 'What MUST follow from the premises? Resolve apparent contradictions (paradox questions).' },
      { id: 'lg-l2-4', title: 'Cause & Effect: Correlation vs. Causation', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Does A cause B, or do they just correlate? CLAT loves this distinction in passage-based questions.' },
      { id: 'lg-l2-5', title: 'Logical Flaws & Faulty Reasoning', layer: 2, type: 'drill', estimatedMinutes: 20, description: 'Identify the specific flaw in the argument: hasty generalization, irrelevant evidence, etc.' },
      // Layer 3 — Passage-Based Reasoning Sets
      { id: 'lg-l3-1', title: 'Passage-Based Critical Reasoning Sets', layer: 3, type: 'passage_set', estimatedMinutes: 35, description: 'Long 250-word passages followed by 5-6 logic questions. The new CLAT format since 2020.' },
      { id: 'lg-l3-2', title: 'Statement–Conclusion & Statement–Assumption Pairs', layer: 3, type: 'passage_set', estimatedMinutes: 25, description: 'Does the conclusion DEFINITELY follow? Train your strict logical lens on compound statements.' },
      // Layer 4 — Analytical Reasoning (Short Sets/Puzzles)
      { id: 'lg-l4-1', title: 'Syllogisms: Venn Diagram Technique', layer: 4, type: 'drill', estimatedMinutes: 20, description: 'All A are B. Some B are C. What follows? Master the Venn diagram approach for 2-3 statement syllogisms.' },
      { id: 'lg-l4-2', title: 'Seating Arrangements: Linear & Circular', layer: 4, type: 'drill', estimatedMinutes: 25, description: 'Arrangement puzzles with 6-8 people. Use fixed-position logic and elimination grids.' },
      { id: 'lg-l4-3', title: 'Blood Relations: Family Tree Logic', layer: 4, type: 'drill', estimatedMinutes: 20, description: 'Decode complex family relationships from coded statements. Use generational mapping.' },
      { id: 'lg-l4-4', title: 'Coding-Decoding & Analogies', layer: 4, type: 'drill', estimatedMinutes: 18, description: 'A:B :: C:? — find the relationship. Letter-shifting, number patterns, and word analogies.' },
      { id: 'lg-l4-5', title: 'Full Logical Reasoning Mock (26 Questions)', layer: 4, type: 'mock', estimatedMinutes: 35, description: 'Complete CLAT-level logical reasoning section with both critical and analytical questions.' },
    ]
  },
  {
    id: 'quant',
    title: 'Quantitative Techniques',
    emoji: '📊',
    color: '#8B5CF6',
    accentColor: 'rgba(139,92,246,0.15)',
    tagline: '~10-14 Questions — Class 10 Math in Data Sets',
    modules: [
      // Layer 1 — Core Arithmetic Foundation
      { id: 'qt-l1-1', title: 'Percentages: Increase, Decrease, Profit & Loss', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'The DNA of all DI. Successive percentage changes, effective change formula, and the multiplier method.' },
      { id: 'qt-l1-2', title: 'Ratios, Proportions & Partnerships', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'Comparing quantities, dividing amounts, and time-weighted profit sharing in partnerships.' },
      { id: 'qt-l1-3', title: 'Averages & Weighted Averages', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Mean, median, mode, and the deviation method for rapid average calculation of large data sets.' },
      { id: 'qt-l1-4', title: 'Mixtures & Alligations', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'The rule of alligation for mixing two quantities with different prices/concentrations.' },
      { id: 'qt-l1-5', title: 'Simple Interest & Compound Interest', layer: 1, type: 'lesson', estimatedMinutes: 18, description: 'SI = PRT/100. CI = P(1+r)^n. Half-yearly and quarterly compounding. Difference between SI and CI.' },
      { id: 'qt-l1-6', title: 'Time, Speed & Distance + Time & Work', layer: 1, type: 'lesson', estimatedMinutes: 20, description: 'Relative speed, average speed, trains and platforms. The LCM method for time and work problems.' },
      { id: 'qt-l1-7', title: 'Basic Mensuration: Areas & Volumes', layer: 1, type: 'lesson', estimatedMinutes: 15, description: 'Rectangle, circle, triangle, cylinder, sphere. Formula-based but speed-dependent.' },
      // Layer 2 — Data Interpretation (The Bulk of Quant)
      { id: 'qt-l2-1', title: 'Table DI: Reading & Calculating from Tables', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'The most common DI format. Read a data table, answer 5 questions in 6 minutes.' },
      { id: 'qt-l2-2', title: 'Bar Graph & Pie Chart DI', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Visual-to-calculation conversion. The trick for pie charts: convert percentages to actual numbers first.' },
      { id: 'qt-l2-3', title: 'Line Graph DI: Trends & Rate of Change', layer: 2, type: 'drill', estimatedMinutes: 25, description: 'Growth rates, percentage change over time, and comparative analysis from line graphs.' },
      { id: 'qt-l2-4', title: 'Caselet DI: Text-Based Numerical Data', layer: 2, type: 'drill', estimatedMinutes: 30, description: 'The CLAT-favourite format. A 200-word passage with embedded data — extract, calculate, and answer.' },
      // Layer 3 — Approximation & Speed
      { id: 'qt-l3-1', title: 'Approximation Tricks for DI', layer: 3, type: 'lesson', estimatedMinutes: 15, description: 'Round smartly, pick the closest option. Avoid exact calculation when possible.' },
      { id: 'qt-l3-2', title: 'Percentage Shortcut Grid & Fraction Equivalents', layer: 3, type: 'lesson', estimatedMinutes: 12, description: '10% = 1/10, 12.5% = 1/8, 16.66% = 1/6, 20% = 1/5. Memorize and apply instantly.' },
      { id: 'qt-l3-3', title: 'Multi-Layered Table DI (Advanced)', layer: 3, type: 'passage_set', estimatedMinutes: 30, description: 'Tables with multiple columns, percentages, and inter-row calculations. Full CLAT-level difficulty.' },
      // Layer 4 — Full Simulation
      { id: 'qt-l4-1', title: 'CLAT Quant Full Sets (14 Questions, 15 Mins)', layer: 4, type: 'mock', estimatedMinutes: 20, description: '3 mixed DI passages + 4 standalone arithmetic questions. Full CLAT simulation under time pressure.' },
    ]
  }
];

export const DAY_PLAN = Array.from({ length: 90 }, (_, i) => {
  const day = i + 1;
  const patterns = [
    { theme: 'Legal (Torts + Contracts) + English RC', subjects: ['legal', 'english'], practiceType: 'Passage Drill + Principle Application' },
    { theme: 'GK (National + International) + Logical CR', subjects: ['gk', 'logical'], practiceType: 'CA Quiz + Assumption Drills' },
    { theme: 'Legal (Criminal + Constitutional) + Quant DI', subjects: ['legal', 'quant'], practiceType: 'Case-Based + Data Interpretation' },
    { theme: 'English (Vocab + Grammar) + Logical AR', subjects: ['english', 'logical'], practiceType: 'Vocabulary + Seating Arrangements' },
    { theme: 'GK (Static) + Legal (Current Affairs) + Mock', subjects: ['gk', 'legal'], practiceType: 'Static GK + Legal CA + Mini Mock' },
    { theme: 'Legal (Contracts + Remedies) + Quant Arithmetic', subjects: ['legal', 'quant'], practiceType: 'Contract Principles + Percentage Drills' },
    { theme: 'SUNDAY: Full Sectional Mock (120 Questions)', subjects: ['english', 'legal', 'gk', 'logical', 'quant'], practiceType: 'Complete CLAT Simulation' },
  ];
  const pattern = patterns[(day - 1) % patterns.length];
  return { day, ...pattern };
});
