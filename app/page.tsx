import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";

const projects = [
  {
    title: "Victory Football",
    description:
      "A football pitch management concept focused on booking flows, schedules, and a clear operator experience.",
    tags: ["Web application", "UX flow", "Management"],
    href: "https://github.com/PhanVinh2k6",
  },
  {
    title: "AI for CRM Research",
    description:
      "Research on applying artificial intelligence to customer relationship management at Vietnam Post in Thai Nguyen.",
    tags: ["AI", "CRM", "Research"],
    href: "https://github.com/PhanVinh2k6",
  },
  {
    title: "Personal Portfolio",
    description:
      "A fast, accessible, and maintainable portfolio built with Next.js, TypeScript, and a lightweight design system.",
    tags: ["Next.js", "TypeScript", "Accessibility"],
    href: "https://github.com/PhanVinh2k6/my-portfolio",
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML & CSS",
  "Tailwind CSS",
  "Python",
  "C / C#",
  "SQL",
  "Git & GitHub",
  "UI/UX thinking",
  "AI research",
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Phan Vinh homepage">
          PV<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">IT student · Web developer · AI learner</p>
            <h1 id="hero-title">
              Building useful digital experiences with <em>clarity.</em>
            </h1>
            <p className="hero-description">
              I&apos;m Phan Ha Thai Vinh, a second-year Information Technology student at ICTU. I enjoy turning ideas into clean interfaces, practical systems, and research-driven products.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View projects <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <a className="button button-secondary" href="mailto:contact@phanvinh.id.vn">
                Contact me
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="Profile summary">
            <div className="portrait-placeholder" aria-hidden="true">
              <span>PV</span>
            </div>
            <div className="availability">
              <span className="status-dot" aria-hidden="true" />
              Open to learning and collaboration
            </div>
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>Thai Nguyen, Vietnam</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>ICTU · Information Technology</dd>
              </div>
              <div>
                <dt>Current focus</dt>
                <dd>Web development & AI</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="section-number">01</p>
            <h2 id="about-title">About me</h2>
          </div>
          <div className="about-grid">
            <p className="lead">
              I care about code that is understandable, interfaces that feel natural, and products that solve a real problem.
            </p>
            <div className="about-copy">
              <p>
                My current learning path combines software development, system analysis, databases, and artificial intelligence. I use personal projects to practise planning, coding, testing, and presenting technical work clearly.
              </p>
              <p>
                Beyond development, I am interested in digital marketing and user experience because good software needs both technical quality and effective communication.
              </p>
              <a className="text-link" href="https://ictu.edu.vn" target="_blank" rel="noreferrer">
                Visit ICTU <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-number">02</p>
            <h2 id="projects-title">Selected projects</h2>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-index">0{index + 1}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  Explore project <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="section-number">03</p>
            <h2 id="skills-title">Skills & tools</h2>
          </div>
          <div className="skills-layout">
            <p className="lead">A growing toolkit for building, researching, and communicating digital products.</p>
            <ul className="skills-list">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">Have an idea or opportunity?</p>
          <h2 id="contact-title">Let&apos;s create something useful.</h2>
          <p>
            I&apos;m interested in student projects, internships, research collaboration, and practical web development opportunities.
          </p>
          <a className="button button-light" href="mailto:contact@phanvinh.id.vn">
            <Mail aria-hidden="true" size={18} /> Send an email
          </a>
        </section>
      </div>

      <footer className="site-footer">
        <div>
          <strong>Phan Vinh</strong>
          <span><MapPin aria-hidden="true" size={15} /> Thai Nguyen, Vietnam</span>
        </div>
        <div className="social-links" aria-label="Social links">
          <a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github aria-hidden="true" size={20} />
          </a>
          <a href="https://www.linkedin.com/in/vinh-phan-ha-thai-048726249/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin aria-hidden="true" size={20} />
          </a>
          <a href="mailto:contact@phanvinh.id.vn" aria-label="Email">
            <Mail aria-hidden="true" size={20} />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Phan Vinh. Built with Next.js.</p>
      </footer>
    </main>
  );
}
