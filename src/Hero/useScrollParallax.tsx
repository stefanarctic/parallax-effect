import { useEffect, useState, useRef } from "react";

export function useScrollParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateOffset = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed]);

  return offset;
}

export function useElementScrollParallax(
  elementRef: React.RefObject<HTMLElement>,
  speed: number = 0.5
) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate when element enters viewport
      const scrollPosition = window.scrollY;
      const elementCenter = elementTop + elementHeight / 2;
      const distanceFromCenter = scrollPosition + windowHeight / 2 - elementCenter;
      
      // Apply parallax effect
      setOffset(distanceFromCenter * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef, speed]);

  return offset;
}

