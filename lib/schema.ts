import { z } from "zod";

export const SkillSchema = z.object({
  name: z.string().min(1),
  confidence: z.number().min(0).max(1),
});

export const StarSchema = z.object({
  situation: z.string(),
  task: z.string(),
  action: z.string(),
  result: z.string(),
});

export const EvidenceSchema = z.object({
  statement: z.string(),
  kind: z.enum(["action", "outcome", "metric", "inferred"]),
  skill: z.string().nullable().optional(),
  strength: z.number().min(0).max(1),
});

export const FollowUpSchema = z.object({
  question: z.string().min(1),
  targetsSkill: z.string().nullable().optional(),
});

export const AnalysisSchema = z.object({
  verdict: z.enum(["strong", "moderate", "weak"]),
  score: z.number().min(0).max(10),
  skills: z.array(SkillSchema),
  evidence: z.array(EvidenceSchema),
  resumeBullets: z.array(z.string()),
  star: StarSchema,
  linkedin: z.string(),
  skillGaps: z.array(z.string()),
  followUpQuestions: z.array(FollowUpSchema),
  pitch: z.string(),
});

export type Analysis = z.infer<typeof AnalysisSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;
