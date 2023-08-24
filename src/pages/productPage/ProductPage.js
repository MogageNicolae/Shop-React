import NavBar from "../../navBar/NavBar";
import {useParams} from "react-router-dom";
import {useGetProductQuery} from "../../API";
import "./ProductPage.css";

let slideIndex;
let prevIndex;

export default function ProductPage({cartSize}) {
    const {productId} = useParams();
    const id = parseInt(productId);
    const {
        data: getProduct,
        isLoading,
    } = useGetProductQuery(id);

    slideIndex = 0;
    prevIndex = 0;

    console.log(getProduct);

    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <main className="product-container">
                <section className="product-info">
                    {isLoading ? <div className="spinner center"></div> : <>
                        <div className="product-image">
                            {getProduct.images.map((image, index) => {
                                return (
                                    <img key={index} className={(index === 0) ? "slide slide-active" : "slide"}
                                         src={image} alt="product"/>
                                );
                            })}
                            {getProduct.images.length > 1 && <>
                                <span className="prev" onClick={goToPrevSlide}>&lt;</span>
                                <span className="next" onClick={goToNextSlide}>&gt;</span>
                                <div className="slideshow-dots">
                                    {getProduct.images.map((image, index) => {
                                        return (<span key={index} className={(index === 0) ? "dot dot-active" : "dot"}
                                                      onClick={() => currentSlide(index)}></span>);
                                    })}
                                </div>
                            </>}
                        </div>
                        <div className="product-details">
                            <div className="product-name">{getProduct.title}</div>
                            <div className="product-price">$ {getProduct.price}</div>
                            <div className="product-description">{getProduct.description}</div>
                            <div className="product-quantity">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" id="quantity" name="quantity" min="1" max="5" defaultValue="1"/>
                            </div>
                            <div className="product-buttons">
                                <button className="button product-add-to-cart">Add to cart</button>
                                <button><span className="button material-symbols-outlined">favorite</span></button>
                            </div>
                        </div>
                    </>
                    }
                </section>
            </main>
            <footer></footer>
        </div>
    );
}

function goToPrevSlide() {
    plusSlides(-1);
}

function goToNextSlide() {
    plusSlides(1);
}


function plusSlides(n) {
    prevIndex = slideIndex;
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    prevIndex = slideIndex;
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length - 1) {
        slideIndex = 0;
        prevIndex = slides.length - 1;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
        prevIndex = 0;
    }

    if (prevIndex === 0 && slideIndex === slides.length - 1) {
        slides[slideIndex].className += " slide-in-right slide-active in";
        slides[prevIndex].className += " slide-out-right out";
    } else if (slideIndex === 0 && prevIndex === slides.length - 1) {
        slides[slideIndex].className += " slide-in-left slide-active out";
        slides[prevIndex].className += " slide-out-left in";
    } else if (prevIndex < slideIndex) {
        slides[slideIndex].className += " slide-in-left slide-active";
        slides[prevIndex].className += " slide-out-left";
    } else {
        slides[slideIndex].className += " slide-in-right slide-active";
        slides[prevIndex].className += " slide-out-right";
    }

    setTimeout(() => {
        try {
            slides[slideIndex].className = "slide slide-active";
            slides[prevIndex].className = "slide";
        } catch (e) {

        }
    }, 1000);

    dots[slideIndex].className += " dot-active";
    dots[prevIndex].className = dots[prevIndex].className.replace(" dot-active", "");
}