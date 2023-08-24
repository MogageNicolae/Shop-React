import {throttle} from "lodash";

export default function SearchBar() {
    const focusSearch = (event) => {
        event.preventDefault();
        const searchInput = document.querySelector('.search-button').children[1];
        searchInput.focus();
    },
        searchProducts = (event) => {
            const searchInput = event.target,
                searchInputValue = searchInput.value.toLowerCase(),
                products = document.querySelectorAll('.product'),
                productsInfo = document.querySelectorAll('.product-info-name');
            products.forEach((product) => {
                if (product.classList.contains('hidden')) {
                    product.classList.remove('hidden');
                }
            });
            productsInfo.forEach((productInfo) => {
                if (!productInfo.innerHTML.toLowerCase().includes(searchInputValue)) {
                    productInfo.parentElement.parentElement.classList.add('hidden');
                }
            });
        },
        throttledSearchProducts = throttle(searchProducts, 1000);

    return (
        <button className="button search-button" onClick={focusSearch}>
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder={"Search"} className={"search-input"} onChange={throttledSearchProducts}></input>
        </button>
    );
}

