import { PrismaClient } from "../app/generated/prisma/client.ts";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        title: "11 Hair Studio",
        description: "Salon booking management system with three roles (Admin, Staff, Customer). Features real-time booking conflict detection, a two-table earnings architecture, Cloudflare Turnstile CAPTCHA, and automated email notifications via Laravel Mailable.",
        techStack: ["Laravel", "Jetstream", "MySQL", "Bootstrap", "JavaScript"],
        imageUrls: ["/projects/hair-studio-1.png", "/projects/hair-studio-2.png", "/projects/hair-studio-3.png"],
        projectUrl: null,
        githubUrl: null,
        featured: true,
      },
      {
        title: "Dental Clinic Management System",
        description: "Multi-role dental clinic platform (Admin, Staff, Doctor) with appointment booking, queue management, medical records, prescriptions, and role-scoped dashboards.",
        techStack: ["Laravel", "Livewire", "PostgreSQL", "Skydash Bootstrap"],
        imageUrls: [],
        projectUrl: null,
        githubUrl: null,
        featured: true,
      },
      {
        title: "GymFinder.My",
        description: "Gym directory and search platform scoped to Perak, Malaysia. Lets users search gyms by location, view ratings and details, and lets gym owners register and manage their own listings.",
        techStack: ["Laravel", "Inertia.js", "React", "PostgreSQL"],
        imageUrls: [],
        projectUrl: null,
        githubUrl: null,
        featured: true,
      },
    ],
  });
  console.log("Seeded 3 projects.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
