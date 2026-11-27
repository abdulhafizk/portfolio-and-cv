import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function Reveal({
  children,
  delay = 0,
  threshold = 0.05,
  rootMargin = "0px 0px -16px 0px",
  className = "",
  as: Component = "div",
}) {
  const { ref, isVisible } = useRevealOnScroll({ threshold, rootMargin });

  const style = delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <Component
      ref={ref}
      style={style}
      className={`${isVisible ? "reveal-visible" : "reveal-hidden"} ${className}`}
    >
      {children}
    </Component>
  );
}