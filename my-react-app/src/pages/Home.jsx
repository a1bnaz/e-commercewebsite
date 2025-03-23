import { useEffect, useState } from "react";

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;