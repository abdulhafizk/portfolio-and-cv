import {
  FiBriefcase,
  FiBookOpen,
  FiMapPin,
  FiCheck,
  FiCompass,
  FiLayers,
} from "react-icons/fi";
import {
  PROFILE_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
} from "../data/portfolioData";
import Reveal from "./Reveal";

function isCurrentPeriod(period = "") {
  return /sekarang|present|now/i.test(period);
}

function hasMeaningfulText(value = "") {
  const cleaned = String(value).trim();
  return cleaned.length > 0 && cleaned !== "-" && cleaned !== "—";
}

export default function About() {
  const experienceList = Array.isArray(EXPERIENCE_DATA) ? EXPERIENCE_DATA : [];
  const educationList = Array.isArray(EDUCATION_DATA) ? EDUCATION_DATA : [];
  const experienceCount = experienceList.length;
  const educationCount = educationList.length;
  const activeExperienceCount = experienceList.filter((item) =>
    isCurrentPeriod(item?.period)
  ).length;

  const focusAreas = Array.isArray(PROFILE_DATA?.focusAreas)
    ? PROFILE_DATA.focusAreas.filter(Boolean)
    : ["Frontend Development", "UI/UX & Visual", "Organisasi & Dakwah"];

  return (
    <section
      id="about"
      className="border-t border-[var(--border-hairline)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header Bagian */}
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Tentang & Riwayat
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Perjalanan akademik dan{" "}
              <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
                pengalaman praktik
              </span>
            </h2>
          </div>

          {hasMeaningfulText(PROFILE_DATA?.location) && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)]">
              <FiMapPin
                className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400"
                aria-hidden="true"
              />
              <span>{PROFILE_DATA.location}</span>
            </div>
          )}
        </Reveal>

        {/* Bento Grid Utama */}
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Bento Tile 1: Ringkasan Profil */}
          <Reveal
            delay={40}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-200 hover:border-amber-600/40 sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <FiCompass className="h-4 w-4" aria-hidden="true" />
                  <span>Ringkasan Profil</span>
                </div>
                <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                  Pendekatan Terstruktur
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {PROFILE_DATA?.aboutSummary}
              </p>
            </div>

            {focusAreas.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--border-hairline)] pt-4">
                <span className="mr-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  <FiLayers
                    className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  <span>Fokus:</span>
                </span>
                {focusAreas.map((area, idx) => (
                  <span
                    key={`focus-${idx}`}
                    className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/75 px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </Reveal>

          {/* Bento Tile 2: Metrik & Sorotan Singkat */}
          <Reveal
            delay={80}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-200 hover:border-amber-600/40 sm:p-8 lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Ringkasan Rekam Jejak
                </p>
                <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  Overview
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                Kombinasi pengalaman teknis, kegiatan lapangan/komunitas, serta
                pendidikan formal dan pesantren.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/65 p-3.5 transition-colors duration-200 hover:border-amber-600/35">
                <p className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                  {experienceCount}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                  Pengalaman
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/65 p-3.5 transition-colors duration-200 hover:border-emerald-600/35">
                <p className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                  {educationCount}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                  Pendidikan
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/65 p-3.5 transition-colors duration-200 hover:border-amber-600/35">
                <p className="text-xl font-bold text-amber-700 dark:text-amber-400 sm:text-2xl">
                  {activeExperienceCount}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                  Aktif
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bento Tile 3: Pengalaman */}
          <Reveal
            delay={120}
            className="group/exp flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/45 sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="mb-7 flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-amber-700 transition-transform duration-200 group-hover/exp:scale-105 dark:text-amber-400">
                    <FiBriefcase className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      Pengalaman
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Peran organisasi, tim & proyek
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">
                  {experienceCount} Peran
                </span>
              </div>

              <div className="space-y-7">
                {experienceList.map((item, index) => {
                  const active = isCurrentPeriod(item.period);
                  const highlights = item.highlights?.filter(Boolean) ?? [];
                  const hasOrg = hasMeaningfulText(item.organization);
                  const hasLocation = hasMeaningfulText(item.location);
                  const hasDesc = hasMeaningfulText(item.description);

                  return (
                    <article
                      key={item.id || `exp-${index}`}
                      className="relative border-l border-[var(--border-hairline)] pl-6 last:pb-1"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--bg-surface)] ${
                          active
                            ? "bg-amber-600 dark:bg-amber-400"
                            : "bg-stone-400 dark:bg-stone-600"
                        }`}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                            active
                              ? "text-amber-700 dark:text-amber-400"
                              : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {active && (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400"
                            />
                          )}
                          <span>{item.period}</span>
                        </span>

                        {hasLocation && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                            <FiMapPin className="h-3 w-3" aria-hidden="true" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2 text-base font-bold text-[var(--text-primary)]">
                        {item.role}
                      </h4>

                      {hasOrg && (
                        <p className="mt-0.5 text-xs font-semibold text-amber-800/90 dark:text-amber-300/90 sm:text-sm">
                          {item.organization}
                        </p>
                      )}

                      {hasDesc && (
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.description}
                        </p>
                      )}

                      {highlights.length > 0 && (
                        <ul className="mt-3.5 space-y-2 text-xs text-[var(--text-secondary)]">
                          {highlights.map((point, idx) => (
                            <li
                              key={`${item.id}-hl-${idx}`}
                              className="flex items-start gap-2 transition-transform duration-200 hover:translate-x-0.5"
                            >
                              <FiCheck
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400"
                                aria-hidden="true"
                              />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[11px] text-[var(--text-secondary)]">
              <span>Kolaborasi, kepemimpinan & eksekusi</span>
              <span className="font-semibold text-[var(--text-primary)]">
                Lini Masa Aktif
              </span>
            </div>
          </Reveal>

          {/* Bento Tile 4: Pendidikan */}
          <Reveal
            delay={160}
            className="group/edu flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-600/45 sm:p-8 lg:col-span-5"
          >
            <div>
              <div className="mb-7 flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-emerald-700 transition-transform duration-200 group-hover/edu:scale-105 dark:text-emerald-400">
                    <FiBookOpen className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      Pendidikan
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Riwayat studi formal & pesantren
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">
                  {educationCount} Jenjang
                </span>
              </div>

              <div className="space-y-7">
                {educationList.map((edu, index) => {
                  const active = isCurrentPeriod(edu.period);
                  const highlights = edu.highlights?.filter(Boolean) ?? [];
                  const hasLocation = hasMeaningfulText(edu.location);
                  const hasDesc = hasMeaningfulText(edu.description);

                  return (
                    <article
                      key={edu.id || `edu-${index}`}
                      className="relative border-l border-[var(--border-hairline)] pl-6 last:pb-1"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--bg-surface)] ${
                          active
                            ? "bg-emerald-600 dark:bg-emerald-400"
                            : "bg-stone-400 dark:bg-stone-600"
                        }`}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                            active
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {active && (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"
                            />
                          )}
                          <span>{edu.period}</span>
                        </span>

                        {hasMeaningfulText(edu.gpa) && (
                          <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-primary)]">
                            {edu.gpa}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2 text-base font-bold text-[var(--text-primary)]">
                        {edu.degree}
                      </h4>
                      <p className="mt-0.5 text-xs font-semibold text-emerald-800/90 dark:text-emerald-300/90 sm:text-sm">
                        {edu.institution}
                        {hasLocation ? ` · ${edu.location}` : ""}
                      </p>

                      {hasDesc && (
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {edu.description}
                        </p>
                      )}

                      {highlights.length > 0 && (
                        <ul className="mt-3.5 space-y-2 text-xs text-[var(--text-secondary)]">
                          {highlights.map((point, idx) => (
                            <li
                              key={`${edu.id}-hl-${idx}`}
                              className="flex items-start gap-2 transition-transform duration-200 hover:translate-x-0.5"
                            >
                              <FiCheck
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                                aria-hidden="true"
                              />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[11px] text-[var(--text-secondary)]">
              <span>Disiplin akademik, tahfidz & karakter</span>
              <span className="font-semibold text-[var(--text-primary)]">
                Terverifikasi
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}