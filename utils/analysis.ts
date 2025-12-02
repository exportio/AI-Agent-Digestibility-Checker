import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisReport } from "../types";

const PROXY_URL = 'https://api.allorigins.win/get?url=';

// Declare process for Typescript if it complains, though the polyfill handles runtime.
declare const process: any;

export async function analyzeUrl(url: string): Promise<AnalysisReport> {
  // 1. Validate URL format
  let targetUrl = url;
  if (!targetUrl.startsWith('http')) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    new URL(targetUrl);
  } catch (e) {
    throw new Error("Invalid URL format. Please enter a valid domain (e.g., example.com).");
  }

  // 2. Fetch HTML content
  let htmlContent = '';
  try {
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(targetUrl)}`);
    const data = await response.json();
    if (!data.contents) throw new Error("No content returned");
    htmlContent = data.contents;
  } catch (e) {
    console.warn("Could not fetch live content, falling back to simulated analysis based on URL hints due to CORS/Network restrictions.");
    htmlContent = `Could not scrape live content. Analyze based on expected structure for a site like ${targetUrl}.`;
  }

  // 3. Analyze with Gemini
  try {
    const apiKey = process?.env?.API_KEY;
    if (!apiKey) {
      // Return a mock result if no API key is present (demo mode robustness)
      console.warn("No API_KEY found in process.env. Falling back to mock data for demo purposes.");
      return {
        url: targetUrl,
        score: 78,
        structureScore: 85,
        metadataScore: 60,
        llmScore: 90,
        vagueDescriptionScore: 60,
        summary: "Demo Report: API Key missing. Ensure process.env.API_KEY is set. This site appears to have good semantic structure but may lack specific schema markup.",
        findings: [
          { category: "Structure", status: "pass", message: "Semantic tags detected", details: "The page uses <header> and <main> correctly." },
          { category: "Metadata", status: "warning", message: "Missing JSON-LD", details: "No Schema.org detected." },
          { category: "System", status: "fail", message: "API Configuration", details: "API Key not configured in environment." }
        ],
        scannedAt: new Date().toISOString()
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    // Truncate HTML if too large to prevent token limits (naive truncation)
    const truncatedHtml = htmlContent.slice(0, 30000);

    const prompt = `
      You are an expert AI Readiness Auditor for websites. 
      Analyze the following HTML content (or website context) for "Agent Digestibility".
      
      Focus on:
      1. Semantic HTML (use of <main>, <article>, <nav>, headings hierarchy).
      2. Structured Data (Schema.org).
      3. Accessibility/Alt text (as a proxy for image understanding).
      4. Vague description of services/products.
      5. LLM optimization (clarity, robots.txt, llms.txt).

      Return a JSON object with:
      - score (0-100 integer)
      - structureScore (0-100 integer)
      - metadataScore (0-100 integer)
      - vagueDescriptionScore (0-100 integer)
      - llmScore (0-100 integer)
      - summary (2 sentences max)
      - findings: Array of objects with { category: string, status: "pass"|"fail"|"warning", message: string, details: string }

      HTML Content to analyze:
      ${truncatedHtml}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            structureScore: { type: Type.INTEGER },
            metadataScore: { type: Type.INTEGER },
            vagueDescriptionScore: { type: Type.INTEGER },
            llmScore: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            findings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["pass", "fail", "warning"] },
                  message: { type: Type.STRING },
                  details: { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    });

    // Clean markdown code blocks if present before parsing
    let jsonStr = response.text || "{}";
    jsonStr = jsonStr.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");

    const result = JSON.parse(jsonStr);

    return {
      url: targetUrl,
      score: result.score || 0,
      structureScore: result.structureScore || 0,
      metadataScore: result.metadataScore || 0,
      llmScore: result.llmScore || 0,
      vagueDescriptionScore: result.vagueDescriptionScore || 0,
      summary: result.summary || "Analysis complete.",
      findings: result.findings || [],
      scannedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw new Error("Failed to analyze the website. Please check console for details.");
  }
}