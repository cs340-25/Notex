import styles from './Sidebar.module.scss';
import { BsChevronBarLeft } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import SidebarTab from './SidebarTab/SidebarTab';
function Sidebar() {
  return (
    <div className={styles.SidebarCont}>
        <div id={styles.ChevronIcon}>
          <BsChevronBarLeft />
        </div>
        <div id={styles.AddCircleIcon}>
          <GrAddCircle />
        </div>


      <div id={styles.PrimaryTabs}>
        <SidebarTab Title={"Home"}/>
        <SidebarTab Title={"Favorites"}/>
        <SidebarTab Title={"Search"}/>
      </div>
      <div id={styles.SecondaryTabs}>
        <SidebarTab Title={"Settings"}/>
        <SidebarTab Title={"Profile"}/>
      </div>
    </div>
  );
}

export default Sidebar;