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
    } = useGetCartQuery([JSON.parse(localStorage.getItem('user'))]);

    useEffect(() => {
        if (cart === null || cart === undefined) {
            setCartToShow(<EmptyCart/>);
            // if (cart.quantity === 0) {
            //     setCartToShow(<EmptyCart/>);
            // } else {
            //     setCartToShow(<ProductsCart cart={cart} setCartToShow={setCartToShow}/>);
            // }
        } else {
            setCartToShow(<ProductsCart key="productCart" cart={cart} setCartToShow={setCartToShow}/>);
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
