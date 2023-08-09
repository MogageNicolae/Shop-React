import {Link} from "react-router-dom";
import ProductsCartItem from "./ProductsCartItem";

export default function ProductsCart({cart}) {
    const checkoutProducts = cart.products.map((product) => {
        return <ProductsCartItem product={product} />;
    });

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
                <button type="button" className="checkout-actions-buy">Buy items</button>
            </div>
        </section>
    );
}
