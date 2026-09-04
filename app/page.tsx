import Image from "next/image";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import { techColor } from "../lib/techColor";
import PageBackground from "../components/PageBackground";
import SiteNav from "../components/SiteNav";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-10">
        <SiteNav />

        <header className="grid gap-10 border-b border-blueprint-line py-16 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-brass">
              Full-stack developer · Perak, Malaysia
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-paper sm:text-7xl lg:text-8xl">
              Software with a considered point of view.
            </h1>
          </div>

          <div className="border-l border-brass pl-5 text-base leading-7 text-slate sm:max-w-sm sm:text-lg">
            I build useful web applications—from operational dashboards to local discovery platforms—with Laravel at the core.
          </div>
        </header>

        <section aria-label="Profile" className="grid border-b border-blueprint-line sm:grid-cols-3">
          <div className="border-b border-blueprint-line py-5 sm:border-b-0 sm:pr-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Focus</p>
            <p className="mt-2 text-lg text-paper">Web applications</p>
          </div>
          <div className="border-b border-blueprint-line py-5 sm:border-b-0 sm:border-l sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Stack</p>
            <p className="mt-2 text-lg text-paper">Laravel · PHP · PostgreSQL</p>
          </div>
          <div className="py-5 sm:border-l sm:border-blueprint-line sm:pl-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Currently</p>
            <p className="mt-2 flex items-center gap-2 text-lg text-paper">
              <span className="h-2 w-2 rounded-full bg-brass" /> Open to opportunities
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28" aria-labelledby="work-heading">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">01—Selected work</p>
              <h2 id="work-heading" className="mt-2 font-display text-4xl tracking-[-0.03em] text-paper sm:text-5xl">
                Recent projects
              </h2>
            </div>
            <p className="hidden font-mono text-xs text-slate sm:block">
              {String(projects.length).padStart(2, "0")} records
            </p>
          </div>

          <div className="border-t border-blueprint-line">
            {projects.map((project, index) => {
              const hasImages = project.imageUrls.length > 0;

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group grid gap-6 border-b border-blueprint-line py-8 transition-colors hover:bg-paper/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass sm:grid-cols-[72px_1fr] sm:gap-8 sm:py-10"
                >
                  <span className="font-mono text-xs text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-3xl tracking-[-0.025em] text-paper transition-colors group-hover:text-brass sm:text-4xl">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-4 max-w-xl leading-7 text-slate">{project.description}</p>

                      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-paper" aria-label={`${project.title} technologies`}>
                        {project.techStack.map((tech: string) => (
                          <li key={tech} className={techColor(tech)}>
                            /{tech}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-7 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-slate transition-colors group-hover:text-brass">
                        View project <span aria-hidden="true">→</span>
                      </p>
                    </div>

                    {hasImages ? (
                      <div className="self-start overflow-hidden border border-blueprint-line bg-blueprint-line/20 p-1">
                        {project.imageUrls.length === 1 ? (
                          <figure className="relative aspect-[16/10] overflow-hidden bg-blueprint">
                            <Image
                              src={project.imageUrls[0]}
                              alt={`${project.title}, screen 1`}
                              fill
                              className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            />
                          </figure>
                        ) : (
                          <div className="grid h-52 grid-cols-[1.35fr_0.65fr] grid-rows-2 gap-1 sm:h-60">
                            {project.imageUrls.slice(0, 3).map((url: string, imageIndex: number) => (
                              <figure
                                key={url}
                                className={`relative overflow-hidden bg-blueprint ${imageIndex === 0 || project.imageUrls.length === 2 ? "row-span-2" : ""}`}
                              >
                                <Image
                                  src={url}
                                  alt={`${project.title}, screen ${imageIndex + 1}`}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                />
                              </figure>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-[16/8] self-start border border-blueprint-line bg-blueprint-line/10 p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
                        Project archive<br />Screens unavailable
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {projects.length === 0 && (
            <p className="border-t border-blueprint-line py-8 text-slate">No projects are available yet.</p>
          )}
        </section>

        <footer className="flex flex-col gap-3 border-t border-blueprint-line py-7 font-mono text-[11px] uppercase tracking-[0.15em] text-slate sm:flex-row sm:justify-between">
          <span>Portfolio · {projects.length} projects</span>
          <span>Laravel · React · Next.js</span>
        </footer>
      </div>
    </main>
  );
}
