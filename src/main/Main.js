import "./Main.css";
import Filters from "./filters/Filters";
import ProductsInfo from "./products/productsInfo/ProductsInfo";
import ProductsGrid from "./products/productsGrid/ProductsGrid";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {productsApi, useGetProductsQuery} from "../API";

export default function Main({showNotification}) {
    if (localStorage.getItem('productsPerPage') === null) {
        localStorage.setItem('productsPerPage', '12');
    }

    const [addedFilters, setAddedFilters] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(localStorage.getItem('productsPerPage'));
    let {page} = useParams();
    const pageParam = parseInt(page);
    const isPage = (!isNaN(pageParam) && pageParam >= 1);
    const currentPage = isPage ? pageParam : 1;
    const numberOfProducts = useFetch(100000, 1, addedFilters).length;
    const {
        data: products,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetProductsQuery([productsPerPage, currentPage]);

    return (
        <main className="products-container">
            <Filters addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
            <section className="products">
                <ProductsInfo setProductsPerPage={setProductsPerPage} numberOfProducts={numberOfProducts}/>
                {
                    (isLoading || isFetching) ?
                        <div className="spinner center"></div> :
                        <ProductsGrid gridProducts={products.products}
                                      numberOfPages={Math.ceil(numberOfProducts / productsPerPage)}
                                      currentPage={currentPage} showNotification={showNotification}/>
                }
            </section>
        </main>
    );
}

export function useFetch(productsPerPage, currentPage, addedFilters) {
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
            let categoryProducts = [];
            let loadedProducts = [];
            try {
                for (const filter of addedFilters) {
                    const urlToFetch = "https://dummyjson.com/products/category/" + filter;
                    const response = await fetch(urlToFetch);
                    const json = await response.json();
                    categoryProducts.push(...json.products);
                }
            } catch (e) {
                setData([]);
                categoryProducts = [];
            }
            if (productsPerPage === 100000) {
                setData(categoryProducts);
                return;
            }

            for (let index = (currentPage - 1) * productsPerPage; index < currentPage * productsPerPage; index++) {
                if (index >= categoryProducts.length) {
                    break;
                }
                loadedProducts.push(categoryProducts[index]);
            }
            setData(loadedProducts);
        }

        if (addedFilters.length === 0) {
            init();
        } else {
            getByCategories();
        }
    }, [productsPerPage, currentPage, addedFilters]);

    return data;
}