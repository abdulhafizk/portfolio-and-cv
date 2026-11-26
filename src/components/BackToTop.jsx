import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke bagian atas halaman"
      title="Kembali ke atas"
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm transition-colors hover:border-amber-600/60 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:text-amber-400 sm:bottom-6 sm:right-6"
    >
      <FiArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}