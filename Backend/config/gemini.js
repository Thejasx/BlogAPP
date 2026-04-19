import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function main(prompt) {
  let attempts = 0;
  const maxAttempts = 3;
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  while (attempts < maxAttempts) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      attempts++;
      // If it's a 503 (service unavailable/high demand) or 429 (rate limit), retry
      if ((error.message.includes('503') || error.message.includes('429')) && attempts < maxAttempts) {
        console.log(`Model experiencing high demand, retrying attempt ${attempts}...`);
        await delay(1000 * Math.pow(2, attempts)); // Exponential backoff: 2s, 4s
        continue;
      }
      throw error;
    }
  }
}

export default main