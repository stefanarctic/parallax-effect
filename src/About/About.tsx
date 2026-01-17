import React, { useRef, useEffect, useState } from "react";
import "./About.scss";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [contentProgress, setContentProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight * 0.7; // Trigger point
      
      // Check if section is in viewport
      if (rect.top < windowCenter && rect.bottom > 0) {
        setIsVisible(true);
        
        // Calculate progress: 0 to 1 based on scroll position
        const scrollProgress = Math.max(0, Math.min(1, (windowCenter - rect.top) / (windowHeight * 0.5)));
        
        // Ease function for smooth animation
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        
        setContentProgress(easeOut(scrollProgress));
        setImageProgress(easeOut(scrollProgress));
      } else if (rect.bottom < 0 || rect.top > windowHeight) {
        setIsVisible(false);
        setContentProgress(0);
        setImageProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text comes from left: translateX from -100px to 0, opacity from 0 to 1
  const contentStyle = {
    transform: `translateX(${(1 - contentProgress) * -100}px)`,
    opacity: contentProgress,
  };

  // Pizza comes from right: translateX from 100px to 0, opacity from 0 to 1
  const imageStyle = {
    transform: `translateX(${(1 - imageProgress) * 100}px)`,
    opacity: imageProgress,
  };

  return (
    <section className="about" ref={sectionRef}>
      <div className="about__container">
        <div className="about__grid">
          <div 
            className="about__content"
            style={contentStyle}
          >
            <span className="about__badge">Our Story</span>
            <h2 className="about__title">
              Crafting Perfect Pizzas Since 2010
            </h2>
            <p className="about__text">
              We started with a simple mission: to create the most delicious,
              authentic pizzas using only the finest ingredients. Every pizza
              is handcrafted by our expert chefs who bring years of experience
              and passion to every slice.
            </p>
            <p className="about__text">
              Our commitment to quality means we never compromise on freshness,
              flavor, or service. From our traditional recipes to our innovative
              new creations, every pizza tells a story of dedication and love.
            </p>
            <div className="about__stats">
              <div className="about__stat">
                <div className="about__stat-number">500K+</div>
                <div className="about__stat-label">Happy Customers</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">50+</div>
                <div className="about__stat-label">Pizza Varieties</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">14</div>
                <div className="about__stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="about__visual">
            <div 
              className="about__image-wrapper"
              style={imageStyle}
            >
              <img
                src="/pizza.png"
                alt="Pizza making"
                className="about__image"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

