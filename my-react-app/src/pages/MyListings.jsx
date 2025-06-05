
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.jsx";
import CreateListingModal from "../components/CreateListingModal.jsx";
import ConfirmationDeleteModal from "../components/ConfirmationDeleteModal.jsx";
import EditListingModal from "../components/EditListingModal.jsx";

import sideeyedog from "../assets/sideeyedog.png";


async function fetchUserListings(loggedInUserId) {
    const API_URL = `http://localhost:8080/api/products/users/${loggedInUserId}`
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch user listings!");
    }
    return response.json();
}

export default function UserListings() {

    const [currentListingId, setCurrentListingId] = useState(null);

    const [showCreateListingModal, setShowCreateListingModal] = useState(false);
    const [showConfirmationDeleteModal, setShowConfirmationDeleteModal] = useState(false);
    const [showEditListingModal, setShowEditListingModal] = useState(false);


    // GET THE CURRENT LOGGED IN USER
    const { data: loggedInUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => JSON.parse(localStorage.getItem("loggedInUser")),
    })

    const { data: listings, isLoading, error } = useQuery({
        queryKey: ["fetchUserListings"],
        queryFn: () => fetchUserListings(loggedInUser.id),
        enabled: !!loggedInUser && !!loggedInUser.id,
    });

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.error(error);
        return <div>Error loading listing.</div>
    }
    if (!listings) {
        return <p>Data not loaded...</p>
    }
    let userListingsExist = listings.length !== 0;

    function handleCreateListingButton() {
        setShowCreateListingModal(true);
    }

    function handleEditListingButton(e, listing_id) {
        setCurrentListingId(Number(listing_id))
        setShowEditListingModal(true);
    }

    function handleDeleteListingButton(e, listing_id) {
        setCurrentListingId(Number(listing_id))
        setShowConfirmationDeleteModal(true)
    }

    return (
        <>
            {/* NAVBAR */}
            <Navbar />
            
            {/* HEADING CONTAINER */}
            <div className="flex items-center justify-between px-5 mb-3">
                <h1 className="font-bold text-2xl">My Listings</h1>
                <button className="rounded-md border-1 cursor-pointer p-1 bg-gray-600 hover:bg-gray-700 text-white font-bold" onClick={handleCreateListingButton}>Create Listing</button>
            </div>

            {/* DIVIDER FOR XS SCREENS*/}
            <span className="xs:hidden block w-full h-px bg-gray-600 mt-5"></span>

            {/* LISTINGS GRID */}
            <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    // LISTING
                    <div
                        key={listing.id}
                        className="bg-white rounded-lg shadow flex flex-col ml-10 mr-10 md:ml-0 md:mr-0"
                    >
                        {/* IMAGE CONTAINER */}
                        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-t-lg">
                            <img
                                src={sideeyedog}
                                alt={listing.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* LISTING INFORMATION */}
                        <div className="p-4 flex flex-col">
                            <p className="font-semibold text-lg">{listing.name}</p>
                            <p className="text-gray-600 mb-4">${listing.price}</p>
                            <div className="flex gap-2 justify-center items-center">
                                <button
                                    className="mt-auto bg-gray-800 text-white cursor-pointer rounded py-2 px-4 hover:bg-gray-900 transition-colors w-1/2" onClick={(e) => handleEditListingButton(e, listing.id)}>
                                    Edit
                                </button>

                                <button
                                    className="mt-auto bg-gray-800 text-white cursor-pointer rounded py-2 px-4 hover:bg-gray-900 transition-colors w-1/2" onClick={(e) => handleDeleteListingButton(e, listing.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {showCreateListingModal &&
                    <CreateListingModal onClose={() => setShowCreateListingModal(false)} />
                }
                {showConfirmationDeleteModal &&
                    <ConfirmationDeleteModal
                        onClose={() => setShowConfirmationDeleteModal(false)}
                        currentListingId={currentListingId}
                    />
                }
                {showEditListingModal && 
                    <EditListingModal
                        onClose={() => setShowEditListingModal(false)}
                        currentListingId={currentListingId}
                />
                }
            </div>
        </>
    )
}