import styles from './Switch.module.scss';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { useContext } from 'react';

function Switch(){
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const handleToggle = () => {
        console.log(isDarkMode);
        toggleTheme();
    }
    return (
        <label className={styles.switch}>
            <input checked={isDarkMode} type="checkbox" className={styles.checkbox} id="checkbox" onClick={handleToggle}/>
            <span className={styles.slider}></span>
        </label>
    )
}

export default Switch;