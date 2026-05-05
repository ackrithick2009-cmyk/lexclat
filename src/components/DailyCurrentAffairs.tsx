import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Calendar, ArrowRight, Share2, Bookmark, Clock, Globe, Zap, Search, Filter, Target, Brain, Loader2, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateMcqAngle } from '@/src/services/geminiService';

interface NewsItem {
  id: string;
  title: string;
  category: 'ECONOMY' | 'LEGAL' | 'ENVIRONMENT' | 'INTERNATIONAL' | 'SCIENCE' | 'SPORTS';
  date: string;
  content: string;
  bullets: string[];
  clatFocus: string;
  tags: string[];
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '28',
    title: "India Post & DTDC Sign MoU to Boost E-commerce Logistics",
    category: 'ECONOMY',
    date: "April 2026",
    content: "The Department of Posts (DoP) signed an MoU with DTDC Express Limited to strengthen India's logistics and e-commerce delivery network, leveraging over 1.64 lakh post offices.",
    bullets: [
        "Reach: Enables DTDC access to rural and semi-urban markets via India Post's vast network.",
        "Operations: Integration of tracking systems and joint logistics for end-to-end visibility.",
        "Rural Impact: Supports nationwide COD services in previously non-serviceable regions."
    ],
    clatFocus: "Relevant for infrastructure development and public-private partnership (PPP) models.",
    tags: ["India Post", "DTDC", "Logistics", "E-commerce"]
  },
  {
    id: '29',
    title: "BHEL & DRDO Partner for Naval Infrared Suppression System",
    category: 'SCIENCE',
    date: "April 2026",
    content: "Bharat Heavy Electricals Limited (BHEL) signed a technology transfer agreement with DRDO's NSTL for the Gas Turbine-Infrared Suppression System (GT-IRSS) used in naval vessels.",
    bullets: [
        "Technology: GT-IRSS reduces infrared signatures of ships by cooling exhaust and shielding heat.",
        "Manufacturing: BHEL will handle technology absorption and production of the indigenous solution.",
        "Significance: Strengthens Aatmanirbhar Bharat by reducing reliance on foreign naval tech."
    ],
    clatFocus: "Defence tech innovations and the role of DPSUs in indigenous manufacturing.",
    tags: ["BHEL", "DRDO", "Defence", "Navy"]
  },
  {
    id: '30',
    title: "RBI Launches 'Mission Saksham' for Urban Co-operative Banks",
    category: 'ECONOMY',
    date: "April 2026",
    content: "The Reserve Bank of India (RBI) launched Mission Saksham (Sahkari Bank Kshamta Nirman) to strengthen the operational and managerial capabilities of Urban Co-operative Banks (UCBs).",
    bullets: [
        "Objective: Improve compliance, institutional resilience, and operational efficiency in UCBs.",
        "Scale: Aimed at training approximately 1.40 lakh participants across the sector.",
        "Context: Part of RBI's broader goal to sanitize and stabilize the cooperative banking tier."
    ],
    clatFocus: "Important for Banking Law and the regulatory evolution of Cooperative societies.",
    tags: ["RBI", "UCB", "Mission Saksham", "Cooperative Banks"]
  },
  {
    id: '31',
    title: "Flipkart & Axis Bank Launch Biometric OTP-Free Card Payments",
    category: 'SCIENCE',
    date: "April 2026",
    content: "Flipkart, in partnership with Axis Bank and PayU, launched biometric authentication using fingerprint or Face ID for card payments, eliminating the need for traditional OTPs.",
    bullets: [
        "Security: Uses device-bound verification to reduce SIM swap and phishing risks.",
        "UX: Aims to improve transaction success rates by removing OTP friction.",
        "Regulation: Aligns with RBI's 2025 directions on secure digital payment authentication."
    ],
    clatFocus: "Relevant for digital payment regulations and cyber-security law frameworks.",
    tags: ["Flipkart", "Axis Bank", "Biometrics", "Fintech"]
  },
  {
    id: '32',
    title: "World Day for Safety and Health at Work 2026",
    category: 'INTERNATIONAL',
    date: "April 28, 2026",
    content: "Observed annually by the ILO, the 2026 theme 'Let’s ensure a healthy psychosocial working environment' highlights workplace safety and mental well-being.",
    bullets: [
        "Focus: Reducing work-related accidents and advocating for OSH (Occupational Safety and Health) standards.",
        "Context: Initiated by ILO in 2003 during the International Labour Conference.",
        "Report: ILO globally examined psychosocial risks and workplace organizational policies."
    ],
    clatFocus: "GK: International observances and labor rights (ILO) context.",
    tags: ["ILO", "OSH", "HealthAtWork", "UN"]
  },
  {
    id: '33',
    title: "International Jazz Day 2026: Chicago Named Global Host City",
    category: 'INTERNATIONAL',
    date: "April 30, 2026",
    content: "UNESCO's International Jazz Day celebrated jazz as a unifying global art form, with Chicago hosting workshops and performances to mark the 2026 event.",
    bullets: [
        "History: Proclaimed by UNESCO in 2011; first celebrated on April 30, 2012.",
        "Organizer: Herbie Hancock Institute of Jazz leads the worldwide planning.",
        "Significance: Jazz is recognized as a tool for peace, unity, and intercultural dialogue."
    ],
    clatFocus: "GK: Understanding the cultural mandates of UNESCO and global art heritage.",
    tags: ["UNESCO", "JazzDay", "Chicago", "Culture"]
  },
  {
    id: '17',
    title: "PM Modi Inaugurates Rs 4,000 Crore Projects in Sikkim",
    category: 'ECONOMY',
    date: "April 28, 2026",
    content: "Prime Minister Narendra Modi visited Sikkim for the Golden Jubilee of statehood, launching over 30 development projects worth Rs 4,000 crore across infrastructure and healthcare sectors.",
    bullets: [
        "Statehood: Celebrates 50 years (Golden Jubilee) of Sikkim joining the Union.",
        "Infrastructure: Foundation for 30+ projects and inaugural of Indoor Cricket Academy at Pakyong.",
        "Heritage: Visit to Swarnajayanti Maitri Manjari Park, a premier Orchid Experience Centre."
    ],
    clatFocus: "Relevant for North-East development policies and State Reorganization history.",
    tags: ["Sikkim", "PM Modi", "Infrastructure", "Statehood"]
  },
  {
    id: '18',
    title: "NITI Aayog Unveils 'DPI@2047' Roadmap for Digital Transformation",
    category: 'SCIENCE',
    date: "April 2026",
    content: "NITI Aayog released a strategic roadmap for Digital Public Infrastructure (DPI) 2.0, aiming for non-linear inclusive growth and a projection of 4% GDP contribution by 2030.",
    bullets: [
        "Phases: Two-phase strategy (DPI 2.0: 2025–35 and DPI 3.0: 2035–47).",
        "Economic Target: Projected rise of DPI contribution from current 1% to 4% of GDP by 2030.",
        "Sectoral Focus: Targets bottlenecks in MSMEs, agriculture, and healthcare."
    ],
    clatFocus: "Important for Digital India initiatives and economic policy transformations.",
    tags: ["NITI Aayog", "DPI", "Viksit Bharat", "Digital India"]
  },
  {
    id: '19',
    title: "Ladakh LT Governor Approves Creation of 5 New Districts",
    category: 'LEGAL',
    date: "April 2026",
    content: "Ladakh officially notified the creation of five new districts—Nubra, Sham, Changthang, Zanskar, and Drass—increasing the Union Territory's total districts from two to seven.",
    bullets: [
        "New Units: Nubra, Sham, and Changthang (from Leh); Zanskar and Drass (from Kargil).",
        "Administrative Impact: Move aims at decentralized governance in sparsely populated UT regions.",
        "Background: Follows preliminary MHA approval dating back to August 2024."
    ],
    clatFocus: "Crucial for Constitutional Law (UT administration) and Administrative Law sections.",
    tags: ["Ladakh", "MHA", "Governance", "Union Territories"]
  },
  {
    id: '20',
    title: "India Ranks 5th in SIPRI Global military Spenders Report 2025",
    category: 'INTERNATIONAL',
    date: "April 2026",
    content: "Stockholm International Peace Research Institute (SIPRI) 2026 sheet ranks India 5th in military expenditure (USD 92.1 billion), marking an 8.9% year-on-year growth.",
    bullets: [
        "Spend: USD 92.1 billion, accounting for 3.2% of global military spending.",
        "Leaders: USA (USD 954bn) remains top, followed by China, Russia, and Germany.",
        "Trend: 11th consecutive year of military spending growth globally."
    ],
    clatFocus: "High yield for International Relations and geopolitical focus in Current Affairs.",
    tags: ["SIPRI", "Defence", "Geopolitics", "Military Spending"]
  },
  {
    id: '21',
    title: "UAE Exits OPEC & OPEC+ Oil Alliance Citing National Interest",
    category: 'INTERNATIONAL',
    date: "April 1, 2026",
    content: "The United Arab Emirates officially announced its withdrawal from OPEC effective May 2026, aiming for greater production flexibility and capacity utilization.",
    bullets: [
        "History: UAE joined OPEC in 1967; was the 3rd largest producer in the group.",
        "Rationale: Constraints on production quotas limited ADNOC's 5m bar/day expansion plans.",
        "Strategic Shift: Move aligns energy policy with long-term national economic diversification."
    ],
    clatFocus: "Important for global energy security and International Organizations (OPEC) context.",
    tags: ["OPEC", "UAE", "Oil Politics", "ADNOC"]
  },
  {
    id: '22',
    title: "RBI Shifts to Expected Credit Loss (ECL) for Asset Classification",
    category: 'LEGAL',
    date: "April 27, 2026",
    content: "The Reserve Bank of India issued a master direction introducing the Expected Credit Loss (ECL) model for banks, effective April 1, 2027, replacing current provisioning norms.",
    bullets: [
        "Transition: Shift from 'incurred loss' to forward-looking 'expected loss' approach.",
        "FX Reporting: Phased rollout of reporting for over-the-counter FX derivatives from July 2027.",
        "Impact: Aims to create a more resilient and preemptive banking system."
    ],
    clatFocus: "Relevant for Banking Law and RBI's regulatory reforms under the BR Act.",
    tags: ["RBI", "ECL", "Banking Law", "Finance"]
  },
  {
    id: '23',
    title: "Google Cloud AI Hub Foundation Laid in Visakhapatnam",
    category: 'SCIENCE',
    date: "April 2026",
    content: "Union Minister Ashwini Vaishnaw and AP CM Chandrababu Naidu laid the foundation for Google Cloud India's AI Hub in Visakhapatnam, a USD 15 billion FDI project.",
    bullets: [
        "Status: Recognized as the largest single Foreign Direct Investment (FDI) project in India.",
        "Infrastructure: Hyperscale data centres, high-capacity fibre networks, and subsea cable landing stations.",
        "Objective: Transforming Visakhapatnam into a global 'AI and Cloud Capital'."
    ],
    clatFocus: "Critical for understanding India's FDI landscape and AI infrastructure developments.",
    tags: ["Google Cloud", "AI Hub", "FDI", "Visakhapatnam"]
  },
  {
    id: '24',
    title: "MoSPI Proposes New Index of Service Production (ISP)",
    category: 'ECONOMY',
    date: "April 2026",
    content: "The Ministry of Statistics and Programme Implementation (MoSPI) proposed a monthly Index of Service Production (ISP) with 2024-25 as the base year to measure sector performance.",
    bullets: [
        "Data Source: Primarily relies on data from the Goods and Services Tax Network (GSTN).",
        "Coverage: Includes 70% of the services sector’s Gross Value Added (GVA).",
        "Context: Complements the IIP (Index of Industrial Production) for a holistic economic view."
    ],
    clatFocus: "Economics: Understanding national indices, base years, and GSTN's data utility.",
    tags: ["MoSPI", "ISP", "Economics", "GSTN"]
  },
  {
    id: '25',
    title: "SkyHop Aviation to Launch India’s First Commercial Seaplane Service",
    category: 'SCIENCE',
    date: "April 2026",
    content: "SkyHop Aviation received DGCA approval for India’s first commercial seaplane services, with initial operations connecting five islands in Lakshadweep.",
    bullets: [
        "Aircraft: 19-seater De Havilland Canada (DHC)-6 Twin Otter indigenously converted.",
        "Connectivity: Boosts last-mile island connectivity under the UDAN (Ude Desh ka Aam Nagrik) scheme.",
        "Operational Capability: Capable of taking off and landing on water, eliminating need for runways."
    ],
    clatFocus: "Civil Aviation policy (UDAN) and infrastructure innovations in remote UTs.",
    tags: ["Seaplane", "Lakshadweep", "UDAN", "Aviation"]
  },
  {
    id: '26',
    title: "China Launches PRSC-EO3 Satellite for Pakistan",
    category: 'INTERNATIONAL',
    date: "April 2026",
    content: "China launched Pakistan’s Remote Sensing Satellite–Earth Observation-3 (PRSC-EO3) aboard a Long March-6 rocket, marking the 640th mission of the series.",
    bullets: [
        "Satellite: Electro-Optical (EO) Earth Observation satellite developed indigenously by SUPARCO.",
        "Technology: Uses AI-based onboard processing and multi-geometry imaging for 3D terrain analysis.",
        "Cooperation: Highlights the deepening space-tech partnership between China and Pakistan."
    ],
    clatFocus: "International Relations and South Asian security dynamics regarding space assets.",
    tags: ["Pakistan", "China", "SpaceTech", "SUPARCO"]
  },
  {
    id: '27',
    title: "World Immunization Week 2026: 'For Every Generation, Vaccines Work'",
    category: 'SCIENCE',
    date: "April 24-30, 2026",
    content: "World Immunization Week (WIW) 2026, led by WHO, promoted vaccine benefits globally under the theme 'For Every Generation, Vaccines Work'.",
    bullets: [
        "History: Initiated in 2003; designated as the last week of April by WHA in 2012.",
        "Focus: Reducing vaccine-preventable diseases and celebrating immunization success globally.",
        "Report: ILO released campaign materials highlighting psychosocial health in the workplace."
    ],
    clatFocus: "GK: Health policy, International Organizations (WHO), and historical health milestones.",
    tags: ["WHO", "Immunization", "Health", "Social Security"]
  },
  {
    id: '9',
    title: "DRDO Unveils Advanced Armoured Platforms for Future Combat",
    category: 'SCIENCE',
    date: "April 28, 2026",
    content: "DRDO has unveiled indigenous advanced tracked and wheeled armoured platforms under the Future Infantry Combat Vehicle (FICV) programme, enhancing domestic defence manufacturing.",
    bullets: [
        "Platforms: Both tracked and wheeled indigenous iterations unveiled.",
        "Program: Future Infantry Combat Vehicle (FICV) alignment.",
        "Strategic Impact: Reduction in import dependency for primary combat systems."
    ],
    clatFocus: "Relevant for Defence Policy and Science & Technology sections.",
    tags: ["DRDO", "FICV", "Defence", "Atmanirbhar Bharat"]
  },
  {
    id: '10',
    title: "India Ranks 6th Globally in UHNWIs: Knight Frank Report 2026",
    category: 'ECONOMY',
    date: "April 28, 2026",
    content: "The Knight Frank Wealth Report 2026 indicates India now ranks 6th globally in terms of ultra-high-net-worth individuals, with 19,877 UHNWIs and 207 billionaires.",
    bullets: [
        "Wealth Stat: 19,877 UHNWIs and 207 billionaires resident in India.",
        "Global Rank: 6th position globally.",
        "Trend: Rapid growth in domestic wealth accumulation and private investment."
    ],
    clatFocus: "Economic trends and wealth disparity indicators for GK/Current Affairs.",
    tags: ["Knight Frank", "Wealth Report", "UHNWIs", "Economy"]
  },
  {
    id: '1',
    title: "Rocklink India Opens India’s First Lithium-Ion Battery & Rare Earth Recycling Plant in UP",
    category: 'ECONOMY',
    date: "April 2026",
    content: "Rocklink India Private Limited has inaugurated India’s first integrated lithium-ion battery and rare earth magnet recycling facility in Bulandshahr, Uttar Pradesh. The plant supports critical mineral recovery for EVs, renewable energy, and defence.",
    bullets: [
        "Capacity: 10,000 TPA of lithium-ion batteries and 60 TPM of rare earth magnets.",
        "Recovered Materials: Lithium, cobalt, nickel, manganese, neodymium, dysprosium, and terbium.",
        "Technology: Utilizes proprietary R2 recycling technology with over 98% efficiency.",
        "Compliance: Adheres to Extended Producer Responsibility (EPR) norms through 'Know Your Material' approach."
    ],
    clatFocus: "Critical for E-Waste Management Rules and Sustainable Development goals in Legal Reasoning/GK.",
    tags: ["Critical Minerals", "Recycling", "Uttar Pradesh", "EPR"]
  },
  {
    id: '2',
    title: "Regulatory Overview: Payment and Settlement Systems (PSS) Act, 2007",
    category: 'LEGAL',
    date: "Current Update",
    content: "The PSS Act, 2007 remains the cornerstone for regulating payment systems in India. Recent interpretations focus on the empowerment of RBI to oversee digital payment intermediaries.",
    bullets: [
        "RBI Authority: Section 10(2) empowers RBI to issue guidelines for systemic efficiency.",
        "Settlement Finality: Section 23 ensures that settlement finality is legally protected even in insolvency.",
        "Nomenclature: Defines 'Payment System' and 'System Provider' in broad terms to include digital wallets."
    ],
    clatFocus: "Crucial for Banking Law and RBI's regulatory jurisdiction passages.",
    tags: ["RBI", "PSS Act", "Digital Payments", "Banking Law"]
  },
  {
    id: '3',
    title: "Multi-Stage Satellite Launch Vehicle Mission Scheduled for June 2026",
    category: 'SCIENCE',
    date: "June 2026 (Scheduled)",
    content: "ISRO and IN-SPACe are overseeing the mission of a multi-stage launch vehicle engineered to carry satellites up to 350kg into Low Earth Orbit (LEO).",
    bullets: [
        "Technical Spec: Carry up to 350kg into LEO (160km to 2,000km altitude).",
        "Oversight: Technical oversight by ISRO; approval by Indian National Space Promotion and Authorization Center (IN-SPACe).",
        "Strategic Value: Enhancing India's commercial small-satellite launch capabilities."
    ],
    clatFocus: "Important for Science & Technology sections; understanding the roles of IN-SPACe and ISRO in space commercialization.",
    tags: ["ISRO", "IN-SPACe", "LEO", "Satellites"]
  },
  {
    id: '4',
    title: "ISSF & IPC Transfer Governance of Para Shooting Sport",
    category: 'SPORTS',
    date: "April 2026",
    content: "The International Shooting Sport Federation (ISSF) and International Paralympic Committee (IPC) signed an agreement to transfer governance of Shooting Para Sport from IPC to ISSF.",
    bullets: [
        "Objective: Create unified governance for Olympic and Paralympic shooting and harmonize rules.",
        "Timeline: Ratification in late 2026; integration period 2027-2028.",
        "Transition: Aimed at minimum disruption before the Los Angeles 2028 Paralympics."
    ],
    clatFocus: "Relevant for Sports Law and International Governance frameworks in GK.",
    tags: ["ISSF", "IPC", "Para Sports", "Governance"]
  },
  {
    id: '11',
    title: "Skyroot Aerospace Flags Off Vikram-1: India’s First Private Orbital Rocket",
    category: 'SCIENCE',
    date: "April 29, 2026",
    content: "Telangana CM flagged off Vikram-1, a multi-stage orbital launch vehicle developed by Skyroot Aerospace, marking a milestone in India's private space sector.",
    bullets: [
        "Mission: Launching CubeSats into Low Earth Orbit (LEO).",
        "Developer: Skyroot Aerospace (Hyderabad-based startup).",
        "Context: First privately built orbital rocket in India."
    ],
    clatFocus: "Space sector reforms and private participation in strategic infrastructure.",
    tags: ["Skyroot", "Vikram-1", "SpaceTech", "Privatization"]
  },
  {
    id: '12',
    title: "NITI Aayog Releases 'Moving Towards Effective City Government' Report",
    category: 'LEGAL',
    date: "April 29, 2026",
    content: "Union Minister Manohar Lal Khattar released a NITI Aayog report highlighting essential urban governance reforms and the role of million-plus cities in achieving 'Viksit Bharat 2047'.",
    bullets: [
        "Focus: Stronger city leadership, fiscal independence, and administrative reforms.",
        "Target: Reaching development milestones by 2047.",
        "Key Actor: NITI Aayog's policy framework for urban decentralization."
    ],
    clatFocus: "Important for Administrative Law and Local Governance (74th Amendment) context.",
    tags: ["NITI Aayog", "Urban Governance", "Viksit Bharat", "Policy"]
  },
  {
    id: '13',
    title: "RBI Revokes Paytm Payments Bank License Under BR Act 1949",
    category: 'LEGAL',
    date: "April 27, 2026",
    content: "The Reserve Bank of India has officially revoked the license of Paytm Payments Bank Limited (PPBL) under Section 22(4) of the Banking Regulation Act, 1949, citing persistent non-compliance.",
    bullets: [
        "Legal Basis: Section 22(4) of the Banking Regulation Act, 1949.",
        "Entity: Paytm Payments Bank Limited (PPBL).",
        "Impact: Total cessation of banking operations and wallet services under the license."
    ],
    clatFocus: "Crucial for Banking Laws and Regulatory Power of RBI under the BR Act.",
    tags: ["RBI", "PPBL", "Banking Regulation", "Paytm"]
  },
  {
    id: '14',
    title: "India's First Cooperative-Led Ride-Hailing App 'Bharat Taxi' Launched",
    category: 'ECONOMY',
    date: "April 27, 2026",
    content: "Union Minister Piyush Goyal launched 'Bharat Taxi' in Mumbai, India's first cooperative-led ride-hailing app, operating on a zero-commission model to support drivers.",
    bullets: [
        "Model: Zero-commission cooperative framework.",
        "Launch City: Mumbai.",
        "Significance: Alternative to global aggregator platforms like Uber/Ola."
    ],
    clatFocus: "Cooperative societies and economic models in Indian industry.",
    tags: ["Bharat Taxi", "Cooperative", "Startup", "Mumbai"]
  },
  {
    id: '15',
    title: "India Approves Rs 30 Billion Currency Swap for Maldives under SAARC Framework",
    category: 'ECONOMY',
    date: "April 25, 2026",
    content: "The Government of India approved a Rs 30 billion currency swap facility for the Maldives under the SAARC Currency Swap Framework (2024-2027) to support its economic stability.",
    bullets: [
        "Framework: SAARC Currency Swap Arrangement (INR Swap Window).",
        "Amount: Rs 30 billion (approx $360 million).",
        "Strategic Value: Strengthening ties with Maldives and supporting regional economic diplomacy."
    ],
    clatFocus: "Important for International Relations and SAARC economic cooperation frameworks.",
    tags: ["Maldives", "SAARC", "Currency Swap", "Foreign Policy"]
  },
  {
    id: '16',
    title: "NASA Unveils 'Nancy Grace Roman Space Telescope' for Dark Matter Research",
    category: 'SCIENCE',
    date: "April 25, 2026",
    content: "NASA introduced the Roman Space Telescope, designed to observe large patches of the sky in infrared light to solve mysteries of dark energy and dark matter.",
    bullets: [
        "Objective: Dark matter mapping and exoplanet discovery.",
        "Specs: 100x field of view of Hubble; will transmit 11TB of data daily.",
        "Status: Positioned 1.5 million km from Earth at L2 point."
    ],
    clatFocus: "Space exploration milestones and international scientific research.",
    tags: ["NASA", "Roman Telescope", "Dark Matter", "Space"]
  },
  {
    id: '5',
    title: "India–New Zealand Signed FTA in New Delhi; USD 20 Billion Investment",
    category: 'ECONOMY',
    date: "April 29, 2026",
    content: "India and New Zealand signed a Comprehensive Free Trade Agreement (FTA) at Bharat Mandapam, targeting USD 20 billion in investment over 15 years.",
    bullets: [
        "Market Access: India gains 100% duty-free access on 8,284 tariff lines.",
        "Services: New Zealand opens 118 sectors including IT, Education, and Finance.",
        "Investment: Commitment of $20bn in infrastructure, renewables, and startups."
    ],
    clatFocus: "High yield for International Trade Law and bilateral economic frameworks.",
    tags: ["FTA", "New Zealand", "Trade", "Viksit Bharat"]
  },
  {
    id: '6',
    title: "Right to Safe Road Travel declared part of Article 21: Supreme Court",
    category: 'LEGAL',
    date: "April 29, 2026",
    content: "The Supreme Court officially declared the 'Right to Safe Road Travel' as an integral part of the 'Right to Life' under Article 21 during the 'In Re: Phalodi Accident' matter.",
    bullets: [
        "Directives: Banned unauthorized dhabas on Highway 'Right of Way' (ROW).",
        "Mandate: State duty to ensure safe infrastructure and prevent avoidable loss of life.",
        "Enforcement: Barred heavy vehicle parking outside designated zones."
    ],
    clatFocus: "Fundamental for Constitutional Law and the expansion of the Right to Life doctrine.",
    tags: ["Article 21", "Supreme Court", "Road Safety", "Constitutional Law"]
  },
  {
    id: '7',
    title: "Jordan joins India-led Global Initiatives ISA, CDRI, and GBA",
    category: 'INTERNATIONAL',
    date: "April 2026",
    content: "Jordan has formally joined the International Solar Alliance (ISA), Coalition for Disaster Resilient Infrastructure (CDRI), and Global Biofuels Alliance (GBA).",
    bullets: [
        "Clean Energy: Supports Jordan’s goal of 50% renewable electricity by 2030.",
        "Diplomacy: Deepens India-Jordan ties during their 75th year of diplomatic relations.",
        "Resilience: Partnership in water and transport sector climate resilience."
    ],
    clatFocus: "Critical for Environmental Law and India's role in global climate diplomacy.",
    tags: ["Jordan", "ISA", "CDRI", "Climate Policy"]
  },
  {
    id: '8',
    title: "UP Introduces 10-year 'Warranty' Model for Rural Water Schemes",
    category: 'LEGAL',
    date: "April 2026",
    content: "Uttar Pradesh became the first state to mandate long-term accountability for rural water infrastructure under the Jal Jeevan Mission (JJM).",
    bullets: [
        "Accountability: Agencies must operate and maintain systems for 10 years.",
        "Policy: Ownership transferred to Gram Panchayats under the 'Jal Arpan' initiative.",
        "Sustainability: Deployment of 33,000 solar-powered schemes."
    ],
    clatFocus: "Relevant for Administrative Law and State-level environmental governance initiatives.",
    tags: ["Jal Jeevan Mission", "UP", "Governance", "Water Management"]
  },
  // ── AffairsCloud Scraped: May 2026 ──────────────────────────────────────────
  {
    id: 'ac-001',
    title: "Sikkim Becomes India's First Paperless Judiciary State",
    category: 'LEGAL',
    date: "May 3, 2026",
    content: "The High Court of Sikkim and all subordinate courts in the state have transitioned to a completely paperless system, including e-filing, electronic summons, and digital display of case status.",
    bullets: [
        "Initiative: All courts now use e-filing and digital case management.",
        "Technology: Electronic summons and digital display of case status.",
        "Significance: Sikkim is the first state to achieve complete judicial digitization."
    ],
    clatFocus: "Directly relevant to CLAT Legal Reasoning on judicial reforms, e-courts under the eCourts Mission Mode Project, and access to justice under Article 21.",
    tags: ["Sikkim", "Judiciary", "Digitization", "eCourts", "Article 21"]
  },
  {
    id: 'ac-002',
    title: "Citizenship (Amendment) Rules, 2026 Notified by MHA",
    category: 'LEGAL',
    date: "May 3, 2026",
    content: "The Ministry of Home Affairs (MHA) notified the Citizenship (Amendment) Rules, 2026, providing a clear framework for CAA applications including required documents and the role of District Level Committees.",
    bullets: [
        "Legal Basis: Operationalizes the Citizenship Amendment Act (CAA), 2019.",
        "Process: Applications via online portal; District Level Committees to verify.",
        "Documents: Specifies nationality proof from Afghanistan, Pakistan, or Bangladesh."
    ],
    clatFocus: "High priority CLAT topic. Covers Constitutional Law (Art. 11, Art. 14), citizenship law, and the CAA controversy. Frequently tested in both GK and Legal Reasoning sections.",
    tags: ["CAA", "Citizenship", "MHA", "Constitutional Law", "Art 14"]
  },
  {
    id: 'ac-003',
    title: "Right to Safe Road Travel is a Fundamental Right: Supreme Court",
    category: 'LEGAL',
    date: "April 29, 2026",
    content: "In a landmark judgment, the Supreme Court ruled that the right to safe and motorable roads is an integral part of the Right to Life under Article 21 of the Constitution, directing states to prioritize road maintenance and safety audits.",
    bullets: [
        "Constitutional Basis: Right to Life (Article 21) expanded to include road safety.",
        "Directive: States must conduct mandatory road safety audits.",
        "Enforcement: Banned unauthorized structures and heavy vehicle parking on Highway ROW."
    ],
    clatFocus: "Landmark SC expansion of Article 21. Classic CLAT legal reasoning — fundamental rights, judicial expansion of Right to Life, and PIL jurisprudence. High probability of MCQ appearance.",
    tags: ["Article 21", "Supreme Court", "Road Safety", "Fundamental Rights", "PIL"]
  },
  {
    id: 'ac-004',
    title: "SEBI Introduces 'Performance Validation Agency' for Mutual Funds",
    category: 'LEGAL',
    date: "April 27, 2026",
    content: "SEBI introduced a framework for Performance Validation Agencies (PVAs) to independently verify performance claims made by mutual funds and investment advisors, ensuring market transparency.",
    bullets: [
        "Legal Basis: Powers under SEBI Act, 1992 and SEBI (Mutual Funds) Regulations, 1996.",
        "Function: Third-party verification of advertised fund performance data.",
        "Investor Protection: Reduces misleading claims and information asymmetry."
    ],
    clatFocus: "Tests CLAT GK on SEBI's quasi-judicial powers, investor protection law, and capital market regulatory framework. Know SEBI's hierarchy of powers under the SEBI Act.",
    tags: ["SEBI", "Mutual Funds", "Investor Protection", "Capital Markets", "Regulation"]
  },
  {
    id: 'ac-005',
    title: "India and New Zealand Successfully Conclude FTA Negotiations",
    category: 'INTERNATIONAL',
    date: "April 29, 2026",
    content: "India and New Zealand finalized the text of a Free Trade Agreement (FTA), the first ever between the two nations, boosting bilateral trade in dairy, services, and technology sectors.",
    bullets: [
        "Market Access: India gains 100% duty-free access on 8,284 NZ tariff lines.",
        "Services: New Zealand opens 118 sectors including IT, Education, and Finance.",
        "Investment: USD 20 billion commitment over 15 years."
    ],
    clatFocus: "Tests treaty-making powers under Art. 253 of the Constitution. Know the difference between FTA, CEPA, and CECA. Parliament must ratify trade agreements affecting domestic legislation.",
    tags: ["FTA", "New Zealand", "International Trade", "Art 253", "Bilateral"]
  },
  {
    id: 'ac-006',
    title: "India Ranks 4th in Global Military Spending in 2025: SIPRI Report",
    category: 'INTERNATIONAL',
    date: "April 28, 2026",
    content: "According to the SIPRI Report, global military expenditure reached $2.6 trillion in 2025. India retained 4th position with a spend of $85.4 billion, reflecting its modernization focus.",
    bullets: [
        "India's Spend: USD 85.4 billion — 4th highest globally.",
        "Leaders: USA ($954bn), China ($314bn), Russia ($149bn) top the list.",
        "Trend: 11th consecutive year of global military spending growth."
    ],
    clatFocus: "SIPRI is a key source for CLAT defence GK. Tests knowledge of Aatmanirbhar Bharat in defence, indigenization targets under DDP, and SIPRI's role as an international research body.",
    tags: ["SIPRI", "Military Spending", "Defence", "India", "Aatmanirbhar"]
  },
  {
    id: 'ac-007',
    title: "Jordan Joins ISA, CDRI, and Global Biofuels Alliance",
    category: 'INTERNATIONAL',
    date: "April 29, 2026",
    content: "Jordan officially became a member of three India-led multilateral initiatives: the International Solar Alliance (ISA), the Coalition for Disaster Resilient Infrastructure (CDRI), and the Global Biofuels Alliance (GBA).",
    bullets: [
        "ISA HQ: Gurugram (India); treaty-based international organization.",
        "CDRI: Launched at UNGA 2019 with India and UK co-leading.",
        "GBA: India-led initiative from G20 New Delhi Summit, 2023."
    ],
    clatFocus: "Tests knowledge of India-led international environmental initiatives. ISA has treaty status; tests international environmental law, Paris Agreement connection, and India's climate diplomacy soft power.",
    tags: ["ISA", "CDRI", "GBA", "Jordan", "Climate Diplomacy", "Environmental Law"]
  },
  {
    id: 'ac-008',
    title: "MoSPI Releases 'Women and Men in India 2025' Statistical Report",
    category: 'ECONOMY',
    date: "May 4, 2026",
    content: "MoSPI released its 26th annual report showing India's sex ratio at birth improved to 910 in 2023-25, along with significant rises in female labor force participation and maternal health indicators.",
    bullets: [
        "Sex Ratio at Birth: 910 females per 1000 males (2023-25).",
        "Female LFPR: Increased from 23.3% (2017-18) to 41.7% (2023-24).",
        "Maternal Mortality: MMR declined from 130 (2014-16) to 97 (2018-20)."
    ],
    clatFocus: "Tests CLAT GK on gender equality law, Constitutional provisions (Art. 15, 39), and welfare indices. Distinguish: sex ratio at birth vs. total sex ratio. Know key government schemes for women.",
    tags: ["MoSPI", "Gender", "Women Empowerment", "Art 15", "Statistics"]
  },
  {
    id: 'ac-009',
    title: "NITI Aayog Report: Moving Towards Effective City Government",
    category: 'LEGAL',
    date: "April 29, 2026",
    content: "NITI Aayog released a comprehensive urban reform report recommending direct election of Mayors, financial autonomy for Urban Local Bodies, and creation of a City Cadre for urban management.",
    bullets: [
        "Constitutional Basis: 74th Constitutional Amendment (Nagarpalika Act) governs ULBs.",
        "Recommendations: Direct Mayoral elections, own source revenue for ULBs.",
        "Schedule 12: Lists 18 functions that should be transferred to ULBs."
    ],
    clatFocus: "Directly tests 74th Amendment, Schedule 12, ULB powers, and decentralization. SC has repeatedly ruled on states' failure to empower ULBs. High CLAT relevance for Constitutional Law.",
    tags: ["74th Amendment", "ULB", "Urban Governance", "Decentralization", "Constitutional Law"]
  },
  {
    id: 'ac-010',
    title: "Cabinet Approves Creation of 5 New Districts in Delhi",
    category: 'LEGAL',
    date: "April 30, 2026",
    content: "The Union Cabinet approved the Delhi Government's proposal to create five new administrative districts to decentralize administration and improve public service delivery in the NCT.",
    bullets: [
        "New Districts: Najafgarh, Mehrauli, Narela, Yamuna Vihar, and Karol Bagh.",
        "Constitutional Status: Delhi governed under Art. 239AA (special provisions for NCT).",
        "Previous SC Cases: GNCTD v UOI (2018) — seminal SC judgment on Delhi's governance."
    ],
    clatFocus: "Tests Delhi's unique constitutional position under Art. 239AA. The GNCTD vs Union of India series (2018, 2023) are landmark cases frequently tested in CLAT on federal governance and L-G vs CM powers.",
    tags: ["Delhi", "NCT", "Art 239AA", "Administrative Law", "GNCTD"]
  },
  {
    id: 'ac-011',
    title: "MoEFCC and NBA Launch 5-Year Biodiversity Governance Project",
    category: 'LEGAL',
    date: "April 28, 2026",
    content: "The Ministry of Environment and National Biodiversity Authority launched a 5-year project to strengthen grassroots biodiversity governance through Biodiversity Management Committees at panchayat level.",
    bullets: [
        "Legal Basis: Biological Diversity Act, 2002 establishes NBA and BMCs.",
        "BMCs: Biodiversity Management Committees at panchayat level — protect local biodiversity.",
        "International Link: Implements obligations under the UN Convention on Biological Diversity."
    ],
    clatFocus: "Directly tests Biological Diversity Act, 2002 — NBA, SBBs, and BMC hierarchy. CLAT frequently tests environment laws. Also tests CBD and Nagoya Protocol on access and benefit sharing.",
    tags: ["NBA", "Biodiversity Act", "BMC", "Environmental Law", "CBD"]
  },
  {
    id: 'ac-012',
    title: "India-EFTA Trade and Economic Partnership Agreement (TEPA) Ratified",
    category: 'INTERNATIONAL',
    date: "April 27, 2026",
    content: "The TEPA between India and the EFTA nations (Switzerland, Norway, Iceland, Liechtenstein) was ratified, opening investment avenues in pharmaceuticals, machinery, and financial services.",
    bullets: [
        "EFTA Members: Switzerland, Norway, Iceland, and Liechtenstein.",
        "Investment Commitment: EFTA nations commit $100 billion FDI to India over 15 years.",
        "Significance: First FTA-type agreement between India and a European bloc."
    ],
    clatFocus: "Know that EFTA ≠ EU. Tests CLAT GK on trade blocs, FDI policy, and treaty-making powers under Art. 253. India's Parliament must ratify treaties affecting domestic law — key constitutional principle.",
    tags: ["EFTA", "TEPA", "FTA", "Trade Law", "Art 253", "International"]
  }
];


const PAGE_SIZE = 3;

const DailyCurrentAffairs = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [mcqAngles, setMcqAngles] = useState<Record<string, string>>({});
    const [loadingAngles, setLoadingAngles] = useState<Record<string, boolean>>({});
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const handleGenerateAngle = async (item: NewsItem) => {
        if (loadingAngles[item.id] || mcqAngles[item.id]) return;

        setLoadingAngles(prev => ({ ...prev, [item.id]: true }));
        try {
            const angle = await generateMcqAngle(item.title, item.content, item.bullets);
            setMcqAngles(prev => ({ ...prev, [item.id]: angle }));
        } catch (error) {
            console.error("Failed to generate MCQ angle:", error);
        } finally {
            setLoadingAngles(prev => ({ ...prev, [item.id]: false }));
        }
    };

    const filtered = NEWS_DATA.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(search.toLowerCase()) || 
                             news.content.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? news.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const visibleItems = filtered.slice(0, page * PAGE_SIZE);
    const hasMore = visibleItems.length < filtered.length;

    const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
        if (isFetching) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setIsFetching(true);
                // Simulate network delay for effect
                setTimeout(() => {
                    setPage(prev => prev + 1);
                    setIsFetching(false);
                }, 800);
            }
        });

        if (node) observer.current.observe(node);
    }, [hasMore, isFetching]);

    // Reset page when filtering
    useEffect(() => {
        setPage(1);
    }, [search, selectedCategory]);

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24 px-6 pt-10">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-border pb-12">
                <div>
                    <h2 className="text-xs text-primary font-bold tracking-[0.4em] mb-4 uppercase">Academic Intelligence</h2>
                    <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter leading-tight italic">Daily Briefing.</h1>
                </div>
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <Input 
                        placeholder="Search daily files..." 
                        className="bg-accent h-16 pl-12 rounded-none border-border focus:border-primary text-white font-serif italic text-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest border-l-2 border-primary pl-4">Classifiers</h4>
                        <div className="flex flex-col gap-1">
                            {['ECONOMY', 'LEGAL', 'SCIENCE', 'SPORTS', 'INTERNATIONAL'].map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                    className={`text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                        selectedCategory === cat ? 'bg-primary text-black' : 'hover:bg-accent text-gray-500 hover:text-white'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-surface border border-border">
                        <div className="flex items-center gap-2 mb-4 text-primary">
                            <Clock size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Update Cycle</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-medium uppercase tracking-[0.1em]">
                            Archives are refreshed every 24 hours to ensure 100% curriculum alignment with NLU standards.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-px bg-border border border-border">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                ref={idx === visibleItems.length - 1 ? lastArticleRef : null}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (idx % PAGE_SIZE) * 0.05 }}
                                className="bg-background p-10 group hover:bg-surface transition-all relative overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-primary/10 text-primary px-3 py-1.5 border border-primary/20">
                                            {item.category}
                                        </span>
                                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Calendar size={12} /> {item.date}
                                        </span>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="text-gray-700 hover:text-primary transition-colors"><Bookmark size={18} /></button>
                                        <button className="text-gray-700 hover:text-primary transition-colors"><Share2 size={18} /></button>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10 max-w-4xl">
                                    <h3 className="text-3xl font-serif text-white italic leading-[1.2] group-hover:text-primary transition-colors tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-base leading-relaxed font-light">
                                        {item.content}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10 mb-12">
                                    <div className="space-y-4">
                                        <h4 className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] mb-4">Core Briefing</h4>
                                        <div className="space-y-4">
                                            {item.bullets.map((bullet, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-none mt-2 shrink-0 rotate-45" />
                                                    <span className="text-[13px] text-gray-500 leading-relaxed font-light">{bullet}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-accent/30 border-l border-primary/30 p-8 relative overflow-hidden h-fit self-start">
                                         <div className="flex items-center gap-3 mb-4 relative z-10">
                                            <Zap size={14} className="text-primary" />
                                            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Curriculum Alignment</span>
                                         </div>
                                         <p className="text-[12px] text-primary italic leading-relaxed font-serif relative z-10">
                                            "{item.clatFocus}"
                                         </p>
                                         <Globe className="absolute -bottom-8 -right-8 text-primary opacity-5 pointer-events-none" size={120} />
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <div className="bg-[#0C0F14] border border-border p-8 relative overflow-hidden group/lens">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary border border-primary/20 rotate-45 group-hover/lens:bg-primary group-hover/lens:text-black transition-all">
                                                    <Brain size={18} className="-rotate-45" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Probable MCQ Angle</h4>
                                                    <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1">AI-Powered Examiner Insight</p>
                                                </div>
                                            </div>
                                            
                                            {!mcqAngles[item.id] ? (
                                                <button 
                                                    onClick={() => handleGenerateAngle(item)}
                                                    disabled={loadingAngles[item.id]}
                                                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors disabled:opacity-50"
                                                >
                                                    {loadingAngles[item.id] ? (
                                                        <><Loader2 size={14} className="animate-spin" /> Analyzing Trajectory...</>
                                                    ) : (
                                                        <><Zap size={14} /> Reveal Intelligence</>
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                    <span className="text-[8px] text-green-500 font-black uppercase tracking-widest">Intelligence Locked</span>
                                                </div>
                                            )}
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {mcqAngles[item.id] ? (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <p className="text-gray-400 text-sm leading-relaxed font-light first-letter:text-2xl first-letter:font-serif first-letter:text-white first-letter:float-left first-letter:mr-2">
                                                        {mcqAngles[item.id]}
                                                    </p>
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                                                            <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Fact Retrieval</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                                                            <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Legal Intent</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : !loadingAngles[item.id] ? (
                                                <p className="text-gray-700 text-[11px] italic font-medium leading-relaxed">
                                                    Connect to the Intelligence Core to generate an examiner's perspective on this development.
                                                </p>
                                            ) : null}
                                        </AnimatePresence>
                                        
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[8px] font-black text-gray-600 uppercase tracking-widest px-3 py-1.5 bg-accent/20 border border-white/5">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isFetching && (
                        <div className="bg-background p-12 text-center border-t border-border">
                            <div className="flex items-center justify-center gap-4">
                                <Loader2 size={16} className="animate-spin text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Decrypting Next Layer...</span>
                            </div>
                        </div>
                    )}

                    {!hasMore && filtered.length > 0 && (
                        <div className="bg-background p-12 text-center border-t border-border opacity-50">
                             <div className="flex flex-col items-center gap-2">
                                <div className="w-1 h-8 bg-primary/20" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700">Archival Boundary Reached</span>
                             </div>
                        </div>
                    )}

                    {filtered.length === 0 && (
                        <div className="py-32 bg-background text-center space-y-6 opacity-30">
                            <Newspaper size={64} className="text-primary mx-auto" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">No Intelligence Matches Found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyCurrentAffairs;
