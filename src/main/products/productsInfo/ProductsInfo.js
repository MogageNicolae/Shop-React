export default function ProductsInfo({numberOfProducts}) {
    return (
        <div className="products-info">
            <span id="no-of-products">Products: {numberOfProducts}</span>
            <div>Sort By</div>
        </div>
    );
}