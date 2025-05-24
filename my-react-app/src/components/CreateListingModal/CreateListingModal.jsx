
import { useRef } from "react";
import styles from "./CreateListingModal.Module.css";


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(loggedInUser.id + "IS THE USER ID")

export default function CreateListingModal({ onClose }) {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    
    async function createListing(data) {
        console.log("Sending data: ", data);
        try {
            const response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("success");
            } else {
                const message = await response.text();
                console.log(message);
            }
        } catch (error) {
            // Optionally handle error here
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // (disregard validation for now) add the listing to the database
        const data = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: Number(priceRef.current.value),
            user: {
                id: Number(loggedInUser.id)
            }
        };

        createListing(data);
        console.log(data)
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.modalExitButton}>X</button>

                <form className={styles.formGrid} onSubmit={handleFormSubmit}>
                    <label className={styles.titleLabel} htmlFor="title">Title</label>
                    <textarea ref={nameRef} className={styles.titleInput} type="text" id="title" name="title" required />
                    
                    <br />
                    
                    <label className={styles.descriptionLabel}  htmlFor="description">
                        Description
                    </label>
                    <textarea ref={descriptionRef} className={styles.descriptionInput} type="text" id="description" name="description" required />
                    
                    <label className={styles.priceLabel}  htmlFor="price">
                        Price
                    </label>
                    <input ref={priceRef} className={styles.priceInput} type="number" id="price" name="price" required />

                    <button className={styles.createListingButton}>Create Listing</button>
                </form>


            </div>
        </div>
      );
}