
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"; 
    
import styles from "./ViewListing.module.css";
import Navbar from "../../components/Navbar/NavBar";

import sideeyedog from "../../assets/sideeyedog.png";


async function getListingInformation(listingId) {
    const response = await fetch(`http://localhost:8080/api/products/${listingId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch listing!");
    }
    return response.json();
}

export default function ViewListing() {
    const { listingId } = useParams();

    const {data: listing, isLoading, error} = useQuery({
        queryKey: ["listingQuery", listingId], // unique identifier for the query
        queryFn: () => getListingInformation(listingId), // the function that query uses to fetch data
        enabled: !!listingId, // only run this query if listingId exists and is not empty, null, or undefined. the first ! converts the value to a boolean and inverts it. the second ! inverts it back, so you get true for any "truthy" value and false for any "falsy" value.
        /*
        examples:
        if listingId is "123", !!listingId is true.
        if listingId is null, !!listingId is false.
        if listingId is undefined, !!listingId is false.
        if listingId is "", !!listingId is false.
        */
    });

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading listing.</div> 
    }
    if (!listing) {
        return <p>Data not loaded...</p>
    }

    function handleAddToCartButton() {
        console.log("added to cart")
    }

    return (
        <div className={styles.listingContainer}>
            <Navbar />
            
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
        </div>
    )
}

/*

    
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
    }, [listingId])

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

*/