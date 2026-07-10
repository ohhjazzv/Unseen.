const faqs = [
  {
    q: "Why does Unseen exist?",
    a: "A lot of what actually matters — how you handle responsibility, manage yourself, cope, grow — never makes it onto a resume or a report card. Degrees and scores don't capture that. Unseen tests and analyzes your real experience instead, so that stuff stops being unseen.",
  },
  {
    q: "How is this different from just asking ChatGPT to write my resume?",
    a: "ChatGPT will make anything sound impressive if you ask it to. Unseen does the opposite — it checks how strongly your experience actually proves a skill before it says anything. If something's only implied, it stays scored low instead of getting inflated.",
  },
  {
    q: "How does the scoring actually work?",
    a: "It doesn't just take your word for it. Unseen breaks your experience down into evidence, then scores how much that evidence actually proves each skill — stuff you clearly did gets scored higher, stuff that's just implied gets scored lower. It's built to be skeptical, not flattering.",
  },
  {
    q: "What happens if my input is vague or exaggerated?",
    a: "If the evidence is weak, Unseen won't hand you a polished resume for it — it'll tell you it's weak and ask follow-up questions instead, so you can actually strengthen the proof.",
  },
  {
    q: "Is this a Hack Club project?",
    a: "Built during Hack Club Horizons — but designed to stand on its own, not just as a hackathon entry.",
  },
  {
    q: "What's it built with?",
    a: "Next.js, TypeScript, and Tailwind on the frontend, Gemini 2.5 Flash as the analysis engine, Supabase for storage, Zod for validation, deployed on Vercel.",
  },
  {
    q: "Is my data private?",
    a: "Right now Unseen stores your input to run the analysis — there are no accounts or logins yet in this version.",
  },
  {
    q: "What's next for Unseen?",
    a: "Making it more accurate and more friendly, plus new features like catching false or exaggerated claims — it'll keep upgrading from here.",
  },
];

export default function Faq() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <a href="/" className="nav-link text-sm" style={{ color: "var(--alabaster-dim)" }}>
        ← back to home
      </a>

      <h1 className="rise mt-10" style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 1 }}>
        faq
      </h1>
      <p className="rise mt-6 max-w-xl" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster-dim)", lineHeight: 1.7, animationDelay: "120ms" }}>
        Real questions, answered straight.
      </p>

      <div className="mt-20 flex flex-col gap-14">
        {faqs.map((f, i) => (
          <div key={i} className="rise" style={{ animationDelay: `${240 + i * 120}ms` }}>
            <h2 style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "24px", color: "var(--alabaster)" }}>
              {f.q}
            </h2>
            <p className="mt-2" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "15px", color: "var(--alabaster-dim)", lineHeight: 1.7 }}>
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}