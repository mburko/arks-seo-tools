import { SEOContent } from "../models/SEOContentModel";

export interface AiSeoService {
  generateSEOContent(articleText: string, language: "en" | "uk"): Promise<SEOContent>;
}
