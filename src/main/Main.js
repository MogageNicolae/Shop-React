import "./Main.css";
import Filters from "./filters/Filters";
import ProductsInfo from "./products/productsInfo/ProductsInfo";
import ProductsGrid from "./products/productsGrid/ProductsGrid";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetNoOfProductsQuery, useGetProductsQuery} from "../API";

export default function Main({showNotification, searchText}) {
    if (localStorage.getItem('productsPerPage') === null) {
        localStorage.setItem('productsPerPage', '12');
    }
    let {page} = useParams();
    const [addedFilters, setAddedFilters] = useState([]),
        [productsPerPage, setProductsPerPage] = useState(localStorage.getItem('productsPerPage')),
        pageParam = parseInt(page),
        isPage = (!isNaN(pageParam) && pageParam >= 1),
        currentPage = isPage ? pageParam : 1,
        {
            data: numberOfProducts,
        } = useGetNoOfProductsQuery([addedFilters, searchText]),
        {
            data: products,
            isLoading,
            isFetching,
        } = useGetProductsQuery([productsPerPage, currentPage, addedFilters, searchText]);

    return (
        <main className="products-container">
            <Filters addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
            <section className="products">
                <ProductsInfo setProductsPerPage={setProductsPerPage} numberOfProducts={numberOfProducts}/>
                {
                    (isLoading || isFetching) ?
                        <div className="spinner center"></div> :
                        <ProductsGrid gridProducts={products}
                                      numberOfPages={Math.ceil(numberOfProducts / productsPerPage)}
                                      currentPage={currentPage} showNotification={showNotification}/>
                }
            </section>
        </main>
    );
}
