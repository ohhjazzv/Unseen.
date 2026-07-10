export default function OurStory() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <a href="/" className="nav-link text-sm" style={{ color: "var(--alabaster-dim)" }}>
        ← back to home
      </a>

      <h1 className="rise mt-10" style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 1 }}>
        our story
      </h1>
      <p className="rise mt-6 max-w-xl" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster-dim)", lineHeight: 1.7, animationDelay: "120ms" }}>
        Marks shouldn&apos;t be the only right to selection.
      </p>

      <div className="rise mt-16 flex flex-col gap-4" style={{ animationDelay: "200ms" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sky)", letterSpacing: "1px", textTransform: "uppercase" }}>
          the problem
        </p>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster)", lineHeight: 1.8 }}>
          A resume can say anything. A grade captures one exam, in one subject, on one day.
          Neither one checks whether what you claimed actually happened — or how strongly
          the truth actually backs it up. Real ability, the kind built through actually doing
          things, doesn&apos;t always show up on paper the same way a certificate does.
        </p>
      </div>

      <div className="rise mt-14 flex flex-col gap-4" style={{ animationDelay: "280ms" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sky)", letterSpacing: "1px", textTransform: "uppercase" }}>
          what unseen does instead
        </p>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster)", lineHeight: 1.8 }}>
          Unseen doesn&apos;t take your word for it, and it doesn&apos;t flatter you either. You
          describe something real you did. The engine breaks it down into evidence — actions,
          outcomes, metrics, or things that are only implied — and scores how strongly each
          piece actually proves a skill. Vague claims stay low. Implied skills stay low, no
          matter how obvious they seem. Numbers are never invented.
        </p>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster)", lineHeight: 1.8 }}>
          If the evidence is weak, Unseen says so — plainly, no polish, no career assets handed
          over for proof that doesn&apos;t hold up. It asks harder follow-up questions instead.
          Weak but true beats impressive but invented.
        </p>
      </div>

      <div className="rise mt-14 flex flex-col gap-4" style={{ animationDelay: "360ms" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sky)", letterSpacing: "1px", textTransform: "uppercase" }}>
          who built it
        </p>
        <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "17px", color: "var(--alabaster)", lineHeight: 1.8 }}>
          Unseen is built solo, for Hack Club Horizons. Every scoring rule, every confidence
          band, every line of the &ldquo;evidence, not flattery&rdquo; thesis was a decision made by hand
          — not defaults, not a template.
        </p>
      </div>
    </main>
  );
}