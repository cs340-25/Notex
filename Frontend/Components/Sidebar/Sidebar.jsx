import styles from './Sidebar.module.scss';
import { BsChevronBarLeft } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import SidebarTab from './SidebarTab/SidebarTab';
import { useState } from 'react';
function Sidebar({SidebarOpen, setSidebarOpen}) {
  function handleSidebarChange(){
    setSidebarOpen((prev)=> !SidebarOpen);
  };
  return (
    <div className={styles.SidebarCont}>
        <div id={styles.ChevronIcon}>
          <BsChevronBarLeft onClick={handleSidebarChange}/>
        </div>
        <div id={styles.AddCircleIcon}>
          <GrAddCircle />
        </div>


      <div id={styles.PrimaryTabs}>
        <SidebarTab Title={"Home"} fill={false}/>
        <SidebarTab Title={"Favorites"} fill={false}/>
        <SidebarTab Title={"Search"} fill={false}/>
        <SidebarTab Title={"Notes"} fill={false}/>
      </div>
      <div id={styles.SecondaryTabs}>
        <SidebarTab Title={"Settings"} fill={false}/>
        <SidebarTab Title={"Profile"} fill={false}/>
      </div>
    </div>
  );
}

export default Sidebar;