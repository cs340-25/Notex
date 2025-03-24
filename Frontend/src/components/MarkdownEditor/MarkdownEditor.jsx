import React from "react";
import "./MarkdownEditor.module.scss";

const MarkdownEditor = ({ markdown, setMarkdown }) => {
  return (
    <textarea
      className="markdown-editor"
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      placeholder=""
    />
  );
};

export default MarkdownEditor;
