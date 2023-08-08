import Product from "../product/Product";

export default function ProductsGrid({gridProducts, numberOfPages, currentPage}) {
    const products = gridProducts.map((product) => {
        createCssClass('id' + product.id, product.images[0]);
        return (<Product key={product.id} product={product}/>);
    });

    const generatePaginationLinks = (currentPage, numberOfPages) => {
        const maxVisiblePages = 4;
        const links = [];

        if (numberOfPages <= maxVisiblePages) {
            for (let i = 1; i <= numberOfPages; i++) {
                if (i === currentPage) {
                    links.push(<span key={i} className="current-page">{i}</span>);
                } else {
                    links.push(<span key={i}><a href={`index.html?page=${i}`}>{i}</a></span>);
                }
            }
        } else {
            const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const endPage = Math.min(numberOfPages, startPage + maxVisiblePages - 1);

            if (currentPage > 1) {
                links.push(<span key="arrow-left" className="material-symbols-outlined arrow-page"
                                 onClick={() => goToNextPage(currentPage - 1)}> keyboard_arrow_left < /span>)
            }

            if (startPage > 1) {
                links.push(<span key={1}><a href="index.html">1</a></span>);
                if (startPage > 2) {
                    links.push(<span key="dots-start" style={{color: "#999"}}>...</span>);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                if (i === currentPage) {
                    links.push(<span key={i} className="current-page">{i}</span>);
                } else {
                    links.push(<span key={i}><a href={`index.html?page=${i}`}>{i}</a></span>);
                }
            }

            if (endPage < numberOfPages) {
                if (endPage < numberOfPages - 1) {
                    links.push(<span key="dots-end" style={{color: "#999"}}>...</span>);
                }
                links.push(<span key={numberOfPages}><a
                    href={`index.html?page=${numberOfPages}`}>{numberOfPages}</a></span>);
            }

            if (currentPage < numberOfPages) {
                links.push(<span key="arrow-right" className="material-symbols-outlined arrow-page"
                                 onClick={() => goToNextPage(currentPage + 1)}>keyboard_arrow_right</span>)
            }
        }

        return links;
    };


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


function goToNextPage(nextPage) {
    window.location.href = "index.html?page=" + nextPage;
}