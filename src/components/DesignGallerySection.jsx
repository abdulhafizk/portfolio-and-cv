import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";
import { DESIGN_CATEGORIES, DESIGN_GALLERY_ITEMS } from "../data/designGalleryData";
import Reveal from "./Reveal";

export default function DesignGallerySection({
  items = DESIGN_GALLERY_ITEMS,
  categories = DESIGN_CATEGORIES,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeIndex, setActiveIndex] = useState(null);
  const [brokenIds, setBrokenIds] = useState({});

  const validItems = useMemo(() => {
    return (Array.isArray(items) ? items : []).filter(
      (item) => item && item.image && !brokenIds[item.id]
    );
  }, [items, brokenIds]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return validItems;
    return validItems.filter((item) => item.category === selectedCategory);
  }, [validItems, selectedCategory]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight" && filteredItems.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (event.key === "ArrowLeft" && filteredItems.length > 0) {
        setActiveIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, filteredItems.length]);

  if (!validItems.length) return null;

  const safeIndex =
    activeIndex !== null && activeIndex < filteredItems.length
      ? activeIndex
      : null;
  const activeDesign = safeIndex !== null ? filteredItems[safeIndex] : null;

  const lightboxModal = activeDesign?.image
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${activeDesign.title}`}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-animate-in w-full max-w-4xl overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {activeDesign.category || "Desain"}
                  {activeDesign.year ? ` · ${activeDesign.year}` : ""}
                  {filteredItems.length > 1
                    ? ` · ${safeIndex + 1}/${filteredItems.length}`
                    : ""}
                </p>
                <h3 className="mt-0.5 text-base font-bold text-[var(--text-primary)]">
                  {activeDesign.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Tutup pratinjau desain"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-colors hover:border-amber-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <FiX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex max-h-[75vh] items-center justify-center bg-stone-950/40 p-4 sm:p-6">
              <img
                src={activeDesign.image}
                alt={`${activeDesign.title}${activeDesign.tool ? ` — ${activeDesign.tool}` : ""}`}
                onError={() => {
                  setBrokenIds((prev) => ({
                    ...prev,
                    [activeDesign.id]: true,
                  }));
                  setActiveIndex(null);
                }}
                className="max-h-[66vh] w-auto max-w-full rounded-xl object-contain"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (prev) =>
                          (prev - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    aria-label="Desain sebelumnya"
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-stone-950/75 text-white transition-colors hover:border-amber-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:left-4"
                  >
                    <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev + 1) % filteredItems.length
                      )
                    }
                    aria-label="Desain berikutnya"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-stone-950/75 text-white transition-colors hover:border-amber-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:right-4"
                  >
                    <FiChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {(activeDesign.tool || activeDesign.description) && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] px-6 py-3.5 text-xs text-[var(--text-secondary)]">
                <div>
                  {activeDesign.tool && (
                    <>
                      Tool:{" "}
                      <span className="font-semibold text-[var(--text-primary)]">
                        {activeDesign.tool}
                      </span>
                    </>
                  )}
                  {activeDesign.tool && activeDesign.description && (
                    <span className="mx-2">·</span>
                  )}
                  {activeDesign.description && (
                    <span>{activeDesign.description}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <section
      id="design-gallery"
      aria-label="Galeri Desain"
      className="border-t border-[var(--border-hairline)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Galeri Desain
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Eksplorasi &{" "}
              <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
                karya visual
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            Kumpulan rancangan antarmuka, publikasi, dan eksplorasi visual di
            luar studi kasus proyek utama.
          </p>
        </Reveal>

        {Array.isArray(categories) && categories.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveIndex(null);
                  }}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    active
                      ? "border-amber-400 bg-amber-400 text-stone-950"
                      : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-amber-600/40 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <Reveal
              key={item.id || `design-${idx}`}
              delay={idx * 80}
              as="article"
              className="group flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                    {item.category || "Desain"}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    {[item.tool, item.year].filter(Boolean).join(" · ")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Perbesar gambar ${item.title}`}
                  className="relative mt-4 block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <img
                    src={item.image}
                    alt={`${item.title}${item.tool ? ` — ${item.tool}` : ""}`}
                    loading="lazy"
                    onError={() =>
                      setBrokenIds((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 right-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-stone-950/75 text-white opacity-90 backdrop-blur-xs transition-opacity group-hover:opacity-100">
                    <FiMaximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </button>

                <h3 className="mt-5 text-base font-bold leading-snug text-[var(--text-primary)] sm:text-lg">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxModal}
    </section>
  );
}