import React, {useState, useEffect, use} from "react";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import Canvas from "../../components/Canvas/Canvas";
import "./NotesEditor.scss";
import { useLocation } from "react-router-dom";

const NotesEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const location = useLocation();
  const titleVal = location.state?.title;
  const markdownVal = location.state?.markdownVal;
  useEffect(() => {
      // console.log("Title: ", titleVal);
      // console.log("Markdown: ", markdownVal);
    if(titleVal){
      setTitle(titleVal);
    }
    if(markdownVal){
      setMarkdown(markdownVal); 
    }
  },[titleVal, markdownVal]);

  useEffect(() => {
    console.log("Markdown: ", markdown);
    console.log("Title: ", title);

  }, [markdown, title]);

  return (
    <div className={`${isCanvasExpanded ? "canvas-fullscreen" : "notes-editor-container"}`}>
      <div className="filler-item"  />
      <MarkdownEditor titleVal={title} markdownVal={markdown}/>
      <Canvas onToggleFullscreen={setIsCanvasExpanded} />
    </div>
  );
};

export default NotesEditor;