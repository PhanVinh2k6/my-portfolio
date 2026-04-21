export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "Prisma", "API Design"],
  },
  {
    category: "AI & ML",
    skills: ["Machine Learning", "TensorFlow", "PyTorch", "Data Analysis", "NLP"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "Docker", "Vercel", "GitHub", "Linux"],
  },
];
