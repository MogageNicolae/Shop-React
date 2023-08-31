let slideIndex;
let prevIndex;

export default function ProductPageSlideshow({images}) {
    slideIndex = 0;
    prevIndex = 0;

    return (
        <div className="product-image">
            {images.map((image, index) => {
                return (
                    <img key={index} className={(index === 0) ? "slide slide-active" : "slide"}
                         src={image} alt="product"/>
                );
            })}
            {images.length > 1 && <>
                <span className="prev" onClick={goToPrevSlide}>&lt;</span>
                <span className="next" onClick={goToNextSlide}>&gt;</span>
                <div className="slideshow-dots">
                    {images.map((image, index) => {
                        return (<span key={index} className={(index === 0) ? "dot dot-active" : "dot"}
                                      onClick={() => currentSlide(index)}></span>);
                    })}
                </div>
            </>}
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
        slides[slideIndex].className = "slide slide-active";
        slides[prevIndex].className = "slide";
    }, 1000);

    dots[slideIndex].className += " dot-active";
    dots[prevIndex].className = dots[prevIndex].className.replace(" dot-active", "");
}