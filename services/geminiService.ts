import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a smart, helpful, and concise shopping assistant for JD.com (Jingdong).
Your goal is to help users find products, compare prices, and understand features.

Rules:
1. Use Markdown for formatting (bolding key terms, lists).
2. Be polite and professional but friendly.
3. If the user asks about a product, structure your response with:
   - "Shopping Advice" (Purchase Suggestions)
   - "Key Features" to look for.
   - "Usage Scenarios".
4. Keep paragraphs short for mobile readability.
5. Do not include the product card JSON in the text, the UI handles that separately. Just provide the textual advice.
`;

export const streamGeminiResponse = async (
  prompt: string,
  onChunk: (text: string) => void
) => {
  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash', // Optimized for speed/chat
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    for await (const chunk of response) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n(Sorry, I encountered an error connecting to the shopping assistant service. Please try again.)");
  }
};