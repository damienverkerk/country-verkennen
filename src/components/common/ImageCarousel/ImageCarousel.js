import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading'; 
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => setLoading(false);
  }, [currentIndex, images]);

  const handlePrev = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleSwipeStart = (e) => {
    carouselRef.current.swipeStartX = e.touches[0].clientX;
  };

  const handleSwipeMove = (e) => {
    if (!carouselRef.current.swipeStartX) return;
    carouselRef.current.swipeEndX = e.touches[0].clientX;
  };

  const handleSwipeEnd = () => {
    if (!carouselRef.current.swipeStartX || !carouselRef.current.swipeEndX) return;
    const deltaX = carouselRef.current.swipeStartX - carouselRef.current.swipeEndX;
    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }
    carouselRef.current.swipeStartX = null;
    carouselRef.current.swipeEndX = null;
  };

  return (
    <div
      className="carousel"
      onTouchStart={handleSwipeStart}
      onTouchMove={handleSwipeMove}
      onTouchEnd={handleSwipeEnd}
      ref={carouselRef}
    >
      {loading && <Loading />}
      <img
        className={`carousel-image ${loading ? 'loading' : ''}`}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        key={images[currentIndex]}
        onLoad={() => setLoading(false)}
      />
      <div className="carousel-overlay left" onClick={handlePrev}>
        <span className="carousel-arrow">&#8249;</span>
      </div>
      <div className="carousel-overlay right" onClick={handleNext}>
        <span className="carousel-arrow">&#8250;</span>
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
