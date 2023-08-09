import {Link} from "react-router-dom";

export default function EmptyCart() {
    return (
        <div className="checkout-empty">
            <h1>Your cart is empty</h1>
            <Link to="/products">Continue Shopping</Link>
        </div>
    );
}