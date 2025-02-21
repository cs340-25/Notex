import React from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import Canvas from "../components/Canvas";
import "./NotesEditor.css";

const NotesEditor = () => {
  return (
    <div className="notes-container">
      <Canvas position="left" />
      <MarkdownEditor />
      <Canvas position="right" />
    </div>
  );
};

export default NotesEditor;