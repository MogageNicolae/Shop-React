export default function ProductsCartItem({product}) {
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
                <div className="checkout-item-info-quantity">
                    <div className="checkout-item-info-quantity-decrease"><span>-</span></div>
                    <div className="checkout-item-info-quantity-value"><span>{product.quantity}</span></div>
                    <div className="checkout-item-info-quantity-increase"><span>+</span></div>
                </div>
                <div className="checkout-item-info-right-wrapper">
                    <div className="checkout-item-info-price-discount">${Math.floor(product.discountedPrice)}</div>
                    <div className="checkout-item-info-price">
                        <del>${product.price * product.quantity}</del>
                    </div>
                    <div className="checkout-item-info-delete"><span className="material-symbols-outlined">delete</span>
                    </div>
                </div>
            </div>
        </div>
    );
}