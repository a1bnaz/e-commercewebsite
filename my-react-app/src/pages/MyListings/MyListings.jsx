
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/NavBar";
import CreateListingModal from "../../components/CreateListingModal/CreateListingModal";
import ConfirmationDeleteModal from "../../components/ConfirmationDeleteModal.jsx/ConfirmationDeleteModal";

import styles from "./MyListings.module.css";
import sideeyedog from "../../assets/sideeyedog.png";


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

export default function UserListings() {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentProductId, setCurrentProductId] = useState(null);

    const [showCreateListingModal, setShowCreateListingModal] = useState(false);
    const [showConfirmationDeleteModal, setShowConfirmationDeleteModal] = useState(false);

    

    let noProducts = false;
    if (products.length == 0) {
        noProducts = true;
    }

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/users/${loggedInUser.id}`);
                if (!response.ok) {
                    throw new Error("failed to fetch products");
                }
                const myProducts = await response.json();
                setProducts(myProducts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProducts();
    })

    function handleCreateListingButton() {
        setShowCreateListingModal(true);
    }

    function handleDeleteListingButton(e, product_id) {
        setCurrentProductId(product_id)
        setShowConfirmationDeleteModal(true)
    }

    return (
        <>
            <div className={styles.container}>
                <Navbar />

                <div className={styles.heading}>
                    <p className={styles.header}>My Listings</p>

                    <button onClick={handleCreateListingButton} className={styles.createListingButton}>Create Listing</button>
                </div>

                <div className={styles.listingsGrid}>
                    {
                        !loading && !error ? products.map((product) => (
                        <div key={product.id} className={styles.listing}>
                            <div className={styles.listingImageContainer}>
                                <img className={styles.listingImage} src={sideeyedog} />
                            </div>

                            <div className={styles.listingInformationContainer}>
                                <p className={styles.listingName}>{product.name}</p>
                                <p className={styles.listingPrice}>${product.price}</p>
                            </div>

                            <div className={styles.listingButtonsContainer}>
                                <button>Edit Listing</button>
                                {/* <button onClick={handleDeleteListingButton}>Delete Listing</button> */}
                                <button onClick={(e) => handleDeleteListingButton(e, product.id)}>Delete Listing</button>
                            </div>

                        </div>
                        )) : <div className={styles.Loading}>Loading...</div>
                    }
                    {
                        !noProducts ? "" : <div className={styles.noCurrentListings}>You have no current listings</div>
                    }
                </div>
            </div>

            {showCreateListingModal && (
                <CreateListingModal onClose={() => setShowCreateListingModal(false)} />
            )}

            {showConfirmationDeleteModal && (
                <ConfirmationDeleteModal onClose={() => setShowConfirmationDeleteModal(false)} currentProductId={currentProductId} />
            )}
        </>
    )
}