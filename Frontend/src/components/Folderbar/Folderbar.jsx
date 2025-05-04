import styles from './Folderbar.module.scss';
import { BsChevronBarRight } from "react-icons/bs";
import { Folders } from '../../FakeFolderData/Data.json'
import { useState, useEffect } from 'react';
import { formatRawData } from '../../Utils/Utils';
import { WorkspaceContext } from '../../Providers/WorkspaceProvider';
import { useContext } from 'react';
function Folderbar({setSidebarOpen, SidebarOpen}) {
  // const data = Folders;
  const {FolderData} = useContext(WorkspaceContext);
  const data = FolderData;
  function getNotes(folder, FolderIndex){
    return folder.notes.map((file)=>{
      return (
        <div className={styles.FileCont} key={file.title} style={{marginLeft: `${FolderIndex*15}px`}}>
          <p className={styles.FileName}>{file.title}</p>
        </div>
      )
    })
  }
  function getFolder(data, FolderIndex){
    console.log(data.folders);
    return data.folders.map((folder) =>{
      return(
        <div className={styles.FolderCont} key={folder.name} style={{marginLeft: `${FolderIndex*15}px`}}>
          <p className={styles.FolderName}>{folder.name}</p>
          {folder.folders?getFolder(folder, FolderIndex+1):null}
          {folder.notes?getNotes(folder, FolderIndex+1):null}
        </div>
      )
    })
  }

  function handleSidebarChange(){
    setSidebarOpen((prev)=> !SidebarOpen);
  };
  useEffect(() => {
    console.log("Folder data: ", FolderData);
  }, [FolderData])
  return (
    <div className={styles.FolderbarCont}>
      <div id={styles.ChevronIcon} className={SidebarOpen ? styles.none : ""}>
        <BsChevronBarRight onClick={handleSidebarChange}/>
      </div>
        <div className={styles.FolderSystemCont}>
          {data? getFolder(data, 0): null}
          {data? getNotes(data, 0): null}
        </div>
    </div>
  );
}

export default Folderbar;