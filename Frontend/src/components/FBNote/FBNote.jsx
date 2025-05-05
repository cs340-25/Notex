import styles from './FBNote.module.scss'
import { FaFile } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

function FBNote({ note, FolderIndex, isOpen, handleNoteClick}) {
    // console.log("Note: ", note)
    return (
        <div type={"note"} delete-id={note.id} className={styles.noteCont} key={note.title} style={{marginLeft: `${FolderIndex*20}px`}}>
            <p className={styles.noteName} onClick={handleNoteClick}>{isOpen?<FaFileAlt/>:<FaFile/>}{note.title}</p>
        </div>
    )
}

export default FBNote;