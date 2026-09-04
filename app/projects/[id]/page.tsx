import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { techColor } from "../../../lib/techColor";
import PageBackground from "../../../components/PageBackground";
import SiteNav from "../../../components/SiteNav";

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

        <Link href="/" className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-slate transition-colors hover:text-brass">
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header className="grid gap-10 border-b border-blueprint-line py-12 sm:py-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-brass">
              Project file {String(project.id).padStart(2, "0")}
            </p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-paper sm:text-7xl">{project.title}</h1>
              {project.featured && <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">Featured</span>}
            </div>
          </div>
          <p className="border-l border-brass pl-5 text-base leading-7 text-slate sm:text-lg">{project.description}</p>
        </header>

        {images.length > 0 && (
          <section className="py-12 sm:py-16" aria-labelledby="screens-heading">
            <div className="mb-5 flex items-center justify-between">
              <h2 id="screens-heading" className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Screens</h2>
              <span className="font-mono text-xs text-slate">{String(images.length).padStart(2, "0")} images</span>
            </div>
            <div className="overflow-hidden border border-blueprint-line bg-blueprint-line/20 p-1">
              {images.length === 1 ? (
                <figure className="relative aspect-[16/9] overflow-hidden bg-blueprint">
                  <Image src={images[0]} alt={project.title + ", screen 1"} fill className="object-cover" priority />
                </figure>
              ) : (
                <div className="grid h-[300px] grid-cols-[1.4fr_0.6fr] grid-rows-2 gap-1 sm:h-[430px]">
                  {images.map((url: string, index: number) => (
                    <figure key={url} className={"relative overflow-hidden bg-blueprint " + (index === 0 || images.length === 2 ? "row-span-2" : "")}>
                      <Image src={url} alt={project.title + ", screen " + (index + 1)} fill className="object-cover transition duration-500 hover:scale-[1.02]" priority={index === 0} />
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="grid gap-10 border-t border-blueprint-line py-14 sm:grid-cols-[0.7fr_1.3fr] sm:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Technology</p>
            <h2 className="mt-2 font-display text-4xl tracking-[-0.03em] text-paper">Built with</h2>
          </div>
          <ul className="grid border-t border-blueprint-line sm:grid-cols-2">
            {project.techStack.map((tech: string, index: number) => (
              <li key={tech} className="flex items-center gap-3 border-b border-blueprint-line py-4 font-mono text-sm text-paper">
                <span className="text-brass">{String(index + 1).padStart(2, "0")}</span>
                <span className={techColor(tech)}>{tech}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-blueprint-line py-14 sm:py-20" aria-labelledby="links-heading">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Links</p>
          <h2 id="links-heading" className="mt-2 font-display text-4xl tracking-[-0.03em] text-paper">Explore the project</h2>

          {project.projectUrl || project.githubUrl ? (
            <div className="mt-10 grid border-t border-blueprint-line sm:grid-cols-2">
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noreferrer" className="group border-b border-blueprint-line py-5 transition-colors hover:text-brass sm:border-b-0 sm:pr-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Live site</p>
                  <p className="mt-2 text-lg text-paper transition-colors group-hover:text-brass">Visit project ↗</p>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="group border-b border-blueprint-line py-5 transition-colors hover:text-brass sm:border-b-0 sm:border-l sm:pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Repository</p>
                  <p className="mt-2 text-lg text-paper transition-colors group-hover:text-brass">View source ↗</p>
                </a>
              )}
            </div>
          ) : (
            <p className="mt-8 border-l border-brass pl-5 text-slate">This is a private portfolio project. A walkthrough is available on request.</p>
          )}
        </section>

        <footer className="flex flex-col gap-3 border-t border-blueprint-line py-7 font-mono text-[11px] uppercase tracking-[0.15em] text-slate sm:flex-row sm:justify-between">
          <span>Project details · {project.title}</span>
          <span>{project.techStack.slice(0, 3).join(" · ")}</span>
        </footer>
      </div>
    </main>
  );
}
