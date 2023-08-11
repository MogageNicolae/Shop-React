import {Link} from "react-router-dom";

export default function BoughtCart() {
    return (
        <div className="checkout-empty">
            <h1>Thank you for your purchase!</h1>
            <Link to="/products">Continue Shopping</Link>
        </div>
    );
}