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
        <div className="max-w-7xl mx-auto space-y-12 pb-24 px-6 pt-10">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-gray-100 pb-12">
                <div>
                    <h2 className="text-[10px] text-primary font-black tracking-[0.4em] mb-4 uppercase">Academic Intelligence</h2>
                    <h1 className="text-5xl lg:text-7xl font-serif text-foreground tracking-tighter leading-tight italic">Daily Briefing.</h1>
                </div>
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input 
                        placeholder="Search daily files..." 
                        className="bg-white h-16 pl-14 rounded-sm border-gray-100 focus:border-primary text-foreground font-serif italic text-xl shadow-xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1 space-y-10">
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-l-4 border-primary pl-4">Classifiers</h4>
                        <div className="flex flex-col gap-1">
                            {['ECONOMY', 'LEGAL', 'SCIENCE', 'SPORTS', 'INTERNATIONAL'].map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                    className={`text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${
                                        selectedCategory === cat ? 'bg-primary text-white shadow-lg' : 'hover:bg-primary-light/30 text-muted-foreground hover:text-primary'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-sm">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <Clock size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Update Cycle</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-bold uppercase tracking-[0.1em]">
                            Archives are refreshed every 24 hours to ensure 100% curriculum alignment with NLU standards.
                        </p>
                    </div>

                    <div className="p-8 bg-primary text-white rounded-sm shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Target size={80} /></div>
                        <h4 className="text-lg font-serif italic mb-4">Precision Mode</h4>
                        <p className="text-white/70 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                            Generate real-time MCQ analysis for any news brief using our Gemini-3.5 engine.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-8">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                ref={idx === visibleItems.length - 1 ? lastArticleRef : null}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx % PAGE_SIZE) * 0.1 }}
                                className="bg-white p-10 lg:p-14 border border-gray-100 rounded-sm shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                                    <div className="flex flex-wrap items-center gap-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-white px-4 py-2 shadow-lg">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Calendar size={14} className="text-primary" /> {item.date}
                                        </span>
                                    </div>
                                    <div className="flex gap-6">
                                        <button className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Bookmark size={20} /></button>
                                        <button className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Share2 size={20} /></button>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12 max-w-5xl">
                                    <h3 className="text-3xl lg:text-4xl font-serif text-foreground italic leading-tight group-hover:text-primary transition-colors tracking-tight font-light">
                                        {item.title}
                                    </h3>
                                    <div className="bg-primary-light/20 border-l-4 border-primary p-10 rounded-r-lg">
                                        <p className="text-[#111827] text-lg leading-relaxed font-serif">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12 mb-12">
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                                            <Globe size={16} /> Strategic Briefing
                                        </h4>
                                        <ul className="space-y-4">
                                            {item.bullets.map((bullet, i) => (
                                                <li key={i} className="flex gap-4 text-sm text-[#111827] font-medium leading-relaxed">
                                                    <span className="text-primary font-black flex-shrink-0 mt-1">•</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                                            <Target size={16} /> CLAT Focus
                                        </h4>
                                        <div className="p-6 bg-[#F9FAFB] border border-gray-100 rounded-sm italic text-[#111827] text-sm leading-relaxed font-serif">
                                            {item.clatFocus}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-12">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-muted-foreground bg-gray-50 px-3 py-1.5 border border-gray-100">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-primary-light text-primary rounded-full shadow-inner"><Brain size={24} /></div>
                                        <div>
                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-foreground">AI MCQ Angle</h5>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Predictive Question Logic</p>
                                        </div>
                                    </div>
                                    
                                    {!mcqAngles[item.id] ? (
                                        <button 
                                            onClick={() => handleGenerateAngle(item)}
                                            disabled={loadingAngles[item.id]}
                                            className="px-8 py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all rounded-sm flex items-center gap-3"
                                        >
                                            {loadingAngles[item.id] ? (
                                                <><Loader2 size={16} className="animate-spin" /> Analyzing Dynamics...</>
                                            ) : (
                                                <><Zap size={16} /> Generate MCQ Logic</>
                                            )}
                                        </button>
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex-1 max-w-xl p-8 bg-primary text-white rounded-sm shadow-2xl relative"
                                        >
                                            <div className="absolute top-4 right-4 opacity-20"><Target size={32} /></div>
                                            <p className="text-sm font-serif italic leading-relaxed">
                                                {mcqAngles[item.id]}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isFetching && (
                        <div className="py-12 flex items-center justify-center gap-4 text-primary">
                            <Loader2 className="animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Retrieving Next Archives...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyCurrentAffairs;
