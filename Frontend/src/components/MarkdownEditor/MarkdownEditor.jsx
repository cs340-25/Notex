import React from "react";
import styles from "./MarkdownEditor.module.scss";

const MarkdownEditor = ({ markdown, setMarkdown, textBox }) => {
  return (
    <div className={styles.markdownEditorContainer}>
      <textarea
        className={styles.markdownEditor}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Title"
      />
      
    </div>
    

    
  );
};

export default MarkdownEditor;
