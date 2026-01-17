import React, { useEffect, useState, useRef } from "react";
import "./Hero.scss";
import { useMouseParallax } from "./useMouseParallax.tsx";
import { useSmoothParallax } from "./useSmoothParallax.tsx";
import { useScrollParallax, useElementScrollParallax } from "./useScrollParallax.tsx";

const Hero = () => {
  const mouse = useMouseParallax();
  const smooth = useSmoothParallax(mouse);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  // Scroll parallax offsets for different elements
  const scrollOffset = useScrollParallax(0.3);
  const pizzaScrollOffset = useScrollParallax(0.5);
  const textScrollOffset = useScrollParallax(0.2);
  const backgroundScrollOffset = useScrollParallax(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const pizzaStyle = {
    transform: `
      translate(${smooth.current.x * 26}px, ${smooth.current.y * 26}px)
      rotateX(${smooth.current.y * -2}deg)
      rotateY(${smooth.current.x * 2}deg)
      translateY(${-pizzaScrollOffset * 0.5}px)
      translateX(${pizzaScrollOffset * 0.6}px)
    `,
  };

  const textStyle = {
    transform: `translate(${smooth.current.x * 8}px, ${smooth.current.y * 8 - textScrollOffset * 0.3}px)`,
  };

  const badgeStyle = {
    transform: `translate(${smooth.current.x * 4}px, ${smooth.current.y * 4 - textScrollOffset * 0.2}px)`,
  };

  const glowStyle = {
    transform: `translate(${smooth.current.x * 15}px, ${smooth.current.y * 15 - scrollOffset * 0.15}px)`,
  };

  const backgroundStyle = {
    transform: `translateY(${-backgroundScrollOffset * 0.3}px)`,
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__noise" style={backgroundStyle} />
      
      {/* Animated background gradients */}
      <div className="hero__gradient hero__gradient--1" style={backgroundStyle} />
      <div className="hero__gradient hero__gradient--2" style={{ transform: `translateY(${-backgroundScrollOffset * 0.2}px)` }} />
      <div className="hero__gradient hero__gradient--3" style={{ transform: `translateY(${-backgroundScrollOffset * 0.15}px)` }} />
      
      {/* Floating particles */}
      <div className="hero__particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero__particle hero__particle--${i + 1}`} />
        ))}
      </div>

      <div className="hero__container">
        <div className="hero__grid">
          <div className={`hero__content ${isLoaded ? 'hero__content--loaded' : ''}`} style={textStyle}>
            <span className={`hero__badge ${isLoaded ? 'hero__badge--loaded' : ''}`} style={badgeStyle}>
              <span className="hero__badge-icon">⚡</span>
              Fast Delivery
            </span>

            <h1 className={`hero__title ${isLoaded ? 'hero__title--loaded' : ''}`}>
              <span className="hero__title-line">Hot & Fresh</span>
              <span className="hero__title-line hero__title-line--highlight">Pizza Delivered</span>
            </h1>

            <p className={`hero__subtitle ${isLoaded ? 'hero__subtitle--loaded' : ''}`}>
              Crafted with premium ingredients and delivered straight to your
              door. No compromises.
            </p>

            <div className={`hero__cta-wrapper ${isLoaded ? 'hero__cta-wrapper--loaded' : ''}`}>
              <button className="hero__cta">
                <span>Order Now</span>
                <svg className="hero__cta-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="hero__cta-shadow" />
            </div>

            {/* Stats */}
            <div className={`hero__stats ${isLoaded ? 'hero__stats--loaded' : ''}`}>
              <div className="hero__stat">
                <div className="hero__stat-number">30min</div>
                <div className="hero__stat-label">Delivery</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">4.9★</div>
                <div className="hero__stat-label">Rating</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">500K+</div>
                <div className="hero__stat-label">Orders</div>
              </div>
            </div>
          </div>

          <div className={`hero__visual ${isLoaded ? 'hero__visual--loaded' : ''}`}>
            <div className="hero__visual-glow" style={glowStyle} />
            <div className="hero__visual-ring hero__visual-ring--1" />
            <div className="hero__visual-ring hero__visual-ring--2" />
            <div className="hero__pizza-wrapper">
              <img
                src="/pizza.png"
                alt="Pizza"
                className="hero__pizza"
                style={pizzaStyle}
                draggable={false}
              />
              <div className="hero__pizza-shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
