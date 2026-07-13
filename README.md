\# Unseen



> You put yourself into it and get something quantitative out of it.



\## What it does



Currently the whole recruiting and hiring system is based majorly on academics, whereas a person has many other perks skills you could take him or her in for that academics alone won't show. Unseen takes a real experience you describe in your own words and turns it into something quantitative: evidence-scored, not vibes-scored.



\## Status



Currently v1. We wanna upgrade in every way possible.cz I rly think this thing has potential and wanna make it global fs



\## Tech Stack



\- \*\*Framework:\*\* Next.js 16 (App Router), React 19

\- \*\*Styling:\*\* Tailwind CSS v4, shadcn/ui

\- \*\*AI Engine:\*\* Google Gemini 2.5 Flash (`@google/generative-ai`)

\- \*\*Database:\*\* Supabase (Postgres)

\- \*\*Validation:\*\* Zod

\- \*\*Animation:\*\* Framer Motion

\- \*\*Deployment:\*\* Vercel



\## How it works



1\. User describes a real experience in their own words

2\. Gemini analyzes the text against a strict evidence framework — tagging claims as action, outcome, metric, or inferred

3\. Vague or unsubstantiated claims score low; concrete, numbers-backed proof scores high

4\. Output includes a skill breakdown, resume bullets, a STAR story, and follow-up questions to strengthen weak spots


## Known Limitations

- v1 — scoring accuracy still being refined
- Single-experience analysis only, no multi-session history yet
- No user auth yet

## AI Use Disclosure

This project was built with AI assistance (Claude) for parts of development, alongside personal hands-on coding.

AI-assisted:e.g. debugging deployment/build errors, boilerplate scaffolding

Human-written: Logic, UI, prompt engineering,Entire code, planning

All README and narrative copy (this file, Our Story, FAQ) is written by Jaz.

## Screenshots

![Home page](1ss.ong)

![The Interview — input screen](2ss.png)

![Results — evidence breakdown](3ss.png)

\## Getting Started


https://unseen-theta.vercel.app/



