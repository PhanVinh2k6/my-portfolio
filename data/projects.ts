export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  role: string;
  tech: string[];
  image?: string;
  links: {
    github?: string;
    live?: string;
    case?: string;
  };
}

export const projects: Project[] = [
  {
    id: "victory-football",
    title: "Victory Football",
    description: "Pitch Management System",
    problem: "Football field managers needed a unified booking and management platform for multiple pitches across different locations.",
    role: "Full-Stack Developer",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    links: {
      github: "https://github.com/PhanVinh2k6",
      live: "#",
    },
  },
  {
    id: "crm-ai-research",
    title: "CRM AI Research",
    description: "Vietnam Post Integration",
    problem: "Needed intelligent CRM system integrated with Vietnam Post logistics for seamless order and delivery tracking.",
    role: "AI Engineer & Backend Developer",
    tech: ["Python", "FastAPI", "Machine Learning", "React", "PostgreSQL"],
    links: {
      github: "https://github.com/PhanVinh2k6",
      case: "#",
    },
  },
  {
    id: "system-design",
    title: "System Analysis & Design",
    description: "Architecture Framework",
    problem: "Complex enterprise systems require careful analysis and scalable architecture planning.",
    role: "Systems Architect",
    tech: ["System Design", "Architecture", "Database Design", "Documentation"],
    links: {
      case: "#",
    },
  },
  {
    id: "ai-experiments",
    title: "AI Research Lab",
    description: "Experimental AI Projects",
    problem: "Exploring cutting-edge AI applications for real-world problem solving.",
    role: "AI Researcher",
    tech: ["TensorFlow", "PyTorch", "Python", "Data Science", "ML Engineering"],
    links: {
      github: "https://github.com/PhanVinh2k6",
    },
  },
];
