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
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      title="Kembali ke atas"
      className={`group fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)]/90 text-[var(--text-primary)] shadow-sm backdrop-blur-md transition-all duration-250 hover:-translate-y-1 hover:border-amber-600/60 hover:text-amber-700 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:text-amber-400 sm:bottom-6 sm:right-6 ${
        visible
          ? "cursor-pointer translate-y-0 opacity-100 pointer-events-auto"
          : "cursor-default translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <FiArrowUp
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}