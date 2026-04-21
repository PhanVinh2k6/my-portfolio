import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/PhanVinh2k6",
      icon: "GH",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/vinhvuive.ahihi",
      icon: "FB",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-2">Phan Vinh</h3>
            <p className="text-sm text-muted-foreground">
              Full-stack developer & AI researcher from Vietnam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Projects", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  title={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>
            © {currentYear} Phan Vinh. All rights reserved. Built with Next.js &
            React.
          </p>
        </div>
      </div>
    </footer>
  );
}
