export const smoothScrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId);
  if (element) {
    const headerHeight = 80; // Height of fixed header
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const handleSmoothNavClick = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  smoothScrollToSection(href);
};
