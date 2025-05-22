import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/NavBar";

import styles from "./Listings.module.css";

import sideeyedog from "../../assets/sideeyedog.png";

const API_URL = "http://localhost:8080/api/products"

export default function Listings() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [])

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
                    {!loading ? products.slice(0, 20).map((product) => (
                        <div key={product.id}  className={styles.Listing}>
                            <img className={styles.ListingImage} src={sideeyedog} />
                            <p className={styles.ListingName}>{product.name}</p>
                            <p className={styles.ListingPrice}>${product.price}</p>
                            <button className={styles.ListingButton}>View Listing</button>
                        </div>
                    )) : <div className={styles.Loading}>Loading...</div>}
                </div>

            </div>
        </>
    )
}