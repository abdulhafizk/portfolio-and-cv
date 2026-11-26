// import { FiBriefcase, FiBookOpen, FiMapPin } from "react-icons/fi";
// import { PROFILE_DATA, EXPERIENCE_DATA, EDUCATION_DATA } from "../data/portfolioData";
// import Reveal from "./Reveal";

// export default function About() {
//   return (
//     <section id="about" className="border-t border-[var(--border-hairline)] py-20 sm:py-28">
//       <div className="mx-auto max-w-6xl px-5 sm:px-8">
//         <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
//           <div className="space-y-3 lg:col-span-6">
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
//               Tentang & Riwayat
//             </p>
//             <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
//               Perjalanan akademik dan{" "}
//               <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
//                 pengalaman praktik
//               </span>
//             </h2>
//           </div>
//           <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base lg:col-span-6">
//             {PROFILE_DATA.aboutSummary}
//           </p>
//         </Reveal>

//         <div className="mt-14 grid gap-8 lg:grid-cols-2">
//           <Reveal delay={80} className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 sm:p-9">
//             <div className="mb-7 flex items-center gap-3.5 border-b border-[var(--border-hairline)] pb-5">
//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-amber-700 dark:text-amber-400">
//                 <FiBriefcase className="h-4 w-4" />
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-[var(--text-primary)]">Pengalaman</h3>
//                 <p className="text-xs text-[var(--text-secondary)]">Proyek mandiri & kolaborasi</p>
//               </div>
//             </div>

//             <div className="space-y-8">
//               {EXPERIENCE_DATA.map((item, index) => (
//                 <article
//                   key={item.id || `exp-${index}`}
//                   className="relative border-l border-[var(--border-hairline)] pl-6"
//                 >
//                   <span className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400" />
//                   <div className="flex flex-wrap items-center justify-between gap-2">
//                     <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
//                       {item.period}
//                     </span>
//                     {item.location && (
//                       <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
//                         <FiMapPin className="h-3 w-3" />
//                         {item.location}
//                       </span>
//                     )}
//                   </div>
//                   <h4 className="mt-1.5 text-base font-semibold text-[var(--text-primary)]">
//                     {item.role}
//                   </h4>
//                   <p className="text-sm font-medium text-[var(--text-secondary)]">
//                     {item.organization}
//                   </p>
//                   <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
//                     {item.description}
//                   </p>
//                   {item.highlights?.filter(Boolean).length > 0 && (
//                     <ul className="mt-3.5 space-y-1.5 text-xs text-[var(--text-secondary)]">
//                       {item.highlights.filter(Boolean).map((point, idx) => (
//                         <li key={`${item.id}-hl-${idx}`} className="flex items-start gap-2.5">
//                           <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-600 dark:bg-amber-400" />
//                           <span>{point}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </article>
//               ))}
//             </div>
//           </Reveal>

//           <Reveal delay={160} className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 sm:p-9">
//             <div className="mb-7 flex items-center gap-3.5 border-b border-[var(--border-hairline)] pb-5">
//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] text-emerald-700 dark:text-emerald-400">
//                 <FiBookOpen className="h-4 w-4" />
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-[var(--text-primary)]">Pendidikan</h3>
//                 <p className="text-xs text-[var(--text-secondary)]">Riwayat studi formal</p>
//               </div>
//             </div>

//             <div className="space-y-8">
//               {EDUCATION_DATA.map((edu, index) => (
//                 <article
//                   key={edu.id || `edu-${index}`}
//                   className="relative border-l border-[var(--border-hairline)] pl-6"
//                 >
//                   <span className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
//                   <div className="flex flex-wrap items-center justify-between gap-2">
//                     <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
//                       {edu.period}
//                     </span>
//                     {edu.gpa && (
//                       <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-primary)]">
//                         {edu.gpa}
//                       </span>
//                     )}
//                   </div>
//                   <h4 className="mt-1.5 text-base font-semibold text-[var(--text-primary)]">
//                     {edu.degree}
//                   </h4>
//                   <p className="text-sm font-medium text-[var(--text-secondary)]">
//                     {edu.institution}
//                     {edu.location ? ` · ${edu.location}` : ""}
//                   </p>
//                   {edu.description && (
//                     <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
//                       {edu.description}
//                     </p>
//                   )}
//                   {edu.highlights?.filter(Boolean).length > 0 && (
//                     <ul className="mt-3.5 space-y-1.5 text-xs text-[var(--text-secondary)]">
//                       {edu.highlights.filter(Boolean).map((point, idx) => (
//                         <li key={`${edu.id}-hl-${idx}`} className="flex items-start gap-2.5">
//                           <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
//                           <span>{point}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </article>
//               ))}
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }

import { FiBriefcase, FiBookOpen, FiMapPin, FiCheck } from "react-icons/fi";
import {
  PROFILE_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
} from "../data/portfolioData";
import Reveal from "./Reveal";

function isCurrentPeriod(period = "") {
  return /sekarang|present|now/i.test(period);
}

export default function About() {
  const experienceCount = EXPERIENCE_DATA?.length ?? 0;
  const educationCount = EDUCATION_DATA?.length ?? 0;

  return (
    <section
      id="about"
      className="border-t border-[var(--border-hairline)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header Bagian */}
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="space-y-3 lg:col-span-6">
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
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base lg:col-span-6">
            {PROFILE_DATA.aboutSummary}
          </p>
        </Reveal>

        {/* Dua Kolom Utama */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Kolom Pengalaman */}
          <Reveal
            delay={80}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 sm:p-9"
          >
            <div>
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-amber-700 dark:text-amber-400">
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

              <div className="space-y-8">
                {EXPERIENCE_DATA.map((item, index) => {
                  const active = isCurrentPeriod(item.period);
                  const highlights = item.highlights?.filter(Boolean) ?? [];

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

                        {item.location && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                            <FiMapPin className="h-3 w-3" aria-hidden="true" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2 text-base font-bold text-[var(--text-primary)]">
                        {item.role}
                      </h4>
                      <p className="mt-0.5 text-xs font-semibold text-amber-800/90 dark:text-amber-300/90 sm:text-sm">
                        {item.organization}
                      </p>

                      {item.description && (
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.description}
                        </p>
                      )}

                      {highlights.length > 0 && (
                        <ul className="mt-3.5 space-y-2 text-xs text-[var(--text-secondary)]">
                          {highlights.map((point, idx) => (
                            <li
                              key={`${item.id}-hl-${idx}`}
                              className="flex items-start gap-2"
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

            <div className="mt-8 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[11px] text-[var(--text-secondary)]">
              <span>Kolaborasi, kepemimpinan & eksekusi</span>
              <span className="font-semibold text-[var(--text-primary)]">
                Lini Masa Aktif
              </span>
            </div>
          </Reveal>

          {/* Kolom Pendidikan */}
          <Reveal
            delay={160}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 sm:p-9"
          >
            <div>
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-emerald-700 dark:text-emerald-400">
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

              <div className="space-y-8">
                {EDUCATION_DATA.map((edu, index) => {
                  const active = isCurrentPeriod(edu.period);
                  const highlights = edu.highlights?.filter(Boolean) ?? [];

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

                        {edu.gpa && (
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
                        {edu.location ? ` · ${edu.location}` : ""}
                      </p>

                      {edu.description && (
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {edu.description}
                        </p>
                      )}

                      {highlights.length > 0 && (
                        <ul className="mt-3.5 space-y-2 text-xs text-[var(--text-secondary)]">
                          {highlights.map((point, idx) => (
                            <li
                              key={`${edu.id}-hl-${idx}`}
                              className="flex items-start gap-2"
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

            <div className="mt-8 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[11px] text-[var(--text-secondary)]">
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