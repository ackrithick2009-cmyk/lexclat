import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timer, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, BarChart3, Calendar, Clock, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc, query, onSnapshot } from 'firebase/firestore';
import { toast } from 'sonner';

const SECTIONS = [
  { id: 'english', label: 'English', questions: 24 },
  { id: 'current', label: 'Current Affairs', questions: 28 },
  { id: 'legal', label: 'Legal Reasoning', questions: 32 },
  { id: 'logical', label: 'Logical Reasoning', questions: 24 },
  { id: 'quant', label: 'Quant Techniques', questions: 12 },
];

const MOCK_TRANSCRIPTS = {
  'clat-2024': {
    english: {
      passage: "A country cannot choose its neighbours; geography does. History attests that fighting on two fronts or Interior lines is most ill-advisable, yet circumstances can make it unavoidable. The first example that comes to mind is the Battle of the Pusan (Busan) Perimeter in August and September 1950 during the Korean War. The Korean People's Army (KPA) had out-fought the United Nations forces and pushed them down the Korean peninsula...",
      question: "What was a pre-requisite for a force operating on Exterior lines to be successful, according to the passage?",
      options: [
        "Maintaining a defensive posture at all times.",
        "Applying pressure all along the front in sufficient strength.",
        "Seeking diplomatic solutions before launching an attack.",
        "Collaborating with international allies to share data."
      ]
    },
    legal: {
      passage: "The recently passed Delhi Services Act runs counter to the constitutional ethos and legitimises the babu-neta nexus. While asserting the supremacy of politics and administration over the judiciary, it ensures that the Union government's political agenda is thrust on an elected chief minister. This law damages the very federal structure, to uphold which, the All India Services were created...",
      question: "How does the passage characterize the impact of the Delhi Services Act on the federal structure?",
      options: [
        "It strengthens the federal structure by balancing power.",
        "It promotes healthy collaboration between the Union and States.",
        "It undermines federalism by granting the Centre veto over state decisions.",
        "It has no significant impact on the constitutional arrangement."
      ]
    },
    current: {
      passage: "India and Egypt signed a strategic partnership as PM Modi visited Cairo. Egypt bestowed the topmost state honour, 'Order of the Nile', upon the Indian leader. The two sides discussed green energy, agriculture, and archaeology. recipients of this honour including the late Sultan Qaboos, Nelson Mandela, and Suharto.",
      question: "Which prestigious honour was bestowed upon the Indian Prime Minister by the Government of Egypt during his 2023 visit?",
      options: [
        "Order of the Nile",
        "Order of Merit",
        "Order of the Sphinx",
        "Order of Suez"
      ]
    },
    logical: {
      passage: "Yoga in modern society is often used as a tool for self-development. Although traditional practice places a high importance on achieving one's highest Self, freeing one's Self from the dominance of the ego is also a core yogic principle. pop culture has increased the demands of a global market for yoga, reflecting a heightened desire for beauty and fitness...",
      question: "Which of the following is most supported by the author's argument regarding modern yoga?",
      options: [
        "The concept of yoga originated from Western celebrities.",
        "The tenets of yoga are better understood today than in the 19th century.",
        "The emphasis on health and beauty has diluted the spiritual essence of traditional yoga.",
        "Social media has helped bridge the gap between traditional and modern yoga."
      ]
    }
  },
  'nlsm-2024': {
    english: {
      passage: "The only time I had for hunting was after the day’s work was done, and so it was that we took to hunting at night with the aid of torches. We would scour the forest from midnight to three o’clock in the morning, and by this method we obtained a number of nocturnal beasts which we should otherwise never have seen. The forest at night was a very different place from the forest by day: everything seemed awake and watchful...",
      question: "Which word aptly describes the word 'scour' as used in the passage?",
      options: [
        "Move slowly",
        "Ransack",
        "Scrub",
        "Comb through"
      ]
    },
    legal: {
      passage: "The Madras High Court held that Municipality Heads would be personally liable in case any person is found to be indulging in manually cleaning the sewers. It also directed the heads of corporations and municipalities to file a written undertaking to the effect that no manual scavenging work would be permitted to be undertaken within their jurisdiction...",
      question: "Can the Municipality be held responsible if no head has been appointed yet for the area?",
      options: [
        "Yes, as the department is suo moto liable for the same.",
        "No, as there is no one to pin the responsibility on.",
        "Yes, as the complaint can still be registered, regardless of vacancy.",
        "No, as the presence of the head is mandatory to file a complaint."
      ]
    },
    logical: {
      passage: "Social distancing would be a lot harder without the internet. Writers have long seen the internet as the enemy of productivity and have for years now been putting in place practices that limit their time online while writing. Zadie Smith doesn't have a Smartphone while Jonathan Franzen writes in a room without wi-fi and tapes up the ports on his computers...",
      question: "Which of the following strengthens the arguments made in the passage regarding focus?",
      options: [
        "Social media is a brilliant way to connect to other writers.",
        "Social media is the enemy of critical thought and deep focus for writers.",
        "It is important to use social media as a platform to reach fans.",
        "Social media provides a world of inspiration to young writers."
      ]
    },
    current: {
      passage: "The NISAR mission, a collaboration between ISRO and NASA, is pegged at $1.5 billion. It will provide critical information on earth's crust, ice sheets, and ecosystems. NASA has provided the L-band radar, GPS, and a high-capacity solid-state recorder, while ISRO has provided the S-band radar and the GSLV launch system.",
      question: "Under the NISAR mission agreement, which component is specifically provided by ISRO?",
      options: [
        "L-band radar and GPS",
        "High-capacity solid-state recorder",
        "S-band radar and GSLV launch system",
        "Critical information on ice sheets"
      ]
    },
    quant: {
      passage: "A house has base dimensions 20m x 15m and height 3m. It consists of two rooms (10m x 5m each), a hall (20m x 5m), store rooms (8m x 5m) and a kitchen (12m x 5m). Outer walls cost ₹210/sq m to paint, while inner walls cost ₹150/sq m.",
      question: "What would be the approximate total cost of painting the outer surface of the four walls?",
      options: [
        "₹34,200",
        "₹44,100",
        "₹48,100",
        "₹52,000"
      ]
    }
  },
  'quants-mastery-24': {
    english: {
      passage: "Computational thinking in law is an overlooked necessity. The logic required to parse a complex trust settlement or a multi-party damages claim is functionally identical to solving a high-level quantitative text. Aspirants who master the 'Language of Numbers' are better equipped for the evidentiary rigor of modern litigation. It is not about arithmetic alone, but about the structure of variables.",
      question: "The author's primary argument is that:",
      options: [
        "Math is more important than law for CLAT.",
        "Quantitative logic is functionally similar to legal analysis.",
        "Modern litigation requires more computation than interpretation.",
        "Language and numbers should never be mixed in exams."
      ]
    },
    legal: {
      passage: "Principle: 'Quantum Ramifactus' (or Quantum Meruit) suggests that a person should be paid for the work they have done if the contract is terminated before completion. In addition, 'Strict Liability' mandates that the owner of a hazardous substance is liable for escape, even without negligence.\n\nFact: A builder completes 60% of a house construction before the owner goes bankrupt. The builder seeks full payment for the 60% work.",
      question: "Is the builder entitled to payment for the work done?",
      options: [
        "No, contracts must be 100% complete for payment.",
        "Yes, under the principle of Quantum Meruit.",
        "Yes, but only if the bankruptcy was the builder's fault.",
        "No, because of Strict Liability."
      ]
    },
    logical: {
      passage: "In a group of 60 students, 35 focus on Ratios and 40 focus on Percentages. Every student focuses on at least one. If a student is chosen at random, what is the probability they focus on both?",
      question: "What is the number of students who focus on both Ratios and Percentages?",
      options: [
        "15",
        "20",
        "25",
        "10"
      ]
    },
    current: {
      passage: "Agricultural advancements in India often rely on the 'Hectare-Yield' metric. The latest data from Punjab shows a 12% increase in Rice yield but a 5% decrease in Wheat due to untimely rains. Such patterns are crucial for calculating the national GDP growth contributions from the primary sector.",
      question: "Which crop saw a decline in yield according to the passage?",
      options: [
        "Rice",
        "Bazaar",
        "Wheat",
        "Cotton"
      ]
    },
    quant: {
      passage: "A train running at 40 km/h passes a man riding parallel to the railway line in the same direction at 25 km/h in 48 seconds. Find the length of the train.",
      question: "What is the length of the train in metres?",
      options: [
        "100m",
        "150m",
        "200m",
        "250m"
      ]
    }
  },
  'philology-grammar-24': {
    english: {
      passage: "Correct prepositional usage is often the deciding factor in scoring high in the English section. For example, knowing that one is 'endowed with' a quality rather than 'endowed of' is crucial. Similarly, idioms like 'to cool one's heels' (meaning to wait) or 'to give the devil his due' (to acknowledge the good in a bad person) require both rote learning and contextual application. A minor slip in a preposition like 'pertinent to' versus 'pertinent with' can change the entire meaning of a legal submission.",
      question: "Which of the following is the correct meaning of the idiom 'to cool one's heels'?",
      options: [
        "To treat someone indifferently.",
        "To make someone wait.",
        "To be kept waiting for sometime.",
        "A closed chapter."
      ]
    },
    legal: {
      passage: "Principle: 'Sub-judice' refers to a matter which is under judicial consideration and therefore prohibited from public discussion elsewhere. 'Ultra Vires' means an act done beyond the legal power or authority of an individual or body. Any act that is 'Ultra Vires' is generally considered void from the beginning.\n\nFact: The Municipal Corporation of a city passed a resolution to rename its High Court. Renaming High Courts is a power exclusively reserved for the State Assembly or Parliament.",
      question: "The action of the Municipal Corporation is most likely:",
      options: [
        "Intra Vires",
        "Sub-judice",
        "Ultra Vires",
        "Res Judicata"
      ]
    },
    logical: {
      passage: "I. All legal cases currently in court are sub-judice.\nII. The case of 'Reliance vs. Tata' is currently in court.\nConclusion: The case of 'Reliance vs. Tata' is sub-judice.",
      question: "Which of the following describes the relationship between the premises and the conclusion?",
      options: [
        "The conclusion always follows if premise I is true.",
        "The conclusion follows logically from both premises.",
        "The conclusion depends on the judge's opinion.",
        "Premise II is irrelevant to the conclusion."
      ]
    },
    current: {
      passage: "Ancient and medieval history often feature in general awareness questions. The temple of Somnath was famously destroyed in 1026 A.D. by Mahmud of Ghazni. In the post-modern era, India has seen milestones like the launch of the first indigenous animation film 'Chutkanki Mahabharat'.",
      question: "Who destroyed the temple of Somnath in 1026 A.D.?",
      options: [
        "Mahmud of Ghazni",
        "Mohammed Ghori",
        "Babur",
        "Ibrahim Lodi"
      ]
    },
    quant: {
      passage: "In a class of 100 students studying for CLAT, 60% of students made errors in 'Spellings', 40% made errors in 'Prepositions', and 20% made errors in both. How many students made NO errors in either category?",
      options: [
        "20",
        "40",
        "10",
        "30"
      ]
    }
  },
  'grammar-usage-2024': {
    english: {
      passage: "The distinction between 'Between' and 'Among' is a classic staple of the CLAT English section. 'Between' is strictly used when referring to two distinct entities, whereas 'Among' is reserved for three or more. Furthermore, prepositional accuracy is non-negotiable. One does not delve 'in' politics; one delves 'into' them. Similarly, a judge does not grope 'to' a conclusion but 'for' it. These nuances, often overlooked by average aspirants, separate the top rankers from the rest.",
      question: "According to the passage, what is the correct usage of prepositions for 'delve' and 'grope'?",
      options: [
        "Delve in, Grope to",
        "Delve into, Grope for",
        "Delve with, Grope with",
        "Delve from, Grope from"
      ]
    },
    legal: {
      passage: "Principle: 'Mandamus' is a writ issued by a superior court to a lower court or government official, commanding the performance of a specific public or statutory duty. It is not available against a private individual.\n\nFact: Ramesh, a citizen, refuses to pay back a loan to Suresh. Suresh approaches the High Court seeking a writ of Mandamus to compel Ramesh to pay.",
      question: "Is the writ of Mandamus likely to be issued?",
      options: [
        "Yes, because paying a loan is a duty.",
        "No, Mandamus cannot be issued against a private individual.",
        "Yes, the High Court has power over all citizens.",
        "No, but only if Ramesh proves he is bankrupt."
      ]
    },
    logical: {
      passage: "If a person is a good judge, they never grope for a conclusion. Justice Khanna is a good judge. Therefore, Justice Khanna never gropes for a conclusion. If Justice Khanna never gropes for a conclusion, her decisions are likely resolute.",
      question: "Which of the following is a logical inference from the passage?",
      options: [
        "Justice Khanna's decisions are likely resolute.",
        "All judges are good judges.",
        "Groping for a conclusion is necessary for resolution.",
        "Only Justice Khanna is a good judge."
      ]
    },
    current: {
      passage: "National milestones in defense and policy are frequently tested. The Agni-6, a formidable intercontinental ballistic missile developed by DRDO, awaits the Centre's nod for launch. Meanwhile, the RTI Act 2005 remains a critical tool for transparency, though it has several limitations noted by activists.",
      question: "Which organization developed the Agni-6 missile?",
      options: [
        "ISRO",
        "HAL",
        "DRDO",
        "BHEL"
      ]
    },
    quant: {
      passage: "In a 'Common Error' test, 70 students appeared. 40 passed in 'Prepositions', 35 passed in 'Idioms', and 20 passed in both. How many students failed in both categories?",
      options: [
        "15",
        "10",
        "5",
        "20"
      ]
    }
  },
  'quants-drills-2024': {
    english: {
      passage: "The linguistic precision required for Quantitative Techniques is often underestimated. Questions related to ratios, proportions, and averages are not just numerical puzzles but tests of reading comprehension. For instance, the phrase 'difference between the two sides of the farm' requires one to first calculate the area and then deduce dimensions. Aspirants must approach Quants with a 'literary' eye, ensuring no variable is misread.",
      question: "Which of the following best describes the author's argument regarding Quants?",
      options: [
        "It is solely a test of mathematical ability.",
        "It requires significant linguistic and reading precision.",
        "It should be skipped by those with a background in arts.",
        "It is the easiest section of the CLAT exam."
      ]
    },
    legal: {
      passage: "Principle: 'Strict Liability' applies when a person brings onto their land something which is 'non-natural' and likely to do mischief if it escapes. Under Section 16 of the Hindu Marriage Act, children of void marriages are considered 'legitimate' for inheritance purposes.\n\nFact: A factory owner stores toxic gas in a tank. A sudden earthquake causes the tank to rupture, and individuals in the nearby village suffer respiratory issues.",
      question: "Is the factory owner liable under Strict Liability?",
      options: [
        "Yes, absolute liability applies here.",
        "No, as the earthquake is an 'Act of God' (exception).",
        "Yes, but only if he was negligent.",
        "No, because gas is a natural substance."
      ]
    },
    logical: {
      passage: "If a student completes 183 questions out of 200, and their accuracy is 80%, they score significantly. However, if the time taken is disproportionate, the 'average speed' of solving questions becomes a bottleneck. Efficiency is a function of both speed and accuracy.",
      question: "Based on the text, what is the 'bottleneck' for high scores if accuracy is constant?",
      options: [
        "The number of questions attempted.",
        "The average speed of solving questions.",
        "The difficulty of questions.",
        "The subject of the questions."
      ]
    },
    current: {
      passage: "Energy and defense sectors are vital for national security. INS Nireekshak recently led interoperability drills in Colombo. Meanwhile, India's foreign investment in solar energy continues to rise, aiming for a sustainable future.",
      question: "Which Indian vessel led the interoperability drills in Colombo in 2026?",
      options: [
        "INS Vikrant",
        "INS Nireekshak",
        "INS Arihant",
        "INS Talwar"
      ]
    },
    quant: {
      passage: "A man rows to a place 45 km distant and back in 12 hours. He realizes that he can row 5 km downstream in the same time as 3 km upstream.",
      question: "What is the speed of the stream?",
      options: [
        "1.5 km/hr",
        "1.25 km/hr",
        "2 km/hr",
        "2.5 km/hr"
      ]
    }
  },
  'lexicon-mastery-24': {
    english: {
      passage: "The study of anagrams and complex spellings is not merely an academic exercise but a critical component of linguistic precision. Anagrams, which involve the rearrangement of letters to form new words, challenge the brain's pattern recognition. Similarly, identifying 'Common Error' words like 'accommodate' or 'occasion' requires a keen eye for detail. This precision is essential for effective legal communication where every character can alter the interpretation of a statute.",
      question: "Which of the following is highlighted as a benefit of studying anagrams in the passage?",
      options: [
        "Improving physical health.",
        "Enhancing pattern recognition capabilities.",
        "Learning ancient history.",
        "Developing manual dexterity."
      ]
    },
    legal: {
      passage: "Principle: The maxim 'Audi Alteram Partem' is a fundamental pillar of natural justice. It ensures that no party is condemned without a fair hearing. 'Animus Possidendi' refers to the mental state required for possession, while 'Caveat Venditor' warns sellers that they are responsible for the quality of the goods they provide.\n\nFact: A administrative tribunal passes an order against a company without allowing them to file a response or present their arguments.",
      question: "Which maxim has been violated by the tribunal?",
      options: [
        "Animus Possidendi",
        "Caveat Venditor",
        "Audi Alteram Partem",
        "De Facto"
      ]
    },
    logical: {
      passage: "All legal maxims are in Latin. 'De Jure' is a legal maxim. Therefore, 'De Jure' is in Latin. If 'De Jure' is in Latin, it is likely of ancient origin. 'De Jure' is indeed an ancient phrase.",
      question: "Which of the following is the most direct conclusion from the premise 'All legal maxims are in Latin' and ''De Jure' is a legal maxim'?",
      options: [
        "De Jure is of Greek origin.",
        "De Jure is in Latin.",
        "All Latin phrases are legal maxims.",
        "De Jure is better than De Facto."
      ]
    },
    current: {
      passage: "World history is dotted with 'firsts'. Sirimavo Bandaranaike made history as the world's first female Prime Minister. In India, Kanchan Choudhary became the first woman Director-General of Police. Understanding these milestones helps aspirants appreciate the evolution of modern governance and social equity.",
      question: "Who was the first female Prime Minister in the world?",
      options: [
        "Indira Gandhi",
        "Margaret Thatcher",
        "Sirimavo Bandaranaike",
        "Golda Meir"
      ]
    },
    quant: {
      passage: "A library has 1000 books. 25% are about Legal Maxims, 35% are about English Literature, and the rest are GK. If 50% of the Legal Maxims books are in Latin, how many books are NOT in Latin assuming no other books are in Latin?",
      options: [
        "875",
        "750",
        "125",
        "500"
      ]
    }
  },
  'lexicon-gk-2024': {
    english: {
      passage: "An anagram is the result of rearranging the letters of a word or phrase to produce a new word or phrase, using all the original letters exactly once. This linguistic device is often used in literature and puzzles to create hidden meanings or simply for wordplay. For instance, 'Listen' can be rearranged to 'Silent'. Understanding the structure of words is as vital as understanding their dictionary definitions.",
      question: "Which of the following defines an 'anagram' correctly?",
      options: [
        "A geometrical shape with 'n' number of sides.",
        "The result of rearranging letters to produce a new word.",
        "A telegraph transmitted via analogous mode.",
        "A technique for constructing holograms."
      ]
    },
    legal: {
      passage: "Principle: The term 'Ratio Decidendi' refers to the legal, moral, political and social principles used by a court to compose the rationale of a particular judgment. It is the part of the case that is binding on lower courts. 'Obiter Dicta' are remarks made by a judge which are not essential to the decision and therefore not binding.\n\nFact: In a case regarding property rights, the judge decides in favor of the plaintiff but mentions in passing that 'the law on digital assets also needs urgent reform'.",
      question: "The judge's remark about 'digital assets' is most likely:",
      options: [
        "Ratio Decidendi",
        "Obiter Dicta",
        "A binding precedent",
        "Jus Cogens"
      ]
    },
    current: {
      passage: "Historical landmarks often define the identity of a nation. The FIR relating to the assassination of Mahatma Gandhi was registered at the Tuglaq Road Police Station. Meanwhile, in the world of art, the masterpiece 'Mona Lisa' continues to draw millions to the Louvre in Paris.",
      question: "In which police station was the FIR relating to Mahatma Gandhi's assassination registered?",
      options: [
        "Parliament Street Police Station",
        "Tuglaq Road Police Station",
        "Daryaganj Police Station",
        "Janpath Police Station"
      ]
    }
  },
  'clat-2025-p1': {
    english: {
      passage: "The sudden shift to remote learning during the pandemic highlighted the 'digital divide' — the gap between those with easy access to the internet and technology and those without. For many students in rural or low-income areas, the lack of a reliable internet connection meant a complete halt to their education. This divide is not just about equipment; it's about digital literacy and the ability to navigate online resources effectively. As schools transition back to physical classrooms, the question remains: how do we ensure that digital tools enhance rather than exacerbate educational inequality?",
      question: "Which of the following best captures the central challenge identified in the passage?",
      options: [
        "The technical difficulty of setting up remote learning platforms.",
        "The failure of students to adapt to online learning environments.",
        "The risk that technology might widen existing educational disparities.",
        "The inevitable obsolescence of physical classrooms in the digital age."
      ]
    },
    legal: {
      passage: "Principle: A person is liable for negligence if they owe a duty of care to someone, breach that duty, and cause 'foreseeable damage.' However, if a party has been warned of a specific risk and still chooses to proceed, the duty to warn might be fulfilled, provided the warning was adequate. \n\nFact: Soman, a tour operator, takes a group to a high-altitude lake. He warns them: 'The weather here changes in seconds; do not leave the base camp without the guide.' Pamela, an experienced trekker, decides to go for a solo sunrise walk nearby. A sudden snowstorm occurs, and she suffers severe frostbite. She sues Soman for negligence.",
      question: "Will Pamela succeed in her suit against Soman?",
      options: [
        "Yes, Soman as a tour operator has an absolute duty to ensure every guest's safety.",
        "No, Soman fulfilled his duty to warn, and Pamela voluntarily assumed the risk.",
        "Yes, Soman should have physically restrained Pamela from leaving.",
        "No, because frostbite is an 'Act of God' for which no human can be liable."
      ]
    },
    logical: {
      passage: "Generative AI is transforming creative industries, from writing to graphic design. While some see it as a tool that enhances human creativity by handling repetitive tasks, others fear it will lead to the devaluation of human output. If the barrier to producing content is lowered to a simple prompt, the argument goes, then the 'soul' of art — the human struggle and intent — is lost. However, history shows that every new technology, from the camera to digital synthesizers, initially faced similar skepticism before being integrated into the creative kit.",
      question: "Which of the following, if true, would most weaken the 'devaluation' argument?",
      options: [
        "AI-generated art has already sold for thousands of dollars at major auctions.",
        "Professional artists are using Generative AI to iterate on complex concepts faster than ever.",
        "Most people cannot distinguish between human-written and AI-written poetry.",
        "Copyright laws are currently being updated to address AI-generated content."
      ]
    },
    current: {
      passage: "The Criminal Procedure (Identification) Act, 2022, expands the scope of 'measurements' that law enforcement can collect from convicts and arrested persons. These now include biological samples, behavioral attributes like signatures and handwriting, and iris/retina scans. While proponents argue this will improve conviction rates and modernize investigations, privacy advocates raise concerns over the storage of sensitive data for up to 75 years and the potential for misuse.",
      question: "What is the primary justification offered by the government for the expanded data collection under this Act?",
      options: [
        "To provide employment to data scientists in the police force.",
        "To modernize investigations and improve the efficiency of the criminal justice system.",
        "To create a national database for the 2024 general elections.",
        "To fulfill international treaties with the FBI and Interpol."
      ]
    },
    quant: {
      passage: "A library has two sections: Reference and Circulation. In the Reference section, 40% of the books are in Law, 30% in History, and the rest in Science. In Circulation, 20% are Law, 50% are Literature, and 30% are Science. The Reference section has 5,000 books, and Circulation has 15,000 books.",
      question: "What is the ratio of the total number of Law books to the total number of Science books in the entire library?",
      options: [
        "5:8",
        "5:6",
        "2:3",
        "1:1"
      ]
    }
  },
  'clat-2025-p2': {
    english: {
      passage: "Journalism in the 21st century faces a dual crisis of trust and sustainability. On one hand, the proliferation of misinformation on social media has made it harder for citizens to distinguish fact from fiction. On the other hand, the collapse of the traditional advertising-based business model has left many local newsrooms struggling to survive. Without investigative reporting at the local level, who will hold city officials and corporations accountable? The future of democracy may well depend on our ability to find a new way to fund and protect independent journalism.",
      question: "The author suggests that the decline of local newsrooms is a threat to:",
      options: [
        "The profits of major social media conglomerates.",
        "The ability of citizens to access entertainment content.",
        "The accountability of local power structures and democratic health.",
        "The efficiency of the national advertising market."
      ]
    },
    legal: {
      passage: "Principle: The 'Basic Structure' doctrine holds that while Parliament has the power to amend the Constitution, it cannot alter its essential features, such as secularism, democracy, and the independence of the judiciary. Any amendment that violates this core is liable to be struck down by the courts. \n\nFact: The government passes a new amendment that gives the Prime Minister the absolute power to appoint all judges of the Supreme Court without any consultation with the Chief Justice. This is challenged as a violation of the 'independence of the judiciary.'",
      question: "Applying the Basic Structure doctrine, how is the court likely to rule?",
      options: [
        "The court will uphold the amendment because Parliament has absolute power of amendment.",
        "The court will strike down the amendment as judicial independence is a part of the basic structure.",
        "The court will suggest a middle ground where the PM consults but does not follow the CJI.",
        "The court will declare that the Constitution needs to be rewritten entirely."
      ]
    },
    logical: {
      passage: "Statement: Should the government ban all single-use plastics immediately? \nArguments: \nI. Yes, it is the only way to save the oceans from irreversible ecological collapse and protect marine life. \nII. No, a sudden ban will devastate small-scale manufacturers and lead to massive job losses in the packaging sector. \nIII. Yes, several developed countries have already implemented such bans successfully.",
      question: "Which of the arguments are 'strong' in the context of a balanced policy debate?",
      options: [
        "Only I is strong.",
        "Only II is strong.",
        "Both I and II are strong.",
        "I, II, and III are all strong."
      ]
    },
    current: {
      passage: "The Surrogacy (Regulation) Act, 2021, allows only 'altruistic surrogacy' and bans 'commercial surrogacy.' Under this, the surrogate mother must be a close relative of the intending couple, who must be married for at least five years and have a certificate of essentiality. Recently, debates have emerged regarding the exclusion of live-in partners, single parents, and the LGBTQ+ community from accessing these services.",
      question: "What is the key difference between altruistic and commercial surrogacy according to the Act?",
      options: [
        "Altruistic involves family, while commercial involves strangers.",
        "Altruistic involves only medical expenses, while commercial involves additional monetary compensation.",
        "Altruistic is only for girls, while commercial is for boys.",
        "There is no legal difference; both are now banned in India."
      ]
    },
    quant: {
      passage: "In a competitive exam, 1 mark is awarded for every correct answer and 0.25 marks are deducted for every wrong answer. A student attempted 120 questions out of 150 and scored 75 marks.",
      question: "How many questions did the student answer correctly?",
      options: [
        "84",
        "88",
        "80",
        "92"
      ]
    }
  },
  'agri-rev-mock': {
    english: {
      passage: "The Green Revolution, which began in the mid-1960s, transformed India from a food-deficient nation into one of the world's leading agricultural nations. Spearheaded by M.S. Swaminathan, it focused on high-yielding variety seeds, irrigation, and fertilizers. However, critics point out the environmental toll and the regional disparities it created. Despite these concerns, the immediate achievement of food security remains a cornerstone of modern Indian history.",
      question: "Which of the following is a primary criticism of the Green Revolution mentioned in the text?",
      options: [
        "It failed to achieve food security.",
        "It was only successful in urban areas.",
        "It resulted in environmental degradation and regional inequality.",
        "It was entirely led by foreign scientists without Indian participation."
      ]
    },
    legal: {
      passage: "Principle: Every person has a right to free legal aid if they are unable to engage a lawyer due to poverty. Article 21 and Article 39A of the Constitution mandate the State to provide this assistance to ensure justice is not denied to any citizen by reason of economic or other disabilities.\n\nFact: Ramesh is accused of theft. He cannot afford a lawyer. The judge proceeds with the trial without appointing a lawyer for him, stating the case is 'simple'.",
      question: "Is the judge's action constitutional?",
      options: [
        "Yes, if the case is simple, no lawyer is needed.",
        "No, the right to free legal aid is a fundamental right for those cannot afford it.",
        "Yes, Article 39A is only a directive principle and not enforceable.",
        "No, but only if Ramesh explicitly demanded a lawyer three times."
      ]
    },
    logical: {
      passage: "All Agricultural Revolutions in India aim to increase production. The White Revolution specifically targets milk production. Verghese Kurien is to the White Revolution what M.S. Swaminathan is to the Green Revolution.",
      question: "Based on the passage, the relationship between Verghese Kurien and Milk is most similar to:",
      options: [
        "J.L. Nehru and Poorna Swaraj",
        "M.S. Swaminathan and Food Grains",
        "Raja Rammohan Roy and Bhoodan",
        "Dadabhai Naoroji and Cricket"
      ]
    },
    current: {
      passage: "India's defense and aerospace technology has reached new heights. The first satellite-launching base was established at Sriharikota. Meanwhile, the first woman fighter pilot of India, Avani Chaturvedi, created history by flying a supersonic jet solo.",
      question: "Who was the first female fighter pilot of India to fly solo?",
      options: [
        "Punit Arora",
        "Avani Chaturvedi",
        "Mitali Madhumita",
        "Priya Jhingan"
      ]
    },
    quant: {
      passage: "In a survey of 1200 active aspirants, 40% are focusing on Legal Reasoning, 30% on Current Affairs, and the rest on other sections. How many students are NOT focusing on Legal Reasoning or Current Affairs?",
      options: [
        "360",
        "480",
        "300",
        "840"
      ]
    }
  },
  'heritage-terrain': {
    english: {
      passage: "The Indian National Congress, founded in 1885, was initially a platform for civic and political dialogue. However, its character changed dramatically under the influence of leaders like Tilak and Gandhi. The 1929 Lahore session marked a departure from earlier goals of 'dominion status' to absolute 'Poorna Swaraj'. This shift in intent reflected a growing consensus that incremental reforms were no longer sufficient. The movement became a mass-based struggle, involving diverse strata of Indian society.",
      question: "Which of the following best describes the transition of the INC as per the passage?",
      options: [
        "From a mass struggle to a civic dialogue platform.",
        "From seeking incremental reforms to absolute independence.",
        "From supporting Tilak to exclusively supporting A.O. Hume.",
        "From Poorna Swaraj to dominion status."
      ]
    },
    legal: {
      passage: "Principle: The doctrine of 'Doctrine of Lapse' was a policy of the British East India Company under which any Indian princely state under the suzerainty of the Company would have its princely status abolished if the ruler was either 'manifestly incompetent or died without a male heir.' \n\nFact: The Raja of a state dies without a biological male heir, but has adopted a son who is 12 years old. Lord Dalhousie seeks to annex the state under the Doctrine of Lapse.",
      question: "Is Dalhousie likely to succeed in annexation based on the principle?",
      options: [
        "No, because the adopted son is a valid male heir.",
        "Yes, as the principle specifically targets states without a direct biological male heir.",
        "No, as the son is only 12 and cannot be 'manifestly incompetent'.",
        "Yes, but only if the Company can prove the Raja was incompetent before death."
      ]
    },
    logical: {
      passage: "If a state receives low rainfall, it is likely to have lower agricultural output unless it has an intensive canal network. Leh receives very low rainfall. Punjab has a high density of rivers. Therefore, Punjab probably has higher agricultural output than Leh.",
      question: "Which of the following is an assumption required for the conclusion above?",
      options: [
        "Leh has an intensive canal network.",
        "River density corresponds to a better irrigation network in Punjab.",
        "Punjab receives higher rainfall than Leh.",
        "Agricultural output is only determined by rainfall."
      ]
    },
    current: {
      passage: "Major industrial collaborations marked India's post-independence growth. The Bhilai Steel Plant was established with the assistance of the Soviet Union. Meanwhile, the first satellite-launching base was established at Sriharikota in Andhra Pradesh.",
      question: "The Bhilai Steel Plant was established in collaboration with which country?",
      options: [
        "USA",
        "Germany",
        "Soviet Union",
        "Japan"
      ]
    },
    quant: {
      passage: "The Solar Cycle period is 11 years. If the current peak of activity occurs in 2024, in which year was the previous peak likely observed, assuming regular intervals?",
      options: [
        "2011",
        "2013",
        "2012",
        "2010"
      ]
    }
  },
  'clat-un-special': {
    english: {
      passage: "The United Nations Charter, signed in 1945, remains the bedrock of international law. However, the world has changed drastically since then. The emergence of non-state actors, the rise of digital warfare, and the climate crisis were not envisioned by the architects at San Francisco. Critics argue that the veto power held by the P5 members often paralyzes the Security Council in times of acute human suffering. Reform is no longer a luxury; it is a necessity for the UN to remain relevant in the 21st century.",
      question: "Which of the following best reflects the author's stance on UN reform?",
      options: [
        "It is a luxury that can be debated at a later date.",
        "It is essential to address contemporary challenges not envisioned in 1945.",
        "The UN is already perfectly equipped for the 21st century.",
        "The P5 veto power is the most effective tool for international peace."
      ]
    },
    legal: {
      passage: "Principle: The International Court of Justice (ICJ) has jurisdiction over legal disputes between States that accept its compulsory jurisdiction or refer a specific case to it. Decisions are binding on the parties involved. \n\nFact: Country A and Country B have a border dispute. Both have accepted the ICJ's compulsory jurisdiction. Country A files a suit. Country B later argues that the ICJ cannot decide because it involves 'national security.'",
      question: "How is the ICJ likely to respond to Country B's argument?",
      options: [
        "The ICJ will immediately dismiss the case as national security is sovereign.",
        "The ICJ has the power to determine its own jurisdiction (Competence-Competence).",
        "The ICJ will ask the UN Secretary-General to decide the border.",
        "Country B can withdraw its acceptance of jurisdiction retrospectively to stop the case."
      ]
    },
    logical: {
      passage: "Seven UN judges were appointed to the Supreme Court of India in February 2023. No wait, that is factually incorrect according to the repository. Seven judges were appointed to the SC of India in Feb 2023, bringing it to full strength. Meanwhile, the ICJ has 15 judges elected for 9-year terms. If the ICJ judges are elected by both the General Assembly and the Security Council, then the consensus required is high.",
      question: "Based on the text, what can be inferred about the ICJ judge election process?",
      options: [
        "It is a simple majority vote in the GA only.",
        "It requires a high level of international consensus due to dual-voting bodies.",
        "The P5 members alone decide the judges.",
        "Judges are appointed by the SC of India."
      ]
    },
    current: {
      passage: "Specialized Agencies of the UN often deal with technical matters. UNESCO focuses on heritage and education, while WIPO handles intellectual property. The ICC (International Criminal Court), however, is an independent organization and not a part of the UN system, though it works closely with it.",
      question: "Which of the following is NOT a part of the UN system?",
      options: [
        "UNESCO",
        "WIPO",
        "ICC",
        "WHO"
      ]
    },
    quant: {
      passage: "In 2024, the UN General Assembly budget was approved. If the total budget was $3.1 Billion and the USA contributed 22%, China 12%, and Japan 8%, what was the combined contribution of these three countries?",
      options: [
        "$1.24 Billion",
        "$1.302 Billion",
        "$1.55 Billion",
        "$0.98 Billion"
      ]
    }
  },
  'grand-mock-24': {
    english: {
      passage: "When you are feeling overwhelmed at work, it is important to find out why you feel that way. Feeling overwhelmed is actually a stress response when we feel the demand on us outweighs our resources. Feeling out of control and under pressure is a form of emotional overloading and can trigger the release of stress hormones such as cortisol and adrenaline. Keeping a journal can help you identify what causes this reaction...",
      question: "According to the passage, why do people who often say yes to everything, do so?",
      options: [
        "Due to lack of self-confidence and boundary setting skills.",
        "Because of a sense of adventure and spirit.",
        "They feel that if they do not play by the rules, they will be excluded.",
        "They are often saying no to something else unknowingly."
      ]
    },
    legal: {
      passage: "In a bid to eradicate the evil of manual scavenging, the Madras High Court held that Municipality Heads would be personally liable in case any person is found to be indulging in manually cleaning the sewers. It also directed the heads of corporations and municipalities to file a written undertaking to the effect that no manual scavenging work would be permitted...",
      question: "In the case of Nalasopara, if no Municipal Head has been appointed yet, can the Municipality be held responsible for reported scavenging?",
      options: [
        "Yes, as the department is suo moto liable for the same.",
        "No, as there is no one to pin the responsibility on.",
        "Yes, as the complaint can still be registered regardless of the vacancy.",
        "No, as the presence of the head is mandatory to file a complaint."
      ]
    },
    logical: {
      passage: "Perhaps the greatest of all the fallacies entertained by lay people about the law is that the business of a court of justice is to discover the truth. Its real business is to pronounce upon the justice of particular claims, and incidentally to test the truth of the assertions of fact made in support of the claim in law, provided that those assertions are relevant in law to the establishment of the desired conclusion; and this is by no means the same thing...",
      question: "What is the main conclusion of the author regarding the role of courts?",
      options: [
        "The discovery of truth is independent of the delivery of justice.",
        "Courts' decisions are fair justice only in some matters.",
        "It is not the duty of courts to find the truth but to pronounce justice on claims.",
        "Courts lack the spirit to go beyond the evidence presented."
      ]
    },
    current: {
      passage: "Global efforts in adaptation planning, financing and implementation are not enough to prepare vulnerable communities for climate change, according to UNEP's Adaptation Gap Report 2022. Finance for adaptation increased to $29 billion in 2020 — only four per cent increase over 2019. international adaptation finance flows are many times lower than required...",
      question: "Which initiative aimed at achieving net-zero emissions by 2050 was discussed at COP27?",
      options: [
        "FAST Initiative",
        "Race to Zero Campaign",
        "LIFE Initiative",
        "Panchamrit Strategy"
      ]
    },
    quant: {
      passage: "Mahesh fetches water in container A which holds only 80% capacity due to a dent. Water is transferred into container B. Water up to 10% of B's capacity cannot be drained out. Mahesh fills B exactly five times on a day and A becomes empty. If the water level in B reached the faucet level (10%) at the end...",
      question: "What is the ratio of the maximum capacities of containers A and B?",
      options: [
        "5 : 1",
        "5.75 : 1",
        "4.6 : 1",
        "6.25 : 1"
      ]
    }
  },
  'pv-oct-24': {
    english: {
      passage: "When you are feeling overwhelmed at work, it is important to find out why you feel that way. Feeling overwhelmed is actually a stress response when we feel the demand on us outweighs our resources. Feeling out of control and under pressure is a form of emotional overloading and can trigger the release of stress hormones such as cortisol and adrenaline...",
      question: "Which of the following describes the author's point of view regarding 'asking for help'?",
      options: [
        "It can lead to dislike of co-workers towards you.",
        "It is not a sign of weakness as managers may not realize your current plate.",
        "It makes an impression that you are easily perturbed by challenges.",
        "The boss may see it as a personality weakness."
      ]
    },
    legal: {
      passage: "In the Indian Contract Act, the definition of consent is given in Section 14: 'it is when two or more persons agree upon the same thing and in the same sense.' Coercion means forcing an individual to enter into a contract using intimidation or threats under pressure to gain the party's consent. Undue Influence occurs when one party is in a position of trust and controls the other party wrongfully.",
      question: "Raj is threatened by Riya that she will tell everyone about his financial difficulties if he doesn't sell his antiques. Raj signs the contract. What is the legal outcome?",
      options: [
        "The contract is void ab initio.",
        "The contract is voidable at the option of Raj.",
        "The contract is valid as Raj signed it voluntarily.",
        "Riya is liable for criminal intimidation only."
      ]
    },
    logical: {
      passage: "The Parisian travels but little; he knows no language but his own, reads no literature but his own, and consequently he is pretty narrow and pretty self-sufficient. There are Frenchmen who know languages not their own: these are the waiters. They know English on the 'European plan'—they think they comprehend it, but they don't...",
      question: "What is the author's primary implication regarding the French approach to language learning?",
      options: [
        "French people are naturally gifted in linguistics.",
        "French people make a significant effort to understand English.",
        "French people are generally disinterested in learning foreign languages.",
        "French waiters are proficient but pretend not to understand."
      ]
    },
    current: {
      passage: "For India, the return of Sheikh Hasina's Awami League party to the helm in Bangladesh for a fourth consecutive term is a welcome development. While the US and Britain have said the elections were not credible or fair, New Delhi considers her a close ally in a neighborhood where its military confronts both Pakistan and China.",
      question: "According to the passage, why does India consider Sheikh Hasina's return to power 'natural' to desire?",
      options: [
        "To promote democratic values in South Asia.",
        "To counter China's increasing presence in a challenging neighborhood.",
        "To ensure a land corridor for NE India is maintained.",
        "To facilitate trade ties with the European Union."
      ]
    },
    quant: {
      passage: "Three venture capitalists (Anand, Bhavesh, Chanchal) invested from 2021-2024. In 2024, total investment was Rs. 27,000 in ratio 3:4:2. Chanchal's investment in 2023 was Rs. 60,000. Bhavesh's investment in 2023 was Rs. 6,000 more than in 2022 (which was Rs. 34,000). Total profit in 2023 was Rs. 14,800.",
      question: "What was the share of profit earned by Bhavesh in the year 2023?",
      options: [
        "Rs. 4,250",
        "Rs. 4,000",
        "Rs. 4,400",
        "Rs. 4,050"
      ]
    }
  },
  'clat-prep-jan-24': {
    english: {
      passage: "The Parisian travels but little; he knows no language but his own, reads no literature but his own. However, let us not be too sweeping; there are Frenchmen who know languages not their own: these are the waiters. They know English on the 'European plan'—they think they comprehend it, but they don't. Here is a conversation I had with one of these beings...",
      question: "Which of the following best describes the author's primary attitude towards the French approach to English?",
      options: [
        "Admiration for their multilingual efforts.",
        "Sarcastic observation of their overconfidence vs actual comprehension.",
        "Frustration at the lack of educational resources.",
        "Indifference to their cultural silos."
      ]
    },
    legal: {
      passage: "The doctrine of privity of contract implies that only parties to a contract are allowed to sue each other. No stranger is allowed to confer obligations upon any person who is not a party, even if it is for their benefit. In Jamna Das v. Ram Avtar, A borrowed money from B; C later bought the property but was not bound to B's debt because B was not part of the A-C agreement.",
      question: "Olivia hires Sunshine Builders to build an office. Olivia uses a consultant, Emma, to help ensure quality. Disputes arise and Sunshine Builders breaches the contract. Can Emma sue Sunshine Builders for damages?",
      options: [
        "Yes, because her role was vital to the project.",
        "No, as she has no legal standing since she isn't a party to the original contract.",
        "Yes, if Olivia provides a written authorization for the suit.",
        "No, unless Sunshine Builders acknowledges their debt to her specifically."
      ]
    },
    logical: {
      passage: "The Covid pandemic boosted technology companies as physical movement was restricted, leading to high valuations for firms like Zoom. However, with business returning to normal, these valuations are correcting. Those who can adapt to newer realities like inflation and lower spending will emerge winners. Comparison shows those reliant on online ads face major challenges.",
      question: "What is the main concern of the author regarding current business adaptability?",
      options: [
        "The permanence of remote work models.",
        "The volatility of markets and the necessity for businesses to sustain through innovation.",
        "The lack of jobs in the post-pandemic tech sector.",
        "The rising cost of social media advertising."
      ]
    },
    current: {
      passage: "Sheikh Hasina's Awami League return to power in Bangladesh for a fourth consecutive term is seen as a welcome development by New Delhi. While the US and UK questioned the election's credibility, India considers her a close ally in a neighborhood where its military confronts Pakistan and China along hostile borders.",
      question: "Why is a friendly government in Bangladesh considered crucial to India's security by ORF analysts?",
      options: [
        "To resolve border disputes with Bangladesh directly.",
        "To counter China's increasing presence and maintain stability in the neighborhood.",
        "To promote democratic values across the South Asian sub-continent.",
        "To facilitate the SAARC common market initiative."
      ]
    },
    quant: {
      passage: "In a college of 900 students, the ratio of boys to girls is 5:4. 20% of girls do Zoology, 25% of girls do Statistics. The total number of students in Botany is 220. The ratio of girls to boys in Mathematics (total 150 students) is 1:2. There are equal number of boys and girls in Physics.",
      question: "What is the total number of students doing PG in Physics and Statistics together?",
      options: [
        "400",
        "300",
        "350",
        "250"
      ]
    }
  },
  'clat-apr-24': {
    english: {
      passage: "The Supreme Court of India has come out heavily against archaic rules penalizing women employees for getting married, observing them as unconstitutional. 'Terminating employment because the woman has got married is a coarse case of gender discrimination and inequality,' the Court noted. This upheld the rights of Selina John, a former lieutenant discharged from the Military Nursing Service in 1988...",
      question: "What can be inferred about the Supreme Court's stance on gender parity from the Selina John ruling?",
      options: [
        "It views parity as a purely legal interpretation unrelated to society.",
        "It is taking a proactive role in dismantling systemic gender biases in military/professional employment.",
        "It believes financial compensation is the only way to fix discrimination.",
        "It suggests that military rules are exempt from constitutional scrutiny."
      ]
    },
    legal: {
      passage: "Writs are orders given by the Supreme Court (Art 32) or High Courts (Art 226). Habeas Corpus is used when unlawful detention occurs to enforce individual liberty. Mandamus is a command used when a public official fails to perform a mandatory duty owed to the petitioner. The petitioner must prove that a duty is owed and non-performance is present...",
      question: "Nia is sexually assaulted by an affluent man and later detained by police on his orders to prevent her from filing an FIR. Which writ should be filed?",
      options: [
        "Writ of Quo Warranto against the police.",
        "Writ of Habeas Corpus against the police for unlawful detention.",
        "Writ of Mandamus to force the police to arrest the assailant.",
        "Nothing can be done as an FIR was not yet registered."
      ]
    },
    logical: {
      passage: "Invasive alien species are now one of the five major drivers of change in nature. According to the IPBES 2023 report, human activities have caused the translocation of some 37,000 alien species globally. These species breed profusely away from their original ecosystems, displacing native species and driving them toward extinction...",
      question: "Which of the following strengthens the argument that human-driven activity is the primary factor in invasive species spread?",
      options: [
        "Native species are naturally adapting to the invaders efficiently.",
        "Global shipments and transport for agriculture are identified as the primary dissemination factors.",
        "Natural disasters translocation is minimal compared to human impact.",
        "Climate change is a bigger threat to biodiversity than invasive species."
      ]
    },
    current: {
      passage: "Odisha CM Naveen Patnaik has unveiled plans for the world's first 'Black Tiger Safari' near Baripada in the Mayurbhanj district. Melanistic tigers, featuring dark captivate stripe patterns, have been a recent attraction in the region. The site is located adjacent to National Highway-18 and is approximately 15km from the main reserve...",
      question: "In which National Park/Tiger Reserve region is this 'Black Tiger Safari' planned to be established?",
      options: [
        "Bandhavgarh Tiger Reserve",
        "Similipal Tiger Reserve",
        "Anamalai Tiger Reserve",
        "Bandipur Tiger Reserve"
      ]
    },
    quant: {
      passage: "A sample paper shows electronic items sold by four shops. Shop B sells a certain percentage of laptops. If shop B had sold 20 more laptops and 20 less tablets, the ratio of laptops to tablets would have been 13:17. The total number of items sold by A and B was 15,500...",
      question: "If the total electronic items in shop B is 4000, and initial laptops were 600, what is the new ratio if the change occurs?",
      options: [
        "21:25",
        "13:17",
        "18:23",
        "23:27"
      ]
    }
  },
  'clat-extreme-24': {
    english: {
      passage: "Britain’s British Broadcasting Corporation, often confused with a biscuit company by the authorities, has manufactured a documentary when it should have been baking. Our violations? Oh yes, they exist, but they are 'nationalist violations', unlike yours which stem from a colonial mentality. Things happened. Corpses exist where lives are lost. Not each time can blame be attached...",
      question: "What is the primary tone of the passage regarding the government's stance on the BBC?",
      options: [
        "Humorous",
        "Acerbic and Sarcastic",
        "Fatalistic",
        "Objective and Analytical"
      ]
    },
    legal: {
      passage: "The defense of necessity applies when an otherwise illegal act is committed to prevent a greater harm. In Surocco v. Geary, the mayor demolished a house to stop a wildfire from spreading. In Torts, private necessity precludes punitive damages but may require simple compensation for actual damage caused to property...",
      question: "Swati, seeing a car out of control on a footpath with no other escape, runs into a cyclist to save her own life. Is the defense of necessity available?",
      options: [
        "No, because the defense is only for corporations.",
        "Yes, as she acted to save her life and had no other option.",
        "No, because saving a life does not justify hitting another human.",
        "Yes, but only if the car actually hits the cycle after she moves."
      ]
    },
    logical: {
      passage: "The simple principle that 'no means no' remains unintelligible to many. The Kerala High Court emphasized that boys must be trained at home and school to respect women. Peer pressure and social training often teach boys that women want to be taken by force, validating 'macho' stereotypes through popular entertainment...",
      question: "According to the passage, what is the key solution proposed to address' sexual harassment on campuses?",
      options: [
        "A clear legal distinction between consent and refusal.",
        "Internal changes in how we value women vs men.",
        "Neutralizing negative peer pressure during a boy's upbringing.",
        "Changing the legal definition of manliness."
      ]
    },
    current: {
      passage: "India establishment of the BIMSTEC Energy Centre (BEC) in Bengaluru highlights commitment to regional energy security. BIMSTEC, established in 1997 through the Bangkok Declaration, includes members like Nepal and Bhutan but NOT Indonesia. The Centre will focus on green hydrogen and cyber security in the energy transition phase...",
      question: "Which country is NOT a member of the BIMSTEC grouping, based on the regional geopolitical setup mentioned?",
      options: [
        "Nepal",
        "Bhutan",
        "Indonesia",
        "Thailand"
      ]
    },
    quant: {
      passage: "A cricket match table shows Rohit, Rahul, Virat, Pant, and Hardik. Rohit scored 60, 70, 5, 45, 100 in 5 matches. Virat scored 0, 55, 140, 105, 25. Pant scored 70, 25, 45, 10, 105. Rahul's average is skewed by a duck in the 5th match...",
      question: "How many runs does Pant need to score in the sixth match to bring his average to exactly 55?",
      options: [
        "75",
        "55",
        "35",
        "60"
      ]
    }
  },
  'clat-master-24': {
    english: {
      passage: "Even from the coin the eyes pursued you. On coins, on stamps, on the covers of books, on banners, on posters — everywhere. Always the eyes watching you and the voice enveloping you. Asleep or awake, working or eating, indoors or out of doors — no escape. Nothing was your own except the few cubic centimetres inside your skull. His mind hovered for a moment round the doubtful date on the page, and then fetched up with a bump against the Newspeak word doublethink...",
      question: "Which of the following can be most directly inferred about the protagonist's environment?",
      options: [
        "It is a society that encourages creative freedom.",
        "It is characterized by constant surveillance and an omnipresent authority figure.",
        "It is a world where history is preserved with absolute accuracy.",
        "It is a utopia where every citizen's needs are perfectly met."
      ]
    },
    legal: {
      passage: "Theft is a criminal offense under the Indian Penal Code (IPC), specifically Sections 378 to 382. Its essential ingredients include: Dishonest intention to take property, movable property as the subject matter, and taking without consent. Moving of the property is also required to complete the act. Article 19 also guarantees the right to freedom of speech, which includes the right to get information from public authorities...",
      question: "John, a police officer, issues a Sec 41A notice to Sarah for fraud questioning. Sarah complies but doesn't answer enough questions for John. Frustrated, John arrests her. Is this arrest lawful under Sec 41 of CrPC?",
      options: [
        "Yes, as refusal to cooperate allows immediate arrest.",
        "No, as police must justify the specific reasons for arrest for offenses with <7 years punishment.",
        "Yes, as Sec 41A notices automatically convert to arrest warrants upon non-compliance.",
        "No, because Sarah didn't actually commit any physical crime."
      ]
    },
    logical: {
      passage: "India’s unemployment rate climbed to a four-month high in April, reaching 8.11%. While rural unemployment fell marginally, urban unemployment climbed significantly to 9.81%. The labor force increased by 25.5 million people, possibly due to an increase in optimism about finding employment. Around 94.6% of people joining the rural labor force found jobs, compared to only 54.8% in urban areas...",
      question: "What is the central idea regarding India's unemployment situation in April 2023?",
      options: [
        "Rural areas are facing a jobs crisis while urban areas are thriving.",
        "The nationwide employment rate fell to its lowest point since the pandemic.",
        "The labor force grew due to optimism, but the unemployment rate still climbed to a 4-month high.",
        "Government job guarantee programs have successfully eliminated rural unemployment."
      ]
    },
    current: {
      passage: "Odisha Chief Minister Naveen Patnaik has unveiled plans for the world's first 'Black Tiger Safari' in Mayurbhanj. It will feature melanistic tigers, a rare species with dark stripe patterns, recently spotted in the Similipal Tiger Reserve. Additionally, the Indian Army recently decided to induct woman officers into the Regiment of Artillery, with some posted along the LAC...",
      question: "Which component of the Indian Army has recently opened avenues for women officers to be inducted and posted to frontline formations like the LAC?",
      options: [
        "Army Service Corps",
        "Regiment of Artillery",
        "Army Ordnance Corps",
        "Army Aviation Corps"
      ]
    },
    quant: {
      passage: "In 2018, a company produced 16,000 products (A, B, C). 35% are Product B. Ratio of plastic to metallic in B is 4:3. Plastic Product A is 10% more than plastic Product B. Ratio of metallic C to plastic A is 3:5. Metallic A is 20% less than metallic B...",
      question: "What is the respective ratio of the number of metallic materials of Product A to the number of metallic materials of Product B?",
      options: [
        "4:5",
        "3:2",
        "1:2",
        "2:5"
      ]
    }
  },
  'clat-pro-24': {
    english: {
      passage: "The whole experience of being hit by a bullet is very interesting. It was a rifle bullet, a 7.62 Mauser. I felt a frightful blow, as it seemed, somewhere near the elbow. I realized I was dying and at the same time I was astonished at my physical detachment; I had no belief, or else complete and automatic belief, in my own death. In this state one could not communicate with people...",
      question: "In the context of the author's account, what is uniquely noted about the 'process of death'?",
      options: [
        "It was accompanied by intense existential dread.",
        "It involved a sensation of coming out of oneself and physical detachment.",
        "It was characterized by a sudden loss of consciousness.",
        "It was an experience that the author purely regretted and feared."
      ]
    },
    legal: {
      passage: "The Supreme Court recently used Article 142 to do 'complete justice' by granting divorce by mutual consent without the 6-18 month waiting period under Section 13B of the Hindu Marriage Act. The court observed that if a marriage is wrecked beyond hope, public interest lies in recognizing this irretrievable breakdown rather than upholding a 'married' status regardless...",
      question: "Which constitutional provision allows the SC to grant a divorce immediately on the grounds of irretrievable breakdown?",
      options: [
        "Article 21 (Right to Life)",
        "Article 32 (Constitutional Remedies)",
        "Article 142 (Power to do Complete Justice)",
        "Section 13B of the Hindu Marriage Act"
      ]
    },
    logical: {
      passage: "A long-held belief inside the medical fraternity is that women are less prone to heart failures due to the 'estrogen advantage'. This logic has led to active neglect: women's cardiovascular disease remains understudied, under-diagnosed, and under-treated. Even young women are at growing risk, as seen in recent high-profile fitness-centric cases...",
      question: "What does the author identify as the primary reason for the systemic neglect of women's heart health?",
      options: [
        "A lack of available medical technology in India.",
        "The erroneous perception that heart issues are not serious or common in women.",
        "Women's reluctance to disclose their symptoms to male doctors.",
        "The high cost of cardiac evaluations for female patients."
      ]
    },
    current: {
      passage: "The Securities and Exchange Board of India (SEBI) has sought an extension to probe allegations raised by Hindenburg Research about the Adani group. The SEBI chief referred to these issues as 'the elephant in the room'. Separately, India bagged the third spot in the Hurun Global Unicorn Index 2023, while BYJU'S remained the top-most Indian unicorn valued at $22 billion...",
      question: "Which entity was referred to as the 'top-most unicorn in India' with a valuation of $22 billion in the 2023 Hurun Index?",
      options: [
        "Swiggy",
        "Dream11",
        "BYJU'S",
        "Zomato"
      ]
    },
    quant: {
      passage: "In a class of 60 students, the ratio of boys to girls is 3:2. They all participated in a quiz. The ratio of boys to girls who answered correctly is 2:3. The number of girls who answered correctly is twice the number of boys who answered incorrectly...",
      question: "What is the ratio of girls who answered incorrectly to boys who answered incorrectly?",
      options: [
        "1:1",
        "1:2",
        "0:1",
        "3:1"
      ]
    }
  },
  'clat-scholar-24': {
    english: {
      passage: "In response to the problem of criminalising young-adult relationships, many advocate lowering the age of consent to 16. However, this fails to address competence. What distinguishes a 'rule' from a 'standard' is the stage at which the law is imbued with content. Rules are applied ex-ante (advance determinations), while standards are applied ex-post (adjudicator decide after the fact). For example, 'driving at a harmful speed' is a standard, whereas 'driving above 60km/h' is a rule...",
      question: "According to the passage, why is lowering the age of consent to 16 not a complete solution?",
      options: [
        "It would legalize too many relationships at once.",
        "It repeats the mistake of using age as the only determinant of competence.",
        "It contradicts the fundamental objectives of the POCSO Act.",
        "The Meghalaya High Court has already rejected this proposal."
      ]
    },
    legal: {
      passage: "Article 131 of the Indian Constitution grants the Supreme Court exclusive original jurisdiction over disputes between the Centre and States. This does not extend to political 'mere wrangles' or cases where another body has jurisdiction (like Article 262 for water disputes). It must involve a question of law or fact on which a 'legal right' depends...",
      question: "The state of Nortia challenges a central tax legislation under Article 131, arguing that its smaller revenue share violates its constitutional immunity. What is the likely outcome?",
      options: [
        "The suit is maintainable as it involves the legal rights (immunity) of the State.",
        "The suit will be dismissed as Art 131 cannot be used to challenge central laws.",
        "The suit is maintainable because the state is the largest and most populated.",
        "The suit will be dismissed as it is a purely political tussle between parties."
      ]
    },
    logical: {
      passage: "Academic Medical Centers (AMCs) perform three functions: care, research, and teaching. These missions are fraught with problems due to duplication of activities and unwieldy bureaucracies. Physicians often face fragmented accountability, split between the hospital (practice issues) and medical school (accreditation). This bias towards specialization often leads to the neglect of routine primary care services...",
      question: "Which of the following describes the 'fragmented accountability' mentioned by the author?",
      options: [
        "Physicians ignoring patients to focus on medical school research.",
        "Clinicians being responsible to different authorities for different aspects of their career.",
        "Tertiary hospitals threatening the existence of community clinics.",
        "The duplication of personnel performing the same medical procedures."
      ]
    },
    current: {
      passage: "The 2023 ASER report highlights a significant milestone: the percentage of children aged 6-14 enrolled in schools reached 98.4%. Separately, the establishment of the BIMSTEC Energy Centre in Bengaluru and the Maldivian President's demand for Indian troop withdrawal by March 15 have shaped recent geopolitics...",
      question: "Which organization leads the survey for the Annual Status of Education Report (ASER)?",
      options: [
        "UNESCO",
        "Pratham Foundation",
        "UNICEF",
        "Tata Trusts"
      ]
    },
    quant: {
      passage: "A company produces A, B, and C. In 2018, total products were 16,000. 35% are B. Ratio of plastic to metallic in B is 4:3. Plastic A is 10% more than plastic B. Metallic C to plastic A is 3:5. Metallic A is 20% less than metallic B...",
      question: "If there are 180 participants in a WHO meeting with a 6:4 male to female ratio, and 50 are from the USA with a 3:2 male to female ratio, what is the total number of female participants?",
      options: [
        "70",
        "72",
        "84",
        "95"
      ]
    }
  },
  'clat-ultimate-24': {
    english: {
      passage: "History, Mythology, Religion and Social Constructs abound in examples which will prove that motherhood has been wrongly constructed as a monolith of love and sacrifice, innate in all women. Evidence suggests that elevating motherhood to unnatural heights is a deliberate patriarchal ploy to limit women, to restrict and check their potentials. Many women have jostled their careers with motherhood, and in trying to excel in both, often ended up with the unfounded guilt and regret that they are doing complete justice to none...",
      question: "According to the passage, what is the 'patriarchal fantasy' associated with motherhood?",
      options: [
        "That it is a choice reserved only for the elite.",
        "That it is a monolith of love and sacrifice innate in all women.",
        "That it is a state of being that guarantees social elevation.",
        "That it is a burden that all women must bear to be human."
      ]
    },
    legal: {
      passage: "The 2019 Consumer Protection Act widened the definition of 'unfair trade practices' to include online misleading advertisements, not issuing bills, and failing to take back defective goods. It also introduced 'product liability' which covers the manufacturer, service provider, and seller. A seller is liable if the product has been misused, but only if they were negligent in warranty information...",
      question: "Stinga, a yogurt company, advertises its product as 'immunity boosting' without scientific backup. Zia files a case. Is her suit valid under the 2019 Act?",
      options: [
        "No, as online ads are not covered by the Consumer Protection Act.",
        "Yes, as false claims in advertisements constitute an unfair trade practice.",
        "No, because immunity is a subjective marketing term.",
        "Yes, but only if she actually fell ill after consuming the product."
      ]
    },
    logical: {
      passage: "I am a pothole—an ordinary road hazard and a bane to all who drive. Because I’m small and local, I seem simple to fix, but I’m not. Given this, imagine how difficult it is to fix large, national, complex problems. My genealogy is compelling: I come from a common road built with dirt and lime dust. Street departments try to prevent me through 'crack sealing' using hot rubberized asphalt...",
      question: "Which narrative device is primarily used by the author to describe the 'pothole'?",
      options: [
        "Hyperbole",
        "Personification",
        "Epistolary narrative",
        "Scientific Explication"
      ]
    },
    current: {
      passage: "China and Pakistan have agreed to extend the China-Pakistan Economic Corridor (CPEC) into Afghanistan during the 4th round of Foreign Minister-level Strategic Dialogue. CPEC, a part of the Belt and Road initiative, connects Xinjiang Uygur autonomous region with Gwadar Port. Afghanistan's significance lies in its access to rare minerals and trade opportunities...",
      question: "Which two endpoints are primarily connected by the China-Pakistan Economic Corridor (CPEC)?",
      options: [
        "Beijing and Karachi",
        "Xinjiang and Gwadar Port",
        "Shanghai and Islamabad",
        "Guangzhou and Lahore"
      ]
    },
    quant: {
      passage: "A table shows births and deaths per thousand. In 1994-95, Births: 48, Deaths: 36. In 2000-01, Births: 36, Deaths: 33. If there are 1.2 lakh people in the city at the beginning of 2000-01...",
      question: "What is the ratio of birth rates during the years when the death rates are equal (1996-97 and 1997-98)?",
      options: [
        "13:11",
        "15:13",
        "12:13",
        "15:17"
      ]
    }
  },
  'clat-mock-5': {
    english: {
      passage: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters...",
      question: "What characterizes the 'surrounding families' attitude towards a newcomer with a good fortune?",
      options: [
        "They are indifferent to his arrival and focus on their own chores.",
        "They view him primarily as a commodity for their eligible daughters.",
        "They fear the social disruption that his wealth might bring.",
        "They celebrate his presence as a sign of economic prosperity."
      ]
    },
    legal: {
      passage: "Article 12 and 13 of the Constitution are critical. Art 13 provides a wide connotation to 'law', including ordinances, rules, and customs. Pre-constitutional laws are void to the extent of inconsistency with fundamental rights. Article 12 defines 'State' broadly to include everything from the Union government to local authorities. In Ajay Hasia, the court established tests like government control and public function to determine if a body is an 'instrumentality' of the State.",
      question: "A company, TechLib, is 100% owned by the government and performs municipal library services. Is it a 'State' under Article 12?",
      options: [
        "No, because it is registered as a private limited company.",
        "Yes, as it satisfies the tests of share capital ownership and public function.",
        "No, because libraries are not essential government services.",
        "Yes, but only if the employees are classified as civil servants."
      ]
    },
    logical: {
      passage: "The Chief Justice of India occupies a unique position as the 'Master of the Roster'. This power to constitute benches and allocate cases is an administrative one, but it has profound implications for judicial independence. Proponents argue it ensures order, while critics fear it allows for selective bench composition to influence case outcomes...",
      question: "Which of the following, if true, would most weaken the argument that the CJI's role as Master of Roster is purely administrative?",
      options: [
        "The CJI follows a strict seniority-based allocation for all cases.",
        "Internal directives show that sensitive political cases are consistently assigned to specific benches.",
        "Most judges agree that the current system is the most efficient way to manage the caseload.",
        "The administrative staff, rather than the CJI, performs the actual scheduling tasks."
      ]
    },
    current: {
      passage: "The I2U2 group—comprising India, Israel, the UAE, and the USA—has been dubbed the 'West Asian Quad'. Its primary focus is on joint investments in water, energy, transportation, space, health, and food security. India's population dynamics also remain a key geopolitical factor, with projections suggesting it has overtaken China as the world's most populous nation in early 2023.",
      question: "Which country is NOT a member of the I2U2 grouping mentioned in the passage?",
      options: [
        "India",
        "Israel",
        "United Kingdom",
        "United Arab Emirates"
      ]
    },
    quant: {
      passage: "In a primary school of 900 students, the ratio of girls to boys is 4:5. 20% of girls study Mathematics. The total number of students in Hindi is 220. The ratio of girls to boys in Environmental Science is 1:1, where total students are 180...",
      question: "What is the ratio of girls studying Mathematics to boys in the school if total boys are 500?",
      options: [
        "4:25",
        "8:25",
        "2:5",
        "1:10"
      ]
    }
  },
  'mock-6-2025': {
    english: {
      passage: "The Digital Personal Data Protection Act (DPDP), 2023, is a landmark legislation that aims to balance the digital rights of citizens with the needs of a thriving digital economy. However, the 'privacy' it promises often feels like a 'standard' rather than a 'rule'. In the absence of a Data Protection Board, the implementation remains in a state of suspended animation. Critics argue that the wide state exemptions under the Act could pave the way for surveillance without sufficient checks...",
      question: "Which term from the passage best describes the current state of DPDP Act implementation?",
      options: [
        "Robust and Active",
        "Suspended Animation",
        "Regulated and Checked",
        "Exempted and Lawless"
      ]
    },
    legal: {
      passage: "The Bharatiya Nyaya Sanhita (BNS) has officially replaced the Indian Penal Code (IPC). One of its most significant changes is the introduction of Section 150 which deals with 'Acts endangering sovereignty, unity and integrity of India'. While the word 'Sedition' has been omitted, legal experts point out that the new provision is broader in scope. Additionally, the BNSS (replacing CrPC) introduces mandatory forensic exams for serious crimes...",
      question: "What is the primary concern raised by legal experts regarding the replacement of 'Sedition' with Section 150 of BNS?",
      options: [
        "That the punishment for sedition has been abolished.",
        "That the new provision might be broader and more restrictive than the original law.",
        "That community service will replace imprisonment for these acts.",
        "That the Supreme Court will no longer have jurisdiction over these cases."
      ]
    },
    current: {
      passage: "In April 2026, the Indian Prime Minister participated in the Virtual G20+ Summit, focusing on Global South integration. India's FDI inflows in the semiconductor sector reached $12 billion following the successful launch of the 'Bharat-Chips' initiative. Meanwhile, the WHO declared India's digital health stack as a global benchmark for universal healthcare access.",
      question: "What was the approximate FDI inflow in India's semiconductor sector in early 2026 mentioned in the SITREP?",
      options: [
        "$5 Billion",
        "$12 Billion",
        "$20 Billion",
        "$8 Billion"
      ]
    },
    logical: {
      passage: "Premise 1: All new criminal laws (BNS, BNSS, BSA) aim to decolonize the Indian legal system. Premise 2: Some decolonizing laws introduce stricter timelines for investigations. Conclusion: Some new criminal laws introduce stricter timelines for investigations.",
      question: "Which of the following describes the logical validity of the conclusion based on the premises above?",
      options: [
        "Logically valid and follows directly from the premises.",
        "Invalid because not all decolonizing laws are new criminal laws.",
        "Valid but only if the second premise used 'All' instead of 'Some'.",
        "Incorrect deduction based on categorical errors."
      ]
    }
  }
};

type TestType = 'practice' | 'weekly' | 'monthly';

const MockSimulator = ({ preloadedMockId }: { preloadedMockId: string | null }) => {
  const [testType, setTestType] = useState<TestType | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (preloadedMockId) {
      startTest('practice', preloadedMockId);
    }
  }, [preloadedMockId]);

  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes
  const [currentSection, setCurrentSection] = useState('english');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [dbMocks, setDbMocks] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'mocks'));
    return onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDbMocks(data);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'mocks');
    });
  }, []);

  const allMocksTranscripts = useMemo(() => {
    const combined = { ...MOCK_TRANSCRIPTS };
    dbMocks.forEach(m => {
      combined[m.id as keyof typeof MOCK_TRANSCRIPTS] = m.transcripts;
    });
    return combined;
  }, [dbMocks]);

  const activeContent = useMemo(() => {
    if (selectedPaper && allMocksTranscripts[selectedPaper as keyof typeof allMocksTranscripts]) {
      const paper = allMocksTranscripts[selectedPaper as keyof typeof allMocksTranscripts];
      return (paper as any)[currentSection] || null;
    }
    return null;
  }, [selectedPaper, currentSection, allMocksTranscripts]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = (type: TestType, paperId?: string) => {
    setTestType(type);
    let finalPaperId = paperId;
    if (!finalPaperId) {
      // Map relevant papers to test types
      if (type === 'weekly') {
        const weeklyPapers = ['clat-2025-p1', 'mock-6-2025'];
        finalPaperId = weeklyPapers[Math.floor(Math.random() * weeklyPapers.length)];
      } else if (type === 'monthly') {
        finalPaperId = 'clat-2025-p2';
      } else {
        finalPaperId = 'clat-2024';
      }
    }
    setSelectedPaper(finalPaperId);
    setIsActive(true);
    setAnswers({});
    setTimeLeft(120 * 60);
  };

  const finishTest = async () => {
    setIsActive(false);
    setIsSaving(true);

    const scoreMap: Record<string, number> = {};
    let total = 0;
    SECTIONS.forEach(s => {
      const answered = Object.keys(answers).filter(k => k.startsWith(s.id)).length;
      // Simulate scoring: each answer has 80% chance of being right in this demo logic
      const score = Math.floor(answered * 0.8 * 1.25); 
      scoreMap[s.id] = score;
      total += score;
    });

    const resultData = {
      testType: testType || 'practice',
      scores: scoreMap,
      totalScore: total,
      accuracy: 82, // Static mock accuracy
      timeSpent: (120 * 60) - timeLeft,
      completedAt: serverTimestamp()
    };

    setResults(resultData);

    // Save to Firebase
    if (auth.currentUser) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const mocksPath = `users/${auth.currentUser.uid}/mocks`;
        await addDoc(collection(db, mocksPath), resultData);

        // Update overall profile for Dynamic Study Engine
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const prevAvg = userData.behavior?.averageMockScore || 0;
          const mockCount = 1; // Simplification: in real app we'd count documents or keep a count in profile
          
          // Better: just fetch all mocks and average them (or just weighted average here)
          const newAvg = prevAvg === 0 ? total : (prevAvg * 0.7 + total * 0.3); // Moving average
          const newAccuracy = userData.behavior?.accuracy ? (userData.behavior.accuracy * 0.7 + results.accuracy * 0.3) : results.accuracy;

          await setDoc(userRef, {
            behavior: {
              averageMockScore: Math.round(newAvg),
              accuracy: Math.round(newAccuracy),
              lastMockDate: serverTimestamp()
            },
            updatedAt: serverTimestamp()
          }, { merge: true });
        }

        toast.success("Result Synced with Dynamic Study Engine");
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser.uid}/mocks`);
      }
    }

    setIsSaving(false);
  };

  if (results) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 pb-20 mt-10">
        <div className="text-center">
          <h2 className="text-4xl font-serif text-foreground italic mb-4">Post-Examination Audit</h2>
          <p className="text-[10px] text-primary font-black tracking-[0.4em] uppercase">Juris Elite Scorecard • {testType?.toUpperCase()} TEST</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white border-gray-100 shadow-xl p-8 text-center flex flex-col justify-center items-center gap-2 rounded-sm">
            <span className="text-muted-foreground text-[10px] uppercase font-black tracking-widest">Composite Score</span>
            <span className="text-5xl font-serif text-primary italic font-black">{results.totalScore}</span>
            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Top 2%ile</span>
          </Card>
          <Card className="bg-white border-gray-100 shadow-xl p-8 text-center flex flex-col justify-center items-center gap-2 rounded-sm">
             <span className="text-muted-foreground text-[10px] uppercase font-black tracking-widest">Accuracy Matrix</span>
             <span className="text-4xl font-serif text-foreground italic font-black">{results.accuracy}%</span>
             <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Precision Standard</span>
          </Card>
          <Card className="bg-white border-gray-100 shadow-xl p-8 text-center flex flex-col justify-center items-center gap-2 rounded-sm">
             <span className="text-muted-foreground text-[10px] uppercase font-black tracking-widest">Time Efficiency</span>
             <span className="text-4xl font-serif text-foreground italic font-black">{Math.floor(results.timeSpent / 60)}m</span>
             <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Tactical Speed</span>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-serif text-foreground italic border-b border-gray-100 pb-4">Sectional Performance Breakdown</h3>
          <div className="grid gap-4">
            {SECTIONS.map(s => (
              <div key={s.id} className="bg-white border border-gray-100 shadow-sm p-6 flex items-center justify-between rounded-sm">
                <div>
                  <div className="text-foreground font-serif text-xl italic">{s.label}</div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Difficulty Variance: Moderate</div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-serif text-2xl font-black italic">{results.scores[s.id]} / {s.questions}</div>
                  <div className="h-1.5 w-40 bg-gray-100 rounded-full overflow-hidden mt-3">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${(results.scores[s.id] / s.questions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full h-16 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-sm hover:opacity-90 transition-all shadow-xl"
          onClick={() => { setResults(null); setTestType(null); }}
        >
          Return to Arena
        </Button>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="max-w-6xl mx-auto py-10 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-serif text-foreground italic tracking-tight">Mock Examination Arena</h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-black">Select your training schedule to begin the simulation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Practice */}
          <Card className="bg-white border-gray-100 p-10 flex flex-col gap-8 group hover:shadow-2xl transition-all rounded-sm shadow-lg">
            <div className="w-14 h-14 bg-primary-light border border-primary/10 flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform">
              <Clock size={24} className="-rotate-45 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-foreground mb-3 italic">Standard Practice</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">Rapid drills, sectional focus, and unrestricted timing. Best for module mastery.</p>
            </div>
            <div className="mt-auto pt-8 border-t border-gray-50">
               <button 
                onClick={() => startTest('practice')}
                className="w-full py-4 border-2 border-primary text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-sm"
               >
                 Initialize Drill
               </button>
            </div>
          </Card>

          {/* Weekly */}
          <Card className="bg-primary p-10 flex flex-col gap-8 group hover:shadow-2xl transition-all relative overflow-hidden rounded-sm shadow-xl">
            <div className="absolute top-0 right-0 bg-white text-primary px-4 py-1.5 text-[8px] font-black uppercase tracking-widest">Live Now</div>
            <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform">
              <Calendar size={24} className="-rotate-45 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-serif text-white mb-3 italic">Weekly Challenge</h3>
              <p className="text-white/70 text-sm leading-relaxed font-light">High-difficulty passage selection based on the current week's legal transitions.</p>
            </div>
            <div className="mt-auto pt-8 border-t border-white/10 relative z-10">
               <button 
                onClick={() => startTest('weekly')}
                className="w-full py-4 bg-white text-primary text-[10px] font-black uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-2xl rounded-sm"
               >
                 Start Weekly Mock
               </button>
            </div>
          </Card>

          {/* Monthly */}
          <Card className="bg-white border-gray-100 p-10 flex flex-col gap-8 group hover:shadow-2xl transition-all rounded-sm shadow-lg">
            <div className="w-14 h-14 bg-primary-light border border-primary/10 flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform">
              <Trophy size={24} className="-rotate-45 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-foreground mb-3 italic">Monthly Grand Mock</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">Full-length simulation for national ranking estimation. Comprehensive analytics guaranteed.</p>
            </div>
            <div className="mt-auto pt-8 border-t border-gray-50">
               <button 
                onClick={() => startTest('monthly')}
                className="w-full py-4 border-2 border-gray-200 text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all rounded-sm"
               >
                 Enter Tournament
               </button>
            </div>
          </Card>
        </div>

        <div className="bg-white p-10 border border-gray-100 flex items-center justify-between rounded-sm shadow-xl">
           <div className="flex items-center gap-8">
              <div className="p-5 bg-primary-light text-primary rounded-sm shadow-inner"><BarChart3 size={28} /></div>
              <div>
                <h4 className="text-2xl font-serif text-foreground italic">Academic Integrity Standard</h4>
                <p className="text-muted-foreground text-[10px] uppercase font-black tracking-widest mt-1">Protocol v4.2 Enforced • Real-time Proctoring</p>
              </div>
           </div>
           <div className="flex gap-8 border-l border-gray-100 pl-8">
              <div className="text-right">
                <span className="block text-3xl font-serif text-primary italic font-black">840+</span>
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Aspirants Live</span>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-4 sm:p-6 pt-24">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Exam Dashboard */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <Card className="bg-white border-gray-100 p-8 rounded-sm shadow-xl space-y-6">
            <div className="flex items-center justify-between text-muted-foreground font-black uppercase tracking-widest text-[10px]">
              <span>Session Duration</span>
              <Timer size={14} className="text-primary" />
            </div>
            <div className={`text-5xl font-serif text-center py-4 italic font-black ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all ${timeLeft < 300 ? 'bg-red-500' : 'bg-primary'}`}
                 style={{ width: `${(timeLeft / (120 * 60)) * 100}%` }}
               />
            </div>
          </Card>

          <Card className="bg-white border-gray-100 flex-1 p-8 rounded-sm shadow-xl flex flex-col min-h-[400px] lg:min-h-0">
             <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-6">Navigational Map</div>
             <ScrollArea className="flex-1 pr-2">
               <div className="grid grid-cols-4 gap-2.5">
                 {Array.from({ length: 60 }).map((_, i) => (
                   <button 
                     key={i} 
                     className={`aspect-square text-[10px] font-black border transition-all rounded-sm ${answers[`${currentSection}-${i}`] !== undefined ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'border-gray-100 text-muted-foreground hover:border-primary/50'}`}
                   >
                     {i + 1}
                   </button>
                 ))}
               </div>
             </ScrollArea>
             <Button 
               variant="destructive" 
               className="mt-8 rounded-sm uppercase font-black tracking-widest text-[10px] h-14 shadow-lg shadow-red-100"
               disabled={isSaving}
               onClick={finishTest}
             >
               {isSaving ? "SYNCING..." : "Final Submission"}
             </Button>
          </Card>
        </div>

        {/* Question Panel */}
        <div className="flex-1 flex flex-col gap-6">
          <Tabs value={currentSection} onValueChange={setCurrentSection} className="w-full">
            <TabsList className="bg-white border border-gray-100 p-1.5 rounded-sm w-full justify-start h-16 shadow-lg">
              {SECTIONS.map(s => (
                <TabsTrigger 
                  key={s.id} 
                  value={s.id}
                  className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white uppercase text-[10px] font-black tracking-widest h-full px-8 transition-all"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Card className="flex-1 bg-white border-gray-100 rounded-sm p-8 lg:p-14 shadow-2xl flex flex-col min-h-[600px]">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">Contextual Passage 01.A • {currentSection.toUpperCase()}</div>
                  <div className="bg-primary-light/30 border-l-4 border-primary p-10 rounded-r-lg">
                    <p className="text-[#111827] text-xl leading-[1.8] font-serif font-light">
                      {activeContent?.passage || 'The principle of vicarious liability in tort law establishes that an employer is responsible for the wrongful acts of an employee committed in the course of employment. This doctrine, often summarized as "respondeat superior," ensures that victims can seek damages from the party with more substantial resources.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl text-foreground font-serif italic border-b border-gray-50 pb-6">Question 01: {activeContent?.question || 'Based on the passage, which of the following scenarios best demonstrates vicarious liability?'}</h3>
                  <div className="grid gap-4">
                    {(activeContent?.options || [
                      "A driver delivers a package and hits a pedestrian on the standard route.",
                      "An employee takes the company car for a weekend personal trip.",
                      "A consultant working independently causes property damage.",
                      "A manager gets into a personal dispute at a grocery store."
                    ]).map((opt: string, i: number) => (
                      <button 
                        key={i} 
                        className={`text-left p-6 border-2 transition-all flex items-center justify-between group rounded-sm ${answers[`${currentSection}-${0}`] === i ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'border-gray-50 bg-[#F9FAFB] hover:border-primary/30 text-foreground'}`}
                        onClick={() => setAnswers({...answers, [`${currentSection}-${0}`]: i})}
                      >
                        <span className="text-sm font-sans flex items-center gap-6">
                          <span className={`w-10 h-10 rounded-sm border flex items-center justify-center text-[11px] font-black transition-all ${answers[`${currentSection}-${0}`] === i ? 'bg-white text-primary border-white' : 'bg-white border-gray-100 text-primary shadow-sm'}`}>0{i+1}</span>
                          <span className={answers[`${currentSection}-${0}`] === i ? 'font-bold' : 'font-medium'}>{opt}</span>
                        </span>
                        {answers[`${currentSection}-${0}`] === i && <CheckCircle2 size={24} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="pt-10 flex justify-between border-t border-gray-50 mt-10">
               <button className="flex items-center gap-3 text-muted-foreground uppercase tracking-widest text-[10px] font-black hover:text-primary transition-all">
                 <ChevronLeft size={18} /> Previous Document
               </button>
               <button className="flex items-center gap-3 text-primary uppercase tracking-widest text-[10px] font-black hover:translate-x-1 transition-all">
                 Next Module <ChevronRight size={18} />
               </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MockSimulator;
