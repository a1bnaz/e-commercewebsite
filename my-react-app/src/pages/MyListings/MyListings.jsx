
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/NavBar";
import CreateListingModal from "../../components/CreateListingModal/CreateListingModal";
import ConfirmationDeleteModal from "../../components/ConfirmationDeleteModal.jsx/ConfirmationDeleteModal";

import styles from "./MyListings.module.css";
import sideeyedog from "../../assets/sideeyedog.png";


async function fetchUserListings() {
    const response = await fetch(`http://localhost:8080/api/products/users/${loggedInUser.id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user listings!");
    }
    return response.json();
}

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

export default function UserListings() {
    
    const [currentProductId, setCurrentProductId] = useState(null);

    const [showCreateListingModal, setShowCreateListingModal] = useState(false);
    const [showConfirmationDeleteModal, setShowConfirmationDeleteModal] = useState(false);

    
    let userListingsExist = false;

    const { data: listings, isLoading, error } = useQuery({
        queryKey: ["fetchUserListings"],
        queryFn: fetchUserListings,
        enabled: !!loggedInUser && !!loggedInUser.id,
    });
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading listing.</div>
    }
    if (!listings) {
        return <p>Data not loaded...</p>
    }
    if (listings.length != 0) {
        userListingsExist = true;
    }

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
                    {listings.map((listing) => (
                        <div key={listing.id} className={styles.listing}>
                            <div className={styles.listingImageContainer}>
                                <img className={styles.listingImage} src={sideeyedog} />
                            </div>

                            <div className={styles.listingInformationContainer}>
                                <p className={styles.listingName}>{listing.name}</p>
                                <p className={styles.listingPrice}>${listing.price}</p>
                            </div>

                            <div className={styles.listingButtonsContainer}>
                                <button>Edit Listing</button>
                                <button onClick={(e) => handleDeleteListingButton(e, listing.id)}>Delete Listing</button>
                            </div>

                        </div>
                    ))}

                    {
                        userListingsExist ? "" : <div className={styles.noCurrentListings}>You have no current listings</div>
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