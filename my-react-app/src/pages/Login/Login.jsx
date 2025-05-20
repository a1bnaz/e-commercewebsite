
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    async function handleFormSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                // optionally store a token if you later add JWT

                const userData = await response.json();
                localStorage.setItem("loggedInUser", JSON.stringify(userData));
                navigate("/home");
            } else {
                const message = await response.text();
                setError(message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Try again.");
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <form onSubmit={handleFormSubmit} className={styles.LoginForm}>
                        <h1 className={styles.LoginText}>Login</h1>
                        
                        <label htmlFor="email">Email</label>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="text" id="email" name="email" required />
                        
                        <br></br>

                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="password" name="password" required />

                        <br></br>

                        <button type="submit">Login</button>
                    </form>
                </div>
                
            </div>
        </>
    )
}