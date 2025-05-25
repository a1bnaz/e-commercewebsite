
import { useRef, useEffect } from "react";

import styles from "./ProfileModal.module.css";

export default function ProfileModal({onClose}) {
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

    return (
        <div ref={modalRef} className={styles.modalContainer}>
            <button className={styles.modalButton}>Profile</button>
            <button className={styles.modalButton}>Settings</button>
            <button className={styles.modalButton} onClick={onClose}>Logout</button>
        </div>
    )
}