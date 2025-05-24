
import styles from "./ConfirmationDeleteModal.module.css";

export default function ConfirmationDeleteModal({onClose, currentProductId}) {

    async function DeleteListing() {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${currentProductId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                const message = await response.text();
                console.log(message);
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleDeleteButton() {
        DeleteListing();
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeader}>Are you sure you want to delete this listing?</h2>
                <button onClick={handleDeleteButton} className={styles.deleteButton}>Delete</button>
                <button onClick={onClose} className={styles.closeButton}>No</button>
            </div>
        </div>
    )
}