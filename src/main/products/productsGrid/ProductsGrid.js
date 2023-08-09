import Product from "../product/Product";
import {Link} from "react-router-dom";

export default function ProductsGrid({gridProducts, numberOfPages, currentPage, showNotification}) {
    const products = gridProducts.map((product) => {
        createCssClass('id' + product.id, product.images[0]);
        return (<Product key={product.id} product={product} showNotification={showNotification}/>);
    });

    return (<>
        <div className="products-grid">
            {products}
        </div>
        <div className="select-page-container">
            {generatePaginationLinks(currentPage, numberOfPages)}
        </div>
    </>);
}

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

function generatePaginationLinks(currentPage, numberOfPages) {
    const maxVisiblePages = 4;
    const links = [];

    if (currentPage > 1) {
        links.push(<Link  key="arrow-left" to={'/products/' + (currentPage - 1)}>
            <span className="material-symbols-outlined arrow-page"> keyboard_arrow_left </span></Link>)
    }

    if (numberOfPages <= maxVisiblePages) {
        for (let i = 1; i <= numberOfPages; i++) {
            if (i === currentPage) {
                links.push(<span key={i} className="current-page">{i}</span>);
            } else {
                links.push(<span key={i}><Link to={`/products/${i}`}>{i}</Link></span>);
            }
        }
    } else {
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(numberOfPages, startPage + maxVisiblePages - 1);

        if (startPage > 1) {
            links.push(<span key={1}><Link to="/products">1</Link></span>);
            if (startPage > 2) {
                links.push(<span key="dots-start" style={{color: "#999"}}>...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                links.push(<span key={i} className="current-page">{i}</span>);
            } else {
                links.push(<span key={i}><Link to={`/products/${i}`}>{i}</Link></span>);
            }
        }

        if (endPage < numberOfPages) {
            if (endPage < numberOfPages - 1) {
                links.push(<span key="dots-end" style={{color: "#999"}}>...</span>);
            }
            links.push(<span key={numberOfPages}><Link
                to={`/products/${numberOfPages}`}>{numberOfPages}</Link></span>);
        }
    }

    if (currentPage
        < numberOfPages) {
        links.push(<Link key="arrow-left" to={'/products/' + (currentPage + 1)}>
            <span  className="material-symbols-outlined arrow-page"> keyboard_arrow_right </span></Link>)
    }

    return links;
}