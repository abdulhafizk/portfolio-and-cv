import { useEffect } from "react";
import { FiX, FiExternalLink, FiCode, FiCheckCircle } from "react-icons/fi";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const highlights = project.caseStudy?.highlights?.filter(Boolean) ?? [];
  const techStack = project.techStack?.filter(Boolean) ?? [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/65 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-animate-in max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-8"
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              {project.category}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1.5 text-2xl font-bold tracking-tight text-[var(--text-primary)]"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-colors hover:border-amber-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <FiX className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Isi Studi Kasus */}
        <div className="mt-6 space-y-6">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {project.summary}
          </p>

          {project.caseStudy && (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.caseStudy.challenge && (
                <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 p-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Tantangan
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                    {project.caseStudy.challenge}
                  </p>
                </div>
              )}

              {project.caseStudy.solution && (
                <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 p-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Solusi
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                    {project.caseStudy.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {highlights.length > 0 && (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Poin Utama
              </h4>
              <ul className="mt-3 space-y-2">
                {highlights.map((item, idx) => (
                  <li
                    key={`${project.id}-hl-${idx}`}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                  >
                    <FiCheckCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {techStack.length > 0 && (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Teknologi Digunakan
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={`${project.id}-tech-${idx}`}
                    className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Aksi */}
        {(project.repoUrl || project.liveUrl) && (
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border-hairline)] pt-5">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <FiCode className="h-4 w-4" aria-hidden="true" />
                <span>Repositori</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300"
              >
                <span>Kunjungi Demo</span>
                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}