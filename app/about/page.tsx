import PageBackground from "../../components/PageBackground";
import SiteNav from "../../components/SiteNav";

const experience = [
  {
    organisation: "Majlis Daerah Kerian (MDK)",
    period: "Mar 2023 – Sep 2023",
    description:
      "Built an SSO licensing system (Elesen) in PHP/MySQL for a local government agency, including PDF generation with TCPDF and interfaces for premises registration.",
  },
  {
    organisation: "Pusat Transformasi Digital (PTD), USM",
    period: "Oct 2025 – Jan 2026",
    description:
      "Developed AI-literacy training curriculum, delivered workshops, and redesigned the e-learning platform's WordPress backend.",
  },
];

const education = [
  ["Bachelor of Computer Science (Hons)", "UiTM Jasin", "Oct 2023 – Mar 2026"],
  ["Diploma in Computer Science", "UiTM Arau", "Mar 2021 – Sep 2023"],
];

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-10">
        <SiteNav />

        <header className="grid gap-10 border-b border-blueprint-line py-16 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-brass">02—About</p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-paper sm:text-7xl">
              Building systems people can rely on.
            </h1>
          </div>
          <p className="border-l border-brass pl-5 text-base leading-7 text-slate sm:max-w-sm sm:text-lg">
            Full-stack Laravel developer based in Perak, Malaysia.
          </p>
        </header>

        <section className="grid gap-6 border-b border-blueprint-line py-14 sm:grid-cols-[72px_1fr] sm:gap-8 sm:py-20">
          <p className="font-mono text-xs text-brass">01</p>
          <p className="max-w-3xl text-lg leading-8 text-paper sm:text-xl">
            Full-stack web developer with hands-on Laravel experience across independent portfolio projects, including multi-role clinic and salon management systems with real-time scheduling, booking conflict detection, and automated notification workflows. I also bring practical experience building a production PHP/MySQL licensing system for a local government agency and delivering AI-literacy training at Universiti Sains Malaysia.
          </p>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="experience-heading">
          <div className="mb-10 flex items-end justify-between border-b border-blueprint-line pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Experience</p>
              <h2 id="experience-heading" className="mt-2 font-display text-4xl tracking-[-0.03em] text-paper sm:text-5xl">Where I&apos;ve contributed</h2>
            </div>
            <span className="hidden font-mono text-xs text-slate sm:block">02 roles</span>
          </div>

          <div className="border-t border-blueprint-line">
            {experience.map((role, index) => (
              <article key={role.organisation} className="grid gap-5 border-b border-blueprint-line py-8 sm:grid-cols-[72px_1fr_auto] sm:gap-8">
                <span className="font-mono text-xs text-brass">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.02em] text-paper">{role.organisation}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-slate">{role.description}</p>
                </div>
                <time className="font-mono text-xs text-slate sm:pt-1">{role.period}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-t border-blueprint-line py-16 sm:grid-cols-[1fr_1.2fr] sm:py-24" aria-labelledby="education-heading">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Education</p>
            <h2 id="education-heading" className="mt-2 font-display text-4xl tracking-[-0.03em] text-paper">Foundation</h2>
          </div>
          <div className="border-t border-blueprint-line">
            {education.map(([degree, school, period]) => (
              <article key={degree} className="grid gap-2 border-b border-blueprint-line py-6 sm:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-lg font-medium text-paper">{degree}</h3>
                  <p className="mt-1 text-slate">{school}</p>
                </div>
                <time className="font-mono text-xs text-slate sm:pt-1">{period}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-blueprint-line py-16 sm:py-24" aria-labelledby="contact-heading">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Contact</p>
          <h2 id="contact-heading" className="mt-2 font-display text-4xl tracking-[-0.03em] text-paper sm:text-5xl">Let&apos;s work together.</h2>
          <div className="mt-10 grid border-t border-blueprint-line sm:grid-cols-3">
            <a href="mailto:apizisapiz@gmail.com" className="group border-b border-blueprint-line py-5 transition-colors hover:text-brass sm:border-b-0 sm:pr-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Email</p>
              <p className="mt-2 break-all text-paper transition-colors group-hover:text-brass">apizisapiz@gmail.com ↗</p>
            </a>
            <a href="https://github.com/Apiz1" target="_blank" rel="noreferrer" className="group border-b border-blueprint-line py-5 transition-colors hover:text-brass sm:border-b-0 sm:border-l sm:px-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">GitHub</p>
              <p className="mt-2 text-paper transition-colors group-hover:text-brass">github.com/Apiz1 ↗</p>
            </a>
            <a href="https://linkedin.com/in/muhd-hafiz-644660380" target="_blank" rel="noreferrer" className="group py-5 transition-colors hover:text-brass sm:border-l sm:border-blueprint-line sm:pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">LinkedIn</p>
              <p className="mt-2 text-paper transition-colors group-hover:text-brass">View profile ↗</p>
            </a>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-blueprint-line py-7 font-mono text-[11px] uppercase tracking-[0.15em] text-slate sm:flex-row sm:justify-between">
          <span>About · Contact</span>
          <span>Laravel · PHP · PostgreSQL</span>
        </footer>
      </div>
    </main>
  );
}
