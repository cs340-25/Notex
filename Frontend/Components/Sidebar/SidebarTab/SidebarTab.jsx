import styles from './SidebarTab.module.scss';

function SidebarTab({ Title, Icon }) {
    return (
        <div className={styles.SidebarTabCont}>
            <p className={styles.Title}>{Title}</p>
        </div>
    );
}

export default SidebarTab