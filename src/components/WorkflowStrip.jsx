import { FiLayout, FiCode, FiSmartphone, FiSliders } from "react-icons/fi";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Riset & Struktur",
    description: "Menyusun alur informasi, hierarki konten, dan wireframe yang jelas sebelum masuk ke visual.",
    Icon: FiLayout,
  },
  {
    step: "02",
    title: "Sistem Antarmuka",
    description: "Menjaga konsistensi tipografi, warna, jarak, dan komponen UI agar mudah diskalakan.",
    Icon: FiSliders,
  },
  {
    step: "03",
    title: "Kode React Modular",
    description: "Menerjemahkan desain menjadi komponen React dan Tailwind CSS yang bersih serta terstruktur.",
    Icon: FiCode,
  },
  {
    step: "04",
    title: "Responsif & Aksesibel",
    description: "Memastikan tampilan tetap nyaman di ponsel maupun desktop dengan fokus dan kontras yang terjaga.",
    Icon: FiSmartphone,
  },
];

export default function WorkflowStrip() {
  return (
    <section
      aria-label="Alur Kerja"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Pendekatan Kerja
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Dari ide menjadi{" "}
              <span className="font-editorial text-3xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-4xl">
                produk siap pakai
              </span>
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Empat langkah utama dalam merancang & membangun antarmuka
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map(({ step, title, description, Icon }) => (
            <div
              key={step}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-editorial text-2xl italic text-amber-700 dark:text-amber-400">
                    {step}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--bg-subtle)] text-[var(--text-primary)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}