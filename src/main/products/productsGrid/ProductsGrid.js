import Product from "../product/Product";

function createCssClass(className, urlSimple) {
    let style = document.createElement('style');
    style.textContent = 'style';
    style.innerHTML = `
    .product .${className} {
        background-image: url(${urlSimple});
        background-size: cover;
        margin: 0;
        padding: 0;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
}

export default function ProductsGrid({gridProducts}) {
    const products = gridProducts.map((product) => {
        createCssClass('id' + product.id, product.images[0]);
        return (<Product key={product.id} product={product}/>);
    });
    return (
        <>
            <div className="products-grid">
                {products}
            </div>
            <div className="button load-more-button hidden">
                Load More
            </div>
        </>
    );
}