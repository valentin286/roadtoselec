import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTheory = async (topicTitle: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Act as an expert English teacher. 
    Explain the topic "${topicTitle}" to a student.
    Use Markdown formatting.
    Include:
    1. Definition/Usage.
    2. Structure/Formulas (if grammar).
    3. Examples (at least 3).
    4. Common mistakes to avoid.
    
    Keep the tone encouraging and clear. The explanation should be in Spanish, but examples in English.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "No se pudo generar la teoría.";
  } catch (error) {
    console.error("Error generating theory:", error);
    return "Hubo un error generando la explicación. Por favor intenta de nuevo.";
  }
};

export const generateQuestions = async (topicTitle: string, count: number = 5, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<Question[]> => {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Generate ${count} multiple-choice questions about "${topicTitle}" for an English student.
    Difficulty: ${difficulty}.
    
    Return pure JSON with this structure:
    {
      "questions": [
        {
          "id": "unique_id",
          "text": "Question text here (in English)",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "The exact text of the correct option",
          "explanation": "Explanation of why it is correct (in Spanish)"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response");
    
    const parsed = JSON.parse(jsonText);
    return parsed.questions || [];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};