import styles from './Folderbar.module.scss';
import { BsChevronBarRight } from "react-icons/bs";
import { Folders } from '../../FakeFolderData/Data.json'
import { useState, useEffect } from 'react';
import { formatRawData } from '../../Utils/Utils';
import { WorkspaceContext } from '../../Providers/WorkspaceProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder } from '../../Models/DataTypes';
function Folderbar({setSidebarOpen, SidebarOpen}) {
  // const data = Folders;
  const {FolderData} = useContext(WorkspaceContext);
  const navigate = useNavigate();

  function getNotes(folder, FolderIndex){
    return folder.notes.map((note)=>{
      return (
        <div className={styles.noteCont} key={note.title} style={{marginLeft: `${FolderIndex*15}px`}}>
          <p className={styles.noteName} onClick={()=>handleNoteClick(note)}>{note.title}</p>
        </div>
      )
    })
  }
  function getFolder(data, FolderIndex){
    return data.folders.map((folder) =>{
      return(
        <div className={styles.FolderCont} key={folder.name} style={{marginLeft: `${FolderIndex*15}px`}}>
          <p className={styles.FolderName} onClick={() => handleFolderClick(folder)}>{folder.name}</p>
          {folder.folders?getFolder(folder, FolderIndex+1):null}
          {folder.notes?getNotes(folder, FolderIndex+1):null}
        </div>
      )
    })
  }

  function handleSidebarChange(){
    setSidebarOpen((prev)=> !SidebarOpen);
  };

  function handleFolderClick(folder){
    console.log("Folder clicked: ", folder);
  }
  function handleNoteClick(note){
    console.log("Note clicked: ", note);
    navigate("/NoteEditor", {state: {title: note.title, markdownVal: note.content}});
  }
  useEffect(() => {
    console.log("Folder data: ", FolderData);
  }, [FolderData])

  if(FolderData == null){
    return (
      <div className={styles.SpinnerCont}>
        <svg className={styles.spinner} viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    )

  }
  return (
    <div className={styles.FolderbarCont}>
      <div id={styles.ChevronIcon} className={SidebarOpen ? styles.none : ""}>
        <BsChevronBarRight onClick={handleSidebarChange}/>
      </div>
        <div className={styles.FolderSystemCont}>
          {FolderData? getFolder(FolderData, 0): null}
          {FolderData? getNotes(FolderData, 0): null}
        </div>
    </div>
  );
}

export default Folderbar;