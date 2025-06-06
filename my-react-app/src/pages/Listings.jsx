
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import sideeyedog from "../assets/sideeyedog.png";

// const API_URL = "http://localhost:8080/api/products"
const API_URL = import.meta.env.VITE_API_URL;

async function fetchListings() {
    const response = await fetch(`${API_URL}/listings`);
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
        return <div>Loading...</div>
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
            {/* NAVBAR */}
            <Navbar />

            {/* CONTAINER */}
            <div className="grid grid-cols-1 xs:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 mx-auto">

                {/* Filter div (on the left of the screen) */}
                <div className="border-b-2 xs:border-2 xs:rounded-r-lg xs:col-span-1 flex items-center justify-center xs:items-baseline xs:justify-baseline font-bold xs:h-1/10 s:h-2/10 md:h-4/10 lg:h-5/10 xl:h-6/10">
                    <p className="xs:mt-5">Filters</p>
                </div>

                {/* Listings Grid (on the right of the screen) */}
                <div className="xs:col-start-2 xs:col-end-12 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 px-10 md:px-6">
                    {listings.slice(0, 20).map((listing) => (
                        <div key={listing.id} className="flex flex-col bg-white rounded-lg shadow mt-3 mb-8 md:mb-3">
                            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg">
                                <img src={sideeyedog} className="w-full h-full object-cover aspect-square"/>
                            </div>
                            <p className="mx-3 mt-3 font-bold">{listing.name}</p>
                            <p className="mx-3">${listing.price}</p>
                            <button onClick={(e) => handleViewListingButton(e, listing.id)} className="text-white border-1 rounded-lg bg-gray-800 hover:bg-gray-900 font-[arial] font-bold p-2 mb-4 cursor-pointer mx-3">View Listing</button>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}