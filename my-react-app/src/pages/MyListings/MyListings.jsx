

import Navbar from "../../components/Navbar/NavBar";

import styles from "./MyListings.module.css";
import sideeyedog from "../../assets/sideeyedog.png";


export default function UserListings() {
    
    return (
        <>
            
            {/* display only what belongs to the user... send a request to the api to check what products belong to the user that is in the current localstorage session */}

            {/* 
            const CURRENT_USER = JSON.parse(localStorage.getItem("loggedInUser"));

            go to /api/products and maybe loop through all of the products' user_id's and see if any of them match with CURRENT_USER.id??? ask chatgpt the best way to approach this situation (temporary solution)
            
            
            */}
            <div className={styles.container}>
                <Navbar />

                <div className={styles.heading}>
                    <p className={styles.header}>My Listings</p>

                    <button className={styles.createListingButton}>Create Listing</button>
                </div>

                <div className={styles.listingsGrid}>
                    <div className={styles.listing}>

                        <div className={styles.listingImageContainer}>
                            <img className={styles.listingImage} src={sideeyedog} />
                        </div>

                        <div className={styles.listingInformationContainer}>
                            <p className={styles.listingName}>name</p>
                            <p className={styles.listingPrice}>price</p>
                        </div>

                        <div className={styles.listingButtonsContainer}>
                            <button>Edit Listing</button>
                            <button>Delete Listing</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}