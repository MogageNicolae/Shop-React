export default function Control({value}) {
    return (
        <li key={value}>
            <span className="material-symbols-outlined">{value}</span>
            {value !== 'person' && <span className="quantity quantity-cart quantity-empty"></span>}
        </li>
    );
}