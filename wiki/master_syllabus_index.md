# 🗺️ CLAT Master Syllabus Index

> **Your one-stop navigation hub** for the LexCLAT Master Wiki — a complete 5-subject CLAT preparation platform.

---

## 📚 Subject Modules

| # | Subject | Quick Vault | **Complete Study Guide** | Questions | Key Focus |
|---|---------|-------------|--------------------------|-----------|-----------|
| 1 | ⚖️ Legal Reasoning | [legal_vault.md](./legal_vault.md) | [**01_Legal_Reasoning.md**](./study_guides/01_Legal_Reasoning.md) | 28–32 | Torts, Contracts, BNS, Constitution, Maxims |
| 2 | 🌍 Current Affairs & GK | [gk_vault.md](./gk_vault.md) | [**02_Current_Affairs_GK.md**](./study_guides/02_Current_Affairs_GK.md) | 28–32 | Schemes, Budget, IR, Static GK |
| 3 | 📖 English Language | [english_vault.md](./english_vault.md) | [**03_English_Language.md**](./study_guides/03_English_Language.md) | 22–26 | RC, Vocabulary, Grammar in Context |
| 4 | 🧠 Logical Reasoning | [logical_vault.md](./logical_vault.md) | [**04_Logical_Reasoning.md**](./study_guides/04_Logical_Reasoning.md) | 22–26 | Arguments, Assumptions, Syllogisms |
| 5 | 📊 Quantitative Techniques | [quant_vault.md](./quant_vault.md) | [**05_Quantitative_Techniques.md**](./study_guides/05_Quantitative_Techniques.md) | 10–14 | DI, Percentages, Caselets, Charts |
| 6 | 🏛️ **Detailed Study Vault** | [Chapter Index](#detailed-study-vaults) | — | High-Yield | Extracted Modules & Quizzes |

> **Start here**: The **Complete Study Guides** in [`/wiki/study_guides/`](./study_guides/) cover every topic in the CLAT 2026 syllabus with principles, tables, practice sets, and revision checklists.

**Total: 120 marks | Duration: 2 Hours**

---

## 🏛️ Detailed Study Vaults
The following chapters have been extracted from bulk materials and formatted for high-readability study. Each includes a dedicated practice quiz.

### ⚖️ Legal Reasoning
- [Chapter 12: Previous Year Questions (Legal Reasoning)](./legal_vault/Legal_Chapter_12.md)
- [Chapter 14: Constitution & Political System](./legal_vault/Legal_Chapter_14.md)
- [Chapter 20: Commissions & Committees](./legal_vault/Legal_Chapter_20.md)

### 🌍 General Awareness
- [Chapter 42: Geography](./gk_vault/GK_Chapter_42.md)
- [Chapter 54: Arts & Literature](./gk_vault/GK_Chapter_54.md)

### 🧠 Logical Reasoning
- [Chapter 92: Logical Reasoning (Foundation)](./logical_vault/Logic_Chapter_92.md)

### 📖 English & 📊 Quant
- [Chapter 74: English Comprehension (Legal/Social)](./english_vault/English_Chapter_74.md)
- [Chapter 89: Elementary Mathematics (Foundation)](./quant_vault/Quant_Chapter_89.md)

---

## 📅 12-Month Study Plan

> **Start Date**: June | **CLAT Exam**: May of following year

### Phase 1 — Foundation (June–August)
| Month | Focus | Targets |
|-------|-------|---------|
| **June** | Legal Reasoning | Indian Contract Act, Law of Torts basics, IEA/BSA 2023 |
| **July** | English Language | Passage reading daily (The Hindu editorial); Vocabulary Tier 1 |
| **August** | Logical Reasoning | Argument structure, Assumption identification |

### Phase 2 — Core Building (September–November)
| Month | Focus | Targets |
|-------|-------|---------|
| **September** | Legal Reasoning + Current Affairs | Constitutional law deep dive; Start monthly CA notes |
| **October** | All Subjects — Integration | 2 previous year papers (2020, 2021); analyze weak areas |
| **November** | Quantitative Techniques + Full Mock | Master data interpretation; complete 1 mock per week |

### Phase 3 — Intensive Practice (December–February)
| Month | Focus | Targets |
|-------|-------|---------|
| **December** | Previous Year Papers | 2022, 2023 CLAT papers with timed practice |
| **January** | Current Affairs Consolidation | Union Budget release; update gk_vault.md |
| **February** | Speed + Accuracy Drills | 2024, 2025 CLAT papers; target 90+ score |

### Phase 4 — Revision & Final Push (March–May)
| Month | Focus | Targets |
|-------|-------|---------|
| **March** | Comprehensive Revision | All 5 subject modules; weak areas only |
| **April** | Mock Exams + Analysis | 2 full mocks/week; analyze each wrong answer |
| **May** | Light Revision + Mental Prep | Only revise formulas, key cases, key events |

---

## 🎯 Daily Study Schedule (Recommended)

| Time Slot | Duration | Activity |
|-----------|----------|---------|
| 7:00 – 7:30 AM | 30 min | Current Affairs: Read 1 news article + add to notes |
| 7:30 – 9:00 AM | 90 min | Main Subject Study (rotate daily) |
| 6:00 – 7:00 PM | 60 min | Practice Questions (20 MCQs from today's subject) |
| 9:00 – 9:30 PM | 30 min | Review mistakes from the day |

**Weekly**: 1 Sectional Mock Test (e.g., only Legal Reasoning under timed conditions)  
**Monthly**: 1 Full Mock (120 marks, 120 minutes)

---

## 🏛️ CLAT Exam Pattern Reference

| Section | Questions | Marks | Time Allocation |
|---------|-----------|-------|----------------|
| English Language | 20–24 | 22 | 25 min |
| Current Affairs & GK | 22–26 | 25 | 25 min |
| Legal Reasoning | 28–32 | 28 | 35 min |
| Logical Reasoning | 22–26 | 22 | 25 min |
| Quantitative Techniques | 10–14 | 8 | 10 min |
| **Total** | **~120** | **~120** | **120 min** |

> **Marking**: +1 for correct, **−0.25 for wrong** (negative marking)  
> **Cutoffs** (approx.): NLSIU ~108 | NALSAR ~106 | WBNUJS ~103

---

## 🤖 RAG Integration Reference

This wiki is structured as the **ground truth corpus** for the LexCLAT RAG-powered mock exam generator. The Gemini AI integration (`GEMINI_API_KEY`) can:

1. **Index these files** into a vector store using the Gemini Embeddings API
2. **Retrieve relevant passages** when a user asks a question (e.g., "Explain the Basic Structure Doctrine")
3. **Generate MCQs** using the `gk_vault.md` and `legal_vault.md` as source material
4. **Update content** automatically when new CLAT papers are added to `/assets/clat_papers/`

### Archive Files
- CLAT Question Papers: [`/assets/clat_papers/`](../assets/clat_papers/)
  - CLAT_2020.pdf
  - CLAT_2021.pdf
  - CLAT_2022.pdf
  - CLAT_2023.pdf
  - CLAT_2024.pdf
  - CLAT_2025.pdf

---

## 🌐 Frontend Wiki Routes (Planned)

Once integrated with the React frontend, these wiki modules map to:

| Route | Component | Source File |
|-------|-----------|------------|
| `/wiki` | Master Index | `master_syllabus_index.md` |
| `/wiki/legal` | Legal Vault | `legal_vault.md` |
| `/wiki/current-affairs` | CA & GK Hub | `gk_vault.md` |
| `/wiki/english` | English Module | `english_vault.md` |
| `/wiki/logic` | Logic Module | `logical_vault.md` |
| `/wiki/quant` | Quant Module | `quant_vault.md` |

---

*LexCLAT Master Wiki — Built with the Hybrid 3-Agent System (Gemini + Claude + MCP)*  
*Last Updated: May 2026*


---

## 💊 High-Yield Study Capsules (2024–2026)

> **For rapid revision before the exam.** Each capsule is a self-contained deep-dive with exact timelines, legal doctrines, and CLAT passage strategies.

### ⚖️ Legal Reasoning Capsules
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 1 | [BNS / BNSS / BSA — The New Criminal Trilogy](./capsules/capsule_bns_bnns_bsa.md) | Decolonial jurisprudence, evidentiary modernization | ★★★★★ |
| 2 | [SC/ST Sub-Classification (Davinder Singh)](./capsules/capsule_scst_subclassification.md) | Substantive equality, overruling Chinnaiah | ★★★★★ |
| 3 | [Electoral Bonds (ADR v. UOI)](./capsules/capsule_electoral_bonds.md) | Proportionality test, Art. 19(1)(a) | ★★★★★ |
| 4 | [Uttarakhand UCC](./capsules/capsule_uttarakhand_ucc.md) | Art. 44 DPSP vs. Art. 21 privacy, Art. 254(2) | ★★★★☆ |

### 🌍 Current Affairs & GK Capsules
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 5 | [ICJ Gaza Genocide Case (South Africa v. Israel)](./capsules/capsule_icj_gaza.md) | Erga omnes, plausibility threshold, provisional measures | ★★★★☆ |
| 6 | [BRICS Expansion vs. IMEC](./capsules/capsule_brics_imec.md) | Chokepoint geopolitics, de-dollarization, minilateralism | ★★★★☆ |

### 📖 English Language Capsules
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 7 | [English RC — Mastering 450-Word Passages](./capsules/capsule_english_rc.md) | 3 passage types, 90-second skim, 2-out elimination | ★★★★★ |

### 🧠 Logical Reasoning Capsules
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 8 | [Critical Reasoning — Assumptions, Strengthen/Weaken, Flaws](./capsules/capsule_logical_critical.md) | Negation test, causal link, 5 flaw types, paradoxes | ★★★★★ |

### 📊 Quantitative Techniques Capsules
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 9 | [DI Mastery — Table, Bar, Pie, Line, Caselet](./capsules/capsule_quant_di.md) | 5 DI formats, fraction-percentage grid, approximation rules | ★★★★★ |

### ⚖️ Legal Reasoning Capsules (Continued)
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 10 | [Constitutional Law — Golden Triangle & Basic Structure](./capsules/capsule_constitutional_golden_triangle.md) | Articles 14, 19, 21, Kesavananda, proportionality test | ★★★★★ |
| 11 | [Law of Torts — Negligence, Defamation, Liability](./capsules/capsule_law_of_torts.md) | Donoghue v. Stevenson, Rylands, M.C. Mehta, vicarious liability | ★★★★★ |

### 🧠 Logical Reasoning Capsules (Continued)
| # | Capsule | Topic | Relevance |
|---|---------|-------|-----------|
| 12 | [Analytical Reasoning — Syllogisms, Seating, Blood Relations](./capsules/capsule_analytical_reasoning.md) | Venn diagrams, linear/circular arrangements, coding-decoding | ★★★★☆ |

---

*LexCLAT Master Wiki — Updated with CLAT 2026 High-Yield Capsules | Last Updated: 2026*
