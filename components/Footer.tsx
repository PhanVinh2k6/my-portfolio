import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/PhanVinh2k6",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/vinhvuive.ahihi",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  const handleSmoothScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="smooth-fade-in">
            <h3 className="text-2xl font-bold text-red-600 mb-3">Phan Vinh</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Full-stack developer & AI researcher from Vietnam. Crafting exceptional digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="smooth-fade-in" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "About", "Projects", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={handleSmoothScroll(`#${item.toLowerCase()}`)}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & CTA */}
          <div className="smooth-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-6">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@phanvinh.dev"
                className="block btn-primary text-center"
              >
                Send Email
              </a>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                    title={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
          {/* Copyright */}
          <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
            <p>
              © {currentYear} Phan Vinh. All rights reserved. Built with Next.js, React & Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
