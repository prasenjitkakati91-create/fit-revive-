import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateCinematicImages() {
  const prompts = [
    "A cinematic, high-quality photograph of a modern physiotherapy consultation room. A sleek white desk with a professional nameplate 'DR. TRISHNAMONI HALOI' and a black leather executive chair. The room is bathed in soft, warm natural light. Light oak wood flooring. Elegant brown silk curtains in the background. Professional, clean, and inviting medical office atmosphere.",
    "A cinematic, high-quality photograph of a professional physiotherapy treatment room. A pristine white treatment bed with a plush pillow. A modern medical trolley with advanced electrotherapy equipment next to the bed. Soft ambient lighting creating a calm and healing environment. Light wood floors and elegant brown curtains. 4k resolution, professional architectural photography.",
    "A cinematic, high-quality photograph of a physiotherapy rehabilitation area. A white treatment bed and a wall-mounted professional rehabilitation device. The scene is clean, modern, and well-lit with a focus on advanced medical care. Light wood flooring and warm wall tones. Professional medical clinic interior design."
  ];

  const results = [];
  for (const prompt of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        results.push(`data:image/png;base64,${part.inlineData.data}`);
      }
    }
  }
  return results;
}

// This is just a helper to get the strings. 
// I will actually run this logic in my head or use the tool directly if I could.
// Since I have to provide the code, I'll just use the tool calls.
