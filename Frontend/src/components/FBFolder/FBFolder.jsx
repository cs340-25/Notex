import styles from './FBFolder.module.scss';
import { useState, useEffect } from 'react';
import { FaFolderOpen } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";

function FBFolder({ folder, FolderIndex, children}) {
    const [isOpen, setIsOpen] = useState(true);
    const [childFolders, childNotes] = children;
    const [childrenState, setChildrenState] = useState(false);
    // console.log("Folder: ", folder)
    useEffect(() => {
        if(childFolders.length > 0 || childNotes.length > 0){
            // console.log("Folder: ", folder.name,"Children exist: ", childFolders, childNotes);
            setChildrenState(true);
        }else{
            setChildrenState(false);
            children = null;
        }
    },[children]);
    function handleFolderClick(){
        setIsOpen((prev) => !prev);
    }
    return (
        <div type={"folder"} folder={folder} data-folder-id={folder.id} delete-id={folder.id} className={`FolderContainer ${styles.FolderCont} ${(isOpen && childrenState)? styles.open: ""}`}  key={folder.name} style={{marginLeft: `${FolderIndex*15}px`}}>
            <div className={styles.FolderName} onClick={handleFolderClick}>
                <div className={styles.ArrowIcon}>
                    {isOpen?<IoChevronDownOutline/>:<IoChevronForward/>}
                </div>
                <div>
                    {isOpen?<FaFolderOpen/>:<FaFolder/>}
                </div>
                <div className={styles.FolderNameText}>{folder.name}</div>
            </div>
            <div className={styles.FolderChildren} style={{display: (isOpen && childrenState)? "block": "none"}}>
                {children}
            </div>
        </div>
    )
}

export default FBFolder;