import {useState} from "react";

export default function ProductsInfo({numberOfProducts, setProductsPerPage}) {
    const [defaultValue, setDefaultValue] = useState(localStorage.getItem("productsPerPage"));

    function handleProductsPerPageChange(event) {
        setProductsPerPage(event.target.value);
        setDefaultValue(event.target.value);
        localStorage.setItem("productsPerPage", event.target.value);
    }

    return (
        <div className="products-info">
            <span id="no-of-products">Products: {numberOfProducts}</span>
            <div>
                <select defaultValue={defaultValue} onChange={handleProductsPerPageChange}
                        className="products-per-page">
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                </select>
                <span>Sort By</span>
            </div>
        </div>
    );
}