# Errata — P5 Mathematics Question Bank

**Source:** Red Square Exam Intensive MCS P.5 Mathematics Term 3 Examination, Revision Papers 2–5  
**File:** `src/data/p5_questions.json`  
**Date of review:** 2026-04-29  
**Total errors found:** 21 (20 corrected; 1 flagged as needing original-paper verification)

All corrections have been applied to the JSON file. This document records what was wrong and why.

---

## Place Value & Rounding

### P2-A2 — Wrong MCQ answer
**Question:** If 243,678 > Y > 241,987, which is a possible value of Y?  
**Was:** B (243,688)  
**Now:** C (242,424)  
**Reason:** 243,688 > 243,678, so it fails the upper bound. Only 242,424 lies strictly between 241,987 and 243,678.

---

### P4-A1 — Wrong MCQ answer
**Question:** What is the sum of the smallest 6-digit odd number and the largest 4-digit even number?  
**Was:** D (1,009,999)  
**Now:** B (109,999)  
**Reason:** Smallest 6-digit odd = 100,001; largest 4-digit even = 9,998; sum = 109,999.

---

### P4-A2 — Wrong MCQ answer
**Question:** Which of the following has its value nearest to 4.5?  
**Was:** C (4.509)  
**Now:** B (4.493)  
**Reason:** |4.493 − 4.5| = 0.007 < |4.509 − 4.5| = 0.009. B is closer.

---

## Fractions & Mixed Numbers

### P2-B8 — Wrong answer
**Question:** 10 5/7 ÷ 5/14 ÷ 5/8 = ?  
**Was:** 24  
**Now:** 48  
**Reason:** 75/7 × 14/5 × 8/5 = 8,400/175 = **48**.

---

### P4-B4 — Wrong answer
**Question:** Katelyn has 4 5/8 L of paint. She pours them into small pots of 5/6 L. How much paint is left?  
**Was:** 1/24 L  
**Now:** 11/24 L  
**Reason:** 5 full pots × 5/6 = 25/6 L used. Remainder: 37/8 − 25/6 = 111/24 − 100/24 = **11/24 L**. (Likely a transcription typo — "1" dropped from "11".)

---

### P5-B7 — Wrong answer
**Question:** 24 4/5 ÷ 2 9/13 ÷ 1 11/15 = ?  
**Was:** 9  
**Now:** 5 11/35  
**Reason:** 124/5 × 13/35 × 15/26 = 186/35 = 5 11/35. The answer 9 does not correspond to these numbers. If the original paper has different numbers, please verify and update the question text.

---

## Decimals & Decimal Computation

### P2-A7 — Wrong MCQ answer ⚠️ Verify question text
**Question:** When calculating 1.42 × 0.9, Bella calculated 142 × 9 instead. Her answer is how many times that of the correct answer?  
**Was:** C (100)  
**Now:** D (1000)  
**Reason:** 1.42 → 142 is ×100; 0.9 → 9 is ×10; total factor = ×1000.  
**Note:** If the original paper says "Bella calculated **14.2 × 9**" (one decimal shift only), the factor is 100 and the answer should remain C. Please check the original paper.

---

## Word Problems

### P5-B23 — Wrong answer
**Question:** Change if Ellsy pays $100 for 4 boxes of milk ($4.60) and 5 boxes of orange juice ($5.10).  
**Was:** $56.90  
**Now:** $56.10  
**Reason:** 4 × $4.60 = $18.40; 5 × $5.10 = $25.50; total = $43.90; change = $100 − $43.90 = **$56.10**.

---

### P3-B12 — Wrong answer
**Question:** Susan had 216 balloons; 1/8 pink, 7/12 red. How many yellow?  
**Was:** 54  
**Now:** 63  
**Reason:** Pink = 27, Red = 126, Yellow = 216 − 153 = **63**. (1/8 + 7/12 = 17/24; remaining 7/24 × 216 = 63.)

---

### P5-D1 — Wrong answer
**Question:** Mr. Chan: 7 11/21 m − 4 2/7 m + 2 1/6 m = ?  
**Was:** 5 5/14 m  
**Now:** 5 17/42 m  
**Reason:** Step 1: 7 11/21 − 4 6/21 = 3 5/21. Step 2: 3 10/42 + 2 7/42 = **5 17/42** ≈ 5.405. The given 5 5/14 ≈ 5.357 is incorrect.

---

### P4-B18 — Wrong answer
**Question:** How much more water can jar (1 7/8 L) and pot (4 11/20 L) hold in total than bottle (2 1/5 L)?  
**Was:** 4 3/20 L  
**Now:** 4 9/40 L  
**Reason:** 1.875 + 4.55 − 2.2 = 4.225 = **4 9/40**. The given 4 3/20 = 4.15 is incorrect.

---

### P2-B25 — Garbled answer field
**Question:** 70 2/5 kg of flour packed into 5 1/5 kg boxes. How much is left?  
**Was:** `0 kg (exact — 70 2/5 ÷ 5 1/5 = 13 and 1/2 remainder check: 13 × 5 1/5 = 67 6/5... answer: 3/5 kg)` *(corrupted)*  
**Now:** 2 4/5 kg  
**Reason:** 352/5 ÷ 26/5 = 176/13 → 13 complete boxes. 13 × 26/5 = 338/5 = 67 3/5 kg used. Remainder: 70 2/5 − 67 3/5 = **2 4/5 kg**.

---

## Area & Perimeter

### P3-A3 — Wrong MCQ answer
**Question:** Rectangle made of 2 identical squares (area 36 cm² each). Find perimeter of rectangle.  
**Was:** C (54 cm)  
**Now:** B (36 cm)  
**Reason:** Each square has side 6 cm. Rectangle = 6 × 12 cm. Perimeter = 2(6 + 12) = **36 cm**.

---

### P5-B18 — Wrong answer
**Question:** How many 7-cm squares can be cut from a 29 cm × 23 cm sheet of paper?  
**Was:** 9  
**Now:** 12  
**Reason:** ⌊29 ÷ 7⌋ = 4 columns; ⌊23 ÷ 7⌋ = 3 rows; 4 × 3 = **12** squares.

---

### P2-D2 — Wrong answer
**Question:** Parallelogram base = 36.6 cm, height = 0.75 × base. Find area (nearest tenth).  
**Was:** 1005.5 cm²  
**Now:** 1004.7 cm²  
**Reason:** Height = 0.75 × 36.6 = 27.45 cm. Area = 36.6 × 27.45 = **1004.67 ≈ 1004.7 cm²**.

---

### P5-B13 — ⚠️ NEEDS VERIFICATION (not corrected)
**Question:** Perimeter of isosceles triangle = 39 cm. Two equal sides = 11 cm. Base = 9 cm. Find area.  
**Current answer:** 76 cm² [flagged in file]  
**Issue:** The data is internally inconsistent. If equal sides = 11 and perimeter = 39, then base = 39 − 22 = 17 cm (not 9 cm). If base = 9 and sides = 11, perimeter = 31 cm (not 39). Additionally, with sides = 11 cm, the maximum possible area of such a triangle is ≈ 60.5 cm², so 76 cm² is geometrically impossible. **Please check the original Paper 5 Section B for the correct numbers.**

---

## Volume & 3-D Shapes

### P4-A8 — Wrong MCQ answer
**Question:** Which of the following 3-D shapes has a different number of edges?  
**Was:** D (hexagonal pyramid)  
**Now:** A (square pyramid)  
**Reason:** Square pyramid = 8 edges. Cube = 12 edges. Rectangular prism = 12 edges. Hexagonal pyramid = 12 edges. Square pyramid is the odd one out.

---

### P5-A8 — Wrong MCQ answer
**Question:** Sally wants to make a rectangular pyramid; she has 4 toothpicks. How many more toothpicks and plasticines does she need?  
**Was:** C (8 toothpicks and 5 plasticines)  
**Now:** D (4 toothpicks and 5 plasticines)  
**Reason:** Rectangular (square) pyramid: 8 edges, 5 vertices. She already has 4 toothpicks, so needs 4 more. She needs 5 plasticines (one per vertex).

---

## 2-D Shape Properties / Unit Conversions

### P5-A11 — Wrong MCQ answer
**Question:** Which of the following is correct?  
**Was:** C (0.025 kg = 250 g)  
**Now:** A (28 cm = 0.28 m)  
**Reason:** 0.025 kg = 25 g (not 250 g). 28 cm = 0.28 m ✓. 680 ¢ = $6.80 (not $68). 0.6 km = 600 m (not 600 cm).

---

### P4-A4 — Wrong MCQ answer
**Question:** Paul ran 3 1/5 laps (Mon), 3 4/25 laps (Tue), 2 3/8 laps (Wed). Which statement is correct?  
**Was:** D (Paul ran more than 2 1/2 laps on Wednesday)  
**Now:** C (Paul ran 6 9/25 laps on Monday and Tuesday altogether)  
**Reason:** C is true: 3 5/25 + 3 4/25 = 6 9/25 ✓. D is false: 2 3/8 = 2.375 < 2.5 = 2 1/2.

---

## Direction & Maps

### P4-B22a — Wrong answer
**Question:** The Bank is directly south of the Park and directly east of the Market. The Bank is to the ___ of the Market.  
**Was:** south  
**Now:** east  
**Reason:** The question itself states the Bank is directly east of the Market.

---

*End of errata. Questions not listed here were verified as correct.*
