import styles from './Folderbar.module.scss';
import { BsChevronBarRight } from "react-icons/bs";

function Folderbar({setSidebarOpen, SidebarOpen}) {
  function handleSidebarChange(){
    setSidebarOpen((prev)=> !SidebarOpen);
  };
  return (
    <div className={styles.FolderbarCont}>
      <div id={styles.ChevronIcon} className={SidebarOpen ? styles.none : ""}>
        <BsChevronBarRight onClick={handleSidebarChange}/>
      </div>
        <p>Folderbar</p>
    </div>
  );
}

export default Folderbar;