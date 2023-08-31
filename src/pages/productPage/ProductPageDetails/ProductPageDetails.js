export default function ProductPageDetails({product}) {
    return (
        <div className="product-details">
            <div className="product-name">{product.title}</div>
            <div className="product-price">
                <del>${product.price}</del>
                &nbsp;
                ${Math.floor(product.price * (1 - product.discountPercentage / 100))}
            </div>
            <div className="product-description">{product.description}</div>
            <div className="product-actions">
                <label htmlFor="quantity" className="quantity">Quantity: </label>
                <input type="number" id="quantity" name="quantity" min="1" max="5"
                       defaultValue="1" className="quantity-input"/>
                <button className="button product-add-to-cart">Add to cart</button>
                <button className="button product-add-to-favorite"><span className="material-symbols-outlined">favorite</span></button>
            </div>
        </div>  
    );
}