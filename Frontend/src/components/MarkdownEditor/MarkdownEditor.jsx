import React from "react";
import styles from "./MarkdownEditor.module.scss";

const MarkdownEditor = ({ markdown, setMarkdown }) => {
  return (
    <textarea
      className={styles.markdownEditor}
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      placeholder=""
    />
  );
};

export default MarkdownEditor;
