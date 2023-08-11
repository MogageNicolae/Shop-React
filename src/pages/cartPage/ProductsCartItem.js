import {useDispatch, useSelector} from "react-redux";
import {decrease, increase, setNewValue} from "../../redux/quantityChangeSlice";
import {useEffect, useState} from "react";
import {
    useRemoveProductFromCartMutation,
    useUpdateProductFromCartMutation
} from "../../API";


export default function ProductsCartItem({product, removeProduct}) {
    const quantity = useSelector((state) => state.quantityChange.value[product.id]);
    const [disabled, setDisabled] = useState(false);
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
                         onClick={async () => {
                             if(disabled) return;
                             disableButtons();
                             if (quantity === 1) {
                                 await removeProductFromCart(product.id).unwrap();
                                 removeProduct(product.id);
                             } else {
                                 await updateProductFromCart([product.id, -1]).unwrap();
                                 dispatch(decrease({id: product.id}));
                             }
                             activateButtons();
                         }}><span>-</span></div>
                    <div className="checkout-item-info-quantity-value"><span>{quantity}</span></div>
                    <div className="checkout-item-info-quantity-increase"
                         onClick={async () => {
                             if(disabled) return;
                             disableButtons();
                             await updateProductFromCart([product.id, 1]).unwrap();
                             dispatch(increase({id: product.id}))
                             activateButtons();
                         }}><span>+</span></div>
                </div>
                {(isLoadingUpdate || isLoadingRemove) && <div className="small-spinner spinner"></div>}
                <div className="checkout-item-info-right-wrapper">
                    <div className="checkout-item-info-price-discount">${Math.floor(product.discountedPrice)}</div>
                    <div className="checkout-item-info-price">
                        <del>${product.price * product.quantity}</del>
                    </div>
                    <div className="checkout-item-info-delete"
                         onClick={async () => {
                             if(disabled) return;
                             disableButtons();
                             await removeProductFromCart(product.id).unwrap();
                             removeProduct(product.id);
                             activateButtons();
                         }}><span className="material-symbols-outlined">delete</span>
                    </div>
                </div>
            </div>
        </div>
    );

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
