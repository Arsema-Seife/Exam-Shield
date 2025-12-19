# ExamShield

**Predict failure and burnout—before exams do.**  
ExamShield is an AI-powered academic risk and burnout prediction tool designed to help students identify potential issues **before exams happen** and take preventive actions.

---

## Table of Contents
- [ExamShield](#examshield)
  - [Table of Contents](#table-of-contents)
  - [Inspiration](#inspiration)
  - [What it Does](#what-it-does)
  - [How I Built It](#how-i-built-it)
  - [Challenges](#challenges)
  - [Accomplishments](#accomplishments)
  - [Future Plans](#future-plans)
  - [Tech Stack](#tech-stack)

---

## Inspiration
Many students don’t fail because they don’t study—they fail because they realize problems too late. Burnout, missed topics, and poor planning often appear only days before exams. I wanted to create a tool that acts as an **early-warning system** to prevent last-minute stress and failure.

---

## What it Does
ExamShield allows students to enter:
- Subjects and exam dates
- Daily study hours
- Missed study days
- Topic difficulty
- Stress levels  

It outputs:
- Academic risk (Low / Medium / High)
- Burnout probability
- Subject-wise weakness analysis
- Actionable recommendations for improvement

---

## How I Built It
- **Frontend:** HTML5, CSS3 (Flexbox & Grid), JavaScript (ES6)
- **Visualization:** Chart.js for risk indicators, progress charts
- **Logic / AI:** Rule-based scoring system, enhanced with AI-generated insights
- **Data Storage:** Browser LocalStorage (no backend required)

**Risk Score Formula:**
\[
\text{Risk Score} = w_1(\text{Missed Study Days}) + w_2(\text{Topic Difficulty}) + w_3(\text{Stress Level}) - w_4(\text{Daily Study Hours})
\]

---

## Challenges
- Balancing **simplicity** with meaningful predictive insights
- Designing the interface to feel **supportive**, not stressful
- Prioritizing impactful features within a **short hackathon timeframe**

---

## Accomplishments
- Built a fully functional predictive tool as a **solo participant**
- Created a **clear, intuitive dashboard** for risk analysis
- Designed a **student-friendly UI** with calming visual feedback

---

## Future Plans
- Improve prediction accuracy with real student data
- Add offline-first functionality for low-connectivity regions
- Integrate calendar syncing and long-term progress tracking
- Explore partnerships with schools and online learning platforms

---

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Charts / Visualization:** Chart.js
- **Fonts & Icons:** Google Fonts, Lucide / Material Icons
- **Data Storage:** Browser LocalStorage
- **Optional AI:** OpenAI API for insights

---
