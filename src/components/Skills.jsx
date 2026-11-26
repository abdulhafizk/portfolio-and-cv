import { useState } from "react";
import { SKILLS_DATA, SKILL_LEVELS } from "../data/portfolioData";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import Reveal from "./Reveal";

const LEVEL_STYLES = {
  Beginner: "border-sky-500/25 bg-sky-500/10 text-sky-800 dark:text-sky-300",
  Intermediate:
    "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  Advanced:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
};

const LEVEL_CONFIG = {
  Beginner: {
    widthClass: "w-1/4",
    barClass: "bg-sky-500 dark:bg-sky-400",
    dotClass: "bg-sky-500 dark:bg-sky-400",
    note: "Eksplorasi & dasar",
  },
  Intermediate: {
    widthClass: "w-[70%]",
    barClass: "bg-amber-500 dark:bg-amber-400",
    dotClass: "bg-amber-500 dark:bg-amber-400",
    note: "Praktik terarah",
  },
  Advanced: {
    widthClass: "w-[99%]",
    barClass: "bg-emerald-500 dark:bg-emerald-400",
    dotClass: "bg-emerald-500 dark:bg-emerald-400",
    note: "Terbiasa diterapkan",
  },
};

export default function Skills() {
  const [selectedLevel, setSelectedLevel] = useState("Semua");
  const filterOptions = ["Semua", ...SKILL_LEVELS];
  const { ref: gridRef, isVisible: gridVisible } = useRevealOnScroll({
    threshold: 0.08,
  });

  return (
    <section
      id="skills"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/55 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Keahlian & Stack
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Peta penguasaan{" "}
              <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
                teknologi & desain
              </span>
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter level keahlian"
            className="flex flex-wrap gap-2"
          >
            {filterOptions.map((level) => {
              const active = selectedLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950"
                      : "border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:-translate-y-0.5 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div ref={gridRef} className="mt-12 grid gap-6 md:grid-cols-3">
          {SKILLS_DATA.map((group, gIdx) => {
            const items = (group.items || []).filter((item) =>
              selectedLevel === "Semua" ? true : item.level === selectedLevel
            );

            return (
              <Reveal
                key={`${group.category}-${gIdx}`}
                delay={gIdx * 80}
                className="flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">
                      {group.category}
                    </h3>
                    <span className="rounded-full bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]">
                      {items.length} Skills
                    </span>
                  </div>

                  {items.length > 0 ? (
                    <ul className="mt-4 divide-y divide-[var(--border-hairline)]">
                      {items.map((skill, sIdx) => {
                        const config = LEVEL_CONFIG[skill.level] || {
                          widthClass: "w-1/2",
                          barClass: "bg-amber-500 dark:bg-amber-400",
                        };

                        return (
                          <li
                            key={`${skill.name}-${sIdx}`}
                            className="-mx-2 rounded-xl px-2 py-3.5 transition-colors duration-200 first:mt-0 first:pt-1.5 last:pb-1.5 hover:bg-[var(--bg-subtle)]/55"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-[var(--text-primary)]">
                                {skill.name}
                              </span>
                              <span
                                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                                  LEVEL_STYLES[skill.level] ||
                                  "border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                                }`}
                              >
                                {skill.level}
                              </span>
                            </div>

                            <div
                              aria-hidden="true"
                              className="mt-2.5 h-2 w-full overflow-hidden rounded-full border border-[var(--border-hairline)]/60 bg-[var(--bg-subtle)]"
                            >
                              <div
                                style={{
                                  transitionDelay: `${sIdx * 60 + 120}ms`,
                                }}
                                className={`h-full rounded-full transition-all duration-700 ease-out ${
                                  config.barClass
                                } ${gridVisible ? config.widthClass : "w-0"}`}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="py-10 text-center text-xs text-[var(--text-secondary)]">
                      Tidak ada item level {selectedLevel}.
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Keterangan Singkat Tingkatan */}
        <Reveal
          delay={180}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-3.5 text-xs text-[var(--text-secondary)]"
        >
          <div className="flex flex-wrap items-center gap-5">
            {SKILL_LEVELS.map((level) => {
              const cfg = LEVEL_CONFIG[level];
              return (
                <span key={level} className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${cfg?.dotClass || "bg-amber-500"}`}
                  />
                  <strong className="font-semibold text-[var(--text-primary)]">
                    {level}
                  </strong>
                  <span>— {cfg?.note}</span>
                </span>
              );
            })}
          </div>
          <span className="text-[11px] text-[var(--text-secondary)]">
            Diperbarui berkala sesuai proyek
          </span>
        </Reveal>
      </div>
    </section>
  );
}