import React from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import InfiniteCanvas from "../components/Canvas";
import "./NotesEditor.css";

const NotesEditor = () => {
  return (
    <div className="notes-container">
      <InfiniteCanvas position="left" />
      <MarkdownEditor />
      <InfiniteCanvas position="right" />
    </div>
  );
};

export default NotesEditor;