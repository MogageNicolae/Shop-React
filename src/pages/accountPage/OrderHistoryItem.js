import {parseISO, format} from "date-fns";

export default function OrderHistoryItem({order}) {
    return (
        <div className="order-history-item">
            <div className="order-history-item-left">
                <div className="order-history-item-id">
                    <span>Order</span>
                    <span>{order._id}</span>
                </div>
                <div className="order-history-item-date">
                    <span>Date</span>
                    <span>{format(parseISO(order.date), "dd/MM/yyyy HH:mm")}</span>
                </div>
                <div className="order-history-item-total">
                    <span>Total</span>
                    <span>${Math.floor(order.cart.discountTotal)}</span>
                </div>
            </div>
            <div className="order-history-item-right">
                <a href={`/account/order/${order._id}`}>
                    Order Details
                </a>
            </div>
        </div>
    );
}