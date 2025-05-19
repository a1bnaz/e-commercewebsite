
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";

const EMAIL = "test";
const PASSWORD = "test";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleFormSubmit(event) {
        
        if (email == EMAIL && password == PASSWORD) {
            event.preventDefault();
            navigate("/home");
        }

        // this is the authentication function
        // for now just redirect to the home page
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