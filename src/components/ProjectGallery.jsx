import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProjectGallery({ items = [], projectTitle = "" }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [brokenIndices, setBrokenIndices] = useState({});

  const validItems = (Array.isArray(items) ? items : [])
    .map((entry, idx) => {
      if (brokenIndices[idx]) return null;
      if (typeof entry === "string") {
        return entry ? { src: entry, caption: "", originalIndex: idx } : null;
      }
      if (entry?.src) {
        return {
          src: entry.src,
          caption: entry.caption || "",
          originalIndex: idx,
        };
      }
      return null;
    })
    .filter(Boolean);

  useEffect(() => {
    if (activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % validItems.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex(
          (prev) => (prev - 1 + validItems.length) % validItems.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, validItems.length]);

  if (validItems.length === 0) return null;

  const safeIndex =
    activeIndex !== null && activeIndex < validItems.length ? activeIndex : null;
  const activePhoto = safeIndex !== null ? validItems[safeIndex] : null;

  const lightboxModal = activePhoto
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption || "Pratinjau Foto Galeri"}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 px-3 pb-4 pt-16 backdrop-blur-xs sm:px-6 sm:pb-6 sm:pt-20"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-animate-in relative flex max-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3 shadow-2xl sm:max-h-[calc(100vh-6.5rem)] sm:p-5"
          >
            <div className="mb-3 flex shrink-0 items-center justify-between gap-3 px-1">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                Foto {safeIndex + 1} dari {validItems.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Tutup pratinjau foto"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-all duration-200 hover:border-amber-600/50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <FiX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[var(--bg-canvas)]/80 p-2 sm:p-3">
              <img
                src={activePhoto.src}
                alt={activePhoto.caption || `${projectTitle} — foto ${safeIndex + 1}`}
                onError={() => {
                  setBrokenIndices((prev) => ({
                    ...prev,
                    [activePhoto.originalIndex]: true,
                  }));
                  setActiveIndex(null);
                }}
                className="max-h-[72vh] w-full rounded-xl object-contain sm:max-h-[75vh]"
              />

              {validItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev - 1 + validItems.length) % validItems.length
                      )
                    }
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/65 text-white shadow-sm backdrop-blur-xs transition-all duration-200 hover:border-amber-500/60 hover:bg-black/85 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:left-4"
                  >
                    <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % validItems.length)
                    }
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/65 text-white shadow-sm backdrop-blur-xs transition-all duration-200 hover:border-amber-500/60 hover:bg-black/85 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:right-4"
                  >
                    <FiChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {activePhoto.caption && (
              <div className="mt-3 flex shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 px-4 py-2.5 text-center text-xs leading-relaxed text-[var(--text-secondary)] sm:px-6 sm:py-3 sm:text-sm">
                <span className="shrink-0 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                  {String(safeIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {activePhoto.caption}
                </span>
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <section
      aria-label="Galeri Foto Proyek"
      className="mt-10 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Dokumentasi Visual
          </p>
          <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)] sm:text-xl">
            Galeri Tangkapan & Proses
          </h2>
        </div>
        <span className="text-xs font-medium text-[var(--text-secondary)]">
          {validItems.length} foto · Klik untuk memperbesar
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {validItems.map((photo, idx) => (
          <figure
            key={`${photo.src}-${photo.originalIndex}`}
            className="group overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/60 transition-colors duration-200 hover:border-amber-600/40"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Perbesar foto ${idx + 1}: ${photo.caption || projectTitle}`}
              className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <img
                src={photo.src}
                alt={photo.caption || `${projectTitle} — foto ${idx + 1}`}
                loading="lazy"
                onError={() =>
                  setBrokenIndices((prev) => ({
                    ...prev,
                    [photo.originalIndex]: true,
                  }))
                }
                className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)]/90 text-[var(--text-primary)] shadow-xs transition-transform duration-200 group-hover:scale-105">
                <FiMaximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>

            {photo.caption && (
              <figcaption className="flex items-start gap-2.5 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <span className="mt-0.5 shrink-0 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[var(--text-primary)]/90">{photo.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {lightboxModal}
    </section>
  );
}