
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./ConfirmationDeleteModal.module.css";

export default function ConfirmationDeleteModal({ onClose, currentProductId }) {
    const queryClient = useQueryClient();

    async function DeleteListing() {
        const response = await fetch(`http://localhost:8080/api/products/${currentProductId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }
    }

    const deleteMutation = useMutation({
        mutationFn: DeleteListing,
        onSuccess: () => {
            // invalidate or refetch listings so UI updates
            queryClient.invalidateQueries(["fetchUserListings"]);
            onClose();
        },
        onError: (error) => {
            console.error(error);
        }
    })

    function handleDeleteButton() {
        deleteMutation.mutateAsync();
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