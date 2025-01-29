import React, { useState } from "react";
import { SEOContent, SEOContentModel } from "../models/SEOContentModel";
import { SEOContentController } from "../controllers/SEOContentController";
import LanguageSelector from "./components/LanguageSelector";
import ArticleInput from "./components/ArticleInput";
import OutputDisplay from "./components/OutputDisplay";
import styles from "./AppView.module.css";
import { OpenRouterSeoService } from "../services/OpenRouterSeoService";
import SettingsDrawer from "./components/SettingsDrawer";

const AppView: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "uk">("uk");
  const [articleText, setArticleText] = useState<string>("");
  const [seoContent, setSeoContent] = useState<SEOContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedModel, setSelectedModel] = useState<string>("x-ai/grok-2-vision-1212");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const apiKey = process.env.REACT_APP_OPEN_ROUTER_TOKEN ?? '';

  const model = new SEOContentModel();
  const seoService = new OpenRouterSeoService(apiKey, selectedModel);
  const controller = new SEOContentController(model, seoService);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSeoContent(null);

    try {
      await controller.generateSEOContent(articleText, language);
      setSeoContent(controller.getSEOContent());
    } catch (err) {
      console.error(err);
      setError("Failed to generate SEO content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SettingsDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div className={styles.header}>
        <button
          className={styles.burgerButton}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open settings"
        >
          ☰
        </button>
        <h1>SEO Content Generator</h1>
      </div>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <ArticleInput articleText={articleText} setArticleText={setArticleText} />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate SEO Content"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <OutputDisplay seoContent={seoContent} language={language} />
    </div>
  );
};

export default AppView;
