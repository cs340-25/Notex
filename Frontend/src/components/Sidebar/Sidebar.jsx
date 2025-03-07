import styles from './Sidebar.module.scss';
import { BsChevronBarLeft } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import SidebarTab from './SidebarTab/SidebarTab';
import { Link } from 'react-router-dom'
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
        <Link to="/">
          <SidebarTab Title={"Home"} fill={false} />
        </Link>
        <Link to="/Favorites"> 
          <SidebarTab Title={"Favorites"} fill={false}/>
        </Link>
        <Link to="/Search">
          <SidebarTab Title={"Search"} fill={false}/>
        </Link>
        <Link to="/NoteEditor">
          <SidebarTab Title={"Notes"} fill={false}/>
        </Link>
      </div>
      <div id={styles.SecondaryTabs}>
        <Link to="/Settings">
          <SidebarTab Title={"Settings"} fill={false}/>
        </Link>
        <Link to="/Profile">
          <SidebarTab Title={"Profile"} fill={false}/>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;