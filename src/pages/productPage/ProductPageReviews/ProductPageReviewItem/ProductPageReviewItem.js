import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {format, parseISO} from "date-fns";

export default function ProductPageReviewItem({review}) {
    const fullStars = [],
        emptyStars = [];

    for (let i = 0; i < review.review.rating; i++) {
        fullStars.push(<FontAwesomeIcon key={i} icon={solid("star")} style={{color: "#ff0",}} />);
    }
    for (let i = 0; i < 5 - review.review.rating; i++) {
        emptyStars.push(<FontAwesomeIcon key={i} icon={solid("star")} style={{color: "#c8c8c8",}} />);
    }

    return (
        <div className="product-review">
            <div className="product-review-left">
                <div className="product-review-author-name">{review.userName}</div>
                <div className="product-review-date">{format(parseISO(review.review.date), "dd/MM/yyyy HH:mm")}</div>
            </div>
            <div className="product-review-right">
                <div className="product-review-title">{review.review.title}</div>
                <div className="product-review-rating">
                    {fullStars}
                    {emptyStars}
                </div>
                <div className="product-review-content">{review.review.description}</div>
            </div>
        </div>
    );
}