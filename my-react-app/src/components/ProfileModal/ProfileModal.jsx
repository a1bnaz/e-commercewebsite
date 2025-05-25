
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

import styles from "./ProfileModal.module.css";

export default function ProfileModal({ onClose }) {
    const navigate = useNavigate();
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [onClose]);

    function handleProfileButton() {
        console.log("profile button clicked")
    }

    function handleSettingsButton() {
        console.log("settings button clicked")
    }

    function handleLogoutButton() {
        navigate("/login");
        onClose();
    }

    return (
        <div ref={modalRef} className={styles.modalContainer}>
            <button onClick={handleProfileButton} className={styles.modalButton}>Profile</button>
            <button onClick={handleSettingsButton} className={styles.modalButton}>Settings</button>
            <button onClick={handleLogoutButton}  className={styles.modalButton}>Logout</button>
        </div>
    )
}