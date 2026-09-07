import Image from "next/image";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import { techColor } from "../lib/techColor";
import PageBackground from "../components/PageBackground";
import SiteNav from "../components/SiteNav";

export const revalidate = 3600;

export default async function Home() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-10">
        <SiteNav />
        <header className="grid gap-10 border-b border-blueprint-line/80 py-16 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div><p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass">Full-stack developer · Perak, Malaysia</p><h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-[#f8fafc] sm:text-7xl lg:text-8xl">Software with a considered point of view.</h1></div>
          <p className="border-l-2 border-brass pl-5 text-base leading-7 text-[#d8e3ea] sm:max-w-sm sm:text-lg">I build useful web applications—from operational dashboards to local discovery platforms—with Laravel at the core.</p>
        </header>

        <section aria-label="Profile" className="grid border-b border-blueprint-line/80 sm:grid-cols-3"><ProfileItem label="Focus" value="Web applications" /><ProfileItem label="Stack" value="Laravel · PHP · PostgreSQL" bordered /><div className="py-5 sm:border-l sm:border-blueprint-line/80 sm:pl-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8cad6]">Currently</p><p className="mt-2 flex items-center gap-2 text-lg font-medium text-[#f8fafc]"><span className="h-2 w-2 rounded-full bg-brass" />Open to opportunities</p></div></section>

        <section className="py-20 sm:py-28" aria-labelledby="work-heading"><div className="mb-10 flex items-end justify-between gap-5"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brass">01—Selected work</p><h2 id="work-heading" className="mt-2 font-display text-4xl tracking-[-0.03em] text-[#f8fafc] sm:text-5xl">Recent projects</h2></div><p className="hidden font-mono text-xs font-medium text-[#b8cad6] sm:block">{String(projects.length).padStart(2, "0")} records</p></div>
          <div className="border-t border-blueprint-line/80">{projects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)}</div>
          {projects.length === 0 && <p className="border-t border-blueprint-line/80 py-8 text-[#c5d4dd]">No projects are available yet.</p>}
        </section>
        <footer className="flex flex-col gap-3 border-t border-blueprint-line/80 py-7 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[#b8cad6] sm:flex-row sm:justify-between"><span>Portfolio · {projects.length} projects</span><span>Laravel · React · Next.js</span></footer>
      </div>
    </main>
  );
}

function ProfileItem({ label, value, bordered = false }: { label: string; value: string; bordered?: boolean }) { return <div className={`border-b border-blueprint-line/80 py-5 sm:border-b-0 ${bordered ? "sm:border-l sm:border-blueprint-line/80 sm:px-6" : "sm:pr-6"}`}><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8cad6]">{label}</p><p className="mt-2 text-lg font-medium text-[#f8fafc]">{value}</p></div>; }
function ProjectRow({ project, index }: { project: { id: number; title: string; description: string; featured: boolean; techStack: string[]; imageUrls: string[] }; index: number }) {
  const hasImages = project.imageUrls.length > 0;
  return <Link href={`/projects/${project.id}`} className="group grid gap-6 border-b border-blueprint-line/80 py-8 transition hover:bg-white/[0.045] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass sm:grid-cols-[72px_1fr] sm:gap-8 sm:py-10"><span className="font-mono text-xs font-semibold text-brass">{String(index + 1).padStart(2, "0")}</span><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"><div><div className="flex flex-wrap items-baseline gap-x-3 gap-y-2"><h3 className="font-display text-3xl tracking-[-0.025em] text-[#f8fafc] transition group-hover:text-brass sm:text-4xl">{project.title}</h3>{project.featured && <span className="rounded-full border border-brass/40 bg-brass/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brass">Featured</span>}</div><p className="mt-4 max-w-xl leading-7 text-[#c5d4dd]">{project.description}</p><ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs font-medium text-[#f8fafc]" aria-label={`${project.title} technologies`}>{project.techStack.map((tech) => <li key={tech} className={techColor(tech)}>/ {tech}</li>)}</ul><p className="mt-7 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#c5d4dd] transition group-hover:text-brass">View project <span aria-hidden="true">→</span></p></div><Preview project={project} hasImages={hasImages} /></div></Link>;
}
function Preview({ project, hasImages }: { project: { title: string; imageUrls: string[] }; hasImages: boolean }) {
  if (!hasImages) return <div className="aspect-[16/8] self-start rounded-lg border border-dashed border-blueprint-line bg-blueprint/30 p-4 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#b8cad6]">Project archive<br />Screens unavailable</div>;
  if (project.imageUrls.length === 1) return <div className="self-start overflow-hidden rounded-lg border border-blueprint-line bg-blueprint/50 p-1"><figure className="relative aspect-[16/10] overflow-hidden rounded-[4px]"><Image src={project.imageUrls[0]} alt={`${project.title}, screen 1`} fill sizes="(max-width: 640px) 100vw, 700px" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></figure></div>;
  return <div className="grid h-52 grid-cols-[1.35fr_0.65fr] grid-rows-2 gap-1 self-start overflow-hidden rounded-lg border border-blueprint-line bg-blueprint/50 p-1 sm:h-60">{project.imageUrls.slice(0, 3).map((url, index) => <figure key={url} className={`relative overflow-hidden bg-blueprint ${index === 0 || project.imageUrls.length === 2 ? "row-span-2" : ""}`}><Image src={url} alt={`${project.title}, screen ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 350px" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></figure>)}</div>;
}
