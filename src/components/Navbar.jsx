import { useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { PROFILE_DATA } from "../data/portfolioData";

const NAV_LINKS = [
  { id: "about", label: "Riwayat" },
  { id: "skills", label: "Keahlian" },
  { id: "achievements", label: "Pencapaian" },
  { id: "projects", label: "Proyek" },
  { id: "design-gallery", label: "Galeri Desain" },
  { id: "contact", label: "Kontak" },
];

export default function Navbar({
  activeSection,
  isDark,
  onToggleTheme,
  onNavigateSection,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
      return;
    }
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/80 backdrop-blur-lg shadow-2xs"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("hero");
          }}
          className="group cursor-pointer text-sm font-semibold tracking-tight text-[var(--text-primary)] transition-opacity hover:opacity-90 sm:text-base"
        >
          {PROFILE_DATA.name}
          <span className="ml-0.5 inline-block text-amber-600 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-amber-400">
            .
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi Utama">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`relative cursor-pointer py-1 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-[22px] h-[2px] origin-left bg-amber-700 transition-transform duration-250 dark:bg-amber-400 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menu navigasi"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all duration-200 active:scale-95 md:hidden"
          >
            {mobileMenuOpen ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 px-5 py-4 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navigasi Mobile">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`cursor-pointer rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id
                    ? "bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}