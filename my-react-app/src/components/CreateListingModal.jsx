
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { useRef } from "react";


async function createListing(data) {
    const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
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

export default function CreateListingModal({ onClose }) {
    const queryClient = useQueryClient();

    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    // GET THE CURRENT LOGGED IN USER
    const { data: loggedInUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => JSON.parse(localStorage.getItem("loggedInUser")),
    })

    const postMutation = useMutation({
        mutationFn: createListing,
        onSuccess: () => {
            queryClient.invalidateQueries(["fetchUserListings"]);
        },
        onError: (error) => {
            console.log(error)
        }
    })

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

        postMutation.mutateAsync(data);
        
        onClose();
    }

    return (
        
        // MODAL OVERLAY
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            {/* MODAL CONTENT */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl flex flex-col mx-5">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl xs:text-2xl font-bold text-gray-800">Create a New Listing</h2>
                    {/* EXIT BUTTON */}
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
                    >
                        X
                    </button>
                </div>

                {/* FORM */}
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
                            Create Listing
                        </button>
                    </div>
                </form>
            </div>
        </div>
      );
}