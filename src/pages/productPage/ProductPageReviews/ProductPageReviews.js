import ProductPageReviewItem from "./ProductPageReviewItem/ProductPageReviewItem";
import "./ProductPageReviews.css";
import {useAddReviewMutation, useGetReviewsByProductQuery} from "../../../API";
import ProductPageReviewAdd from "./ProductPageReviewAdd/ProductPageReviewAdd";

export default function ProductPageReviews({productId}) {
    const {
        data: reviews,
        isLoading,
        isFetching,
    } = useGetReviewsByProductQuery([productId]);

    return (
        <section className="product-reviews">
            <div className="product-reviews-list">
                {!(isLoading || isFetching) &&
                    <>
                        <ProductPageReviewAdd productId={productId}/>
                        <div className="product-reviews-title">Reviews({reviews.length})</div>
                        {reviews.map((review) => {
                            return <ProductPageReviewItem key={review.review._id} review={review}/>
                        })}

                    </>}
            </div>
        </section>
    );
}