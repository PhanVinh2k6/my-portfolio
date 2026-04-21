import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-accent font-medium mb-3">{project.description}</p>

      <p className="text-sm text-muted-foreground mb-4">{project.problem}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-muted-foreground mb-2">Role: {project.role}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-border">
        {project.links.github && (
          <Link
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:underline"
          >
            GitHub
          </Link>
        )}
        {project.links.live && (
          <Link
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:underline"
          >
            Live Demo
          </Link>
        )}
        {project.links.case && (
          <Link
            href={project.links.case}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:underline"
          >
            Case Study
          </Link>
        )}
      </div>
    </article>
  );
}
