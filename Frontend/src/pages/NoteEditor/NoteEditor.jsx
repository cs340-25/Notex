import React from "react";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import Canvas from "../../components/Canvas/Canvas";
import "./NotesEditor.scss";

const NotesEditor = () => {
  return (
    <div className="notes-container">
      NoteEditor
      <Canvas position="left" />
      <MarkdownEditor />
      <Canvas position="right" />
    </div>
  );
};

export default NotesEditor;