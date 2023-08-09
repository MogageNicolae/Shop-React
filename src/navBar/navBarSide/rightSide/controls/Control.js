import {Link} from "react-router-dom";
import {getCartAPI} from "../../../../API";
import {useEffect, useState} from "react";

export default function Control({value, linkToValue}) {
    // const size = useCartSize();
    // console.log(size);

    return (
        <li key={value}>
            <Link to={linkToValue}>
                <span className="material-symbols-outlined">{value}</span>
                {value === 'shopping_bag' && <span className="quantity quantity-cart quantity-empty">{0}</span>}
            </Link>
        </li>
    );
}

function useCartSize() {
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        getCartAPI().then((res) => {
            setCartSize(res.totalQuantity);
            if (res.totalQuantity > 0) {
                document.querySelector('.quantity-cart').classList.remove('quantity-empty');
            }
        });
    }, []);

    return cartSize;
}