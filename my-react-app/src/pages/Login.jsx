
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080/api/users/login";
const TEMP_API_URL = "http://192.168.87.205:8080/api/users/login";


async function loginUser({ email, password }) {
    const response = await fetch(TEMP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed");
    }
    return response.json();
}

export default function Login() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (userData) => {
            localStorage.setItem("loggedInUser", JSON.stringify(userData));
            // Optionally update user cache
            queryClient.setQueryData(["user"], userData);
            navigate("/home");
        },
        onError: (err) => {
            setError(err.message || "Login failed");
        }
    })

    function handleFormSubmit(event) {
        event.preventDefault();
        mutation.mutate({ email, password });
    }

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center px-4">
                <div className="w-full max-w-md bg-indigo-900 text-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <h1 className="text-3xl font-bold text-center">Login</h1>
                        
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            id="email"
                            name="email"
                            required
                            placeholder="Enter your email here"
                            className="mt-1 w-full px-4 py-2 rounded-md text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        
                        <br></br>

                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Enter your passsword here"
                            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"/>

                        <br></br>

                        <button type="submit"
                            className="w-full bg-amber-400 text-indigo-900 font-semibold py-2 px-4 rounded-md hover:bg-amber-500 transition">Login</button>
                    </form>
                </div>
                
            </div>
        </>
    )
}