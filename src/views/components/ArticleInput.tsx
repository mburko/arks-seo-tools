import React from "react";
import styles from "./styles/ArticleInput.module.css";

interface ArticleInputProps {
  articleText: string;
  setArticleText: (text: string) => void;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ articleText, setArticleText }) => {
  return (
    <textarea
      value={articleText}
      onChange={(e) => setArticleText(e.target.value)}
      placeholder="Paste your article text here..."
      className={styles.textarea}
    />
  );
};

export default ArticleInput;
