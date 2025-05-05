import styles from './Folderbar.module.scss';
import { BsChevronBarRight } from "react-icons/bs";
import { useState, useEffect, use } from 'react';
import { WorkspaceContext } from '../../Providers/WorkspaceProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FBFolder from '../FBFolder/FBFolder';
import FBNote from '../FBNote/FBNote';

function Folderbar({setSidebarOpen, SidebarOpen}) {
  const {FolderData, rawData} = useContext(WorkspaceContext);
  const [FolderDisplay, setFolderDisplay] = useState();
  const [activeNoteID, setActiveNoteID] = useState(null);
  const navigate = useNavigate();

  function getNotes(folder, FolderIndex){
    return folder.notes.map((note)=>{
      return (
        <FBNote note={note} FolderIndex={FolderIndex} handleNoteClick={()=>handleNoteClick(note)} isOpen={activeNoteID === note.id? true: false} key={note.title + note.id}/>
      )
    })
  }

  function getFolder(data, FolderIndex){
    return data.folders.map((folder, index) =>{
      return(
        <FBFolder folder={folder} FolderIndex={FolderIndex} key={folder.name}>
          {folder.folders?getFolder(folder, FolderIndex+1):null}
          {folder.notes?getNotes(folder, FolderIndex+1):null}
        </FBFolder>        

      )
    })
  }

  function handleSidebarChange(){
    setSidebarOpen((prev)=> !SidebarOpen);
  };

  function handleNoteClick(note, index){
    console.log("Note clicked: ", note);
    setActiveNoteID(note.id);
    navigate("/NoteEditor", {state: {title: note.title, markdownVal: note.content, noteID: note.id, folderID: note.folder_id, favorite: note.favorite}});
  }
  useEffect(() => {
    console.log("RawData: ", rawData);
    if(FolderData && rawData){

      setFolderDisplay(
      <div className={styles.FolderSystemCont}>
          {getFolder(FolderData, 0)}
          {getNotes(FolderData, 0)}
        </div>
      );
    }
  }, [FolderData, rawData])

  useEffect(() => {
    console.log("Active note: ", activeNoteID);
    if(FolderData && rawData){

      setFolderDisplay(
      <div className={styles.FolderSystemCont}>
          {getFolder(FolderData, 0)}
          {getNotes(FolderData, 0)}
        </div>
      );
    }
  },[activeNoteID]);

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
    <div is-root={FolderData.id} className={styles.FolderbarCont}>
      <div id={styles.ChevronIcon} className={SidebarOpen ? styles.none : ""}>
        <BsChevronBarRight onClick={handleSidebarChange}/>
      </div>
        {FolderDisplay}
    </div>
  );
}

export default Folderbar;