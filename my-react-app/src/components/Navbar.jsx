
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sideeyedog from "../assets/sideeyedog.png";

import HamburgerDropdown from "./HamburgerDropdown.jsx";

export default function Navbar() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false); // to show the popup modal
    const [isOpen, setIsOpen] = useState(false); // to determine open/close animation

    function handleHamburgerButton() {
        setShowModal(!showModal);
        setIsOpen(!isOpen);
    }

    function handleLogoButton() {
        navigate("/home");
    }

    return (
        <>
            <div className="w-screen h-16 border-solid">

                {/* NAVBAR DIV ELEMENT */}
                <div className="min-w-screen min-h-15 border-2 border-solid flex flex-row justify-between">

                    {/* LEFT GROUP: Hamburger + Logo */}
                    <div className="flex justify-center items-center relative">
                        {/* HAMBURGER DROP DOWN */}
                        <button
                            onClick={handleHamburgerButton}
                            className="relative w-10 h-10 flex items-center justify-center focus:outline-none cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {/* Hamburger lines */}
                            <span
                                className={`absolute block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out 
                             ${isOpen ? "rotate-45" : "-translate-y-2"}`}
                            />
                            <span
                                className={`absolute block h-0.5 w-6 bg-black transition-opacity duration-300 ease-in-out 
                            ${isOpen ? "opacity-0" : "opacity-100"}`}
                            />
                            <span
                                className={`absolute block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out 
                            ${isOpen ? "-rotate-45" : "translate-y-2"}`}
                            />
                        </button>

                        {showModal && (
                            <div className="absolute left-0 top-full mt-2 z-50">
                                <HamburgerDropdown/>
                            </div>
                        )}

                        {/* LOGO */}
                        <div className="ml-1 w-12 h-12 flex items-center justify-center overflow-hidden">
                            <button onClick={handleLogoButton} className="cursor-pointer">
                                <img src={sideeyedog} className="w-full h-full object-contain" />
                            </button>
                        </div>
                    </div>

                    {/* SEARCH BAR AND SEARCH BUTTON */}
                    <div className="ml-2 mr-2 flex items-center flex-1 max-w-xs xs:max-w-sm xs:mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl md:mx-auto">
                        <input type="text" className="w-full border-2 rounded ml-1" />
                        <button className="border-1 rounded pl-1.5 pr-1.5 ml-1 mr-1 cursor-pointer">S</button>
                    </div>

                </div>

            </div>

        </>
    )
}