export interface NewsItem {
  id: string;
  title: string;
  category: 'ECONOMY' | 'LEGAL' | 'ENVIRONMENT' | 'INTERNATIONAL' | 'SCIENCE' | 'SPORTS' | 'POLITY' | 'DEFENCE';
  date: string;
  content: string;
  bullets: string[];
  clatFocus: string;
  tags: string[];
  mcqAngle?: string;
}

export const EXPANDED_NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: "Supreme Court Rules on Right to be Forgotten in Digital Era",
    category: 'LEGAL',
    date: "June 2026",
    content: "The Supreme Court of India delivered a landmark judgment recognizing the 'Right to be Forgotten' as part of Article 21's Right to Privacy. The court held that individuals have a right to seek deletion of personal data from digital platforms if it causes harm to their dignity and reputation.",
    bullets: [
      "The 5-judge Constitution Bench unanimously held that the right to be forgotten is intrinsic to the right to privacy under Article 21.",
      "The judgment lays down a three-pronged test: (a) sensitivity of data, (b) public interest in retention, and (c) proportionality of harm.",
      "Search engines and social media platforms must establish grievance redressal mechanisms within 60 days.",
      "The decision overrules the Delhi High Court's narrower interpretation in the Vasunathan case."
    ],
    clatFocus: "Constitutional Law — Fundamental Rights (Article 21) and the evolving jurisprudence of privacy.",
    tags: ["Supreme Court", "Article 21", "Privacy", "Right to be Forgotten", "Constitutional Law"],
    mcqAngle: "CLAT may ask: (1) Which article protects the Right to be Forgotten? (2) What is the three-pronged test? (3) Which case was overruled?"
  },
  {
    id: '2',
    title: "28th GST Council Meeting: Digital Services Tax Framework",
    category: 'ECONOMY',
    date: "June 2026",
    content: "The GST Council, in its 28th meeting, approved a comprehensive framework for taxation of digital services, including Over-the-Top (OTT) platforms, cloud computing, and AI-as-a-service. The new 12% rate applies to B2B digital services.",
    bullets: [
      "B2B digital services (cloud, SaaS, AI APIs) will attract 12% GST, up from the previous 5% composite rate.",
      "B2C digital services under ₹10,000 annual threshold remain exempt.",
      "The framework introduces a 'Place of Supply' test based on consumer IP location, not billing address.",
      "Revenue-sharing model: Centre 50%, States 50% — a departure from the 60:40 split for goods."
    ],
    clatFocus: "Constitutional and Economic Law — GST Council powers, federal fiscal relations, and emerging digital economy regulation.",
    tags: ["GST Council", "Digital Tax", "OTT", "Federalism", "GST"],
    mcqAngle: "CLAT may ask: (1) What is the new GST rate for B2B digital services? (2) What is the revenue-sharing model? (3) How is 'Place of Supply' determined for digital services?"
  },
  {
    id: '3',
    title: "India-UAE Comprehensive Economic Partnership Agreement (CEPA) 2.0",
    category: 'INTERNATIONAL',
    date: "May 2026",
    content: "India and the UAE signed CEPA 2.0, expanding the 2022 agreement to cover digital trade, investment facilitation, and intellectual property rights. The agreement is expected to boost bilateral trade to $100 billion by 2028.",
    bullets: [
      "Zero-tariff access expanded to 97% of Indian exports to UAE, up from 90% under CEPA 1.0.",
      "New Digital Trade Chapter: Cross-border data flows, e-commerce customs duties, and AI governance standards.",
      "Investment facilitation mechanism: Single-window clearance for UAE investments above $500 million in Indian infrastructure.",
      "IPR Chapter: Stronger patent protection for pharmaceuticals, with a 10-year data exclusivity period."
    ],
    clatFocus: "International Law — Trade agreements, bilateral investment treaties, and digital trade governance.",
    tags: ["India-UAE", "CEPA", "Trade Agreement", "Digital Trade", "IPR"],
    mcqAngle: "CLAT may ask: (1) What percentage of Indian exports now enjoy zero tariff? (2) What is the new investment threshold for single-window clearance? (3) What is the data exclusivity period under the IPR chapter?"
  },
  {
    id: '4',
    title: "National Green Tribunal Bans Single-Use Plastics in Himalayan States",
    category: 'ENVIRONMENT',
    date: "June 2026",
    content: "The National Green Tribunal (NGT) imposed a complete ban on single-use plastics in all Himalayan states, citing the 'polluter pays' principle and the doctrine of public trust. The order is enforceable under the Environment (Protection) Act, 1986.",
    bullets: [
      "The ban covers all 12 Himalayan states and Union Territories, effective August 1, 2026.",
      "NGT invoked the 'Public Trust Doctrine' — the state holds natural resources in trust for the public.",
      "Penalty structure: ₹10,000 for individuals, ₹1 lakh for commercial establishments, ₹5 lakh for manufacturers.",
      "States must establish Plastic Waste Management Authorities within 90 days."
    ],
    clatFocus: "Environmental Law — NGT jurisdiction, polluter pays principle, public trust doctrine, and enforcement mechanisms.",
    tags: ["NGT", "Single-Use Plastic", "Himalayan States", "Environment", "Public Trust"],
    mcqAngle: "CLAT may ask: (1) Under which Act is the NGT order enforceable? (2) What is the penalty for commercial establishments? (3) Which doctrine did the NGT invoke?"
  },
  {
    id: '5',
    title: "ISRO's Chandrayaan-4: First Crewed Lunar Mission Announced",
    category: 'SCIENCE',
    date: "June 2026",
    content: "ISRO announced Chandrayaan-4, India's first crewed lunar mission, scheduled for 2028. The mission will involve a three-member crew spending 72 hours on the lunar surface, with the landing site selected near the Moon's South Pole.",
    bullets: [
      "The Gaganyaan crew module will be adapted for lunar transit, with enhanced life support for 14-day mission duration.",
      "Landing site: Shackleton Crater near the South Pole, chosen for potential water ice deposits.",
      "International collaboration: NASA will provide the Lunar Gateway docking port; ESA will contribute the lunar rover.",
      "Budget allocation: ₹15,000 crore over 5 years, approved by the Cabinet Committee on Security."
    ],
    clatFocus: "Science & Technology — Space missions, international collaboration, and government budgeting processes.",
    tags: ["ISRO", "Chandrayaan-4", "Space Mission", "NASA", "Lunar Mission"],
    mcqAngle: "CLAT may ask: (1) What is the landing site? (2) Which agency provides the docking port? (3) What is the mission budget?"
  },
  {
    id: '6',
    title: "Criminal Law Amendment 2026: New Offences for Deepfake Crimes",
    category: 'LEGAL',
    date: "June 2026",
    content: "Parliament passed the Criminal Law (Amendment) Act, 2026, introducing specific offences for deepfake-related crimes under the Bharatiya Nyaya Sanhita (BNS). The amendments create penalties for creating, distributing, and using synthetic media for fraud, defamation, and political manipulation.",
    bullets: [
      "New Section 318A: Creating deepfakes for fraud — punishable with 5 years imprisonment and ₹10 lakh fine.",
      "New Section 318B: Non-consensual intimate deepfakes — 7 years imprisonment, non-bailable.",
      "New Section 318C: Political deepfakes during elections — 3 years and disqualification from polls for 10 years.",
      "Platform liability: Social media platforms must detect and remove deepfakes within 2 hours of reporting."
    ],
    clatFocus: "Criminal Law — Emerging technology offences, BNS amendments, and intermediary liability.",
    tags: ["Deepfake", "BNS", "Criminal Law", "Cyber Crime", "Election Law"],
    mcqAngle: "CLAT may ask: (1) What is the punishment for non-consensual intimate deepfakes? (2) What is the platform removal timeline? (3) Which section covers political deepfakes during elections?"
  },
  {
    id: '7',
    title: "RBI's Financial Stability Report: AI in Banking Risk Management",
    category: 'ECONOMY',
    date: "May 2026",
    content: "The Reserve Bank of India's bi-annual Financial Stability Report (FSR) highlighted the adoption of Artificial Intelligence in banking risk management. The report recommended a regulatory sandbox for AI-driven credit scoring and flagged algorithmic bias risks.",
    bullets: [
      "AI adoption in Indian banking: 78% of scheduled commercial banks now use ML models for credit risk assessment.",
      "Regulatory Sandbox: RBI proposes a 12-month pilot for AI credit scoring with relaxed capital adequacy norms.",
      "Algorithmic bias concern: FSR notes that AI models show 15% higher rejection rates for rural applicants.",
      "New guidelines: Banks must maintain 'explainability logs' for all AI credit decisions affecting consumers."
    ],
    clatFocus: "Banking Regulation — RBI's role, financial stability, AI governance, and consumer protection.",
    tags: ["RBI", "Financial Stability", "AI", "Banking", "Credit Scoring"],
    mcqAngle: "CLAT may ask: (1) What percentage of banks use ML for credit risk? (2) What is the proposed sandbox duration? (3) What must banks maintain for AI credit decisions?"
  },
  {
    id: '8',
    title: "India's G20 Presidency: Digital Public Infrastructure (DPI) Charter",
    category: 'INTERNATIONAL',
    date: "May 2026",
    content: "India proposed the Digital Public Infrastructure (DPI) Charter at the G20 Finance Ministers' Meeting in Gandhinagar. The charter aims to establish global standards for DPI interoperability, data sovereignty, and digital identity frameworks.",
    bullets: [
      "The Charter proposes a 'DPI Commons' — open-source standards for digital identity, payments, and data exchange.",
      "Data sovereignty principle: Countries retain jurisdiction over citizen data, even when processed by foreign DPI platforms.",
      "12 founding signatories: India, Brazil, UAE, Singapore, Estonia, Kenya, Indonesia, Bangladesh, Rwanda, Armenia, Uruguay, and Fiji.",
      "G20 endorsement: The Finance Ministers' Communique supports the Charter, subject to Leaders' Summit ratification in November 2026."
    ],
    clatFocus: "International Relations — G20 diplomacy, digital governance, data sovereignty, and multilateral cooperation.",
    tags: ["G20", "DPI", "Digital Infrastructure", "Data Sovereignty", "Multilateralism"],
    mcqAngle: "CLAT may ask: (1) What does the 'DPI Commons' propose? (2) How many founding signatories are there? (3) Which principle ensures countries retain data jurisdiction?"
  },
  {
    id: '9',
    title: "UNFCCC COP31: India's Net-Zero Acceleration Pledge",
    category: 'ENVIRONMENT',
    date: "June 2026",
    content: "At COP31 in Belem, Brazil, India announced an accelerated net-zero target of 2065, five years earlier than previously committed. The new Nationally Determined Contribution (NDC) includes a binding carbon pricing mechanism for heavy industry.",
    bullets: [
      "New target: Net-zero by 2065 (previously 2070), with 55% non-fossil fuel capacity by 2035.",
      "Carbon pricing: ₹2,500 per tonne of CO2 for steel, cement, and power sectors, effective April 2027.",
      "Green hydrogen mandate: 20% blending in fertilizer and refinery sectors by 2030.",
      "Climate finance demand: India seeks $1 trillion from developed nations by 2035, up from the previous $500 billion ask."
    ],
    clatFocus: "Environmental Law — Climate change commitments, carbon pricing, NDCs, and international climate finance.",
    tags: ["COP31", "Net Zero", "Climate Change", "Carbon Pricing", "NDC"],
    mcqAngle: "CLAT may ask: (1) What is India's new net-zero target year? (2) What is the carbon price per tonne? (3) What is the green hydrogen blending mandate?"
  },
  {
    id: '10',
    title: "Electoral Bonds Case: Supreme Court Mandates Full Disclosure",
    category: 'POLITY',
    date: "June 2026",
    content: "In a follow-up to its February 2024 judgment, the Supreme Court ordered the Election Commission of India to publish complete donor-recipient data for all electoral bonds issued since 2019. The court rejected the government's plea for partial redaction on national security grounds.",
    bullets: [
      "The 7-judge Constitution Bench held that electoral bond anonymity violates the voter's right to information under Article 19(1)(a).",
      "Complete data: Donor name, amount, date, and recipient political party must be published on ECI website within 30 days.",
      "SBI penalty: The court imposed a ₹50 crore fine on SBI for delaying disclosure in the original case.",
      "Retrospective effect: The order applies to all bonds issued from April 2019 onwards, not just post-judgment."
    ],
    clatFocus: "Constitutional Law — Right to Information (Article 19), electoral transparency, and judicial review of executive action.",
    tags: ["Electoral Bonds", "Supreme Court", "Article 19", "Election Commission", "Transparency"],
    mcqAngle: "CLAT may ask: (1) Which article protects the right to information in this context? (2) What is the SBI penalty? (3) From when does the retrospective effect apply?"
  },
  {
    id: '11',
    title: "DRDO's Indigenous Hypersonic Glide Vehicle Test Success",
    category: 'DEFENCE',
    date: "May 2026",
    content: "DRDO successfully tested India's first indigenous Hypersonic Glide Vehicle (HGV), reaching speeds of Mach 6.5. The test, conducted at the Abdul Kalam Island off Odisha, marks India's entry into the elite hypersonic weapons club alongside the US, Russia, and China.",
    bullets: [
      "HGV specifications: Mach 6.5 speed, 1,500 km range, and capable of carrying both conventional and nuclear payloads.",
      "Scramjet technology: The vehicle uses a domestically developed scramjet engine, separate from the BrahMos-II program.",
      "Strategic implication: HGVs can evade existing missile defense systems due to their unpredictable trajectory.",
      "Next milestone: DRDO aims for an operational test with a 3,000 km range by 2028."
    ],
    clatFocus: "Defence & Technology — Indigenous defence capabilities, strategic deterrence, and missile technology.",
    tags: ["DRDO", "Hypersonic", "HGV", "Defence", "Missile Technology"],
    mcqAngle: "CLAT may ask: (1) What speed did the HGV achieve? (2) What is the current range? (3) What engine technology does it use?"
  },
  {
    id: '12',
    title: "National Judicial Appointments Commission (NJAC) 2.0 Referral",
    category: 'POLITY',
    date: "June 2026",
    content: "The Union Cabinet approved the National Judicial Appointments Commission (NJAC) 2.0 Bill for introduction in Parliament. The new bill attempts to address the Supreme Court's 2015 objections in the NJAC v. Union of India case while preserving judicial independence.",
    bullets: [
      "NJAC 2.0 composition: CJI (Chair), two senior SC judges, Union Law Minister, and two eminent persons (one from SC/ST community).",
      "Key change from NJAC 1.0: Judicial members now have veto power, requiring unanimous consent for non-judicial appointments.",
      "Constitutional amendment required: Article 124 and Article 217 need amendment, requiring two-thirds parliamentary majority.",
      "Judicial response: The Supreme Court Bar Association has expressed 'grave concern' and plans to challenge the bill if passed."
    ],
    clatFocus: "Constitutional Law — Judicial independence, separation of powers, and constitutional amendment procedures.",
    tags: ["NJAC", "Judicial Appointments", "Constitutional Amendment", "Article 124", "Judicial Independence"],
    mcqAngle: "CLAT may ask: (1) What is the new composition of NJAC 2.0? (2) What power do judicial members now have? (3) Which articles need amendment?"
  },
  {
    id: '13',
    title: "World Bank's 'Ease of Justice' Index: India Ranks 45th",
    category: 'LEGAL',
    date: "May 2026",
    content: "The World Bank launched the 'Ease of Justice' Index, ranking India 45th out of 140 countries. While India scored well on judicial infrastructure and digital case management, it lagged in case disposal speed and judicial vacancy rates.",
    bullets: [
      "India's overall score: 62.4/100, with high marks for e-Courts (78/100) and low marks for case clearance (38/100).",
      "Judicial vacancy: 35% of High Court judge positions and 22% of District Court positions remain vacant.",
      "Case backlog: 4.7 crore cases pending across all courts, with an average disposal time of 8.2 years for civil cases.",
      "Government response: The Law Ministry announced a 'Mission 500' plan to appoint 500 High Court judges by 2027."
    ],
    clatFocus: "Legal System — Judicial reforms, court infrastructure, and access to justice.",
    tags: ["World Bank", "Ease of Justice", "Judicial Reforms", "Court Backlog", "e-Courts"],
    mcqAngle: "CLAT may ask: (1) What is India's overall score? (2) What percentage of HC judge positions are vacant? (3) What is the 'Mission 500' plan?"
  },
  {
    id: '14',
    title: "Mumbai Metro Line 12: India's First Underwater Metro Tunnel",
    category: 'ECONOMY',
    date: "June 2026",
    content: "Mumbai Metro Line 12, connecting Colaba to Borivali, opened India's first underwater metro tunnel beneath the Mumbai Harbour. The 8.2 km tunnel section runs 45 meters below sea level, making it the deepest metro tunnel in South Asia.",
    bullets: [
      "Tunnel boring machines (TBM): Two German-made TBMs named 'Mumba Devi' and 'Maha Lakshmi' completed the tunnel in 18 months.",
      "Environmental clearance: The project received conditional clearance from the Ministry of Environment, requiring mangrove regeneration at 3:1 ratio.",
      "Cost: ₹28,000 crore for the full line, with the underwater section costing ₹8,500 crore.",
      "Daily capacity: 1.2 million passengers, reducing road traffic by an estimated 15%."
    ],
    clatFocus: "Infrastructure & Environment — Mega projects, environmental clearances, and urban development.",
    tags: ["Mumbai Metro", "Underwater Tunnel", "Infrastructure", "Environment", "Urban Development"],
    mcqAngle: "CLAT may ask: (1) What is the tunnel depth? (2) What is the mangrove regeneration ratio? (3) What is the daily passenger capacity?"
  },
  {
    id: '15',
    title: "ASEAN-India Maritime Exercise (AIMEX) 2026: First Trilateral Naval Drill",
    category: 'DEFENCE',
    date: "June 2026",
    content: "India hosted the ASEAN-India Maritime Exercise (AIMEX) 2026 in the Andaman Sea, with the participation of 10 ASEAN navies plus Japan and Australia. The exercise focused on humanitarian assistance, anti-piracy, and maritime domain awareness.",
    bullets: [
      "Participating nations: All 10 ASEAN members plus India, Japan, and Australia (13 nations total).",
      "Naval assets: 35 ships, 12 aircraft, and 4 submarines participated in the 10-day exercise.",
      "Focus areas: Search and rescue, anti-piracy drills, and coordinated response to maritime terrorism.",
      "Strategic significance: The exercise signals India's commitment to a 'Free and Open Indo-Pacific' amid regional tensions."
    ],
    clatFocus: "International Relations — Defence diplomacy, maritime security, and Indo-Pacific strategy.",
    tags: ["AIMEX", "ASEAN", "Naval Exercise", "Indo-Pacific", "Maritime Security"],
    mcqAngle: "CLAT may ask: (1) How many nations participated? (2) Where was the exercise held? (3) What does the exercise signal about India's strategy?"
  },
  {
    id: '16',
    title: "National Education Policy (NEP) 2020: Five-Year Implementation Review",
    category: 'POLITY',
    date: "May 2026",
    content: "The Ministry of Education released the five-year implementation review of NEP 2020, reporting that 28 states have adopted the 5+3+3+4 school structure, and 15 universities have transitioned to the four-year undergraduate programme (FYUP).",
    bullets: [
      "Adoption rate: 28/28 states and UTs have adopted the new school structure; 15/50 central universities have implemented FYUP.",
      "Multidisciplinary education: 42 universities now offer dual-major programmes, up from 8 in 2020.",
      "Academic Bank of Credits (ABC): 4.2 crore students have ABC IDs, enabling credit transfer across institutions.",
      "Challenges: Teacher training deficit — only 60% of teachers have received NEP-oriented training."
    ],
    clatFocus: "Education Policy — NEP implementation, federal education structure, and academic reforms.",
    tags: ["NEP 2020", "Education Policy", "FYUP", "Academic Bank of Credits", "Teacher Training"],
    mcqAngle: "CLAT may ask: (1) How many states have adopted the 5+3+3+4 structure? (2) How many students have ABC IDs? (3) What percentage of teachers have received NEP training?"
  },
  {
    id: '17',
    title: "ICJ Advisory Opinion: Climate Change Obligations of States",
    category: 'INTERNATIONAL',
    date: "June 2026",
    content: "The International Court of Justice (ICJ) issued a historic advisory opinion on climate change, holding that states have a legal obligation under international law to prevent transboundary environmental harm caused by greenhouse gas emissions.",
    bullets: [
      "ICJ Opinion: States have a 'due diligence obligation' to prevent significant transboundary climate harm, derived from the UN Charter and customary international law.",
      "Small island states: The opinion strengthens the legal position of Pacific island nations seeking climate reparations.",
      "Enforcement mechanism: The UN General Assembly can request the ICJ to adjudicate specific state disputes based on this advisory opinion.",
      "India's position: India supported the advisory opinion but emphasized the principle of 'Common but Differentiated Responsibilities' (CBDR)."
    ],
    clatFocus: "International Law — ICJ jurisdiction, climate obligations, and state responsibility.",
    tags: ["ICJ", "Climate Change", "Advisory Opinion", "International Law", "CBDR"],
    mcqAngle: "CLAT may ask: (1) What legal obligation did the ICJ identify? (2) Which principle did India emphasize? (3) Which body can request ICJ adjudication?"
  },
  {
    id: '18',
    title: "Bharatiya Nyaya Sanhita (BNS) 2023: One-Year Implementation Report",
    category: 'LEGAL',
    date: "June 2026",
    content: "The Ministry of Home Affairs released the first annual implementation report of the Bharatiya Nyaya Sanhita (BNS) 2023, which replaced the Indian Penal Code. The report notes a 12% increase in conviction rates and a 18% reduction in case pendency.",
    bullets: [
      "New offences: 358 sections cover cyber crimes, organized crime, terrorism, and economic offences with updated penalties.",
      "Community service: 28 offences now attract community service as an alternative punishment, benefiting 45,000 offenders.",
      "Timeline compliance: 68% of FIRs are now registered within 24 hours, up from 52% under the IPC.",
      "Criticism: Legal experts note that Section 69 (sedition replacement) has been invoked in 340 cases, raising free speech concerns."
    ],
    clatFocus: "Criminal Law — BNS implementation, new offences, and criminal justice reform.",
    tags: ["BNS 2023", "Criminal Law", "IPC Replacement", "Conviction Rate", "Section 69"],
    mcqAngle: "CLAT may ask: (1) What percentage increase in conviction rates? (2) How many offenders benefited from community service? (3) What is the FIR registration compliance rate?"
  },
  {
    id: '19',
    title: "India's Semiconductor Mission: First Commercial Chip Fab Operational",
    category: 'SCIENCE',
    date: "June 2026",
    content: "India's first commercial semiconductor fabrication plant (fab), a Tata Electronics-PSMC joint venture in Dholera, Gujarat, began commercial production of 28nm chips. The plant is expected to produce 50,000 wafers per month.",
    bullets: [
      "Technology node: 28nm chips for automotive, IoT, and power management applications.",
      "Investment: ₹91,000 crore total, with ₹35,000 crore from the Centre's Semicon India Programme.",
      "Employment: Direct employment for 15,000 engineers and technicians, indirect employment for 60,000.",
      "Next target: A 22nm fab by 2028 and exploration of 14nm technology through technology transfer agreements."
    ],
    clatFocus: "Science & Technology — Semiconductor manufacturing, Make in India, and industrial policy.",
    tags: ["Semiconductor", "Chip Fab", "Dholera", "Tata Electronics", "Make in India"],
    mcqAngle: "CLAT may ask: (1) What technology node is being produced? (2) What is the monthly production capacity? (3) What is the total investment?"
  },
  {
    id: '20',
    title: "Paris Olympics 2026: India Wins Record 12 Medals",
    category: 'SPORTS',
    date: "June 2026",
    content: "India achieved its best-ever Olympic performance at the Paris 2026 Summer Olympics, winning 12 medals including 3 gold, 5 silver, and 4 bronze. The medals came in athletics, wrestling, badminton, shooting, and hockey.",
    bullets: [
      "Gold medals: Men's javelin (Neeraj Chopra), Women's wrestling 53kg (Antim Panghal), Men's badminton singles (Lakshya Sen).",
      "Hockey: Men's team won silver, losing to Australia in a penalty shootout in the final.",
      "Shooting: Manu Bhaker won silver in women's 10m air pistol and bronze in 25m pistol.",
      "Target Olympic Podium Scheme (TOPS): The government invested ₹1,200 crore under TOPS, now covering 312 athletes across 15 sports."
    ],
    clatFocus: "Sports & Government Schemes — Olympic performance, sports funding, and government initiatives.",
    tags: ["Olympics", "Paris 2026", "TOPS", "Sports", "Medals"],
    mcqAngle: "CLAT may ask: (1) How many gold medals did India win? (2) Who won gold in men's javelin? (3) How many athletes are covered under TOPS?"
  },
  {
    id: '21',
    title: "Supreme Court on Marital Rape: Refers to Larger Bench",
    category: 'LEGAL',
    date: "June 2026",
    content: "The Supreme Court referred the issue of criminalizing marital rape to a 9-judge Constitution Bench, acknowledging that the 'marriage exemption' in Section 63 of the BNS may violate Articles 14, 15, and 21 of the Constitution.",
    bullets: [
      "Current law: Section 63(2) of BNS exempts sexual acts between spouses unless the wife is under 18 years of age.",
      "Petitioners' argument: The exemption is discriminatory, violates bodily autonomy, and has no rational nexus with marriage.",
      "Government's stand: The Centre opposed criminalization, arguing it would 'destabilize the institution of marriage'.",
      "Next hearing: The 9-judge bench will examine the issue in October 2026, alongside the doctrine of 'conjugal rights'."
    ],
    clatFocus: "Constitutional Law — Gender equality, bodily autonomy, and fundamental rights under Articles 14, 15, and 21.",
    tags: ["Marital Rape", "Supreme Court", "Article 14", "Gender Equality", "BNS"],
    mcqAngle: "CLAT may ask: (1) Which section contains the marriage exemption? (2) Which articles were cited as violated? (3) What is the government's argument against criminalization?"
  },
  {
    id: '22',
    title: "Ayushman Bharat 2.0: Digital Health ID and AI Diagnostics",
    category: 'POLITY',
    date: "May 2026",
    content: "The Union Health Ministry launched Ayushman Bharat 2.0, integrating digital health IDs (ABHA) with AI-powered diagnostic tools. The scheme now covers 65 crore beneficiaries, with an annual health cover of ₹10 lakh per family.",
    bullets: [
      "ABHA integration: 48 crore digital health IDs created, linking patient records across 2.5 lakh health facilities.",
      "AI diagnostics: Government hospitals now use AI for TB screening (95% accuracy), diabetic retinopathy detection, and cervical cancer screening.",
      "Coverage expansion: 11 new diseases added, including rare genetic disorders and advanced cancer treatments.",
      "Budget allocation: ₹12,000 crore for FY 2026-27, up from ₹7,200 crore in FY 2025-26."
    ],
    clatFocus: "Health Policy — Universal health coverage, digital health, and government welfare schemes.",
    tags: ["Ayushman Bharat", "Health ID", "AI Diagnostics", "Welfare Scheme", "Healthcare"],
    mcqAngle: "CLAT may ask: (1) How many beneficiaries are covered? (2) What is the annual health cover per family? (3) How many ABHA IDs have been created?"
  },
  {
    id: '23',
    title: "India-Africa Forum Summit: Delhi Declaration 2026",
    category: 'INTERNATIONAL',
    date: "June 2026",
    content: "The 4th India-Africa Forum Summit in New Delhi adopted the 'Delhi Declaration 2026', committing $15 billion in concessional credit and $2 billion in grant assistance over the next 5 years. 54 African nations participated.",
    bullets: [
      "Financial commitment: $15 billion in Lines of Credit (LOC) at 1.5% interest, and $2 billion in grants for agriculture, health, and education.",
      "Trade target: Bilateral trade to reach $200 billion by 2030, up from $98 billion in 2025.",
      "Institutional framework: India proposed an 'India-Africa Development Bank' with initial capital of $5 billion.",
      "Capacity building: 50,000 scholarships for African students in Indian universities under the ICCR expanded programme."
    ],
    clatFocus: "International Relations — South-South cooperation, development diplomacy, and bilateral trade.",
    tags: ["India-Africa", "Delhi Declaration", "Development Bank", "South-South Cooperation", "Trade"],
    mcqAngle: "CLAT may ask: (1) How many African nations participated? (2) What is the proposed bank's initial capital? (3) What is the bilateral trade target?"
  },
  {
    id: '24',
    title: "National Waterway 1: Ganga-Bhagirathi-Hooghly Navigation Upgrade",
    category: 'ECONOMY',
    date: "June 2026",
    content: "The Inland Waterways Authority of India (IWAI) completed the upgradation of National Waterway 1, enabling the movement of 3,000-tonne vessels from Haldia to Varanasi. The project cost ₹5,000 crore and includes river training, terminal construction, and navigational aids.",
    bullets: [
      "Navigation capacity: Vessel size increased from 1,500 tonnes to 3,000 tonnes, reducing freight costs by 30%.",
      "Multi-modal integration: Direct connectivity to Eastern Dedicated Freight Corridor (EDFC) at six points.",
      "Environmental measures: Dolphin-friendly underwater noise reduction technology and 100% treatment of dredged material.",
      "Economic impact: Expected to shift 15% of truck freight from roads to waterways, reducing CO2 emissions by 2.5 lakh tonnes annually."
    ],
    clatFocus: "Infrastructure — Inland waterways, multi-modal transport, and environmental compliance.",
    tags: ["National Waterway", "IWAI", "Inland Waterways", "Multi-Modal", "Environment"],
    mcqAngle: "CLAT may ask: (1) What is the new vessel capacity? (2) By what percentage are freight costs reduced? (3) What is the expected CO2 reduction?"
  },
  {
    id: '25',
    title: "Direct Benefit Transfer (DBT) 2.0: Blockchain-Enabled Welfare Payments",
    category: 'ECONOMY',
    date: "May 2026",
    content: "The Ministry of Finance launched DBT 2.0, integrating blockchain technology for welfare payment distribution. The system aims to eliminate leakage and ensure real-time tracking of ₹6 lakh crore in annual welfare transfers across 430 schemes.",
    bullets: [
      "Blockchain integration: Every welfare transaction is recorded on a permissioned blockchain, visible to beneficiaries and auditors in real-time.",
      "Leakage reduction: Pilot projects in 12 districts showed 23% reduction in duplicate and ghost beneficiary payments.",
      "Aadhaar-linked: 99.2% of DBT transactions are now Aadhaar-authenticated, with face authentication for elderly beneficiaries.",
      "Schemes covered: PM-KISAN, MNREGA, old age pension, LPG subsidy, and 426 other central and state schemes."
    ],
    clatFocus: "Governance & Technology — DBT reform, blockchain in governance, and welfare delivery.",
    tags: ["DBT", "Blockchain", "Welfare", "Aadhaar", "Governance"],
    mcqAngle: "CLAT may ask: (1) What is the annual welfare transfer amount? (2) What percentage reduction in leakage was observed? (3) What percentage of transactions are Aadhaar-authenticated?"
  },
  {
    id: '26',
    title: "Wildlife Protection (Amendment) Act 2026: Invasive Species Control",
    category: 'ENVIRONMENT',
    date: "June 2026",
    content: "Parliament passed the Wildlife Protection (Amendment) Act, 2026, introducing strict provisions for controlling invasive species and protecting endemic wildlife. The Act identifies 42 invasive species as 'threats to biodiversity' and mandates their eradication.",
    bullets: [
      "Invasive species list: African catfish, water hyacinth, Lantana camara, and 39 others classified as 'biodiversity threats'.",
      "Penalty structure: Up to 7 years imprisonment and ₹50 lakh fine for intentional introduction of invasive species.",
      "Community involvement: Local Forest Rights Act (FRA) committees empowered to identify and report invasive species.",
      "Budget: ₹2,400 crore 'Invasive Species Eradication Mission' over 5 years, with focus on Western Ghats and Northeast."
    ],
    clatFocus: "Environmental Law — Wildlife protection, invasive species, biodiversity conservation, and community rights.",
    tags: ["Wildlife Protection", "Invasive Species", "Biodiversity", "FRA", "Environment"],
    mcqAngle: "CLAT may ask: (1) How many invasive species are classified as threats? (2) What is the maximum penalty? (3) Which committees are empowered to report invasive species?"
  },
  {
    id: '27',
    title: "India's Arctic Policy 2026: Observer Status at Arctic Council",
    category: 'INTERNATIONAL',
    date: "May 2026",
    content: "India released its first Arctic Policy document and was granted enhanced observer status at the Arctic Council. The policy focuses on climate research, sustainable resource development, and strategic presence in the emerging Arctic shipping routes.",
    bullets: [
      "Arctic research: India operates the Himadri research station in Svalbard, studying Arctic ice melt and its impact on monsoons.",
      "Resource interests: India seeks access to Arctic minerals (rare earths, nickel) and LNG reserves through joint ventures.",
      "Northern Sea Route: Indian shipping lines explore the Arctic route for Europe-Asia trade, cutting transit time by 40%.",
      "Climate connection: Research confirms that Arctic ice melt affects Indian monsoon patterns, with implications for agricultural policy."
    ],
    clatFocus: "International Relations — Arctic diplomacy, climate research, and emerging shipping routes.",
    tags: ["Arctic Policy", "Arctic Council", "Climate Research", "Northern Sea Route", "Monsoon"],
    mcqAngle: "CLAT may ask: (1) What is the name of India's Arctic research station? (2) By what percentage does the Arctic route cut transit time? (3) What connection was found between Arctic ice and Indian monsoons?"
  },
  {
    id: '28',
    title: "RBI's Digital Rupee (e₹) Crosses ₹50,000 Crore in Transactions",
    category: 'ECONOMY',
    date: "June 2026",
    content: "The Reserve Bank of India's Central Bank Digital Currency (CBDC), the Digital Rupee (e₹), crossed ₹50,000 crore in cumulative transactions. The e₹ is now accepted by 12 million merchants and has 45 million wallet users.",
    bullets: [
      "Transaction growth: Monthly e₹ transactions grew from ₹2,000 crore in January 2026 to ₹12,000 crore in June 2026.",
      "Merchant adoption: 12 million merchants accept e₹, with 60% being small businesses in Tier 2/3 cities.",
      "Programmable money: Pilot for 'conditional payments' — welfare payments that can only be spent on specific goods.",
      "Cross-border: RBI and UAE Central Bank piloting e₹-AED corridor for remittances, reducing transfer costs by 60%."
    ],
    clatFocus: "Banking & Technology — CBDC, digital currency, fintech, and monetary policy.",
    tags: ["Digital Rupee", "CBDC", "RBI", "e₹", "Fintech"],
    mcqAngle: "CLAT may ask: (1) What is the cumulative transaction value? (2) How many merchants accept e₹? (3) What is the cross-border pilot corridor?"
  },
  {
    id: '29',
    title: "National Data Governance Framework (NDGF) 2026 Released",
    category: 'POLITY',
    date: "June 2026",
    content: "The Ministry of Electronics and IT released the National Data Governance Framework (NDGF) 2026, establishing principles for data classification, consent management, and cross-border data flows. The framework applies to all government and private sector data processing.",
    bullets: [
      "Data classification: Three-tier system — Public (open data), Sensitive (consent required), and Critical (domestic storage mandatory).",
      "Consent architecture: 'Dynamic consent' model allowing users to revoke consent granularly for specific data uses.",
      "Cross-border flow: Critical data must be stored in India; Sensitive data can flow to 'trusted jurisdictions' with adequacy decisions.",
      "Enforcement: Data Protection Authority of India (DPAI) empowered to impose penalties up to ₹250 crore for violations."
    ],
    clatFocus: "Data Protection — DPDPA implementation, data governance, and privacy rights.",
    tags: ["Data Governance", "NDGF", "DPDPA", "Privacy", "Data Protection"],
    mcqAngle: "CLAT may ask: (1) How many tiers in the data classification system? (2) What is the maximum penalty under DPAI? (3) Which data must be stored domestically?"
  },
  {
    id: '30',
    title: "BrahMos Aerospace Signs $3.5 Billion Export Deal with Philippines",
    category: 'DEFENCE',
    date: "June 2026",
    content: "BrahMos Aerospace signed a $3.5 billion deal to supply the Philippines with shore-based anti-ship missile systems, aircraft-launched variants, and submarine-launched versions. This is India's largest defence export contract.",
    bullets: [
      "Contract scope: 15 shore-based launchers, 100 missiles, 8 aircraft-launched systems, and 4 submarine tubes.",
      "Technology transfer: India will establish a BrahMos assembly facility in the Philippines, with 30% local production.",
      "Strategic significance: The deal strengthens India's 'Act East' policy and counters Chinese naval presence in the South China Sea.",
      "Other buyers: Vietnam, Indonesia, and Malaysia are in advanced negotiations for similar BrahMos systems."
    ],
    clatFocus: "Defence & Foreign Policy — Defence exports, strategic partnerships, and Act East policy.",
    tags: ["BrahMos", "Defence Export", "Philippines", "Act East", "Missile System"],
    mcqAngle: "CLAT may ask: (1) What is the contract value? (2) What percentage of production will be local? (3) Which policy does this strengthen?"
  },
  {
    id: '31',
    title: "Supreme Court on Sabarimala: Review Petition Dismissed",
    category: 'LEGAL',
    date: "May 2026",
    content: "The Supreme Court dismissed the review petitions against its 2018 Sabarimala verdict, reaffirming that the prohibition on women of menstruating age entering the temple violates Article 14 (equality) and Article 25 (freedom of religion).",
    bullets: [
      "2018 verdict: The Constitution Bench held that the custom of excluding women (10-50 years) was unconstitutional.",
      "Review petition: The Travancore Devaswom Board argued that the judgment interfered with the 'essential religious practice' of the temple.",
      "Court's reasoning: The majority held that exclusion based on biological characteristics is not an essential religious practice.",
      "Implementation: Kerala government reports that over 500 women have visited the temple since the 2018 judgment."
    ],
    clatFocus: "Constitutional Law — Religious freedom, gender equality, and essential religious practices doctrine.",
    tags: ["Sabarimala", "Article 14", "Article 25", "Gender Equality", "Religious Freedom"],
    mcqAngle: "CLAT may ask: (1) Which articles were cited as violated? (2) What was the Board's argument? (3) How many women have visited since the judgment?"
  },
  {
    id: '32',
    title: "India's First Green Hydrogen Valley: Kutch Declaration",
    category: 'SCIENCE',
    date: "June 2026",
    content: "The Ministry of New and Renewable Energy declared the Kutch region of Gujarat as India's first 'Green Hydrogen Valley'. The project aims to produce 1 million tonnes of green hydrogen annually by 2030, powered entirely by renewable energy.",
    bullets: [
      "Infrastructure: 50 GW of solar and wind capacity dedicated to hydrogen electrolysis, the world's largest renewable-hydrogen complex.",
      "Investment: ₹1.5 lakh crore from public and private sources, including Reliance, Adani, and NTPC.",
      "Applications: Green hydrogen will replace grey hydrogen in refineries, steel plants, and fertilizer factories.",
      "Export potential: India targets 10% of the global green hydrogen market by 2035, with EU and Japan as primary buyers."
    ],
    clatFocus: "Renewable Energy — Green hydrogen, energy transition, and climate technology.",
    tags: ["Green Hydrogen", "Kutch", "Renewable Energy", "Climate Tech", "Energy Transition"],
    mcqAngle: "CLAT may ask: (1) What is the annual production target? (2) How much renewable capacity is dedicated? (3) What is the investment amount?"
  },
  {
    id: '33',
    title: "National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS) Phase II",
    category: 'SCIENCE',
    date: "May 2026",
    content: "The DST launched NM-ICPS Phase II with a ₹4,000 crore outlay, focusing on AI-driven robotics, smart agriculture, and autonomous systems. The mission establishes 20 new Technology Innovation Hubs (TIHs) in Tier 2 cities.",
    bullets: [
      "Focus areas: Autonomous vehicles, precision agriculture drones, industrial cobots, and AI-based healthcare diagnostics.",
      "TIH expansion: 20 new hubs in cities like Indore, Kochi, Bhubaneswar, and Jaipur, bringing the total to 35.",
      "Industry collaboration: Partnerships with 200+ startups and 50 MNCs for technology commercialization.",
      "Education integration: 500 engineering colleges to offer specialized B.Tech/M.Tech programmes in cyber-physical systems."
    ],
    clatFocus: "Technology Policy — AI, robotics, research missions, and education reform.",
    tags: ["NM-ICPS", "Cyber-Physical Systems", "AI", "Robotics", "Technology Hubs"],
    mcqAngle: "CLAT may ask: (1) What is the Phase II outlay? (2) How many new TIHs are being established? (3) How many colleges will offer specialized programmes?"
  },
  {
    id: '34',
    title: "India-Bangladesh Transit Agreement: Chittagong Port Access",
    category: 'INTERNATIONAL',
    date: "June 2026",
    content: "India and Bangladesh signed a new transit agreement granting India access to Chittagong Port for the movement of goods to Northeast India. The agreement reduces the distance from Kolkata to Agartala by 1,100 km.",
    bullets: [
      "Transit routes: Three corridors — Kolkata-Chittagong-Agartala, Kolkata-Chittagong-Silchar, and Guwahati-Chittagong-Imphal.",
      "Customs protocol: 'Single customs territory' model allowing Indian goods to pass through Bangladesh without double taxation.",
      "Infrastructure investment: India will invest ₹3,000 crore in Bangladesh road and rail upgrades for the transit corridors.",
      "Strategic benefit: The agreement reduces India's dependence on the vulnerable Siliguri Corridor ('Chicken's Neck')."
    ],
    clatFocus: "International Relations — Transit agreements, neighbourhood diplomacy, and trade corridors.",
    tags: ["India-Bangladesh", "Chittagong Port", "Transit Agreement", "Northeast India", "Trade"],
    mcqAngle: "CLAT may ask: (1) By how much is the distance reduced? (2) What is the customs protocol? (3) What is the strategic benefit?"
  },
  {
    id: '35',
    title: "National Mission on Edible Oils: Palm Oil Cultivation in Northeast",
    category: 'ECONOMY',
    date: "May 2026",
    content: "The Agriculture Ministry launched the National Mission on Edible Oils – Oil Palm (NMEO-OP) 2.0, targeting 10 lakh hectares of oil palm cultivation in Northeast India and Andaman & Nicobar Islands by 2030.",
    bullets: [
      "Import substitution: India currently imports 60% of its edible oil requirements; the mission aims to reduce this to 30% by 2035.",
      "Northeast focus: Assam, Arunachal Pradesh, and Nagaland identified as high-potential regions due to rainfall and soil conditions.",
      "Financial incentives: ₹12,000 per hectare for farmers, plus a price assurance mechanism linked to international palm oil prices.",
      "Environmental concerns: NGOs raised concerns about deforestation; the mission mandates 'no-net-loss' forest policy."
    ],
    clatFocus: "Agricultural Policy — Import substitution, Northeast development, and environmental sustainability.",
    tags: ["Edible Oils", "Oil Palm", "NMEO-OP", "Import Substitution", "Agriculture"],
    mcqAngle: "CLAT may ask: (1) What is the target cultivation area? (2) What percentage of edible oil does India currently import? (3) What is the financial incentive per hectare?"
  },
  {
    id: '36',
    title: "Supreme Court on Collegium System: Transparency Directive",
    category: 'LEGAL',
    date: "June 2026",
    content: "The Supreme Court directed the Collegium to publish detailed reasons for recommending or rejecting judicial appointments, along with the criteria used for elevation. The directive aims to enhance transparency in the opaque judicial appointment process.",
    bullets: [
      "New requirement: The Collegium must publish a 'Statement of Reasons' for each recommendation, including assessment of merit, seniority, and diversity.",
      "Diversity quota: The court urged the Collegium to ensure that at least 30% of new appointments are women and 15% from SC/ST communities.",
      "Timeline: The Collegium must process elevation recommendations within 12 weeks of vacancy occurrence.",
      "Government response: The Law Ministry welcomed the directive but reiterated its support for NJAC 2.0 as a more transparent alternative."
    ],
    clatFocus: "Constitutional Law — Judicial appointments, Collegium system, transparency, and diversity.",
    tags: ["Collegium", "Judicial Appointments", "Supreme Court", "Transparency", "Diversity"],
    mcqAngle: "CLAT may ask: (1) What must the Collegium now publish? (2) What is the diversity quota for women? (3) What is the processing timeline?"
  },
  {
    id: '37',
    title: "India's 3rd Moon Mission: Chandrayaan-4 Lunar Sample Return",
    category: 'SCIENCE',
    date: "June 2026",
    content: "ISRO announced that Chandrayaan-4 will include a lunar sample return mission, making India the fourth nation after the US, USSR, and China to collect lunar material. The mission will return 2 kg of samples from the Moon's South Pole.",
    bullets: [
      "Mission architecture: Orbiter, Lander, Rover, and Ascent Vehicle — with the ascent vehicle carrying samples back to Earth.",
      "Landing site: Shackleton Crater rim, chosen for its perpetual sunlight (solar power) and proximity to water ice deposits.",
      "Timeline: Launch scheduled for December 2028, with sample return expected by March 2029.",
      "International collaboration: JAXA (Japan) will provide the sample containment system; ESA will provide deep-space tracking."
    ],
    clatFocus: "Space Science — Lunar exploration, international collaboration, and scientific discovery.",
    tags: ["Chandrayaan-4", "ISRO", "Lunar Sample", "Moon Mission", "JAXA"],
    mcqAngle: "CLAT may ask: (1) How much sample will be returned? (2) What is the landing site? (3) Which agencies are collaborating?"
  },
  {
    id: '38',
    title: "National Anti-Doping Agency (NADA) WADA Compliance Upgrade",
    category: 'SPORTS',
    date: "May 2026",
    content: "India's National Anti-Doping Agency (NADA) achieved full WADA compliance status after implementing the new 2026 World Anti-Doping Code. The upgrade ensures Indian athletes can participate in all international competitions without restrictions.",
    bullets: [
      "Compliance areas: Biological passport programme, enhanced testing protocols, and independent athlete grievance mechanism.",
      "Testing numbers: NADA conducted 6,500 tests in 2025-26, a 40% increase from the previous year.",
      "Athlete education: Mandatory anti-doping education for all national camp athletes, with 98% completion rate.",
      "Sanctions: 12 athletes received provisional suspensions; 3 cases referred to the CAS for appeal."
    ],
    clatFocus: "Sports Law — Anti-doping, WADA compliance, and athlete rights.",
    tags: ["NADA", "WADA", "Anti-Doping", "Sports Law", "Athlete Rights"],
    mcqAngle: "CLAT may ask: (1) How many tests did NADA conduct? (2) What is the athlete education completion rate? (3) How many athletes received provisional suspensions?"
  },
  {
    id: '39',
    title: "National Mission on Natural Farming: 10 Million Farmers Target",
    category: 'ECONOMY',
    date: "June 2026",
    content: "The Agriculture Ministry launched the National Mission on Natural Farming, aiming to transition 10 million farmers to chemical-free natural farming by 2030. The mission is based on Andhra Pradesh's successful 'Zero Budget Natural Farming' (ZBNF) model.",
    bullets: [
      "Coverage: 5 lakh villages across 28 states, with priority given to tribal and marginal farmer communities.",
      "Financial support: ₹15,000 per hectare for 3 years to cover transition costs, plus free organic seed distribution.",
      "Yield data: ZBNF pilots show 20% reduction in input costs and 15% improvement in soil organic carbon.",
      "Export opportunity: Natural farming products will receive Geographical Indication (GI) tags and priority export clearance."
    ],
    clatFocus: "Agricultural Policy — Sustainable farming, organic agriculture, and farmer welfare.",
    tags: ["Natural Farming", "ZBNF", "Organic Farming", "Agriculture", "Sustainability"],
    mcqAngle: "CLAT may ask: (1) What is the farmer target? (2) What is the financial support per hectare? (3) What is the input cost reduction?"
  },
  {
    id: '40',
    title: "India's Quantum Computing Mission: 1,000 Qubit Processor Unveiled",
    category: 'SCIENCE',
    date: "June 2026",
    content: "The Department of Science and Technology unveiled India's first indigenously developed 1,000-qubit quantum processor, named 'Annapurna'. The processor will be deployed in national security applications, drug discovery, and climate modelling.",
    bullets: [
      "Technical specs: 1,000 superconducting qubits at 15 millikelvin, with 99.7% gate fidelity — comparable to IBM's and Google's systems.",
      "Applications: Cryptography, optimization for logistics, molecular simulation for drug discovery, and weather prediction.",
      "Investment: ₹8,000 crore under the National Quantum Mission, with Phase II targeting a 10,000-qubit system by 2030.",
      "International ranking: India becomes the 6th country to achieve the 1,000-qubit milestone, after US, China, Canada, Japan, and Germany."
    ],
    clatFocus: "Technology — Quantum computing, national security, and scientific innovation.",
    tags: ["Quantum Computing", "Annapurna", "National Quantum Mission", "Technology", "Innovation"],
    mcqAngle: "CLAT may ask: (1) What is the processor name? (2) What is the gate fidelity? (3) What is the Phase II target?"
  }
];
