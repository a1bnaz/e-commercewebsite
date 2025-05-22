
import styles from "./CreateListingModal.Module.css";

export default function CreateListingModal({ onClose }) {
    
    function handleFormSubmit(event) {
        event.preventDefault();
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.modalExitButton}>X</button>

                <form className={styles.formGrid} onSubmit={handleFormSubmit}>
                    <label className={styles.titleLabel} htmlFor="title">Title</label>
                    <textarea className={styles.titleInput} type="text" id="title" name="title" required />
                    
                    <br />
                    
                    <label className={styles.descriptionLabel}  htmlFor="description">
                        Description
                    </label>
                    <textarea className={styles.descriptionInput} type="text" id="description" name="description" required />
                    
                    <label className={styles.priceLabel}  htmlFor="price">
                        Price
                    </label>
                    <input className={styles.priceInput} type="number" id="price" name="price" required />

                    <button className={styles.createListingButton}>Create Listing</button>
                </form>


            </div>
        </div>
      );
}