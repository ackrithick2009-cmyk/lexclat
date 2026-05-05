import React from 'react';
import { 
  Languages, 
  Globe, 
  Scale, 
  BrainCircuit, 
  Calculator 
} from 'lucide-react';

export interface Material {
  id: string;
  title: string;
  type: 'Note' | 'Passage' | 'Data Set' | 'Video' | 'Strategy';
  subject: string;
  description: string;
  date: string;
  readTime: string;
  month?: string; // e.g., 'October 2025'
  content?: string[];
}

export const subjects = [
  { id: 'english', name: 'English Language', icon: <Languages size={20} /> },
  { id: 'gk', name: 'Current Affairs & GK', icon: <Globe size={20} /> },
  { id: 'legal', name: 'Legal Reasoning', icon: <Scale size={20} /> },
  { id: 'logical', name: 'Logical Reasoning', icon: <BrainCircuit size={20} /> },
  { id: 'quants', name: 'Quantitative Techniques', icon: <Calculator size={20} /> },
];

export const months = [
  'October 2025',
  'November 2025',
  'December 2025',
  'January 2026',
  'February 2026',
  'March 2026',
  'April 2026'
];

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  subject: string;
  learningObjectives: string[];
  summary: string;
  videoId: string;
  traditionalMethod: string;
  clatShortcut: string;
  cheatSheetHighlights: string[];
  ncertHighlights: string[];
  exercises: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    traditionalSol?: string;
    shortcutSol?: string;
  }[];
  videoTutorial: {
    title: string;
    duration: string;
    steps: string[];
  };
  fullSyllabusContent?: string;
}

export const courseChapters: Chapter[] = [
  {
    id: 'ch-q-1',
    chapterNumber: 1,
    title: 'Arithmetic Operations & Number Systems',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master advanced divisibility rules (7, 11, 13, 17, 19) for large data set verification.',
      'Solve high-level Remainder Theorem problems (Fermat\'s and Euler\'s concepts).',
      'Understand Cyclicity and Unit Digit logic for powers of large numbers.',
      'Apply HCF/LCM logic in complex scheduling and arrangement caselets.',
      'Translate complicated textual number puzzles into linear equations.'
    ],
    summary: `
# Chapter 1: Arithmetic Operations & The Philosophy of Numbers

## 1. The Genesis of Quantification
Numerical literacy is the bedrock of the CLAT Quantitative Technique section. Beyond simple arithmetic, it requires a "Number Sense"—the ability to perceive relative magnitudes, detect patterns, and understand the internal logic of a data set. Historically, CLAT has tested not just your ability to solve a problem, but your speed and accuracy in doing so under the immense pressure of the law entrance environment.

### 1.1 The Categorical Taxonomy of Numbers
Understanding the nature of the numbers you are dealing with allows you to predict outcomes and verify "Data Consistency" in complex DI sets.

*   **Natural Numbers (N):** $\{1, 2, 3, ...\}$. These are the counting numbers. Note that 1 is the smallest natural number, and it is neither prime nor composite.
*   **Whole Numbers (W):** $\{0, 1, 2, ...\}$. Zero is the distinguishing factor here. In economic caselets, zero often represents a "Null State" or a "Baseline Year."
*   **Integers (Z):** $\{..., -2, -1, 0, 1, 2, ...\}$. Negative integers are crucial in profit/loss caselets where "negative profit" implies a net loss.
*   **Rational Numbers (Q):** Any number $p/q$ where $q \neq 0$. Note that recurring decimals like $0.333...$ are rational ($1/3$). Every rational number has a terminating or a periodic decimal expansion.
*   **Irrational Numbers:** $\pi, \sqrt{2}, \sqrt{3}$. These are non-terminating and non-recurring. In geometry mensuration, you will often find $\pi$, which we approximate as $22/7$ or $3.14$ for calculation speed.
*   **Real Numbers (R):** The set containing all the above.
*   **Prime Numbers:** The "Atoms" of the number system. Numbers with exactly two factors (1 and itself). 2 is the only even prime and the smallest prime. Primes up to 100 are essential for rapid factorization: $\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97\}$.
*   **Perfect Numbers:** A number equal to the sum of its proper divisors. e.g., 6 ($1+2+3=6$) and 28 ($1+2+4+7+14=28$).
*   **Co-Primes:** Two numbers whose HCF (Highest Common Factor) is 1. Example: 8 and 9. They don't have to be prime themselves to be co-prime to each other.

### 1.2 Binary and Alt-Base Logic
Occasional logic puzzles in the "Legal Reasoning" or "Logical Reasoning" sections might use Binary systems ($0, 1$) to represent truth tables or switch states.
- **Conversion Strategy:** To convert Decimal to Binary, use the "Continuous Division by 2" method and record the remainders from bottom to top.
- $25_{10} = 11001_2$

---

## 2. Advanced Simplification: The V-BODMAS Protocol
In the heat of the exam, the most common mistakes are "Calculation Errors" in multi-stage expressions. The V-BODMAS hierarchy is your primary defense.

*   **V (Vinculum/Bar):** $\overline{a-b}$. Solve the expression under the bar first.
*   **B (Brackets):** Solve in order: ( ) $\rightarrow$ { } $\rightarrow$ [ ].
*   **O (Of):** Operates as a multiplication but takes precedence over Division. $10 \text{ of } 5 \div 2 = 50 \div 2 = 25$. If it were $10 \times 5 \div 2$, it would be $10 \times 2.5 = 25$ (order matters if division comes first).
*   **D/M:** Division and Multiplication.
*   **A/S:** Addition and Subtraction.

### 2.1 The Art of Mental "Splitting"
To simplify $12.5 \times 16$, don't use long-form multiplication.
- $12.5 = 100 / 8$.
- So, $(100/8) \times 16 = 100 \times 2 = 200$.
- Fractions are almost always faster than decimals.

---

## 3. Divisibility: The Option-Elimination Sword
CLAT is a multiple-choice exam. Often, the right answer is simply the one that is divisible by a specific factor found in the question (like 7 or 11).

*   **Divisibility by 7:** Double the last digit and subtract from the rest. $343 \rightarrow 3 \times 2 = 6 \rightarrow 34 - 6 = 28$. Since 28 is divisible by 7, 343 is too.
*   **Divisibility by 11:** (Sum of digits at odd places) - (Sum of digits at even places) $= 0$ or a multiple of 11.
*   **Divisibility by 13:** Multiply the last digit by 4 and add it to the remaining part. $169 \rightarrow 9 \times 4 = 36 \rightarrow 16 + 36 = 52$. 52 is divisible by 13 ($13 \times 4$).

---

## 4. Number Theory: Remainders & Cyclicity
### 4.1 The Unit Digit Logic
Finding the unit digit of $x^n$ is a classic "Time-Saver" problem.
- **Cycle of 2:** 2, 4, 8, 16(6)... (4 steps)
- **Cycle of 3:** 3, 9, 27(7), 81(1)... (4 steps)
- **Cycle of 7:** 7, 49(9), 343(3), 2401(1)... (4 steps)
- **Cycle of 8:** 8, 64(4), 512(2), 4096(6)... (4 steps)
- **Fixed:** 0, 1, 5, 6 (any power results in the same unit digit).
- **Strategy:** Divide the power by 4 and use the remainder to find the corresponding step in the cycle.

### 4.2 Fermat’s Little Theorem (FLT)
Useful for high-level remainder problems. If $p$ is a prime number, $a^{p-1} \div p$ always leaves a remainder of 1.
- *Example:* Find remainder of $2^{100} \div 101$. Since 101 is prime, remainder is 1.

---

## 5. HCF and LCM: Scheduling & Arrangement
*   **HCF (Highest Common Factor):** Used for "Maximum possible length," "Greatest size of tiles," or "Highest number of equal groups."
*   **LCM (Least Common Multiple):** Used for "When will they meet again," "Bells ringing together," or "Smallest number divisible by..."
*   **Property:** $\text{Product of two numbers} = \text{HCF} \times \text{LCM}$.

---

## 6. Case Study: The Multi-Base Population Caselet
**Scene:** A city uses a Base-10 system for counting people, but a Base-12 system for counting crates of grain. 
- If a caselet mentions "Three dozens and five units of people," you must instantly translate this into standard Base-10.
- 3 dozen = $3 \times 12 = 36$. Total = $36 + 5 = 41$.
- CLAT often uses such archaic or non-standard measurements (dozens, scores, gross) to check your numerical adaptability.

---

## 7. The Fraction-Decimal Highway
Speed comes from memorizing the "Friendly Neighbors":
- $1/8 = 12.5\% = 0.125$
- $3/8 = 37.5\% = 0.375$
- $5/8 = 62.5\% = 0.625$
- $7/8 = 87.5\% = 0.875$
- $1/6 = 16.66\%$
- $1/7 = 14.28\%$

---

## 8. Digital Sum: The Verification Hack
The Digital Sum (DS) of a number is the sum of its digits until a single digit is reached.
- $12345 \rightarrow 1+2+3+4+5 = 15 \rightarrow 1+5 = 6$.
- **Rule:** In any multiplication $A \times B = C$, the $DS(A) \times DS(B)$ must match $DS(C)$.
- Use this to verify large calculations in DI sets without doing the actual long multiplication.

---

## 9. Recurring Decimals to Fractions
- $0.x \dots = x/9$
- $0.xy \dots = xy/99$
- $0.x yz (z \text{ recurring}) = (xyz - xy) / 900$.
- Understanding this prevents errors in "Accuracy" based questions in commercial math.

---

## 10. Summary Checklist for Quantitative Excellence
- [ ] Memorize Squares up to 30 and Cubes up to 15.
- [ ] Internalize the Divisibility Rules for 7, 11, and 13.
- [ ] Practice 10 minutes of mental calculation daily (addition of strings of numbers).
- [ ] Master the Unit Digit and Remainder logic and never do long division again.
`,
    videoId: 'mH-H4V_QyC8',
    traditionalMethod: 'Step-by-step BODMAS and prime factorization. Manual long division for remainders and unit digit calculation.',
    clatShortcut: 'CLAT Shortcut: Use Unit Digit and Ten\'s Digit logic to eliminate options. Mastery of recurring decimals (0.x = x/9) and the "Base-10" substitution for algebraic puzzles. Use Digital Sum (casting out 9s) for verifying complex products without full calculation.',
    cheatSheetHighlights: [
      "Sum of first 'n' natural numbers = n(n+1)/2",
      "Sum of squares = n(n+1)(2n+1)/6",
      "Sum of cubes = [n(n+1)/2]²",
      "Number of factors = (p+1)(q+1)...",
      "Cyclicity order: 2(4), 3(4), 7(4), 8(4); 4(2), 9(2); 0,1,5,6(1)"
    ],
    ncertHighlights: [
      '**Property of N**: To find the smallest number to add/subtract for divisibility.',
      '**Co-prime Logic**: If a number is divisible by a and b (co-primes), it is divisible by (a*b).',
      '**Decimal Density**: Understanding the number of rational terms between two decimals.'
    ],
    exercises: [
      {
        question: "Simplify the following: (0.003 × 0.02) / (0.0006 × 0.1)",
        options: ["0.1", "1", "10", "0.01"],
        correctAnswer: "1",
        explanation: "To solve this without errors, count the total decimal places. In the numerator: (3 × 10⁻³) × (2 × 10⁻²) = 6 × 10⁻⁵ (0.00006). In the denominator: (6 × 10⁻⁴) × (1 × 10⁻¹) = 6 × 10⁻⁵ (0.00006). Since the numerator and denominator are identical, the result is exactly 1."
      },
      {
        question: "What is the unit digit of 7^105?",
        options: ["1", "3", "7", "9"],
        correctAnswer: "7",
        explanation: "The cyclicity of 7 is 4. Divide the power (105) by 4. Remainder = 1. So, the unit digit is 7^1 = 7. Cyclicity steps: 7¹=7, 7²=49 (9), 7³=343 (3), 7⁴=2401 (1)."
      },
      {
        question: "Find the smallest number that must be added to 1025 to make it perfectly divisible by 23?",
        options: ["10", "12", "8", "13"],
        correctAnswer: "10",
        explanation: "1025 ÷ 23 = 44 with remainder 13. To add: (Divisor - Remainder) = 23 - 13 = 10. Adding 10 makes it 1035 (23 × 45)."
      },
      {
        question: "How many zeroes are there at the end of 100! (100 factorial)?",
        options: ["20", "24", "25", "30"],
        correctAnswer: "24",
        explanation: "Divide 100 by 5 successively: 100/5 = 20; 20/5 = 4. Stop when quotient < 5. Total zeroes = 20 + 4 = 24. This is because a zero is formed by a 2x5 pair, and 5s are fewer than 2s."
      },
      {
        question: "A number when divided by 5 and 7 successively leaves remainders 2 and 3 respectively. What is the number?",
        options: ["17", "21", "23", "27"],
        correctAnswer: "17",
        explanation: "Using the reverse method: The number = 5(7k + 3) + 2. For smallest number, let k=0. Number = 5(3) + 2 = 17. Check: 17/5 = 3 rem 2. 3/7 = 0 rem 3. Correct."
      }
    ],
    videoTutorial: {
      title: "Arithmetic & Number Systems",
      duration: "15:20",
      steps: [
        "Decimal product & division hacks.",
        "Sum of 'n' numbers formula application.",
        "Divisibility & Remainder logic for large numbers."
    ]
    },
    fullSyllabusContent: `
# Chapter 1: Deep-Dive Quantitative Basics
This chapter is your fundamental toolkit. We explore the structural properties of numbers that allow you to hack through complex logic.

### 1. Advanced Prime Theory
Did you know that any prime number greater than 3 can be expressed as $6n \pm 1$? This is vital for checking if a large number in a data set is likely prime.

### 2. The Logic of Remainder (Euler's Totient)
Beyond Fermat's, Euler's Totient Theorem allows you to find remainders for non-prime divisors. 
Formula: $a^{\phi(n)} \equiv 1 \pmod{n}$, where $\phi(n)$ is the count of numbers co-prime to $n$.

### 3. Digit Sum Mastery in DI
When faced with a sum like $45.67 + 89.12 + 15.34$, don't calculate fully. Check the digital sums of the options. This is a "Secret Weapon" for time management in the Quants section.

### 4. Unit Digit of Complex Factorials
The unit digit of $1!+2!+3!+4!+... +100!$.
- $5!$ and beyond all end in 0.
- So we only sum $1!+2!+3!+4! = 1+2+6+24 = 33$.
- Unit digit is 3.
`
  },
  {
    id: 'ch-q-2',
    chapterNumber: 2,
    title: 'Percentages, Profit, Loss & Discount',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master base-shifting in percentages (A is x% of B vs B is y% of A).',
      'Solve multiple successive percentage changes using effective change formulas.',
      'Understand the relationship between Marked Price, Discount, and actual Profit.',
      'Solve complex Fraudulent Trader / Dishonest Dealer problems.',
      'Analyze data sets involving Revenue, Tax, and Net profit with varying rates.'
    ],
    summary: `
# Chapter 2: Commercial Mathematics - Percentages, Profit, Loss & Discount

## 1. The Power of Percentages
In the CLAT context, percentages are the universal language of data. Whether it's a passage about GDP growth, a table showing voter turnout, or a chart of corporate profits, you must be able to convert "Relative Shifts" into "Absolute Values" instantly.

### 1.1 The Fractional Conversion Grid (Mental Speed)
Speed is not about doing math faster; it's about doing less math. If you know that $16.66\% = 1/6$, you can calculate $16.66\%$ of $1200$ as $1200/6 = 200$ in one second.

*   **Tier 1 (Universal):** $1/2 = 50\%; 1/3 = 33.33\%; 1/4 = 25\%; 1/5 = 20\%$
*   **Tier 2 (Competitive):** $1/6 = 16.66\%; 1/7 = 14.28\%; 1/8 = 12.5\%; 1/9 = 11.11\%$
*   **Tier 3 (Mastery):** $1/11 = 9.09\%; 1/12 = 8.33\%; 1/15 = 6.66\%; 1/16 = 6.25\%$

---

## 2. Successive Percentage Shifting
Successive changes occur when a value is increased/decreased, and the *new* value is then increased/decreased again. 
- *Common Scenarios:* Multi-year inflation, festival discounts (e.g., "50% + 20% off"), or population growth.

### 2.1 The Net Change Formula
$$\text{Net Percentage Change} = \left( a + b + \frac{ab}{100} \right) \%$$
- **Scenario:** A price rises by 20% then falls by 20%.
- $a = +20, b = -20$.
- Result $= 20 - 20 + \frac{20 \times (-20)}{100} = -4\%$.
- A net decrease of 4%! Never assume a same-amount increase and decrease cancel each other out.

---

## 3. Profit, Loss and the Markup Cycle
In retail and economic caselets, understanding the link between Cost ($CP$), Selling ($SP$), and Marked ($MP$) prices is critical.

*   **Markup Percentage:** This is the percentage by which the price is increased over the Cost Price to reach the Marked Price.
    - $\text{Markup \%} = \frac{MP - CP}{CP} \times 100$
*   **Discount Percentage:** Always calculated on the Marked Price.
    - $\text{Discount \%} = \frac{MP - SP}{MP} \times 100$

### 3.1 The Golden Ratio of Retail
There is a direct mathematical link between profit and discount:
$$\frac{MP}{CP} = \frac{100 + \text{Profit \%}}{100 - \text{Discount \%}}$$
- *Application:* If a merchant wants a 20% profit even after giving a 10% discount, find the markup.
- $MP/CP = 120/90 = 4/3$. 
- Markup $= 1/3 = 33.33\%$.

---

## 4. Taxes and Surcharges: The Legal Dimension
Since CLAT is for law, passages often include "Total Bill" calculations involving GST, VAT, or Service Tax.
- **Rule:** Taxes are calculated on the *Final Selling Price* (after all discounts have been applied).
- **Formula:** $\text{Final Amount} = SP \times (1 + \text{Tax Rate}/100)$.

---

## 5. The Fraudulent Trader (Advanced)
Some caselets involve a dealer who "uses a weight of 800g for 1kg."
- **Shortcut:** Treat weight as a ratio. He gets money for 1000 units but gives only 800 units.
- $\text{Ratio CP:SP} = 800:1000 = 4:5$.
- $\text{Profit} = 1/4 = 25\%$.
- Formula: $\text{Profit \%} = \frac{\text{Error}}{\text{True Weight} - \text{Error}} \times 100$.

---

## 6. Price-Consumption Invariance
If the price of a commodity increases by $r\%$, the percentage reduction in consumption to keep the total expenditure same is:
$$\text{Reduction \%} = \left( \frac{r}{100 + r} \times 100 \right) \%$$
- *Example:* If petroleum price rises by 25%, a family must reduce usage by $[25/125] \times 100 = 20\%$ to keep their budget fixed.

---

## 7. Comparative Revenue Analysis (DI Integration)
In a corporate data set, "Gross Margin" is often $(\text{Revenue} - \text{COGS}) / \text{Revenue}$. 
- If Revenue grows at 10% YoY, and COGS grows at 12% YoY, the margin will shrink.
- You must be able to perform these percentage shifts across multiple years in a table format.

---

## 8. Case Study: The Multi-Stage Festival Discount
**Passage:** A store offers a "Flat 40% Off" festival discount. Additionally, if you use a "JurisBank" card, you get "10% Cashback" on the discounted price. If you are a premium member, you get an extra "₹500 off" on bills above ₹5000.
1. Original Price $= ₹10,000$.
2. Festival Discount $(40\%) \rightarrow 10,000 - 4,000 = 6,000$.
3. Cashback $(10\% \text{ of } 6,000) \rightarrow 600$. Effective price $= 5,400$.
4. Premium Discount (as $5,400 > 5,000$) $\rightarrow 5,400 - 500 = 4,900$.
- **Net Percentage Discount** $= (10,000 - 4,900) / 10,000 = 51\%$.

---

## 9. Profit on SP vs profit on CP
A common trap in CLAT passages is: "The merchant calculated his profit as 25% on the Selling Price."
- If $Profit = 0.25 SP$, then $SP - CP = 0.25 SP \rightarrow 0.75 SP = CP$.
- $Profit / CP = (0.25 SP) / (0.75 SP) = 1/3 = 33.33\%$.
- Modern CLAT loves switching the "Base" of percentages to confuse the candidate.

---

## 10. Summary Checklist for Commercial Excellence
- [ ] Memorize the Fractional Conversion Grid ($1/2$ to $1/16$).
- [ ] Master the successive change formula $(a+b+ab/100)$.
- [ ] Understand that "Effective Profit" is a chain of Markup and Discount.
- [ ] Practice "Base-Shifting" (moving from % of CP to % of SP).
`,
    videoId: '77Z_AYy6_1A',
    traditionalMethod: 'Calculating each step of discount or tax on the previous SP. Multi-variable equations for dishonest dealer problems.',
    clatShortcut: 'CLAT Shortcut: Use the 10% anchor rule and the x+y+(xy/100) formula for all successive shifts. Use the "Ratio of Cost" for fraudulent weights (e.g. 800g instead of 1000g implies a CP:SP ratio of 8:10).',
    cheatSheetHighlights: [
      "Effective Rate = x + y + (xy/100)",
      "Profit % = (P/CP) * 100",
      "Markup % = (MP-CP)/CP * 100",
      "Discount is ALWAYS on Marked Price",
      "MP/CP = (100+P%) / (100-D%)"
    ],
    ncertHighlights: [
      '**The 10% Pivot**: Movement of decimal point for rapid estimating.',
      '**Multiplier Method**: A 20% increase is x1.2; a 15% decrease is x0.85.',
      '**VAT/GST Logic**: Taxes are calculated on the FINAL selling price after all discounts.'
    ],
    exercises: [
      {
        question: "A merchant marks his goods 25% above cost price and allows a 10% discount. What is his profit percentage?",
        options: ["12.5%", "15%", "11.5%", "10%"],
        correctAnswer: "12.5%",
        explanation: "Assume CP = 100. MP = 125. Discount = 10% of 125 = 12.5. SP = 125 - 12.5 = 112.5. Profit = 112.5 - 100 = 12.5. Correct."
      },
      {
        question: "Find a single discount equivalent to three successive discounts of 20%, 10% and 5%.",
        options: ["35%", "31.6%", "32%", "30%"],
        correctAnswer: "31.6%",
        explanation: "Net for 20% and 10% = 20+10 - (200/100) = 28%. Now combine 28% and 5% = 28+5 - (28*5/100) = 33 - 1.4 = 31.6%."
      },
      {
        question: "A dishonest dealer claims to sell at cost price but uses a weight of 900g for 1kg. Find his profit %.",
        options: ["10%", "11.11%", "9.09%", "12%"],
        correctAnswer: "11.11%",
        explanation: "The dealer gets the price of 1000g while only giving 900g. Profit = (Error / True Value in Weight) * 100 = (100 / 900) * 100 = 11.11%."
      },
      {
        question: "If A's income is 25% more than B, B's income is what % less than A?",
        options: ["25%", "20%", "15%", "10%"],
        correctAnswer: "20%",
        explanation: "Ratio A:B = 125:100 = 5:4. B is 1 less than A (5). % less = (1/5) * 100 = 20%."
      },
      {
        question: "Price of sugar rises by 50%. To keep expenditure constant, by how much should consumption be reduced?",
        options: ["50%", "33.33%", "25%", "20%"],
        correctAnswer: "33.33%",
        explanation: "Formula: [r / (100+r)] * 100 = [50 / 150] * 100 = 1/3 * 100 = 33.33%."
      }
    ],
    videoTutorial: {
      title: "Commercial Math Masterclass",
      duration: "18:45",
      steps: [
        "Percentage to Fraction conversion table.",
        "The Markup -> Discount -> Profit cycle.",
        "Successive discount shortcuts."
    ]
    },
    fullSyllabusContent: `
# Chapter 2: Deep-Dive Commercial Math
Commercial math is where most students lose points because they spend time on lengthy calculations. Here, we master the "Shortcuts of the Senses."

### 1. The Multiplier Method
In complex caselets, never calculate percentage separately. 
- A 15% increase is simply multiplying by 1.15.
- A 20% decrease is multiplying by 0.80.
- A chain of changes: Initial Value $\times$ 1.10 $\times$ 0.90 $\times$ 1.20 = Final Value. This is purely linear and avoids multi-step error accumulation.

### 2. The Net Effective Discount of Infinitely many values
If a store is giving "10% + 5% + 5%" - you can use the $x+y+xy/100$ rule iteratively.
1. 10 and 5 $= 15 - 0.5 = 14.5\%$
2. 14.5 and 5 $= 19.5 - (14.5 \times 5 / 100) = 19.5 - 0.725 = 18.775\%$

### 3. The Fraudulent Dual Trap
A trader cheats 10% while buying and 10% while selling. What is his profit?
- CP for him is 90% of money, SP is 110% of money.
- No, correct approach: He takes 1100g for 1000g cost, and sells 900g for 1000g money.
- Effective Ratio $= 900:1100 = 9:11$. Profit $= 2/9 = 22.22\%$
`
  },
  {
    id: 'ch-q-3',
    chapterNumber: 3,
    title: 'Averages, Ratios & Ages',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master the Deviation Method for calculating averages of large, close-range data sets.',
      'Solve complex weighted averages involving groups with dynamic changes (inclusions/exclusions).',
      'Handle multiple ratio bridging (A:B, B:C, C:D) and proportional distribution.',
      'Solve multi-person age-shift puzzles involving non-linear ratio changes.',
      'Apply Mixture and Alligation as a substitute for standard average calculations.'
    ],
    summary: `
# Chapter 3: Averages, Ratios & Ages - The Logic of Comparison

## 1. The Dynamic Nature of Averages
An average is more than just a sum divided by a count; it is a "Balancing Point." In CLAT, you will often deal with "Weighted Averages" where different groups have different sizes and different mean values.

### 1.1 The Deviation Method (Mental Shortcut)
Instead of calculating huge sums, pick an assumed mean and calculate the net deviation.
- **Problem:** Find average of $162, 168, 172, 174, 180$.
- **Step 1:** Assume Mean $= 170$.
- **Step 2:** Deviations are $-8, -2, +2, +4, +10$.
- **Step 3:** Net Deviation $= -8 - 2 + 2 + 4 + 10 = +6$.
- **Step 4:** Split Deviation among 5 items $= 6/5 = 1.2$.
- **Final Average** $= 170 + 1.2 = 171.2$.
- This avoids adding large numbers and reduces the risk of error.

---

## 2. Advanced Ratio Bridging
In complex DI sets, you might get Fragmented Ratios.
- e.g., "Ratio of Men to Women is 2:3, and ratio of Women to Children is 4:5."

### 2.1 The N-Bridge Technique
To find $A:B:C$:
1. $A:B = 2:3$
2. $B:C = 4:5$
3. Find the common term ($B$). The LCM of 3 and 4 is 12.
4. Scale up: $(2 \times 4) : (3 \times 4) : (5 \times 3) = 8 : 12 : 15$.
5. Now you can solve any problem involving the absolute total using these parts.

---

## 3. The Mathematics of Time: Ages
Age problems are the perfect intersection of Ratio and Linear Equations.
*   **Fundamental Fact:** The difference in age between two people is **ALWAYS constant**.
*   **The Shift Rule:** If ratio of ages 10 years ago was $a:b$, and today it is $c:d$, the gap between the units should be proportional to the years passed.

### 3.1 The Ratio Multiplier Method
**Problem:** A and B's ages are in ratio 3:4. 10 years ago, the ratio was 2:3.
1. Present: $3 : 4$ (Difference $= 1$ unit).
2. 10 yrs ago: $2 : 3$ (Difference $= 1$ unit).
3. The shift for both is $1$ unit ($3 \rightarrow 2$ and $4 \rightarrow 3$).
4. Therefore, $1$ unit $= 10$ years.
5. Present Ages: $30$ and $40$.

---

## 4. Weighted Averages (Mixing Groups)
When group 1 (size $n_1$, avg $a_1$) is mixed with group 2 (size $n_2$, avg $a_2$):
$$\text{Mixed Average} = \frac{n_1 a_1 + n_2 a_2}{n_1 + n_2}$$
- **Pro-Tip:** If the ratio of $n_1:n_2$ is known, you can use those small numbers instead of actual totals.

---

## 5. Proportional Distribution
Dividing a total amount $S$ among A, B, and C in ratio $x:y:z$.
- **A's Share** $= S \times [x / (x+y+z)]$
- **Application:** Dividing a legal settlement among 3 plaintiffs based on their shares in a partnership.

---

## 6. Average Speed: The Harmonic Mean
If a car travels equal distances at different speeds $S_1$ and $S_2$:
$$\text{Average Speed} = \frac{2 S_1 S_2}{S_1 + S_2}$$
- **Why?** Average Speed is Total Distance / Total Time. If distance is $D$, then $(2D) / (D/S_1 + D/S_2) = (2 S_1 S_2) / (S_1 + S_2)$.
- **Trap:** Never take the simple arithmetic mean $(S_1 + S_2)/2$ for speed unless the **times** are equal instead of distances.

---

## 7. Statistical Deviation in DI
In a table showing the scores of students across 5 subjects, the "Consistency" of a student is measured by how close their scores are to the average. 
- In CLAT, a question might ask: "Which student is the most consistent?"
- Look for the one with the smallest gap between their highest and lowest scores (lowest range).

---

## 8. Case Study: The Multi-Demographic Age Shift
**Passage:** A family consists of 5 members. The average age is 32 years. One member leaves (age 60) and a new one is born.
1. Total Age $= 5 \times 32 = 160$.
2. Member leaves $= 160 - 60 = 100$.
3. New member born $(0 \text{ years})$. Total Age stays $100$.
4. New Average $= 100 / 5 = 20$.
- **Net change in average** $= 12$ years decrease.
- CLAT uses these "Sudden Shifts" in data to see if you can adjust your totals dynamically.

---

## 9. Mixture Alligation as an Average Shortcut
If you have Boys (avg mark 70) and Girls (avg mark 80) and total avg is 74.
- Use Alligation Cross:
- $(80 - 74) : (74 - 70) = 6 : 4 = 3 : 2$.
- The ratio of Boys to Girls is $3:2$.
- This avoids the complex equation $70B + 80G = 74(B+G)$.

---

## 10. Summary Checklist for Comparison Logic
- [ ] Practice the Deviation Method for 5-digit number strings.
- [ ] Master the N-Bridge for merging ratios (A:B, B:C, C:D).
- [ ] Understand that for Ages, the Difference is the "Anchor."
- [ ] Always check if "Average Speed" refers to constant distance or constant time.
`,
    videoId: 'P6_G8S-5b9A',
    traditionalMethod: 'Sum/Count for averages. Using "x" multipliers for all ratio problems. Linear equations for age shifts.',
    clatShortcut: 'CLAT Shortcut: Use the Deviation Method (assume a mean and adjust) for averages. For ratios, use the "n-bridge" for merging A:B:C:D. For ages, remember the "Gap Invariance" rule—the difference in age never changes.',
    cheatSheetHighlights: [
      "New Avg = Old Avg + (Change * New Count)",
      "A:B + B:C => A:B:C (Bridge B)",
      "Mode = 3 Median - 2 Mean",
      "Age Gap = Constant",
      "Sum of n numbers = n * Average"
    ],
    ncertHighlights: [
      '**The Deviation Hack**: Pick a middle number and calculate deviations to find the true average instantly.',
      '**Normalization**: Finding the common denominator for ratios to compare disparate data points.',
      '**Timeline Mapping**: Strategy for visualizing "n years ago" vs "m years hence".'
    ],
    exercises: [
      {
        question: "The average age of 24 students is 12 years. If the teacher's age is included, the average increases by 1 year. What is the teacher's age?",
        options: ["36", "37", "38", "39"],
        correctAnswer: "37",
        explanation: "The teacher brings 1 year for each of the 24 students + her own age matching the new average (13). Teacher = 24(1) + 13 = 37."
      },
      {
        question: "If A:B = 2:3, B:C = 4:5, and C:D = 6:7, find A:D.",
        options: ["16:35", "12:35", "8:15", "16:21"],
        correctAnswer: "16:35",
        explanation: "(A/B) * (B/C) * (C/D) = (2/3) * (4/5) * (6/7) = (2*4*2) / (1*5*7) = 16 / 35. So A:D = 16:35."
      },
      {
        question: "The ratio of ages of X and Y is 3:4. 10 years ago, it was 2:3. What is the sum of their present ages?",
        options: ["60", "70", "80", "90"],
        correctAnswer: "70",
        explanation: "Gap is 1 unit (3-2 and 4-3). 1 unit = 10 years. Present ages = 3*10 and 4*10 = 30 and 40. Sum = 70."
      },
      {
        question: "Average of 5 consecutive odd numbers is 25. What is the largest number?",
        options: ["25", "27", "29", "31"],
        correctAnswer: "29",
        explanation: "The average of consecutive numbers is the middle term. Middle (3rd) = 25. 4th = 27. 5th (Largest) = 29."
      },
      {
        question: "Dividing ₹10,500 among A, B, and C such that A gets 2/5th of (B+C). How much does A get?",
        options: ["₹3000", "₹4000", "₹3500", "₹4500"],
        correctAnswer: "₹3000",
        explanation: "A : (B+C) = 2 : 5. Total parts = 7. A's share = (2/7) * 10500 = 2 * 1500 = ₹3000."
      }
    ],
    videoTutorial: {
      title: "Ratios & Averages Demystified",
      duration: "14:10",
      steps: [
        "The Deviation Method for weighted groups.",
        "Bridging ratios (A:B and B:C).",
        "Age-shift visualization hacks."
    ]
    },
    fullSyllabusContent: `
# Chapter 3: Deep-Dive Averages & Ratios
Averages and Ratios are the comparison tools of math. This chapter teaches you how to find the "center" of data and distribute values proportionally.

### 1. The Proportionality Theory in DI
In a pie chart, the degrees ($D$) are directly proportional to the percentages ($P$). 
$D/P = 3.6$. Understanding this allows you to solve "Comparative Size" questions without calculating the absolute values.

### 2. The Multi-Group Average (The Balancing Act)
If 3 groups have averages $A, B, C$ and sizes $3, 4, 5$. The total average is $(3A+4B+5C)/12$.
In CLAT, you might be given the Total Avg and asked to find $C$. Use the "Deviation from Mean" logic: $3(A-Avg) + 4(B-Avg) + 5(C-Avg) = 0$. This is much simpler algebraically.

### 3. Ratio Analysis of Financial Documents
In legal cases involving partnership dissolution, ratios determine the distribution of assets. If A invested ₹10k for 6 months and B invested ₹5k for 12 months, their shares are equal ($60k$ unit-months each). Ratios are time-weighted.
`
  },
  {
    id: 'ch-q-4',
    chapterNumber: 4,
    title: 'Time, Motion & Work Dynamics',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master Relative Speed logic for overtaking and head-on collisions.',
      'Solve complex Train problems involving multiple long objects and platforms.',
      'Understand the dynamics of Boats and Streams (Upstream vs Downstream) and its 2D extension.',
      'Solve multi-worker efficiency problems using the LCM (Units) method.',
      'Handle fractional work, alternating work days, and efficiency-based weightage in wages.'
    ],
    summary: `
# Chapter 4: Time, Motion & Work - The Dynamics of Physical & Labor Output

## 1. The Fundamental Mechanics of Motion
Motion is a relationship between space and time. In CLAT, motion problems aren't just about cars or trains; they are often embedded in caselets about "Logistics Efficiency" or "Supply Chain Speeds."

### 1.1 The Core Equality
$$\text{Distance} = \text{Speed} \times \text{Time}$$
- **The Inversion Property:** If distance is constant, Speed and Time are inversely proportional ($S_1/S_2 = T_2/T_1$). 
- *Application:* If a lawyer increases his driving speed to court by 25%, his travel time decreases by 20% ($1/4$ increase $\rightarrow 1/5$ decrease).

### 1.2 Unit Mastery
CLAT examiners love switching between $km/hr$ and $m/s$ in the mid-paragraph.
- **To $m/s$:** Multiply $km/hr$ by $5/18$.
- **To $km/hr$:** Multiply $m/s$ by $18/5$.
- *Trick:* $90 km/hr = 25 m/s$. (Memorize this benchmark).

---

## 2. Relative Speed: The Chase & The Collision
Relative speed is the speed of one object observed from another.
*   **Opposite Directions (Head-on):** $\text{Relative Speed} = S_1 + S_2$.
*   **Same Direction (The Chase):** $\text{Relative Speed} = |S1 - S2|$.

### 2.1 The Train Paradox (Long Objects)
A train has length. This length must be added to the distance whenever the train passes another object.
- **Passing a Pole:** Distance $= \text{Length of Train } (L_T)$.
- **Passing a Platform:** Distance $= L_T + \text{Length of Platform } (L_P)$.
- **Two Trains Crossing:** Distance $= L_{T1} + L_{T2}$.

---

## 3. Fluctuating Speeds: Boats & Streams
Boats operate in a medium (water) that has its own speed.
- **Downstream Speed** $(D) = \text{Boat Speed } (u) + \text{Stream Speed } (v)$.
- **Upstream Speed** $(U) = u - v$.
- **Boat in Still Water** $(u) = (D + U) / 2$.
- **Stream Speed** $(v) = (D - U) / 2$.
- *Insight:* The time taken to go upstream is always more than downstream for the same distance.

---

## 4. Labor Dynamics: Time & Work
Work is the output of labor over time. The key is to find the "Efficiency" (Work done per unit time).

### 4.1 The LCM (Units) Method
Avoid using fractions ($1/x + 1/y$). Use total work units.
- **Problem:** A takes 10 days, B takes 12 days.
- **Step 1:** LCM of 10 and 12 is $60$. Let Total Work $= 60$ units.
- **Step 2:** A's efficiency $= 60/10 = 6$ units/day.
- **Step 3:** B's efficiency $= 60/12 = 5$ units/day.
- **Step 4:** Together $= 11$ units/day.
- **Step 5:** Time $= 60 / 11 = 5.45$ days.

### 4.2 The Chain Rule (Man-Hours Balance)
$$\frac{M_1 D_1 H_1}{W_1} = \frac{M_2 D_2 H_2}{W_2}$$
- $M = \text{Men}, D = \text{Days}, H = \text{Hours}, W = \text{Work}$.
- *Application:* If 10 workers build 5 walls in 6 days, how many workers build 10 walls in 4 days?

---

## 5. Pipes and Cisterns (The Flow Analogy)
Exactly the same as Time & Work, but with a twist.
- **Inlet Pipe:** Adds work ($+$ efficiency).
- **Outcome Pipe (Leak):** Subtracts work ($-$ efficiency).
- If a tank fills in 10 hrs but has a leak that drains it in 20 hrs:
- Net Efficiency $= 1/10 - 1/20 = 1/20$. The tank fills in 20 hours.

---

## 6. Escalator Math: Vertical Motion
- **Moving with Escalator:** $\text{Net Speed} = V_{man} + V_{esc}$.
- **Moving against Escalator:** $\text{Net Speed} = V_{man} - V_{esc}$.
- *Note:* The "Total Steps" of the escalator is the distance.

---

## 7. Circular Motion and Races
- **Meeting at Start Point:** LCM of times taken for one full lap ($T_1, T_2, ...$).
- **Meeting Anywhere:** $\text{Relative Distance} / \text{Relative Speed}$. (Relative distance for first meeting is the length of the track).

---

## 8. Case Study: The Construction Deadlines
**Passage:** A contractor undertakes to finish a road in 40 days and employs 100 men. After 35 days, he employs 100 more men and finishes on time.
1. Total work in Man-Days $= 100 \times 35 + 200 \times 5 = 3500 + 1000 = 4500$ units.
2. If he hadn't employed extra men, time taken $= 4500 / 100 = 45$ days.
3. **Delay avoided** $= 5$ days.
- CLAT uses these "Pivots" in labor force to test your incremental calculation ability.

---

## 9. Efficiency Ratios
If A is 3 times as fast as B:
- **Efficiency Ratio** (A:B) $= 3 : 1$.
- **Time Ratio** (A:B) $= 1 : 3$.
- B will take 3 times as long to finish. This is the ultimate "Time-Saver" in work problems.

---

## 10. Summary Checklist for Dynamics
- [ ] Practice $km/hr$ to $m/s$ conversions for multiples of 18 ($18, 36, 54, 72, 90, 108$).
- [ ] Master the LCM method for Work and Pipes.
- [ ] Understand that for Relative Speed, same direction means subtract.
- [ ] Always add lengths for train-crossing problems.
`,
    videoId: 'z_0I_088v_U',
    traditionalMethod: 'Fractional addition (1/x + 1/y) for work and algebraic manipulation for Relative Speed. Prone to time losses.',
    clatShortcut: 'CLAT Shortcut: Use the "Total Units" method for Work (LCM of days). For Speed, use the Ratio Method (S ∝ 1/T for constant distance) to solve complex train/meeting problems in seconds.',
    cheatSheetHighlights: [
      "Total Work = Time * Efficiency",
      "Relative Speed (Opposite) = S1 + S2",
      "Relative Speed (Same) = |S1 - S2|",
      "Avg Speed (Equal Dist) = 2xy/(x+y)",
      "Pipes: Filling (+) and Leakage (-)"
    ],
    ncertHighlights: [
      '**The 5/18 Conversion**: 1 km/h = 5/18 m/s. 1 m/s = 3.6 km/h.',
      '**Man-Hours Balance**: The chain rule for labor: M1D1H1W2 = M2D2H2W1.',
      '**Relative Crossing**: Lengths always add; speeds add if opposite, subtract if same.'
    ],
    exercises: [
      {
        question: "A train 150m long crosses a bridge 250m long in 20 seconds. What is the speed of the train in km/hr?",
        options: ["72", "60", "54", "90"],
        correctAnswer: "72",
        explanation: "Total Dist = 150 + 250 = 400m. Speed = 400m / 20s = 20 m/s. Conversion: 20 * (18/5) = 72 km/hr."
      },
      {
        question: "A can do a piece of work in 12 days and B in 24 days. How long will it take them together?",
        options: ["8 days", "6 days", "10 days", "9 days"],
        correctAnswer: "8 days",
        explanation: "Total units (LCM 12,24) = 24. A's eff = 2, B's eff = 1. Together = 3. Time = 24/3 = 8 days."
      },
      {
        question: "A boat goes 15 km/hr downstream and 9 km/hr upstream. Find the speed of the stream.",
        options: ["3 km/hr", "6 km/hr", "2 km/hr", "1.5 km/hr"],
        correctAnswer: "3 km/hr",
        explanation: "Speed of stream (v) = (Downstream - Upstream) / 2 = (15 - 9) / 2 = 6/2 = 3 km/hr. (Speed of boat in still water = 12)."
      },
      {
        question: "12 men can complete a work in 20 days. If 3 men leave after 5 days, how many more days will it take for the remaining to finish?",
        options: ["15", "20", "18", "25"],
        correctAnswer: "20",
        explanation: "Total work = 12 * 20 = 240 units. Work done in 5 days = 12 * 5 = 60. Remaining = 180. Remaining men = 9. Time = 180 / 9 = 20 days."
      },
      {
        question: "Two trains of length 120m and 180m are running at 40 km/hr and 50 km/hr respectively in opposite directions. Time taken to cross each other?",
        options: ["10s", "12s", "15s", "20s"],
        correctAnswer: "12s",
        explanation: "Relative Speed = 40 + 50 = 90 km/hr = 90 * (5/18) = 25 m/s. Total distance = 120 + 180 = 300m. Time = 300 / 25 = 12s."
      }
    ],
    videoTutorial: {
      title: "Motion & Labor Logic",
      duration: "22:15",
      steps: [
        "Relative speed visualization.",
        "The LCM Unit method for Work.",
        "Train & Platform crossing scenarios."
    ]
    },
    fullSyllabusContent: `
# Chapter 4: Time, Motion & Work - Dynamics of Speed

## 1. The Core Equation
$$\text{Distance} = \text{Speed} \times \text{Time}$$
- **Speed to Time inversion:** If distance is constant, $S_1/S_2 = T_2/T_1$.
- **Unit Conversion:** 
  - To convert $km/hr$ to $m/s$: Multiply by $5/18$.
  - To convert $m/s$ to $km/hr$: Multiply by $18/5$.

---

## 2. Relative Speed
- **Opposite Direction:** $S_1 + S_2$ (Towards each other).
- **Same Direction:** $S_1 - S_2$ (Chasing).

---

## 3. Problems on Trains
A train is a "Long Object". Its length matters.
- **Passing a Pole/Man:** $\text{Distance} = \text{Length of Train}$.
- **Passing a Platform/Bridge:** $\text{Distance} = \text{Length of Train} + \text{Length of Platform}$.

---

## 4. Boats and Streams
- **Speed of Boat in Still Water** $= u$
- **Speed of Stream** $= v$
- **Downstream Speed** $= u + v$
- **Upstream Speed** $= u - v$
*Logic Formulas:*
- $u = (\text{Downstream} + \text{Upstream}) / 2$
- $v = (\text{Downstream} - \text{Upstream}) / 2$

---

## 5. Time and Work Principles
If A does a work in $x$ days, A's 1-day work $= 1/x$.
- **Combined Efficiency:** If A takes $x$ and B takes $y$:
$$\text{Total Time} = \frac{xy}{x+y}$$

### 5.1 The LCM Method (Fastest)
A takes 10 days, B takes 15 days.
1. LCM of 10 and 15 is 30 (Total Work units).
2. A's efficiency $= 30/10 = 3$ units/day.
3. B's efficiency $= 30/15 = 2$ units/day.
4. Total efficiency $= 5$ units/day.
5. Time $= 30 / 5 = 6$ days.

---

## 6. Pipes and Cisterns
Exactly same as Time & Work.
*   **Inlet Pipe:** Positive work.
*   **Outlet (Leakage) Pipe:** Negative work.

---

## 7. Races and Circular Motion
In a 100m race, A beats B by 10m.
- When A reaches 100m, B is at 90m.
- Ratio of speeds $= 100:90 = 10:9$.

---

## 8. Solved Caselet: The Work Sharing
**Passage:** A can do a task in 20 days. B is 25% more efficient than A. C joins them for 2 days. 
1. A's 1-day work $= 1/20$.
2. B's 1-day work $= (1.25) \times (1/20) = 1/16$.
3. If together for 2 days: $2 \times (1/20 + 1/16)$.

---

## 9. Man-Days Formula
$$M_1 D_1 H_1 / W_1 = M_2 D_2 H_2 / W_2$$
- $M$ = Men, $D$ = Days, $H$ = Hours, $W$ = Work.

---

## 10. Mastery Drill: Escalator Math
If you walk up a moving escalator:
- **Net Speed** $= \text{Spd of Man} + \text{Spd of Escalator}$.
`
  },
  {
    id: 'ch-q-5',
    chapterNumber: 5,
    title: 'Geometry & Mensuration',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master the properties of Triangles (Centroid, Incenter, Orthocenter) and Quadrilaterals.',
      'Calculate Area and Perimeter for complex 2D Polygons and Circular sectors.',
      'Solve high-level Surface Area and Volume problems for Cuboids, Cylinders, Cones, and Spheres.',
      'Apply recasting logic (melting and molding) across multiple shapes where volumes are constant.',
      'Solve for inscribed and circumscribed shapes (e.g., largest circle inside a square/triangle).'
    ],
    summary: `
# Chapter 5: Geometry & Mensuration - The Measurement of Space

## 1. 2D Geometry: Polygons and Their Bounds
Geometry is the study of figures in space. In CLAT, geometry is less about proving theorems and more about calculating dimensions for "Cost of Fencing," "Area of a Warehouse," or "Seating Capacity of a Stadium."

### 1.1 The Quadrilateral Hierarchy
*   **Rectangle:** $Area = L \times B; Perimeter = 2(L+B)$.
*   **Square:** $Area = s^2; Diagonal = s\sqrt{2}$. Note: $Area = (Diagonal)^2 / 2$.
*   **Rhombus:** A tilted square. All sides equal. $Area = 1/2 \times d_1 \times d_2$.
*   **Parallelogram:** $Area = \text{Base} \times \text{Height}$.
*   **Trapezium:** $Area = 1/2 \times (\text{sum of parallel sides}) \times \text{height}$. Common in "Cross-section" problems of dams or canals.

---

## 2. Triangle Mastery
Triangles are the most stable geometric shapes.
*   **Area (General):** $1/2 \times \text{base} \times \text{height}$.
*   **Equilateral Triangle:** All sides equal. $Area = (\sqrt{3}/4)s^2; \text{Height} = (\sqrt{3}/2)s$.
*   **Heron's Formula (For unequal sides):** $\sqrt{s(s-a)(s-b)(s-c)}$, where $s = (a+b+c)/2$.
*   **Pythagorean Triplets:** $\{3,4,5\}, \{5,12,13\}, \{8,15,17\}, \{7,24,25\}$. Memorizing these saves minutes in diagonal and height calculations.

---

## 3. Circular Metrics
*   **Circle:** $Area = \pi r^2; \text{Circumference} = 2\pi r$.
*   **Sector of a Circle:** 
    - $Area = (\theta/360) \times \pi r^2$.
    - $\text{Length of Arc} = (\theta/360) \times 2\pi r$.
*   **The In-circle and Circum-circle:**
    - For an equilateral triangle: $r = side / 2\sqrt{3}; R = side / \sqrt{3}$.
    - For a square: $r = side/2; R = side/\sqrt{2}$.

---

## 4. 3D Mensuration: Volume and Capacity
Capacity is the amount a container can hold (measured in Litres or Cubic units).
*   **Cuboids (Boxes):** $Volume = LBH; \text{Surface Area} = 2(LB + BH + LH)$.
*   **Cylinders (Pipes/Pillars):**
    - $Volume = \pi r^2 h$.
    - $\text{Curved Surface Area } (CSA) = 2\pi rh$.
    - $\text{Total Area } (TSA) = 2\pi r(r+h)$.
*   **Cones (Tents/Funnels):**
    - $Volume = 1/3 \pi r^2 h$.
    - $CSA = \pi rl$, where $l$ is the slant height ($\sqrt{r^2 + h^2}$).

---

## 5. Spheres and Hemispheres
*   **Sphere:** $Volume = 4/3 \pi r^3; Area = 4\pi r^2$.
*   **Hemisphere:** $Volume = 2/3 \pi r^3; CSA = 2\pi r^2; TSA = 3\pi r^2$.
- *Insight:* A sphere has the smallest surface area for a given volume—the reason water droplets are round!

---

## 6. The Scaling Rule (CLAT Shortcut)
If the linear dimensions of a shape are scaled by a factor $k$:
- **Perimeter/Height/Radius** scales by $k$.
- **Area** scales by $k^2$.
- **Volume** scales by $k^3$.
- *Example:* If the radius of a balloon is doubled ($k=2$), its surface area becomes 4 times and its volume becomes 8 times.

---

## 7. Melting and Molding (Recasting)
When one 3D shape is melted to form others, the **Total Volume remains constant**.
- **Problem:** How many small spheres of $r=1$ can be made from a large sphere of $R=10$?
- $n = \text{Volume of Large} / \text{Volume of Small} = (R/r)^3 = 10^3 = 1000$.

---

## 8. Case Study: The Warehouse Logic
**Passage:** A warehouse measures 10m x 8m x 6m. It needs to store wooden crates of size 1m x 0.5m x 0.5m.
1. Volume of Warehouse $= 480$ cu m.
2. Volume of Crate $= 0.25$ cu m.
3. Max Crates $= 480 / 0.25 = 1920$.
- **Legal Dimension:** If a law says 20% of warehouse volume must be left as aisles for fire safety:
- Net usable volume $= 0.8 \times 480 = 384$.
- New Max Crates $= 384 / 0.25 = 1536$.

---

## 9. Euler's Law for 3D Shapes
For any convex polyhedron (like a cube or pyramid):
$$V - E + F = 2$$
(Vertices - Edges + Faces $= 2$)
- *Application:* Finding the number of edges for a crystal shape described in a scientific caselet.

---

## 10. Summary Checklist for Spatial Reasoning
- [ ] Memorize the Pythagorean Triplets.
- [ ] Practice the Scaling Rule for 2D and 3D objects.
- [ ] Understand that for Melting/Recasing, Volume is invariant.
- [ ] Always check units: $1 \text{ sq m} = 10,000 \text{ sq cm}$. $1 \text{ cu m} = 1,000,000 \text{ cu cm} = 1,000 \text{ Litres}$.
`,
    videoId: '7xR8W7Gv6D0',
    traditionalMethod: 'Step-by-step application of theorems and manual area/volume calculation using standard formulas and π.',
    clatShortcut: 'CLAT Shortcut: Use Pythagorean Triplets (3-4-5, 5-12-13, 8-15-17) for diagonal checks. Use the "π-divisibility rule" (look for multiples of 11/7 in options). Apply the Scaling Rule: if dimensions scale by k, Area scales by k², Volume by k³.',
    cheatSheetHighlights: [
      "Square: d = s√2",
      "Equilateral Area = (√3/4)s²",
      "Circle: A = πr², C = 2πr",
      "Cylinder Vol = πr²h, Cone Vol = 1/3 πr²h",
      "Sphere Vol = 4/3 πr³"
    ],
    ncertHighlights: [
      '**Angle Properties**: Exterior angle = sum of two opposite interior angles.',
      '**Melting Guard**: Volume remains invariant during reshaping; Surface area changes.',
      '**In/Circum-radius**: r = Area/s (In-radius), R = abc/4A (Circum-radius).'
    ],
    exercises: [
      {
        question: "How many spheres of radius 2cm can be made by melting a cylinder of height 16cm and radius 4cm?",
        options: ["18", "24", "12", "6"],
        correctAnswer: "24",
        explanation: "Vol of Cylinder = π * 16 * 16 = 256π. Vol of one sphere = (4/3)π * 8 = 32π/3. Number = 256π / (32π/3) = (256 * 3) / 32 = 8 * 3 = 24."
      },
      {
        question: "Find the area of the largest circle that can be inscribed in a square of side 14 cm.",
        options: ["154 sq cm", "196 sq cm", "44 sq cm", "132 sq cm"],
        correctAnswer: "154 sq cm",
        explanation: "The diameter of the inscribed circle = side of the square = 14 cm. Radius = 7 cm. Area = πr² = (22/7) * 7 * 7 = 154 sq cm."
      },
      {
        question: "The length, breadth and height of a room are in ratio 3:2:1. If volume is 1296 cu m, find length.",
        options: ["12m", "18m", "24m", "30m"],
        correctAnswer: "18m",
        explanation: "Vol = 3x * 2x * x = 6x³ = 1296. x³ = 216 => x = 6. Length = 3x = 18m."
      },
      {
        question: "If radius of a cylinder is doubled and height is halved, what is the effect on volume?",
        options: ["Doubles", "Halves", "Remains same", "Quadruples"],
        correctAnswer: "Doubles",
        explanation: "New Vol = π * (2r)² * (h/2) = π * 4r² * h / 2 = 2 * (πr²h). Original volume is doubled."
      },
      {
        question: "A path 2.5m wide runs inside a rectangular park 30m by 20m. Find the area of the path.",
        options: ["225 sq m", "250 sq m", "275 sq m", "200 sq m"],
        correctAnswer: "225 sq m",
        explanation: "Outer Area = 30 * 20 = 600. Inner dimension = (30-5) * (20-5) = 25 * 15 = 375. Path Area = 600 - 375 = 225 sq m."
      }
    ],
    videoTutorial: {
      title: "Spatial Reasoning Masterclass",
      duration: "19:30",
      steps: [
        "Angle chasing in parallel lines.",
        "Scaling logic for 2D/3D shapes.",
        "Recasting and melting point math."
    ]
    },
    fullSyllabusContent: `
# Chapter 5: Geometry & Advanced Mensuration
This chapter builds your reasoning through geometric properties and the measurement of flat and volumetric space.

### 1. The Circle-Square Duality
When a wire in the shape of a circle is bent into a square, the **Perimeter remains constant**.
$2\pi R = 4s$. This relationship allows you to switch between 1D and 2D properties instantly.

### 2. The Frustrum (Truncated Shapes)
A bucket is a Frustrum of a Cone. 
$Volume = 1/3 \pi h (R^2 + r^2 + Rr)$. These complex volumes are often tested in liquid-transfer caselets.

### 3. Coordinate Geometry (The Map of Data)
Distance between two points $(x_1, y_1)$ and $(x_2, y_2)$:
$\text{Dist} = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
This is vital for problems involving "Shortest Path" or "Air distance" in geographic caselets.
`
  },
  {
    id: 'ch-q-6',
    chapterNumber: 6,
    title: 'Data Interpretation: Caselets & Visual Data',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Extract numerical data from dense narrative passages (Caselets) efficiently.',
      'Solve multi-graph problems (e.g., Pie Chart + Table) where variables are shared.',
      'Master the "Data Skeleton" method for drafting tables from text.',
      'Solve advanced Venn Diagram sets (2 and 3 sets) involving overlapping categories.',
      'Connect percentage growth, ratios, and averages to visual trend analysis.'
    ],
    summary: `
# Chapter 6: Data Interpretation - The Core of the CLAT Quantitative Section

## 1. The Paradigm Shift: From Math to Interpretation
In the modern CLAT format, Quantitative Techniques is almost exclusively focused on Data Interpretation (DI). You are not just solving equations; you are extracting evidence from a textual or visual source to arrive at a conclusion.

### 1.1 The Architecture of a DI Set
A typical CLAT DI set consists of:
1.  **The Source:** A passage (Caselet), Table, Pie Chart, Bar Graph, or a Combination.
2.  **The Prompt:** 5 or 10 questions based strictly on the source.
3.  **The Traps:** Extraneous information intended to waste your time.

---

## 2. Textual Caselets: Mining for Numbers
This is the most common format. You are given a dense paragraph (e.g., a report on national vaccination rates or corporate revenue split across depts).

### 2.1 The "Skeletal Drafting" Strategy
Do not try to solve questions while reading. First, create a **Skeleton Table**.
- **Rows:** The primary variables (e.g., Year 2021, 2022, 2023).
- **Columns:** The secondary metrics (e.g., Revenue, Profit, Employee Count).
- **Process:** As you scan the text, fill the table. If "Revenue in 2022 was 20% more than 2021," leave it as a relationship ($1.2x$) until you find the "Anchor" value.

---

## 3. Visual Data Mastery
### 3.1 Pie Charts (Structural Splits)
- **Total Angle** $= 360^\circ = 100\%$.
- **Conversion Factor:** To find degrees from %, multiply by $3.6$. To find % from degrees, divide by $3.6$.
- **Pivot:** If HR department is $54^\circ$, it is $54/3.6 = 15\%$ of the total.

### 3.2 Multi-Graph Integration
Often, you receive a Pie Chart (e.g., Total Employees) and a Table (e.g., Gender Ratio).
- **Rule:** Never calculate the breakdown of every slice unless the question asks for it. 
- *Targeted Calculation:* If the question asks for "Women in Finance," only calculate the total of Finance from the Pie and then apply the ratio from the Table.

---

## 4. Venn Diagrams: Overlapping Logic
Sets represent categories that may share members.
*   **2-Set Form:** $Total = n(A) + n(B) - n(Both) + n(Neither)$.
*   **3-Set Form:** CLAT level. Use a Venn with 7 distinct sectors.
    - **Step 1:** Fill the "All Three" center.
    - **Step 2:** Fill the "Only Two" petals using subtraction ($n(A \cap B \text{ only}) = n(A \cap B \text{ total}) - n(ABC)$).
    - **Step 3:** Fill the "Only One" sectors.

---

## 5. Trend Analysis and Growth Metrics
In a line graph, the "Steepness" of the line represents the rate of change.
*   **Simple Growth %** $= (\text{Final} - \text{Initial}) / \text{Initial} \times 100$.
*   **Average Annual Growth** $= \text{Sum of Growth \% across n transitions} / n$.
*   **Observation:** If sales go from 100 to 110, that's 10% growth. If they then go from 110 to 121, that's another 10% growth (Compounded).

---

## 6. The "Anchor" Technique for Missing Data
In a table with missing values, look for the **Vertical total** or **Horizontal relationship** in the text. 
- "Total staff is 500. Manager to Clerk ratio is 1:4."
- This is your anchor to fill the Clerk and Manager cells.

---

## 7. Ratio Comparison in DI
Question: "In which year was the profit-to-revenue ratio the second highest?"
- Instead of dividing large numbers, use **Cross-Multiplication** pairs to compare fractions $(P_1/R_1 \text{ vs } P_2/R_2)$.
- If $P_1 R_2 > P_2 R_1$, then $P_1/R_1$ is larger.

---

## 8. Case Study: The Corporate P&L Caselet
**Passage:** A startup had a revenue of ₹1Cr in its first year. Costs were 80% of revenue. In Year 2, revenue grew 50% and profit margin doubled.
1. **Year 1:** Revenue $= 100L$. Cost $= 80L$. Profit $= 20L$ (Margin $= 20\%$).
2. **Year 2:** Revenue $= 150L$ (50% Growth).
3. **Margin Double** $\rightarrow 40\%$.
4. **Profit in Yr 2** $= 40\% \text{ of } 150L = 60L$.
5. **Cost in Yr 2** $= 150 - 60 = 90L$.
- **Analysis:** Even though revenue grew by 50%, profit grew by 200% ($20 \rightarrow 60$). Caselets often highlight this "Leverage" effect.

---

## 9. Handling "Approximate" Data
If a bar is between 40 and 50, and there are no grid lines, check the text. If the text says "Roughly double of segment X," use that logic. If neither exists, pick the midpoint (45) and see if the options allow for a slight rounding error.

---

## 10. Summary Checklist for DI Proficiency
- [ ] Practice "Skeletal Drafting" for 10-line text paragraphs.
- [ ] Master 2-set and 3-set Venn mapping.
- [ ] Learn to identify "Anchor" values instantly.
- [ ] Never calculate all data points; calculate only what the question demands.
`,
    videoId: 'KjD0p7rK2yA',
    traditionalMethod: 'Detailed calculation of every value in a set before checking questions. High risk of time exhaustion.',
    clatShortcut: 'CLAT Shortcut: Use "Data Anchoring"—find the one total value and derive everything as percentages. In Venn sets, always work from the center ("All Three") outwards. Estimate growth by comparing only the first two digits of large numbers.',
    cheatSheetHighlights: [
      "Venn: Total = A + B + C - (AB+BC+CA) + ABC + Neither",
      "Growth % = (Gap / Initial) * 100",
      "Pie Degree => %: (Degrees / 3.6)",
      "Avg Growth: Sum of growth % / n"
    ],
    ncertHighlights: [
      '**Logical Deductions**: Identifying missing data using totals and averages.',
      '**Visual Estimation**: Using bar heights and pie segments to eliminate outliers.',
      '**Set Theory Logic**: Distinguishing "Only A" from "Total A" in a passage.'
    ],
    exercises: [
      {
        question: "In a class, 60% like Tea, 50% like Coffee, and 20% like both. What percentage likes neither?",
        options: ["10%", "20%", "30%", "None"],
        correctAnswer: "10%",
        explanation: "Total Liking = 60 + 50 - 20 = 90%. Neither = 100 - 90 = 10%."
      },
      {
        question: "A pie chart shows distribution of 8000 employees. HR is 15%. If the ratio of Men to Women in HR is 1:2, find the number of women in HR.",
        options: ["400", "600", "800", "1200"],
        correctAnswer: "800",
        explanation: "HR employees = 15% of 8000 = 1200. Women = (2/3) * 1200 = 800."
      },
      {
        question: "In a survey of 100 people, 50 play Football, 40 play Cricket and 25 play both. How many play exactly one sport?",
        options: ["30", "40", "50", "65"],
        correctAnswer: "40",
        explanation: "Only Football = 50 - 25 = 25. Only Cricket = 40 - 25 = 15. Exactly one = 25 + 15 = 40."
      },
      {
        question: "If sales of a company increased from 1500 units to 1800 units, then decreased to 1620 units. Net percentage change?",
        options: ["8% increase", "10% increase", "2% decrease", "6% increase"],
        correctAnswer: "8% increase",
        explanation: "Net Change = (Final - Initial) / Initial * 100 = (1620 - 1500) / 1500 * 100 = 120 / 1500 * 100 = 8% increase."
      },
      {
        question: "A caselet states: 'Total voters 10,000. 60% are men. 70% of men voted. 40% of women voted.' Total turnout %?",
        options: ["55%", "58%", "60%", "62%"],
        correctAnswer: "58%",
        explanation: "Men = 6000, Women = 4000. Voted Men = 0.7 * 6000 = 4200. Voted Women = 0.4 * 4000 = 1600. Total Turnout = 5800 out of 10000 = 58%."
      }
    ],
    videoTutorial: {
      title: "DI: Narrative to Numerical",
      duration: "25:40",
      steps: [
        "Converting caselet text into a table.",
        "Venn diagram master mapping.",
        "Pie chart degree-to-percentage conversion."
      ]
    },
    fullSyllabusContent: `
# Chapter 6: Deep-Dive Data Interpretation
Data Interpretation is where logic meets calculation. In CLAT, the ability to filter out "Noise" is just as important as the ability to calculate a percentage.

### 1. The Strategy of "Selective Processing"
A caselet might provide the data for 5 types of vehicles, but the questions only ask about "Petrol vs Diesel" across all. Stop calculating for Electric and Bio-fuel—focus exclusively on the target categories.

### 2. Multi-Graph Strategy: Linking Variables
Example: A Pie chart shows the distribution of students in 5 sports. A table shows the \% of students in each sport who passed the fitness test.
- Q: Find total students who failed the fitness test in Football.
- Step 1: Find total in Football (from Pie).
- Step 2: If 80% passed, 20% failed. Apply 20% to the Football total.

### 3. Spider/Radar Charts: Multi-Dimensional Data
A Radar chart shows 5 parameters from the center. The further away a point is from the center, the higher the value. These are common in comparative product analysis caselets.
`
  },
  {
    id: 'ch-q-7',
    chapterNumber: 7,
    title: 'Commercial Math II: Interest & Partnerships',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Understand the power of Compounding and its impact on long-term capital growth.',
      'Solve for effective interest rates under different compounding frequencies (Half-Yearly, Quarterly).',
      'Understand the difference between Simple and Compound interest for multi-year periods.',
      'Master Partnership logic involving working partners, salaries, and dynamic capital shifts.',
      'Solve for EMI installments and present value of future debts.'
    ],
    summary: 'Money has a time value. This chapter covers how capital grows through geometric interest and how business profits are shared proportionally over varying investment windows.',
    videoId: 'qf_v7x_8qTo',
    traditionalMethod: 'Using long-form exponential formulas like P(1+r/100)^n. Complex algebra for partnership ratios.',
    clatShortcut: 'CLAT Shortcut: Use the 2-Year Difference (D2 = PR²/100²) and 3nd Year Difference formulas. For CI, use successive percentage logic (10% + 10% = 21%). In partnerships, always normalize (Capital x Time) to the simplest integer ratio first.',
    cheatSheetHighlights: [
      "SI = PRT/100",
      "CI Amount = P(1 + r/100)^n",
      "D2 = PR²/100²",
      "Profit Ratio = (C1*T1) : (C2*T2)",
      "Effective Rate = (1+r/n)^n - 1"
    ],
    ncertHighlights: [
      '**Compounding Power**: Why CI grows faster than SI after year 1.',
      '**Investment Weights**: Real profit share is a function of both amount and duration.',
      '**Installment Symmetry**: Breaking down annual payments into principal and interest components.'
    ],
    exercises: [
      {
        question: "A sum of money doubles itself at Simple Interest in 8 years. In how many years will it triple itself?",
        options: ["12 years", "16 years", "24 years", "20 years"],
        correctAnswer: "16 years",
        explanation: "In SI, interest is constant. If 100 becomes 200, Interest = 100 in 8 years. For it to triple (100 to 300), Interest needed = 200. This will take 8 * 2 = 16 years."
      },
      {
        question: "Find the compound interest on ₹10,000 for 2 years at 10% per annum, compounded annually.",
        options: ["₹2000", "₹2100", "₹1000", "₹2200"],
        correctAnswer: "₹2100",
        explanation: "Successive change: 10 + 10 + (10*10/100) = 21%. CI = 21% of 10,000 = ₹2100."
      },
      {
        question: "Difference between CI and SI on ₹5000 for 2 years at 8% per annum?",
        options: ["₹32", "₹40", "₹64", "₹16"],
        correctAnswer: "₹32",
        explanation: "D = PR²/100² = 5000 * (64 / 10000) = 5000 * 0.0064 = ₹32."
      },
      {
        question: "A and B start a business with ₹5000 and ₹8000. After 6 months A adds ₹2000. Annual profit ₹14000. A's share?",
        options: ["₹6000", "₹5000", "₹8000", "₹7000"],
        correctAnswer: "₹6000",
        explanation: "A's weight = (5000*6) + (7000*6) = 72,000. B's weight = 8000*12 = 96,000. Ratio = 72:96 = 3:4. A's share = (3/7) * 14000 = ₹6000."
      },
      {
        question: "Effective annual rate of interest corresponding to a nominal rate of 10% per annum compounded half-yearly?",
        options: ["10%", "10.25%", "10.5%", "11%"],
        correctAnswer: "10.25%",
        explanation: "Rate for 6 months = 5%. Effective = 5 + 5 + (25/100) = 10.25%."
      }
    ],
    videoTutorial: {
      title: "Financing & Partnerships",
      duration: "21:10",
      steps: [
        "CI vs SI visualization.",
        "The Partnership Profit formula.",
        "Solving Monthly Installment (EMI) logic."
      ]
    },
    fullSyllabusContent: `
# Chapter 7: Commercial Math II - Interest & Partnerships

## 1. Simple Interest (SI): Linear Growth
Interest is calculation on the original principal **only** for every period.
$$\text{SI} = \frac{P \times R \times T}{100}$$
*   $P$ = Principal
*   $R$ = Rate per annum
*   $T$ = Time in years (If in months, divide by 12)
*   $\text{Amount } (A) = P + \text{SI}$

---

## 2. Compound Interest (CI): Geometric Growth
Interest is calculated on the previous amount (Principal + accumulated Interest).
### 2.1 The Standard Formula
$$A = P \left( 1 + \frac{R}{100} \right)^T$$
$$\text{CI} = A - P$$

### 2.2 Successive Increase logic
Simple way to solve CI for 2-3 years:
- For 10% rate: $100 \rightarrow 110 \rightarrow 121 \rightarrow 133.1$.
- 2 Year CI is 21%. 3 Year CI is 33.1%.

### 2.3 Difference Formula (High Yield)
- **Difference for 2 years (D2)** $= P(R/100)^2$.
- **Difference for 3 years (D3)** $= P(R/100)^2 \times (3 + R/100)$.

---

## 3. Business Partnerships
A favorite for CLAT text caselets. Shared capital for shared time.
$$\text{Profit Share Ratio} = (C_1 \times T_1) : (C_2 \times T_2) : (C_n \times T_n)$$

### 3.1 Types of Partners
1.  **Working Partner:** Manages the firm. Often gets a fixed "Salary" from the total profit (before distribution).
2.  **Sleeping Partner:** Only provides capital. Share is strictly proportional.

---

## 4. Installments (EMI Math)
Buying an item on a loan.
### 4.1 Simple Interest Installments
$$\text{Total Debt} = \text{Installments} + \text{Interest on each}$$
$\text{Installment } (x) = \frac{100A}{100T + \frac{RT(T-1)}{2}}$ (Where A is total debt).

---

## 5. Solved Caselet: The Startup Funding
**Passage:** A and B start a business with ₹10k and ₹20k. After 6 months, C joins with ₹15k. At the end of the year, total profit is ₹3600.
1.  A's investment $= 10 \times 12 = 120$.
2.  B's investment $= 20 \times 12 = 240$.
3.  C's investment $= 15 \times 6 = 90$.
4.  Ratio $= 120 : 240 : 90 = 12 : 24 : 9 = 4 : 8 : 3$.
5.  Total parts $= 15$.
6.  C's share $= (3/15) \times 3600 = ₹720$.

---

## 6. Nominal vs Effective Interest Rate
If a bank offers 10% compounded **Half-Yearly**:
- Effective Rate $= 5 + 5 + (25/100) = 10.25\%$.
Always check the "compounding frequency".

---

## 7. True Discount and Banker's Discount
- **True Discount (TD):** Interest on the Present Worth (PW).
- **Amount (A):** PW + TD.
- **Banker's Discount (BD):** Interest on the Face Value (A) of the bill.
- **Banker's Gain (BG):** BD - TD $= \text{Interest on TD}$.

---

## 8. Fixed Investment vs. Changing Investment
If A invests ₹10k for 4 months and ₹15k for remaining 8 months:
Effective Capital $= (10 \times 4) + (15 \times 8) = 40 + 120 = 160k$ units.

---

## 9. Stocks, Dividends and Face Value
- Dividend is always calculated on the **Face Value (FV)**.
- Price of share in market is **Market Value (MV)**.
- Yield $\% = (\text{Income} \div \text{Investment}) \times 100$.

---

## 10. Mastery Drill: Doubling Money
**Problem:** In how many years will a sum of money triple itself at 10% per annum SI?
1. $P \rightarrow 3P$. Interest needed $= 2P$.
2. $\text{Target SI} = (P \times 10 \times T) / 100 = P \times T / 10$.
3. $2P = P \times T / 10$.
4. $T = 20$ years.
`
  },
  {
    id: 'ch-q-8',
    chapterNumber: 8,
    title: 'Mixture, Alligation & Advanced Averages',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master the Alligation Cross for finding ratios in two-group mixtures.',
      'Solve multi-mixture problems involving three or more substances.',
      'Understand the "Repeated Dilution" logic for removal and replacement of liquids.',
      'Apply alligation shortcuts to non-mixture topics like Profit/Loss and Speed.',
      'Handle weighted averages for large data tables using deviation and balancing.'
    ],
    summary: 'Mixing processes are mathematical shortcuts. This chapter provides a unified model (Alligation) to solve complex ratio and average problems instantly—a must-have for the 15-minute Quants window.',
    videoId: 'qf4B4v0vX_A',
    traditionalMethod: 'Solving linear equations with x and y variables. Weighted average formula application.',
    clatShortcut: 'CLAT Shortcut: The Alligation Cross. Subtract the mean from the higher value and the lower value from the mean. The resulting diagonal values give you the required ratio of the mixed components.',
    cheatSheetHighlights: [
      "Ratio C:D = (D-M):(M-C)",
      "Final = Initial * (1 - r/V)^n",
      "Avg = (n1*a1 + n2*a2) / (n1+n2)",
      "Deviation logic: Total +ve = Total -ve"
    ],
    ncertHighlights: [
      '**The Zero-Sum Logic**: Understanding the balancing point around a weighted mean.',
      '**Removal Power**: Calculating the exponential decay of concentration during replacement.',
      '**Rate Application**: Using Alligation for Interest rates and Profit margins.'
    ],
    exercises: [
      {
        question: "In what ratio must rice at ₹9.30 per kg be mixed with rice at ₹10.80 per kg so that the mixture is worth ₹10 per kg?",
        options: ["8:7", "7:8", "5:6", "6:5"],
        correctAnswer: "8:7",
        explanation: "D-M = 10.80 - 10.00 = 0.80. M-C = 10.00 - 9.30 = 0.70. Ratio = 0.80:0.70 = 8:7."
      },
      {
        question: "A jar contains 40L of milk. 4L is removed and replaced with water. This is done twice more. How much milk is left?",
        options: ["29.16L", "30.40L", "32.40L", "28.5L"],
        correctAnswer: "29.16L",
        explanation: "Replacement factor = (1 - 4/40) = 0.9. Done 3 times total. Final milk = 40 * (0.9)^3 = 40 * 0.729 = 29.16."
      },
      {
        question: "In what ratio should 20% milk solution be mixed with 50% milk solution to get 40% milk solution?",
        options: ["1:2", "2:1", "3:2", "2:3"],
        correctAnswer: "1:2",
        explanation: "50 - 40 = 10. 40 - 20 = 20. Ratio = 10 : 20 = 1 : 2."
      },
      {
        question: "A merchant has 100kg sugar. Part sold at 7% profit, rest at 17% profit. Overall 10% profit. How much at 17%?",
        options: ["30kg", "70kg", "50kg", "40kg"],
        correctAnswer: "30kg",
        explanation: "Ratio = (17-10) : (10-7) = 7:3. Sugar at 17% = (3/10) * 100 = 30kg."
      },
      {
        question: "A person travels 285 km in 6 hours. Part by bus at 40km/hr and part by train at 55km/hr. Distance by train?",
        options: ["165 km", "120 km", "180 km", "150 km"],
        correctAnswer: "165 km",
        explanation: "Average speed = 285 / 6 = 47.5. Time Ratio (Bus:Train) = (55 - 47.5) : (47.5 - 40) = 7.5 : 7.5 = 1:1. Each took 3 hours. Train dist = 3 * 55 = 165 km."
      }
    ],
    videoTutorial: {
      title: "Mixing Mastery",
      duration: "19:45",
      steps: [
        "Drawing the Alligation Cross.",
        "Solving Weighted Average gaps.",
        "Replacement and Dilution scenarios."
      ]
    },
    fullSyllabusContent: `
# Chapter 8: Mixture, Alligation & Advanced Averages

## 1. The Cross Rule (Alligation)
This is a shortcut to find the ratio in which two quantities must be mixed to get a desired price/quality.
- **Cheaper Price:** $C$
- **Dearer Price:** $D$
- **Mean Price:** $M$
$$\text{Ratio } (C:D) = (D - M) : (M - C)$$

--- 

## 2. Alligation in Interest and Profit
It's not just for milk and water! 
- If part of ₹10,000 is given at 8% SI and rest at 10% SI, and total income is ₹900 (9%).
- Ratio of investments $= (10 - 9) : (9 - 8) = 1 : 1$. ₹5000 each.

--- 

## 3. Repeated Dilution Formula
If $x$ units are removed from $V$ units and replaced with another liquid, after $n$ times:
$$\text{Current Original Amount} = V \times (1 - x/V)^n$$

--- 

## 4. Solved Caselet: The Alcohol Mix
**Problem:** A 20L solution has 25% alcohol. How much pure alcohol should be added to make it 40% alcohol?
1. Cheaper (Original Sol) $= 25\%$.
2. Dearer (Pure Alcohol) $= 100\%$.
3. Mean (Target) $= 40\%$.
4. Ratio $= (100 - 40) : (40 - 25) = 60 : 15 = 4 : 1$.
5. Since 4 parts $= 20L$, then 1 part (to be added) $= 5L$.

--- 

## 5. Average Speed as Alligation
If distances are traveled at different speeds for different times, the Avg Speed is the mean.
- Time Ratio $= (S_2 - S_{avg}) : (S_{avg} - S_1)$.

--- 

## 6. Multiple Mixtures
Mixing three varieties A, B, C. 
1. Pair one cheaper with one dearer.
2. Apply cross for each pair.
3. Sum the weights.

--- 

## 7. Percentage of Purity
Mixing 90% pure gold with 70% pure gold to get 80% purity.
Ratio $= (90-80) : (80-70) = 10 : 10 = 1:1$.

--- 

## 8. Narrative Insight: The Alligation Logic
The rule works on ANY weighted average. If average height of Boys is 160cm, Girls 150cm, and class average 156cm. 
Ratio Boys:Girls $= (156-150) : (160-156) = 6 : 4 = 3 : 2$.

--- 

## 9. Solution Replacement
A jar has milk and water in ratio 3:1. What part must be replaced by water to make it 1:1?
- This involves removal and addition. Use the 1-day work logic here.

--- 

## 10. Mastery Drill: The Average Price
**Problem:** Rice at ₹40/kg mixed with ₹60/kg in ratio 3:2. Find mean price.
1. Total cost $= 3 \times 40 + 2 \times 60 = 120 + 120 = 240$.
2. Total weight $= 5$.
3. Mean $= 240 / 5 = ₹48$.
`
  },
  {
    id: 'ch-q-9',
    chapterNumber: 9,
    title: 'Probability, Statistics & Set Theory',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Understand Conditional Probability and Independent vs Dependent events.',
      'Master nCr and nPr logic for complex selection and arrangement problems in caselets.',
      'Solve advanced 3-variable Venn Diagrams involving "Exactly Two" and "At least one" constraints.',
      'Calculate Variance and Standard Deviation and understand their impact on data reliability.',
      'Master the Empirical Relation between Mean, Median, and Mode for skewed data sets.'
    ],
    summary: 'The world is stochastic. This chapter teaches you how to measure risk through probability, summarize volatility through statistics, and map multi-variable logic using sets.',
    videoId: '603R9u0O7S0',
    traditionalMethod: 'Listing sample spaces and using long-form sigma formulas for variance. Manual overlap subtraction for Venn sets.',
    clatShortcut: 'CLAT Shortcut: Use the nCr formula for selections. For 3-set Venn diagrams, always fill the "All Three" (center) first. Master the Modes shortcut: Mode = 3 Median - 2 Mean. Use Complementary Probability (1 - P(None)) for "at least one" problems.',
    cheatSheetHighlights: [
      "P(A|B) = P(A ∩ B) / P(B)",
      "nCr = n! / (r! * (n-r)!)",
      "Venn: Total = S1 - S2 + S3 + None",
      "Variance = σ²",
      "Mode = 3 Median - 2 Mean"
    ],
    ncertHighlights: [
      '**Sample Space Mapping**: Ensuring all 36 dice or 52 card outcomes are accounted for.',
      '**Robust Measures**: Why Median is less affected by extreme values than Mean.',
      '**Overlapping logic**: The critical difference between "Only A" and "Total A".'
    ],
    exercises: [
      {
        question: "In a class of 50, 30 like Math, 25 like Science, and 10 like both. How many like neither?",
        options: ["5", "10", "15", "0"],
        correctAnswer: "5",
        explanation: "Liking either = 30 + 25 - 10 = 45. Neither = 50 - 45 = 5."
      },
      {
        question: "A bag contains 5 red and 3 blue balls. If 2 balls are drawn at random, what is the probability that both are red?",
        options: ["5/14", "5/28", "3/14", "1/4"],
        correctAnswer: "5/14",
        explanation: "Total ways = 8C2 = 28. Favorable (both Red) = 5C2 = 10. Prob = 10/28 = 5/14."
      },
      {
        question: "In a survey of 200 people, 120 like Coffee, 100 like Tea and 40 like both. How many like Coffee only?",
        options: ["60", "80", "100", "40"],
        correctAnswer: "80",
        explanation: "Coffee Only = Total Coffee - Both = 120 - 40 = 80."
      },
      {
        question: "Mean of 10 observations is 15. If one observation 24 is replaced by 34, find new mean.",
        options: ["16", "15.5", "15.1", "17"],
        correctAnswer: "16",
        explanation: "Sum increase = 34 - 24 = 10. Mean increase = 10 / 10 = 1. New Mean = 15 + 1 = 16."
      },
      {
        question: "What is the probability of getting a sum of 9 when two dice are thrown?",
        options: ["1/6", "1/9", "5/36", "1/12"],
        correctAnswer: "1/9",
        explanation: "Favorable: (3,6), (4,5), (5,4), (6,3). Total = 4. 4/36 = 1/9."
      }
    ],
    videoTutorial: {
      title: "Logic & Probability",
      duration: "25:30",
      steps: [
        "Visualizing sample spaces.",
        "Mapping 3-variable Venn sets.",
        "Mean-Median-Mode relationships."
      ]
    },
    fullSyllabusContent: `
# Chapter 9: Probability, Statistics & Set Theory

## 1. Probability Laws
$$P(\text{Event}) = \frac{\text{Favorable Outcomes}}{\text{Total Possible Outcomes}}$$
- Range: $0$ (Impossible) to $1$ (Certain).
- **Complement:** $P(A') = 1 - P(A)$. Highly useful for "At least" problems.

### 1.1 Combinations (Selections)
To pick $r$ items from $n$, use $nC_r = \frac{n!}{r!(n-r)!}$.
- Number of handshakes between $n$ people $= nC_2$.
- Forming a committee of 2 men from 5 $= 5C_2 = 10$.

---

## 2. Set Theory & Venn Diagrams
### 2.1 The Two-Set Model
$n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
### 2.2 The Three-Set Model (CLAT Favorite)
Always fill from center to edge.
- **Center:** $n(A \cap B \cap C)$
- **Petals:** [A and B only], [B and C only], [C and A only].
- **Sectors:** [Only A], [Only B], [Only C].
- **Exterior:** [None].

---

## 3. Descriptive Statistics
### 3.1 Measures of Central Tendency
*   **Mean:** Total Sum / Count.
*   **Median:** Middle term when sorted. If count is even, average of middle two.
*   **Mode:** Most frequent value.
*   **Empirical Relation:** $\text{Mode} = 3 \times \text{Median} - 2 \times \text{Mean}$.

### 3.2 Dynamic Statistics
*   **Range:** Max - Min.
*   **Standard Deviation:** Measures spread around the mean.
*   **Percentile:** Your rank compared to others.

---

## 4. Solved Caselet: The Talent Show
**Passage:** In a school of 200 students, 120 like dancing, 100 like singing, and 50 like acting. 40 like dancing and singing, 30 like singing and acting, and 20 like acting and dancing. 10 like all three.
1. **Dancing Only** $= 120 - (30 + 10 + 10) = 70$.
2. **Singing Only** $= 100 - (30 + 20 + 10) = 40$.
3. **Acting Only** $= 50 - (10 + 20 + 10) = 10$.
4. **Exactly Two** $= 30 + 20 + 10 = 60$.
5. **At least One** $= 70 + 40 + 10 + 60 + 10 = 190$.
6. **Neither** $= 10$.

---

## 5. Independent vs. Mutually Exclusive
*   **Dependent Events:** Drawing a card and NOT replacing it.
*   **Independent Events:** Rolling a die twice. $P(A \cap B) = P(A) \times P(B)$.
*   **Mutually Exclusive:** Cannot happen together. $P(A \cup B) = P(A) + P(B)$.

---

## 6. The Poker Math: Card Probability
- Probability of picking a King $= 4/52 = 1/13$.
- Probability of picking a Spade $= 13/52 = 1/4$.
- Probability of Heart or Diamond (Red) $= 26/52 = 1/2$.

---

## 7. Arithmetic vs Harmonic Mean in Stats
Use **Arithmetic Mean** for salaries/weights. Use **Harmonic Mean** for rates (Average Speed).

---

## 8. Range and Interquartile Logic
In a box plot or distribution DI:
- **Range** is volatile (sensitive to one extreme).
- **Median** is robust (stays centered).

---

## 9. Solved: The Dice Problem
**Question:** Sum of two dice is 8. What is the probability?
- Sample space $= 36$.
- Favorable: $(2,6), (3,5), (4,4), (5,3), (6,2)$.
- Count $= 5$.
- Result $= 5/36$.

---

## 10. Mastery Drill: The At-Least logic
**Problem:** A coin is tossed 3 times. What is the prob of at least one head?
- $P(\text{at least one head}) = 1 - P(\text{no heads})$.
- $P(\text{no heads}) = P(TTT) = (1/2) \times (1/2) \times (1/2) = 1/8$.
- Result $= 1 - 1/8 = 7/8$.
`
  },
  {
    id: 'ch-q-10',
    chapterNumber: 10,
    title: 'DI Masterclass: Caselets & Advanced Formats',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Decode high-density narrative passages (Caselets) under extreme time pressure.',
      'Master interlocking data sets (e.g., a Radar Chart that feeds into a table).',
      'Solve "Variable-Missing" tables where you must assume a base value (x).',
      'Analyze non-standard charts like Bubble, Funnel, and Waterfall models.',
      'Perform rapid data auditing to identify logical inconsistencies in a set.'
    ],
    summary: 'The ultimate stage of CLAT Quants. This chapter focuses on high-level data extraction and synthesis, moving from fragmented data points to a complete business or legal strategy.',
    videoId: 'z_9r8W7Gv_Y',
    traditionalMethod: 'Linear reading and sequential calculation. High probability of missing subtle narrative cues.',
    clatShortcut: 'CLAT Shortcut: Use "Recursive Filling"—fill the easiest cells first to unlock the harder ones. Use the "Unit Audit" to ensure all percentages and ratios sum to the stated totals. Approach 3D charts by flatting them into a 2D matrix first.',
    cheatSheetHighlights: [
      "Radar Chart: Measure from the Origin (0)",
      "Matrix Drafting: Rows = Entities, Cols = Metrics",
      "Ratio Balancing: Total / Sum of Parts",
      "Growth Smoothing: Simple vs Compounded"
    ],
    ncertHighlights: [
      '**Information Filtering**: Distinguishing "Lead-in" text from actual operational data.',
      '**Consistency Checks**: Ensuring the 100% boundary isn\'t breached.',
      '**Format Flexibility**: Converting any visualization into a standardized table.'
    ],
    exercises: [
      {
        question: "A company has 400 employees. Depts: Fin (120), Tech (Ratio Tech-Men:Tech-Women is 4:1). If Tech-Women are 32, how many in HR?",
        options: ["120", "150", "160", "280"],
        correctAnswer: "120",
        explanation: "Tech-Women = 32. Tech-Men = 128 (4*32). Total Tech = 160. Total (Fin+Tech) = 120 + 160 = 280. HR = 400 - 280 = 120."
      },
      {
        question: "Radar chart shows car scores (max 10): Speed 8, Safety 6, Cost 4. Weights are 50, 30, 20. Total weighted score?",
        options: ["6.6", "7.0", "6.0", "7.2"],
        correctAnswer: "6.6",
        explanation: "(8*50 + 6*30 + 4*20) / 100 = (400 + 180 + 80) / 100 = 660 / 100 = 6.6."
      },
      {
        question: "Pie chart distribution of 1200 items: A is 30%, B is 45°. Find ratio of A:B.",
        options: ["3:1", "12:5", "2:1", "5:2"],
        correctAnswer: "12:5",
        explanation: "B as % = 45 / 3.6 = 12.5%. Ratio A:B = 30 : 12.5 = 300 : 125 = 12 : 5."
      },
      {
        question: "Caselet: Population 1M. Literacy 80%. Male:Female is 3:2. Male Literacy is 90%. Female Literacy?",
        options: ["65%", "70%", "75%", "60%"],
        correctAnswer: "65%",
        explanation: "Total Lit = 800k. Males = 600k, Females = 400k. male Lit = 540k. Female Lit = 800k - 540k = 260k. % Female Lit = 260/400 = 65%."
      },
      {
        question: "Table has 4 cells. A, B, C, Total. Total = 500. A = 200. Ratio B:C is 2:3. Value of C?",
        options: ["120", "180", "150", "100"],
        correctAnswer: "180",
        explanation: "B+C = 300. C = (3/5) * 300 = 180."
      }
    ],
    videoTutorial: {
      title: "The Caselet Strategy",
      duration: "30:20",
      steps: [
        "Paragraph analysis and mapping.",
        "Solving 'Missing Cell' puzzles.",
        "Radar and Funnel chart decoding."
      ]
    },
    fullSyllabusContent: `
# Chapter 10: Advanced DI - Caselets & Data Logic

## 1. Decoding Complex Caselets
A Caselet is a "Mathematics Story". Your job is to translate this story into a logical table.

### 1.1 The Narrative Triage
1.  **Identify Constants:** What numbers are fixed? (Total population, Total budget).
2.  **Identify Relatives:** What numbers are connected by % or Ratios?
3.  **Draft the Matrix:** Usually (Entity × Metric) e.g., (Months × Sales).

--- 

## 2. Missing Data Mastery
Missing data sets require finding "Anchors" (Totals, Averages). If a cell is missing and no total is given, look for horizontal/vertical relationships in the text paragraph.

--- 

## 3. High-End Graph Formats
*   **Spider (Radar) Charts:** Used for multi-parameter comparison. (e.g., Car performance across Speed, Safety, Cost, Resale).
*   **Funnel Charts:** Show a process (e.g., 1000 leads $\rightarrow$ 200 interviews $\rightarrow$ 20 hires). Use % drop at each stage.

--- 

## 4. Trend Analysis with Growth Metrics
- **CAGR:** Compounded Annual Growth Rate.
- **YoY:** Year on Year change.
- **MoM:** Month on Month change.

--- 

## 5. Solved Advanced: The Supply Chain
**Passage:** A factory produced 10,000 units in 2021. Production grew by 10% in 2022 and 20% in 2023.
1. **2021:** 10,000.
2. **2022:** 11,000.
3. **2023:** $11,000 \times 1.2 = 13,200$.

--- 

## 6. Data Redundancy: The Distractor
CLAT caselets often give 15 lines of data but only 3 are needed for Question 1. Don't process everything. Read the question first, then locate the specific data point in the text.

--- 

## 7. Visual Logic: Bar vs. Line
- Use **Bars** for discrete values in specific years.
- Use **Lines** to track trends and fluctuations.

--- 

## 8. Narrative Deduction
If text says "The difference between A and B is 40% of their sum", then $(A-B) = 0.4(A+B)$. This simplifies to a ratio $A/B = 7/3$.

--- 

## 9. Pie Chart Central Angle Logic
Angle $= (Percentage/100) \times 360 = Percentage \times 3.6$.

--- 

## 10. Mastery Drill: The Efficiency Caselet
**Problem:** 3 machines A, B, C produce 5000 items. A produces 20%, B produces 30% more than A. Find C.
1. A $= 1000$.
2. B $= 1000 + 300 = 1300$.
3. C $= 5000 - 2300 = 2700$.
`
  },
  {
    id: 'ch-q-11',
    chapterNumber: 11,
    title: 'Calculation Science: Hacks & Approximations',
    subject: 'Quantitative Techniques',
    learningObjectives: [
      'Master mental squares up to 50 and cubes up to 20 for instant recall.',
      'Apply the "Friendly Number" method for complex products (e.g., 49 x 51).',
      'Master the Reciprocal Table (1/2 to 1/25) for speedy DI percentage calculations.',
      'Apply digital sum and unit digit logic for multi-stage expression verification.',
      'Learn the "Scanning Technique" to locate data points in 500-word caselets.'
    ],
    summary: 'Quants is a high-speed strategy game. This final chapter provides the technical "Hacks" to skip manual labor and arrive at the right option through logic, estimation, and pattern recognition.',
    videoId: 'z_0I_088v_U',
    traditionalMethod: 'Step-by-step long division and multiplication. Reading text line-by-line.',
    clatShortcut: 'CLAT Shortcut: Use "Last Two Digits" for addition sets. Apply the 10-5-1% rule for all percentages. Round 1492.5 to 1500 and 19.8% to 20%—if options are spread, your estimation is your best friend.',
    cheatSheetHighlights: [
      "1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.1%",
      "a² - b² = (a+b)(a-b) shortcut for 49*51",
      "Multiply by 5 => Divide by 2, add 0",
      "Multiply by 11 => Shift and Add",
      "50² = 2500"
    ],
    ncertHighlights: [
      '**Property of 9**: Any number multiplied by 9 has a digital sum of 9.',
      '**Approximation Boundary**: When to round UP vs DOWN to cancel errors.',
      '**Pattern Recognition**: Identifying arithmetic vs geometric growth at a glance.'
    ],
    exercises: [
      {
        question: "Approximate: 19.8% of 1492.5 + 24.9% of 801.2",
        options: ["500", "450", "400", "550"],
        correctAnswer: "500",
        explanation: "approx: 20% of 1500 (300) + 25% of 800 (200) = 500."
      },
      {
        question: "Multiply 105 x 95 using a shortcut.",
        options: ["9975", "10000", "9925", "9875"],
        correctAnswer: "9975",
        explanation: "(100 + 5)(100 - 5) = 100² - 5² = 10000 - 25 = 9975."
      },
      {
        question: "What is 1/12 as a percentage?",
        options: ["8.33%", "12.5%", "9.09%", "11.11%"],
        correctAnswer: "8.33%",
        explanation: "1/4 is 25%, so 1/12 is 1/3 of 25% = 8.33%."
      },
      {
        question: "Square of 45?",
        options: ["2025", "2125", "1825", "1925"],
        correctAnswer: "2025",
        explanation: "End in 5 shortcut: 4 * (4+1) = 20. Suffix 25. Result = 2025."
      },
      {
        question: "Digital sum of 123456?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "3",
        explanation: "1+2+3+4+5+6 = 21. 2+1 = 3."
      }
    ],
    videoTutorial: {
      title: "Mental Math Hacks",
      duration: "18:20",
      steps: [
        "The Digital Sum verification.",
        "Unit Digit elimination strategy.",
        "Reciprocal Table for speedy DI."
      ]
    },
    fullSyllabusContent: `
# Chapter 11: Calculation Hacks & Speed Math

## 1. The Philosophy of "Estimated Accuracy"
In Quants, you don't always need ₹$12,456.78$; you might just need to know it's approximately ₹$12,500$.

### 1.1 The "Anchor" Technique
To calculate percentages faster, use anchors:
- **10%:** Move decimal one place left ($800 \rightarrow 80$).
- **5%:** Half of 10% ($40$).
- **1%:** Move decimal two places left ($8$).
*Example:* 16% of 800. $10\% + 5\% + 1\% = 80 + 40 + 8 = 128$.

---

## 2. Squaring and Multiplication Hacks
*   **Base 100 Multiplication:** $98 \times 97$.
    - Deviations: $-2$ and $-3$.
    - Multiply deviations $= 6$ (write as $06$).
    - Cross subtract: $98 - 3 = 95$ or $97 - 2 = 95$.
    - Result $= 9506$.
*   **Squares ending in 5:** $65^2$.
    - $6 \times 7 = 42$.
    - Suffix $25$.
    - Result $= 4225$.

---

## 3. Reciprocal Mastery for DI
Memorize these decimal equivalents to avoid division in the exam:
- $1/7 = 0.1428$
- $1/8 = 0.125$
- $1/9 = 0.111$
- $1/11 = 0.0909$
- $1/12 = 0.0833$
- $1/15 = 0.0666$

---

## 4. Digital Sum (Casting out 9s)
Useful for verifying large additions and multiplications.
If $A + B = C$, then (Digital Sum of A + Digital Sum of B) must equal (Digital Sum of C).
*Example:* $123 \times 11 = 1353$.
- $DS(123) = 6$.
- $DS(11) = 2$.
- $6 \times 2 = 12 \rightarrow DS = 3$.
- $DS(1353) = 1+3+5+3 = 12 \rightarrow DS = 3$. Correct!

---

## 5. Vedic Math: Split & Merge
To multiply $18 \times 45$:
Split into $(2 \times 9) \times 45 = 9 \times 90 = 810$.
Always look for a "Friendly Number" like 10, 50, or 100.

---

## 6. Approximation in Multi-Stage Sets
If Question asks $(128.56 \times 12.1) + 400.1$.
1. $130 \times 12 + 400 = 1560 + 400 = 1960$.
2. Check options. If they are $1955, 2500, 3000, 4000 \rightarrow$ Pick $1955$.

---

## 7. The Power of "n" for Large Roots
$\sqrt{4000}$?
- $60^2 = 3600$.
- $70^2 = 4900$.
- So $\sqrt{4000}$ is roughly 63 or 64.

---

## 8. Ratio Cross-Multiplication
Which is larger: $14/19$ or $13/18$?
- $14 \times 18 = 252$
- $19 \times 13 = 247$
**Result:** $14/19$ is larger.

---

## 9. Calendar Hacks (Logic Math)
- Any date $+7$ days is the same day.
- A non-leap year has **1 odd day**. (Jan 1, 2023 was Sunday $\rightarrow$ Jan 1, 2024 is Monday).

---

## 10. Mastery Drill: The Percentage Chain
**Problem:** Increase 50 by 20%, then decrease by 20%, then increase by 10%.
1. $50 \times 1.2 = 60$.
2. $60 \times 0.8 = 48$.
3. $48 \times 1.1 = 52.8$.
**Clat Tip:** Do NOT sum the percentages. $+20-20+10 \neq 10\%$.
`
  }
];


export const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Constitutional Morality vs. Public Morality',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'A deep dive into how the SC balances fundamental rights against social norms with reference to Navtej Singh Johar case.',
    date: 'Oct 24, 2025',
    readTime: '15 min',
    content: [
      "The concept of Constitutional Morality as defined in Navtej Singh Johar v. Union of India.",
      "Distinguishing between Popular Morality and Constitutional Morality.",
      "Application of the 'Golden Triangle' (Articles 14, 19, 21) in recent judicial reviews.",
      "Case Study: Sabarimala and the focus on individual dignity over group practices."
    ]
  },
  {
    id: '2',
    title: 'Contextual Clues in English Passages',
    type: 'Note',
    subject: 'English Language',
    description: 'Mastering the art of deducing vocabulary in long editorial passages without a dictionary.',
    date: 'Oct 22, 2025',
    readTime: '10 min',
    content: [
      "Identifying semantic triggers in editorial prose.",
      "The 'Substitution Technique' for unknown vocabulary.",
      "Analyzing the tone of 'The Hindu' vs 'The Indian Express' editorials.",
      "Practice Drill: Inferring the author's stance on socio-economic policy."
    ]
  },
  {
    id: '3',
    title: 'Syllogism: The 3-Statement Challenge',
    type: 'Passage',
    subject: 'Logical Reasoning',
    description: 'Advanced logical reasoning drills with complex Venn diagram solutions.',
    date: 'Oct 20, 2025',
    readTime: '12 min',
    content: [
      "Breaking down 3-statement categorical syllogisms.",
      "Solving 'Only a few' and 'None but' logical quantifiers.",
      "Venn Diagram strategy for multi-variable logic puzzles.",
      "Avoiding common fallacies: Undistributed Middle and Illicit Process."
    ]
  },
  {
    id: '4',
    title: 'Oct 2025: Geopolitical Analysis',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Summaries of the latest international summits and their impact on Indian foreign policy.',
    date: 'Oct 27, 2025',
    readTime: '20 min',
    month: 'October 2025',
    content: [
      "Analysis of G20 summit outcomes for 2025.",
      "Strategic energy partnerships discussed in the BRICS+ expansion.",
      "Implications of the latest climate accords on developing economies."
    ]
  },
  {
    id: '5',
    title: 'DI Masterclass: Pie Chart Analysis',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'A collection of high-yield data interpretation sets focusing on multi-variable pie charts and market share trends.',
    date: 'May 05, 2026',
    readTime: '25 min',
    content: [
      "SET 1: Book Cost Analysis (Pearson's Guide) - Printing (18%), Paper (16%), Editing (36%), Royalty (12%), Misc (10%), Proof-reading (8%).",
      "SET 2: Electronics Market Share (1995-2000) - 1995 ($2.3B): D(35%), E(20%), B(17%), A(16%), C(12%). 2000 ($3.7B): D(28%), A(19%), E(17%), B(14%), C(13%), F(9%).",
      "SET 3: Electricity Consumption (1993-94) - Industrial (40%), Agricultural (30%), Domestic (18%), Commercial (6%), Others (4%), Traction (2%).",
      "SET 4: University Demographics - Total Students (1250). Majors: Engineering (18%), Physics (18%), Math (16%), Chem (14%), Eco (12%), History (10%), Others (12%).",
      "SET 5: Physics Major Geographic Distribution - Kolkata (80), Chennai (40), Mumbai (36), Others (28), Hyderabad (23), Delhi (18). Total: 225 Students."
    ]
  },
  {
    id: '17',
    title: 'Corporate Revenue Analysis (2010-2014)',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Detailed analysis of division-wise revenue growth and y-o-y trends for Godliness Inc.',
    date: 'May 06, 2026',
    readTime: '20 min',
    content: [
      "2010 Revenue (Total 1000 Cr): S(30%), T(22.5%), R(17.5%), P(15%), Q(15%).",
      "2011 Incremental Revenue: Break-up of ADDED revenue - Q(30%), R(25%), S(20%), T(15%), P(10%).",
      "2012 Division Wise Changes: P(-40 Cr), Q(+10 Cr), R(-5 Cr), S(+10 Cr), T(0). Overall 2012 saw 2.727% decline.",
      "2014 Revenue Break-up (Total 1280 Cr approx): T(25%), S(25%), R(18.75%), P(12.5%), Q(18.75%).",
      "2014 individual YOY growth rates: T(28%), Q(20%), R(9.09%), P(6.67%), S(-8.57%)."
    ]
  },
  {
    id: '18',
    title: 'Comparative Family Budgeting',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Budgetary comparison between Family A (₹48k) and Family B (₹72k) across essential expenditure heads.',
    date: 'May 07, 2026',
    readTime: '15 min',
    content: [
      "Family A (Total ₹48,000): Food (25%), Misc (27%), Education (18%), Clothing (13%), Rent (12%), Light (5%).",
      "Family B (Total ₹72,000): Food (31%), Misc (19%), Education (18%), Clothing (18%), Rent (10%), Light (4%).",
      "Strategic Note: While Family B spends more in absolute terms on Food, Family A spends a higher relative percentage on Miscellaneous expenses."
    ]
  },
  {
    id: '6',
    title: 'Daily Summary: 28 April 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Key updates: Grassroots Biodiversity Project, DRDO Armoured Platforms, Knight Frank Wealth Report, and SAFF Women’s Championship.',
    date: 'Apr 28, 2026',
    readTime: '8 min',
    month: 'April 2026',
    content: [
      "DRDO Unveils Advanced Armoured Platforms (FICV).",
      "India Ranks 6th in Knight Frank Wealth Report 2026.",
      "Grassroots Biodiversity Project launched in Western Ghats.",
      "SAFF Women's Championship results and highlights."
    ]
  },
  {
    id: '7',
    title: 'Daily Summary: 29 April 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Critical updates: India-NZ FTA, SC on Right to Safe Road Travel (Art. 21), NITI Aayog Report on City Governance, and Skyroot Vikram-1 Launch.',
    date: 'Apr 29, 2026',
    readTime: '10 min',
    month: 'April 2026',
    content: [
      "India-New Zealand FTA signed in New Delhi: USD 20bn investment.",
      "Supreme Court declares 'Right to Safe Road Travel' part of Article 21.",
      "NITI Aayog releases 'Moving Towards Effective City Government' report.",
      "Skyroot Aerospace successfully flags off Vikram-1 rocket."
    ]
  },
  {
    id: '8',
    title: 'Daily Summary: 27 April 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Key highlights: RBI revokes PPBL license, Bharat Taxi launch, First UNESCO Chair on Gender Inclusion, and UNIDO GEM Award for Guntur.',
    date: 'Apr 27, 2026',
    readTime: '9 min',
    month: 'April 2026',
    content: [
      "RBI revokes Paytm Payments Bank license under BR Act 1949.",
      "Bharat Taxi: India's first cooperative-led ride-hailing app launched.",
      "UNESCO Chair on Gender Inclusion launched at Symbiosis, Pune.",
      "Guntur Municipal Corp wins UNIDO GEM Award 2026."
    ]
  },
  {
    id: '9',
    title: 'Daily Summary: 25 April 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Highlights: India-Maldives Rs 30bn Currency Swap, NASA’s Roman Space Telescope, RBI Forex Rule Easing, and Gen. Upendra Dwivedi’s induction into US Hall of Fame.',
    date: 'Apr 25, 2026',
    readTime: '11 min',
    month: 'April 2026',
    content: [
      "Rs 30 Billion Currency Swap approved for Maldives.",
      "NASA Unveils Nancy Grace Roman Space Telescope.",
      "RBI Eases Forex Rules for Banks regarding NDF.",
      "Gen. Upendra Dwivedi inducted into US Army War College Hall of Fame."
    ]
  },
  {
    id: '10',
    title: 'Daily Summary: 24 April 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Critical updates: India-Korea Digital Bridge, PMIS Expansion, 99th Ramsar Site (Shekha Jheel), and TDIP Scheme for 6G innovation.',
    date: 'Apr 24, 2026',
    readTime: '12 min',
    month: 'April 2026',
    content: [
      "South Korean President Lee Jae Myung's state visit to India (April 19–21, 2026): Launch of India-Korea Digital Bridge and setup of Industrial Cooperation Committee (ICC).",
      "PM Internship Scheme (PMIS) Expansion: Ministry of Corporate Affairs revises eligibility for final-year UG/PG students (18-25 years); Monthly stipend increased to ₹9,000.",
      "Shekha Jheel Bird Sanctuary declared India’s 99th Ramsar Site. UP now has 12 sites, while Tamil Nadu leads with 20.",
      "TDIP Scheme Guidelines (2026-31): ₹203 Crore outlay released by Ministry of Communications to accelerate 5G Advanced and 6G telecom standards.",
      "Justice Lisa Gill appointed as first woman Chief Justice of Andhra Pradesh High Court post-bifurcation.",
      "India-Sri Lanka Diving Exercise (IN-SLN DIVEX 2026): INS Nireekshak leads interoperability drills in Colombo.",
      "Pakistan tests indigenous 'Taimoor' anti-ship cruise missile (600km range) and China selects first Pakistani astronauts for Tiangong Space Station.",
      "Meghalaya launches CM-INSPIRE scheme: Provides financial incentives for UPSC aspirants clearing Prelims and Mains exams.",
      "Eveready Industries inaugurates India's first operating alkaline battery manufacturing unit in Samba, Jammu.",
      "World Book Day (23 April): UNESCO names Rabat as the 2026 World Book Capital."
    ]
  },
  {
    id: '11',
    title: 'CLAT Intelligence: April 20-23, 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'High-yield analysis: Barasingha ESZ Legal Impact, RBI Digital Payment Framework 2026, India-Sri Lanka Bilateral MoUs, and Goldman Environmental Prize.',
    date: 'Apr 23, 2026',
    readTime: '18 min',
    month: 'April 2026',
    content: [
      "LEGAL/ENV: MoEFCC notifies 408.7 sq. km around Barasingha WLS (UP) as ESZ to buffer biodiversity in Muzaffarnagar, Meerut, and Bijnor.",
      "BANKING: RBI's 'Digital Payments – E-mandate Framework 2026' mandates one-time AFA registration and stricter validity notifications for UPI/Cards.",
      "DIPLOMACY: VP C.P. Radhakrishnan visit to Sri Lanka results in doubling CEWET scholarships (350 to 700) and Sri Lanka joining International Big Cat Alliance (IBCA).",
      "INTERNATIONAL: 7th India-Bhutan Customs Meeting co-chaired by CBIC; Focus on pre-arrival data exchange and 'Operation Numkhor' (anti-smuggling).",
      "DEFENCE: MoD's ₹975 Cr TRAWL Assembly procurement from BEML; DRDO-developed systems for minefield breaching in T-72/T-90 tanks.",
      "TECH: IIT Ropar launches ANNAM.AI, India's first fully integrated Agricultural Intelligence Ecosystem for risk-managed smart farming.",
      "ADOPTION: FedEx & IIT-M trial intra-city drone delivery in Bengaluru; Reducing 60-min road transit to 21-min aerial flight.",
      "AWARDS: Six women win the 2026 Goldman Environmental Prize (Nigeria, S. Korea, UK, PNG, USA, Colombia) — a historic all-female cohort.",
      "SPORTS: Carlos Alcaraz and Aryna Sabalenka win Laureus 2026 Sportsman & Sportswoman of the Year in Madrid.",
      "LEADERSHIP: WEF names 10 Indians (including Isha Ambani and Jay Shah) to the Young Global Leaders Class of 2026."
    ]
  },
  {
    id: '95',
    title: 'Daily Summary: 30 April 2026',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'High-yield updates: Mission Saksham for UCBs, India Post-DTDC Logistics MoU, BHEL-DRDO Naval Tech, and International Jazz Day.',
    date: 'Apr 30, 2026',
    readTime: '10 min',
    month: 'April 2026',
    content: [
      "RBI launches 'Mission Saksham' to strengthen Urban Co-operative Banks (UCBs).",
      "Department of Posts & DTDC Express sign MoU for rural e-commerce logistics.",
      "BHEL & DRDO ink pact for indigenous Naval Gas Turbine-Infrared Suppression Systems.",
      "Flipkart & Axis Bank launch biometric authentication for card payments (OTP-free).",
      "International Jazz Day 2026: UNESCO identifies Chicago, USA as the Global Host City.",
      "World Day for Safety and Health at Work (28 April) focuses on psychosocial environments."
    ]
  },
  {
    id: '96',
    title: 'Mastering Idioms & Phrases',
    type: 'Note',
    subject: 'English Language',
    description: 'A comprehensive collection of high-frequency idioms and phrases essential for the CLAT English section.',
    date: 'May 01, 2026',
    readTime: '15 min',
    month: 'May 2026',
    content: [
      "**Contextual Usage:**\n- *Apple of one's eye*: Someone extremely precious or favorite.\n- *Dark Horse*: An unexpected winner or someone with hidden talents.\n- *Barking up the wrong tree*: Accusing the wrong person or pursuing a mistaken line of thought.\n- *Pot calling the kettle black*: A person criticizing someone for a fault they also possess (hypocrisy).",
      "**Key Categorized Idioms:**\n- **Arrangement**: *In apple-pie order* (perfectly arranged).\n- **Response**: *To pass the buck* (shift responsibility); *Turn the other cheek* (respond peacefully to aggression).\n- **Finance**: *Blue-blooded* (noble/wealthy birth); *Pay through the nose* (pay an exorbitant price).",
      "**Situational Idioms:**\n- *In deep water*: In a very difficult or dangerous situation.\n- *In the doldrums*: A state of stagnation or lack of progress.\n- *Light at the end of the tunnel*: A sign that a difficult period is coming to an end.\n- *A stitch in time saves nine*: Fixing a problem early prevents it from getting worse.",
      "**Color-Based Idioms:**\n- *Black and Blue*: Heavily bruised (physically or metaphorically).\n- *Green Fingers*: A natural talent for gardening.\n- *Red Herring*: A clue intended to be misleading or distracting.\n- *Out of the blue*: Suddenly and unexpectedly.\n- *White Lie*: A harmless or small lie told to avoid hurting feelings.",
      "**Exam Focus Tip:**\nCLAT often tests these through 'sentence completion' or 'phrase replacement'. Always look for the *tone* of the sentence to decide if the idiom should be positive or negative."
    ]
  },
  {
    id: '97',
    title: 'Legal Terminology & Conceptual Breakdown',
    type: 'Note',
    subject: 'English Language',
    description: 'Master the nuance of legal terms frequently used in Reading Comprehension and Legal Reasoning sections.',
    date: 'May 01, 2026',
    readTime: '12 min',
    month: 'May 2026',
    content: [
      "**Inheritance & Legitimacy (HMA 1955):**\n- *Void marriage*: Legally non-existent from the outset (e.g., bigamous).\n- *Voidable marriage*: Valid until annulled by a court (e.g., lack of consent).\n- *Legitimacy of Children*: Even in void marriages, children are considered 'legitimate' for inheritance purposes under Section 16 of the Hindu Marriage Act.",
      "**Digital Rights & Regulation:**\n- *Safe Harbor (Sec 79 IT Act)*: Protects intermediaries (social media) from liability for user-generated content, provided they follow 'due diligence'.\n- *DPDPA 2023*: The landmark Digital Personal Data Protection Act which balances individual data rights with reasonable government exemptions.",
      "**Judicial Access Terms:**\n- *Docket-excluded*: Segments of society (like the poor/marginalized) who cannot effectively access the legal justice system due to cost or awareness.\n- *Unlawful Activity*: Acts defined under UAPA that threaten the sovereignty or integrity of India.",
      "**Sociological Context:**\n- *Tyranny of Merit*: The concept that a strict focus on 'merit' can ignore systemic inequalities and create feelings of inadequacy among students.",
      "**Critical Reading Hack:**\nLook for words like 'notwithstanding', 'proviso', and 'annulment'. These often signal the shift from a general rule to a specific legal exception."
    ]
  },
  {
    id: '98',
    title: 'Generative AI: The Legal Frontier',
    type: 'Passage',
    subject: 'Logical Reasoning',
    description: 'An analytical passage on the impact of GenAI on productivity, regulation, and the need for indigenous AI models.',
    date: 'May 01, 2026',
    readTime: '18 min',
    month: 'May 2026',
    content: [
      "The rapid digitization of education has introduced Generative AI as both a tool for productivity and a risk for academic integrity.",
      "The G20 Leaders Summit highlighted the need for a global framework on AI governance, mirroring blueprints like those of the TRAI in India.",
      "A core challenge for India is the development of 'Indigenous Models' trained on local data points to reduce dependency on Western-centric LLMs.",
      "The legal battle over AI-generated artwork (copyright eligibility) remains a 'gray area' in both US and Indian judicial systems.",
      "Strategic Recommendation: Focus on 'Human-in-the-loop' systems where AI augments rather than replaces critical legal analysis."
    ]
  },
  {
    id: '12',
    title: 'The New Criminal Laws: BNS & BNSS Shift',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'A comprehensive guide to the transition from IPC/CrPC to Bharatiya Nyaya Sanhita and Bharatiya Nagarik Suraksha Sanhita.',
    date: 'Apr 30, 2026',
    readTime: '25 min',
    content: [
      "Redefining 'Sedition' under Section 150 of BNS: 'Acts endangering sovereignty, unity and integrity of India'.",
      "Introduction of Community Service as a new form of punishment for petty offences (Section 4(f)).",
      "BNSS mandates: Compulsory videography of searches/seizures and forensic reports for crimes with 7+ years of jail.",
      "Legal implications of the 'Preliminary Enquiry' timeline (14 days) in cases punishable with 3-7 years."
    ]
  },
  {
    id: '13',
    title: 'Electoral Bonds & Right to Information',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Analyzing the SC judgment that struck down the Electoral Bonds scheme and its focus on Article 19(1)(a).',
    date: 'Apr 28, 2026',
    readTime: '15 min',
    content: [
      "The 'Proportionality Test' applied by the SC to the Electoral Bonds Scheme.",
      "Balancing the right to know (voter) vs the right to privacy (donor).",
      "Critique of the 'Quid Pro Quo' argument and the risk of corporate influence on democracy.",
      "Impact on the Companies Act amendments regarding 7.5% profit cap on political donations."
    ]
  },
  {
    id: '14',
    title: 'NLU Entrance Strategy: The 120-Day Blueprint',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'A structural timeline for balancing comprehensive law readings with speed-based quantitative techniques.',
    date: 'May 01, 2026',
    readTime: '30 min',
    content: [
      "Phase 1 (Days 1-40): Conceptual Deep-Dives into Constitutional and Tort Law.",
      "Phase 2 (Days 41-80): Pattern Recognition and Inference-based Literacy training.",
      "Phase 3 (Days 81-110): Full-length simulations and Error Log diagnostics.",
      "Phase 4 (Days 111-120): Mental conditioning and strategic skip-patterns."
    ]
  },
  {
    id: '15',
    title: 'The AI Act 2026: Global Legal Implications',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Analyzing the upcoming framework for algorithmic accountability and liability in automated decision making.',
    date: 'May 02, 2026',
    readTime: '20 min',
    content: [
      "Risk-based classification of AI systems (Prohibited, High, Limited, Minimal).",
      "Assigning liability: Developer vs User vs Deployer legal friction.",
      "The 'Right to Explanation' for automated credit and employment decisions.",
      "Regulatory sandboxes and the balance with innovation in emerging economies."
    ]
  },
  {
    id: '16',
    title: 'Advanced Syllogism: Logic Chains',
    type: 'Note',
    subject: 'Logical Reasoning',
    description: 'Solving complex deductive puzzles involving four or more premises and conflicting qualifiers.',
    date: 'May 03, 2026',
    readTime: '15 min',
    content: [
      "Mapping logic chains: A -> B, B -> C, therefore A -> C (The Transitive Property).",
      "Dealing with 'Neither/Nor' and 'Either/Or' combined constraints.",
      "Identifying logical gaps in 'Assumption' type questions.",
      "The 'Negation Test' for strengthening and weakening arguments."
    ]
  },
  {
    id: '19',
    title: 'Foundations: Introduction to Indian Law',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'A comprehensive primer on the classification of law, sources of legislation, and the foundational principles of natural justice.',
    date: 'May 10, 2026',
    readTime: '22 min',
    content: [
      "1. NATURE OF LAW: Law is a set of rules and regulations created by the government to maintain societal order, prevent chaos, and protect individual rights and freedoms.",
      "2. CLASSIFICATIONS: Public Law (State vs. Citizens) vs. Private Law (Individual vs. Individual). Substantive Law (defines rights/crimes) vs. Procedural Law (defines the process of enforcement).",
      "3. THE THREE PILLARS: Legislature (Drafts & Amends), Executive (Implements & Oversees), and Judiciary (Interprets & Upholds). India follows a 'Separation of Powers' model.",
      "4. PRINCIPLES OF NATURAL JUSTICE: 'Audi Alteram Partem' (Right to be heard), 'Nemo Judex in Causa Sua' (No one should be a judge in their own case/Rule against Bias), and 'Reasoning Rule' (Right to know the reasons for a decision).",
      "5. SALIENT FEATURES OF THE CONSTITUTION: World's longest written constitution, Quasi-federal structure (Unitary bias), Single Citizenship, and Parliamentary form of government.",
      "6. SOURCES OF LAW: Custom (Long-standing practices), Judicial Precedent (Decisions by higher courts), and Legislation (Acts passed by Parliament/State legislatures)."
    ]
  },
  {
    id: 'case-1',
    title: 'Case Study: Negligence & Duty of Care (NLUD)',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Detailed analysis of duty of care in professional negligence and public duty scenarios.',
    date: 'May 03, 2026',
    readTime: '12 min',
    content: [
      "**PRINCIPLE**: Negligence is a legal wrong that is suffered by someone at the hands of another who has a duty to take care but fails to take proper care to avoid what a reasonable person would regard as a foreseeable risk.",
      "**FACTS (Soman vs Pamela)**: Soman, a student, fell in love with Pamela. Soman went into emotional crisis after rejection and confided in a psychologist, Dr. Surana. Soman expressed intentions to kill Pamela. Dr. Surana warned campus police but they briefly detained and released him. Soman murdered Pamela. Parents sued the police and the University for failure to confine Soman and failure to warn the victim.",
      "**LEGAL QUESTIONS**: 1. Was there a 'special relationship' imposing a duty to warn? 2. Should therapist-patient confidentiality yield to public safety? 3. Is the police department immune from suit for discretionary release?",
      "**JUDICIAL FOCUS**: The test of liability requires that the harm must be a reasonably foreseeable result of the defendant's conduct and a relationship of proximity must exist. Proximity here is weighed against the statutory immunity of public officials."
    ]
  },
  {
    id: 'case-2',
    title: 'Strict Liability: The Tiger Escape (Rylands v Fletcher)',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Applying the principle of Strict Liability to non-natural usage of land and dangerous animal custody.',
    date: 'May 03, 2026',
    readTime: '10 min',
    content: [
      "**PRINCIPLE**: When a defendant brings onto their land anything likely to do mischief if it escapes, they must do so at their own peril (Strict Liability). Liability arises regardless of negligence if the thing escapes and causes harm.",
      "**FACTS**: M decided to keep a tiger as a pet in his heavily guarded house. Neighbor S (whom M had never met) broke into M's house specifically to get 'hurt' and sue for damages. The tiger escaped during the break-in and mauled pedestrians near the house. Pedestrians sue M.",
      "**DEFENSE**: The defendant can avoid liability if the situation that caused damage was the result of an unforeseeable act of a stranger, or if the plaintiff was a trespasser (volenti non fit injuria).",
      "**ANALYSIS**: While pedestrians can claim against M because keep a tiger is a 'non-natural use', M might escape liability if he can prove the escape was caused solely by the stranger's intervention which could not be controlled."
    ]
  },
  {
    id: 'case-3',
    title: 'Contracts: Force Majeure & Supervening Events',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Analyzing the discharge of contracts during public health crises and the limits of epidemic clauses.',
    date: 'May 03, 2026',
    readTime: '14 min',
    content: [
      "**PRINCIPLE**: Both parties to a contract are discharged from obligations in situations where a supervening event significantly changes the nature of contractual rights. The event must not be a result of default by either party.",
      "**FACTS**: Vitoria (supplier) and H (restaurant owner) had a 2-year supply agreement. A clause stated: 'In case of interruption of operations on account of epidemics, pandemics... the contract will be suspended until the crisis is declared over'. A virus outbreak occurred. H refused to purchase materials 6 months AFTER the virus was cleared, arguing the business was ruined.",
      "**LEGAL ISSUE**: Does a 'Suspension' clause justify total 'Discharge'? The outbreak was a supervening event, but the contract contained a specific provision for it (suspension).",
      "**DECISION PATH**: Typically, if the contract contains a specific provision for the event, parties are governed by that provision. H might not be discharged if the contract only intended for temporary suspension."
    ]
  },
  {
    id: 'case-4',
    title: 'Obscenity: Hicklin vs Community Standards',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Tracing the evolution of the test for obscenity from the 1868 Hicklin test to modern standards.',
    date: 'May 03, 2026',
    readTime: '15 min',
    content: [
      "**HICKLIN TEST (Regina v Hicklin, 1868)**: The test is whether the tendency of the matter is to deprave and corrupt those whose minds are open to such immoral influences (e.g., children). It looks at isolated passages out of context.",
      "**COMMUNITY STANDARDS TEST**: Modern courts reject Hicklin in favor of the 'Community Standards' test, which judges the work as a whole based on contemporary social mores and the prevalent norms of the community.",
      "**FACTS**: A newspaper published a picture of a world-renowned tennis player posing with his dark-skinned fiancée, naked. The article attacked the 'Apartheid' system in the player's home country. Is it obscene?",
      "**LEGAL RULING**: According to modern standards, the picture must be seen in its context (political protest against racism). It is unlikely to deprave the community when the intent is social critique."
    ]
  },
  {
    id: 'case-5',
    title: 'Constitutional Law: Right to Life (Art 21)',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'The expansion of Article 21 from mere existence to a "life with dignity" and its impact on social welfare.',
    date: 'May 03, 2026',
    readTime: '18 min',
    content: [
      "**ARTICLE 21**: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.'",
      "**EXPANSION**: The Supreme Court has expanded Art 21 to include: Right to healthy environment, Right to privacy, Right to healthcare, and Right to free legal aid for the poor.",
      "**FOOD SECURITY**: In landmark judgments, the Court held that people who are starving have the right to get food under Article 21. States must provide food free of cost to those in acute distress, using surplus grains in godowns.",
      "**PDS REFORM**: The Court directed States to make surplus food grains available to avoid starvation and malnourishment, linking the PDS system directly to the fundamental right to life."
    ]
  },
  {
    id: 'case-6',
    title: 'Criminal Identification Act, 2022',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Understanding the power of Magistrates to direct measurement of samples and the scope of privacy.',
    date: 'May 03, 2026',
    readTime: '11 min',
    content: [
      "**ACT**: The Criminal Procedure (Identification) Act, 2022 empowers police and central investigating agencies to collect, store, and analyze measurements (fingerprints, palm-prints, iris scans, etc.) of arrested persons.",
      "**RULES**: Rules notified by the MHA specify that measurements of those detained under preventive sections of CrPC shall NOT be taken unless the person is charged in connection with another offense.",
      "**JUDICIAL SCOPE**: A Magistrate can empower the police to take measurements or blood samples if it helps in the investigation of a crime. Refusal to provide samples when ordered is a violation of the Act.",
      "**FACTS (Bhargesh case)**: Bhargesh was arrested on suspicion of minor thefts. He refused fingerprints. Later, he was accused of beating a neighbor. The Magistrate ordered blood samples. Bhargesh claims invasion of privacy."
    ]
  },
  {
    id: 'case-7',
    title: 'Surrogacy (Regulation) Act, 2021',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Analyzing the eligibility criteria for intending couples and the restriction to altruistic surrogacy.',
    date: 'May 03, 2026',
    readTime: '13 min',
    content: [
      "**ELIGIBILITY**: Under the SRA 2021, an 'intending couple' must be legally wedded infertile Indian citizens. Husband: 26-55 years, Wife: 23-50 years.",
      "**SURROGATE**: Must be a close relative, married with a child of her own, aged 25-35, and can be a surrogate only once in her life.",
      "**RESTRICTION**: Commercial surrogacy is strictly banned. Only 'altruistic surrogacy' is allowed, where no charges except medical expenses and insurance are paid.",
      "**FACTS**: Joseph (40) and Neena (42) have been married for 8 years but remain infertile. Their daughter Maya has Striker's Syndrome. They seek surrogacy. Is the case eligible?"
    ]
  },
  {
    id: 'strategy-1',
    title: 'CLAT 2024: Cracking the "Tone" Questions',
    type: 'Strategy',
    subject: 'English Language',
    description: 'A masterclass on identifying authorial intent and shifting tones in long passages.',
    date: 'May 03, 2026',
    readTime: '8 min',
    content: [
      "**1. THE INITIAL ANCHOR**: Read the first paragraph to identify the 'Mood'. Is it clinical, nostalgic, or critical?",
      "**2. LOOK FOR VOLT-FACES**: Identify words like 'However', 'Nevertheless', or 'Conversely'. These usually signal a shift from a neutral description to a subjective critique.",
      "**3. METAPHORICAL REASONING**: In the 2020-2024 papers, authors use metaphors (like 'rose-colored glasses') to subtly hint at bias. Don't take descriptions at face value.",
      "**4. ELIMINATION TECHNIQUE**: If an option uses extreme words like 'Totally', 'Always', or 'Never', it is likely incorrect unless explicitly supported by the text."
    ]
  },
  {
    id: 'const-1',
    title: 'The Doctrine of Basic Structure',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'From Kesavananda Bharati to modern applications - the limits of Parliament’s power.',
    date: 'May 05, 2026',
    readTime: '15 min',
    content: [
      "**PRINCIPLE**: The Power of Judicial Review is a part of the basic structure. Parliament can amend the Constitution but cannot touch its basic features (Democracy, Secularism, Federalism).",
      "**LANDMARK**: *Kesavananda Bharati v. State of Kerala (1973)* established that Art 368 does not enable Parliament to alter the basic structure.",
      "**APPLICATION**: Any law (like the 39th Amendment or 42nd Amendment) that attempts to oust the jurisdiction of the Supreme Court or High Courts can be struck down as unconstitutional.",
      "**FACTS**: Parliament proposes an amendment to limit the power of appeal against sedition convictions only to the Supreme Court, removing High Court jurisdiction."
    ]
  },
  {
    id: 'data-1',
    title: 'CLAT Quant: Prison Statistics Analysis',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'A data caselet based on state-wise prison occupancy and undertrial population (NCRB Data).',
    date: 'May 05, 2026',
    readTime: '10 min',
    content: [
      "**DATA TABLE**: \n| State | Total Capacity | Current Occupancy | Undertrials |\n|-------|----------------|-------------------|--------------|\n| UP    | 65,000         | 1,12,000          | 85,000       |\n| MP    | 22,000         | 48,000            | 32,000       |\n| DL    | 12,000         | 19,000            | 14,000       |",
      "**QUESTION 1**: What is the percentage of undertrials in UP current occupancy? (Round to nearest integer).",
      "**QUESTION 2**: Which state has the highest occupancy rate relative to its capacity?",
      "**RATIO FOCUS**: Calculate the ratio of convict to undertrial in Delhi vs MP."
    ]
  },
  {
    id: 'agri-revolutions',
    title: 'Agricultural Revolutions in India',
    type: 'Data Set',
    subject: 'Current Affairs & GK',
    description: 'Summary of major green and color revolutions and their pioneers.',
    date: 'May 03, 2026',
    readTime: '8 min',
    content: [
      "**GREEN REVOLUTION**: Food Grains Production (1966-67). Father: M.S. Swaminathan.",
      "**WHITE REVOLUTION**: Milk Production (1970-71). Father: Verghese Kurien (Operation Flood).",
      "**BLUE REVOLUTION**: Fish and Marine Products (1972-73). Father: Prof. Heera Lal Chaudhury.",
      "**YELLOW REVOLUTION**: Oil Seed Production (1986-87). Father: Sam Pitroda (Technology Mission on Oil Seeds)."
    ]
  },
  {
    id: 'hist-landmark',
    title: 'History: Landmarks of Freedom Struggle',
    type: 'Data Set',
    subject: 'Current Affairs & GK',
    description: 'Vital facts on Indian National Congress, Swaraj, and Revolutionary movements.',
    date: 'May 03, 2026',
    readTime: '15 min',
    content: [
      "**INC FOUNDATION**: Founded in 1885 by A.O. Hume. First President: W.C. Bonnerjee.",
      "**POORNA SWARAJ**: Resolution adopted in 1929 Lahore Session (J.L. Nehru). Jan 26, 1930 was first Independence Day.",
      "**JALLIANWALA BAGH**: April 13, 1919. General Dyer ordered fire on a peaceful crowd. Michael O'Dwyer was Lt. Governor.",
      "**RENAISSANCE**: Raja Rammohan Roy is the Father of Indian Renaissance. Founded Brahmo Samaj."
    ]
  },
  {
    id: 'geo-essentials',
    title: 'Geography: Indian Terrain & Resources',
    type: 'Data Set',
    subject: 'Current Affairs & GK',
    description: 'Essential geographical stats for competitive exams including rainfall, rivers, and energy.',
    date: 'May 03, 2026',
    readTime: '12 min',
    content: [
      "**BLACK GOLD**: Common name for Coal in India due to its economic utility.",
      "**SOLAR CYCLE**: A period of approximately 11 years between activity peaks.",
      "**RIVERS**: Punjab is known as the Land of Five Rivers. Yarlung Zangbo is the Tibetan name for Brahmaputra.",
      "**RAIN**: Leh (Ladakh) receives the lowest average annual rainfall in India."
    ]
  },
  {
    id: 'legal-maxims-set',
    title: 'High-Yield Legal Maxims',
    type: 'Data Set',
    subject: 'Legal Reasoning',
    description: 'Core Latin phrases and maxims essential for the Legal Reasoning section.',
    date: 'May 04, 2026',
    readTime: '20 min',
    content: [
      "**DE FACTO**: Means 'In fact' or 'all the facts'. Contrast with De Jure.",
      "**RATIO DECIDENDI**: The 'reason for the decision'. The binding part of a judgment.",
      "**OBITER DICTA**: Incidental marks in a judgment; not binding.",
      "**SINE DIE**: Adjourned 'without a day' being fixed for the next meeting.",
      "**TABULA RASA**: A 'clean slate' or mind without prior impressions.",
      "**CAVEAT VENDITOR**: 'Seller beware'. Contrast with Caveat Emptor (Buyer beware).",
      "**MALUS ANIMUS**: Bad intention."
    ]
  },
  {
    id: 'ga-world-firsts',
    title: 'GA: World & Indian Firsts',
    type: 'Data Set',
    subject: 'Current Affairs & GK',
    description: 'A collection of "firsts" in history and geography as per competitive patterns.',
    date: 'May 04, 2026',
    readTime: '15 min',
    content: [
      "**FIRST WOMAN PM**: Sirimavo Bandaranaike (Sri Lanka) was the world's first female Prime Minister.",
      "**INA FOUNDATION**: Founded in 1941 (Rash Behari Bose) and reorganized by SC Bose in 1943.",
      "**FORMOSA**: The former name of Taiwan.",
      "**AJEET BAJAJ**: The first Indian to ski to the North Pole.",
      "**KANCHAN CHOUDHARY**: The first woman Director-General of Police (DGP) in India."
    ]
  },
  {
    id: 'legal-lexicon-v2',
    title: 'Legal Vocabulary & General Mastery',
    type: 'Data Set',
    subject: 'Legal Reasoning',
    description: 'Advanced Latin phrases and legal maxims for CLAT excellence.',
    date: 'May 04, 2026',
    readTime: '18 min',
    content: [
      "**AUDI ALTERAM PARTEM**: No one shall be condemned unheard.",
      "**ANIMUS POSSIDENDI**: Intent to possess.",
      "**CAVEAT VENDITOR**: Seller beware (contrast with Caveat Emptor).",
      "**CORPUS DELICTI**: Evidence which constitutes an offence.",
      "**DE JURE**: Concerning law (contrast with De Facto)."
    ]
  },
  {
    id: 'english-mastery-spelling',
    title: 'Vocabulary: Common Error Words & Spellings',
    type: 'Data Set',
    subject: 'English Language',
    description: 'High-frequency spelling errors and vocabulary refinement.',
    date: 'May 04, 2026',
    readTime: '15 min',
    content: [
      "**ACCOMMODATE**: Double 'c' and double 'm'. Common error: 'accomodate'.",
      "**OCCASION**: Double 'c', single 's'. Common error: 'occassion'.",
      "**SPELLING MASTERY**: Focus on words like 'Aborigines', 'Adolescent', 'Belligerent', and 'Cacophony'.",
      "**ANAGRAMS**: Words formed by rearranging letters (e.g., 'Listen' -> 'Silent')."
    ]
  },
  {
    id: 'legal-phrases-v3',
    title: 'Legal Glossary: Philology & Context',
    type: 'Data Set',
    subject: 'Legal Reasoning',
    description: 'Advanced legal terminology extracted from recent DU LLB and CLAT patterns.',
    date: 'May 04, 2026',
    readTime: '15 min',
    content: [
      "**SUB-JUDICE**: A case currently under consideration by a court of law.",
      "**SUB-POENA**: A writ ordering a person to attend a court.",
      "**VIVA VOCE**: Orally; by word of mouth.",
      "**ULTRA VIRES**: Beyond the powers. (Opposite: Intra Vires).",
      "**EX-GRATIA**: Payment made out of gratitude or moral obligation, not legal duty."
    ]
  },
  {
    id: 'grammar-fix-set',
    title: 'English: Prepositions & Idioms',
    type: 'Data Set',
    subject: 'English Language',
    description: 'Correction of common prepositional errors and high-yield idioms.',
    date: 'May 04, 2026',
    readTime: '12 min',
    content: [
      "**ENDOWED WITH**: Kanak is endowed **with** many great qualities.",
      "**PERTINENT TO**: Give an example pertinent **to** the case.",
      "**DISPENSE WITH**: I must dispense **with** your services.",
      "**MAKE HAY**: Make **hay** while the sun shines (proverb).",
      "**TO COOL ONE'S HEELS**: To keep someone waiting."
    ]
  },
  {
    id: 'english-grammar-usage',
    title: 'English: Prepositional Mastery & Grammar',
    type: 'Data Set',
    subject: 'English Language',
    description: 'Vital prepositional usage and grammatical error patterns from competitive papers.',
    date: 'May 04, 2026',
    readTime: '22 min',
    content: [
      "**Gropes FOR**: A good judge never gropes **for** the conclusion.",
      "**Delve INTO**: Religious leaders should not delve **into** politics.",
      "**Surprised AT**: Don't be surprised **at** and think like that.",
      "**Endowed WITH**: Kanak is endowed **with** many great qualities.",
      "**Across THE RIVER**: The noise comes from **across** the river.",
      "**Common Error**: Use of 'among' vs 'between'. Between for two, among for more than two."
    ]
  },
  {
    id: 'legal-doctrines-v4',
    title: 'Administrative Law & Writ Mastery',
    type: 'Data Set',
    subject: 'Legal Reasoning',
    description: 'Deep dive into Mandamus, Certiorari, and Administrative principles.',
    date: 'May 04, 2026',
    readTime: '25 min',
    content: [
      "**MANDAMUS**: A command issued to a public authority to do something.",
      "**CERTIORARI**: To be certified. Issued to quash an order already passed by a lower court/tribunal.",
      "**ADMINISTRATIVE PRINCIPLE**: 'Delegatus non potest delegare' (A delegate cannot further delegate).",
      "**OMBUDSMAN**: An official who looks into complaints against public authorities."
    ]
  },
  {
    id: 'quants-formula-mastery',
    title: 'High-Yield Quants: Formulas & Shortcuts',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Essential formulas for Speed-Distance-Time, Mensuration, and Data Interpretation.',
    date: 'May 04, 2026',
    readTime: '15 min',
    content: [
      "**AVERAGE SPEED**: Total Distance / Total Time. If distances are equal, $2xy / (x+y)$.",
      "**RATIO & AGES**: If Father's age is $3x$ and Daughter's is $x$, and 5 years ago it was $4:1$, solve $(3x-5)/(x-5) = 4/1$.",
      "**MENSURATION**: Area of circle $= \\pi r^2$; Circumference $= 2\\pi r$. Volume of Sphere $= (4/3)\\pi r^3$.",
      "**REMAINDERS**: Least number divisible by $L, M, N$ leaving remainder $R$ is $LCM(L, M, N) + R$.",
      "**PERCENTAGE PROFIT**: (Gain / CP) * 100. Useful for 'marking up' and 'discount' problems."
    ]
  },
  {
    id: 'di-caselet-patterns',
    title: 'DI: Logical Caselet Patterns',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Standard patterns for caselet sets involving sets, Venn diagrams, and tabular data.',
    date: 'May 04, 2026',
    readTime: '12 min',
    content: [
      "**VENN DIAGRAMS**: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$. Crucial for 'Both' and 'Only' questions.",
      "**TABULAR ANALYSIS**: Focus on 'Incremental Growth' vs 'Total Growth'.",
      "**PROPORTION DRILLS**: Comparing market shares of companies over a 5-year period (e.g., 1995 vs 2000 patterns)."
    ]
  },
  {
    id: 'case-8',
    title: 'Intellectual Property: Patents & TRIPS',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Deconstructing the Trade-Related Aspects of Intellectual Property Rights (TRIPS) and Patent Evergreening.',
    date: 'May 03, 2026',
    readTime: '10 min',
    content: [
      "**TRIPS AGREEMENT**: Forms part of the WTO. It aims to harmonize IPR regimes globally. India is a member and has adjusted its patent laws accordingly.",
      "**PATENT EVERGREENING**: Refers to the practice of companies extending their patent protection by making minor, incremental improvements to existing products (common in pharma). Indian law restricts this to prevent monopolies.",
      "**COPYRIGHT DURATION**: Under Indian law, copyright generally subsists for the life of the author plus 60 years from the year succeeding their death.",
      "**GI TAGS**: Geographical Indications identify a product as originating in a specific territory where its quality or reputation is attributable to its origin (e.g., Basmati rice)."
    ]
  },
  {
    id: 'un-special',
    title: 'International Law: UN specialized Agencies',
    type: 'Data Set',
    subject: 'Current Affairs & GK',
    description: 'A comprehensive map of UN organs, headquarters, and their mandates as per latest exam patterns.',
    date: 'May 03, 2026',
    readTime: '15 min',
    content: [
      "**UNESCO**: Headquarters in Paris, France. Focuses on education, science, and culture.",
      "**WHO & ILO**: Both headquartered in Geneva, Switzerland. ILO is one of the oldest agencies (est. 1919).",
      "**ICJ (World Court)**: Situated at The Hague, Netherlands. Judges are elected for a term of 9 years.",
      "**SECURITY COUNCIL**: 5 Permanent Members (P5) with veto power: China, France, Russia, UK, USA. 10 non-permanent members elected for 2-year terms."
    ]
  },
  {
    id: 'legis-2023',
    title: 'Legislative Update: 2023 Meta-Summary',
    type: 'Note',
    subject: 'Current Affairs & GK',
    description: 'Critical analysis of the DPDPA, PRP Bill, and Telecom Act of 2023.',
    date: 'May 03, 2026',
    readTime: '12 min',
    content: [
      "**DPDPA 2023**: Digital Personal Data Protection Act focuses on the processing of personal data. Defines 'Data Principal' and 'Data Fiduciary'. Grants extensive exemptions to the government for national security.",
      "**PRP BILL 2023**: Press and Registration of Periodicals Bill simplifies the registration of magazines but grants 'specified authorities' the power to enter premises and cancel registrations in case of terrorist acts.",
      "**TELECOM ACT 2023**: Replaces the telegraph-centric laws. Empowers the government to take control of telecom networks during public emergencies or in the interest of public safety."
    ]
  },
  {
    id: '20',
    title: 'Legal Maxims & Constitutional Doctrines',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'An essential glossary of Latin legal maxims across Civil and Criminal law, paired with the core doctrines of the Indian Constitution.',
    date: 'May 12, 2026',
    readTime: '28 min',
    content: [
      "1. TORTS & CONTRACTS MAXIMS: 'Caveat Emptor' (Buyer beware), 'Ubi Jus Ibi Remedium' (Where there is a right, there is a remedy), 'Volenti Non Fit Injuria' (To a willing person, no injury is done), and 'Damnum Sine Injuria' (Damage without legal injury).",
      "2. CRIMINAL LAW FUNDAMENTALS: 'Mens Rea' (Guilty mind) and 'Actus Reus' (Guilty act). The maxim 'Actus non facit reum nisi mens sit rea' implies that an act does not make one guilty unless there is a guilty intention.",
      "3. GENERAL LEGAL TERMS: 'Amicus Curiae' (Friend of the court), 'De Jure' (By law/Rightful), 'De Facto' (In fact/Reality), 'Suo Motu' (On its own motion), and 'Locus Standi' (Right to be heard).",
      "4. DOCTRINE OF PITH AND SUBSTANCE: Used to determine which list a piece of legislation falls into by looking at its 'true nature' rather than its incidental effects on other subjects.",
      "5. DOCTRINE OF SEVERABILITY: If a portion of a law is unconstitutional, only that specific part is declared void, provided it can be separated from the valid parts without making the law unworkable.",
      "6. DOCTRINE OF ECLIPSE: A law that violates fundamental rights remains 'overshadowed' or dormant. It is not dead and can be revived if the constitutional restriction is later removed.",
      "7. DOCTRINE OF REPUGNANCY (Art 254): In case of a direct conflict between Central and State laws on a Concurrent List subject, the Central law prevails.",
      "8. DOCTRINE OF COLOURABLE LEGISLATION: Based on the maxim 'What cannot be done directly, cannot be done indirectly.' It prevents legislatures from bypassing their jurisdictional limits."
    ]
  },
  {
    id: '21',
    title: 'Ecology & Federalism: National Parks',
    type: 'Passage',
    subject: 'English Language',
    description: 'A critical analysis of the jurisdictional challenges in protecting national parks from external environmental threats.',
    date: 'May 14, 2026',
    readTime: '20 min',
    content: [
      "1. CONTEXT: National parks are increasingly threatened by activities outside their boundaries (timber harvesting, ranching, energy exploration) which the Park Service lacks jurisdiction to regulate.",
      "2. PROPOSED SOLUTIONS: Broadening federal powers over adjacent lands vs. granting states a more significant role in federal park management policy.",
      "3. POLICY GAP: State legislatures often fail to address whether states should protect park wildlife, and coordinated planning between agencies is frequently non-existent.",
      "4. CONSTITUTIONAL LIMITS: Under the 'Supremacy Clause', federal laws supersede state actions if they conflict, but state participation remains necessary for effective wildlife protection.",
      "5. AUTHOR'S STANCE: Local participation is crucial but should not dictate national policy or be used as a pretext to ignore wider regional threats."
    ]
  },
  {
    id: 'passage-covid',
    title: 'Remote Learning: The Digital Divide',
    type: 'Passage',
    subject: 'English Language',
    description: 'Analyzing the impact of the COVID-19 pandemic on the education system and the emergence of the "Digital Divide".',
    date: 'May 03, 2026',
    readTime: '15 min',
    content: [
      "1. EMERGENCY TRANSITION: The sudden shift to online mode due to COVID-19 forced schools to adopt tools like Zoom and Google Hangouts, highlighting the resilience of the educational sector.",
      "2. THE EQUITY GAP: A significant number of students lacked high-speed internet or suitable devices, leading to a 'Digital Divide' where access to learning became a privilege of the wealthy.",
      "3. PSYCHOSOCIAL IMPACT: Excessive screen time and a lack of peer interaction have been identified as contributors to social anxiety and a decline in student mental health.",
      "4. PEDAGOGICAL SHIFT: Teachers were required to develop new instructional designs for 'virtual classrooms' while managing students who were often distracted by their home environments.",
      "5. POST-PANDEMIC FUTURE: Experts suggest that while digital learning is here to stay, it must be integrated with 'Human-in-the-loop' systems to ensure holistic development."
    ]
  },
  {
    id: 'passage-wfh',
    title: 'The Work-from-Home Shift: A City Planning Perspective',
    type: 'Passage',
    subject: 'English Language',
    description: 'Deconstructing the long-term impacts of WFH on urban infrastructure and the "routine culture" of modern society.',
    date: 'May 03, 2026',
    readTime: '12 min',
    content: [
      "1. URBAN EVOLUTION: The mass adoption of WFH has the potential to reduce traffic congestion and pressure on city-center public transport systems.",
      "2. CENTRAL BUSINESS DISTRICTS: If firms continue to sub-lease or empty office buildings, cities may face a loss of commercial tax revenue and a decline in street-level economies.",
      "3. RE-ZONING NEEDS: Urban planners are considering converting abandoned office blocks into affordable residential units or co-working spaces in residential zones.",
      "4. PRODUCTIVITY DEBATE: Critics argue that the routine culture of the home environment does not always benefit society, citing blurred lines between professional and personal life.",
      "5. INFRASTRUCTURE SHIFT: The need for high-speed digital infrastructure has superseded the need for physical highways in many developed economic models."
    ]
  },

  {
    id: '22',
    title: 'Industrialization & National Identity',
    type: 'Passage',
    subject: 'English Language',
    description: 'Exploring the 19th-century American perception of railroads as both a symbol of progress and a "mysterious monster."',
    date: 'May 15, 2026',
    readTime: '18 min',
    content: [
      "1. RAILROAD AS SYMBOL: In the 1850s, the locomotive typified material progress, wealth, refinement, and the 'executive energy' of a high civilization.",
      "2. THE DARK SIDE: To many, the large and dangerous engine was a 'monster' threatening the country's founded Jeffersonian agrarian principles.",
      "3. THE 'IRON HORSE' METAPHOR: This specific phrasing was adopted to make alien steam technology seem ordinary, understandable, and less frightening to the public.",
      "4. UNIFYING FORCE: Ralph Waldo Emerson viewed locomotives as 'enormous shuttles' binding diverse national threads into one web, acting as a vital political aid to hold North America together.",
      "5. PHRONTISTERY: The passage discusses how promoters used the steam engine as a metaphor for what they thought Americans were becoming: youthful, powerful, and persistent."
    ]
  },
  {
    id: '23',
    title: 'Journalism & Political Transparency',
    type: 'Passage',
    subject: 'English Language',
    description: 'A critique of the complex relationship between media leaks, government secrets, and their impact on international diplomacy.',
    date: 'May 16, 2026',
    readTime: '22 min',
    content: [
      "1. THE LEAK PROBLEM: Sensitive information flows from gov to press can preclude serious discussion, making leaders and foreign diplomats unwilling to speak their minds.",
      "2. INTELLECTUAL CHALLENGE: The author questions if leaders should be restricted to 'handfuls of people who trust each other' or if a larger, richer variety of ideas is safer.",
      "3. MEDIA CREDIBILITY: Until recently, journalists were seen as more reliable than the government, but media scandals have led to public ambivalence and skepticism.",
      "4. POLITICAL MOTIVES: Leaks are often part of a 'Washington political power game' where 'leakers' curry favor with the media or try to plant info to influence specific policies.",
      "5. ACCOUNTABILITY: The author argues that the media must be held accountable and must be forced to 'earn the public's trust' rather than just demanding it."
    ]
  },
  {
    id: '24',
    title: 'Corporate Strategy & Economic Decline',
    type: 'Passage',
    subject: 'English Language',
    description: 'Analyzing the post-WWII decline of American corporate dominance and the various blame-attribution theories.',
    date: 'May 17, 2026',
    readTime: '25 min',
    content: [
      "1. HISTORICAL CONTEXT: Post-WWII, American business had undisputed control, but by the mid-1960s, advantage was losing ground to foreign competition.",
      "2. THE BLAME GAME: Early analysts blamed government restrictions; later ones blamed 'predatory corporate raiders' or an unpatriotic workforce.",
      "3. THE REALITY OF COSTS: Despite management blaming high wages, labor costs typically account for less than 15% of a product's total cost.",
      "4. STRATEGIC ERRORS: Over-concentration on high-tech products while ignoring the 'sensible approach' of foreign firms who dominated low-tech mass production first.",
      "5. LONG-RANGE PLANNING: US firms have often preferred fast profits through mergers and acquisitions rather than investing in modernizing their own facilities."
    ]
  },
  {
    id: '25',
    title: 'First Amendment: Media Access & Debates',
    type: 'Passage',
    subject: 'English Language',
    description: 'A legal examination of the "pool" coverage system in presidential debates and its potential violation of free press mandates.',
    date: 'May 18, 2026',
    readTime: '20 min',
    content: [
      "1. DEBATE INFLUENCE: Candidate performance in televised debates is often the most persuasive factor for voters, augmented by thorough media coverage.",
      "2. POOL VS. UNILATERAL: 'Pool' coverage involves sharing one news organization's feed due to space/safety, whereas 'unilateral' allows each org to cover independently.",
      "3. CONSTITUTIONAL CONCERN: The author argues the pool system violates the First Amendment as it denies broadcasters the right to convey unique accounts to their viewers.",
      "4. SUPREME COURT VIEW: The right of viewers and listeners to receive a 'free flow of information' is paramount, not necessarily the convenience of the broadcasters or sponsors.",
      "5. PROPOSED SOLUTION: Dividing television media into four categories (domestic networks, foreign services, etc.) to ensure viewers benefit from diverse perspectives."
    ]
  },
  {
    id: '26',
    title: 'Advanced DI: Agricultural & Exam Analytics',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'A comprehensive collection of table-based and graphical DI sets including crop production trends and educational pass-rate analysis.',
    date: 'May 20, 2026',
    readTime: '30 min',
    content: [
      "SET 1: Rice Production (Tonnes 2006-09) - 2006: [UP: 5.6, AP: 4.7, PB: 3.8]. 2007: [UP: 3.7, AP: 5.2, PB: 7.4]. 2008: [UP: 4.6, AP: 8.0, PB: 5.9]. 2009: [UP: 7.3, AP: 6.5, PB: 3.1].",
      "SET 2: School Performance (2010-14) - 2010 App/Pass: A(600/350), B(450/250), C(520/350), D(580/460), E(620/500). 2014 App/Pass: A(680/450), B(500/380), C(580/480), D(640/520), E(680/580).",
      "SET 3: Fertilizer Production (Lakh Tonnes 2012) - April: Co.I(310), Co.IV(137). August: Co.I(327), Co.IV(178). Set focuses on identifying companies with 'Continuous Increase' vs 'Fluctuating Trends'.",
      "SET 4: Electric Lamps Sales (Thousands 2009-14) - 2009: 48k, 2010: 40k, 2011: 30k, 2012: 25k, 2013: 18k, 2014: 40k (Significant rebound observed).",
      "SET 5: Consumer Price Index (Jan-July 2012) - Jan(340), Feb(330), Mar(370), Apr(340), May(350), June(370), July(380). Highest absolute difference observed between Feb-Mar."
    ]
  },
  {
    id: '27',
    title: 'Logic Lab: Ranking & Time Sequences',
    type: 'Passage',
    subject: 'Logical Reasoning',
    description: 'Mastering ranking positions, circular arrangements, and complex calendar calculations with step-by-step logic.',
    date: 'May 22, 2026',
    readTime: '25 min',
    content: [
      "1. RANKING FUNDAMENTALS: To find the total number of people in a row: (Rank from Left + Rank from Right - 1). Example: If A is 15th from left and 9th from right, total = 15+9-1 = 23.",
      "2. POSITION INTERCHANGE: When two people swap positions, use the new position of one person and the old position of the other to find the total strength of the row.",
      "3. CIRCULAR ARRANGEMENTS: Visualizing opposite pairs. Example: If 8 people are sitting in a circle, the person opposite to the 1st person is the 5th (1 + n/2).",
      "4. CALENDAR LOGIC: Calculating days between dates. Leap year check (2008 has 29 days in Feb). 51 days = 7 weeks and 2 days (use odd days to shift the day of the week).",
      "5. TIME SEQUENCES: Deductive logic for intervals. If a bell rings every 45 mins and the last was 5 mins ago, the next is in 40 mins. Calculating backward from a known reference point.",
      "6. SEQUENCE DRILLS: Identifying pairs of digits in a number that have as many digits between them in the number as in the ascending series (e.g., in 421579368, pairs are 12, 49, 16)."
    ]
  },
  {
    id: '28',
    title: 'Legal Practice: Equality & Classification',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'A deep-dive into the Supreme Court jurisprudence regarding reasonable classification on the basis of educational qualification for promotions.',
    date: 'May 24, 2026',
    readTime: '22 min',
    content: [
      "1. VALID GROUNDS: The Supreme Court has held that educational qualification is a valid ground for classification between persons of the same class in matters of promotion (Articles 14 & 16).",
      "2. THE NEXUS TEST: Any classification must not produce 'artificial inequalities'. It must be founded on a reasonable basis and bear a nexus to the object (e.g., administrative efficiency).",
      "3. JUDICIAL RESTRAINT: Courts cannot replace the wisdom of the legislature or its delegate with their own 'mathematical evaluation' of the basis of classification.",
      "4. EXCLUSIONARY POWER: Educational qualification may be used to introduce quotas or even restrict promotion entirely to one class (e.g., Degree holders vs Diploma holders).",
      "5. CLINICAL CASE: Promotion of Assistant Engineers in Kolkata Municipal Corp was upheld as valid, provided the differentiation served to increase efficiency at higher posts."
    ]
  },
  {
    id: '29',
    title: 'Constitutional Duty: Rights of the Mentally Ill',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Analyzing the Bombay High Court directives on the vaccination and protection of "floating populations" like mentally-ill homeless wanderers.',
    date: 'May 25, 2026',
    readTime: '25 min',
    content: [
      "1. FLOATING POPULATION: The court emphasizes that state responsibility extends beyond inmates in psychiatric institutions to reaching those 'found wandering in the community'.",
      "2. THE BETTER AFFIDAVIT: Courts require specific, granular data on how many homeless persons are identified and vaccinated, rather than mere procedural summaries.",
      "3. CONSENT PROTOCOLS: For persons of unsound mind, the state must seek to unite them with families for consent or establish clear SOPs for vaccination if no family is found.",
      "4. SECTION 100 DUTY: Under the Mental Health Care Act, police officers have a statutory duty to identify mentally ill persons and take necessary steps for their welfare.",
      "5. DIGNITY & SAFETY: The use of permanent markers (like tattoos) was suggested as a tracking mechanism, but the primary focus remains on rehabilitation into shelters before inoculation."
    ]
  },
  {
    id: '30',
    title: 'Logical Reasoning: Syllogism & Statements',
    type: 'Passage',
    subject: 'Logical Reasoning',
    description: 'A theoretical foundation for solving Syllogisms, evaluating Arguments, and identifying implicit Assumptions.',
    date: 'May 26, 2026',
    readTime: '24 min',
    content: [
      "1. SYLLOGISM BASICS: Categorical propositions consist of a Quantifier (All/No/Some), Subject, Predicate, and Copula. Standard forms: A (All S is P), E (No S is P), I (Some S is P), and O (Some S is not P).",
      "2. VALIDITY RULES: A term must be distributed at least once in the premises. If a term is distributed in the conclusion, it must be distributed in the premise. Two negative premises yield no conclusion.",
      "3. STATEMENT & ARGUMENT: A strong argument is practical, logical, and directly related to the statement. Avoid arguments that are mere opinions, ambiguous, or based on simple analogies.",
      "4. ASSUMPTION VS CONCLUSION: An assumption is the unstated premise required for the statement to hold true. A conclusion is the logical result that follows inevitably from the given facts.",
      "5. BLOOD RELATIONS: Visualizing maps through generations. Relations by birth (Parents, Siblings) vs. Relations by marriage (In-laws). Always draw a family tree to avoid confusion.",
      "6. DIRECTION SENSE: Primary directions (N, S, E, W) and secondary directions (NE, NW, SE, SW). Use Pythagoras theorem (a² + b² = c²) for calculating shortest distances between points."
    ]
  },
  {
    id: '31',
    title: 'Masters: Clocks & Calendars',
    type: 'Passage',
    subject: 'Quantitative Techniques',
    description: 'Precision techniques for calculating clock angles, mirror reflections, and odd-day calendar shifts.',
    date: 'May 28, 2026',
    readTime: '20 min',
    content: [
      "1. CLOCK REFLECTIONS: To find the mirror image of a clock, subtract the given time from 11:60 (for 12-hour format). Example: Mirror image of 01:40 is 11:60 - 01:40 = 10:20.",
      "2. ANGULAR VELOCITY: The hour hand moves 0.5° per minute (30° per hour). The minute hand moves 6° per minute. The relative speed is 5.5° per minute.",
      "3. SPECIAL POSITIONS: Hands are opposite (180°) or at right angles (90°) at specific intervals calculated by the formula: θ = |(30H - 5.5M)|, where H is hours and M is minutes.",
      "4. CALENDAR ODD DAYS: A non-leap year has 1 odd day (365/7 = 52 weeks + 1 day). A leap year (divisible by 4, or 400 for century years) has 2 odd days.",
      "5. DATE SHIFTING: March 10, 2018 (Sat) to March 10, 2019 involves 365 days (1 odd day), so the day shifts to Sunday. After 61 days (61/7 = 8 weeks + 5 days), the day shifts forward by 5.",
      "6. LEAP YEAR ANOMALIES: The maximum gap between two successive leap years can be 8 years (e.g., 1896 to 1904, as 1900 is not a leap year)."
    ]
  },
  {
    id: '32',
    title: 'Logic: Input-Output Arrangements',
    type: 'Passage',
    subject: 'Logical Reasoning',
    description: 'Deciphering the inherent logic of word and number rearrangement machines through step-by-step analysis.',
    date: 'May 30, 2026',
    readTime: '25 min',
    content: [
      "1. PATTERN RECOGNITION: Input-Output machines follow a specific sorting logic—often alphabetical for words (ascending/descending) and numerical for values.",
      "2. DUAL SORTING: Many advanced machines sort one word and one number in each step (e.g., sorting the smallest number at the end and the largest word at the beginning).",
      "3. SHIFTING VS. FIXED: 'Fixed' positions move items to a specific slot and keep them there, while 'Shifting' patterns continuously rotate the entire sequence.",
      "4. STEP ANALYSIS: To find a specific step without writing all of them, identify the 'work' done in each step (e.g., how many elements are correctly placed).",
      "5. BACKWARD TRACING: Generally, if you are given Step IV, the original Input cannot be uniquely determined (marked as 'Cannot be Determined') unless the machine follows a purely cyclic replacement rule."
    ]
  },
  {
    id: '33',
    title: 'Sophism & Rhetorical Persuasion',
    type: 'Passage',
    subject: 'English Language',
    description: 'A historical perspective on the Sophists of Athens, their teaching of aretē, and the controversy surrounding their fees.',
    date: 'June 02, 2026',
    readTime: '22 min',
    content: [
      "1. HISTORICAL CONTEXT: Sophists were itinerant professional teachers in 5th-century B.C.E. Athens who offered education in 'aretē' (virtue or excellence) for a fee.",
      "2. SHIFT IN ARETĒ: Originally associated with warrior virtues, in democratic Athens, 'aretē' evolved into the ability to influence citizens through rhetorical persuasion.",
      "3. PHILOSOPHICAL REPUTATION: Famous Sophists like Protagoras and Gorgias were later portrayed as 'specious' or 'deceptive' in the dialogues of Plato and Socrates.",
      "4. REASONS FOR UNPOPULARITY: High fees, catering to popular opinion rather than truth, and challenging established social rules led to significant opposition from the upper echelons.",
      "5. SOURCES OF KNOWLEDGE: Much of what is known today about Sophism comes from second-hand, often hostile testimony, as only a handful of original texts survived."
    ]
  },
  {
    id: '34',
    title: 'UK Biodiversity: Distribution & Trends',
    type: 'Passage',
    subject: 'English Language',
    description: 'Examining the "grim picture" of biodiversity loss in the UK, from breeding birds to British butterflies.',
    date: 'June 04, 2026',
    readTime: '18 min',
    content: [
      "1. QUANTITATIVE DECLINE: Since the 1970s, the UK has seen 44 million fewer breeding birds and a massive drop in hedgehog populations from 35 million to under 1 million.",
      "2. BIODIVERSITY DEFINED: It refers to the variety of life on earth, which is essential for agriculture (pollination, pest control) and soil health (decomposition).",
      "3. CLIMATE VALUE: Rich ecosystems provide plants that store carbon in their tissues at varying rates, which is invaluable for slowing global climate change.",
      "4. DISTRIBUTION MEASURE: For less well-studied species, researchers use 'distribution' (where a species is found) as a proxy for health over time.",
      "5. VOLUNTEER DATA: Over 5,000 UK species of invertebrates, mosses, and lichens are tracked back to 1970 using observations collected by civil volunteers."
    ]
  },
  {
    id: '35',
    title: 'Manure Composting: The "Leaky Pipe"',
    type: 'Passage',
    subject: 'English Language',
    description: 'A scientific critique of large-scale manure composting as a substitute for synthetic nitrogen fertilizer.',
    date: 'June 06, 2026',
    readTime: '24 min',
    content: [
      "1. THE ORGANIC PROPOSAL: Proponents argue that composting manure replenishes soil carbon and reduces reliance on fossil-fuel-intensive synthetic fertilizers.",
      "2. NITROGEN ENERGY: Producing nitrogen for one acre of maize requires energy equivalent to 30 gallons of gasoline, a major driver of agricultural carbon footprints.",
      "3. THE GREENHOUSE PARADOX: Researcher Savage argues that composting acts like a 'leaky pipe', emitting methane and nitrous oxide long before reaching the soil.",
      "4. EMISSION RATIOS: Calculations suggest organic manure composts release 12-14 times more carbon equivalence than conventional synthetic nitrogen use.",
      "5. INDIRECT SOURCES: Emissions also arise from hauling manure from feedlots, recycling processes, and the use of tractors to maintain aerobic conditions."
    ]
  },
  {
    id: '36',
    title: 'The Evolution of Utilitarianism',
    type: 'Passage',
    subject: 'English Language',
    description: 'Tracing the historical development of the "utility" principle from British Moralists to Bentham and Mill.',
    date: 'June 08, 2026',
    readTime: '20 min',
    content: [
      "1. CORE INSIGHT: Morally appropriate behavior should not harm others but increase 'utility' (happiness). Systematic accounts began with Jeremy Bentham.",
      "2. THEOLOGICAL PRECURSORS: Early British Moralists (Cumberland, Shaftesbury, Hume) believed promoting happiness was a duty since it was approved by God.",
      "3. REFORMIST GOALS: Bentham and Mill used Utilitarianism as a critical tool for social reform, seeking to change 'useless' or 'corrupt' laws that resulted in misery.",
      "4. ANALYTIC FRAMEWORK: The theory evaluates policies by their tendency to lead to happiness or misery without compensating benefits.",
      "5. PHILOSOPHICAL DEFINITION: Actions are judged as 'good' or 'right' solely based on their practical utility and their impact on the general well-being of society."
    ]
  },
  {
    id: '37',
    title: 'Security vs Private Liberties',
    type: 'Passage',
    subject: 'English Language',
    description: 'Debating the intensified conflict between government surveillance programs and individual digital privacy rights.',
    date: 'June 10, 2026',
    readTime: '22 min',
    content: [
      "1. THE GOVERNMENTAL STANCE: Increased surveillance is argued to be necessary for protecting citizens from terrorism, cybercrime, and immediate threats.",
      "2. CRITICAL OPPOSITION: Critics argue that unchecked government power leads to misuse, discrimination, and a fundamental violation of individual freedoms.",
      "3. TECH FIRMS IN THE MIDDLE: Companies face pressure from governments to provide user data access while trying to maintain consumer trust and adhere to privacy laws.",
      "4. DEMOCRATIC EROSION: Routine invasion of privacy can erode public confidence in both government and technology providers, undermining the social contract.",
      "5. THE BALANCE CHALLENGE: The central dilemma is finding a framework that ensures national security without permanently sacrificing civil liberties and transparency."
    ]
  },
  {
    id: '38',
    title: 'Climate Action & Economic Ties',
    type: 'Passage',
    subject: 'English Language',
    description: 'Evaluating the slow progress of carbon emission reduction and the tension between growth and sustainability.',
    date: 'June 12, 2026',
    readTime: '20 min',
    content: [
      "1. PRESSING CHALLENGE: Unpredictable weather patterns and melting glaciers are no longer distant threats but urgent present realities of the 21st century.",
      "2. BARRIERS TO PROGRESS: Political interests, economic dependency on fossil fuels, and a lack of global cooperation have stalled meaningful carbon reduction.",
      "3. LOCAL EMPOWERMENT: Growing recognition of the role individuals and communities play through sustainable farming, plastic reduction, and renewable energy.",
      "4. GENERATIONAL VOICES: The younger generation has become particularly vocal in demanding action, as they will bear the long-term consequences of current inaction.",
      "5. THE SUSTAINABILITY DEBATE: Experts contend that the long-term costs of ignoring climate change (food insecurity, health crises) far outweigh short-term economic sacrifices."
    ]
  },
  {
    id: '39',
    title: 'Legal Glossary & Judicial Hierarchy',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'A foundational guide to legal terminology, court hierarchies in India, and procedural judicial concepts.',
    date: 'June 15, 2026',
    readTime: '25 min',
    content: [
      "1. COURT HIERARCHY: The Indian judiciary follows a pyramid structure: Subordinate Courts -> District Courts -> High Courts -> Supreme Court (Apex Court).",
      "2. PROCEDURAL TERMS: 'Cognizance' (court taking formal notice of an offense), 'Chargesheet' (police report under Sec 173 CrPC), and 'Impugned' (challenging an order in a higher court).",
      "3. LEGAL DOCTRINES: 'Prima Facie' (based on first impression), 'Pro-liberty Principles' (favoring individual freedom over detention), and 'Moral Turpitude' (wicked behavior departing from social standards).",
      "4. APPLICATE FILINGS: 'Special Leave Petition (SLP)' allows an aggrieved party to seek permission to be heard by the Apex Court against any judgment in India.",
      "5. LEGISLATIVE STRUCTURE: 'Bicameral Legislature' consists of two chambers. In India, states like Maharashtra and UP have Legislative Councils (Vidhan Parishad) alongside Assemblies.",
      "6. JUDICIAL ERRORS: 'Perversity' refers to a serious error where a decision is against reason/evidence. 'Procedural Irregularities' are mistakes in legal conduct affecting case fairness."
    ]
  },
  {
    id: '40',
    title: 'Legal Reasoning: The Master Intro',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'A comprehensive starter kit for CLAT Legal Reasoning, featuring the PA DIEGO technique and passage strategies.',
    date: 'June 20, 2026',
    readTime: '15 min',
    content: [
      "1. EXAM BLUEPRINT: CLAT features 150 marks over 120 minutes. Legal Reasoning accounts for ~25% (35-39 questions), focusing on 450-word passages involving legal/policy scenarios.",
      "2. CORE SKILLS: No prior law knowledge is required. You must identify rules/principles within the text, apply them to specific fact situations, and notice how rule changes alter outcomes.",
      "3. PA DIEGO TECHNIQUE: A critical elimination tool—P (Personal Views), A (Addition of Wrong Data), D (Deceptive Similar Words), I (Irrelevant but True), E (Exaggeration), G (Generalization), O (Omission).",
      "4. READING STRATEGY: Focus on 'Mind Voice' and contextual meanings. Ignore names/approximate numbers. Identify 'Law Boxes' (Principles) and 'Vocab Boxes' (New Terms) while reading.",
      "5. THE 'NEVER RE-READ' RULE: Professional legal reading requires high focus on the first pass. Identify the author's opinion and don't validate it against your own outside knowledge.",
      "6. DATA PROTECTION CASE: Example analysis of the 2019 Bill where the rule (Protecting Privacy) is often diluted by the principle (Government Exemptions), testing your ability to spot contradictions."
    ]
  },
  {
    id: '41',
    title: 'Criminal Law: General Exceptions (IPC)',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Understanding Chapter IV of the IPC: When actions that cause harm are excused from criminal liability.',
    date: 'June 22, 2026',
    readTime: '25 min',
    content: [
      "1. PRINCIPLE OF INTENT: The law recognizes that not every harmful act is a crime. Exceptions apply if there was no criminal intent (Mens Rea) or if the act was done under specific excuses.",
      "2. MISTAKE OF FACT (Sec 76, 79): An act done by reason of a mistake of fact (not law) in good faith is excused. Example: A photographer shooting at a cave entrance to scare a leopard, unaware of a person inside.",
      "3. ACCIDENT (Sec 80): Harm caused by accident or misfortune, without criminal intention or knowledge, while doing a lawful act in a lawful manner, is not an offense.",
      "4. INSANITY (Sec 84): Nothing is an offense if done by a person who, due to unsoundness of mind, is incapable of knowing the nature of the act or its wrongfulness.",
      "5. PRIVATE DEFENCE (Sec 96-106): Acts done in good faith to defend oneself or others from imminent danger are excused, provided the force used does not exceed the limit allowed by law.",
      "6. CONSENT (Sec 87-91): Voluntary consent given by a capable person excuses acts not intended to cause death or grievous hurt (e.g., surgical procedures or skydiving risks)."
    ]
  },
  {
    id: '42',
    title: 'Doctrine of Estoppel: Evidence Act',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'Analyzing Section 115 and 116: Why you cannot blow hot and cold at the same time in legal proceedings.',
    date: 'June 24, 2026',
    readTime: '20 min',
    content: [
      "1. CORE DEFINITION: If a person causes another to believe a thing is true by their declaration or act, they cannot later deny the truth of that thing in a legal proceeding.",
      "2. REPRESENTATION & RELIANCE: For Estoppel to apply: (a) There must be a representation of an existing fact, (b) The other party must act upon that belief, and (c) They must suffer a loss due to that reliance.",
      "3. PRINCIPLE OF CONSISTENCY: A party cannot contradict their previous statements made in court. If you accept a liability (e.g., an arbitration award), you cannot later challenge its validity.",
      "4. TENANCY & LICENSES (Sec 116): A tenant cannot deny the title of the landlord at the beginning of the tenancy while still being in possession of the property.",
      "5. LIMITS OF ESTOPPEL: It generally applies to facts, not law. One cannot be estopped by a representation of a future fact or a legal opinion that turns out to be incorrect.",
      "6. CASE ILLUSTRATION: If a friend forges ownership papers to help you get a bank loan, the bank can invoke estoppel against the friend if they try to deny the ownership later to avoid fraud liability."
    ]
  },
  {
    id: '43',
    title: 'Corporate Law: Share Capital & ESOPs',
    type: 'Passage',
    subject: 'Legal Reasoning',
    description: 'Analyzing Section 62 of the Companies Act 2013 regarding further issue of shares and shareholder rights.',
    date: 'June 26, 2026',
    readTime: '22 min',
    content: [
      "1. RIGHT OF PRE-EMPTION: When a company issues new shares, they must first be offered to existing shareholders as 'Right Shares' to prevent dilution of their control.",
      "2. ESOP SCHEMES: Companies can issue shares to employees under Employee Stock Option Plans by passing a special resolution, usually to incentivize loyalty and performance.",
      "3. PREFERENTIAL BASIS: Shares can be issued to specific persons (non-members) if authorized by a special resolution and supported by a registered valuer's report.",
      "4. DEBENTURE CONVERSION: Companies often have the option to convert debt into equity. If authorized at the time of issuance, debentures can be converted into shares.",
      "5. GOVERNMENT POWER: The Central Government can direct the conversion of debentures into shares in the public interest, with an appeal mechanism provided to the Tribunal.",
      "6. TIME LIMITS: For right issues, the offer period must typically be between 15 and 30 days. Failure to accept within this period allows directors to dispose of shares as they see fit."
    ]
  },
  {
    id: '44',
    title: 'Cyber Law: Online Contracts & IT Act',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'The legality of Click-wrap, Browse-wrap, and Email contracts in the digital age.',
    date: 'June 28, 2026',
    readTime: '18 min',
    content: [
      "1. CLICK-WRAP CONTRACTS: Valid when a user actively clicks 'I Agree' to terms. Governed by the Indian Contract Act principles of offer, acceptance, and free consent.",
      "2. BROWSE-WRAP BINDING: Mere usage of a website can imply acceptance of terms if the link to terms is prominently displayed, though enforceability is more frequently challenged.",
      "3. EMAIL CONTRACTUALITY: Formed through exchange of emails. Recognized by the IT Act 2000 as valid electronic records that can be authenticated and attributed to parties.",
      "4. SECTION 10 (IT ACT): Specifically provides validation for contracts formed through electronic means, ensuring they are not denied enforceability solely on the ground of being digital.",
      "5. JURISDICTIONAL CHALLENGES: The global nature of the internet makes it difficult to determine which court has the right to hear a dispute arising from an online borderless contract.",
      "6. SIGNATURE VALIDATION: The IT Act recognizes electronic signatures as valid equivalents to physical signatures, provided they follow the prescribed security procedures (e.g., OTP-based or Digital Certificates)."
    ]
  },
  {
    id: '45',
    title: 'Percentages: Advanced Shortcuts & Applications',
    type: 'Note',
    subject: 'Quantitative Techniques',
    description: 'Mastering successive changes, constant expenditure rules, and mixture dynamics for competitive exams.',
    date: 'July 02, 2026',
    readTime: '25 min',
    content: [
      "1. SUCCESSIVE PERCENTAGE CHANGE: For two changes x% and y%, the net change is (x + y + xy/100)%. Use this for area of rectangles (length/breadth) and population/value growth.",
      "2. CONSTANT EXPENDITURE RULE: If the price of a commodity increases by r%, the reduction in consumption needed to keep expenditure constant is (r / (100 + r)) * 100%.",
      "3. MIXTURE FORMULA: When adding strengths, use (S1 * V1 + S2 * V2) / (V1 + V2) = Target Strength. Useful for alcohol-water or alloy component calculations.",
      "4. REVERSE PERCENTAGE: If Y is a% of X, then X is (100/a) * Y. Finding the base value from a relative percentage is a common hurdle in high-speed DI.",
      "5. DEPRECIATION & APPRECIATION: Final Value = Present Value * (1 ± r/100)^n. Apply this to car valuation or compound interest scenarios."
    ]
  },
  {
    id: '46',
    title: 'Quantitative Lab: Exam & Income Stats',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Practical analysis of examination pass rates using Venn diagrams and income-expenditure modeling.',
    date: 'July 05, 2026',
    readTime: '20 min',
    content: [
      "1. VENN DIAGRAMS IN EXAMS: Total Failed = Fail(A) + Fail(B) - Fail(Both). Example: If 80% pass English and 85% pass Math, but 75% pass both, then Total Pass = 80+85-75 = 90%. Fail(Both) = 10%.",
      "2. INCOME-SAVINGS MODEL: Total Salary = Spending + Savings. If Savings are equal but Spending rates differ (95% vs 85%), then 5% of Salary A = 15% of Salary B.",
      "3. OVERTIME CALCULATIONS: Total Wage = (Basic Rate * Basic Hours) + (Overtime Rate * Overtime Hours). Overtime is often paid at 125% (Basic * 1.25) of the standard rate.",
      "4. ALLOY PROPORTIONS: Converting ratios (1/2 : 1/3 : 1/5) into percentages. Multiply by LCM (30) to get 15:10:6. Percentage of Al = (10 / 31) * 100 ≈ 32.25%.",
      "5. SUCCESSIVE DISCOUNTS: Two discounts d1 and d2 are equivalent to a single discount of [d1 + d2 - (d1 * d2 / 100)]%."
    ]
  },
  {
    id: '47',
    title: 'Masters: Averages & Mean Calculations',
    type: 'Strategy',
    subject: 'Quantitative Techniques',
    description: 'Advanced techniques for calculating arithmetic, geometric, and harmonic means, and handling statistical shifts.',
    date: 'July 10, 2026',
    readTime: '22 min',
    content: [
      "1. MEAN RELATIONSHIPS: For two positive numbers, the Harmonic Mean (HM) = (GM² / AM). Example: If GM = 20 and AM = 50, then HM = 400 / 50 = 8.",
      "2. SEQUENCE AVERAGES: The average of the first n natural numbers is (n+1)/2. The average of the first n multiples of k is k * (n+1)/2. Example: First 8 multiples of 9 avg is 9 * 4.5 = 40.5.",
      "3. REPLACEMENT PRINCIPLE: When one person is replaced, Weight of New = Weight of Old + (Total Items * Change in Average). Example: Replaced 48kg student with +2kg avg shift = 48 + (6*2) = 60kg.",
      "4. ERROR CORRECTION: Correct Average = (Observed Total - Error) / Number of items. If 20 days avg 550 was over-reported by 40, Correct Avg = (11000 - 40) / 20 = 548.",
      "5. SHIFT ANALYSIS: When adding a member with value X to a group of n members with average A, the New Average = (nA + X) / (n+1). The change in average is (X - A) / (n+1)."
    ]
  },
  {
    id: '48',
    title: 'Quants Lab: Group Dynamics & Mixtures',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Simulating complex average problems involving combined groups, salary drops, and multi-day patterns.',
    date: 'July 12, 2026',
    readTime: '20 min',
    content: [
      "1. COMBINED AVERAGES: Total Average = (n1*A1 + n2*A2) / (n1 + n2). Useful for picnics with separate boy/girl averages or multi-division company allowances.",
      "2. OVERLAPPING DATA SHIFTS: If Avg(A,B,C) = X and Avg(B,C,D) = Y, then A - D = 3(X - Y). Use this for rainfall pattern delta between starting and ending days.",
      "3. REVALUATION IMPACT: Total Students = (Total Mark Drop) / (Drop in overall average). If revaluing 150 students drops avg by 15 marks, students = (150 * 25) / 15 if individual drop was 25.",
      "4. WEIGHTED ALLIGATIONS: If two groups of salaries drop when combined, use the cross-ratio of (High - Avg) : (Avg - Low) to find the number of members in each group.",
      "5. RECURRING MEANS: When multiple additions are made (e.g., adding 4 friends with avg 21 to a group with avg 25 to get a new avg 23), use (n1*25 + 4*21) = (n1+4)*23 to solve for n1."
    ]
  },
  {
    id: '49',
    title: 'Haven of Wildlife: The Mussoorie Leopard',
    type: 'Passage',
    subject: 'English Language',
    description: 'A narrative description of a natural sanctuary near Mussoorie and a close encounter with a sinewy leopard.',
    date: 'July 15, 2026',
    readTime: '20 min',
    content: [
      "1. SETTING THE SCENE: The ravine near Mussoorie remains in shadow, encouraging birds and animals to emerge during daylight. It serves as a rare natural sanctuary.",
      "2. THE ENCOUNTER: The author spots a sinewy orange-gold leopard poised on a rock. The leopard, though sensing presence, appears 'puzzled' rather than aggressive.",
      "3. VOCABULARY: 'Poised' in this context means balanced or suspended, ready for motion. 'Sinewy' refers to lean, muscular strength.",
      "4. THE THREAT: Shikaris (hunters) reveal the illegal trade of leopard skins in Delhi, explaining why a leopard might leave its kill 'out in the open'—it was likely disturbed while eating.",
      "5. AUTHOR'S STANCE: The narrator feels uneasy about the presence of guns in the forest, highlighting the conflict between wildlife conservation and illegal poaching."
    ]
  },
  {
    id: '50',
    title: 'Spring Festival: The Lost Child',
    type: 'Passage',
    subject: 'English Language',
    description: 'A vivid portrayal of a child’s fascination and distraction during a gaily clad spring festival fair.',
    date: 'July 18, 2026',
    readTime: '22 min',
    content: [
      "1. ATMOSPHERIC DESCRIPTION: From wintry shades of narrow lanes emerges a 'gaily clad humanity', celebrating the festival of spring with horses, bullock carts, and laughter.",
      "2. CHILD'S FASCINATION: A little boy is constantly distracted by toys, dragon-flies, and mustard fields, falling behind his parents who repeatedly call him back to the path.",
      "3. MATERNAL TACT: The mother, 'melted by the free spirit of the day', uses the beauty of the flowering mustard field to distract the child from his desire for restricted toys.",
      "4. CONTRASTING EMOTIONS: The child feels both 'repelled and fascinated' by the confusion of the fair's throngs, illustrating the overwhelming nature of new sensory experiences.",
      "5. VOCABULARY: 'Tender' describes a gentle, caring attitude. 'Coarse' music refers to something rough or unrefined, like the forbidden sound of the snake-charmer's flute."
    ]
  },
  {
    id: '51',
    title: 'Indian English: Cultural Mechanisms',
    type: 'Passage',
    subject: 'English Language',
    description: 'Exploring the unique cultural evolution of English in India, from "prepone" to regional sub-dialects.',
    date: 'July 20, 2026',
    readTime: '24 min',
    content: [
      "1. LINGUISTIC STATS: With at least 125 million speakers, India is the world's second-largest English-speaking country, developing a version distinct from the British Raj origins.",
      "2. SOCIO-CULTURAL REPRESENTATION: Indian English represents the mechanisms of a diverse, multilingual country, with sub-dialects varying by region and mother-tongue influence.",
      "3. NEOLOGISMS: The word 'prepone' (to bring forward) is often incorrectly attributed to Shashi Tharoor, though its usage is uniquely prevalent and recognized in the Indian context.",
      "4. VOCABULARY SHIFTS: 'Mugging' in India means cramming before an exam, and 'passing out' means graduating—comical differences compared to Western definitions.",
      "5. CORE ARGUMENT: Indian English is not just an elite remnant but a unique entity defined by its emphasis, rhythm, and regional hybridity."
    ]
  },
  {
    id: '52',
    title: 'Physiology vs Pollution: The Trojan Horse',
    type: 'Passage',
    subject: 'English Language',
    description: 'An analogy comparing the human body to a fortified nationhood struggling against the "Trojan horse" of PM 2.5 particles.',
    date: 'July 22, 2026',
    readTime: '20 min',
    content: [
      "1. UTOPIAN ANALOGY: The human body is like an intelligent nationhood (e.g., Wakanda), fortified with defenses that adapt to new environments and exigencies.",
      "2. DEFENSIVE MECHANISMS: The nose acts as a vacuuming system, using cilia (fine hairs) to trap foreign particles before they reach the windpipe.",
      "3. THE BREACH: PM 2.5 particles are so small they slip past 'ultrafine cilia' undetected, acting as a 'Trojan horse' that brings devastation to physiological defenses.",
      "4. HEALTH IMPACT: These toxic particles enter the bloodstream through the lungs, leading to clogged arteries, heart disease, and other toxic disorders.",
      "5. THE URGENCY: While bodies may evolve over decades to combat pollution, the author argues we have no choice but to clean our air now to protect families from these breaches."
    ]
  },
  {
    id: '53',
    title: 'Mystery of the Night: Nature vs Humans',
    type: 'Passage',
    subject: 'English Language',
    description: 'A philosophical reflection on the soothing charm of nature compared to the suffering caused by human presence.',
    date: 'July 25, 2026',
    readTime: '25 min',
    content: [
      "1. DESILUSIONMENT: The author expresses a loss of interest in human beings, finding that they 'make me suffer' compared to the significance of the natural world.",
      "2. PERSONIFIED NATURE: The night is described as 'creeping stealthily' out of the valley, possessing a solemn charm and a sense of 'mystery' that humans lack.",
      "3. THE KATYDIDS: These insects are called 'wise' because they do not chatter like people; their 'slumber song' brings a soothing, penetrating peace to the observer.",
      "4. THE HUMAN INTRUSION: The 'necromancer's spell' of the night is broken by a man's coarse voice, representing the blunt and detestable nature of human chatter.",
      "5. VOCABULARY: 'Coarse' here refers to rough or unrefined speech. 'Solemn' indicates a deep, serious, and formal quality of the night atmosphere."
    ]
  },
  {
    id: '54',
    title: 'Bar Graph Dynamics: Sales & Growth Models',
    type: 'Strategy',
    subject: 'Quantitative Techniques',
    description: 'Mastering year-on-year percentage increase, absolute value deduction, and profit-expense ratios.',
    date: 'July 28, 2026',
    readTime: '22 min',
    content: [
      "1. Y-O-Y INCREASE: To find 2015 sales from 2013: Sales(2015) = Sales(2013) * (1 + r1/100) * (1 + r2/100). Use this when bar graphs show percentage shifts relative to the previous year.",
      "2. RATIO SHIFTING: If initial ratio P:S is 2:1, and P grows by 25% and S by 10%, the new ratio is (2 * 1.25) : (1 * 1.10) = 2.5 : 1.1 = 25 : 11.",
      "3. PROFITABILITY TRENDS: Profit = Sales - Expenses. In comparative growth, if Sales increase by 40% and Expenses double (100% increase), profit margins often compress unless the initial margin was very high.",
      "4. HIGHEST GROWTH IDENTIFICATION: For multi-year peaks, identifying the company with the highest 'Net percentage increase' requires analyzing the compounding effect of successive bars.",
      "5. REVERSE SALES DEDUCTION: If 2017 sales must equal 2016 levels of another company, use Target / (Current Sales) to find the required growth multiplier."
    ]
  },
  {
    id: '55',
    title: 'Advanced DI: Stacked Models & Averages',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Practical analysis of stacked bar graphs for imports, marks distribution, and cricket performance metrics.',
    date: 'July 30, 2026',
    readTime: '25 min',
    content: [
      "1. CRICKET AVERAGES: Average = Total Runs / Times Dismissed. Careful: Not 'matches played'. If a player has at least 50 dismissals, max average occurs at minimum dismissals (50) for fixed runs.",
      "2. STACKED PERCENTAGE BREAKUP: In marks distribution (Tests A to F), each segment represents a percentage of the student's TOTAL marks. Absolute marks = (Segment % / 100) * Total Marks.",
      "3. IMPORT-EXPORT ANALYSIS: Tracking crude oil value across countries (Iraq, Egypt, etc.) using stacked bars. Total stack height represents the global import value for that year.",
      "4. RELATIVE GROWTH: To compare Egypt's 1996 imports to 1995: ( Egypt_96 - Egypt_95 ) / Egypt_95 * 100. Stacked bars often hide absolute deltas behind visual segments.",
      "5. MAX DIFFERENCE TRACKING: To find the max difference in total runs between players, identify the tallest and shortest bars in the ODI career graph regardless of dismissal counts."
    ]
  },
  {
    id: '56',
    title: 'The Hidden Language of Trees',
    type: 'Passage',
    subject: 'English Language',
    description: 'Exploring the "Wood Wide Web" and how forest ecosystems rely on cooperative fungal networks.',
    date: 'August 01, 2026',
    readTime: '22 min',
    content: [
      "1. COOPERATION OVER COMPETITION: Recent research reveals that trees are not solitary competitors but communicate through underground fungi called mycorrhizal networks.",
      "2. THE WOOD WIDE WEB: These intricate fungal threads allow trees to exchange nutrients, water, and even chemical warning signals about drought or insect attacks.",
      "3. MOTHER TREES AS HUBS: Large, ancient 'mother trees' act as central hubs in the network, nurturing younger seedlings by sending surplus carbon and nutrients.",
      "4. ECOLOGICAL IMPLICATIONS: Traditional understanding of natural selection is challenged by this sophisticated community behavior, where mutual support is key to survival.",
      "5. FORESTRY PRACTICES: Clear-cutting is being re-evaluated because it destroys these essential communication networks, leading some to adopt selective harvesting methods."
    ]
  },
  {
    id: '57',
    title: 'The Rise of Urban Farming',
    type: 'Passage',
    subject: 'English Language',
    description: 'Analyzing the green revolution in city spaces, from Detroit’s vacant lots to Singapore’s vertical farms.',
    date: 'August 04, 2026',
    readTime: '20 min',
    content: [
      "1. URBAN TRANSFORMATION: Cities are transforming rooftops, shipping containers, and warehouses into productive agricultural sites, changing how dwellers view food production.",
      "2. COMMUNITY IMPACT: In cities like Detroit, urban gardens have replaced vacant lots, creating jobs, reducing crime, and fostering strong community connections.",
      "3. VERTICAL MARVELS: In land-scarce Singapore, multi-story vertical farms use hydroponics and LED technology to produce high yields with 90% less water than traditional farming.",
      "4. ENVIRONMENTAL BENEFITS: Local production drastically reduces the carbon footprint of food transportation and transforms underutilized urban spaces into economic assets.",
      "5. COMPLEMENTARY ROLE: While urban farming cannot fully replace traditional agriculture due to land requirements for staples, it provides a resilient and sustainable supplement."
    ]
  },
  {
    id: '58',
    title: 'The Psychology of Procrastination',
    type: 'Passage',
    subject: 'English Language',
    description: 'Understanding why procrastination is an emotional regulation problem rather than a time management failure.',
    date: 'August 07, 2026',
    readTime: '24 min',
    content: [
      "1. EMOTIONAL REGULATION: Psychological research shows that procrastination is primarily a way for the brain to seek immediate relief from negative emotions like anxiety or self-doubt.",
      "2. THE VICIOUS CYCLE: Avoiding a task provides temporary relief but leads to increased stress, guilt, and self-criticism, making future avoidance more likely.",
      "3. THE PERFECTIONIST TRAP: Perfectionists are particularly prone to procrastination as their fear of not meeting impossibly high standards can paralyze them before they begin.",
      "4. SELF-PROTECTION: Procrastination often functions as a self-protective strategy, allowing individuals to believe they 'could have done better' if they'd simply had more time.",
      "5. EFFECTIVE STRATEGIES: Overcoming procrastination requires addressing emotional triggers through self-compassion, breaking tasks into smaller steps, and identifying specific anxieties."
    ]
  },
  {
    id: '59',
    title: 'The Forgotten Art of Listening',
    type: 'Passage',
    subject: 'English Language',
    description: 'Distinguishing between hearing and the active empathy required for genuine understanding in a hyperconnected world.',
    date: 'August 10, 2026',
    readTime: '18 min',
    content: [
      "1. CONTINUOUS PARTIAL ATTENTION: Fragmented attention caused by digital distractions significantly diminishes the quality of modern relationships and genuine understanding.",
      "2. GENUINE LISTENING: True listening requires full attention, active empathy, and the temporary suspension of one's own thoughts, judgments, and need to respond.",
      "3. THE INTENT TO RESPOND: Most people listen with the intent to reply rather than to understand, often mentally preparing their own points while the other person is still speaking.",
      "4. ACTIVE LISTENING TECHNIQUES: Effective listening involves maintaining eye contact, asking clarifying questions, and reflecting back the speaker's message to confirm comprehension.",
      "5. CLINICAL BENEFITS: Studies show that active listening strengthens trust, helps resolve conflicts more effectively, and improves mental health for both participants."
    ]
  },
  {
    id: '60',
    title: 'The Adaptive Power of Failure',
    type: 'Passage',
    subject: 'English Language',
    description: 'Reframing setbacks as essential information and feedback on the path to ultimate success.',
    date: 'August 12, 2026',
    readTime: '22 min',
    content: [
      "1. CULTURAL ATTITUDES: Society often treats failure as shameful, but innovators view it as a valuable teacher that provides unique, unavailable information.",
      "2. THE EDISON PERSPECTIVE: Thomas Edison famously reframed his thousands of failed light bulb experiments as a successful elimination of approaches that didn't work.",
      "3. SUCCESS IN FAILURE: The 'fail fast' motto in innovation culture encourages rapid experimentation and learning from mistakes rather than dwelling on setbacks.",
      "4. GROWTH VS FIXED MINDSET: Carol Dweck’s research shows that those with a growth mindset view failure as feedback, whereas those with a fixed mindset see it as a verdict on talent.",
      "5. TRANSFORMING OBSTACLES: Reframing failure as information rather than identity increases resilience and the willingness to take the calculated risks necessary for progress."
    ]
  },
  {
    id: '61',
    title: 'The Economics of Happiness',
    type: 'Passage',
    subject: 'English Language',
    description: 'Critiquing GDP as a proxy for welfare and exploring what research suggests actually contributes to human wellbeing.',
    date: 'August 15, 2026',
    readTime: '25 min',
    content: [
      "1. LIMITATIONS OF GDP: GDP counts all monetary transactions as positive, ignoring whether they actually improve lives, such as spending to rebuild after disasters.",
      "2. NON-MARKET VALUE: GDP fails to account for essential human activities like unpaid caregiving, volunteer work, and the preservation of a healthy environment.",
      "3. DIMINISHING RETURNS: Happiness economics suggests that beyond a basic income threshold (approx. $75k-$95k), additional wealth provides progressively smaller gains in life satisfaction.",
      "4. CORE HAPPINESS FACTORS: Research identify strong social relationships, physical and mental health, and a sense of purpose as the primary drivers of wellbeing.",
      "5. PROSPERITY RE-DEFINED: Modern societies are increasingly debating whether economies should optimize for human welfare rather than just infinite industrial growth on a finite planet."
    ]
  },
  {
    id: '62',
    title: 'The Architecture of Memory',
    type: 'Passage',
    subject: 'English Language',
    description: 'Deconstructing the intuitive model of memory and understanding it as a dynamic, malleable reconstruction process.',
    date: 'August 18, 2026',
    readTime: '22 min',
    content: [
      "1. RECONSTRUCTION VS RECORDING: Memory is not a stable video recording but a dynamic process of weaving together scattered fragments stored in different brain regions.",
      "2. MALLEABILITY OF MEMORY: Elizabeth Loftus showed that subtle changes in question phrasing can significantly alter eyewitness recollections without their awareness.",
      "3. FALSE MEMORIES: Studies have demonstrated that entire events can be successfully implanted as false memories, even when participants are absolutely certain of their truth.",
      "4. FLASHBULB MEMORIES: Confident recollections of momentous events often decrease in accuracy at the same rate as ordinary memories, despite high levels of certainty.",
      "5. EVOLUTIONARY PURPOSE: Memory evolved to extract meaning and identify patterns for survival, prioritizing utility and efficiency over absolute precision."
    ]
  },
  {
    id: '63',
    title: 'Profit & Loss: The Commercial Edge',
    type: 'Strategy',
    subject: 'Quantitative Techniques',
    description: 'Mastering markups, dishonest dealer logic, and the mechanics of commercial transactions.',
    date: 'August 22, 2026',
    readTime: '25 min',
    content: [
      "1. THE MARKUP CHAIN: Marked Price (MP) = CP * (1 + Markup%). Selling Price (SP) = MP * (1 - Discount%). Net Profit% is given by the formula (Markup - Discount - (Markup * Discount / 100))%.",
      "2. DISHONEST TRADER LOGIC: When a dealer uses a false weight, Profit% = [(Error / False Weight) * 100]. Example: Using 850g for 1kg gives a profit of (150/850) * 100 ≈ 17.65%.",
      "3. SAME SELLING PRICE RULE: If two items are sold at the same SP, one at x% profit and the other at x% loss, the net result is always a loss of (x/10)² %.",
      "4. FREE ITEM SCHEMES: In a 'Buy X, Get Y Free' deal, the effective discount percentage is [Y / (X + Y)] * 100. This must be factored into the final margin calculation.",
      "5. ALLIGATIONS IN TRADING: If stock is sold in two parts at different profit rates (p1, p2) to get a target profit (P), the ratio of quantities is (p2 - P) : (P - p1)."
    ]
  },
  {
    id: '64',
    title: 'Quants Lab: Advanced Transaction Modeling',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Simulating complex trade scenarios involving successive discounts, share premiums, and manufacturing cost shifts.',
    date: 'August 25, 2026',
    readTime: '22 min',
    content: [
      "1. SUCCESSIVE DISCOUNTS: For discounts d1 and d2, the single equivalent discount is [d1 + d2 - (d1 * d2 / 100)]%. For three or more, apply the multiplier method: 1 - (1-d1)(1-d2)(1-d3).",
      "2. SHARE PREMIUMS & DISCOUNTS: Investment analysis in shares. If a man buys at a discount (Face Value - x) and sells at a premium (FV + x), his gain/loss depends on the change relative to the net investment.",
      "3. MARGIN SHIFTS: If manufacturing cost rises by 20% and the trader doesn't revise the SP, the absolute drop in profit equals the absolute increase in cost. Original CP = (Profit Drop / Cost Increase %).",
      "4. ITEM EQUIVALENCY: If the CP of 10 oranges = CP of 1kg apples, and 12 apples = 1kg oranges, solve for unit prices to find the relative value between fruit types.",
      "5. REVENUE MAXIMIZATION: A book sold at a 20% loss but would have yielded 30% profit if sold for Rs 3 more. This implies 50% of CP = Rs 3, thus the CP is Rs 6."
    ]
  },
  {
    id: '65',
    title: 'Advanced RC: Tone, Structure, and Purpose',
    type: 'Strategy',
    subject: 'English Language',
    description: 'Mastering active reading techniques, tone identification, and structural analysis for diverse editorial passages.',
    date: 'August 28, 2026',
    readTime: '20 min',
    content: [
      "1. ACTIVE PRE-READING: Before diving in, scan for keywords and the closing sentence to grasp the author's final conclusion—this often clarifies the entire 'Purpose' of the passage.",
      "2. TONE & ATTITUDE: Differentiate between 'Cynical' (distrustful), 'Skeptical' (questioning), and 'Analytical' (objective). Look for adjectives like 'lamentable' or 'marvellous' to spot authorial bias.",
      "3. STRUCTURAL MAPPING: Identify 'Pivot Words' (However, Conversely, Although) that signal a shift in logic. Recognising a Problem-Solution or Cause-Effect structure aids in rapid information retrieval.",
      "4. PURPOSE VS MAIN IDEA: The Main Idea is 'what' is discussed (e.g., Glaciers); the Purpose is 'why' (e.g., to argue for immediate climate action). Identifying the 'why' helps in answering central theme questions.",
      "5. INFERENCE BOUNDARIES: An inference must be supported by the text but shouldn't be a direct restatement. Avoid 'Extrapolation' where you assume too much beyond the author's limited scope."
    ]
  },
  {
    id: '66',
    title: 'Glacial Chronicles: Deep Time & Climate',
    type: 'Passage',
    subject: 'English Language',
    description: 'An analysis of glacial ice cores as continuous year-by-year records of past atmospheric composition.',
    date: 'September 01, 2026',
    readTime: '22 min',
    content: [
      "1. DEEP TIME RECORDS: Glacial ice, ranging up to hundreds of thousands of years in age, serves as a vital tool for reconstructing past eras and predicting future shifts.",
      "2. TRAPPED ATMOSPHERE: Tiny air bubbles within ice cores preserve 'bits of the atmosphere' from thousands of years ago, revealing past vegetation and temperature variations.",
      "3. THE RETREAT INVARIANT: Since the early 20th century, glaciers have retreated at unparalleled rates, a phenomenon often attributed to the 1760 Industrial Revolution.",
      "4. CLIMATE REFERENCE: Out of 100 alpine glaciers tracked by WGMS, only those with records spanning 30+ years qualify as 'climate reference glaciers'.",
      "5. SENSITIVITY: Glaciers are uniquely responsive to temperature fluctuations, making their observation the primary method for answering how human activity affects climate."
    ]
  },
  {
    id: '67',
    title: 'Cultural Evolution: The Christmas Tree',
    type: 'Passage',
    subject: 'English Language',
    description: 'Tracing the historical journey of the Christmas tree from German pagan roots to a global industrial tradition.',
    date: 'September 04, 2026',
    readTime: '20 min',
    content: [
      "1. ORIGIN LEGENDS: While the source is debated, many trace the tradition to St. Boniface in 723 AD Germany, who replaced a pagan 'Thor's Oak' with an evergreen.",
      "2. SYMBOLIC ADAPTATION: In the Middle Ages, 'paradise trees' (evergreens hung with apples) represented the Garden of Eden on the religious feast day of Adam and Eve.",
      "3. ROYAL POPULARIZATION: The tradition spread to England via Prince Albert and Queen Victoria, and to the US where it was initially opposed by Puritans for its 'pagan' roots.",
      "4. FOREST IMPACT: The massive demand for natural trees by the 19th century led to forest depletion, sparking the invention of artificial 'goose-feather' and 'bristle' trees.",
      "5. MATERIAL SHIFTS: Artificial trees evolved from surplus toilet bowl brush product (1930s) to aluminum and finally plastic versions used by 85% of US households today."
    ]
  },
  {
    id: '68',
    title: 'Transgressive Aesthetics: Art vs. Terror',
    type: 'Passage',
    subject: 'English Language',
    description: 'Exploring the modernist notion of literature as a tool for defamiliarization and its conflict with the "raids on consciousness" by terror.',
    date: 'September 07, 2026',
    readTime: '25 min',
    content: [
      "1. THE SHOCK EFFECT: A controversial modernist view suggests the purpose of art is to penetrate the cultural psyche through shock—a role some fear is being usurped by gunmen.",
      "2. DEFAMILIARIZATION: Theorist Viktor Shklovsky argued that art should 'make the familiar seem strange', forcing readers to regard reality from a new and unsettling perspective.",
      "3. MODERNIST REBELLION: The aesthetic of 'make it new' dictates that literature should rebel against tradition to provoke genuine thought and insight through transgressive acts.",
      "4. EMOTIONAL ROLES: Beyond transgression, literature serves to cultivate empathy, reflect human nature, and act as a harbinger for social change.",
      "5. THE USURPATION: Contemporary novelists worry that the ability to alter the 'inner life of culture' is shifting from the writer's pen to the extremist's shock tactics."
    ]
  },
  {
    id: '69',
    title: 'The Living Earth: Soil Health Jurisprudence',
    type: 'Passage',
    subject: 'English Language',
    description: 'Analyzing soil as the second largest carbon sink and the policy frameworks aimed at reversing land degradation.',
    date: 'September 10, 2026',
    readTime: '22 min',
    content: [
      "1. CARBON SINK MECHANICS: Soils help regulate the planet's climate by storing carbon, serving as the second largest sink after the oceans and building landscape resilience.",
      "2. DEGRADATION DRIVERS: Industrial activities, mining, and the burning of crop residues have led to nutrient loss affecting 29% of India's total land area.",
      "3. POLICY SOLUTIONS: The Government of India’s 'Soil Health Card' (SHC) scheme provides farmers with granular data to make necessary amendments to soil chemistry.",
      "4. GLOBAL COOPERATION: The FAO works with state ministries to support sustainable agrifood systems, focusing on organic certification and agri-nutri-gardens.",
      "5. INDIVIDUAL RESPONSIBILITY: Citizens can contribute to soil health by planting trees to protect topsoil and favoring locally sourced, seasonal foods to reduce industrial load."
    ]
  },
  {
    id: '70',
    title: 'Cop15: The Existential Biodiversity Crisis',
    type: 'Passage',
    subject: 'English Language',
    description: 'A critical look at the "lamentable failure" of global biodiversity targets and the paradigm shift needed to link climate with nature.',
    date: 'September 12, 2026',
    readTime: '24 min',
    content: [
      "1. RAPID ATTRITION: Wild animal populations have declined by 69% since 1970, with human-farmed livestock now accounting for 96% of all mammals on Earth.",
      "2. THE CRISIS OVERLAP: Biodiversity and climate are not separate issues; ecosystems like coral reefs and mangroves are vital for capturing the carbon that causes global heating.",
      "3. PURE ATTRITION: Conservationists at the Montreal Cop15 warn that 'absolutely no progress' has been made in slowing species loss despite decades of international treaties.",
      "4. PROPOSED FRAMEWORK: New targets include protecting 30% of global land and sea and forcing businesses to produce 'biodiversity impact assessments' before expansion.",
      "5. THE EXISTENTIAL NECESSITY: Human fate is bound up with the millions of species hurtling towards extinction; protecting nature is no longer an 'optional extra' but a survival imperative."
    ]
  },
  {
    id: '71',
    title: 'Motivation: The Bread-Making Attitude',
    type: 'Passage',
    subject: 'English Language',
    description: 'A philosophical parable contrasting the "instant coffee" desire for quick success with the reality of painstaking effort.',
    date: 'September 15, 2026',
    readTime: '18 min',
    content: [
      "1. THE INSTANT COFFEE FALLACY: Many approach complex skills like music with a desire for 'fast and easy' results, leading to dejection when faced with reality.",
      "2. PERSEVERANCE: Real success comes to those with a 'bread-making' attitude—willing to knead the dough, wait for it to rise, and repeat the process tirelessly.",
      "3. THE ARDUOUS JOURNEY: Every significant endeavor in academics, sports, or spirituality is a long journey requiring faith and meticulous practice over a lifetime.",
      "4. SHORT-LIVED SOLUTIONS: Seeking quick fixes or shortcuts invariably leads to failure, as these 'instant' results are fundamentally unstable and short-term.",
      "5. THE FAITH FACTOR: Only by accepting the 'difficult-but-true' fact that effort changes the course of life can individuals find genuine fulfillment beyond frustration."
    ]
  },
  {
    id: '72',
    title: 'Consumer Protection Act 2019: Redressal 2.0',
    type: 'Strategy',
    subject: 'Legal Reasoning',
    description: 'Analyzing the multi-tier regulatory framework and the shift towards strict product liability.',
    date: 'September 20, 2026',
    readTime: '22 min',
    content: [
      "1. CENTRAL AUTHORITY (CCPA): The 2019 Act established the CCPA to regulate matters relating to violation of consumer rights, unfair trade practices, and misleading advertisements.",
      "2. PRODUCT LIABILITY: Unlike the 1986 Act, the new law imposes strict liability on manufacturers, service providers, and sellers for any harm caused by a defective product or deficiency in service.",
      "3. E-COMMERCE JURISDICTION: Consumers can now file complaints where they reside, rather than where the seller's office is located, simplifying justice for online borderless transactions.",
      "4. MEDIATION GATEWAY: The Act introduces voluntary mediation as an ADR (Alternative Dispute Resolution) mechanism to resolve disputes amicably without lengthy court procedures.",
      "5. PENALTY SPECTRUM: The CCPA possesses the power to impose fines (up to 10-50 lakhs), order imprisonment, and even cancel business licenses for persistent violations or misleading endorsements."
    ]
  },
  {
    id: '73',
    title: 'Legal Lab: Landmark Consumer Verdicts',
    type: 'Note',
    subject: 'Legal Reasoning',
    description: 'Applying consumer law principles to real-world cases: Bata, medical negligence, and misleading e-commerce terms.',
    date: 'September 22, 2026',
    readTime: '25 min',
    content: [
      "1. THE CHARGED BAG CASE (Bata): Retailers cannot charge for carry bags if the bag carries the company's advertisement. Forcing customers to pay for their own advertising agent is an 'Unfair Trade Practice'.",
      "2. MEDICAL NEGLIGENCE (Nizam Institute): The Supreme Court awarded 61 Lakhs for negligent surgical treatment resulting in leg amputation. Compensation covers physical suffering, income loss, and legal costs.",
      "3. REFURBISHED AS NEW (The Riya Case): Selling a refurbished phone as 'new' constitutes an unfair trade practice. Statutory consumer rights override any misleading 'accepted' terms on a website.",
      "4. SERVICE CHARGE DEBATE: The CCPA guidelines bar hotels/restaurants from levying service charges 'automatically or by default'. Consumers have the right to choose whether to pay for the service quality.",
      "5. UNFAIR CONTRACTS: A 'Consumer' is defined as one who buys for personal use, not resale. Contracts with one-sided or exploitative terms can be challenged and declared void by the Commission."
    ]
  },
  {
    id: '74',
    title: 'Logical Reasoning: Structural Coherence',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Mastering parajumbles and sentence rearrangement by identifying logical connectors and opening statements.',
    date: 'September 20, 2026',
    readTime: '22 min',
    content: [
      "1. IDENTIFYING THE OPENER: Look for an independent sentence that introduces a topic or entity without pronouns or transition words (like 'However' or 'On the other hand').",
      "2. PRONOUN-ANTECEDENT LINKS: If a sentence starts with 'This', 'He', or 'They', find the noun it refers to in a previous sentence to form a mandatory pair.",
      "3. LOGICAL CONNECTORS: Use 'On the one hand... On the other hand' or 'While... Beyond that' patterns to group contrasting ideas together in sequence.",
      "4. TIME-SEQUENCE & CHRONOLOGY: Arrange events from past to present. In narratives, descriptions of a setting often precede specific actions or reactions.",
      "5. TOP-DOWN APPROACH: Usually, a general statement (e.g., 'Economic growth has effects') precedes specific examples (e.g., 'Standard of living improved in these economies')."
    ]
  },
  {
    id: '75',
    title: 'Mastering Interests: SI & CI Dynamics',
    type: 'Strategy',
    subject: 'Quantitative Techniques',
    description: 'Comprehensive guide to Simple and Compound Interest, including shortcuts for time-comparison and effective rates.',
    date: 'September 25, 2026',
    readTime: '25 min',
    content: [
      "1. SIMPLE INTEREST INVARIANT: In SI, the interest earned every year is identical. If year 2 is 1000, years 6, 7, and 8 are also 1000 each. Total = 3000.",
      "2. CI SUCCESSIVE GROWTH: Compound interest follows the (1 + r/100)^n formula. For a 10% rate over 2 years, Rs. 1000 becomes 1000 * 1.1 * 1.1 = 1210.",
      "3. TIMES-ITS-SELF SHORTCUT (CI): If a sum becomes 4 times in 8 years, it becomes 4^2 (16 times) in 8*2 = 16 years. Use powers for the 'times' and multipliers for the duration.",
      "4. EFFECTIVE RATE: When interest is compounded quarterly, the effective rate is [(1 + r/n)^n - 1] * 100. A 40% nominal rate becomes ~46.41% effective.",
      "5. CI-SI DIFFERENCE: For 2 years, Diff = P(R/100)². This is a high-frequency exam pattern used to quickly find Principal or Rate if the other is known."
    ]
  },
  {
    id: '76',
    title: 'Syllogisms: The Logic of Valid Arguments',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Mastering 3-statement valid arguments, Venn diagrams, and the absolute laws of deduction.',
    date: 'September 28, 2026',
    readTime: '22 min',
    content: [
      "1. SYLLOGISTIC CHAINS: A valid argument requires the third statement to be a direct conclusion from the first two. Pattern: All A are B, All B are C -> All A are C.",
      "2. DANGER OF THE UNDISTRIBUTED MIDDLE: If 'Some software companies employ knowledge workers' and 'Tara Tech employs knowledge workers', you CANNOT conclude Tara Tech is a software company.",
      "3. VENN DIAGRAMS: Use circles to represent sets. Overlapping circles represent 'Some', while concentric circles represent 'All'. A separate circle represents 'No/None'.",
      "4. NEGATION IN SYLLOGISMS: If 'No patriot is a criminal' and 'Bogusdas is a criminal', then 'Bogusdas is not a patriot' is a logically certain conclusion.",
      "5. SELECTIVE DEDUCTION: In complex sets (A-E), valid options (like 'ACE') must be tested for transitive properties where Statement A + Statement C = Statement E."
    ]
  },
  {
    id: '77',
    title: 'Logical Consistency: Either/Or & Implication',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Deconstructing binary statements (Either/Or) and conditional logic (Whenever/If) for high-accuracy reasoning.',
    date: 'October 01, 2026',
    readTime: '20 min',
    content: [
      "1. EITHER/OR PARADIGM: In 'Either P or Q', for the statement to remain true, if P is FALSE, Q must be TRUE. If Q is FALSE, P must be TRUE.",
      "2. CONDITIONAL IMPLICATION: In 'Whenever P, then Q', if P happens, Q must also happen. However, if Q happens, P might not necessarily have happened (affirming the consequent error).",
      "3. THE CONTRAPOSITIVE: In 'If I talk to my professors (P), then no pill needed (Q)', the only valid inverse is 'If I need a pill (~Q), then I did not talk to my professors (~P)'.",
      "4. NEGATING BINARIES: Significant marks are won by recognizing that 'The orangutan is angry' is logically equivalent to 'The orangutan does not frown upon the world' in an Either/Or setup where one is a negation.",
      "5. ORDERED PAIRS: When choosing implied pairs, the first statement must trigger the second based on the primary conditional given in the problem."
    ]
  },
  {
    id: '78',
    title: 'Mixed Batch Trading: Aggregate Cost Models',
    type: 'Data Set',
    subject: 'Quantitative Techniques',
    description: 'Mastering profit/loss in mixed inventory, weighted cost prices, and multi-discount stock portions.',
    date: 'October 05, 2026',
    readTime: '25 min',
    content: [
      "1. WEIGHTED CP CALCULATION: When buying at 15 for a rupee and 20 for a rupee, Find total CP for 60 apples (LCM): (4 + 3) = 7 rupees for 120 apples. Effective CP = 7/120 per apple.",
      "2. MIXED BATCH SALES: If selling at 35 for 2 rupees, SP = 2/35 per apple. Gain/Loss% = [(SP - CP) / CP] * 100. Always equalize quantity to identify absolute delta.",
      "3. STOCK SEGMENTATION: If 1/4 stock is sold at 10% discount and 1/2 at MP, find the net multiplier. Net SP = (0.25 * 0.9MP) + (0.50 * 1.0MP) + (0.25 * 0.75MP).",
      "4. SAME EXPENDITURES RULE: If spending the same amount on two lots (CP1, CP2), the average CP is the Harmonious Mean rather than Arithmetic Mean.",
      "5. TARGET PROFIT DISCOUNTING: To find the max discount that preserves a 5% net profit, use (MP * (1 - d)) = CP * 1.05. Solve for 'd' after identifying CP from item equations."
    ]
  },
  {
    id: '79',
    title: 'Advanced Interest: Compounding Variations',
    type: 'Strategy',
    subject: 'Quantitative Techniques',
    description: 'Deep dive into successive interest differences, half-yearly loan doubling, and effective rate comparisons.',
    date: 'October 08, 2026',
    readTime: '22 min',
    content: [
      "1. SUCCESSIVE YEAR DIFFERENCES (CI): The difference in interest between year n and n+1 is simply (r% of the interest of year n). If year 3 is Rs. 2420 and year 4 is Rs. 2662, Rate = (242/2420)*100 = 10%.",
      "2. THE LOAN DOUBLING RULE: At 20% interest compounded half-yearly (10% per 6 months), a sum doubles in approx 4 years (7.2 periods of 10% interest).",
      "3. MAXIMIZING INTEREST SCHEMES: 'Compounded monthly' always yields higher interest than 'Compounded annually' for the same nominal rate due to more frequent base expansion.",
      "4. NUMERICAL EQUIVALENCY: If Time Period = Rate of Interest, and sum becomes 10 times itself (Interest = 9P), solve for R in SI: 9 = (R * R) / 100. R = 30%.",
      "5. BIFURCATED PRINCIPALS: If Rs. 10000 is split at 8% and 12%, use the target weighted average (Income/Principal) to find the split ratio via alligation."
    ]
  },
  {
    id: '80',
    title: 'Colonial Ideology: The twain shall never meet',
    type: 'Passage',
    subject: 'English Language',
    description: 'Deconstructing Rudyard Kipling’s "White Man’s Burden" and the hegemonic justifications for colonialism.',
    date: 'October 12, 2026',
    readTime: '18 min',
    content: [
      "1. HEGEMONIC JUSTIFICATION: Colonialism was central to an ideology that viewed the East as fundamentally different and inferior to the West, using literature to spread this bias.",
      "2. THE BURDEN MYTH: Kipling’s 'White Man’s Burden' framed the 'civilizing' of the non-European world as a moral duty, masking the underlying violence and plunder.",
      "3. IDEOLOGICAL DOMINANCE: 'Hegemony' in this context refers to the cultural and ideological dominance used to maintain control over colonies for the benefit of the colonizer.",
      "4. RACIAL PREJUDICE: The phrase 'The East is East, and the West is West' implies an immutable, permanent distinction and an inherent hierarchy where the West educated the East.",
      "5. VOCABULARY: 'Abhorrent' means repugnant or detestable. Understanding this tone is key to identifying the author's critique of Kipling's racial prejudice."
    ]
  },
  {
    id: '81',
    title: 'Technological Threat: Long-term Pervasiveness',
    type: 'Passage',
    subject: 'English Language',
    description: 'Analyzing the environmental price of modern technology, from insecticides to the thousand-year fallout of Carbon-14.',
    date: 'October 15, 2026',
    readTime: '20 min',
    content: [
      "1. TRANSIENT VS PERSISTENT: Unlike earlier hazards which were localized and temporary, modern technical threats like air pollution and radiation are widespread and long-term.",
      "2. BIOLOGICAL HAZARDS: The use of nuclear fuel exposes humanity to radioactive radiation, with materials like Carbon-14 expected to persist for hundreds or thousands of years.",
      "3. ECOSYSTEM DISRUPTION: Modern insecticides disrupt the 'dynamics of equation' between living things and their environment, leading to a long-term decline in wildlife.",
      "4. AGRICULTURAL FALLOUT: The use of fertilizers to increase production leads to water waste and pollution, a significant negative consequence of the quest for technological benefits.",
      "5. CASUALTIES OF PROSPERITY: Even the most prosperous countries are casualties of the 'environmental disease' that their own technology breeds and exacerbates."
    ]
  },
  {
    id: '82',
    title: 'India’s MTP Act: Steps Toward Emancipation',
    type: 'Passage',
    subject: 'English Language',
    description: 'Critiquing the 2021 MTP Act amendments, focusing on reproductive rights, legal inclusions, and the sex-ratio challenge.',
    date: 'October 18, 2026',
    readTime: '22 min',
    content: [
      "1. NON-LINEAR PROGRESSION: Emancipation for women is seldom a linear path; the MTP Act amendments represent a step forward but not a 'giant leap'.",
      "2. LEGAL INCLUSIONS: By replacing 'husband' with 'partner', the current law recognizes living relations and permits unmarried women to seek legal terminations.",
      "3. FOETAL ANOMALIES: Termination is now allowed beyond 24 weeks in cases of foetal anomalies, provided it is approved by a state-appointed medical board.",
      "4. THE SEX-RATIO TENSION: A major concern is that any extension of rights might be misused for sex-selective abortions, potentially causing the national sex ratio to 'nosedive'.",
      "5. DETRIMENTAL RISKS: While extensions are welcome to reduce unsafe abortions, the law could be detrimental if it encourages illegal medical practices or gender-biased selection."
    ]
  },
  {
    id: '83',
    title: 'Molecular Embryology: The Determinant Puzzle',
    type: 'Passage',
    subject: 'English Language',
    description: 'Exploring the role of morphogenetic determinants and histones in the early development and determination of embryo cells.',
    date: 'October 21, 2026',
    readTime: '25 min',
    content: [
      "1. CELL DETERMINATION: Early biologists mistakenly thought early embryo cells were undetermined; modern biology shows fate is guided by substances present even before fertilization.",
      "2. MORPHOGENETIC DETERMINANTS: These inactive substances located in the egg's cytoplasm become active upon fertilization, governing the future behavior of genes.",
      "3. HISTONE SYNTHESIS: Fertilization triggers the synthesis of histones—proteins that bind to DNA to form 'beads on a string' structures in the cell nucleus.",
      "4. HETEROGENEOUS DISTRIBUTION: Determinants are not distributed evenly in the egg, meaning resulting cells from division are qualitatively different from the start.",
      "5. GUIDING FATE: The specific structure of beaded DNA strings acts as a blueprint, guiding the irreversible commitment of a cell to its biological fate."
    ]
  },
  {
    id: '84',
    title: 'Animal Altruism: Survival through Cohesion',
    type: 'Passage',
    subject: 'English Language',
    description: 'Analyzing the self-sacrificing behavior of West African Chimpanzees and the environmental pressures that foster group solidarity.',
    date: 'October 24, 2026',
    readTime: '20 min',
    content: [
      "1. SHARED EMPATHY: Altruism, often thought unique to humans, exists in animals like chimpanzees who adopt unrelated orphans and lavish care on them for years.",
      "2. THE LEOPARD FACTOR: The constant threat of big cats in West Africa’s Tai National Park is thought to encourage higher group cohesion and solidarity compared to East African groups.",
      "3. MALE INVOLVEMENT: Surprisingly, half of the adoptive parents in wild chimpanzee groups are male, challenging standard gender-based assumptions of caretaking behavior.",
      "4. WILD VS CAPTIVE: Altruism is significantly more widespread in wild populations than in zoos, where chimpanzees cooperate only to a very limited extent.",
      "5. BORDERLESS ALTRUISM: Adoptions often occur even of juveniles of other species, establishing that animals share a deep, natural willingness to help fellow creatures."
    ]
  },
  {
    id: '85',
    title: 'RC Strategy: Tone & Authorial Intent',
    type: 'Strategy',
    subject: 'English Language',
    description: 'Mastering the art of identifying the author\'s attitude, primary purpose, and the subtle "Shift in Tone" in complex passages.',
    date: 'October 27, 2026',
    readTime: '18 min',
    content: [
      "1. PRIMARY TONE: Does the author sound 'Cynical' (distrustful), 'Commendatory' (praising), 'Objective' (neutral), or 'Pedantic' (overly concerned with rules)?",
      "2. THE ARC OF ARGUMENT: Identify where the author introduces a common belief (e.g., 'Altruism is unique to humans') and then counters it with evidence ('Chimpanzee adoptions').",
      "3. VOCABULARY IN CONTEXT: A word like 'antediluvian' (literally 'before the flood') refers to something hopelessly outdated. Context provides the nuance even if the literal meaning is unclear.",
      "4. MAIN TOPIC VS SUBSIDARY THEME: Distinguish between the central argument (e.g., 'Cell determination is complex') and supporting details (e.g., 'Sea urchin experiments').",
      "5. INFERENCE GATES: Questions asking 'All except one can be inferred' require verifying every option against the text. If an option uses extremes like 'anywhere else' or 'only', be highly suspicious."
    ]
  },
  {
    id: '86',
    title: 'RC Lexicon: Academic & Jurisprudential Terms',
    type: 'Data Set',
    subject: 'English Language',
    description: 'A curated glossary of high-frequency words found in CLAT-style RC passages, covering legal, scientific, and sociological domains.',
    date: 'October 30, 2026',
    readTime: '15 min',
    content: [
      "1. HEGEMONY (Hegemonic): Leadership or dominance, especially by one country or social group over others (often cultural/ideological).",
      "2. ABHORRENT (Repugnant): Inspiring disgust and loathing; inconsistent with something.",
      "3. ANTEDILUVIAN: Hopelessly old-fashioned; out of date (literally: belonging to the time before the biblical Flood).",
      "4. ALTRUISM: Disinterested and selfless concern for the well-being of others.",
      "5. PERSISTENT VS TRANSIENT: Something that continues to exist (persistent) versus something that lasts only a short time (transient)."
    ]
  },
  {
    id: '87',
    title: 'Coding & Decoding: The Pattern Matrix',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Mastering letter shifts, numerical positional offsets, and chunk reversal logic for competitive reasoning.',
    date: 'November 02, 2026',
    readTime: '20 min',
    content: [
      "1. POSITIONAL SHIFTS: The most common pattern involves shifting letters forward (+n) or backward (-n). Example: SOBER to RNADQ is a -1 shift for every letter.",
      "2. POSITIONAL OFFSETS: Letters are replaced by their alphabet position plus a constant. Example: In MACHINE (19-7-9...), M(13) + 6 = 19, A(1) + 6 = 7.",
      "3. CHUNK REVERSAL: Words are split into halves or blocks (e.g., of 3 or 4) which are then reversed. Example: SUBSTITUTION becomes ITSBUS-NOITUT by reversing six-letter halves.",
      "4. SYMBOL SUBSTITUTION: Direct mapping of characters to specific symbols (%, #, $, *). Always identify the common symbols between two sample words to lock the code.",
      "5. THE 'MEANS/CALLED' LOGIC: If 'Green' is called 'Yellow' and 'Yellow' is called 'White', the color of human blood (Red) would be 'Violet' (based on the mapping provided in the prompt)."
    ]
  },
  {
    id: '88',
    title: 'Relational Coding: Sentence Logic',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Deciphering "Chinese Coding" and word-sentence mappings using the method of common elimination.',
    date: 'November 05, 2026',
    readTime: '18 min',
    content: [
      "1. COMMON WORD ELIMINATION: Compare two sentences (e.g., 'her idea has merit' and 'merit list has been') to find the common word ('merit') and its shared code ('na').",
      "2. ISOLATION TECHNIQUE: To find the code for a specific word like 'idea', isolate it by eliminating codes for 'her', 'has', and 'merit' from other sentence appearances.",
      "3. FREQUENCY ANALYSIS: If a word appears in three sentences, its code MUST also appear in all three mapping strings.",
      "4. ORDER INDEPENDENCE: In sentence coding, the position of the word does not usually match the position of the code. Word 1 is NOT necessarily Code 1.",
      "5. PROBABLE CODING: If a specific word cannot be isolated between two codes (e.g., 'bu' or 'fo'), the answer is often 'Either A or B' or 'Cannot be determined' unless more sentences are provided."
    ]
  },
  {
    id: '89',
    title: 'Seating Arrangements: Constraints & Conflict',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Mastering circular and linear arrangements with multi-variable constraints for high-speed puzzle solving.',
    date: 'November 08, 2026',
    readTime: '22 min',
    content: [
      "1. THE 'ONLY' CONSTRAINT: Identifying fixed positions first—e.g., 'A sits at one of the extreme ends' or 'B is the only person between C and D'.",
      "2. CIRCULAR CENTER-LOOKING: Left and Right are determined relative to the center. For 'A is second to the left of B', draw B first, then skip one spot clockwise to place A.",
      "3. FACING OPPOSITE DIRECTIONS: In linear rows, if some face North and others South, 'Left' and 'Right' flip based on the individual's facing direction.",
      "4. THE 'NEITHER/NOR' BLOCK: Use negative clues to eliminate spots. If 'C sits neither opposite to A nor adjacent to B', mark those spots as disallowed for C immediately.",
      "5. VARIABLE LAYERING: In CLAT, seating is rarely alone. It's often '7 people, 7 colors, 2 rows'. Use a base table to track variables alongside the physical diagram."
    ]
  },
  {
    id: '90',
    title: 'The Art of the Assumption: The Unstated Premise',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Differentiating between conclusions and assumptions using the Negation Test and the Bridge Gap method.',
    date: 'November 12, 2026',
    readTime: '25 min',
    content: [
      "1. DEFINING ASSUMPTION: An assumption is a hidden premise that the author NECESSARILY takes to be true for the argument to reach its conclusion.",
      "2. THE NEGATION TEST: The most powerful tool—negate the option. If the negated statement destroys the argument, it IS a valid assumption. If the argument survives, the option is just a detail.",
      "3. BRIDGE THE GAP: Identify the jump from 'Fact A' to 'Conclusion B'. The assumption is often the logical bridge that connects A to B (e.g., 'Product X is cheap, so people will buy it' assumes 'People prefer cheap products').",
      "4. AVOID RESTATING: An assumption is never a summary of the passage. If an option just rephrases the conclusion, it is NOT an assumption.",
      "5. SCOPE WATCHING: Assumptions must stay within the logical boundaries of the argument. Be wary of 'always', 'only', or 'never' unless the argument itself is absolute."
    ]
  },
  {
    id: '91',
    title: 'Syllogisms: The Venn Diagram Method',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Resolving "Some/All/None" logic puzzles using categorical intersections and the "Possibility" rule-set.',
    date: 'November 15, 2026',
    readTime: '20 min',
    content: [
      "1. UNIVERESAL AFFIRMATIVE (All A are B): Draw circle A entirely inside circle B. Remember: This doesn't mean All B are A.",
      "2. PARTICULAR AFFIRMATIVE (Some A are B): Draw circles A and B intersecting. The 'Some' zone must hold at least one element.",
      "3. THE 'NO' RELATION: If 'No A is B', the circles must never touch. This is the strongest negative constraint.",
      "4. POSSIBILITY VS CERTAINTY: A conclusion follows only if it is true in EVERY possible Venn diagram. If it's true in one but not another, it's 'Possible' but not 'Definite'.",
      "5. COMPLEMENTARY PAIRS: If either 'Some A are B' or 'No A is B' must be true, identify the 'Either/Or' case based on the provided premises."
    ]
  },
  {
    id: '92',
    title: 'Blood Relations: The Family Tree Blueprint',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Visualizing kinship through generation layers, gender markers, and direct vs. collateral lineages.',
    date: 'November 18, 2026',
    readTime: '15 min',
    content: [
      "1. GENERATION LAYERS: Always draw vertically. Grandparents at top, children at bottom. Horizontal lines denote siblings; double horizontal lines denote couples.",
      "2. GENDER MARKERS: Use '+' for Male and '-' for Female (or squares vs. circles) consistently. Never assume gender based on names unless specified.",
      "3. THE 'ONLY CHILD' CLUE: A critical constraint—if A is the only child of B, then A has no siblings, which narrows paths in complex 'Pointing to a photograph' questions.",
      "4. MATERNAL VS PATERNAL: Distinguish between 'Maternal Uncle' (Mother's brother) and 'Paternal Uncle' (Father's brother) as CLAT often tests this nuance.",
      "5. CODED RELATIONS: In 'A + B means A is father of B', solve by grouping pairs. Don't try to solve the whole string at once; build the tree segment by segment."
    ]
  },
  {
    id: '93',
    title: 'Critical Reasoning: Strengthen & Weaken',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Learning to identify the "Central Claim" and manipulating the validity of the supporting evidence.',
    date: 'November 21, 2026',
    readTime: '25 min',
    content: [
      "1. IDENTIFY THE CONCLUSION: Before looking at options, find the author's main point. Ask: 'What is this person trying to convince me of?'.",
      "2. STRENGTHENING: Look for an option that provides a new fact supporting the link between the premise and the conclusion. It doesn't prove it, but makes it more likely.",
      "3. WEAKENING: Find an option that breaks the link or provides an alternative explanation for the observed facts. You are not attacking the facts, but the 'jump' between them.",
      "4. OUT OF SCOPE: Many seductive options are true in the real world but irrelevant to the specific logic of the passage. If it doesn't touch the author's specific evidence, ignore it.",
      "5. CAUSE AND EFFECT: In 'A causes B' arguments, you can weaken by showing 'B causes A', 'C causes both', or 'A happens but B doesn't'."
    ]
  },
  {
    id: '94',
    title: 'Direction Sense: The Cartesian Approach',
    type: 'Strategy',
    subject: 'Logical Reasoning',
    description: 'Using coordinate geometry principles and Pythagoras theorem to solve complex movement tracks.',
    date: 'November 24, 2026',
    readTime: '18 min',
    content: [
      "1. THE 8-POINT COMPASS: Master the cardinal (N, S, E, W) and ordinal (NE, NW, SE, SW) directions. Always draw a small cross before starting any problem.",
      "2. PYTHAGORAS IN PLAY: For 'Total Distance' (displacement), used a^2 + b^2 = c^2. Most problems involve right-angled turns forming a triangle.",
      "3. SHADOW LOGIC: In morning (Sun in East), shadows fall West. In evening (Sun in West), shadows fall East. At 12 noon, there is technically 'no' shadow.",
      "4. CLOCKWISE VS ANTI-CLOCKWISE: Turns are often given in degrees. 90 deg clockwise from North is East. 135 deg anti-clockwise from North is SW.",
      "5. START-POINT FOCUS: Always track the position relative to the 'Starting Point'. Distinguish between 'Which direction is he facing?' and 'In which direction is he from the start?'."
    ]
  }
];
