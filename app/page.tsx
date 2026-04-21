import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { projects } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { blogPosts } from "@/data/blog";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Hi, I&apos;m <span className="text-accent">Phan Vinh</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Full-stack developer, AI researcher, and creative problem solver from Vietnam.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#projects"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <div className="space-y-6 text-muted-foreground">
            <p>
              I&apos;m a second-year IT student at ICTU (Thai Nguyen), passionate about building
              exceptional digital experiences. My journey combines web development expertise with
              a deep interest in artificial intelligence and system design.
            </p>
            <p>
              I specialize in creating full-stack applications using modern technologies like
              Next.js, TypeScript, and React. Beyond coding, I&apos;m fascinated by AI research
              and enjoy exploring how machine learning can solve real-world problems.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me experimenting with new frameworks,
              contributing to open-source projects, or writing about technology and development.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((category) => (
              <div
                key={category.category}
                className="p-6 bg-background rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-4 text-accent">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded text-sm font-medium hover:bg-accent/20 transition-colors"
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
      <section id="blog" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Connect</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I&apos;m always interested in hearing about new opportunities and interesting
            projects. Feel free to reach out!
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="https://github.com/PhanVinh2k6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              GitHub
            </a>
            <a
              href="https://www.facebook.com/vinhvuive.ahihi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors"
            >
              Facebook
            </a>
            <a
              href="mailto:contact@example.com"
              className="px-8 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
