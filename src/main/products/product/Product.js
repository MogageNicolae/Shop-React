export default function Product({product}) {
    return (
        <div className="product">
            <div className={"product-image id" + product.id} data-id={product.id}>
                <img src={product.images[product.images.length - 1]} alt={product.title}/>
            </div>
            <div className="product-info">
                <div className="product-info-left">
                    <div className="product-info-name">{product.title}</div>
                    <div className="product-info-price">$ {product.price}</div>
                </div>
                <div className="product-info-right">
                    <button className="button add-to-cart-button" data-id={product.id}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}