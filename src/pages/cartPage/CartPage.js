import NavBar from "../../navBar/NavBar";
import EmptyCart from "./EmptyCart";
import './CartPage.css';
import {useEffect, useState} from "react";
import ProductsCart from "./ProductsCart";
import {useGetCartQuery} from "../../API";

export default function CartPage() {
    const [cartToShow, setCartToShow] = useState(null);
    const {
        data: cart,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCartQuery();

    useEffect(() => {
        if (cart) {
            if (cart.totalQuantity === 0) {
                setCartToShow(<EmptyCart/>);
            } else {
                setCartToShow(<ProductsCart cart={cart} setCartToShow={setCartToShow}/>);
            }
        }
    }, [cart]);

    if (isLoading || isFetching) {
        return (
            <div className="app">
                <NavBar/>
                <main className="checkout-container">
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </main>
            </div>
        );
    }

    if (isError) {
        console.log({error});
        return (
            <div className="app">
                <NavBar/>
                <main className="checkout-container">
                    error.status: {error.status}
                </main>
                <footer></footer>
            </div>
        );
    }

    return (
        <div className="app">
            <NavBar/>
            <main className="checkout-container">
                {cartToShow}
            </main>
            <footer></footer>
        </div>
    );
}
