import ProductPageSlideshow from "../ProductPageSlideshow/ProductPageSlideshow";
import ProductPageDetails from "../ProductPageDetails/ProductPageDetails";
import {useGetProductQuery} from "../../../API";

export default function ProductPageInfo({productId}) {
    const {
        data: getProduct,
        isLoading,
    } = useGetProductQuery(productId);

    return (
        <section className="product-info">
            {isLoading ? <div className="spinner center"></div> : <>
                <ProductPageSlideshow images={getProduct.images}/>
                <ProductPageDetails product={getProduct}/>
            </>
            }
        </section>
    );
}