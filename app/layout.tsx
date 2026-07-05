import type { Metadata } from "next";
import { Jost, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["200", "300", "500", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Unseen — evidence, not flattery",
  description: "Turn real-life experience into structured career proof",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${mono.variable} antialiased`}>
        {children}
        <footer className="mx-auto mt-24 max-w-5xl px-6 pb-12">
          <div className="flex flex-col items-center gap-6 rounded-2xl p-10 text-center"
            style={{ background: "var(--deeper)", border: "1px solid var(--border-soft)" }}>
            <p style={{ fontFamily: "var(--font-jost)", fontWeight: 200, fontSize: "22px", letterSpacing: "2px", color: "var(--sand)" }}>
              READY TO BE MEASURED?
            </p>
            <a href="/start" className="rounded-md px-8 py-4"
              style={{ background: "var(--sky)", color: "var(--deep)", fontFamily: "var(--font-jost)", fontWeight: 500, letterSpacing: "1px" }}>
              start the interview
            </a>
            <div className="flex gap-6" style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              <a href="/" className="nav-link" style={{ color: "var(--alabaster-dim)" }}>home</a>
              <a href="/our-story" className="nav-link" style={{ color: "var(--alabaster-dim)" }}>our story</a>
              <a href="/how-it-works" className="nav-link" style={{ color: "var(--alabaster-dim)" }}>how it works</a>
              <a href="/faq" className="nav-link" style={{ color: "var(--alabaster-dim)" }}>faq</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}