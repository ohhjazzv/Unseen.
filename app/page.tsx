return (
    <main className="min-h-screen">
      <nav
        className="mx-auto mt-6 flex w-fit items-center gap-6 rounded-full px-6 py-3"
        style={{ background: "var(--abyss)", border: "1px solid var(--border-soft)" }}
      >
        <span style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "18px" }}>
          unseen<span style={{ color: "var(--sea)" }}>.</span>
        </span>
        <a href="#how" className="text-sm" style={{ color: "var(--alabaster-dim)" }}>how it works</a>
        <a href="#analyze" className="rounded-full px-4 py-1.5 text-sm"
          style={{ background: "var(--sky)", color: "var(--deep)", fontWeight: 500 }}>
          start
        </a>
      </nav>

      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
        <h1 style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "clamp(64px, 12vw, 120px)", lineHeight: 1 }}>
          unseen<span style={{ color: "var(--sea)" }}>.</span>
        </h1>
        <p className="mt-4" style={{ fontFamily: "var(--font-jost)", fontWeight: 200, fontSize: "18px", letterSpacing: "4px", color: "var(--sand)" }}>
          TALENT IS UNIVERSAL. RECOGNITION ISN&apos;T.
        </p>
        <p className="mx-auto mt-6 max-w-xl" style={{ color: "var(--alabaster-dim)", fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px" }}>
          Describe a real experience. Unseen measures how strongly it proves each
          skill — no flattery, no invented numbers — then turns it into interview-ready proof.
        </p>
        <a href="#analyze" className="mt-10 inline-block rounded-md px-8 py-4"
          style={{ background: "var(--sky)", color: "var(--deep)", fontFamily: "var(--font-jost)", fontWeight: 500, letterSpacing: "1px" }}>
          analyze my experience
        </a>
      </section>

      <section id="how" className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "skill confidence", desc: "every skill scored 0.10–0.95 by evidence strength", color: "var(--sea)" },
          { label: "evidence ledger", desc: "each claim tagged: action, outcome, metric, inferred", color: "var(--sky)" },
          { label: "STAR story", desc: "an interview answer built only from your facts", color: "var(--sand)" },
          { label: "the interrogation", desc: "follow-ups that expose vague claims", color: "var(--terracotta)" },
          { label: "career assets", desc: "resume bullets + a LinkedIn blurb, zero embellishment", color: "var(--sea)" },
        ].map((f, i) => (
          <div key={i} className="rounded-xl p-5"
            style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)", borderTop: `3px solid ${f.color}` }}>
            <div style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "15px", letterSpacing: "1px", color: f.color }}>
              {f.label}
            </div>
            <div className="mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)", lineHeight: 1.6 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </section>

      <section id="analyze" className="mx-auto max-w-2xl px-6 pb-24">
        {/* ⬇️ your existing textarea + button + counter + error + <pre> block goes here, unchanged ⬇️ */}
      </section>
    </main>
  );