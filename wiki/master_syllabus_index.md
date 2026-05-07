# 🗺️ CLAT Master Syllabus Index

> **Your one-stop navigation hub** for the LexCLAT Master Wiki — a complete 5-subject CLAT preparation platform.

---

## 📚 Subject Modules

| # | Subject | File | Section Weight | Key Focus |
|---|---------|------|---------------|-----------|
| 1 | ⚖️ Legal Reasoning | [legal_reasoning_vault.md](./legal_reasoning_vault.md) | ~25 marks | Cases, Torts, Contracts, BNS |
| 2 | 🌍 Current Affairs & GK | [current_affairs_gk_hub.md](./current_affairs_gk_hub.md) | ~25 marks | Events, Economy, Constitution |
| 3 | 📖 English Language | [english_comprehension.md](./english_comprehension.md) | ~22 marks | Passages, Vocabulary, Inference |
| 4 | 🧠 Logical Reasoning | [logical_reasoning_logic.md](./logical_reasoning_logic.md) | ~22 marks | Arguments, Assumptions, Analogies |
| 5 | 📊 Quantitative Techniques | [quantitative_techniques.md](./quantitative_techniques.md) | ~8 marks | Data Interpretation, Percentages |
| 6 | 🏛️ **Detailed Study Vault** | [Chapter Index](#detailed-study-vaults) | High-Yield | Extracted Modules & Quizzes |

**Total: 120 marks | Duration: 2 Hours**

---

## 🏛️ Detailed Study Vaults
The following chapters have been extracted from bulk materials and formatted for high-readability study. Each includes a dedicated practice quiz.

### ⚖️ Legal Reasoning
- [Chapter 12: Previous Year Questions (Legal Reasoning)](./legal_vault/Legal_Chapter_12.md)
- [Chapter 14: Constitution & Political System](./legal_vault/Legal_Chapter_14.md)
- [Chapter 20: Commissions & Committees](./legal_vault/Legal_Chapter_20.md)

### 🌍 General Awareness
- [Chapter 42: Geography](./current_affairs_gk_hub/GK_Chapter_42.md)
- [Chapter 54: Arts & Literature](./current_affairs_gk_hub/GK_Chapter_54.md)

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
| **January** | Current Affairs Consolidation | Union Budget release; update current_affairs_gk_hub.md |
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
3. **Generate MCQs** using the `current_affairs_gk_hub.md` and `legal_reasoning_vault.md` as source material
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
| `/wiki/legal` | Legal Vault | `legal_reasoning_vault.md` |
| `/wiki/current-affairs` | CA & GK Hub | `current_affairs_gk_hub.md` |
| `/wiki/english` | English Module | `english_comprehension.md` |
| `/wiki/logic` | Logic Module | `logical_reasoning_logic.md` |
| `/wiki/quant` | Quant Module | `quantitative_techniques.md` |

---

*LexCLAT Master Wiki — Built with the Hybrid 3-Agent System (Gemini + Claude + MCP)*  
*Last Updated: May 2026*
