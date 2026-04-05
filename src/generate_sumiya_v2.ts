import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateSumiyaImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: "A high-quality, professional portrait of a young woman with dark hair pulled back, wearing black medical scrubs, holding a brown leather notebook against a clean white background. She has a friendly but professional expression. Cinematic lighting, professional medical staff headshot." }
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "4:5",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      console.log(`data:image/png;base64,${part.inlineData.data}`);
    }
  }
}

generateSumiyaImage();
