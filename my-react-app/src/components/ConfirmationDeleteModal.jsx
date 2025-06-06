
import { useMutation, useQueryClient } from "@tanstack/react-query";


const API_URL = import.meta.env.VITE_API_URL;

export default function ConfirmationDeleteModal({ onClose, currentListingId }) {
    const queryClient = useQueryClient();
    async function DeleteListing() {
        const response = await fetch(`${API_URL}/listings/${currentListingId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }
    }

    const deleteMutation = useMutation({
        mutationFn: DeleteListing,
        onSuccess: () => {
            // invalidate or refetch listings so UI updates
            queryClient.invalidateQueries(["fetchUserListings"]);
            onClose();
        },
        onError: (error) => {
            console.error(error);
        }
    })

    function handleDeleteButton() {
        console.log("delete button clicked")
        deleteMutation.mutateAsync();
    }

    return (
        // MODAL OVERLAY
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            {/* MODAL CONTENT */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
                {/* HEADER */}
                <h2 className="text-xl font-bold mb-6 text-center">Are you sure you want to delete this listing?</h2>
                {/* BUTTON CONTAINER */}
                <div className="flex gap-4 w-full justify-center">
                    <button
                        onClick={handleDeleteButton}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition-colors"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded transition-colors"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}