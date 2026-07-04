import { analyzeExperience } from "../lib/gemini";
import { saveRun } from "../lib/persist";

const text =
  "I started a weekly run club: planned routes, recruited 3 volunteers, and grew attendance from 20 to 50 in 3 months.";

analyzeExperience(text)
  .then(async (analysis) => {
    console.log("Engine verdict:", analysis.verdict, "| score:", analysis.score);
    console.log("STAR situation:", analysis.star.situation);
    const analysisId = await saveRun(text, analysis);
    console.log("Saved! analysisId:", analysisId);
  })
  .catch((err) => console.error("FAILED:", err.message));
