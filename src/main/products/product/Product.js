import {Link} from "react-router-dom";
import {getProductAfterId, useAddProductToCartMutation} from "../../../API";

export default function Product({product, showNotification}) {
    const [addProductToCart] = useAddProductToCartMutation();

    async function handleAddProductToCart(event) {
        if (localStorage.getItem('user') === null) {
            window.location.href = "/login";
            return;
        }

        event.target.textContent = "Adding...";
        event.target.disabled = true;
        await updateCart(event.target.dataset.id, addProductToCart);
        event.target.textContent = "Add to cart";
        event.target.disabled = false;
        showNotification();
    }

    return (
        <div className="product">
            <div className={"product-image id" + product.id} data-id={product.id}>
                <Link to={"/product-page/" + product.id}><img src={product.images[product.images.length - 1]}
                                                              alt={product.title}/></Link>
            </div>
            <div className="product-info">
                <div className="product-info-left">
                    <div className="product-info-name">{product.title}</div>
                    <div className="product-info-price">$ {product.price}</div>
                </div>
                <div className="product-info-right">
                    <button className="button add-to-cart-button" data-id={product.id}
                            onClick={handleAddProductToCart}>Add to cart
                    </button>
                </div>
            </div>
        </div>);
}

async function updateCart(productId, addProductToCart) {
    try {
        // let product = await getProductAfterId(productId);
        // product.quantity = 1;
        await addProductToCart([productId, JSON.parse(localStorage.getItem('user'))]).unwrap();
    } catch (e) {
        console.log(e);
    }

    updateQuantityInCart(1);
}

export function updateQuantityInCart(quantityToAdd) {
    if (document.querySelector('.quantity-cart').innerHTML === '0') {
        document.querySelector('.quantity-cart').classList.remove('quantity-empty');
    }
    document.querySelector('.quantity-cart').innerHTML = Number(document.querySelector('.quantity-cart').innerHTML) + quantityToAdd;
    if (document.querySelector('.quantity-cart').innerHTML === '0') {
        document.querySelector('.quantity-cart').classList.add('quantity-empty');
    }
}
