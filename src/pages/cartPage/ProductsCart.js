import {Link} from "react-router-dom";
import ProductsCartItem from "./ProductsCartItem";
import BoughtCart from "./BoughtCart";
import {useEffect, useState} from "react";
import EmptyCart from "./EmptyCart";


export default function ProductsCart({cart, setCartToShow}) {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const products = cart.products.map((product) => {
        return <ProductsCartItem key={product.id} product={product} removeProduct={removeProductFromCart}/>;
    });
    useEffect(() => {
        setCheckoutProducts(products);
    }, []);

    function removeProductFromCart(productId) {
        const newProducts = checkoutProducts.filter((product) => product.key !== productId);
        setCheckoutProducts(newProducts);
        if (newProducts.length === 0) {
            setCartToShow(<EmptyCart/>);
        }
    }

    function handleBuy() {
        setCartToShow(<BoughtCart/>)
    }

    return (
        <section className="checkout">
            <div className="checkout-header">
                <h1>Your Cart</h1>
            </div>
            <div className="checkout-body-grid">
                <div className="checkout-items">
                    {checkoutProducts}
                </div>
                <hr/>
                <div className="checkout-summary">
                    <div>Total Price</div>
                    <div>${Math.floor(cart.discountTotal)}</div>
                </div>
            </div>
            <div className="checkout-actions">
                <Link to="/products" className="checkout-actions-back">Continue Shopping</Link>
                <button type="button" className="checkout-actions-buy" onClick={handleBuy}>Buy items</button>
            </div>
        </section>
    );
}
