import "./Main.css";
import Filters from "./filters/Filters";
import ProductsInfo from "./products/productsInfo/ProductsInfo";
import ProductsGrid from "./products/productsGrid/ProductsGrid";

export default function Main({gridProducts}) {
    return (
        <main className="products-container">
            <Filters/>
            <section className="products">
                <ProductsInfo/>
                <ProductsGrid gridProducts={gridProducts}/>
            </section>
        </main>
    );
}