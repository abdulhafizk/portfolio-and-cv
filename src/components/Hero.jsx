import { useState } from "react";
import {
  FiArrowRight,
  FiCopy,
  FiCheck,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";
import { PROFILE_DATA } from "../data/portfolioData";

const FOCUS_TAGS = [
  "React & Vite",
  "Tailwind CSS",
  "UI/UX Systems",
  "Responsive Web",
];

export default function Hero({ onShowToast }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopied(true);
      onShowToast?.(`Email ${PROFILE_DATA.email} berhasil disalin.`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast?.("Gagal menyalin email secara otomatis.");
    }
  };

  const stats = PROFILE_DATA.stats?.filter((s) => s.label || s.value) ?? [];
  const socials = PROFILE_DATA.socials?.filter((s) => s.name && s.url) ?? [];

  return (
    <section
      id="hero"
      className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28"
    >
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Kolom Kiri: Editorial Headline */}
        <div className="space-y-7 lg:col-span-7">
          <div className="reveal-visible inline-flex items-center gap-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
            <span
              className="h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span>
              {PROFILE_DATA.availability ||
                PROFILE_DATA.avaibility ||
                "Available for Collaboration"}
            </span>
          </div>

          <div
            style={{ animationDelay: "90ms" }}
            className="reveal-visible space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              {PROFILE_DATA.role}
            </p>
            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.35rem]">
              Merancang antarmuka web yang{" "}
              <span className="font-editorial text-5xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-6xl">
                presisi, bersih, & berkarakter.
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {PROFILE_DATA.heroSubheadline}
            </p>
          </div>

          <div
            style={{ animationDelay: "180ms" }}
            className="reveal-visible flex flex-wrap items-center gap-3.5 pt-1"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300"
            >
              <span>Eksplorasi Proyek</span>
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {copied ? (
                <>
                  <FiCheck
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>Email Tersalin</span>
                </>
              ) : (
                <>
                  <FiCopy className="h-4 w-4" aria-hidden="true" />
                  <span>{PROFILE_DATA.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Kartu Profil Ringkas yang Lebih Berisi & Rapi */}
        <div
          style={{ animationDelay: "220ms" }}
          className="reveal-visible lg:col-span-5"
        >
          <div className="animate-float-slow rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs sm:p-8">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border-hairline)] pb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                  Profil Ringkas
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                  {PROFILE_DATA.name}
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                <FiMapPin
                  className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
                <span>{PROFILE_DATA.location || "Indonesia"}</span>
              </span>
            </div>

            {stats.length > 0 && (
              <dl className="mt-5 grid grid-cols-3 gap-2.5 border-b border-[var(--border-hairline)] pb-6">
                {stats.map((stat, idx) => (
                  <div
                    key={`${stat.label}-${idx}`}
                    className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/75 px-3 py-3 text-center"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-editorial text-2xl font-normal text-[var(--text-primary)] sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                Fokus Utama
              </p>
              <div className="flex flex-wrap gap-2">
                {FOCUS_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {socials.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-5">
                <div className="flex flex-wrap items-center gap-4">
                  {socials.map((social, idx) => (
                    <a
                      key={`${social.name}-${idx}`}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <span>{social.name}</span>
                      <FiArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}