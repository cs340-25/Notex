import styles from './RightClickMenu.module.scss';
import { WorkspaceContext } from '../../Providers/WorkspaceProvider';
import { useContext, useEffect, useState } from 'react';

function RightClickMenu({ x, y, show, onClick, SelectedID }) {
    const [SelectedFolder, setSelectedFolder] = useState(null);
    const { rawData } = useContext(WorkspaceContext);
    
    useEffect(() => {
        if(rawData){
            const folder = rawData.folders.find((folder) => folder.id == SelectedID);
            if(folder){
                setSelectedFolder(folder);
            }
        }
    },[rawData, show]);
    
    function handleRightClickMenuClick(e) {
        console.log(SelectedFolder.name, "Right click menu clicked", e.target.innerText);
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