import { supabaseAdmin } from "./supabase";
import type { Analysis } from "./schema";

export async function saveRun(text: string, analysis: Analysis): Promise<string> {
  // 1. Parent: the raw experience
  const { data: exp, error: expErr } = await supabaseAdmin
    .from("experiences")
    .insert({ raw_text: text })
    .select()
    .single();
  if (expErr) throw new Error(`Failed to save experience: ${expErr.message}`);

  // 2. Child: the analysis row (lists live in jsonb columns)
  const { data: ana, error: anaErr } = await supabaseAdmin
    .from("analyses")
    .insert({
      experience_id: exp.id,
      verdict: analysis.verdict,
      overall_score: analysis.score,
      resume_bullets: analysis.resumeBullets,
      star_story: analysis.star,
      linkedin_description: analysis.linkedin,
      skill_gaps: analysis.skillGaps,
      pitch: analysis.pitch,
    })
    .select()
    .single();
  if (anaErr) throw new Error(`Failed to save analysis: ${anaErr.message}`);

  // 3. Grandchildren: three bulk inserts, each stamped with analysis_id
  const { error: skillErr } = await supabaseAdmin.from("skills").insert(
    analysis.skills.map((s) => ({
      analysis_id: ana.id,
      name: s.name,
      confidence: s.confidence,
    }))
  );
  if (skillErr) throw new Error(`Failed to save skills: ${skillErr.message}`);

  const { error: evErr } = await supabaseAdmin.from("evidence").insert(
    analysis.evidence.map((e) => ({
      analysis_id: ana.id,
      statement: e.statement,
      kind: e.kind,
      strength: e.strength,
    }))
  );
  if (evErr) throw new Error(`Failed to save evidence: ${evErr.message}`);

  const { error: fuErr } = await supabaseAdmin.from("follow_up_questions").insert(
    analysis.followUpQuestions.map((q) => ({
      analysis_id: ana.id,
      question: q.question,
      targets_skill: q.targetsSkill ?? null,
    }))
  );
  if (fuErr) throw new Error(`Failed to save follow-ups: ${fuErr.message}`);

  return ana.id; // the analysisId your API route will return
}
