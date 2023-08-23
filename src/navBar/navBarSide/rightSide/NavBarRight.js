import SearchBar from "./searchBar/SearchBar";
import Control from "./controls/Control";
import {useEffect, useState} from "react";
import {useGetCartSizeQuery} from "../../../API";

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
        data: cartSizeData,
    } = useGetCartSizeQuery([JSON.parse(localStorage.getItem('user'))]);

    useEffect(() => {
        setCartSize(cartSizeData);
        if (cartSizeData > 0) {
            document.querySelector('.quantity-cart').classList.remove('quantity-empty');
        }
    }, [cartSizeData]);

    return cartSize;
}