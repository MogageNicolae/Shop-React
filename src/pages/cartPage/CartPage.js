import NavBar from "../../navBar/NavBar";
import EmptyCart from "./EmptyCart";
import './CartPage.css';
import {useEffect, useState} from "react";
import ProductsCart from "./ProductsCart";
import {getCartAPI} from "../../API";

export default function CartPage() {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        init().then((res) => {
            setCart(res);
        });
    }, []);


    return (<div className="app">
        <NavBar/>
        <main className="checkout-container">
            {cart}
        </main>
        <footer></footer>
    </div>);
}

async function init() {
    let cart = await getCartAPI();

    if (cart.totalQuantity === 0) {
        return <EmptyCart/>;
    }

    return <ProductsCart cart={cart}/>;
}
