import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import "./ProductPageReviewAdd.css";
import {useState} from "react";
import {useAddReviewMutation} from "../../../../API";

export default function ProductPageReviewAdd({productId, refetch}) {
    const [activeStars, setActiveStars] = useState([false, false, false, false, false]),
        [addReview] = useAddReviewMutation(),
        handleAddReview = (e) => {
            e.preventDefault();
            if (activeStars.filter((isActive) => isActive).length === 0) {
                return alert('Please, rate the product');
            }
            if (e.target['product-review-add-form-title'].value === '') {
                return alert('Please, enter the title');
            }
            if (e.target['product-review-add-form-content'].value === '') {
                return alert('Please, enter the content');
            }
            const title = e.target['product-review-add-form-title'].value,
                content = e.target['product-review-add-form-content'].value,
                rating = activeStars.filter((isActive) => isActive).length;
            addReview([JSON.parse(localStorage.getItem('user')), productId, {title, content, rating}]);
            e.target['product-review-add-form-title'].value = '';
            e.target['product-review-add-form-content'].value = '';
            setActiveStars([false, false, false, false, false]);
        },
        handleStarClick = (index) => {
            const newActiveStars = activeStars.map((star, i) => i >= index);
            setActiveStars(newActiveStars);
        };


    return (
        <div className="product-review-add">
            <div className="product-reviews-title">Add a review</div>
            <form className="product-review-add-form" onSubmit={handleAddReview}>
                <div className="product-review-add-left">
                    <div className="product-review-add-form-rating">
                        <div className="product-review-add-form-rating-stars">
                            {activeStars.map((isActive, index) => (
                                <FontAwesomeIcon
                                    key={index}
                                    icon={solid("star")}
                                    className={`product-review-add-form-rating-star ${isActive ? 'product-review-add-form-rating-star-active' : ''}`}
                                    onClick={() => handleStarClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-review-add-form-title">
                        <input className="product-review-add-form-title-input"
                               type="text"
                               id="product-review-add-form-title"
                               name="product-review-add-form-title"
                               placeholder="Title"
                        />
                    </div>
                    <div className="product-review-add-form-submit">
                        <button className="button product-review-add-form-submit-button" type="submit">Add a review
                        </button>
                    </div>
                </div>
                <div className="product-review-add-form-content">
                    <label className="product-review-add-form-content-title"
                           htmlFor="product-review-add-form-content">Content</label>
                    <textarea className="product-review-add-form-content-text"
                              id="product-review-add-form-content"
                              name="product-review-add-form-content"></textarea>
                </div>
            </form>
        </div>
    );
}