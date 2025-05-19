
import styles from "./Navbar.module.css";
import sideeyedog from "../../assets/sideeyedog.png";

export default function Navbar() {
    
    return (
        <div className={styles.container}>
            <div className={styles.NavBar}>
                <div className={styles.LogoContainer}>
                    <a>
                        <img className={styles.Logo} src={sideeyedog}/>
                    </a>
                </div>

                <div className={styles.Buttons}>
                    <a href="/home">Post Listing</a>
                    <p>|</p>
                    <a href="/home">My Listings</a>
                </div>
            </div>
            <div className={styles.SearchBar}>
                <form>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        Search
                    </button>
                </form>
            </div>
            
            
        </div>
    )
}