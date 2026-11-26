import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { PROJECTS_DATA, PROJECT_CATEGORIES } from "../data/portfolioData";
import Reveal from "./Reveal";

export function getProjectCategories(project) {
  if (!project) return [];
  if (Array.isArray(project.categories)) {
    return project.categories.map((c) => String(c).trim()).filter(Boolean);
  }
  if (typeof project.category === "string" && project.category.trim()) {
    return [project.category.trim()];
  }
  return [];
}

function getProjectThumbnail(project) {
  if (!project) return "";
  if (typeof project.image === "string" && project.image.trim()) {
    return project.image.trim();
  }
  if (Array.isArray(project.gallery) && project.gallery.length > 0) {
    const first = project.gallery[0];
    if (typeof first === "string") return first.trim();
    if (first?.src) return String(first.src).trim();
  }
  return "";
}

export default function Projects({ onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Semua") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((project) =>
      getProjectCategories(project).includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/45 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-3 lg:max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Karya & Studi Kasus
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Proyek pilihan yang{" "}
              <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
                dirancang dengan tujuan
              </span>
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter kategori proyek"
            className="flex flex-wrap items-center gap-2 lg:max-w-xl lg:justify-end"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:-translate-y-0.5 hover:border-amber-500/40 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const categories = getProjectCategories(project);
            const techStack = project.techStack?.filter(Boolean) ?? [];
            const numberLabel = String(index + 1).padStart(2, "0");
            const thumbnail = getProjectThumbnail(project);

            return (
              <Reveal
                key={project.id || `proj-${index}`}
                delay={index * 80}
                as="article"
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/45"
              >
                <div>
                  {thumbnail ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
                      <img
                        src={thumbnail}
                        alt={`Thumbnail ${project.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/65 via-black/25 to-transparent p-4">
                        <span className="rounded-full bg-black/55 px-2.5 py-0.5 font-editorial text-sm italic text-white backdrop-blur-xs">
                          {numberLabel}
                        </span>
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {categories.map((cat) => (
                            <span
                              key={`${project.id}-${cat}`}
                              className="rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-xs"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex min-h-[210px] flex-col justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]/65 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-editorial text-lg italic text-[var(--text-secondary)]">
                          {numberLabel}
                        </span>

                        <div className="flex flex-wrap justify-end gap-1.5">
                          {categories.map((cat) => (
                            <span
                              key={`${project.id}-${cat}`}
                              className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 text-[11px] font-semibold text-[var(--text-primary)]"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="mt-8 font-editorial text-2xl italic leading-snug text-[var(--text-primary)] transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </p>
                    </div>
                  )}

                  <div className="p-6">
                    {categories.length > 0 && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                        {categories.join(" · ")}
                      </p>
                    )}

                    <h3 className="mt-2 text-lg font-bold text-[var(--text-primary)]">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.summary}
                    </p>

                    {techStack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {techStack.map((tech, tIdx) => (
                          <span
                            key={`${project.id}-tech-${tIdx}`}
                            className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[var(--border-hairline)] px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onSelectProject?.(project)}
                    className="inline-flex w-full cursor-pointer items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:text-amber-400"
                  >
                    <span>Baca Studi Kasus</span>
                    <FiArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}