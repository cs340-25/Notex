import React, {useState, useEffect, use} from "react";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import Canvas from "../../components/Canvas/Canvas";
import "./NotesEditor.scss";
import { useLocation } from "react-router-dom";

const NotesEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [noteID, setNoteID] = useState(-1);
  const [folderID, setFolderID] = useState(-1);
  const [canvasItems, setCanvasItems] = useState([]);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const location = useLocation();
  const titleVal = location.state?.title;
  const markdownVal = location.state?.markdownVal;
  const noteIDVal = location.state?.noteID;
  const folderIDVal = location.state?.folderID;

  useEffect(() => {
    console.log(noteIDVal, folderIDVal);
    if(titleVal){
      setTitle(titleVal);
    }
    if(markdownVal){
      setMarkdown(markdownVal); 
    }
    if(noteIDVal){
      setNoteID(noteIDVal);
    }
    if(folderIDVal){
      setFolderID(folderIDVal); 
    }

    
  },[titleVal, markdownVal, noteIDVal, folderIDVal]);

  return (
    <div className={`${isCanvasExpanded ? "canvas-fullscreen" : "notes-editor-container"}`}>
      <div className="filler-item"  />
      <MarkdownEditor titleVal={title} markdownVal={markdown} noteid={noteID} folderid={folderID} />
      <Canvas onToggleFullscreen={setIsCanvasExpanded} />
    </div>
  );
};

export default NotesEditor;