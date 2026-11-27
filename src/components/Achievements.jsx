import { useEffect, useState } from "react";
import {
  FiAward,
  FiFileText,
  FiArrowUpRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";
import { ACHIEVEMENTS_DATA } from "../data/portfolioData";
import Reveal from "./Reveal";

const KIND_BADGE_STYLES = {
  Pencapaian:
    "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  Sertifikat:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
};

export default function Achievements() {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!selectedItem) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  if (!ACHIEVEMENTS_DATA?.length) return null;

  return (
    <section
      id="achievements"
      aria-label="Pencapaian dan Sertifikat"
      className="border-t border-[var(--border-hairline)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Pencapaian & Sertifikat
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Milestone &{" "}
              <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
                kredensial pendukung
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            Catatan pencapaian kegiatan, kompetisi, dan sertifikat pembelajaran
            yang melengkapi perjalanan akademik serta praktik.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS_DATA.map((item, index) => {
            const isCertificate = item.kind === "Sertifikat";
            const Icon = isCertificate ? FiFileText : FiAward;

            return (
              <Reveal
                key={item.id || `ach-${index}`}
                delay={index * 60}
                as="article"
                className="group flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/40 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${
                        KIND_BADGE_STYLES[item.kind] ||
                        "border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{item.kind}</span>
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">
                      {item.year}
                    </span>
                  </div>

                  {item.image && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      aria-label={`Perbesar gambar ${item.title}`}
                      className="relative mt-4 block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <img
                        src={item.image}
                        alt={`${item.title}${item.issuer ? ` — ${item.issuer}` : ""}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                      />
                      <span className="absolute bottom-2.5 right-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-stone-950/75 text-white opacity-90 backdrop-blur-xs transition-all duration-200 group-hover:scale-105 group-hover:opacity-100">
                        <FiMaximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </button>
                  )}

                  <h3 className="mt-5 text-base font-bold leading-snug text-[var(--text-primary)] sm:text-lg">
                    {item.title}
                  </h3>
                  {item.issuer && (
                    <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
                      {item.issuer}
                    </p>
                  )}
                  {item.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.summary}
                    </p>
                  )}
                </div>

                {item.credentialUrl && (
                  <div className="mt-6 border-t border-[var(--border-hairline)] pt-4">
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:text-amber-400"
                    >
                      <span>Lihat Kredensial</span>
                      <FiArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Pratinjau Sertifikat / Pencapaian */}
      {selectedItem?.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${selectedItem.title}`}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-animate-in w-full max-w-4xl overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {selectedItem.kind} · {selectedItem.year}
                </p>
                <h3 className="mt-0.5 text-base font-bold text-[var(--text-primary)]">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Tutup pratinjau sertifikat"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-all duration-200 hover:border-amber-600/50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <FiX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex max-h-[75vh] items-center justify-center bg-stone-950/40 p-4 sm:p-6">
              <img
                src={selectedItem.image}
                alt={`${selectedItem.title}${selectedItem.issuer ? ` — ${selectedItem.issuer}` : ""}`}
                className="max-h-[66vh] w-auto max-w-full rounded-xl object-contain"
              />
            </div>

            {selectedItem.issuer && (
              <div className="border-t border-[var(--border-hairline)] px-6 py-3.5 text-xs text-[var(--text-secondary)]">
                Penyelenggara:{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {selectedItem.issuer}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}