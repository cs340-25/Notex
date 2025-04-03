import styles from './Folderbar.module.scss';
import { BsChevronBarRight } from "react-icons/bs";
import { Folders } from '../../FakeFolderData/Data.json'

function Folderbar({setSidebarOpen, SidebarOpen}) {
  const data = Folders;
  function getFiles(folder, FolderIndex){
    return folder.map((file)=>{
      return (
        <div className={styles.FileCont} key={file.name} style={{marginLeft: `${FolderIndex*15}px`}}>
          <p className={styles.FileName}>{file.name}</p>
        </div>
      )
    })
  }
  function getFolder(data, FolderIndex){
    return data.map((folder) =>{
      // console.log(FolderIndex)
      return(
        <div className={styles.FolderCont} key={folder.name} style={{marginLeft: `${FolderIndex*15}px`}}>
          <p className={styles.FolderName}>{folder.name}</p>
          {folder.folders?getFolder(folder.folders, FolderIndex+1):null}
          {folder.files?getFiles(folder.files, FolderIndex+1):null}
        </div>
      )
    })
  }

  function handleSidebarChange(){
    setSidebarOpen((prev)=> !SidebarOpen);
  };
  return (
    <div className={styles.FolderbarCont}>
      <div id={styles.ChevronIcon} className={SidebarOpen ? styles.none : ""}>
        <BsChevronBarRight onClick={handleSidebarChange}/>
      </div>
        <div className={styles.FolderSystemCont}>
          {getFolder(data, 0)}
        </div>
    </div>
  );
}

export default Folderbar;