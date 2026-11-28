import { useMemo, useState } from "react";
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

function findGroupByKey(groups, keywords) {
  return groups.find((g) => {
    const title = String(g?.category || "").toLowerCase();
    return keywords.some((kw) => title.includes(kw));
  });
}

function SkillGroupCard({
  group,
  selectedLevel,
  gridVisible,
  delay = 0,
  className = "",
  compact = false,
}) {
  if (!group) return null;

  const items = (group.items || []).filter((item) =>
    selectedLevel === "Semua" ? true : item.level === selectedLevel
  );

  return (
    <Reveal
      delay={delay}
      className={`flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-all duration-200 hover:border-amber-600/40 ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-7"
      } ${className}`}
    >
      <div>
        <div
          className={`flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] ${
            compact ? "pb-3" : "pb-4"
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">
            {group.category}
          </h3>
          <span className="rounded-full bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]">
            {items.length} Skills
          </span>
        </div>

        {items.length > 0 ? (
          <ul
            className={`divide-y divide-[var(--border-hairline)] ${
              compact ? "mt-2.5" : "mt-3.5"
            }`}
          >
            {items.map((skill, sIdx) => {
              const config = LEVEL_CONFIG[skill.level] || {
                widthClass: "w-1/2",
                barClass: "bg-amber-500 dark:bg-amber-400",
              };

              return (
                <li
                  key={`${skill.name}-${sIdx}`}
                  className={`group/item -mx-2 rounded-xl px-2 transition-colors duration-200 hover:bg-[var(--bg-subtle)]/65 ${
                    compact
                      ? "py-2.5 first:pt-1 last:pb-0.5"
                      : "py-3 first:pt-1.5 last:pb-1"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[var(--text-primary)] transition-transform duration-200 group-hover/item:translate-x-0.5">
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
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]"
                  >
                    <div
                      style={{
                        transitionDelay: `${sIdx * 40 + 70}ms`,
                      }}
                      className={`h-full rounded-full transition-all duration-400 ease-out ${
                        config.barClass
                      } ${gridVisible ? config.widthClass : "w-0"}`}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="py-8 text-center text-xs text-[var(--text-secondary)]">
            Tidak ada item level {selectedLevel}.
          </p>
        )}
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const [selectedLevel, setSelectedLevel] = useState("Semua");
  const filterOptions = ["Semua", ...SKILL_LEVELS];
  const { ref: gridRef, isVisible: gridVisible } = useRevealOnScroll({
    threshold: 0.08,
  });

  const groups = Array.isArray(SKILLS_DATA) ? SKILLS_DATA : [];

  const { frontendGroup, backendGroup, designGroup, otherGroup, extraGroups } =
    useMemo(() => {
      const fe = findGroupByKey(groups, ["front"]);
      const be = findGroupByKey(groups, ["back", "tool"]);
      const ui = findGroupByKey(groups, ["desain", "design", "ui"]);
      const other = findGroupByKey(groups, ["another", "other", "lain"]);

      const matchedSet = new Set([fe, be, ui, other].filter(Boolean));
      const extras = groups.filter((g) => !matchedSet.has(g));

      return {
        frontendGroup: fe || groups[0] || null,
        backendGroup: be || groups[1] || null,
        designGroup: ui || groups[2] || null,
        otherGroup: other || groups[3] || null,
        extraGroups: extras,
      };
    }, [groups]);

  return (
    <section
      id="skills"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/55 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header Sejajar Kiri-Kanan (Selaras dengan Projects & Design Gallery) */}
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

            <div
              role="group"
              aria-label="Filter level keahlian"
              className="flex flex-wrap gap-2 pt-2"
            >
              {filterOptions.map((level) => {
                const active = selectedLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    aria-pressed={active}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
                      active
                        ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950"
                        : "border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:-translate-y-0.5 hover:border-amber-500/40 hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            Ringkasan teknologi frontend, alur pengembangan, perancangan
            antarmuka, dan keterampilan pendukung yang digunakan dalam praktik.
          </p>
        </Reveal>

        {/* Bento Grid Utama */}
        <div ref={gridRef} className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Kiri Atas: Frontend (Span 7 kolom & 2 baris di kanan) */}
          <SkillGroupCard
            group={frontendGroup}
            selectedLevel={selectedLevel}
            gridVisible={gridVisible}
            delay={50}
            className="lg:col-span-7 lg:row-span-2"
          />

          {/* Kanan Atas: Backend & Tools */}
          <SkillGroupCard
            group={backendGroup}
            selectedLevel={selectedLevel}
            gridVisible={gridVisible}
            delay={90}
            compact
            className="lg:col-span-5"
          />

          {/* Kanan Tengah: Keterangan Tingkatan Level */}
          <Reveal
            delay={120}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 transition-colors duration-200 hover:border-amber-600/35 sm:p-6 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">
                Tingkatan Penguasaan
              </h3>
              <span className="text-[11px] text-[var(--text-secondary)]">
                Diperbarui berkala
              </span>
            </div>

            <div className="mt-3.5 space-y-2.5 text-xs text-[var(--text-secondary)]">
              {SKILL_LEVELS.map((level) => {
                const cfg = LEVEL_CONFIG[level];
                return (
                  <div
                    key={level}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--bg-subtle)]/55 px-3.5 py-2"
                  >
                    <span className="inline-flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${
                          cfg?.dotClass || "bg-amber-500"
                        }`}
                      />
                      <span>{level}</span>
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      {cfg?.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Kiri Bawah: Desain UI/UX */}
          <SkillGroupCard
            group={designGroup}
            selectedLevel={selectedLevel}
            gridVisible={gridVisible}
            delay={150}
            className="lg:col-span-8"
          />

          {/* Kanan Bawah: Another Skills */}
          <SkillGroupCard
            group={otherGroup}
            selectedLevel={selectedLevel}
            gridVisible={gridVisible}
            delay={180}
            compact
            className="lg:col-span-4"
          />

          {/* Kategori Tambahan Jika Ada */}
          {extraGroups.map((extra, idx) => (
            <SkillGroupCard
              key={`${extra.category}-${idx}`}
              group={extra}
              selectedLevel={selectedLevel}
              gridVisible={gridVisible}
              delay={200 + idx * 40}
              className="lg:col-span-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}