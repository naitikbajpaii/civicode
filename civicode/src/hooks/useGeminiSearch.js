import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔐 Replace with your actual API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini Model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


export const searchISCode = async (query, iscodes) => {
  // Prepare a basic knowledge context
  const context = iscodes
    .map(
      (code) =>
        `${code.code}: ${code.title}\nTags: ${code.tags.join(", ")}\nSummary: ${code.summary}`
    )
    .join("\n\n");


  // Prompt to Gemini
  const prompt = `
You are an assistant that helps civil engineering students find relevant Indian Standard (IS) codes.

The user asked:
"${query} and give the relevant page number from the content table of that IS Code"

Give your reply in this JSON format:
{
  "responseText": "A natural reply here with the IS Code and page number...",
  "results": [
    {
      "code": "IS 456:2000",
      "page": 15,
      "reason": "Covers M25 concrete specifications"
    }
  ]
}

Here is the list of IS codes you can refer to:

${context}
`; 

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonStr = text.slice(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonStr);
    return parsed; // contains: { responseText, results }
  } catch (e) {
    console.error("Gemini response parse error:", text);
    throw new Error("Failed to parse Gemini response");
  }
};
