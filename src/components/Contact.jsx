import { useState } from "react";
import {
  FiSend,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiCheckCircle,
} from "react-icons/fi";
import { PROFILE_DATA } from "../data/portfolioData";
import Reveal from "./Reveal";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const validate = (values) => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Nama wajib diisi.";
    if (!values.email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Format email belum valid.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Pesan tidak boleh kosong.";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "Tuliskan pesan minimal 10 karakter.";
    }
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmittedMessage("");
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedMessage(
      `Terima kasih, ${formData.name.trim()}. Pesan Anda telah divalidasi untuk ${PROFILE_DATA.email}.`
    );
    onShowToast?.("Pesan berhasil divalidasi.");
    setFormData(INITIAL_FORM);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopied(true);
      onShowToast?.(`Email ${PROFILE_DATA.email} disalin.`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast?.("Gagal menyalin email.");
    }
  };

  const socials = PROFILE_DATA.socials?.filter((s) => s.name && s.url) ?? [];

  return (
    <section
      id="contact"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/55 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="space-y-6 lg:col-span-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                Kontak & Kolaborasi
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Mari mulai percakapan untuk{" "}
                <span className="font-editorial text-4xl font-normal italic text-amber-700 dark:text-amber-400 sm:text-5xl">
                  proyek berikutnya
                </span>
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Terbuka untuk peluang freelance, kolaborasi pengembangan web,
                maupun diskusi seputar desain antarmuka.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-600/40">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Email Langsung
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="text-sm font-semibold text-[var(--text-primary)] underline-offset-4 hover:underline"
                >
                  {PROFILE_DATA.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-amber-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {copied ? (
                    <>
                      <FiCheck
                        className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Jejaring & Portofolio Lain
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {socials.map((social, idx) => (
                    <a
                      key={`${social.name}-${idx}`}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <span>{social.name}</span>
                      <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 sm:p-9"
            >
              {submittedMessage && (
                <div
                  role="status"
                  className="modal-animate-in mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-900 dark:text-emerald-200"
                >
                  <FiCheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{submittedMessage}</span>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "error-name" : undefined}
                    className={`mt-2 w-full rounded-xl border bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-[var(--border-hairline)] focus:ring-amber-500"
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="error-name"
                      className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "error-email" : undefined}
                    className={`mt-2 w-full rounded-xl border bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-[var(--border-hairline)] focus:ring-amber-500"
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="error-email"
                      className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
                >
                  Subjek (Opsional)
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Contoh: Diskusi proyek website / kolaborasi"
                  className="mt-2 w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
                >
                  Pesan *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ceritakan kebutuhan, lini masa, atau hal yang ingin didiskusikan..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "error-message" : undefined}
                  className={`mt-2 w-full rounded-xl border bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-[var(--border-hairline)] focus:ring-amber-500"
                  }`}
                />
                {errors.message && (
                  <p
                    id="error-message"
                    className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300"
                >
                  <span>Kirim Pesan</span>
                  <FiSend className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}