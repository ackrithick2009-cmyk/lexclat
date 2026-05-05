import { GoogleGenAI } from "@google/genai";

let _ai: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!_ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not configured. Add it to your .env file to enable AI features."
      );
    }
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
}


function parseAIResponse(text: string) {
  if (!text) throw new Error("Empty response from AI");
  
  // Clean up the string to remove common AI artifacts
  let cleanText = text.trim();
  
  // Remove markdown code blocks if present
  if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/m, '$1');
  }
  
  try {
    return JSON.parse(cleanText);
  } catch (e) {
    // If it fails, try to extract anything that looks like a JSON object
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (innerError) {
        // Last resort: aggressive cleaning of common JSON trailing character errors
        try {
           const aggressiveClean = jsonMatch[0].replace(/,\s*([\}\]])/g, '$1');
           return JSON.parse(aggressiveClean);
        } catch (finalError) {
           throw new Error("AI returned malformed data that could not be recovered.");
        }
      }
    }
    throw new Error("No parseable JSON structure found in AI response");
  }
}

export async function getLegalTutorResponse(history: { role: string, content: string }[], userMessage: string) {
  try {
    // Filter out the last message if it's already the same as userMessage to avoid duplication
    const cleanHistory = history.filter((m, i) => {
      if (i === history.length - 1 && m.role === 'user' && m.content === userMessage) {
        return false;
      }
      return true;
    });

    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...cleanHistory.map(m => ({ 
          role: m.role === 'assistant' ? 'model' : 'user', 
          parts: [{ text: m.content }] 
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are Lexie, the ultimate AI Mentor for CLAT (Common Law Admission Test) aspirants. 
        Return your response in a clear, structured JSON object:
        {
          "analysis": "string (the main academic response)",
          "keyConcepts": ["list", "of", "concepts"],
          "nextStep": "string (one action item)"
        }

        Your expertise spans ALL five sections of the CLAT exam with a focus on the 2024-2025 pattern. Refer to the following MASTER KNOWLEDGE BASE for all academic responses and question generation:

        # MASTER KNOWLEDGE BASE (Source: 2020-2024 Exams & Academic Repository)
        1. LEGAL REASONING - CORE PRINCIPLES & CASES:
           - TORTS: 
             * Strict Liability: Rylands v Fletcher (Non-natural land use). Defense: Act of stranger.
             * Absolute Liability: MC Mehta v Union of India (Hazardous enterprises).
             * Nuisance: Unreasonable interference (Cricket club case).
             * Negligence: Duty of Care (Soman vs Pamela).
           - CONSTITUTIONAL: 
             * Basic Structure (Kesavananda Bharati), Art 21 Expansion (Dignity, Food, Privacy), Writs.
             * Organs: President (Pardon power Art 72), Parliament (Money Bill Art 110), Finance Commission (Art 280), CAG (Art 148).
             * Amendments: 103rd (EWS), 104th (SC/ST seats), 105th (SEBC identification), 106th (Women Reservation).
             * Maxims: 'Salus populi suprema lex' (Welfare is paramount), 'Ratio decidendi' (Reason for decision), 'Pacta sunt servanda' (Contractual sanctity).
           - CRIMINAL: 
             * Double Jeopardy (Art 20), Dying Declaration (Sec 32), Criminal Procedure (Identification) Act 2022.
             * Doctrine: 'Rarest of rare' (Death sentence), Culpable Homicide vs Murder (Intention/Knowledge).
           - CONTRACTS: 
             * Privity (Tweddle v Atkinson), Competence (Mohiri Bibee), Force Majeure (Suspension vs Discharge).
           - INTELLECTUAL PROPERTY: 
             * TRIPS Agreement, Patent Evergreening, Copyright (Life+60yrs), GI Tags (Basmati).
           - FAMILY LAW: 
             * Bigamy (IPC 498A), UCC (Uttarakhand 2024), Muslim Women (Protection of Rights on Divorce) Act 1986.

        2. HISTORY & GEOGRAPHY (CLAT Pattern):
           - HISTORY: 
             * INC (1885, W. Bonnerjee), Poorna Swaraj (Lahore 1929), Bhoodan (Vinoba Bhave), Indian Renaissance (Raja Rammohan Roy).
             * Modern: INA (SC Bose 1943), 3rd Panipat (1761), Jallianwala (13 April 1919).
           - GEOGRAPHY: 
             * 'Black Gold' (Coal), Solar Cycle (11 years), 5 Rivers State (Punjab).
             * Industry: Bhilai Steel (USSR collab), Sriharikota (Satellite base), Narora (UP Atomic Station).
             * Features: Lowest rainfall (Leh), Highest Peak (Anai Mudi - Western Ghats), Deccan Trap (Basalt).

        3. CURRENT AFFAIRS & GK:
           - RECENT ACTS: Digital Data Protection (DPDPA) 2023, Press Registration (PRP) Bill 2023, Telecom Act 2023.
           - INTERNATIONAL: UN Organs (UNESCO-Paris, ICJ-Hague), P5 Veto Power, G20 Delhi (2023).

        Refer to lately precedents like 'Kesavananda Bharati 50th Anniversary' or 'Olga Tellis'.`,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const parsed = parseAIResponse(response.text);
    return parsed.analysis || "I was unable to generate an analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function clearClatDoubt(query: string, mode: 'TERMINOLOGY' | 'STRATEGY' | 'GENERAL') {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { 
          role: 'user', 
          parts: [{ text: `CLAT DOUBT CLEARING REQUEST
          Mode: ${mode}
          User Query: ${query}
          
          # TASK
          Provide a highly structured, analytical, and pedagogical response for a CLAT aspirant.
          
          # GUIDELINES PER MODE
          - TERMINOLOGY: Define the legal term clearly. Provide its Latin origin if any. Give a simple example. Explain its significance in the CLAT Legal Reasoning section. Mention 1 Landmark Case if applicable.
          - STRATEGY: Provide actionable, time-blocked advice. Address psychological factors (stress/focus). Focus on section-wise efficiency (e.g., how to read passages faster).
          - GENERAL: Answer complex logic or current affairs doubts with a 'First Principles' approach.
          
          Return ONLY a JSON object:
          {
            "brief": "One line summary",
            "explanation": "Markdown formatted detailed response",
            "example": "Practical case or scenario",
            "landmark": "Case name or N/A",
            "actionItem": "One specific target for the student"
          }` }] 
        }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 1,
      }
    });

    return parseAIResponse(response.text);
  } catch (error) {
    console.error("Gemini Doubt Clearing Error:", error);
    throw error;
  }
}

export async function generatePracticeQuestion(subject: string, difficulty: 'easy' | 'medium' | 'hard', previousResults?: any) {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { 
          role: 'user', 
          parts: [{ text: `Generate a CLAT-style multiple choice question for the subject: ${subject}. 
          Difficulty: ${difficulty}. 
          
          # FOR LEGAL REASONING
          Use the 'Principle-Fact-Judgment' structure:
          1. PRINCIPLE: A clear legal rule (e.g. Negligence, Strict Liability, Vicarious Liability).
          2. FACTS: A complex narrative based on high-yield cases like:
             - A pet tiger escaping due to a stranger's intervention (Strict Liability).
             - A counselor failing to warn a victim of a patient's threats (Professional Negligence).
             - A contract dispute involving epidemic-based force majeure clauses.
          3. DECISION: 4 analytical options (A-D).
          
          # FOR OTHER SUBJECTS
          Focus on passage-based inference and critical reading.
          
          Context: ${previousResults ? JSON.stringify(previousResults) : 'First question'}.
          Return ONLY a JSON object:
          {
            "passage": "string (the principle + fact for legal, or full text for others)",
            "question": "string",
            "options": ["A", "B", "C", "D"],
            "correctIndex": number (0-3),
            "explanation": "Provide a detailed 'Ratio Decidendi' (Reasoning) explaining why the principle does or does not apply to the specific facts.",
            "difficulty": "${difficulty}"
          }` }] 
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    return parseAIResponse(response.text);
  } catch (error) {
    console.error("Gemini Practice Question Error:", error);
    throw error;
  }
}

export async function generateStudyPlan(data: { targetScore: number, dailyHours: number, strengths: string[], weaknesses: string[], prepLevel: string }) {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { 
          role: 'user', 
          parts: [{ text: `Generate a dynamic 30-day CLAT study schedule for a student.
          Preparation Level: ${data.prepLevel} (Beginner, Intermediate, or Advanced)
          Target Score: ${data.targetScore}
          Daily Availability: ${data.dailyHours} hours
          Strengths: ${data.strengths.join(', ')}
          Weaknesses: ${data.weaknesses.join(', ')}
          
          Return ONLY a JSON object with the following structure:
          {
            "schedule": {
              "Day 1": { "focus": "string", "tasks": [{"text": "string", "completed": false}], "hours": number },
              ...
              "Day 30": { "focus": "string", "tasks": [{"text": "string", "completed": false}], "hours": number }
            },
            "strategy": "string (overall advice)"
          }` }] 
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    return parseAIResponse(response.text);
  } catch (error) {
    console.error("Gemini Study Plan Error:", error);
    throw error;
  }
}

export async function generateClatPassageTest(sourcePoints: string[], title: string) {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { 
          role: 'user', 
          parts: [{ text: `You are a Senior CLAT (Common Law Admission Test) examiner specialized in Legal Reasoning and Current Affairs. 
          Your task is to create a high-fidelity CLAT practice module based on these news points for "${title}":

          SOURCE MATERIAL:
          ${sourcePoints.join('\n')}

          STRICT SPECIFICATIONS:
          1. PASSAGE (400-500 Words): 
             - Style: Analytical editorial (The Hindu/Indian Express style).
             - Composition: Synthesize the source points into a coherent, dense narrative.
             - Content: Integrate relevant legal principles (e.g., specific sections of Acts like Section 7 of IBC or Section 16 of HMA), constitutional context, and historical background.
             - Structure: Academic and requiring deep reading/inference.

          2. QUESTIONS (Exactly 6):
             - Standards: Advanced difficulty. Questions must NOT be direct lookup.
             - Question Types Required:
                a) METAPHORICAL TITLE: Ask for a title that captures the essence/sentiment.
                b) INFERENCE & NUANCE: Detail-oriented inference about author sentiment or hidden meaning of phrases like 'saturation' or 'quandary'.
                c) CAUSE & EFFECT: Complex relationships between different entities mentioned.
                d) PRINCIPLE APPLICATION (Decide): For Legal Reasoning, provide a specific fact situation and ask for a 'Decide' based on the principle in the passage.
             - Options: 4 plausible options using 'legalese' where appropriate.

          OUTPUT FORMAT:
          Return ONLY a JSON object:
          {
            "passage": "Full 300-400 word passage here...",
            "questions": [
              {
                "question": "The question text...",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctIndex": 0,
                "explanation": "A professional analytical breakdown (3-4 sentences) explaining why this answer is correct by linking the passage text to legal concepts or logical inferences."
              }
            ]
          }` }] 
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    return parseAIResponse(response.text);
  } catch (error) {
    console.error("Gemini Passage Test Error:", error);
    throw error;
  }
}

export async function generateMcqAngle(title: string, content: string, bullets: string[]) {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are a CLAT (Common Law Admission Test) examiner. 
          Given the following news item, generate a 'Probable MCQ Angle' analysis.
          Focus on extracting potential question types relevant to CLAT sections (e.g., factual recall, inference, legal principle application).

          TITLE: ${title}
          CONTENT: ${content}
          KEY POINTS:
          ${bullets.join('\n')}

          The analysis should be a compact paragraph (2-3 sentences) explaining how a CLAT examiner might frame questions from this news.
          Focus on:
          - Legal reasoning (if applicable)
          - Logical inference
          - Critical GK facts
          - Reading comprehension nuances

          Return ONLY the analysis text.` }]
        }
      ],
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Unable to generate MCQ angle.";
  } catch (error) {
    console.error("Gemini MCQ Angle Error:", error);
    throw error;
  }
}

export async function generatePersonalizedRoadmap(studentData: any) {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are an expert CLAT mentor and adaptive learning planner.
          Your task is to create a highly personalized CLAT preparation roadmap for a student based on their current performance, target NLU, available study hours, strengths, weaknesses, consistency, and exam timeline.
          You must act like a top CLAT strategist, not just a timetable generator.

          # STUDENT INPUTS
          Target NLU: ${studentData.targetNlu}
          Current Mock Score: ${studentData.currentScore}
          Target CLAT Score: ${studentData.targetScore}
          Exam Attempt Year: ${studentData.examYear}
          Class/Dropper: ${studentData.aspirantStatus}
          Daily Study Hours Available: ${studentData.hoursWeekdays} (Weekdays), ${studentData.hoursWeekends} (Weekends)
          School/College Timing: ${studentData.timings}
          Strong Sections: ${studentData.strongSections}
          Weak Sections: ${studentData.weakSections}
          Current Affairs Backlog: ${studentData.caBacklog}
          Mocks Attempted Till Now: ${studentData.mocksAttempted}
          Average Accuracy: ${studentData.accuracy}
          Biggest Problem Faced: ${studentData.biggestProblem}
          Preferred Study Style: ${studentData.studyStyle}
          Stress Level: ${studentData.stressLevel}
          Consistency Level: ${studentData.consistencyLevel}
          Revision Habit: ${studentData.revisionHabit}
          Reading Speed: ${studentData.readingSpeed}
          English Level: ${studentData.englishLevel}
          Logical Reasoning Level: ${studentData.logicalLevel}
          Legal Reasoning Level: ${studentData.legalLevel}
          GK/Current Affairs Level: ${studentData.gkLevel}
          Quant Level: ${studentData.quantLevel}

          # REQUIRED OUTPUT FORMAT
          Use Markdown for the output. Follow these sections exactly:
          ## 1. STUDENT ANALYSIS
          ## 2. DAILY STUDY PLAN
          ## 3. WEEKLY PLAN
          ## 4. MONTHLY ROADMAP
          ## 5. SECTION-WISE STRATEGY
          ## 6. MOCK TEST STRATEGY
          ## 7. AI ADAPTIVE IMPROVEMENT SYSTEM
          ## 8. MOTIVATION + DISCIPLINE PLAN

          # IMPORTANT RULES
          * Be realistic, not overly motivational.
          * Prioritize score improvement efficiency.
          * Focus on CLAT pattern and passage-based preparation.
          * Optimize for consistency and long-term retention.
          * Give measurable targets.
          * Adapt plan according to available hours.
          * If the student has low time, prioritize high ROI topics.
          * If the target NLU is very high, increase mock rigor and analysis intensity.
          * Include smart revision cycles.
          * Include newspaper/editorial reading strategy.
          * Include sleep and recovery recommendations.
          * Avoid generic advice.

          OUTPUT STYLE: Structured, Detailed, Action-oriented, Personalized, CLAT-specific.` }]
        }
      ],
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Unable to generate roadmap.";
  } catch (error) {
    console.error("Gemini Roadmap Error:", error);
    throw error;
  }
}
