import SearchBar from "./searchBar/SearchBar";
import Control from "./controls/Control";
import {useEffect, useState} from "react";
import {useGetCartQuery} from "../../../API";

export default function NavBarRight() {
    const size = useCartSize();

    return (
        <div className="nav-bar-menu-right">
            <ul>
                <Control value='person' linkToValue='/account'/>
                <Control value='favorite' linkToValue='/'/>
                <Control value='shopping_bag' linkToValue='/cart' size={size}/>
            </ul>
            <SearchBar/>
        </div>
    );
}

function useCartSize() {
    const [cartSize, setCartSize] = useState(0);
    const {
        data: cart,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCartQuery();

    useEffect(() => {
        if (cart) {
            setCartSize(cart.totalQuantity);
            if (cart.totalQuantity > 0) {
                document.querySelector('.quantity-cart').classList.remove('quantity-empty');
            }
        }

    }, [cart]);

    return cartSize;
}