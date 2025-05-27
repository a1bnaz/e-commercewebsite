
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/NavBar.jsx";
import sideeyedog from "../../assets/sideeyedog.png";

const API_URL = "http://localhost:8080/api/products"

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(loggedInUser);

async function fetchListings() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        const message = await response.text();
        console.log(message);
    }
    return response.json();
}

export default function Home() {
    const navigate = useNavigate();

    const { data: listings, isLoading, error } = useQuery({
        queryKey: ["allListings"],
        queryFn: fetchListings,
        enabled: !!loggedInUser && !!loggedInUser.id
    })


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading listing.</div>
    }
    if (!listings) {
        return <p>Data not loaded...</p>
    }


    function handleViewListingButton(e, listingId) {
        navigate(`/listings/${listingId}`);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <Navbar />
                
                <div className={styles.MessageContainer}>
                    <p className={styles.Message}>
                        Welcome back, {loggedInUser.username}!
                    </p>
                </div>

                <div className={styles.ListingsGridContainer}>
                    <div className={styles.ListingsGrid}>

                        {listings.slice(0,6).map((listing) => (
                            <div key={listing.id} className={styles.Listing}>
                                <img className={styles.ListingImage} src={sideeyedog} />
                                <p className={styles.ListingName}>{listing.name}</p>
                                <p className={styles.ListingPrice}>${listing.price}</p>
                                <button onClick={(e) => handleViewListingButton(e, listing.id)} className={styles.ListingButton}>View Listing</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}