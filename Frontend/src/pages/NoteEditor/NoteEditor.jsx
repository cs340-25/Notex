import React, {useState} from "react";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import Canvas from "../../components/Canvas/Canvas";
import "./NotesEditor.scss";

const NotesEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);

  return (
    <div className={`${isCanvasExpanded ? "canvas-fullscreen" : "notes-editor-container"}`}>
      <div className="filler-item"  />
      <MarkdownEditor />
      <Canvas onToggleFullscreen={setIsCanvasExpanded} />
    </div>
  );
};

export default NotesEditor;