import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeExperience } from "@/lib/gemini";
import { saveRun } from "@/lib/persist";

const InputSchema = z.object({
  text: z.string().min(20).max(8000),
  save: z.boolean().optional(),
});

export async function POST(request: Request) {
  
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  
  const parsed = InputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "text must be a string of 20-8000 characters" },
      { status: 400 }
    );
  }

  
  try {
    const analysis = await analyzeExperience(parsed.data.text);
    let analysisId: string | null = null;
    if (parsed.data.save) {
      analysisId = await saveRun(parsed.data.text, analysis);
    }
    return NextResponse.json({ analysisId, analysis });
  } catch (err) {
    console.error("analyze route failed:", err);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}