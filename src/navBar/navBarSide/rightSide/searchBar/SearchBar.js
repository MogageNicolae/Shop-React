import {debounce} from "lodash";
import {useLocation} from "react-router-dom";

export default function SearchBar({setSearchText}) {
    const location = useLocation();
    const focusSearch = (event) => {
        event.preventDefault();
        const searchInput = document.querySelector('.search-button').children[1];
        searchInput.focus();
    },
        searchProducts = (event) => {
            setSearchText(event.target.value);
        },
        throttledSearchProducts = debounce(searchProducts, 500)

    return (
        <button className={location.pathname.startsWith('/products') ? "button search-button active" : "button search-button"} onClick={focusSearch}>
            <span className="material-symbols-outlined">search</span>
            <input
                type="text"
                placeholder={"Search"}
                className={"search-input"}
                onChange={throttledSearchProducts}
                disabled={!location.pathname.startsWith('/products')}></input>
        </button>
    );
}

