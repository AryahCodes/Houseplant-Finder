# Houseplant Finder

*A constrained decision system built with Next.js*

🌐 **Live demo:** https://houseplant-finder.vercel.app  

🛠 **Stack:** Next.js (App Router), TypeScript, Tailwind  
🧠 **Focus:** clarity, constraints, and contributor-friendly design

---

## Overview

Houseplant Finder is a frontend-only Next.js application that helps users choose houseplants based on their space, lifestyle, and care preferences.

The app intentionally avoids backend complexity (no authentication, no database) and instead focuses on **decision modeling, UX clarity, and maintainability**. It is designed both as a practical tool for users and as a clean, approachable codebase for learning and contribution.

---

## System Design (High Level)

This project is best understood as a **constrained decision system**, not a CRUD app.

### Inputs

Users answer a short quiz about:

- light availability  
- watering habits  
- care effort  
- pet safety  
- space constraints  

### Processing

- Each plant has a fixed set of attributes  
- Quiz answers map to those attributes  
- A scoring function applies penalties for mismatches  
- **Lower score = better match**  
- Scores are converted into human-readable match labels (Excellent, Great, Good, Okay)

### Outputs

- Ranked list of plant recommendations  
- Clear explanations of why a plant is a good or risky choice  
- Realistic care guidance instead of idealized advice  

The system prioritizes **explainability over precision**.  
Users don’t see raw scores — they see understandable outcomes.

---

## Why No Backend?

This was a deliberate architectural decision.

### Tradeoffs made on purpose

- No authentication  
- No database  
- No server-side state  

### Why this matters

- Keeps the mental model small  
- Makes data flow easy to reason about  
- Reduces contributor onboarding friction  
- Forces clarity in component boundaries and logic  

This project optimizes for **readability and correctness**, not feature count.

---

## Why This Project Exists

Many beginners fail at houseplants not because they lack interest, but because they start with plants that don’t fit their environment or habits.

This project focuses on:

- honest tradeoffs instead of “perfect” plants  
- simple explanations instead of jargon  
- guidance users can realistically follow  

On the engineering side, it exists to answer a different question:

> What does a real, modern Next.js app look like when you intentionally keep it simple?

---

## Tech Stack

- Next.js (App Router)  
- React  
- TypeScript  
- Static JSON data  
- Client-side quiz and scoring logic  

There is no backend, no authentication layer, and no persistence beyond local state.  
This is intentional.

---

## Local Development

```bash
npm install
npm run dev
