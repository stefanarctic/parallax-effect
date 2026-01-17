import React, { useEffect, useState, useRef } from "react";
import "./Menu.scss";
import { useSmoothParallax } from "../Hero/useSmoothParallax";
import { useMouseParallax } from "../Hero/useMouseParallax";
import { useScrollParallax } from "../Hero/useScrollParallax";

const Menu = () => {
  const mouse = useMouseParallax();
  const smooth = useSmoothParallax(mouse);
  const scrollOffset = useScrollParallax(0.2);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardStates, setCardStates] = useState<Array<{ offset: number; opacity: number }>>([]);

  const pizzas = [
    {
      name: "Margherita Classic",
      description: "Fresh tomatoes, mozzarella, basil, and extra virgin olive oil",
      price: "$12.99",
      image: "/pizza.png",
    },
    {
      name: "Pepperoni Supreme",
      description: "Pepperoni, mozzarella, mushrooms, and bell peppers",
      price: "$15.99",
      image: "/pizza.png",
    },
    {
      name: "Vegetarian Delight",
      description: "Bell peppers, mushrooms, olives, onions, and fresh tomatoes",
      price: "$14.99",
      image: "/pizza.png",
    },
    {
      name: "Meat Lovers",
      description: "Pepperoni, sausage, ham, bacon, and mozzarella",
      price: "$17.99",
      image: "/pizza.png",
    },
    {
      name: "Hawaiian Paradise",
      description: "Ham, pineapple, mozzarella, and a hint of sweetness",
      price: "$16.99",
      image: "/pizza.png",
    },
    {
      name: "BBQ Chicken",
      description: "Grilled chicken, BBQ sauce, red onions, and mozzarella",
      price: "$16.99",
      image: "/pizza.png",
    },
  ];

  useEffect(() => {
    // Initialize card states
    setCardStates(pizzas.map(() => ({ offset: 0, opacity: 0 })));

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const windowHeight = window.innerHeight;
      const viewportCenter = window.scrollY + windowHeight / 2;
      
      // Calculate parallax offsets and opacity for each card using real positions
      const states = cardRefs.current.map((cardRef) => {
        if (!cardRef) {
          return { offset: 0, opacity: 0 };
        }

        const rect = cardRef.getBoundingClientRect();
        const cardTop = rect.top;
        const cardHeight = rect.height;
        
        // Calculate opacity based on how much of the card is visible in viewport
        // Start fading in when card top is 200px below viewport bottom
        // Fully visible when card top is at viewport top or above
        const fadeStartDistance = windowHeight + 200; // Start fading when 200px below viewport
        const fadeEndDistance = 0; // Fully visible when at top of viewport
        
        let opacity = 0;
        if (cardTop <= fadeEndDistance) {
          // Card is at or above viewport top - fully visible
          opacity = 1;
        } else if (cardTop <= fadeStartDistance) {
          // Card is in fade zone - calculate smooth progress
          const distance = cardTop - fadeEndDistance;
          const fadeRange = fadeStartDistance - fadeEndDistance;
          opacity = 1 - (distance / fadeRange);
        } else {
          // Card is below fade zone - hidden
          opacity = 0;
        }
        
        // Parallax offset - move up when scrolling down
        const parallaxProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        const parallaxOffset = -parallaxProgress * 20;
        
        return {
          offset: parallaxOffset,
          opacity: Math.max(0, Math.min(1, opacity))
        };
      });

      setCardStates(states);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pizzas.length]);

  return (
    <section className="menu" ref={sectionRef}>
      <div className="menu__container">
        <div 
          className="menu__header"
          style={{ transform: `translateY(${-scrollOffset * 0.2}px)` }}
        >
          <span className="menu__badge">Our Menu</span>
          <h2 className="menu__title">Popular Pizzas</h2>
          <p className="menu__subtitle">
            Discover our handcrafted selection of delicious pizzas made with love.
          </p>
        </div>

        <div className="menu__grid">
          {pizzas.map((pizza, index) => {
            const cardStyle = {
              transform: `
                translate(
                  ${smooth.current.x * (index % 2 === 0 ? 2 : -2)}px, 
                  ${smooth.current.y * (index % 2 === 0 ? 2 : -2) + (cardStates[index]?.offset || 0)}px
                )
              `,
              opacity: cardStates[index]?.opacity || 0,
            };

            return (
              <div 
                key={index} 
                ref={(el) => { cardRefs.current[index] = el; }}
                className="menu__card" 
                style={cardStyle}
              >
                <div className="menu__image-wrapper">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="menu__image"
                    draggable={false}
                  />
                </div>
                <div className="menu__content">
                  <h3 className="menu__card-title">{pizza.name}</h3>
                  <p className="menu__card-description">{pizza.description}</p>
                  <div className="menu__footer">
                    <span className="menu__price">{pizza.price}</span>
                    <button className="menu__button">Add to Cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Menu;

