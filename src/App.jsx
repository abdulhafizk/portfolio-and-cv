import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Contact from "./components/Contact";
import BackToTop from "./components/BackToTop";
import { PROFILE_DATA, PROJECTS_DATA } from "./data/portfolioData";

const THEME_STORAGE_KEY = "portfolio-theme-preference";
const SECTION_IDS = ["about", "skills", "achievements", "projects", "contact"];

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    } catch {
      return false;
    }
  });

  const [activeSection, setActiveSection] = useState("about");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Abaikan jika penyimpanan browser tidak tersedia
    }
  }, [isDark]);

  // Sinkronkan hash URL saat membuka/menutup halaman studi kasus
  const handleSelectProject = useCallback((project) => {
    if (!project) return;
    setSelectedProject(project);
    if (project.id) {
      window.location.hash = `project-${project.id}`;
    }
  }, []);

  const handleBackFromProject = useCallback(() => {
    setSelectedProject(null);
    if (window.location.hash.startsWith("#project-")) {
      window.history.replaceState(null, "", "#projects");
    }
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 40);
    });
  }, []);

  const handleNavigateSection = useCallback(
    (sectionId) => {
      const scrollToTarget = () => {
        if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (selectedProject) {
        setSelectedProject(null);
        if (window.location.hash.startsWith("#project-")) {
          window.history.replaceState(null, "", `#${sectionId}`);
        }
        requestAnimationFrame(() => {
          setTimeout(scrollToTarget, 60);
        });
        return;
      }

      scrollToTarget();
    },
    [selectedProject]
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#project-")) {
        const id = hash.replace("#project-", "");
        const found = PROJECTS_DATA.find((p) => String(p.id) === id) ?? null;
        setSelectedProject(found);
      } else {
        setSelectedProject(null);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#project-")) {
        const id = hash.replace("#project-", "");
        const found = PROJECTS_DATA.find((p) => String(p.id) === id) ?? null;
        setSelectedProject(found);
      } else {
        setSelectedProject(null);
      }
    };

    onPopState();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (selectedProject) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedProject]);

  const showToast = useCallback((message) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(""), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const currentIndex = selectedProject
    ? PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id)
    : -1;
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < PROJECTS_DATA.length - 1
      ? PROJECTS_DATA[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar
        activeSection={selectedProject ? "projects" : activeSection}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onNavigateSection={handleNavigateSection}
      />

      <main>
        {selectedProject ? (
          <ProjectDetailPage
            project={selectedProject}
            onBack={handleBackFromProject}
            onSelectProject={handleSelectProject}
            prevProject={prevProject}
            nextProject={nextProject}
          />
        ) : (
          <>
            <Hero onShowToast={showToast} />
            <About />
            <Skills />
            <Achievements />
            <Projects onSelectProject={handleSelectProject} />
            <Contact onShowToast={showToast} />
          </>
        )}
      </main>

      <footer className="border-t border-[var(--border-hairline)] py-8 text-center text-xs text-[var(--text-secondary)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {PROFILE_DATA.name}. Dibuat dengan React
            & Tailwind CSS.
          </p>
          <p>{PROFILE_DATA.location}</p>
        </div>
      </footer>

      <BackToTop />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="modal-animate-in fixed bottom-5 right-5 z-50 rounded-2xl border border-[var(--border-hairline)] bg-stone-900 px-4 py-3 text-xs font-semibold text-white shadow-lg dark:bg-stone-100 dark:text-stone-950"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}