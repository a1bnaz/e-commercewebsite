

import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import sideeyedog from "../../assets/sideeyedog.png";

export default function Navbar() {
    
    const navigate = useNavigate();

    function handleSearchButton() {
        navigate("/listings");
    }

    return (
        <div className={styles.container}>
            <div className={styles.NavBar}>
                <div className={styles.LogoContainer}>
                    <a href="/home">
                        <img className={styles.Logo} src={sideeyedog}/>
                    </a>
                </div>

                <div className={styles.SearchBar}>
                    <form>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={styles.searchInput}
                        />
                        <button onClick={handleSearchButton} type="submit" className={styles.searchButton}>
                            Search
                        </button>
                    </form>
                </div>

                <div className={styles.Buttons}>
                    <a href="/listings">Listings</a>
                    <span className={styles.Separator}>|</span>
                    <a href="/mylistings">My Listings</a>
                </div>
            </div>
        </div>
    )
}