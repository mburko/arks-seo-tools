import React from "react";
import styles from "./styles/LanguageSelector.module.css";

interface LanguageSelectorProps {
  language: "en" | "uk";
  setLanguage: (lang: "en" | "uk") => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Language:</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "uk")}
        className={styles.select}
      >
        <option value="en">English</option>
        <option value="uk">Ukrainian</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
