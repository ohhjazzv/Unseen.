"use client";

import { useState, useEffect } from "react";
import type { Analysis } from "@/lib/schema";

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1);
      setN(Number((value * (1 - Math.pow(1 - p, 3))).toFixed(1)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}

export default function Home() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "forging" | "done" | "error">("idle");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleAnalyze() {
    setStatus("forging");
    setErrorMsg("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, save: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong");
        setStatus("error");
        return;
      }
      setAnalysis(data.analysis);
      setStatus("done");
    } catch {
      setErrorMsg("Could not reach the engine. Is the server up?");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen">
      <nav
        className="mx-auto mt-6 flex w-fit items-center gap-6 rounded-full px-6 py-3"
        style={{ background: "var(--abyss)", border: "1px solid var(--border-soft)" }}
      >
        <span style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "18px" }}>
          unseen<span style={{ color: "var(--sea)" }}>.</span>
        </span>
        <a href="/how-it-works" className="nav-link text-sm" style={{ color: "var(--alabaster-dim)" }}>how it works</a>
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

      <section id="analyze" className="mx-auto max-w-5xl px-6 pb-24">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe a real experience. What did YOU do? What happened? Numbers if you have them."
          rows={7}
          className="w-full rounded-lg p-4 outline-none"
          style={{
            background: "var(--deeper)",
            border: "1px solid var(--border-soft)",
            color: "var(--alabaster)",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
          }}
        />
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleAnalyze}
            disabled={status === "forging" || text.length < 20}
            className="rounded-md px-6 py-3 disabled:opacity-40"
            style={{
              background: "var(--sky)",
              color: "var(--deep)",
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
          >
            {status === "forging" ? "weighing the evidence..." : "analyze experience"}
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)" }}>
            {text.length}/8000
          </span>
        </div>

        {status === "error" && (
          <p className="mt-6" style={{ color: "var(--terracotta)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            {errorMsg}
          </p>
        )}

        {status === "done" && analysis && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">

            <div className="pop card-hover rounded-2xl p-6 md:col-span-2"
              style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--alabaster-dim)" }}>VERDICT</div>
              <div style={{
                fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.1,
                color: analysis.verdict === "strong" ? "var(--sea)" : analysis.verdict === "moderate" ? "var(--sand)" : "var(--terracotta)",
              }}>
                {analysis.verdict}
              </div>
              <div className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: "44px", color: "var(--alabaster)" }}>
                <CountUp value={analysis.score} /><span style={{ fontSize: "16px", color: "var(--alabaster-dim)" }}>/10</span>
              </div>
              <p className="mt-4" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", color: "var(--alabaster-dim)", lineHeight: 1.6 }}>
                {analysis.pitch}
              </p>
            </div>

            <div className="pop card-hover rounded-2xl p-6 md:col-span-4" style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)", animationDelay: "90ms" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--alabaster-dim)" }}>SKILL CONFIDENCE</div>
              <div className="mt-4 flex flex-col gap-3.5">
                {analysis.skills.map((s, i) => {
                  const c = s.confidence >= 0.85 ? "var(--sea)" : s.confidence >= 0.6 ? "var(--sand)" : s.confidence >= 0.35 ? "var(--alabaster-dim)" : "var(--terracotta)";
                  return (
                    <div key={i}>
                      <div className="flex justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                        <span style={{ color: "var(--alabaster)" }}>{s.name.toLowerCase()}</span>
                        <span style={{ color: c }}>{s.confidence.toFixed(2)}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full" style={{ background: "rgba(239,232,223,0.10)" }}>
                        <div className="bar-fill h-full rounded-full" style={{ width: `${s.confidence * 100}%`, background: c, animationDelay: `${250 + i * 130}ms` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {analysis.verdict === "weak" && (
              <div className="pop rounded-2xl p-5 md:col-span-6" style={{ background: "var(--deeper)", border: "1px solid var(--sand)", animationDelay: "140ms" }}>
                <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "14px", color: "var(--sand)", lineHeight: 1.6 }}>
                  This doesn&apos;t prove much yet — and Unseen won&apos;t pretend it does.
                  Answer the interrogation, add specifics, run it again.
                </p>
              </div>
            )}

            <div className="pop card-hover rounded-2xl p-6 md:col-span-3" style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)", animationDelay: "180ms" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--alabaster-dim)" }}>EVIDENCE LEDGER</div>
              <div className="mt-4 flex flex-col gap-3">
                {analysis.evidence.map((e, i) => (
                  <div key={i} className="flex items-start gap-2.5" style={{ opacity: e.kind === "inferred" ? 0.55 : 1 }}>
                    <span className="rounded px-1.5 py-0.5" style={{
                      fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "1px", whiteSpace: "nowrap",
                      color: e.kind === "metric" ? "var(--sea)" : e.kind === "outcome" ? "var(--sky)" : e.kind === "action" ? "var(--sand)" : "var(--alabaster-dim)",
                      border: "1px solid var(--border-soft)",
                    }}>{e.kind}</span>
                    <span style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", lineHeight: 1.5 }}>{e.statement}</span>
                    <span className="ml-auto" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--alabaster-dim)" }}>{e.strength.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pop card-hover rounded-2xl p-6 md:col-span-3" style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)", animationDelay: "270ms" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--alabaster-dim)" }}>STAR STORY</div>
              <div className="mt-4 flex flex-col gap-3">
                {(["situation", "task", "action", "result"] as const).map((k) => (
                  <div key={k} className="flex gap-3">
                    <span style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "14px", color: "var(--sky)", width: "16px" }}>{k[0].toUpperCase()}</span>
                    <span style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6 }}>{analysis.star[k]}</span>
                  </div>
                ))}
              </div>
            </div>

            {analysis.verdict !== "weak" && (
              <div className="pop card-hover rounded-2xl p-6 md:col-span-4" style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)", animationDelay: "360ms" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--alabaster-dim)" }}>CAREER ASSETS</div>
                <ul className="mt-4 flex flex-col gap-2">
                  {analysis.resumeBullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13.5px", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--sea)" }}>▸</span>{b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg p-4" style={{ background: "var(--abyss)", fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13.5px", lineHeight: 1.7, color: "var(--alabaster)" }}>
                  {analysis.linkedin}
                </p>
              </div>
            )}

            <div className={`pop card-hover rounded-2xl p-6 ${analysis.verdict === "weak" ? "md:col-span-6" : "md:col-span-2"}`}
              style={{ background: "var(--deeper)", border: "1px solid var(--terracotta)", animationDelay: "450ms" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", color: "var(--terracotta)" }}>THE INTERROGATION</div>
              <div className="mt-4 flex flex-col gap-3">
                {analysis.followUpQuestions.map((q, i) => (
                  <div key={i} className="flex gap-3">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--terracotta)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6 }}>{q.question}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}