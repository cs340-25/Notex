import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';

function SearchItem({ item, index }) {
    const { name, type, path } = item;
    
    return (
        <div className={styles.SearchItemCont}>
            
            <div className={`${styles.SearchItemTextCont} ${index%2===0?styles.even:styles.odd}`}>
                <p className={styles.SearchItemText}>{item}</p>
            </div>
            
        </div>

    );
}

export default SearchItem