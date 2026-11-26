import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <Component
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${isVisible ? "reveal-visible" : "reveal-hidden"} ${className}`}
    >
      {children}
    </Component>
  );
}