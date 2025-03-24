import React, {useState} from "react";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import Canvas from "../../components/Canvas/Canvas";
import "./NotesEditor.scss";

const NotesEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);

  return (
    <div className="notes-editor-container">
      <Canvas canvasItems={canvasItems} setCanvasItems={setCanvasItems} />
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown}/>
      <Canvas canvasItems={canvasItems} setCanvasItems={setCanvasItems} />
    </div>
  );
};

export default NotesEditor;