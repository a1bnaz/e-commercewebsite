
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import sideeyedog from "../assets/sideeyedog.png";


async function getListingInformation(listingId) {
    const API_URL = import.meta.env.VITE_API_URL;
    // const API_URL = `http://localhost:8080/api/products/${listingId}`;
    
    const response = await fetch(`${API_URL}/products/${listingId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch listing!");
    }
    return response.json();
}

export default function ViewListing() {
    const { listingId } = useParams();

    const { data: listing, isLoading, error } = useQuery({
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
        <>
            {/* NAVBAR */}
            <Navbar />

            {/* CONTAINER */}
            <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-x-3 max-w-5xl mx-auto px-2">
                {/* IMAGE CONTAINER */}
                <div className="border-2 rounded-xl overflow-hidden flex-1 flex items-center justify-center max-h-96">
                    <img src={sideeyedog} className="w-full h-full object-cover"/>
                </div>

                {/* DIVIDER FOR XS SCREENS*/}
                <span className="xs:hidden block w-full h-px bg-gray-600 mt-5"></span>

                {/* LISTING INFORMATION CONTAINER */}
                <div className="flex flex-col xs:items-center">
                    {/* NAME OF THE LISTING */}
                    <h2 className="text-3xl pl-3 pr-3 mb-5 mt-5 font-bold">{listing.name}</h2>

                    {/* PERSON WHO CREATED LISTING  */}
                    <Link to="" ><p className="underline text-blue-600 hover:-text-blue-800 cursor-pointer">{listing.user.username}</p></Link>

                    {/* NON XS SCREEN DIVIDER*/}
                    <span className="hidden xs:block w-full h-px bg-gray-600 mt-5"></span>

                    {/* DIVIDER  FOR XS SCREENS*/}
                    <span className="xs:hidden block w-full h-px bg-gray-600 mt-5"></span>

                    {/* PRICE OF THE LISTING */}
                    <p className="text-3xl font-bold mt-4">${listing.price}</p>

                    {/* ADD TO CART BUTTON */}
                    <button onClick={handleAddToCartButton} className="border-1 rounded-2xl font-[arial] font-bold p-2 bg-yellow-300 hover:bg-yellow-400 mt-5 xs:mt-10 xs:w-3/4">Add to Cart</button>

                    
                </div>

                {/* DESCRIPTION CONTAINER*/}
                <div className="xs:col-span-2">
                    {/* DESCRIPTION HEADING */}
                    <h2 className="font-bold text-2xl mb-2 mt-20 xs:mt-10">Description</h2>
                    <div className="border-2 rounded-2xl flex items-start h-auto">
                        <p className="font-[arial] p-2">{listing.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}