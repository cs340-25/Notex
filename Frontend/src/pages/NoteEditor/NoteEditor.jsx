import React, {useState} from "react";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import Canvas from "../../components/Canvas/Canvas";
import "./NotesEditor.scss";

const NotesEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);

  return (
    <div className={`notes-editor-container ${isCanvasExpanded ? "canvas-fullscreen" : ""}`}>
      <div className="filler-item" style={{ display: isCanvasExpanded ? "none" : "block" }} />
      <MarkdownEditor style={{ display: isCanvasExpanded ? "none" : "block" }} />
      <Canvas onToggleFullscreen={setIsCanvasExpanded} />
    </div>
  );
};

export default NotesEditor;