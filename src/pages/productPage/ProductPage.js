import NavBar from "../../navBar/NavBar";
import {useParams} from "react-router-dom";
import "./ProductPage.css";
import ProductPageInfo from "./ProductPageInfo/ProductPageInfo";
import ProductPageReviews from "./ProductPageReviews/ProductPageReviews";


export default function ProductPage({cartSize}) {
    const {productId} = useParams(),
        id = parseInt(productId);

    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <main className="product-container">
                <ProductPageInfo productId={id}/>
                <ProductPageReviews productId={id}/>
            </main>
            <footer></footer>
        </div>
    );
}
