import { useState } from "react";
import {
  FiSend,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiCheckCircle,
  FiAlertCircle,
  FiPhone,
} from "react-icons/fi";
import { PROFILE_DATA } from "../data/portfolioData";
import Reveal from "./Reveal";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

function normalizePhoneDigits(phone = "") {
  return String(phone).replace(/[^\d]/g, "");
}

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [statusBanner, setStatusBanner] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = PROFILE_DATA?.email || "";
  const phone = PROFILE_DATA?.phone || "";
  const phoneDigits = normalizePhoneDigits(phone);
  const phoneHref =
    PROFILE_DATA?.whatsappUrl ||
    (phoneDigits ? `https://wa.me/${phoneDigits}` : `tel:${phoneDigits}`);

  const socials = Array.isArray(PROFILE_DATA?.socials)
    ? PROFILE_DATA.socials.filter((s) => s?.name && s?.url)
    : [];

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
    if (statusBanner) setStatusBanner(null);
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatusBanner({
        type: "error",
        text: "VITE_WEB3FORMS_ACCESS_KEY belum diatur di file .env.",
      });
      onShowToast?.("Konfigurasi pengiriman pesan belum lengkap.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusBanner(null);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject:
          formData.subject.trim() ||
          `Pesan Portofolio dari ${formData.name.trim()}`,
        message: formData.message.trim(),
        from_name: PROFILE_DATA?.name || "Portfolio Contact Form",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        const successText = `Terima kasih, ${formData.name.trim()}. Pesan Anda telah terkirim${
          email ? ` ke ${email}` : ""
        }.`;
        setStatusBanner({ type: "success", text: successText });
        onShowToast?.("Pesan berhasil dikirim.");
        setFormData(INITIAL_FORM);
      } else {
        setStatusBanner({
          type: "error",
          text:
            data?.message ||
            "Pesan gagal dikirim. Silakan coba lagi atau hubungi via email langsung.",
        });
        onShowToast?.("Gagal mengirim pesan.");
      }
    } catch {
      setStatusBanner({
        type: "error",
        text: "Terjadi gangguan jaringan saat mengirim pesan. Silakan coba lagi.",
      });
      onShowToast?.("Koneksi terganggu saat mengirim pesan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      onShowToast?.(`Email ${email} disalin.`);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      onShowToast?.("Gagal menyalin email.");
    }
  };

  const handleCopyPhone = async () => {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      onShowToast?.(`Nomor ${phone} disalin.`);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      onShowToast?.("Gagal menyalin nomor telepon.");
    }
  };

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

            <div className="space-y-3.5">
              {email && (
                <div className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 transition-colors duration-200 hover:border-amber-600/35 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Email Langsung
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-[var(--text-primary)] underline-offset-4 transition-colors hover:text-amber-700 hover:underline dark:hover:text-amber-400"
                    >
                      {email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-amber-600/50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      {copiedEmail ? (
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
              )}

              {phone && (
                <div className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 transition-colors duration-200 hover:border-amber-600/35 sm:p-6">
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    <FiPhone
                      className="h-3 w-3 text-amber-700 dark:text-amber-400"
                      aria-hidden="true"
                    />
                    <span>Telepon / WhatsApp</span>
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={phoneHref}
                      target={phoneHref.startsWith("http") ? "_blank" : undefined}
                      rel={phoneHref.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm font-semibold text-[var(--text-primary)] underline-offset-4 transition-colors hover:text-amber-700 hover:underline dark:hover:text-amber-400"
                    >
                      {phone}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-amber-600/50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      {copiedPhone ? (
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
              )}
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
                      className="group/social inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-600/50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <span>{social.name}</span>
                      <FiArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-200 hover:border-amber-600/35 sm:p-9"
            >
              <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                    Formulir Pesan
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                    Kirim detail proyek atau pertanyaan
                  </h3>
                </div>
                <span className="text-[11px] text-[var(--text-secondary)]">
                  Wajib diisi bertanda *
                </span>
              </div>

              {statusBanner && (
                <div
                  role="status"
                  className={`modal-animate-in mb-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
                    statusBanner.type === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-900 dark:text-rose-200"
                  }`}
                >
                  {statusBanner.type === "success" ? (
                    <FiCheckCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <FiAlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400"
                      aria-hidden="true"
                    />
                  )}
                  <span>{statusBanner.text}</span>
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
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "error-name" : undefined}
                    className={`mt-2 w-full rounded-2xl border bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/55 transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 ${
                      errors.name
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-[var(--border-hairline)] hover:border-amber-600/35 focus:border-amber-500/60 focus:ring-amber-500/40"
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
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "error-email" : undefined}
                    className={`mt-2 w-full rounded-2xl border bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/55 transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 ${
                      errors.email
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-[var(--border-hairline)] hover:border-amber-600/35 focus:border-amber-500/60 focus:ring-amber-500/40"
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
                  disabled={isSubmitting}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Contoh: Diskusi proyek website / kolaborasi"
                  className="mt-2 w-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/55 transition-colors duration-200 hover:border-amber-600/35 focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-60"
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
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ceritakan kebutuhan, lini masa, atau hal yang ingin didiskusikan..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "error-message" : undefined}
                  className={`mt-2 w-full rounded-2xl border bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/55 transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 ${
                    errors.message
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-[var(--border-hairline)] hover:border-amber-600/35 focus:border-amber-500/60 focus:ring-amber-500/40"
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

              <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[var(--border-hairline)] pt-5 sm:flex-row sm:items-center">
                <p className="text-xs text-[var(--text-secondary)]">
                  {isSubmitting
                    ? "Sedang mengirim pesan..."
                    : "Pesan akan langsung diteruskan ke email tujuan."}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group/submit inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300"
                >
                  <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</span>
                  <FiSend
                    className="h-4 w-4 transition-transform duration-200 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}