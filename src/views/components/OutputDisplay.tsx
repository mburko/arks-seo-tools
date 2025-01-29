import React, { useRef, useState } from "react";
import styles from "./styles/OutputDisplay.module.css";
import { SEOContent } from "../../models/SEOContentModel";

interface OutputDisplayProps {
  seoContent: SEOContent | null;
  language: "en" | "uk";
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ seoContent, language }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!contentRef.current) return;

    let formattedText = "";

    contentRef.current.querySelectorAll(".block").forEach((block) => {
      const titleElement = block.querySelector("h3") as HTMLElement;
      const contentElement = block.querySelector("p, ul") as HTMLElement;

      const title = titleElement?.innerText.trim() || "";
      let content = "";
      if (contentElement) {
        if (contentElement.tagName.toLowerCase() === "ul") {
          content = Array.from(contentElement.querySelectorAll("li"))
            .map((li) => `- ${li.innerText.trim()}`)
            .join("\n");
        } else {
          content = contentElement.innerText.trim();
        }
      }

      if (title && content) {
        formattedText += `**${title}**\n${content}\n\n`;
      }
    });

    // Copy the text with proper formatting
    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => console.error("Copy failed", err));
  };

  if (!seoContent) {
    return <p className={styles.emptyMessage}>Generated SEO content will appear here.</p>;
  }

  return (
    <div className={styles.container}>
      <div ref={contentRef}>
        <div className={`${styles.block} block`}>
          <h3 className={styles.label}>{language === 'en' ? 'SEO Description (240–250 characters):' : 'SEO-оптимізований опис (240–250 символів):'}</h3>
          <p className={styles.text}>{seoContent.seoDescription}</p>
        </div>

        <div className={`${styles.block} block`}>
          <h3 className={styles.label}>{language === 'en' ? 'Short Description (up to 160 characters):' : 'Короткий опис (до 160 символів):'}</h3>
          <p className={styles.text}>{seoContent.shortDescription}</p>
        </div>

        <div className={`${styles.block} block`}>
          <h3 className={styles.label}>{language === 'en' ? 'Title:' : 'Тайтл:'}</h3>
          <p className={styles.text}>{seoContent.title}</p>
        </div>

        <div className={`${styles.block} block`}>
          <h3 className={styles.label}>{language === 'en' ? 'Short Title:' : 'Короткий тайтл:'}</h3>
          <p className={styles.text}>{seoContent.shortTitle}</p>
        </div>

        <div className={`${styles.block} block`}>
          <h3 className={styles.label}>{language === 'en' ? 'Tags:' : 'Теги:'}</h3>
          <p className={styles.text}>{seoContent.tags.join(", ")}</p>
        </div>

        <div className={`${styles.block} block`}>
          <h3 className={styles.label}>{language === 'en' ? 'Anchors:' : 'Оптимальні анкори:'}</h3>
          <ul className={styles.text}>
            {seoContent.anchors.map((anchor, index) => (
              <li key={index}>{anchor}</li>
            ))}
          </ul>
        </div>
      </div>

      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy Content"}
      </button>
    </div>
  );
};

export default OutputDisplay;
