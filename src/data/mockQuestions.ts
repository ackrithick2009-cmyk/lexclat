export interface MockQuestion {
  passage: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: 'English' | 'GK' | 'Legal' | 'Logical' | 'Quant';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const MOCK_QUESTIONS: MockQuestion[] = [
  // ─── LEGAL REASONING (8 questions) ───
  {
    passage: "Principle: A person is liable for the tort of negligence if they owe a duty of care, breach that duty, and cause foreseeable harm to the plaintiff. Defences include contributory negligence, volenti non fit injuria (consent), and act of God.\n\nFacts: Rahul, a professional cyclist, was training on a designated cycling path. A municipal contractor, ABC Ltd., had left construction material partially blocking the path without any warning signs. Rahul, riding at 30 km/h (within the speed limit), swerved to avoid the material, fell, and fractured his arm. ABC Ltd. argues that Rahul was aware of ongoing construction in the area and should have been more cautious.",
    question: "Is ABC Ltd. liable for negligence?",
    options: [
      "No, because Rahul was aware of ongoing construction and assumed the risk.",
      "Yes, because ABC Ltd. owed a duty of care to path users, breached it by leaving material without warning, and caused foreseeable harm.",
      "No, because Rahul was riding too fast and was contributorily negligent.",
      "Yes, but liability is reduced because Rahul should have chosen an alternative route."
    ],
    correctIndex: 1,
    explanation: "ABC Ltd. owed a duty of care to all users of the cycling path. By leaving construction material without warning signs, they breached that duty. The harm (cyclist falling) was foreseeable. The defence of volenti non fit injuria fails because mere awareness of construction does not imply consent to specific risks. Contributory negligence is not established as Rahul was riding within the speed limit.",
    subject: 'Legal',
    difficulty: 'medium',
    topic: 'Negligence'
  },
  {
    passage: "Principle: Under the Indian Contract Act, 1872, a contract entered into by a minor is void ab initio (void from the beginning). However, a minor can be a beneficiary of a contract and can enforce it against the other party. A minor is also liable for necessaries supplied to them.\n\nFacts: Aman, aged 17, enters into a contract with Bhanu to purchase a high-end gaming laptop for ₹2,00,000. Aman pays a token amount of ₹20,000. Later, Aman refuses to take delivery and demands the return of the token amount. Bhanu sues Aman for breach of contract.",
    question: "What is the legal position?",
    options: [
      "Aman is liable for breach of contract and must pay the full amount.",
      "The contract is void, but Aman can recover the token amount as it was not a necessary.",
      "Bhanu can enforce the contract against Aman because Aman initiated it.",
      "The contract is valid because Aman is above 16 years of age."
    ],
    correctIndex: 1,
    explanation: "A contract with a minor is void ab initio under the Indian Contract Act. Aman, being 17, cannot be bound by the contract. However, the gaming laptop is not a 'necessary' (unlike food, clothing, education), so the minor cannot be forced to pay. The token amount of ₹20,000 can be recovered because the contract is void.",
    subject: 'Legal',
    difficulty: 'medium',
    topic: 'Contract Law - Minor'
  },
  {
    passage: "Principle: Under the Bharatiya Nyaya Sanhita (BNS), 2023, Section 100 defines 'culpable homicide' as causing death with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with knowledge that the act is likely to cause death. Murder (Section 101) is culpable homicide committed with the intention of causing death and showing extreme brutality or depravity.\n\nFacts: During a heated argument, X picks up a heavy iron rod and strikes Y on the head. Y falls unconscious. X, believing Y is dead, leaves the scene. Y dies two hours later from the head injury. X claims he only intended to teach Y a lesson, not to kill.",
    question: "What offence has X committed?",
    options: [
      "Culpable homicide not amounting to murder, because X did not intend to kill.",
      "Murder, because striking with an iron rod on the head shows intention to cause death.",
      "Hurt under Section 115, because Y died after X left and X had no knowledge of the fatal outcome.",
      "Attempt to murder, because X believed Y was dead when he left."
    ],
    correctIndex: 1,
    explanation: "Striking a person on the head with a heavy iron rod is an act that is not only likely to cause death but shows clear intention to cause death or at least grievous bodily injury. Under Section 101 of BNS, this constitutes murder. The fact that X believed Y was dead when he left does not change the nature of the act.",
    subject: 'Legal',
    difficulty: 'hard',
    topic: 'Criminal Law - Murder'
  },
  {
    passage: "Principle: Article 14 of the Constitution guarantees equality before the law. However, reasonable classification is permitted if it is based on an intelligible differentia and has a rational nexus with the object sought to be achieved.\n\nFacts: The State of X passes a law reserving 30% of government contracts for businesses owned by women. The law's objective is to promote women's economic empowerment. A male-owned business challenges the law as violative of Article 14.",
    question: "Is the law constitutional?",
    options: [
      "No, because Article 14 prohibits any classification based on gender.",
      "Yes, because gender is an intelligible differentia and economic empowerment of women is a legitimate state objective.",
      "No, because the classification must be based on economic criteria, not gender.",
      "Yes, but only if the reservation is limited to 10% as per Supreme Court precedent."
    ],
    correctIndex: 1,
    explanation: "The classification based on gender (women-owned businesses) satisfies the test of reasonable classification under Article 14: (1) there is an intelligible differentia (women have historically faced economic discrimination), and (2) there is a rational nexus with the objective (promoting women's economic empowerment).",
    subject: 'Legal',
    difficulty: 'medium',
    topic: 'Constitutional Law - Article 14'
  },
  {
    passage: "Principle: Under the doctrine of strict liability (Rylands v. Fletcher), a person who brings onto their land anything likely to cause mischief if it escapes is liable for any damage caused by its escape, even without negligence. Exceptions include: (a) act of a stranger, (b) act of God, (c) plaintiff's own default, and (d) consent of the plaintiff.\n\nFacts: Priya operates a chemical storage facility on her property. A terrorist organization hacks into the facility's computer system and deliberately releases toxic chemicals into the nearby river. The chemicals contaminate the water supply of a downstream village, causing illness.",
    question: "Is Priya strictly liable?",
    options: [
      "Yes, because toxic chemicals are inherently dangerous and escaped from her facility.",
      "No, because the release was caused by the act of a stranger (terrorist), which is a recognized exception.",
      "Yes, because computer security is part of the facility's operations and failure to prevent hacking is negligence.",
      "No, because the villagers consented to the risk by living near an industrial area."
    ],
    correctIndex: 1,
    explanation: "The act of a stranger (the terrorist organization) is a recognized exception to strict liability under Rylands v. Fletcher. The hacking by an external terrorist organization qualifies as the 'act of a stranger' defence, as Priya did not cause the escape.",
    subject: 'Legal',
    difficulty: 'hard',
    topic: 'Torts - Strict Liability'
  },
  {
    passage: "Principle: Under the Transfer of Property Act, 1882, a lease is a transfer of a right to enjoy immovable property for a certain time. The lessee is bound to disclose any material facts known to them that increase the value of the property but are unknown to the lessor. The lessor must disclose any material defect in title.\n\nFacts: Rajesh leases a commercial property to Sunil for 5 years. Rajesh knows that the property has a structural defect in the foundation but does not disclose this. Sunil discovers the defect after 6 months and spends ₹5 lakh on repairs. Sunil stops paying rent, claiming the lease is voidable due to non-disclosure.",
    question: "What is the legal position?",
    options: [
      "The lease is void because the lessor failed to disclose a material defect in title.",
      "Sunil can claim damages but must continue paying rent; the lease is not voidable for defects in property condition.",
      "The lease is voidable at Sunil's option because Rajesh failed to disclose a material fact affecting the property's value.",
      "Sunil is estopped from claiming any remedy because he inspected the property before leasing."
    ],
    correctIndex: 2,
    explanation: "Under the Transfer of Property Act, the lessor must disclose any material defect in title or any material fact that affects the value of the property. A structural defect in the foundation is a material fact that affects the property's value and usability. The lessee's remedy is to treat the lease as voidable and claim damages.",
    subject: 'Legal',
    difficulty: 'medium',
    topic: 'Property Law - Lease'
  },
  {
    passage: "Principle: Under the BNS, abetment involves intentionally aiding, instigating, or conspiring to commit an offence. An abettor is liable to the same punishment as the principal offender if the offence is committed in consequence of the abetment.\n\nFacts: Karan tells Rohan that their business partner, Sanjay, has been embezzling funds. Karan suggests that Rohan should 'teach Sanjay a lesson.' Rohan assaults Sanjay, causing grievous hurt. Karan claims he only meant for Rohan to confront Sanjay verbally and did not intend for violence.",
    question: "Is Karan liable for abetment?",
    options: [
      "No, because Karan did not explicitly instruct Rohan to use violence.",
      "Yes, because 'teach a lesson' in the context of a dispute about embezzlement is sufficiently instigating.",
      "No, because Karan did not physically participate in the assault.",
      "Yes, but only for simple hurt, not grievous hurt, because Karan did not foresee the severity of the injury."
    ],
    correctIndex: 1,
    explanation: "Abetment by instigation can be through express or implied conduct. The phrase 'teach him a lesson' in the context of a serious accusation (embezzlement) is sufficiently suggestive of violence to constitute instigation. Karan need not have explicitly asked for violence; it is enough that he knowingly suggested an action likely to result in an offence.",
    subject: 'Legal',
    difficulty: 'hard',
    topic: 'Criminal Law - Abetment'
  },
  {
    passage: "Principle: Fundamental Rights under Part III of the Constitution are justiciable. However, reasonable restrictions can be imposed on most rights in the interest of public order, morality, health, and sovereignty. Article 19(2) specifically allows restrictions on freedom of speech and expression.\n\nFacts: The State of Y enacts a law prohibiting all social media posts that criticize government policies, citing the need to maintain 'public order and social harmony.' A journalist challenges the law as violative of Article 19(1)(a).",
    question: "Is the law constitutionally valid?",
    options: [
      "Yes, because public order is a ground for reasonable restriction under Article 19(2).",
      "No, because a blanket ban on criticism of government policies is not a reasonable restriction and violates the essence of free speech.",
      "Yes, because social media posts can incite violence and must be regulated.",
      "No, because only the Parliament can regulate social media, not state legislatures."
    ],
    correctIndex: 1,
    explanation: "While public order is a valid ground for reasonable restriction under Article 19(2), the restriction must be 'reasonable' — meaning it must be narrowly tailored, proportionate, and not excessive. A blanket prohibition on all criticism of government policies is disproportionate and arbitrary. The Supreme Court has consistently held that criticism of government is the essence of democratic discourse.",
    subject: 'Legal',
    difficulty: 'medium',
    topic: 'Constitutional Law - Article 19'
  },

  // ─── CURRENT AFFAIRS & GK (6 questions) ───
  {
    passage: "",
    question: "Which constitutional article was cited by the Supreme Court in its 2026 judgment recognizing the 'Right to be Forgotten'?",
    options: ["Article 19", "Article 21", "Article 14", "Article 32"],
    correctIndex: 1,
    explanation: "The Supreme Court held that the Right to be Forgotten is part of the Right to Privacy, which is protected under Article 21 (Right to Life and Personal Liberty) as established in the Puttaswamy judgment.",
    subject: 'GK',
    difficulty: 'easy',
    topic: 'Constitutional Law'
  },
  {
    passage: "",
    question: "What is the target year for India's net-zero emissions under the updated COP31 pledge?",
    options: ["2070", "2065", "2050", "2040"],
    correctIndex: 1,
    explanation: "At COP31 in Belem, Brazil, India announced an accelerated net-zero target of 2065, five years earlier than the previously committed 2070.",
    subject: 'GK',
    difficulty: 'easy',
    topic: 'Climate Change'
  },
  {
    passage: "",
    question: "Which country partnered with India for the first commercial semiconductor fabrication plant in Dholera, Gujarat?",
    options: ["Taiwan (TSMC)", "USA (Intel)", "Taiwan (PSMC)", "South Korea (Samsung)"],
    correctIndex: 2,
    explanation: "India's first commercial semiconductor fab is a Tata Electronics-PSMC (Powerchip Semiconductor Manufacturing Corp) joint venture in Dholera, Gujarat.",
    subject: 'GK',
    difficulty: 'medium',
    topic: 'Science & Technology'
  },
  {
    passage: "",
    question: "What is the carbon price per tonne of CO2 proposed for heavy industry under India's new COP31 NDC?",
    options: ["₹1,000", "₹1,500", "₹2,500", "₹5,000"],
    correctIndex: 2,
    explanation: "India's new NDC includes a binding carbon pricing mechanism of ₹2,500 per tonne of CO2 for steel, cement, and power sectors, effective April 2027.",
    subject: 'GK',
    difficulty: 'hard',
    topic: 'Climate Policy'
  },
  {
    passage: "",
    question: "Which Indian athlete won the gold medal in men's javelin at the Paris 2026 Olympics?",
    options: ["Neeraj Chopra", "Kishore Jena", "Manu DP", "Rohit Yadav"],
    correctIndex: 0,
    explanation: "Neeraj Chopra won the gold medal in men's javelin at the Paris 2026 Olympics, as part of India's record 12-medal performance.",
    subject: 'GK',
    difficulty: 'easy',
    topic: 'Sports'
  },
  {
    passage: "",
    question: "Under the Wildlife Protection (Amendment) Act 2026, what is the maximum penalty for intentional introduction of invasive species?",
    options: ["₹10 lakh fine", "₹25 lakh and 3 years", "₹50 lakh and 7 years", "₹1 crore and 10 years"],
    correctIndex: 2,
    explanation: "The Act prescribes up to 7 years imprisonment and ₹50 lakh fine for intentional introduction of invasive species classified as biodiversity threats.",
    subject: 'GK',
    difficulty: 'medium',
    topic: 'Environmental Law'
  },

  // ─── LOGICAL REASONING (6 questions) ───
  {
    passage: "The government has proposed a new policy requiring all social media companies to verify the identity of every user before allowing them to post content. Proponents argue this will reduce misinformation and hate speech. Opponents argue it will violate privacy and suppress free expression, particularly for marginalized communities and political dissidents. A study in a country with similar laws found that verified identity requirements reduced misinformation by 30% but also caused a 45% drop in political discourse from minority groups.",
    question: "Which of the following best describes the author's underlying assumption?",
    options: [
      "Social media companies are capable of securely storing user identity data.",
      "The reduction in misinformation justifies the suppression of minority political discourse.",
      "There is a trade-off between reducing misinformation and protecting free expression.",
      "Marginalized communities are more likely to spread misinformation than other groups."
    ],
    correctIndex: 2,
    explanation: "The passage presents both benefits (reduced misinformation) and costs (suppressed discourse) of the policy without taking a definitive stance. The underlying assumption is that these two goals are in tension — improving one comes at the cost of the other. This is the classic trade-off assumption that underlies the entire debate structure of the passage.",
    subject: 'Logical',
    difficulty: 'medium',
    topic: 'Inference'
  },
  {
    passage: "All successful lawyers have excellent analytical skills. Some people with excellent analytical skills are not good at public speaking. All Supreme Court judges are successful lawyers. Some Supreme Court judges are also accomplished authors.",
    question: "Which of the following conclusions can be validly drawn?",
    options: [
      "All accomplished authors have excellent analytical skills.",
      "Some people with excellent analytical skills are accomplished authors.",
      "No successful lawyer is good at public speaking.",
      "All Supreme Court judges are good at public speaking."
    ],
    correctIndex: 1,
    explanation: "From the premises: All Supreme Court judges are successful lawyers → all have excellent analytical skills. Some Supreme Court judges are accomplished authors. Therefore, some accomplished authors (those who are Supreme Court judges) have excellent analytical skills. This means some people with excellent analytical skills are accomplished authors.",
    subject: 'Logical',
    difficulty: 'medium',
    topic: 'Syllogisms'
  },
  {
    passage: "A survey of 1,000 CLAT aspirants found that those who studied for more than 6 hours daily had a 15% higher mock test score than those who studied less. However, aspirants who studied more than 8 hours daily showed signs of burnout and their scores plateaued. The researchers concluded that the optimal study duration for CLAT preparation is between 6 and 8 hours daily.",
    question: "Which of the following, if true, would most weaken the researchers' conclusion?",
    options: [
      "The survey only included aspirants from metropolitan cities.",
      "Aspirants who studied between 6-8 hours had access to paid coaching, while others did not.",
      "The survey was conducted during a period when no major CLAT exams were scheduled.",
      "Some aspirants who studied less than 6 hours scored higher than those in the 6-8 hour group."
    ],
    correctIndex: 1,
    explanation: "If the 6-8 hour group had access to paid coaching while others did not, the observed score difference might be due to coaching quality rather than study duration. This introduces an alternative explanation (confounding variable) that weakens the causal conclusion about optimal study duration.",
    subject: 'Logical',
    difficulty: 'hard',
    topic: 'Critical Reasoning'
  },
  {
    passage: "In a city, all parks have benches. Some benches are made of wood. No wooden structure is maintenance-free. All parks have walking paths.",
    question: "Which of the following must be true?",
    options: [
      "All walking paths are maintenance-free.",
      "Some parks have structures that are not maintenance-free.",
      "No park has a wooden bench.",
      "All benches are in parks."
    ],
    correctIndex: 1,
    explanation: "All parks have benches. Some benches are made of wood. No wooden structure is maintenance-free. Therefore, some benches (the wooden ones) are not maintenance-free. Since all parks have benches, and some benches are not maintenance-free, it follows that some parks have structures (benches) that are not maintenance-free.",
    subject: 'Logical',
    difficulty: 'medium',
    topic: 'Deductive Reasoning'
  },
  {
    passage: "The head of a law firm argues that junior associates should be required to work 80-hour weeks. He claims this is necessary because: (1) clients demand rapid response times, (2) complex cases require extensive research, and (3) the firm's competitors have similar work cultures. A junior associate responds that long hours reduce productivity, increase errors, and cause high attrition rates.",
    question: "The junior associate's response most closely parallels which of the following arguments?",
    options: [
      "A factory owner argues that workers should operate machinery faster; a worker responds that faster speeds cause more accidents and defective products.",
      "A teacher argues that students should take more subjects; a student responds that more subjects lead to broader knowledge.",
      "A coach argues that athletes should train longer; an athlete responds that longer training improves stamina.",
      "A manager argues that stores should stay open later; an employee responds that longer hours increase sales."
    ],
    correctIndex: 0,
    explanation: "The junior associate's response follows a specific pattern: a person in authority argues for increased workload/intensity, and the subordinate responds by pointing out that the increased intensity actually causes negative outcomes (reduced quality, accidents, attrition). Option A matches this pattern exactly.",
    subject: 'Logical',
    difficulty: 'medium',
    topic: 'Argument Analysis'
  },
  {
    passage: "Professor Sharma claims that students who attend morning classes perform better on exams than those who attend evening classes. To support this, he cites a study showing that morning-class students scored 12% higher on average. However, the morning classes are taught by senior professors, while evening classes are taught by teaching assistants. Additionally, morning classes are smaller (30 students vs. 80 in evening classes).",
    question: "Which of the following best describes the flaw in Professor Sharma's argument?",
    options: [
      "He assumes that correlation implies causation without controlling for confounding variables.",
      "He relies on a study with too small a sample size to be statistically significant.",
      "He fails to consider that some students may attend both morning and evening classes.",
      "He does not explain why morning classes are preferred by senior professors."
    ],
    correctIndex: 0,
    explanation: "Professor Sharma observes a correlation (morning classes → higher scores) and concludes causation (morning timing causes better performance). However, there are two major confounding variables: (1) morning classes are taught by more experienced senior professors, and (2) morning classes have smaller sizes. The flaw is assuming that the time of day is the causal factor without ruling out these alternative explanations.",
    subject: 'Logical',
    difficulty: 'medium',
    topic: 'Flawed Reasoning'
  },

  // ─── ENGLISH (5 questions) ───
  {
    passage: "The proliferation of artificial intelligence in creative fields has sparked an intense debate about the nature of authorship. Critics argue that AI-generated content lacks the 'soul' of human creativity — the emotional resonance that comes from lived experience. Proponents counter that AI is merely a tool, like a camera or a word processor, and that the creative vision still resides in the human who prompts, curates, and refines the output. Yet both sides may be missing a more fundamental question: not whether AI can be creative, but whether our current legal frameworks for copyright and attribution are adequate for an era of machine-assisted creation. The concept of a 'sole author' may itself be an anachronism in a world where every creative work is a collaborative synthesis of human intention and computational capability.",
    question: "What is the primary purpose of the passage?",
    options: [
      "To argue that AI-generated content should not be eligible for copyright protection.",
      "To suggest that the debate about AI creativity is framed around the wrong question.",
      "To prove that AI is capable of emotional resonance in creative works.",
      "To defend the use of AI as a legitimate creative tool comparable to cameras."
    ],
    correctIndex: 1,
    explanation: "The passage begins by describing the debate between critics and proponents of AI in creative fields. Then, in the third sentence, it pivots to its main point: 'both sides may be missing a more fundamental question.' The author argues that the real issue is not whether AI is creative, but whether our legal frameworks are adequate. The primary purpose is to reframe the debate around a more fundamental question about legal frameworks rather than the nature of creativity itself.",
    subject: 'English',
    difficulty: 'medium',
    topic: 'Reading Comprehension'
  },
  {
    passage: "The decline of print journalism is not merely a technological transition but a civic catastrophe. Local newspapers, which once held municipal power to account, have shuttered at an alarming rate. The resulting 'news deserts' — communities without local journalism — have seen increased corruption, lower voter turnout, and a decline in civic engagement. Digital platforms have not filled this void; algorithms prioritize sensationalism over substance, and national outlets rarely cover local governance. The solution is not nostalgia for newsprint but a radical reinvention of local journalism funding models, perhaps through public-private partnerships or direct civic subsidies.",
    question: "Which of the following best captures the tone of the passage?",
    options: [
      "Dispassionate and analytical",
      "Alarmed but constructive",
      "Nostalgic and resigned",
      "Sarcastic and dismissive"
    ],
    correctIndex: 1,
    explanation: "The passage describes a serious problem ('civic catastrophe,' 'alarming rate') with language that conveys concern and alarm. However, it ends with a constructive proposal: 'a radical reinvention of local journalism funding models.' The tone is not merely alarmist (it offers solutions) nor is it purely analytical (it has a clear point of view). 'Alarmed but constructive' best captures both the concern about the problem and the proactive approach to solving it.",
    subject: 'English',
    difficulty: 'medium',
    topic: 'Tone Analysis'
  },
  {
    passage: "The philosopher argued that legal systems are not merely instruments of social control but are, in fact, the scaffolding of civilization itself. Without a shared framework of rules and consequences, he contended, human societies would descend into what he called 'the war of all against all' — a condition in which the strong dominate the weak not through legitimate authority but through brute force. This view, while compelling, has been challenged by anthropologists who point to pre-legal societies that maintained order through kinship networks and ritual rather than codified law. The debate, therefore, is not whether law is necessary, but whether it is sufficient — or even primary — in the architecture of social order.",
    question: "The phrase 'scaffolding of civilization' is used to suggest that law is:",
    options: [
      "A temporary structure that will eventually be replaced by more advanced systems.",
      "The underlying support structure that enables civilization to exist and develop.",
      "A restrictive framework that limits the natural evolution of human societies.",
      "A decorative element that adds prestige but is not functionally essential."
    ],
    correctIndex: 1,
    explanation: "Scaffolding is a temporary structure used to support buildings during construction. In the metaphorical sense used here, law is described as the 'scaffolding of civilization' — meaning it provides the essential support structure that holds civilization together and enables it to develop. The philosopher argues that without this support (law), society would collapse into chaos.",
    subject: 'English',
    difficulty: 'easy',
    topic: 'Vocabulary in Context'
  },
  {
    passage: "The historian's revisionist account of the independence movement has been both praised and criticized. Supporters commend her for uncovering the contributions of marginalized communities — peasants, women, and tribal groups — whose roles had been erased from the dominant narrative. Critics, however, accuse her of 'presentism' — interpreting past events through the lens of contemporary values rather than understanding them in their historical context. The controversy reveals a tension that haunts all historical writing: the need to recover lost voices while remaining faithful to the complexities of the past.",
    question: "The author's attitude toward the historian's work can best be described as:",
    options: [
      "Unreservedly admiring of her courage in challenging established narratives.",
      "Dismissive of both her supporters and critics as missing the larger point.",
      "Balanced, acknowledging both the value and the limitations of her approach.",
      "Critical, suggesting that her method fundamentally undermines historical scholarship."
    ],
    correctIndex: 2,
    explanation: "The author presents both sides of the debate fairly: supporters praise the recovery of marginalized voices, while critics raise the valid concern of presentism. The concluding sentence frames the issue as a 'tension that haunts all historical writing,' suggesting that both perspectives have merit. This balanced presentation of both praise and criticism indicates a balanced, nuanced attitude.",
    subject: 'English',
    difficulty: 'medium',
    topic: "Author's Tone"
  },
  {
    passage: "Despite the overwhelming evidence that climate change poses an existential threat, policymakers have been remarkably slow to implement meaningful reforms. The reasons for this inertia are manifold: the short electoral cycles that discourage long-term planning, the economic interests that benefit from the status quo, and the psychological difficulty of responding to threats that unfold gradually rather than catastrophically. Yet history offers a sobering parallel: the lead-up to the 2008 financial crisis, when warning signs were abundant but action was deferred until catastrophe struck. The question is whether democratic institutions are structurally capable of addressing slow-moving crises — or whether they require the shock of disaster to catalyze change.",
    question: "Which of the following would be the most appropriate title for this passage?",
    options: [
      "The Economic Roots of Climate Inaction",
      "Democracy's Blind Spot: Why Societies Ignore Slow-Moving Crises",
      "The 2008 Financial Crisis: A Warning for Climate Policy",
      "Climate Change: The Existential Threat We Refuse to See"
    ],
    correctIndex: 1,
    explanation: "While the passage discusses climate change, its primary focus is on the structural reasons why democratic systems struggle to respond to slow-moving crises. The 2008 financial crisis is used as a parallel, not as the main subject. The passage ends with a question about whether democratic institutions are capable of addressing such crises. 'Democracy's Blind Spot: Why Societies Ignore Slow-Moving Crises' captures this broader theme better than titles focused only on climate change or the financial crisis.",
    subject: 'English',
    difficulty: 'hard',
    topic: 'Main Idea'
  },

  // ─── QUANTITATIVE TECHNIQUES (5 questions) ───
  {
    passage: "A law firm handles three types of cases: Civil, Criminal, and Corporate. The ratio of Civil to Criminal cases is 3:2, and the ratio of Criminal to Corporate cases is 4:1. In 2025, the firm handled a total of 440 cases.",
    question: "How many Corporate cases did the firm handle?",
    options: ["40", "60", "80", "100"],
    correctIndex: 0,
    explanation: "Civil:Criminal = 3:2 = 6:4 (multiplying by 2 to match the Criminal term). Criminal:Corporate = 4:1. So Civil:Criminal:Corporate = 6:4:1. Total parts = 6+4+1 = 11. Corporate cases = (1/11) × 440 = 40.",
    subject: 'Quant',
    difficulty: 'medium',
    topic: 'Ratio & Proportion'
  },
  {
    passage: "A shopkeeper marks his goods 40% above the cost price and allows a discount of 15% on the marked price. He also offers an additional 5% cash discount on the discounted price.",
    question: "What is his overall profit percentage?",
    options: ["13.2%", "15.5%", "12.9%", "18.4%"],
    correctIndex: 0,
    explanation: "Let CP = 100. MP = 140. After 15% discount: SP = 140 × 0.85 = 119. After additional 5% cash discount: Final SP = 119 × 0.95 = 113.05. Profit = 113.05 - 100 = 13.05. Profit % = 13.05% ≈ 13.2% (closest option).",
    subject: 'Quant',
    difficulty: 'medium',
    topic: 'Profit & Loss'
  },
  {
    passage: "The average of 5 numbers is 28. If one number is excluded, the average of the remaining 4 numbers becomes 25.",
    question: "What is the excluded number?",
    options: ["35", "40", "45", "50"],
    correctIndex: 1,
    explanation: "Sum of 5 numbers = 5 × 28 = 140. Sum of 4 numbers = 4 × 25 = 100. Excluded number = 140 - 100 = 40.",
    subject: 'Quant',
    difficulty: 'easy',
    topic: 'Averages'
  },
  {
    passage: "A train 200 metres long crosses a platform 300 metres long in 30 seconds.",
    question: "What is the speed of the train in km/hr?",
    options: ["54", "60", "72", "48"],
    correctIndex: 1,
    explanation: "Total distance = train length + platform length = 200 + 300 = 500 metres. Time = 30 seconds. Speed = 500/30 = 50/3 m/s = (50/3) × (18/5) = 60 km/hr.",
    subject: 'Quant',
    difficulty: 'easy',
    topic: 'Time, Speed & Distance'
  },
  {
    passage: "In an election, 10% of the votes were invalid. The winner got 60% of the valid votes and won by a margin of 3,600 votes.",
    question: "What was the total number of votes cast?",
    options: ["30,000", "25,000", "20,000", "18,000"],
    correctIndex: 2,
    explanation: "Let total votes = T. Valid votes = 0.90T. Winner = 60% of 0.90T = 0.54T. Loser = 40% of 0.90T = 0.36T. Margin = 0.54T - 0.36T = 0.18T = 3,600. So T = 3,600/0.18 = 20,000.",
    subject: 'Quant',
    difficulty: 'medium',
    topic: 'Percentage'
  }
];

export const getQuestionsBySubject = (subject: MockQuestion['subject']) =>
  MOCK_QUESTIONS.filter(q => q.subject === subject);

export const getQuestionsByDifficulty = (difficulty: MockQuestion['difficulty']) =>
  MOCK_QUESTIONS.filter(q => q.difficulty === difficulty);

export const getRandomQuestions = (count: number, subject?: MockQuestion['subject']) => {
  const pool = subject ? getQuestionsBySubject(subject) : MOCK_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
