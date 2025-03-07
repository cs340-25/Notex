import styles from './SidebarTab.module.scss';
import { icons } from '../../../assets/Icons/Icons';
function SidebarTab({ Title, fill }) {
    
    const Icon = ()=>{
        return icons[Title] || null;
    }

    return (
        <div className={styles.SidebarTabCont}>
            <div className={styles.IconCont}>
                <Icon/>
            </div>
            <h4 className={styles.Title}>{Title}</h4>
        </div>
    );
}

export default SidebarTab