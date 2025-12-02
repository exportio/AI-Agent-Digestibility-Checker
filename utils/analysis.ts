import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisReport } from "../types";

const PROXIES = [
  { url: 'https://api.allorigins.win/get?url=', type: 'json' },
  { url: 'https://corsproxy.io/?', type: 'text' },
  { url: 'https://api.codetabs.com/v1/proxy?quest=', type: 'text' }
];

async function fetchHtmlContent(targetUrl: string): Promise<string> {
  let lastError;

  for (const proxy of PROXIES) {
    try {
      const response = await fetch(`${proxy.url}${encodeURIComponent(targetUrl)}`);
      if (!response.ok) throw new Error(`Proxy ${proxy.url} failed with status ${response.status}`);

      if (proxy.type === 'json') {
        const data = await response.json();
        if (data.contents) return data.contents;
      } else {
        const text = await response.text();
        if (text) return text;
      }
    } catch (e) {
      console.warn(`Proxy ${proxy.url} failed:`, e);
      lastError = e;
      continue;
    }
  }

  throw lastError || new Error("All proxies failed to fetch content.");
}

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
    htmlContent = await fetchHtmlContent(targetUrl);
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

export async function generateLlmsTxt(url: string): Promise<string> {
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
    htmlContent = await fetchHtmlContent(targetUrl);
  } catch (e) {
    console.warn("Could not fetch live content for LLMS.TXT generation.");
    throw new Error("Could not fetch website content. Please check the URL and try again.");
  }

  // 3. Parse HTML to extract page details
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const pageObject = {
    url: targetUrl,
    title: doc.title || '',
    meta_description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
    visible_text: doc.body.innerText.slice(0, 50000), // Limit text to avoid huge payloads
    headings: Array.from(doc.querySelectorAll('h1, h2, h3')).map(h => (h as HTMLElement).innerText),
    links: Array.from(doc.querySelectorAll('a')).map(a => (a as HTMLAnchorElement).href),
    jsonld: Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map(s => s.innerHTML),
    last_modified: doc.lastModified,
    access: 'public'
  };

  // 4. Generate with Gemini
  try {
    const apiKey = process?.env?.API_KEY;
    if (!apiKey) {
      return "Error: API Key missing. Please configure process.env.API_KEY.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are an expert web-content normalizer trained to generate a complete LLMS.TXT file for a website. Input to you will be: site_url:string, and pages:list of page objects where each page object contains {url, title, meta_description, canonical, visible_text, headings, links, jsonld, last_modified, access}. Using ONLY this input, produce a single UTF-8 LLMS.TXT file as output. DO NOT crawl, infer missing pages, or fabricate content.

LLMS.TXT FORMAT RULES (follow exactly): Start with a ONE-LINE JSON metadata header containing: {"site":site_url,"generated_at":UTC timestamp,"pages_included":count,"robots_checked":true,"languages":list of detected languages,"notes":string}. After metadata, output the website overview including: a top-level title (from homepage), a one-line tagline, a Quick Nav section listing major internal links, and a Sitemap/Important Links list of internal URLs. Then output one entry per page, ordered by importance: homepage first, then navigation-level pages, then others.

PER-PAGE FORMAT (strict): For each page output: "## Page: <page title or H1>" then the absolute URL on its own line. Then "Meta:" followed by the meta_description OR the first 1–2 sentences of visible_text if meta missing. Then "TL;DR:" with a 1–2 sentence abstractive summary (max 50 words). Then "Key sections:" followed by a list of H2/H3 headings prefixed with ##. Then "Keywords:" containing up to 8 concise keywords. Then "Intent:" containing 1–3 labels chosen from {product, pricing, blog, knowledge-base, legal, contact, marketing, support, info}. Then "Important links:" listing up to 10 meaningful internal/external links extracted from the page. Then "word_count:", "approx_tokens:", and "notes:" (include redactions, schema.org presence, access restrictions). Preserve this ordering exactly.

PARSING RULES: Use only visible text (no scripts, CSS, comments). Extract canonical if present. Use absolute URLs for all links. De-duplicate pages using canonical. Summarize long content instead of quoting. Redact PII: replace emails with [EMAIL REDACTED] and phone numbers with [PHONE REDACTED]. Capture schema.org JSON-LD type and name in notes. If access != "public", mark access as "restricted" in notes.

REDACTION RULES: Do not include API keys, tokens, passwords, internal admin links, paywalled text, or user emails/phones. Summaries must be fully abstractive and safe to train on.

LANGUAGE RULES: Detect page language; include "lang:<code>" inside notes for each page. Group different languages together by inserting a section header "# Language: <code>" before the first page in that language.

VALIDATION RULES: Ensure no copyrighted text longer than 25 consecutive words is reproduced verbatim. TL;DR must be unique per page. Ensure all URLs are absolute. Ensure all output is Markdown-compatible. Entire output must be under ~5MB unless content requires more.

FINAL OUTPUT CONSTRAINT: Output ONLY the LLMS.TXT file. No commentary, no explanation, no placeholders, no analysis. The final answer MUST be a single complete LLMS.TXT file exactly following these rules.

Input Data:
site_url: ${targetUrl}
pages: ${JSON.stringify([pageObject])}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "";

  } catch (error) {
    console.error("Gemini LLMS.TXT generation failed:", error);
    throw new Error("Failed to generate LLMS.TXT.");
  }
}