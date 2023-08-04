import './App.css';
import NavBar from "./navBar/NavBar";
import Main from "./main/Main";
import {useState, useEffect} from "react";

function App() {
    const products = useFetch();
    return (
        <div className="app">
            <NavBar/>
            <Main gridProducts={products}/>
            <footer></footer>
        </div>
    );
}

function useFetch(url = "https://dummyjson.com/products") {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function init() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json.products);
            } catch (e) {
                setData([]);
            }
        }

        init();
    }, [url]);

    return data;
}

export default App;
