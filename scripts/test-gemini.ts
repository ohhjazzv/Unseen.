import { analyzeExperience } from "../lib/gemini";

analyzeExperience(
  "I started a weekly run club: planned routes, recruited 3 volunteers, and grew attendance from 20 to 50 in 3 months."
).then((a) => console.log(JSON.stringify(a, null, 2)));
