import React, { useEffect, useState, useRef } from "react";
import "./Features.scss";
import { useScrollParallax } from "../Hero/useScrollParallax.tsx";

const Features = () => {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your pizza delivered in 30 minutes or less, guaranteed fresh and hot.",
    },
    {
      icon: "🍕",
      title: "Premium Ingredients",
      description: "Only the finest, freshest ingredients sourced from trusted local suppliers.",
    },
    {
      icon: "🔥",
      title: "Hot & Fresh",
      description: "Every pizza is baked to order and delivered at the perfect temperature.",
    },
    {
      icon: "⭐",
      title: "5-Star Rated",
      description: "Join thousands of satisfied customers who love our delicious pizzas.",
    },
    {
      icon: "💳",
      title: "Easy Payment",
      description: "Multiple payment options available - cash, card, or digital wallets for your convenience.",
    },
    {
      icon: "🌍",
      title: "Wide Coverage",
      description: "We deliver to neighborhoods across the city, bringing pizza closer to you.",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const [cardStates, setCardStates] = useState<Array<{ 
    x: number; 
    y: number; 
    opacity: number;
    scale: number;
  }>>(
    features.map(() => ({ x: 0, y: 0, opacity: 0, scale: 0.9 }))
  );
  const [headerState, setHeaderState] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Header parallax
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const headerTop = headerRect.top;
        
        // Start animation later - when header is closer to viewport
        const fadeStartDistance = windowHeight + 300; // Start fade when header is 300px below viewport
        const fadeEndDistance = windowHeight - 200; // Full opacity when header is 200px into viewport
        
        let opacity = 0;
        if (headerTop <= fadeEndDistance) {
          opacity = 1; // Full opacity when header is well in viewport
        } else if (headerTop <= fadeStartDistance) {
          // Header is between fadeStartDistance (below) and fadeEndDistance (in viewport)
          // As headerTop decreases (header moves up), opacity should increase from 0 to 1
          const distance = fadeStartDistance - headerTop; // Distance from start (decreases as header moves up)
          const fadeRange = fadeStartDistance - fadeEndDistance;
          opacity = distance / fadeRange; // Fade from 0 to 1 as header moves up
        } else {
          opacity = 0; // Header is below fadeStartDistance - invisible
        }
        
        // Parallax movement - start later
        const movementStart = windowHeight - 100;
        const movementProgress = headerTop <= movementStart ? 1 : Math.max(0, (windowHeight - headerTop) / (windowHeight - movementStart));
        
        setHeaderState({
          y: -movementProgress * 40,
          opacity: Math.max(0, Math.min(1, opacity))
        });
      }
      
      // Calculate creative parallax for each card
      const states = cardRefs.current.map((cardRef, index) => {
        if (!cardRef || !sectionRef.current) {
          return { x: 0, y: 0, opacity: 0, scale: 0.9 };
        }

        const rect = cardRef.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const cardTop = rect.top;
        const cardCenter = rect.top + rect.height / 2;
        const cardLeft = rect.left;
        const cardWidth = rect.width;
        const sectionLeft = sectionRect.left;
        const sectionWidth = sectionRect.width;
        
        // Calculate position relative to container
        const relativeLeft = cardLeft - sectionLeft;
        const cardCenterX = relativeLeft + cardWidth / 2;
        const relativePosition = cardCenterX / sectionWidth; // 0 to 1
        
        // Opacity based on viewport position - start later, reach full opacity later
        const fadeStartDistance = windowHeight + 200; // Start fade later
        const fadeEndDistance = windowHeight - 200; // Reach full opacity later, when card is more in viewport
        
        let opacity = 0;
        if (cardTop <= fadeEndDistance) {
          opacity = 1; // Full opacity when card is in grid
        } else if (cardTop <= fadeStartDistance) {
          const distance = cardTop - fadeEndDistance;
          const fadeRange = fadeStartDistance - fadeEndDistance;
          opacity = 1 - (distance / fadeRange);
        }
        
        // Calculate movement animation - start much later when card is already visible
        // Start movement when card is very close to viewport (when opacity is already visible)
        // Complete when card enters viewport
        const animationStart = windowHeight - 200; // Start movement much later, when card is very close
        const animationEnd = windowHeight - 50; // Complete slightly before entering viewport
        const cardDistanceFromTop = cardTop;
        
        // Progress: 0 when card starts moving (already visible), 1 when card enters viewport
        let parallaxProgress = 0;
        if (cardDistanceFromTop <= animationEnd) {
          parallaxProgress = 1; // Card is in viewport - animation complete
        } else if (cardDistanceFromTop <= animationStart) {
          // Card is between start and end - calculate progress
          const distance = cardDistanceFromTop - animationEnd;
          const range = animationStart - animationEnd;
          parallaxProgress = 1 - (distance / range);
        }
        
        parallaxProgress = Math.max(0, Math.min(1, parallaxProgress));
        
        // Invert progress so cards start from outside and come in
        const invertedProgress = 1 - parallaxProgress;
        
        // Determine direction based on position in grid
        let xOffset = 0;
        let yOffset = 0;
        
        if (relativePosition < 0.33) {
          // Left side - start from left (negative) and come in - slower movement
          xOffset = -invertedProgress * 60;
        } else if (relativePosition > 0.67) {
          // Right side - start from right (positive) and come in - slower movement
          xOffset = invertedProgress * 60;
        } else {
          // Middle - start from bottom (positive) and come up - slower movement
          yOffset = invertedProgress * 50;
        }
        
        // Scale effect - start smaller and grow
        const scale = 0.9 + (parallaxProgress * 0.1);
        
        return {
          x: xOffset,
          y: yOffset,
          opacity: Math.max(0, Math.min(1, opacity)),
          scale: scale
        };
      });

      setCardStates(states);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="features" ref={sectionRef}>
      <div className="features__container">
        <div 
          ref={headerRef}
          className="features__header"
          style={{ 
            transform: `translateY(${headerState.y}px)`,
            opacity: headerState.opacity
          }}
        >
          <span className="features__badge">Why Choose Us</span>
          <h2 className="features__title">What Makes Us Special</h2>
          <p className="features__subtitle">
            We're committed to delivering the best pizza experience every single time.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => {
            const state = cardStates[index] || { x: 0, y: 0, opacity: 0, scale: 0.9 };
            return (
              <div 
                key={index} 
                ref={(el) => { cardRefs.current[index] = el; }}
                className="features__card"
                style={{ 
                  transform: `
                    translate(${state.x}px, ${state.y}px)
                    scale(${state.scale})
                  `,
                  opacity: state.opacity
                }}
              >
                <div className="features__icon">{feature.icon}</div>
                <h3 className="features__card-title">{feature.title}</h3>
                <p className="features__card-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

