
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/NavBar";

import styles from "./Listings.module.css";

import sideeyedog from "../../assets/sideeyedog.png";

const API_URL = "http://localhost:8080/api/products"

async function fetchListings() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        const message = await response.text();
        console.log(message);
    }
    return response.json();
}

export default function Listings() {

    const navigate = useNavigate();

    const { data: listings, isLoading, error } = useQuery({
        queryKey: ["allListings"],
        queryFn: fetchListings,
        enabled: true
    });

    if (isLoading) {
        return <div className={styles.Loading}>Loading...</div>
    }
    if (error) {
        return <div>Error loading listing.</div>
    }
    if (!listings) {
        return <p>Data not loaded...</p>
    }

    function handleViewListingButton(e, productId) {
        navigate(`/listings/${productId}`);
    }

    return (
        <>
            <Navbar/>
            <div className={styles.container}>

                {/* Filter div (on the left of the screen) */}
                <div className={styles.FilterContainer}>
                    Filters
                </div>

                {/* Listings Grid (on the right of the screen) */}
                <div className={styles.ListingsGrid}>
                    {listings.slice(0, 20).map((listing) => (
                        <div key={listing.id} className={styles.Listing}>
                            <img className={styles.ListingImage} src={sideeyedog} />
                            <p className={styles.ListingName}>{listing.name}</p>
                            <p className={styles.ListingPrice}>${listing.price}</p>
                            <button onClick={(e) => handleViewListingButton(e, listing.id)} className={styles.ListingButton}>View Listing</button>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}