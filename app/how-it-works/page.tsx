const steps = [
  {
    color: "var(--sea)",
    title: "Describe a real experience",
    desc: "One box, no forms. What did YOU do, what happened, numbers if you have them. 20 to 8000 characters — the engine needs meat, not adjectives.",
  },
  {
    color: "var(--sky)",
    title: "The engine weighs the evidence",
    desc: "Gemini 2.5 Flash runs under a strict evaluator prompt: every claim is tagged action, outcome, metric, or inferred. Numbers are never invented. Team credit isn't personal credit.",
  },
  {
    color: "var(--sand)",
    title: "Every skill gets a confidence score",
    desc: "0.10 to 0.95 — metric-backed claims score high, vague claims score low, implied skills stay low no matter how obvious. Nothing ever gets 1.0: text alone can't fully prove anything.",
  },
  {
    color: "var(--terracotta)",
    title: "Face the interrogation",
    desc: "Sharp follow-up questions target your weakest evidence: the vague claims, the missing numbers, the \"we\" statements. If you're lying, these get uncomfortable.",
  },
  {
    color: "var(--sea)",
    title: "Walk away with proof",
    desc: "A verdict, a STAR interview story, resume bullets, and a LinkedIn blurb — built only from facts you actually stated. Weak but true beats impressive but invented.",
  },
];

export default function HowItWorks() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <a href="/" className="nav-link text-sm" style={{ color: "var(--alabaster-dim)" }}>
        ← back to home
      </a>

      <h1 className="rise mt-10" style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 1 }}>
        how it works
      </h1>
      <p className="rise mt-6 max-w-xl" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster-dim)", lineHeight: 1.7, animationDelay: "120ms" }}>
        Unseen doesn&apos;t discover magical hidden talents. It measures how strongly
        your own words prove your skills — then hands you the evidence.
      </p>

      <div className="mt-20 flex flex-col gap-14">
        {steps.map((s, i) => (
          <div key={i} className="rise flex gap-6" style={{ animationDelay: `${240 + i * 120}ms` }}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ background: s.color, color: "var(--deep)", fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700 }}>
              {i + 1}
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "24px", color: "var(--alabaster)" }}>
                {s.title}
              </h2>
              <p className="mt-2" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "15px", color: "var(--alabaster-dim)", lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}