
import { Link, useParams } from "react-router-dom"; 
    
import styles from "./ViewListing.module.css";
import Navbar from "../../components/Navbar/NavBar";
import { useEffect, useState } from "react";

import sideeyedog from "../../assets/sideeyedog.png";

export default function ViewListing() {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        async function getListingInformation() {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${listingId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch listing!");
                }
                const data = await response.json();
                setListing(data);
                
            } catch (error) {
                console.error(error);
            }
        }
        getListingInformation();
    }, [])

    function handleAddToCartButton() {
        console.log("added to cart")
    }

    return (
        <div className={styles.listingContainer}>
            <Navbar/>
            

            {listing ? (
                <div className={styles.listingContent}>
                    <div className={styles.listingImageContainer}>
                        <img className={styles.listingImage} src={sideeyedog} />
                    </div>
                    
                    <h2 className={styles.listingName}>{listing.name}</h2>

                    <hr className={styles.listingDivider} />
                    <Link className={styles.listingOwnerUsernameLink}><p className={styles.listingOwnerUsername}>{listing.user.username}</p></Link>

                    <p className={styles.listingPrice}>Price: ${listing.price}</p>

                    <button onClick={handleAddToCartButton} className={styles.listingAddToCartButton}>Add to Cart</button>

                    <h2 className={styles.listingDescriptionHeader}>Description</h2>

                    <div className={styles.listingDescriptionContainer}>
                        <p className={styles.listingDescription}>{listing.description}</p>
                    </div>
                </div>
            ): (
                <p>Loading...</p>
            )}
        </div>
    )
}