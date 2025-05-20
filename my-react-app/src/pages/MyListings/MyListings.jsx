

import Navbar from "../../components/Navbar/NavBar";

import styles from "./MyListings.module.css";



export default function UserListings() {
    
    return (
        <>
            <Navbar />
            {/* display only what belongs to the user... send a request to the api to check what products belong to the user that is in the current localstorage session */}

            {/* 
            const CURRENT_USER = JSON.parse(localStorage.getItem("loggedInUser"));

            go to /api/products and maybe loop through all of the products' user_id's and see if any of them match with CURRENT_USER.id??? ask chatgpt the best way to approach this situation (temporary solution)
            
            
            */}
            <div>
                User Listings
            </div>
        </>
    )
}