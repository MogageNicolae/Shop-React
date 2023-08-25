import NavBar from "../../navBar/NavBar";
import {useParams} from "react-router-dom";
import {useGetOrderQuery} from "../../API";
import OrderHistoryPageItem from "./OrderHistoryPageItem";

export default function OrderHistoryPage({cartSize}) {
    let {id} = useParams();
    const {
        data: order,
        isLoading,
        isFetching,
        isError,
    } = useGetOrderQuery([id, JSON.parse(localStorage.getItem('user'))]);

    if (isLoading || isFetching) {
        return (
            <div className="app">
                <NavBar cartSize={cartSize}/>
                <main className="main-container">
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </main>
            </div>
        );
    }

    const orderHistoryPageItems = order.cart.products.map((product) => {
        return (<OrderHistoryPageItem key={product.id} product={product}/>);
    });

    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <main className="main-container">
                <section className="checkout">
                    <div className="checkout-header">
                        <h2>Order {order._id}</h2>
                    </div>
                    <div className="checkout-items">
                        {orderHistoryPageItems}
                    </div>
                    <hr/>
                    <div className="checkout-summary">
                        <div>Total Price</div>
                        <div>${Math.floor(order.cart.discountTotal)}</div>
                    </div>
                    <div className="checkout-actions">
                        <a href="/account" className="checkout-actions-child checkout-actions-back">
                            <span className="arrow-left material-symbols-outlined">arrow_back</span>
                            <span>Back to orders</span></a>
                    </div>
                </section>
            </main>
        </div>
    );
}