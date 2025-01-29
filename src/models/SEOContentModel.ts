export interface SEOContent {
  seoDescription: string;
  shortDescription: string;
  title: string;
  shortTitle: string;
  tags: string[];
  anchors: string[];
}

export class SEOContentModel {
  private seoContent: SEOContent | null = null;

  setSEOContent(content: SEOContent): void {
    this.seoContent = content;
  }

  getSEOContent(): SEOContent | null {
    return this.seoContent;
  }
}
