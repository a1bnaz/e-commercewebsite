
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import sideeyedog from "../../assets/sideeyedog.png";

import ProfileModal from "../../components/ProfileModal/ProfileModal.jsx";

export default function Navbar() {
    
    const navigate = useNavigate();
    const [showNavBarProfileModal, setShowNavBarProfileModal] = useState(false);

    function handleSearchButton() {
        navigate("/listings");
    }

    function handleNavBarProfileButton() {
        setShowNavBarProfileModal(true);
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
                    <Link to="/listings">Listings</Link>
                    <span className={styles.Separator}>|</span>
                    <Link to="/mylistings">My Listings</Link>
                    <span className={styles.Separator}>|</span>
                    <button onClick={handleNavBarProfileButton} className={styles.navBarProfileButton}>Me</button>

                    {showNavBarProfileModal && <ProfileModal onClose={() => setShowNavBarProfileModal(false)} />}
                </div>
            </div>
        </div>
    )
}