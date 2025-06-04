import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function HamburgerDropdown() {
    const queryClient = useQueryClient();

    function handleMyProfileButton() {
        console.log("my profile button clicked")
    }

    function handleSettingsButton() {
        console.log("settings button clicked")
    }

    function handleLogoutButton() {
        queryClient.setQueryData(["user"], null);
        console.log("login button clicked")
    }

    function handleListingsButton() {
        console.log("listings button clicked")
    }

    function handleMyListingsButton() {
        console.log("my listings button clicked")
    }

    return (
        <div className="bg-white flex flex-col items-center z-50 rounded-lg shadow-lg p-6">
            {/* MY PROFILE BUTTON */}
            <Link to="">
                <button onClick={handleMyProfileButton} className="bg-gray-800 text-white cursor-pointer text-xs font-semibold rounded py-3 px-4 m-2 hover:bg-gray-700 transition-colors">My Profile</button>
            </Link>

            {/* SETTINGS BUTTON */}
            <Link to="">
                <button onClick={handleSettingsButton} className="bg-gray-800 text-white cursor-pointer not-only:font-semibold rounded py-2 px-4 m-2 hover:bg-gray-700 transition-colors">Settings</button>
            </Link>

            {/* LOGOUT BUTTON */}
            <Link to="/login">
                <button onClick={handleLogoutButton} className="bg-gray-800 text-white cursor-pointer font-semibold rounded py-2 px-4 m-2 mb-4 hover:bg-gray-700 transition-colors">Logout</button>
            </Link>

            {/* DIVIDER */}
            <span className="block w-full h-px bg-gray-300 my-2"></span>

            {/* LISTINGS BUTTON */}
            <Link to="/listings">
                <button onClick={handleListingsButton} className="bg-gray-800 text-white cursor-pointer font-semibold rounded py-2 px-4 m-2 mb-4 hover:bg-gray-700 
            transition-colors">Listings</button>
            </Link>

            {/* MY LISTINGS BUTTON */}
            <Link to="/mylistings">
                <button onClick={handleMyListingsButton} className="bg-gray-800 text-white cursor-pointer text-xs font-semibold rounded py-2 px-4 m-1 mb-4 hover:bg-gray-700 transition-colors">My Listings</button>
            </Link>
        </div>
    )
}