export default function OrderHistoryPageItem({product}) {
    return (
        <div className="checkout-item" data-id={product.id}>
            <div className="checkout-item-image">
                <img src={product.thumbnail} alt={product.title}/>
            </div>
            <div className="checkout-item-info">
                <div className="checkout-item-info-left-wrapper">
                    <div className="checkout-item-info-title">{product.title}</div>
                    <div className="checkout-item-info-description">{product.description}</div>
                </div>
                <div className="checkout-item-info-right-wrapper">
                    <div className="checkout-item-info-price">
                        ${Math.floor(product.price * (1 - product.discountPercentage / 100) * product.quantity)}
                    </div>
                </div>
            </div>
        </div>
    );
}