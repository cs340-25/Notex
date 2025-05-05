import styles from './RightClickMenu.module.scss';
import { WorkspaceContext } from '../../Providers/WorkspaceProvider';
import { useContext, useEffect, useState } from 'react';
import { getNoteID, getFolderID, getData, postData, deleteData } from '../../api/DataApi';
import { Folder, Note, Image, Canvas } from '../../Models/DataTypes'

function RightClickMenu({ x, y, show, SelectedID, DeleteObj }) {
    const [SelectedFolder, setSelectedFolder] = useState(null);
    const { setFolderData, rawData, setRawData } = useContext(WorkspaceContext);
    
    useEffect(() => {
        if(rawData){
            const folder = rawData.folders.find((folder) => folder.id == SelectedID);
            if(folder){
                setSelectedFolder(folder);
            }
        }
    },[rawData, show]);
    

    async function handleRightClickMenuClick(e) {
        e.preventDefault();
        const option = e.target.innerText;
        if (option === "Add Note") {
            const newNote = new Note(19, -1, "Untitled Note", "This is a test note", false, SelectedID);            

            const response = await postData("testuser", newNote.toJSONInsert());
            const noteID = await getNoteID("testuser", SelectedID, "Untitled Note");
            newNote.id = noteID;
            setRawData((prev) => {
                const updatedNotes = [...prev.notes, newNote];
                return { ...prev, notes: updatedNotes };
            });

            if (response) {
                console.log("Note added successfully:", response);
            }
            console.log(SelectedFolder.name, "Add Note clicked");
        } else if (option === "Add Folder") {

            const newFolder = new Folder(19, -1, "Untitled Folder", false, SelectedID);
            
            const response = await postData("testuser", newFolder.toJSONInsert());
            const folderID = await getFolderID("testuser", "Untitled Folder", SelectedID);
            newFolder.id = folderID;

            setRawData((prev) => {
                const updatedFolders = [...prev.folders, newFolder];
                return { ...prev, folders: updatedFolders };
            });

            console.log("Folder ID: ", folderID);
            if (response) {
                console.log("Folder added successfully:", response);
            }
            console.log(SelectedFolder.name, "Add Folder clicked");
        } else if (option === "Delete") {
            const deleteObj = getDeleteObj(DeleteObj);
            if(DeleteObj.type === "folder"){
                setRawData((prev) => {
                    const updatedFolders = prev.folders.filter((folder) => folder.id !== deleteObj.id);
                    return { ...prev, folders: updatedFolders };
                });

                const response = await deleteData("testuser", deleteObj.toJSONDelete());
                if(response) {
                    console.log("Folder deleted successfully:", response);
                }
            }
            else if(DeleteObj.type === "note"){
                console.log("Delete note clicked: ", DeleteObj.deleteID);
                setRawData((prev) => {
                    const updatedNotes = prev.notes.filter((note) => note.id !== deleteObj.id);
                    return { ...prev, notes: updatedNotes };
                });
                const response = await deleteData("testuser", deleteObj.toJSONDelete());
                if (response) {
                    console.log("Note deleted successfully:", response);
                }
            }
        }
    }

    function getDeleteObj(DeleteObj){
        const deleteType = DeleteObj.type;
        let retDeleteObj;
        if(deleteType === "folder"){
            retDeleteObj = rawData.folders.find((folder) => folder.id == DeleteObj.deleteID);
            retDeleteObj = new Folder(retDeleteObj.user_id, retDeleteObj.id, retDeleteObj.name, retDeleteObj.favorite, retDeleteObj.parent_folder_id);
            
        }
        else if(deleteType === "note"){
            retDeleteObj = rawData.notes.find((note) => note.id == DeleteObj.deleteID);
            retDeleteObj = new Note(retDeleteObj.user_id, retDeleteObj.id, retDeleteObj.title, retDeleteObj.content, retDeleteObj.favorite, retDeleteObj.folder_id);

        }
        return retDeleteObj;
    }

    return (
        <div className={styles.rightClickMenu} style={{ left: x, top: y, display: show ? 'block' : 'none' }} onClick={handleRightClickMenuClick}>
            <div className={styles.menuList}>
                <div className={styles.menuItem}>Add Note</div>
                <div className={styles.menuItem}>Add Folder</div>
                <div className={styles.menuItem}>Delete</div>
            </div>
        </div>
    );
}   

export default RightClickMenu;