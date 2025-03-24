import styles from './Toolbar.module.scss';
import { IoClose } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";


function Toolbar(){
    return (
        <div className={styles.ToolbarCont}>
            <div className={styles.TitleCont}>
            </div>
            <div className={styles.IconCont}>
                <FaMinus className={styles.Icon} onClick={() => window.electron.ipcRenderer.send("minimize")}/>
                <IoCopyOutline className={styles.Icon} onClick={() => window.electron.ipcRenderer.send("maximize")}/>
                <IoClose className={styles.Icon} onClick={() => window.electron.ipcRenderer.send("close")}/>
            </div>
        </div>
    );
}

export default Toolbar;