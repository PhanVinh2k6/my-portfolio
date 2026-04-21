"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { projects } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { blogPosts } from "@/data/blog";

export default function Home() {
  const handleSmoothScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6 smooth-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight text-neutral-900 dark:text-white">
            Hi, I&apos;m <span className="text-red-600">Phan Vinh</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 text-balance smooth-slide-up" style={{ animationDelay: "0.1s" }}>
            Full-stack developer, AI researcher, and creative problem solver from Vietnam.
          </p>
          <div className="flex gap-4 justify-center flex-wrap smooth-slide-up" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={handleSmoothScroll("#projects")}
              className="btn-primary"
            >
              View My Work
            </button>
            <button
              onClick={handleSmoothScroll("#contact")}
              className="btn-secondary"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50 smooth-fade-in">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-white">About Me</h2>
          <div className="space-y-6 text-neutral-600 dark:text-neutral-300">
            <p className="smooth-slide-up" style={{ animationDelay: "0.05s" }}>
              I&apos;m a second-year IT student at ICTU (Thai Nguyen), passionate about building
              exceptional digital experiences. My journey combines web development expertise with
              a deep interest in artificial intelligence and system design.
            </p>
            <p className="smooth-slide-up" style={{ animationDelay: "0.1s" }}>
              I specialize in creating full-stack applications using modern technologies like
              Next.js, TypeScript, and React. Beyond coding, I&apos;m fascinated by AI research
              and enjoy exploring how machine learning can solve real-world problems.
            </p>
            <p className="smooth-slide-up" style={{ animationDelay: "0.15s" }}>
              When I&apos;m not coding, you&apos;ll find me experimenting with new frameworks,
              contributing to open-source projects, or writing about technology and development.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 smooth-fade-in">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div key={project.id} className="smooth-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50 smooth-fade-in">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((category, i) => (
              <div
                key={category.category}
                className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover-lift smooth-scale-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <h3 className="text-lg font-semibold mb-4 text-red-600">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-red-600/10 dark:bg-red-600/20 border border-red-600/30 text-red-600 dark:text-red-400 rounded text-sm font-medium hover:bg-red-600/20 dark:hover:bg-red-600/30 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6 smooth-fade-in">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div key={post.id} className="smooth-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50 smooth-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white smooth-slide-up">Let&apos;s Connect</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 smooth-slide-up" style={{ animationDelay: "0.1s" }}>
            I&apos;m always interested in hearing about new opportunities and interesting
            projects. Feel free to reach out and let&apos;s build something amazing together!
          </p>
          <div className="flex gap-4 justify-center flex-wrap flex-col sm:flex-row smooth-slide-up" style={{ animationDelay: "0.2s" }}>
            <a href="https://github.com/PhanVinh2k6" target="_blank" rel="noopener noreferrer" className="btn-primary">
              GitHub Profile
            </a>
            <a href="mailto:contact@phanvinh.dev" className="btn-primary">
              Send Email
            </a>
            <a href="/cv.pdf" download className="btn-secondary">
              Download CV
            </a>
            <a href="https://www.facebook.com/vinhvuive.ahihi" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Facebook
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
