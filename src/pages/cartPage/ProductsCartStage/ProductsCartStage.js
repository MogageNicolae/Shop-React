import ProductsCartItem from "./ProductsCartItem";
import {useState} from "react";
import EmptyCart from "../EmptyCart";


export default function ProductsCartStage({cart, setCartToShow}) {
    const [totalPrice, setTotalPrice] = useState(cart.discountTotal);
    const products = cart.products.map((product) => {
        return <ProductsCartItem key={product.id} product={product} removeProduct={removeProductFromCart}
                                 setTotalPrice={setTotalPrice}/>;
    });
    const [checkoutProducts, setCheckoutProducts] = useState(products);

    function removeProductFromCart(products) {
        const newProducts = products.map((product) => {
                return <ProductsCartItem key={product.id} product={product} removeProduct={removeProductFromCart}
                                         setTotalPrice={setTotalPrice}/>;
        });
        setCheckoutProducts(newProducts);
        if (newProducts.length === 0) {
            setCartToShow(<EmptyCart/>);
        }
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
                    <div>${Math.floor(totalPrice)}</div>
                </div>
            </div>
            <div className="checkout-actions">
                <a href="/products" className="checkout-actions-child checkout-actions-back">
                    <span className="arrow-left material-symbols-outlined">arrow_back</span>
                    <span>Continue Shopping</span></a>
                <a href="/order/2" className="checkout-actions-child checkout-actions-next">
                    <span>User Information</span>
                    <span className="arrow-right material-symbols-outlined">arrow_forward</span></a>
            </div>
        </section>
    );
}
