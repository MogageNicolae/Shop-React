import './UserInformationStage.css';
import {useState} from "react";
import BoughtCart from "../../BoughtCart";
import {useCreateOrderMutation} from "../../../API";

export default function UserInformationStage({totalPrice, setCartToShow}) {
    const [notification, setNotification] = useState(null),
        [country, setCountry] = useState(''),
        [city, setCity] = useState(''),
        [address, setAddress] = useState(''),
        [phone, setPhone] = useState(''),
        [createOrder] = useCreateOrderMutation(),
        placeOrder = async (event) => {
            event.preventDefault();

            if (country === '' ||
                city === '' ||
                address === '' ||
                phone === ''
            ) {
                showNotification("Fill all the fields.");
                return;
            }

            if(!/^\d+$/.test(phone) || /\d/.test(country) || /\d/.test(city)) {
                showNotification("Wrong fields.");
                return;
            }

            createOrder([JSON.parse(localStorage.getItem('user')), {
                country,
                city,
                address,
                phone,
            }]).unwrap().then(() => {
                setCartToShow(<BoughtCart/>);
                document.querySelector('.quantity-cart').classList.add('quantity-empty');
            });
        }

    function Notification({errorMessage}) {
        return (
            <div className="notification">
                {errorMessage}
            </div>
        );
    }

    function showNotification(errorMessage) {
        setNotification(<Notification errorMessage={errorMessage}/>);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    return (
        <section className="checkout">
            {notification}
            <div className="checkout-header">
                <h1>User Information</h1>
            </div>
            <form onSubmit={placeOrder}>
                <div className="checkout-body-grid">
                    <div className="checkout-form">
                        <div className="checkout-form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" name="firstName"
                                   onChange={(e) => setCountry(e.target.value.trim())}/>
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="firstName"
                                   onChange={(e) => setCity(e.target.value.trim())}/>
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="firstName"
                                   onChange={(e) => setAddress(e.target.value.trim())}/>
                        </div>
                        <div className="checkout-form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="firstName"
                                   onChange={(e) => setPhone(e.target.value.trim())}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="checkout-summary">
                        <div>Total Price</div>
                        <div>${Math.floor(totalPrice)}</div>
                    </div>
                    <div className="checkout-notice">
                        By sending the order, you agree with the Terms & Conditions and Notice to the Buyer.
                    </div>
                </div>
                <div className="checkout-actions">
                    <a href="/order/1" className="checkout-actions-child checkout-actions-back">
                        <span className="arrow-left material-symbols-outlined">arrow_back</span>
                        <span>Cart</span></a>
                    <button type={"submit"} className="button-place-order checkout-actions-child checkout-actions-next">
                        <span>Place Order</span>
                        <span className="arrow-right material-symbols-outlined">arrow_forward</span></button>
                </div>
            </form>
        </section>
    );
}
