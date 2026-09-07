import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { techColor } from "../../../lib/techColor";
import PageBackground from "../../../components/PageBackground";
import SiteNav from "../../../components/SiteNav";
import type { Metadata } from "next";
import ProjectGallery from "../../../components/ProjectGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) return { title: "Project not found — Apiz" };
  return {
    title: `${project.title} — Apiz`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();
  const images = project.imageUrls.slice(0, 3);


  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-10">
        <SiteNav />
        <Link href="/" className="mt-10 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#c5d4dd] transition hover:text-brass"><span aria-hidden="true">←</span>All projects</Link>

        <header className="grid gap-10 border-b border-blueprint-line/80 py-12 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div><p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass">Project file {String(project.id).padStart(2, "0")}</p><div className="flex flex-wrap items-baseline gap-x-4 gap-y-2"><h1 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-[#f8fafc] sm:text-7xl">{project.title}</h1>{project.featured && <span className="rounded-full border border-brass/40 bg-brass/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brass">Featured</span>}</div></div>
          <p className="border-l-2 border-brass pl-5 text-base leading-7 text-[#d8e3ea] sm:text-lg">{project.description}</p>
        </header>

        {images.length > 0 && (
          <section className="py-12 sm:py-16" aria-labelledby="screens-heading">
            <SectionHeading
              id="screens-heading"
              eyebrow="Screens"
              title="A closer look"
              count={`${String(images.length).padStart(2, "0")} images`}
            />
            <ProjectGallery images={images} title={project.title} />
          </section>
        )}

        <section className="grid gap-10 border-t border-blueprint-line/80 py-14 sm:grid-cols-[0.7fr_1.3fr] sm:py-20"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass">Technology</p><h2 className="mt-2 font-display text-4xl tracking-[-0.03em] text-[#f8fafc]">Built with</h2><p className="mt-4 max-w-xs text-sm leading-6 text-[#c5d4dd]">A focused stack chosen for the project’s practical needs.</p></div><ul className="grid overflow-hidden rounded-xl border border-blueprint-line/80 bg-blueprint/30 sm:grid-cols-2">{project.techStack.map((tech: string, index: number) => <li key={tech} className="flex items-center gap-3 border-b border-blueprint-line/80 px-4 py-4 font-mono text-sm font-medium text-[#f8fafc] last:border-b-0 sm:odd:border-r sm:even:border-r-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"><span className="text-brass">{String(index + 1).padStart(2, "0")}</span><span className={techColor(tech)}>{tech}</span></li>)}</ul></section>

        <section className="border-t border-blueprint-line/80 py-14 sm:py-20" aria-labelledby="links-heading"><SectionHeading id="links-heading" eyebrow="Links" title="Explore the project" />{project.projectUrl || project.githubUrl ? <div className="mt-8 grid gap-3 sm:grid-cols-2">{project.projectUrl && <ProjectLink href={project.projectUrl} label="Live site" text="Visit project" />}{project.githubUrl && <ProjectLink href={project.githubUrl} label="Repository" text="View source" />}</div> : <p className="mt-8 max-w-xl border-l-2 border-brass pl-5 text-base leading-7 text-[#d8e3ea]">This is a private portfolio project. A walkthrough is available on request.</p>}</section>

        <footer className="flex flex-col gap-3 border-t border-blueprint-line/80 py-7 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[#b8cad6] sm:flex-row sm:justify-between"><span>Project details · {project.title}</span><span>{project.techStack.slice(0, 3).join(" · ")}</span></footer>
      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title, count, id }: { eyebrow: string; title: string; count?: string; id: string }) { return <div className="flex items-end justify-between gap-4"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass">{eyebrow}</p><h2 id={id} className="mt-2 font-display text-4xl tracking-[-0.03em] text-[#f8fafc]">{title}</h2></div>{count && <span className="font-mono text-xs font-medium text-[#b8cad6]">{count}</span>}</div>; }
function ProjectLink({ href, label, text }: { href: string; label: string; text: string }) { return <a href={href} target="_blank" rel="noreferrer" className="group rounded-xl border border-blueprint-line/80 bg-blueprint/35 p-5 transition hover:border-brass/70 hover:bg-blueprint/55"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8cad6]">{label}</p><p className="mt-3 text-lg font-semibold text-[#f8fafc] transition group-hover:text-brass">{text} <span aria-hidden="true">↗</span></p></a>; }
