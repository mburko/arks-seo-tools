import { SEOContentModel } from "../models/SEOContentModel";
import { AiSeoService } from "../services/AiSeoService";

export class SEOContentController {
  private model: SEOContentModel;
  private seoService: AiSeoService;

  constructor(model: SEOContentModel, seoService: AiSeoService) {
    this.model = model;
    this.seoService = seoService;
  }

  async generateSEOContent(articleText: string, language: "en" | "uk"): Promise<void> {
    const seoContent = await this.seoService.generateSEOContent(articleText, language);
    this.model.setSEOContent(seoContent);
  }

  getSEOContent() {
    return this.model.getSEOContent();
  }
}
