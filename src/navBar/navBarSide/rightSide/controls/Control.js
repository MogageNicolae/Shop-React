import {Link} from "react-router-dom";

export default function Control({value, linkToValue, size}) {
    return (
        <li key={value}>
            <a href={linkToValue} >
                <span className="material-symbols-outlined">{value}</span>
                {value === 'shopping_bag' && <span className="quantity quantity-cart quantity-empty">{size}</span>}
            </a>
        </li>
    );
}
