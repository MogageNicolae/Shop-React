import {useDispatch, useSelector} from "react-redux";
import {decrease, increase, setNewValue} from "../../redux/quantityChangeSlice";
import {useEffect, useState} from "react";
import {
    useRemoveProductFromCartMutation,
    useUpdateProductFromCartMutation
} from "../../API";
import {updateQuantityInCart} from "../../main/products/product/Product";


export default function ProductsCartItem({product, removeProduct, setTotalPrice}) {
    const quantity = useSelector((state) => state.quantityChange.value[product.id]);
    const [disabled, setDisabled] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(Math.floor(product.price * (1 - product.discountPercentage / 100)) * product.quantity);
    const [price, setPrice] = useState(product.price * product.quantity);
    const [updateProductFromCart, {isLoading: isLoadingUpdate}] = useUpdateProductFromCartMutation();
    const [removeProductFromCart, {isLoading: isLoadingRemove}] = useRemoveProductFromCartMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setNewValue({
            id: product.id,
            value: product.quantity
        }));
    }, []);

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
                    <div className="checkout-item-info-quantity-decrease"
                         onClick={decreaseQuantity}><span>-</span></div>
                    <div className="checkout-item-info-quantity-value"><span>{quantity}</span></div>
                    <div className="checkout-item-info-quantity-increase"
                         onClick={increaseQuantity}><span>+</span></div>
                </div>
                {(isLoadingUpdate || isLoadingRemove) && <div className="small-spinner spinner"></div>}
                <div className="checkout-item-info-right-wrapper">
                    {/*<div className="checkout-item-info-price-discount">${Math.floor(product.price * (1 - product.discountPercentage / 100)) * product.quantity}</div>*/}
                    <div className="checkout-item-info-price-discount">${Math.floor(discountedPrice)}</div>
                    <div className="checkout-item-info-price">
                        <del>${price}</del>
                    </div>
                    <div className="checkout-item-info-delete"
                         onClick={async () => {
                             if (disabled) return;
                             disableButtons();
                             removeProductFromCart([product.id, JSON.parse(localStorage.getItem('user'))]).unwrap().then(
                                 (cart) => {
                                     removeProduct(cart.products);
                                 });
                             updateQuantityInCart(-quantity);
                             setTotalPrice((prev) => prev - Math.floor(product.price * (1 - product.discountPercentage / 100)) * quantity);
                             activateButtons();
                         }}><span className="material-symbols-outlined">delete</span>
                    </div>
                </div>
            </div>
        </div>
    );

    async function decreaseQuantity() {
        if (disabled) return;
        disableButtons();
        if (quantity === 1) {
            removeProductFromCart([product.id, JSON.parse(localStorage.getItem('user'))]).unwrap().then(
                (cart) => {
                   removeProduct(cart.products);
                });
        } else {
            updateProductFromCart([product.id, quantity - 1, JSON.parse(localStorage.getItem('user'))]).unwrap()
                .then(dispatch(decrease({id: product.id})));
        }
        updateQuantityInCart(-1);
        setDiscountedPrice(Math.floor(product.price * (1 - product.discountPercentage / 100)) * (quantity - 1));
        setPrice(product.price * (quantity - 1));
        setTotalPrice((prev) => prev - Math.floor(product.price * (1 - product.discountPercentage / 100)));
        activateButtons();
    }

    async function increaseQuantity() {
        if (disabled) return;
        disableButtons();
        await updateProductFromCart([product.id, quantity + 1, JSON.parse(localStorage.getItem('user'))]).unwrap();
        dispatch(increase({id: product.id}))
        updateQuantityInCart(1);
        setDiscountedPrice(Math.floor(product.price * (1 - product.discountPercentage / 100)) * (quantity + 1));
        setPrice(product.price * (quantity + 1));
        setTotalPrice((prev) => prev + Math.floor(product.price * (1 - product.discountPercentage / 100)));
        activateButtons();
    }

    function disableButtons() {
        setDisabled(true);
        document.querySelector('.checkout-item-info-quantity-decrease').classList.add('disabled');
        document.querySelector('.checkout-item-info-quantity-increase').classList.add('disabled');
        document.querySelector('.checkout-item-info-delete').children[0].classList.add('disabled');
    }

    function activateButtons() {
        setDisabled(false);
        document.querySelector('.checkout-item-info-quantity-decrease').classList.remove('disabled');
        document.querySelector('.checkout-item-info-quantity-increase').classList.remove('disabled');
        document.querySelector('.checkout-item-info-delete').children[0].classList.remove('disabled');
    }
}
