
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { useRef, useState, useEffect } from "react";

/* 
This is used to update the current listing.
When the edit listing button is clicked, it's processed through the putMutation and the PUT method is used to update the listing.
*/
async function updateListing({data, currentListingId}) {
    const API_URL = `http://localhost:8080/api/products/${currentListingId}`;
    const TEMP_API_URL = `http://192.168.87.205:8080/api/products/${currentListingId}`
    const response = await fetch(TEMP_API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }
}

/*
This is used to get the current listing information.
This function is intended to get the current listing information to already have the input boxes filled out, making it easier to edit.
*/
async function getListingInformation(listingId) {
    const API_URL = `http://localhost:8080/api/products/${listingId}`;
    const TEMP_API_URL = `http://192.168.87.205:8080/api/products/${listingId}`;

    const response = await fetch(TEMP_API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch listing!");
    }
    return response.json();
}

export default function EditListingModal({ onClose, currentListingId }) {
    const queryClient = useQueryClient();

    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    /*
        This query is getting the current listing by it's ID
        This is to already have the previous listing information input boxes filled out.
    */
    const { data: currentListing, isLoading, error } = useQuery({
        queryKey: ["listingQuery", currentListingId],
        queryFn: () => getListingInformation(currentListingId),
        enabled: !!currentListingId,
    });


    // When currentListing loads, set the initial values
    useEffect(() => {
        if (currentListing) {
            setName(currentListing.name || "");
            setDescription(currentListing.description || "");
            setPrice(currentListing.price || "");
        }
    }, [currentListing])

    /*
        This query is used to get the current user that is logged in. 
        It's being gathered so that the loggedInUser's ID can be passed as data into the putMutation.
    */
    const { data: loggedInUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => JSON.parse(localStorage.getItem("loggedInUser")),
    })

    /*
        This is the mutation that is handling the updateListing function, as well as the onSuccess and onError states.
    */
    const putMutation = useMutation({
        mutationFn: updateListing,
        onSuccess: () => {
            queryClient.invalidateQueries(["fetchUserListings"]);
        },
        onError: (error) => {
            console.log(error)
        }
    })

    // When the edit listing button is clicked, this function runs.
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log("button clicked")

        // (disregard validation for now) add the listing to the database
        const data = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: Number(priceRef.current.value),
            user: {
                id: Number(loggedInUser.id)
            }
        };

        putMutation.mutateAsync({data, currentListingId});

        onClose();
    }

    return (

        // MODAL OVERLAY
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            {/* MODAL CONTENT */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl flex flex-col mx-5">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl xs:text-2xl font-bold text-gray-800">Edit Listing</h2>
                    {/* EXIT BUTTON */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
                    >
                        X
                    </button>
                </div>

                {/* FORM */}
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error loading listing.</div>
                    ) : (
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                                {/* TITLE FIELD */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        ref={nameRef}
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                    />
                                </div>

                                {/* DESCRIPTION FIELD */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        ref={descriptionRef}
                                        id="description"
                                        name="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 resize-none"
                                    />
                                </div>

                                {/* PRICE FIELD (Stacked) */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        ref={priceRef}
                                        type="number"
                                        id="price"
                                        name="price"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                        onInput={e => {
                                            if (e.target.value.length > 7) {
                                                e.target.value = e.target.value.slice(0, 7);
                                            }
                                        }}
                                    />
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition-colors"
                                    >
                                        Edit Listing
                                    </button>
                                </div>
                            </form>
                )}
            </div>
        </div>
    );
}