import "./Main.css";
import Filters from "./filters/Filters";
import ProductsInfo from "./products/productsInfo/ProductsInfo";
import ProductsGrid from "./products/productsGrid/ProductsGrid";
import {useEffect, useState} from "react";

export default function Main() {
    if (localStorage.getItem('productsPerPage') === null) {
        localStorage.setItem('productsPerPage', '12');
    }

    const [addedFilters, setAddedFilters] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(localStorage.getItem('productsPerPage'));
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = parseInt(urlParams.get('page'));
    const isPage = (!isNaN(pageParam) && pageParam >= 1);
    const currentPage = isPage ? pageParam : 1;
    // const numberOfProducts = useFetch(100000, 0, addedFilters).length;
    const numberOfProducts = 100;
    const products = useFetch(productsPerPage, currentPage, addedFilters);

    return (
        <main className="products-container">
            <Filters addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
            <section className="products">
                <ProductsInfo setProductsPerPage={setProductsPerPage} numberOfProducts={numberOfProducts}/>
                <ProductsGrid gridProducts={products} numberOfPages={Math.ceil(numberOfProducts / productsPerPage)}
                              currentPage={currentPage}/>
            </section>
        </main>
    );
}

function useFetch(productsPerPage, currentPage, addedFilters) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function init() {
            try {
                const urlToFetch = "https://dummyjson.com/products?limit=" + productsPerPage + "&skip=" + (currentPage - 1) * productsPerPage;
                const response = await fetch(urlToFetch);
                const json = await response.json();
                setData(json.products);
            } catch (e) {
                setData([]);
            }
        }

        async function getByCategories() {
            let loadedProducts = [];
            try {
                for (const filter of addedFilters) {
                    const urlToFetch = "https://dummyjson.com/products/category/" + filter;
                    const response = await fetch(urlToFetch);
                    const json = await response.json();
                    loadedProducts.push(...json.products);
                    console.log(loadedProducts);
                }
            } catch (e) {
                setData([]);
                loadedProducts = [];
            }
            setData(loadedProducts);
        }

        if (addedFilters.length === 0) {
            console.log("NU AICI");
            init();
        } else {
            console.log("AICI");
             getByCategories();
        }
    }, [productsPerPage, currentPage, addedFilters]);

    return data;
}