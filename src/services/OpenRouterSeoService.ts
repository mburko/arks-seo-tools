import axios from "axios";
import { SEOContent } from "../models/SEOContentModel";
import { AiSeoService } from "./AiSeoService";

const API_URL = "https://openrouter.ai/api/v1/completions";

export class OpenRouterSeoService implements AiSeoService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateSEOContent(articleText: string, language: "en" | "uk"): Promise<SEOContent> {
    const prompt = `
Generate SEO content for the following article in ${language === "uk" ? "Ukrainian" : "English"}:
Article text: "${articleText}"
It should contain 5-10 tags and 5-10 anchors.
SEO Description should be 240-250 characters.
Short Description should be 100-160 characters.
Short Description and title should not be the same.
Output the following as JSON:
{
  "seoDescription": "<240–250 characters>",
  "shortDescription": "<100-160 characters>",
  "title": "<Main title>",
  "shortTitle": "<Short title>",
  "tags": ["tag1", "tag2", ...],
  "anchors": ["anchor1", "anchor2", ...]
}`;

    try {
      const response = await axios.post(
        API_URL,
        {
          model: this.model,
          prompt: prompt,
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      let generatedContent = response.data.choices?.[0]?.text || response.data.choices?.[0]?.message?.content;

      if (!generatedContent) {
        console.error("Invalid API response:", response.data);
        throw new Error("Unexpected response format from OpenRouter API.");
      }

      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("JSON not found in API response:", generatedContent);
        throw new Error("Failed to extract JSON from API response.");
      }

      let extractedJson = jsonMatch[0].trim();

      if (!extractedJson.endsWith("}")) {
        console.warn("Detected possible truncation. Attempting to repair JSON.");
        extractedJson += "]}";
      }

      try {
        return JSON.parse(extractedJson) as SEOContent;
      } catch (parseError) {
        console.error("JSON Parsing Error:", extractedJson);
        throw new Error("Failed to parse OpenRouter API response as JSON.");
      }
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      throw new Error(`OpenRouter API Error: ${error}`);
    }
  }
}
