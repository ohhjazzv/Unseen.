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

function confidenceColor(c: number): string {
  if (c >= 0.85) return "var(--sea)";
  if (c >= 0.6) return "var(--sand)";
  return "var(--terracotta)";
}

const verdictColor: Record<Analysis["verdict"], string> = {
  strong: "var(--sea)",
  moderate: "var(--sand)",
  weak: "var(--terracotta)",
};

export default function Start() {
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

  function reset() {
    setText("");
    setAnalysis(null);
    setStatus("idle");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <a href="/" className="nav-link text-sm" style={{ color: "var(--alabaster-dim)" }}>
        ← back to home
      </a>

      <h1 className="rise mt-8" style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1 }}>
        the interview<span style={{ color: "var(--sea)" }}>.</span>
      </h1>
      <p className="rise mt-3 max-w-xl" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "16px", color: "var(--alabaster-dim)", lineHeight: 1.7, animationDelay: "120ms" }}>
        One real experience. Be specific — what did YOU do, what happened, numbers
        if you have them. The engine scores proof, not adjectives.
      </p>

      {status !== "done" ? (
        <div className="rise mt-10" style={{ animationDelay: "240ms" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={status === "forging"}
            placeholder="I started a weekly run club: planned routes, recruited 3 volunteers..."
            rows={7}
            className="w-full rounded-lg p-4 outline-none disabled:opacity-50"
            style={{
              background: "var(--deeper)",
              border: status === "forging" ? "1px solid var(--sky)" : "1px solid var(--border-soft)",
              color: "var(--alabaster)",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              transition: "border-color 0.3s ease, opacity 0.3s ease",
            }}
          />
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleAnalyze}
              disabled={status === "forging" || text.length < 20}
              className="rounded-md px-6 py-3 disabled:opacity-40"
              style={{ background: "var(--sky)", color: "var(--deep)", fontFamily: "var(--font-jost)", fontWeight: 500, letterSpacing: "1px" }}
            >
              {status === "forging" ? "weighing the evidence..." : "analyze experience"}
            </button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)" }}>
              {text.length}/8000
            </span>
          </div>
        </div>
      ) : (
        <div className="pop mt-10 flex items-center justify-between gap-4 rounded-lg px-5 py-4"
          style={{ background: "var(--abyss)", border: "1px solid var(--border-soft)" }}>
          <span className="truncate" style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--alabaster-dim)" }}>
            &ldquo;{text.length > 90 ? text.slice(0, 90) + "…" : text}&rdquo;
          </span>
          <button onClick={reset} className="shrink-0 rounded-md px-4 py-2"
            style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)", color: "var(--alabaster)", fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "13px" }}>
            new analysis
          </button>
        </div>
      )}

      {status === "error" && (
        <p className="mt-6" style={{ color: "var(--terracotta)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
          {errorMsg}
        </p>
      )}

      {status === "done" && analysis && (
        <div className="pop mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">

          
          <div className="md:col-span-2 rounded-lg p-6" style={{
            background: "var(--deeper)",
            border: `1px solid ${verdictColor[analysis.verdict]}`,
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: verdictColor[analysis.verdict], letterSpacing: "1px", textTransform: "uppercase" }}>
              {analysis.verdict}
            </p>
            <p className="mt-2" style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "48px", color: "var(--alabaster)" }}>
              <CountUp value={analysis.score} />
            </p>
            <p className="mt-3" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "14px", color: "var(--alabaster-dim)", lineHeight: 1.6 }}>
              {analysis.pitch}
            </p>
          </div>

          
          <div className="md:col-span-4 rounded-lg p-6" style={{
            background: "var(--deeper)",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)", letterSpacing: "1px", textTransform: "uppercase" }}>
              skill confidence
            </p>
            <div className="mt-4 flex flex-col gap-4">
              {analysis.skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex items-baseline justify-between">
                    <span style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "14px", color: "var(--alabaster)" }}>
                      {skill.name}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: confidenceColor(skill.confidence) }}>
                      {(skill.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="bar-fill mt-1.5 h-2 rounded-full" style={{
                    background: confidenceColor(skill.confidence),
                    width: `${skill.confidence * 100}%`,
                    animationDelay: `${i * 80}ms`,
                  }} />
                </div>
              ))}
            </div>
          </div>

         
          {analysis.verdict === "weak" && (
            <div className="md:col-span-6 rounded-lg p-5" style={{
              background: "var(--abyss)",
              border: "1px solid var(--sand)",
            }}>
              <p style={{ fontFamily: "var(--font-jost)", fontWeight: 500, fontSize: "14px", color: "var(--sand)" }}>
                This doesn&apos;t prove much yet — and Unseen won&apos;t pretend it does.
              </p>
            </div>
          )}

          
          <div className="md:col-span-3 rounded-lg p-6" style={{
            background: "var(--deeper)",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)", letterSpacing: "1px", textTransform: "uppercase" }}>
              evidence ledger
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {analysis.evidence.map((e, i) => (
                <div key={i} style={{ opacity: e.kind === "inferred" ? 0.55 : 1 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.5px",
                    textTransform: "uppercase", color: "var(--sky)",
                    border: "1px solid var(--border-soft)", borderRadius: "4px", padding: "2px 6px",
                  }}>
                    {e.kind}
                  </span>
                  <p className="mt-1" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", color: "var(--alabaster)", lineHeight: 1.5 }}>
                    {e.statement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="md:col-span-3 rounded-lg p-6" style={{
            background: "var(--deeper)",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)", letterSpacing: "1px", textTransform: "uppercase" }}>
              the star story
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {([
                ["S", analysis.star.situation],
                ["T", analysis.star.task],
                ["A", analysis.star.action],
                ["R", analysis.star.result],
              ] as const).map(([letter, val]) => (
                <div key={letter} className="flex gap-3">
                  <span style={{ fontFamily: "var(--font-jost)", fontWeight: 700, fontSize: "16px", color: "var(--sky)" }}>
                    {letter}
                  </span>
                  <p style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", color: "var(--alabaster)", lineHeight: 1.5 }}>
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          {analysis.verdict !== "weak" && (
            <div className="md:col-span-4 rounded-lg p-6" style={{
              background: "var(--deeper)",
              border: "1px solid var(--border-soft)",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)", letterSpacing: "1px", textTransform: "uppercase" }}>
                career assets
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {analysis.resumeBullets.map((b, i) => (
                  <li key={i} style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", color: "var(--alabaster)", lineHeight: 1.5 }}>
                    • {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--alabaster-dim)", letterSpacing: "1px", textTransform: "uppercase" }}>
                linkedin
              </p>
              <p className="mt-1" style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", color: "var(--alabaster)", lineHeight: 1.5 }}>
                {analysis.linkedin}
              </p>
            </div>
          )}

          
          <div className={analysis.verdict === "weak" ? "md:col-span-6 rounded-lg p-6" : "md:col-span-2 rounded-lg p-6"} style={{
            background: "var(--deeper)",
            border: `1px solid ${analysis.verdict === "weak" ? "var(--terracotta)" : "var(--border-soft)"}`,
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--alabaster-dim)", letterSpacing: "1px", textTransform: "uppercase" }}>
              the interrogation
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {analysis.followUpQuestions.map((q, i) => (
                <p key={i} style={{ fontFamily: "var(--font-jost)", fontWeight: 300, fontSize: "13px", color: "var(--alabaster)", lineHeight: 1.5 }}>
                  {q.question}
                </p>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}