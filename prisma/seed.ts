import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        title: "11 Hair Studio",
        description:
          "Salon booking management system with three roles (Admin, Staff, Customer). Features real-time booking conflict detection, a two-table earnings architecture, Cloudflare Turnstile CAPTCHA, and automated email notifications via Laravel Mailable.",
        techStack: ["Laravel", "MySQL", "Cloudflare Turnstile"],
        imageUrls: [
          "/projects/hair-studio-1.png",
          "/projects/hair-studio-2.png",
          "/projects/hair-studio-3.png",
        ],
        projectUrl: null,
        githubUrl: null,
        featured: true,
      },
      {
        title: "SmileCare: Dental Management System",
        description:
          "Architected a multi-role (admin/staff/doctor) clinic management platform from a 12+ table ERD, with role-based access control. Features a conflict-aware appointment booking engine with double-booking prevention, doctor leave validation, dynamic AJAX time-slot generation, and a full queue workflow (waiting to called to serving to done/skipped). Includes medical records, prescriptions, and printable appointment letters.",
        techStack: ["Laravel 12", "Jetstream", "Livewire", "PostgreSQL"],
        imageUrls: [
          "/projects/dental-clinic-1.png",
          "/projects/dental-clinic-2.png",
          "/projects/dental-clinic-3.png",
        ],
        projectUrl: null,
        githubUrl: null,
        featured: true,
      },
      {
        title: "GymFinder.My: Gym Directory & Search Platform",
        description:
          "A Perak-focused gym directory built on a 20+ table PostgreSQL schema, supporting three roles: user, gym owner, and super admin. Features a gym owner registration and admin approval workflow with approve, reject, and suspend actions. Fully containerized with Docker (Laravel Sail) running under WSL Ubuntu, with a React front end served via Inertia.js.",
        techStack: [
          "Laravel 12",
          "React (Inertia.js)",
          "Tailwind CSS",
          "PostgreSQL",
          "Docker (Laravel Sail)",
          "WSL Ubuntu",
        ],
        imageUrls: [
          "/projects/gymfinder-1.png",
          "/projects/gymfinder-2.png",
          "/projects/gymfinder-3.png",
        ],
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
