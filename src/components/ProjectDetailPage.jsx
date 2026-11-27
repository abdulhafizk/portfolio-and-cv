import { useEffect } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiFileText,
  FiLayers,
} from "react-icons/fi";
import ProjectGallery from "./ProjectGallery";
import { getProjectCategories } from "./Projects";

export default function ProjectDetailPage({
  project,
  onBack,
  onSelectProject,
  prevProject,
  nextProject,
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [project?.id]);

  if (!project) return null;

  const categories = getProjectCategories(project);
  const caseStudy =
    project.caseStudy && typeof project.caseStudy === "object"
      ? project.caseStudy
      : {};

  const challenge = caseStudy.challenge || project.challenge || "";
  const solution = caseStudy.solution || project.solution || "";

  const rawHighlights =
    Array.isArray(caseStudy.highlights) && caseStudy.highlights.length > 0
      ? caseStudy.highlights
      : project.highlights;

  const highlights =
    rawHighlights?.filter(Boolean)?.length > 0
      ? rawHighlights.filter(Boolean)
      : [
          "Antarmuka responsif dan terstruktur untuk berbagai ukuran layar.",
          "Fokus pada kejelasan alur navigasi dan pengalaman pengguna.",
        ];

  const techStack = project.techStack?.filter(Boolean) ?? [];

  const techStackGroups = Array.isArray(project.techStackGroups)
    ? project.techStackGroups.filter(
        (g) => g && g.group && Array.isArray(g.items) && g.items.length > 0
      )
    : [];

  const firstGalleryItem =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery[0]
      : null;

  const mainImage =
    project.image ||
    (typeof firstGalleryItem === "string"
      ? firstGalleryItem
      : firstGalleryItem?.src || "");

  const projectDescription =
    project.description ||
    project.longDescription ||
    caseStudy.overview ||
    project.summary ||
    "";

  const renderHighlightsCard = (extraClass = "") => (
    <section
      className={`rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-7 ${extraClass}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
          Poin Utama Implementasi
        </h2>
        <span className="rounded-full bg-[var(--bg-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]">
          {highlights.length} Poin
        </span>
      </div>

      <ul className="mt-5 space-y-3.5 text-sm text-[var(--text-secondary)]">
        {highlights.map((item, idx) => (
          <li key={`${project.id}-hl-${idx}`} className="flex items-start gap-3">
            <FiCheckCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
            <span className="leading-relaxed text-[var(--text-primary)]/90">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <article className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pt-24">
      {/* Top Bar Navigasi Studi Kasus */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
        <button
          type="button"
          onClick={onBack}
          className="group/back inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-x-0.5 hover:border-amber-600/50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <FiArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5"
            aria-hidden="true"
          />
          <span>Kembali ke Portofolio</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <span
                key={`${project.id}-detail-${cat}`}
                className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Studi Kasus
            </span>
          )}
        </div>
      </div>

      {/* Header Judul, Ringkasan & Tombol Aksi */}
      <header className="mt-6 space-y-3.5">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--text-secondary)]">
          <span className="uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
            Studi Kasus Proyek
          </span>
          {project.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </>
          )}
          {project.role && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.role}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
          {project.title}
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {project.summary}
        </p>

        {(project.demoUrl || project.repoUrl) && (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="group/demo inline-flex cursor-pointer items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold text-stone-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>Kunjungi Demo</span>
                <FiArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <FiCode className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Repositori Kode</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Gambar Utama Proyek */}
      {mainImage && (
        <div className="group/hero mt-6 overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-2.5 transition-colors duration-200 hover:border-amber-600/35 sm:p-3">
          <div className="overflow-hidden rounded-2xl border border-[var(--border-hairline)]/70 bg-[var(--bg-canvas)]">
            <img
              src={mainImage}
              alt={`Pratinjau ${project.title}`}
              className="max-h-[480px] w-full object-cover transition-transform duration-400 ease-out group-hover/hero:scale-[1.015]"
            />
          </div>
        </div>
      )}

      {/* Deskripsi Detail Proyek di Bawah Foto */}
      {projectDescription && (
        <section className="mt-7 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-7">
          <div className="flex items-center gap-2.5 border-b border-[var(--border-hairline)] pb-3.5">
            <FiFileText
              className="h-4 w-4 text-amber-700 dark:text-amber-400"
              aria-hidden="true"
            />
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
              Deskripsi Proyek
            </h2>
          </div>

          <p className="mt-3.5 whitespace-pre-line text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {projectDescription}
          </p>
        </section>
      )}

      {/* Tantangan & Solusi dari caseStudy */}
      {(challenge || solution) && (
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {challenge && (
            <section className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                Latar Belakang & Tantangan
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {challenge}
              </p>
            </section>
          )}

          {solution && (
            <section className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-emerald-600/35 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                Pendekatan & Solusi
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {solution}
              </p>
            </section>
          )}
        </div>
      )}

      {/* Galeri Foto dengan Lightbox */}
      <ProjectGallery
        key={project.id}
        items={project.gallery}
        projectTitle={project.title}
      />

      {/* Poin Utama Implementasi & Teknologi Digunakan */}
      {techStackGroups.length > 0 ? (
        <div className="mt-7 space-y-7">
          {renderHighlightsCard()}

          <section className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
                Teknologi Digunakan
              </h2>
              <FiLayers
                className="h-4 w-4 text-amber-700 dark:text-amber-400"
                aria-hidden="true"
              />
            </div>

            {techStack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={`${project.id}-badge-${idx}`}
                    className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {techStackGroups.map((group, gIdx) => (
                <div
                  key={`${project.id}-group-${gIdx}`}
                  className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/55 p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400">
                      {String(gIdx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {group.group}
                    </h3>
                  </div>

                  <ul className="mt-3.5 space-y-2.5">
                    {group.items.map((item, iIdx) => {
                      const isObj = typeof item === "object" && item !== null;
                      const title = isObj ? item.name : String(item);
                      const desc = isObj ? item.detail : "";

                      return (
                        <li
                          key={`${project.id}-group-${gIdx}-item-${iIdx}`}
                          className="text-xs leading-relaxed sm:text-sm"
                        >
                          <span className="font-semibold text-[var(--text-primary)]">
                            {title}
                          </span>
                          {desc && (
                            <span className="text-[var(--text-secondary)]">
                              {" "}— {desc}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        (highlights.length > 0 || techStack.length > 0) && (
          <div className="mt-7 grid gap-6 md:grid-cols-12">
            {highlights.length > 0 &&
              renderHighlightsCard(
                techStack.length > 0 ? "md:col-span-7" : "md:col-span-12"
              )}

            {techStack.length > 0 && (
              <section
                className={`rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-7 ${
                  highlights.length > 0 ? "md:col-span-5" : "md:col-span-12"
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
                    Teknologi Digunakan
                  </h2>
                  <FiLayers
                    className="h-4 w-4 text-amber-700 dark:text-amber-400"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {techStack.map((tech, idx) => (
                    <span
                      key={`${project.id}-stack-${idx}`}
                      className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )
      )}

      {/* Navigasi Proyek Sebelumnya & Berikutnya */}
      {(prevProject || nextProject) && (
        <nav
          aria-label="Navigasi studi kasus lainnya"
          className="mt-10 grid gap-4 border-t border-[var(--border-hairline)] pt-7 sm:grid-cols-2"
        >
          {prevProject ? (
            <button
              type="button"
              onClick={() => onSelectProject?.(prevProject)}
              className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                <FiArrowLeft
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span>Proyek Sebelumnya</span>
              </span>
              <span className="mt-2 text-base font-bold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                {prevProject.title}
              </span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <button
              type="button"
              onClick={() => onSelectProject?.(nextProject)}
              className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] sm:justify-end">
                <span>Proyek Berikutnya</span>
                <FiArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 text-base font-bold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                {nextProject.title}
              </span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </nav>
      )}
    </article>
  );
}