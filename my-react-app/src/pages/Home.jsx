
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import sideeyedog from "../assets/sideeyedog.png";

const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:8080/api/products"


async function fetchListings() {
    const response = await fetch(`${API_URL}/listings`);
    if (!response.ok) {
        const message = await response.text();
        console.log(message);
    }
    return response.json();
}

export default function Home() {
    const navigate = useNavigate();

    // GET THE CURRENT LOGGED IN USER
    const { data: loggedInUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => JSON.parse(localStorage.getItem("loggedInUser")),
    })

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
            {/* HOME PAGE CONTAINER */}
            <div className="w-screen min-h-screen bg-gray-50">
                {/* NAVBAR */}
                <Navbar />
                
                {/* WELCOME MESSAGE */}
                <div className="max-w-5xl mx-auto my-6 text-lg md:text-3xl">
                    <p>Welcome back, {loggedInUser.username}!</p>
                </div>

                {/* LISTINGS GRID */}
                <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {listings.slice(0, 6).map((listing) => (
                        // LISTING
                        <div
                            key={listing.id}
                            className="bg-white rounded-lg shadow flex flex-col ml-10 mr-10 md:ml-0 md:mr-0"
                        >
                            {/* Image */}
                            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-t-lg">
                                <img
                                    src={sideeyedog}
                                    alt={listing.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Info */}
                            <div className="p-4 flex flex-col">
                                <p className="font-semibold text-lg">{listing.name}</p>
                                <p className="text-gray-600 mb-4">${listing.price}</p>
                                <button
                                    className="mt-auto bg-gray-800 text-white cursor-pointer rounded py-2 px-4 hover:bg-gray-900 transition-colors"
                                    onClick={(e) => handleViewListingButton(e, listing.id)}
                                >
                                    View Listing
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}