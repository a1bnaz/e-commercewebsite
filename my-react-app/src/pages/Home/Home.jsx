
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/NavBar.jsx";
import sideeyedog from "../../assets/sideeyedog.png";

const API_URL = "http://localhost:8080/api/products"

export default function Home() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]); // state to store products
    const [loading, setLoading] = useState(true); // state to handle loading state
    const [error, setError] = useState(null); // for error handling

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);

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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(); // call the async function to fetch data

    }, [])

    if (error) console.log(error);

    function handleViewListingButton(e, productId) {
        navigate(`/listings/${productId}`);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <Navbar/>
                <div className={styles.MessageContainer}>
                    <p className={styles.Message}>
                        Welcome back, {loggedInUser.username}!
                    </p>
                </div>
                {/* load in from the api each of the products */}
                <div className={styles.ListingsGridContainer}>
                    <div className={styles.ListingsGrid}>

                        {loading == false && !error ? products.slice(0, 6).map((product) => (
                            <div key={product.id} className={styles.Listing}>
                                <img className={styles.ListingImage} src={sideeyedog} />
                                <p className={styles.ListingName}>{product.name}</p>
                                <p className={styles.ListingPrice}>${product.price}</p>
                                <button onClick={(e) => handleViewListingButton(e, product.id)} className={styles.ListingButton}>View Listing</button>
                            </div>
                        )) : <div className={styles.Loading}>Loading...</div>}


                    </div>
                </div>
            </div>
        </>
    )
}