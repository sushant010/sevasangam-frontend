import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const testimonials = [
  {
    name: 'Devotee Anonymous',
    message:
      "SevaSangam has truly transformed my spiritual journey. Being able to make donations to my favorite temples with just a few clicks has made it so much more convenient for me. I feel connected to my faith in a whole new way, thanks to SevaSangam!",
  },
  {
    name: 'Temple Administrator Anonymous',
    message:
      "As a temple administrator, I can't thank SevaSangam enough for the support they provide. Their platform has helped us streamline our donation process and increase transparency. With SevaSangam, we can focus more on serving our community and less on administrative tasks.",
  },
  // Add more testimonials here...
];

function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 3; // Number of cards to show per slide

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide + slidesPerPage < testimonials.length ? prevSlide + slidesPerPage : 0
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - slidesPerPage + testimonials.length) % testimonials.length);
  };

  const totalSlides = Math.ceil(testimonials.length / slidesPerPage);

  return (
    <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`carousel-item ${slideIndex === currentSlide / slidesPerPage ? 'active' : ''}`}
          >
            <div className="row">
              {testimonials.slice(slideIndex * slidesPerPage, (slideIndex + 1) * slidesPerPage).map(
                (testimonial, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card h-100 text-center">
                      <div className="card-body">
                        <p className="h5">{testimonial.name}</p>
                        <p className="lead">{testimonial.message}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default TestimonialCarousel;