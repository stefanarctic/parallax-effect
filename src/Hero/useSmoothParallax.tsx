import { useEffect, useRef } from "react";

export function useSmoothParallax(
  target: { x: number; y: number },
  speed = 0.08
) {
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const animate = () => {
      current.current.x += (target.x - current.current.x) * speed;
      current.current.y += (target.y - current.current.y) * speed;
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, speed]);

  return current;
}